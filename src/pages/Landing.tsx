import PageContainer from '../layouts/PageContainer';
import { Link } from 'react-router-dom';

export default function Landing() {
  return (
    <PageContainer className="justify-center items-center text-center">
      <h1 className="text-4xl font-display font-bold text-carbon-900 mb-4">Carbon Health</h1>
      <p className="text-carbon-600 mb-8 max-w-sm">
        Understand, track, and reduce your carbon footprint through simple actions.
      </p>
      <Link 
        to="/onboarding" 
        className="px-6 py-3 bg-carbon-600 text-white font-semibold rounded-xl shadow-soft hover:bg-carbon-700 transition-colors w-full max-w-xs"
      >
        Get Started
      </Link>
    </PageContainer>
  );
}
