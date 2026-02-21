import { useState, useRef, useCallback, useEffect, type ChangeEvent } from 'react';
import { Button, Card } from '../components/ui';
import { ShotCoachOnboarding } from '../components/shot-coach/ShotCoachOnboarding';
import { CaddieBubble } from '../components/shot-coach/CaddieBubble';
import { RecentShots } from '../components/shot-coach/RecentShots';
import type {
  CaddieAdvice,
  ShotCoachProfile,
  ShotOutcome,
  ShotSession,
  WindDirection,
} from '../types';
import {
  getCaddieAdvice,
  compressImage,
  createThumbnail,
  SHOT_COACH_PROFILE_KEY,
  SHOT_COACH_SESSIONS_KEY,
} from '../utils/shotCoach';
import { loadFromStorage, saveToStorage } from '../utils/storage';

const WIND_DIRECTIONS: WindDirection[] = ['none', 'N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];

const LOADING_MESSAGES = [
  'Lining up your shot...',
  'Reading the break...',
  'Checking the wind...',
  'Studying the lie...',
  'Consulting the yardage book...',
];

export function ShotCoach() {
  // ── Profile ──────────────────────────────────────────────────────────────
  const [profile, setProfile] = useState<ShotCoachProfile | null>(() =>
    loadFromStorage<ShotCoachProfile | null>(SHOT_COACH_PROFILE_KEY, null),
  );

  // ── Image ─────────────────────────────────────────────────────────────────
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageBase64, setImageBase64] = useState<string | null>(null);
  const [thumbnailBase64, setThumbnailBase64] = useState<string | null>(null);
  const [imageReady, setImageReady] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // ── Inputs ────────────────────────────────────────────────────────────────
  const [distance, setDistance] = useState('');
  const [windSpeed, setWindSpeed] = useState(0);
  const [windDirection, setWindDirection] = useState<WindDirection>('none');

  // ── API state ─────────────────────────────────────────────────────────────
  const [loading, setLoading] = useState(false);
  const [loadingMsg, setLoadingMsg] = useState(LOADING_MESSAGES[0]);
  const [advice, setAdvice] = useState<CaddieAdvice | null>(null);
  const [error, setError] = useState<string | null>(null);

  // ── Session history ───────────────────────────────────────────────────────
  const [sessionOutcome, setSessionOutcome] = useState<ShotOutcome>(null);
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);
  const [sessions, setSessions] = useState<ShotSession[]>(() =>
    loadFromStorage<ShotSession[]>(SHOT_COACH_SESSIONS_KEY, []),
  );

  // Persist sessions to localStorage whenever they change
  useEffect(() => {
    saveToStorage<ShotSession[]>(SHOT_COACH_SESSIONS_KEY, sessions);
  }, [sessions]);

  // Rotate loading message while waiting for API
  useEffect(() => {
    if (!loading) return;
    let i = 0;
    const id = setInterval(() => {
      i = (i + 1) % LOADING_MESSAGES.length;
      setLoadingMsg(LOADING_MESSAGES[i]);
    }, 2000);
    return () => clearInterval(id);
  }, [loading]);

  // ── Handlers ──────────────────────────────────────────────────────────────

  const handleImageChange = useCallback(async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setAdvice(null);
    setError(null);
    setSessionOutcome(null);
    setCurrentSessionId(null);
    setImageReady(false);

    // Show preview immediately via data URL
    const reader = new FileReader();
    reader.onload = (ev) => setImagePreview(ev.target?.result as string);
    reader.readAsDataURL(file);

    // Compress for API and generate thumbnail in parallel
    try {
      const base64 = await compressImage(file);
      setImageBase64(base64);
      const thumb = await createThumbnail(base64);
      setThumbnailBase64(thumb);
      setImageReady(true);
    } catch {
      setError('Could not process the image. Please try a different photo.');
    }
  }, []);

  const handleGetAdvice = useCallback(async () => {
    if (!profile || !imageBase64 || !imageReady) return;

    const distanceNum = Number(distance);
    if (!distance || isNaN(distanceNum) || distanceNum <= 0) {
      setError('Please enter a valid distance to the pin (in yards).');
      return;
    }

    setLoading(true);
    setError(null);
    setAdvice(null);
    setSessionOutcome(null);
    setCurrentSessionId(null);
    setLoadingMsg(LOADING_MESSAGES[0]);

    try {
      const result = await getCaddieAdvice({
        imageBase64,
        profile,
        distance: distanceNum,
        windSpeed,
        windDirection,
      });

      // Persist session immediately when advice arrives
      const sessionId = crypto.randomUUID();
      const newSession: ShotSession = {
        id: sessionId,
        date: new Date().toISOString(),
        imageThumbnail: thumbnailBase64 ?? '',
        clubRecommended: result.recommendedClub,
        distance: distanceNum,
        outcome: null,
      };
      setSessions((prev) => [...prev, newSession]);
      setCurrentSessionId(sessionId);
      setAdvice(result);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Something went wrong getting caddie advice. Check your connection and try again.',
      );
    } finally {
      setLoading(false);
    }
  }, [profile, imageBase64, imageReady, distance, windSpeed, windDirection, thumbnailBase64]);

  const handleOutcome = useCallback(
    (outcome: ShotOutcome) => {
      setSessionOutcome(outcome);
      if (!currentSessionId) return;
      setSessions((prev) =>
        prev.map((s) => (s.id === currentSessionId ? { ...s, outcome } : s)),
      );
    },
    [currentSessionId],
  );

  const handleAskAgain = useCallback(() => {
    setAdvice(null);
    setError(null);
    setSessionOutcome(null);
    setCurrentSessionId(null);
  }, []);

  const handleReset = useCallback(() => {
    setImagePreview(null);
    setImageBase64(null);
    setThumbnailBase64(null);
    setImageReady(false);
    setDistance('');
    setWindSpeed(0);
    setWindDirection('none');
    setAdvice(null);
    setError(null);
    setSessionOutcome(null);
    setCurrentSessionId(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  }, []);

  const handleEditProfile = useCallback(() => {
    saveToStorage<null>(SHOT_COACH_PROFILE_KEY, null);
    setProfile(null);
  }, []);

  // ── Onboarding gate ───────────────────────────────────────────────────────

  if (!profile) {
    return (
      <div className="max-w-2xl mx-auto">
        <ShotCoachOnboarding onComplete={setProfile} />
      </div>
    );
  }

  // ── Main UI ───────────────────────────────────────────────────────────────

  return (
    <div className="max-w-lg mx-auto space-y-4 pb-10">
      {/* Page header */}
      <div className="flex items-start justify-between gap-2">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Shot Coach</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">Your AI caddie, every hole</p>
        </div>
        <button
          onClick={handleEditProfile}
          className="mt-1 text-xs text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 underline underline-offset-2 transition-colors"
        >
          Edit profile
        </button>
      </div>

      {/* ── Image upload / preview ── */}
      <Card padding="sm">
        {/* Hidden file input — rear camera on mobile, file picker on desktop */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          capture="environment"
          className="hidden"
          onChange={handleImageChange}
        />

        {imagePreview ? (
          <div className="relative">
            <img
              src={imagePreview}
              alt="Golf hole preview"
              className="w-full rounded-lg object-cover max-h-72"
            />
            {!imageReady && (
              <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-black/30">
                <div className="w-8 h-8 border-4 border-white/40 border-t-white rounded-full animate-spin" />
              </div>
            )}
            <button
              onClick={handleReset}
              aria-label="Remove image"
              className="absolute top-2 right-2 bg-black/60 hover:bg-black/80 text-white rounded-full p-1.5 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        ) : (
          <button
            onClick={() => fileInputRef.current?.click()}
            className="w-full flex flex-col items-center justify-center gap-3 py-14 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600 hover:border-green-500 dark:hover:border-green-500 transition-colors group"
          >
            <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center group-hover:bg-green-200 dark:group-hover:bg-green-900/50 transition-colors">
              <svg
                className="w-8 h-8 text-green-700 dark:text-green-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </div>
            <div className="text-center">
              <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                Take a photo or upload
              </p>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
                Point at the hole for the best advice
              </p>
            </div>
          </button>
        )}
      </Card>

      {/* ── Distance + wind inputs (visible once image is chosen) ── */}
      {imagePreview && (
        <Card padding="sm">
          <div className="space-y-4">
            {/* Distance — required */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                Distance to pin <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="number"
                  inputMode="numeric"
                  min={1}
                  max={600}
                  placeholder="e.g. 150"
                  value={distance}
                  onChange={(e) => setDistance(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2.5 pr-12 text-sm text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 dark:text-gray-500 pointer-events-none">
                  yds
                </span>
              </div>
            </div>

            {/* Wind — optional */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                Wind <span className="text-gray-400 font-normal">(optional)</span>
              </label>
              <div className="grid grid-cols-2 gap-2">
                <select
                  value={windSpeed}
                  onChange={(e) => {
                    const v = Number(e.target.value);
                    setWindSpeed(v);
                    if (v === 0) setWindDirection('none');
                  }}
                  className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2.5 text-sm text-gray-900 dark:text-gray-100 focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
                >
                  <option value={0}>Calm</option>
                  <option value={5}>5 mph</option>
                  <option value={10}>10 mph</option>
                  <option value={15}>15 mph</option>
                  <option value={20}>20 mph</option>
                  <option value={25}>25 mph</option>
                </select>

                <select
                  value={windDirection}
                  onChange={(e) => setWindDirection(e.target.value as WindDirection)}
                  disabled={windSpeed === 0}
                  className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2.5 text-sm text-gray-900 dark:text-gray-100 focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500 disabled:opacity-40"
                >
                  {WIND_DIRECTIONS.map((d) => (
                    <option key={d} value={d}>
                      {d === 'none' ? '— direction —' : d}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* ── Get Advice CTA ── */}
      {imagePreview && !advice && !loading && (
        <Button
          onClick={handleGetAdvice}
          size="lg"
          className="w-full"
          disabled={!imageReady || !distance}
        >
          <svg className="w-5 h-5 mr-2 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.347.346A3.873 3.873 0 0112 15.75a3.873 3.873 0 01-2.746-1.154l-.347-.346z"
            />
          </svg>
          Get Caddie Advice
        </Button>
      )}

      {/* ── Loading state ── */}
      {loading && (
        <Card className="text-center py-10">
          <div className="flex flex-col items-center gap-4">
            <div className="relative w-16 h-16">
              <div className="absolute inset-0 rounded-full border-4 border-green-200 dark:border-green-800" />
              <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-green-600 animate-spin" />
              <div className="absolute inset-0 flex items-center justify-center text-2xl select-none">
                ⛳
              </div>
            </div>
            <div>
              <p className="font-semibold text-gray-900 dark:text-gray-100">{loadingMsg}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Your caddie is reading the hole
              </p>
            </div>
          </div>
        </Card>
      )}

      {/* ── Error state ── */}
      {error && (
        <Card className="border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20">
          <div className="flex gap-3">
            <div className="shrink-0 text-red-500 mt-0.5">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-red-800 dark:text-red-300">
                Caddie ran into trouble
              </p>
              <p className="text-sm text-red-700 dark:text-red-400 mt-1 break-words">{error}</p>
              {imageBase64 && (
                <Button variant="outline" size="sm" onClick={handleGetAdvice} className="mt-3">
                  Try Again
                </Button>
              )}
            </div>
          </div>
        </Card>
      )}

      {/* ── Caddie response ── */}
      {advice && (
        <div className="space-y-3">
          <CaddieBubble advice={advice} outcome={sessionOutcome} onOutcome={handleOutcome} />
          <Button variant="outline" size="md" onClick={handleAskAgain} className="w-full">
            Ask Again (edit inputs)
          </Button>
          <Button variant="ghost" size="sm" onClick={handleReset} className="w-full text-gray-500 dark:text-gray-400">
            New Shot
          </Button>
        </div>
      )}

      {/* ── Shot history ── */}
      <RecentShots sessions={sessions} />
    </div>
  );
}
