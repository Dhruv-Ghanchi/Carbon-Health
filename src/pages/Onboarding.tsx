import PageContainer from '../layouts/PageContainer';
import { useNavigate } from 'react-router-dom';
import { saveOnboardingDataCommand } from '../application/commands/userCommands';
import OnboardingWizard from '../components/onboarding/OnboardingWizard';
import type { UserProfile, CarbonAssessment } from '../types';

export default function Onboarding() {
  const navigate = useNavigate();

  const handleWizardComplete = (profile: UserProfile, assessment: CarbonAssessment) => {
    saveOnboardingDataCommand(profile, assessment);
    navigate('/dashboard');
  };

  return (
    <PageContainer>
      <div className="pt-8 h-full flex flex-col">
        <OnboardingWizard onComplete={handleWizardComplete} />
      </div>
    </PageContainer>
  );
}
