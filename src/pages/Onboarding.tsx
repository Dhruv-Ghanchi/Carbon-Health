import PageContainer from '../layouts/PageContainer';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '../stores';
import OnboardingWizard from '../components/onboarding/OnboardingWizard';
import type { UserProfile, CarbonAssessment } from '../types';

export default function Onboarding() {
  const navigate = useNavigate();
  const setProfile = useUserStore((state) => state.setProfile);
  const setAssessment = useUserStore((state) => state.setAssessment);

  const handleWizardComplete = (profile: UserProfile, assessment: CarbonAssessment) => {
    setProfile(profile);
    setAssessment(assessment);
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
