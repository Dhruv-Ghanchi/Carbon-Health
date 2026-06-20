import { useState } from 'react';
import type { 
  CarbonAssessment, 
  TransportType, 
  CommuteDistance, 
  ACUsage, 
  MeatConsumption, 
  RecyclingHabit, 
  PublicTransportUsage, 
  ElectricitySavingHabit 
} from '../../types/assessment';
import type { MotivationLevel } from '../../engines/intelligence/types';
import type { UserProfile } from '../../types/user';

interface WizardProps {
  onComplete: (profile: UserProfile, assessment: CarbonAssessment) => void;
}

const QUESTIONS = [
  {
    id: 'householdSize',
    title: 'How many people live in your household?',
    options: [
      { label: '1', value: 1 },
      { label: '2–3', value: 2 },
      { label: '4–5', value: 4 },
      { label: '5+', value: 5 }
    ]
  },
  {
    id: 'primaryTransport',
    title: 'What is your primary mode of transport?',
    options: [
      { label: 'Car (Gas)', value: 'car_gas' },
      { label: 'Car (EV)', value: 'car_ev' },
      { label: 'Metro/Bus', value: 'public_transit' },
      { label: 'Walk/Cycle', value: 'bike_walk' },
      { label: 'Motorcycle', value: 'motorcycle' }
    ]
  },
  {
    id: 'commuteDistance',
    title: 'What is your average daily commute distance?',
    options: [
      { label: '0–5 km', value: 'less_than_5' },
      { label: '5–15 km', value: '5_to_15' },
      { label: '15–30 km', value: '15_to_30' },
      { label: '30+ km', value: 'more_than_30' }
    ]
  },
  {
    id: 'acUsage',
    title: 'How often do you use Air Conditioning?',
    options: [
      { label: 'Rarely', value: 'rarely' },
      { label: 'Sometimes', value: 'sometimes' },
      { label: 'Daily', value: 'frequently' },
      { label: 'Most of the Day', value: 'always' }
    ]
  },
  {
    id: 'meatConsumption',
    title: 'How often do you consume meat?',
    options: [
      { label: 'Never', value: 'never' },
      { label: 'Occasionally', value: 'rarely' },
      { label: 'Weekly', value: 'few_times_week' },
      { label: 'Daily', value: 'daily' }
    ]
  },
  {
    id: 'recyclingHabits',
    title: 'How often do you recycle?',
    options: [
      { label: 'Always', value: 'always' },
      { label: 'Sometimes', value: 'sometimes' },
      { label: 'Rarely/Never', value: 'rarely' }
    ]
  },
  {
    id: 'publicTransportUsage',
    title: 'How often do you use public transport?',
    options: [
      { label: 'Daily', value: 'always' },
      { label: 'Weekly', value: 'frequently' },
      { label: 'Occasionally', value: 'sometimes' },
      { label: 'Never', value: 'never' }
    ]
  },
  {
    id: 'electricitySavingHabits',
    title: 'How conscious are you about saving electricity?',
    options: [
      { label: 'Very Conscious', value: 'high' },
      { label: 'Somewhat Conscious', value: 'medium' },
      { label: 'Not Conscious', value: 'low' }
    ]
  },
  {
    id: 'motivationLevel',
    title: 'What is your current motivation level?',
    options: [
      { label: 'Just Curious', value: 'casual' },
      { label: 'Actively Trying', value: 'committed' },
      { label: 'Highly Committed', value: 'urgent' }
    ]
  }
];

export default function OnboardingWizard({ onComplete }: WizardProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});

  const handleSelect = (questionId: string, value: any) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const handleNext = () => {
    if (currentStep < QUESTIONS.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      finishWizard();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const finishWizard = () => {
    const profile: UserProfile = {
      id: 'user-' + Math.random().toString(36).substring(2, 9),
      name: 'Eco Warrior',
      motivationLevel: answers.motivationLevel as MotivationLevel,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    const assessment: CarbonAssessment = {
      householdSize: answers.householdSize as number,
      primaryTransport: answers.primaryTransport as TransportType,
      commuteDistance: answers.commuteDistance as CommuteDistance,
      acUsage: answers.acUsage as ACUsage,
      meatConsumption: answers.meatConsumption as MeatConsumption,
      recyclingHabits: answers.recyclingHabits as RecyclingHabit,
      publicTransportUsage: answers.publicTransportUsage as PublicTransportUsage,
      electricitySavingHabits: answers.electricitySavingHabits as ElectricitySavingHabit,
      createdAt: new Date().toISOString()
    };

    onComplete(profile, assessment);
  };

  const question = QUESTIONS[currentStep];
  const progressPercentage = ((currentStep + 1) / QUESTIONS.length) * 100;

  return (
    <div className="flex flex-col h-full">
      <div className="w-full bg-gray-200 h-2 rounded-full mb-8">
        <div 
          className="bg-carbon-600 h-2 rounded-full transition-all duration-300 ease-in-out" 
          style={{ width: `${progressPercentage}%` }}
        />
      </div>

      <div className="flex-grow flex flex-col justify-center">
        <h2 className="text-2xl font-bold text-carbon-900 mb-6 text-center">
          {question.title}
        </h2>

        <div className="flex flex-col gap-3">
          {question.options.map((option) => {
            const isSelected = answers[question.id] === option.value;
            return (
              <button
                key={option.value}
                onClick={() => handleSelect(question.id, option.value)}
                className={`w-full p-4 rounded-xl border-2 text-left font-medium transition-all
                  ${isSelected 
                    ? 'border-carbon-600 bg-carbon-50 text-carbon-800' 
                    : 'border-gray-200 hover:border-carbon-400 text-gray-700 bg-white'
                  }`}
              >
                {option.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex justify-between items-center mt-8 gap-4">
        <button
          onClick={handleBack}
          disabled={currentStep === 0}
          className={`px-6 py-3 font-semibold rounded-xl w-1/3 transition-colors ${
            currentStep === 0 ? 'text-gray-400 cursor-not-allowed' : 'text-carbon-600 hover:bg-carbon-50'
          }`}
        >
          Back
        </button>
        <button
          onClick={handleNext}
          disabled={answers[question.id] === undefined}
          className={`px-6 py-3 font-semibold rounded-xl w-2/3 shadow-soft transition-colors ${
            answers[question.id] !== undefined 
              ? 'bg-carbon-600 text-white hover:bg-carbon-700' 
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          {currentStep === QUESTIONS.length - 1 ? 'Finish & See Report' : 'Continue'}
        </button>
      </div>
    </div>
  );
}
