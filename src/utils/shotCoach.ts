/**
 * Shot Coach — Anthropic API integration
 *
 * API calls are proxied through /.netlify/functions/caddie-advice so the
 * Anthropic API key never appears in the browser bundle.
 */

import type {
  CaddieAdvice,
  ShotCoachProfile,
  ShotCoachRequest,
  WindDirection,
} from '../types';

// ── Constants ────────────────────────────────────────────────────────────────

export const SHOT_COACH_PROFILE_KEY = 'golf-edu-shot-coach-profile';
export const SHOT_COACH_SESSIONS_KEY = 'golf-edu-shot-sessions';

const API_URL = '/.netlify/functions/caddie-advice';
const MAX_IMAGE_BYTES = 1_000_000; // 1 MB target for API cost control
const MAX_DIM = 1024; // px — longest edge before scaling

// ── Image utilities ───────────────────────────────────────────────────────────

/**
 * Compresses a File to a base64-encoded JPEG string (no data-URL prefix).
 * Scales the image down to MAX_DIM on the longest side and iteratively
 * reduces quality until the output is under MAX_IMAGE_BYTES.
 */
export function compressImage(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const objectUrl = URL.createObjectURL(file);

    img.onload = () => {
      URL.revokeObjectURL(objectUrl);

      let { width, height } = img;
      if (width > MAX_DIM || height > MAX_DIM) {
        if (width >= height) {
          height = Math.round((height * MAX_DIM) / width);
          width = MAX_DIM;
        } else {
          width = Math.round((width * MAX_DIM) / height);
          height = MAX_DIM;
        }
      }

      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext('2d');
      if (!ctx) {
        reject(new Error('Could not get canvas 2D context'));
        return;
      }
      ctx.drawImage(img, 0, 0, width, height);

      // Reduce quality until under budget
      let quality = 0.85;
      let dataUrl = canvas.toDataURL('image/jpeg', quality);
      while (dataUrl.length * 0.75 > MAX_IMAGE_BYTES && quality > 0.3) {
        quality = Math.max(0.3, quality - 0.1);
        dataUrl = canvas.toDataURL('image/jpeg', quality);
      }

      resolve(dataUrl.split(',')[1]); // pure base64, no prefix
    };

    img.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      reject(new Error('Failed to load image for compression'));
    };

    img.src = objectUrl;
  });
}

/**
 * Creates a tiny square thumbnail from a raw base64 JPEG string.
 * Returns a base64 string (no data-URL prefix) suitable for storing in
 * localStorage history entries.
 */
export function createThumbnail(base64: string, size = 96): Promise<string> {
  return new Promise((resolve) => {
    const img = new Image();

    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext('2d');
      if (!ctx) { resolve(''); return; }

      // Cover-crop: fill the square without distorting
      const ratio = Math.max(size / img.width, size / img.height);
      const w = img.width * ratio;
      const h = img.height * ratio;
      ctx.drawImage(img, (size - w) / 2, (size - h) / 2, w, h);

      resolve(canvas.toDataURL('image/jpeg', 0.5).split(',')[1]);
    };

    img.onerror = () => resolve('');
    img.src = `data:image/jpeg;base64,${base64}`;
  });
}

// ── Prompt builder ────────────────────────────────────────────────────────────

function buildCaddiePrompt(
  profile: ShotCoachProfile,
  distance: number,
  windSpeed: number,
  windDirection: WindDirection,
): string {
  const { clubDistances, missTendency, playStyle } = profile;
  const { driver, wood3, iron5, iron7, iron9, pw } = clubDistances;

  const windText =
    windSpeed === 0 || windDirection === 'none'
      ? 'no wind / calm conditions'
      : `${windSpeed} mph from the ${windDirection}`;

  const missText =
    missTendency === 'straight'
      ? 'relatively straight with minimal curve'
      : missTendency === 'fade'
        ? 'a fade (curves left-to-right for a right-handed player)'
        : 'a draw (curves right-to-left for a right-handed player)';

  const styleText =
    playStyle === 'conservative'
      ? 'conservative — prioritises safety, avoids big-number holes, prefers laying up over risky carries'
      : 'aggressive — willing to take risks for birdies, comfortable attacking flags even with hazards nearby';

  return `You are an expert golf caddie with 20 years of experience. Analyse the photo of the golf hole I am about to play.

## From the image, identify:
- Visible hazards (water, bunkers, trees, OB markers)
- Fairway shape (straight, dogleg left/right)
- Green position and approximate size
- Any distance markers visible
- Rough vs fairway conditions if discernible

## My club distances:
- Driver: ${driver} yards
- 3-wood: ${wood3} yards
- 5-iron: ${iron5} yards
- 7-iron: ${iron7} yards
- 9-iron: ${iron9} yards
- Pitching Wedge: ${pw} yards

## Current shot:
- Distance to target: ${distance} yards
- Wind: ${windText}
- My typical ball flight: ${missText}
- My play style: ${styleText}

## Your response MUST use exactly this format with these four bold labels:

**CLUB:** [Name the single best club and briefly explain the choice in one sentence]

**AIM:** [Describe exactly where to aim and why — reference visible landmarks in the image]

**RISKS:** [State the top 1-2 hazards or mistakes to watch out for on this shot]

**CONFIDENCE:** [One short, encouraging sentence to send me into the shot feeling ready]

Keep it conversational and direct — like a caddie whispering advice right before the swing. Be specific to what you see in the image.`;
}

// ── Response parser ───────────────────────────────────────────────────────────

/**
 * Extracts the four labelled sections from the model's raw text response.
 * Falls back to empty strings if a section cannot be found.
 */
export function parseCaddieResponse(rawText: string): CaddieAdvice {
  const extract = (label: string): string => {
    const regex = new RegExp(
      `\\*\\*${label}:\\*\\*\\s*([\\s\\S]*?)(?=\\*\\*[A-Z]+:\\*\\*|$)`,
      'i',
    );
    const match = rawText.match(regex);
    return match ? match[1].trim() : '';
  };

  return {
    recommendedClub: extract('CLUB'),
    aimAdvice: extract('AIM'),
    risks: extract('RISKS'),
    confidenceBooster: extract('CONFIDENCE'),
    rawText,
  };
}

// ── API call ──────────────────────────────────────────────────────────────────

interface AnthropicResponseBody {
  content: Array<{ type: string; text: string }>;
}

/**
 * Sends the hole image and player context to the Netlify proxy function,
 * which forwards to Anthropic server-side. The API key never reaches the browser.
 */
export async function getCaddieAdvice(req: ShotCoachRequest): Promise<CaddieAdvice> {
  const model =
    (import.meta.env.VITE_COACH_MODEL as string | undefined) || 'claude-sonnet-4-6';

  const prompt = buildCaddiePrompt(
    req.profile,
    req.distance,
    req.windSpeed,
    req.windDirection,
  );

  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model,
      max_tokens: 500,
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'image',
              source: {
                type: 'base64',
                media_type: 'image/jpeg',
                data: req.imageBase64,
              },
            },
            {
              type: 'text',
              text: prompt,
            },
          ],
        },
      ],
    }),
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Caddie advice error ${response.status}: ${body}`);
  }

  const data = (await response.json()) as AnthropicResponseBody;
  const rawText = data.content[0]?.text ?? '';
  return parseCaddieResponse(rawText);
}
