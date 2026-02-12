import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Experience, ClubOwnership, GolfGoal, OnboardingData } from '../types';
import { useUser } from '../context/UserContext';
import { OnboardingStep } from '../components/onboarding/OnboardingStep';
import { ExperienceStep } from '../components/onboarding/ExperienceStep';
import { ClubsStep } from '../components/onboarding/ClubsStep';
import { GoalStep } from '../components/onboarding/GoalStep';
import { OnboardingComplete } from '../components/onboarding/OnboardingComplete';
import { Button } from '../components/ui/Button';

const TOTAL_STEPS = 4;

function computeRecommendation(
  experience: Experience,
  hasClubs: ClubOwnership,
  goal: GolfGoal
): { recommendedStart: string; emphasisAreas: string[] } {
  let recommendedStart = 'golf-basics';
  const emphasisAreas: string[] = [];

  if (experience === 'never') {
    recommendedStart = 'golf-basics';
    emphasisAreas.push('rules-etiquette', 'equipment-guide');
  } else if (experience === 'few-times') {
    recommendedStart = 'swing-fundamentals';
    emphasisAreas.push('swing-fundamentals', 'practice-drills');
  } else {
    recommendedStart = 'practice-drills';
    emphasisAreas.push('practice-drills', 'scoring-tracking');
  }

  if (hasClubs === 'no' || hasClubs === 'borrowing') {
    if (!emphasisAreas.includes('equipment-guide')) {
      emphasisAreas.push('equipment-guide');
    }
  }

  if (goal === 'fun-social') {
    if (!emphasisAreas.includes('rules-etiquette')) {
      emphasisAreas.push('rules-etiquette');
    }
    emphasisAreas.push('course-navigation');
  } else if (goal === 'fitness-outdoors') {
    emphasisAreas.push('fitness-conditioning');
    emphasisAreas.push('course-navigation');
  } else if (goal === 'competition-improvement') {
    emphasisAreas.push('mental-game');
    if (!emphasisAreas.includes('scoring-tracking')) {
      emphasisAreas.push('scoring-tracking');
    }
    emphasisAreas.push('competitive-play');
  }

  return { recommendedStart, emphasisAreas };
}

export function Onboarding() {
  const { completeOnboarding } = useUser();
  const navigate = useNavigate();

  const [currentStep, setCurrentStep] = useState(0);
  const [direction, setDirection] = useState<'forward' | 'backward'>('forward');

  const [experience, setExperience] = useState<Experience>('');
  const [hasClubs, setHasClubs] = useState<ClubOwnership>('');
  const [goal, setGoal] = useState<GolfGoal>('');

  const canProceed = [
    experience !== '',
    hasClubs !== '',
    goal !== '',
    true,
  ][currentStep];

  const handleNext = useCallback(() => {
    if (currentStep < TOTAL_STEPS - 1) {
      setDirection('forward');
      setCurrentStep((s) => s + 1);
    }
  }, [currentStep]);

  const handleBack = useCallback(() => {
    if (currentStep > 0) {
      setDirection('backward');
      setCurrentStep((s) => s - 1);
    }
  }, [currentStep]);

  const handleExperienceSelect = useCallback((value: Experience) => {
    setExperience(value);
    setTimeout(() => {
      setDirection('forward');
      setCurrentStep(1);
    }, 300);
  }, []);

  const handleClubsSelect = useCallback((value: ClubOwnership) => {
    setHasClubs(value);
    setTimeout(() => {
      setDirection('forward');
      setCurrentStep(2);
    }, 300);
  }, []);

  const handleGoalSelect = useCallback((value: GolfGoal) => {
    setGoal(value);
    setTimeout(() => {
      setDirection('forward');
      setCurrentStep(3);
    }, 300);
  }, []);

  const { recommendedStart, emphasisAreas } = computeRecommendation(experience, hasClubs, goal);

  const onboardingData: OnboardingData = {
    experience,
    hasClubs,
    goal,
    recommendedStart,
    emphasisAreas,
  };

  const handleFinish = useCallback(() => {
    completeOnboarding(onboardingData);
    navigate('/learning-path');
  }, [completeOnboarding, onboardingData, navigate]);

  const getStepDirection = (stepIndex: number): 'active' | 'enter-left' | 'enter-right' | 'exit-left' | 'exit-right' => {
    if (stepIndex === currentStep) return 'active';
    if (stepIndex < currentStep) return direction === 'forward' ? 'exit-left' : 'enter-left';
    return direction === 'forward' ? 'enter-right' : 'exit-right';
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex flex-col">
      {/* Progress dots */}
      <div className="flex justify-center gap-2 pt-8 pb-4">
        {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
          <div
            key={i}
            className={`h-2.5 rounded-full transition-all duration-300 ${
              i === currentStep
                ? 'w-8 bg-green-600'
                : i < currentStep
                  ? 'w-2.5 bg-green-400'
                  : 'w-2.5 bg-gray-300'
            }`}
          />
        ))}
      </div>

      {/* Step counter */}
      <p className="text-center text-sm text-green-600 font-medium mb-2">
        Step {currentStep + 1} of {TOTAL_STEPS}
      </p>

      {/* Steps container */}
      <div className="flex-1 relative overflow-hidden">
        <OnboardingStep
          title="Have you ever played golf?"
          subtitle="This helps us tailor your learning experience"
          isActive={currentStep === 0}
          direction={getStepDirection(0)}
        >
          <ExperienceStep value={experience} onSelect={handleExperienceSelect} />
        </OnboardingStep>

        <OnboardingStep
          title="Do you own golf clubs?"
          subtitle="We'll recommend the right equipment for you"
          isActive={currentStep === 1}
          direction={getStepDirection(1)}
        >
          <ClubsStep value={hasClubs} onSelect={handleClubsSelect} />
        </OnboardingStep>

        <OnboardingStep
          title="What's your golf goal?"
          subtitle="We'll focus your learning path on what matters to you"
          isActive={currentStep === 2}
          direction={getStepDirection(2)}
        >
          <GoalStep value={goal} onSelect={handleGoalSelect} />
        </OnboardingStep>

        {currentStep === 3 && (
          <div className="absolute inset-0 flex items-center justify-center overflow-y-auto py-4">
            <OnboardingComplete data={onboardingData} onFinish={handleFinish} />
          </div>
        )}
      </div>

      {/* Navigation buttons */}
      <div className="flex justify-between items-center px-4 py-6 max-w-md mx-auto w-full">
        {currentStep > 0 && currentStep < 3 ? (
          <Button variant="ghost" onClick={handleBack}>
            Back
          </Button>
        ) : (
          <div />
        )}
        {currentStep < 3 && (
          <Button
            onClick={handleNext}
            disabled={!canProceed}
            className={!canProceed ? 'opacity-50 cursor-not-allowed' : ''}
          >
            Next
          </Button>
        )}
      </div>
    </div>
  );
}
