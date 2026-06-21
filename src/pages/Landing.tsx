import { Link } from 'react-router-dom';
import { ArrowRight, Leaf, Shield, Activity, Target } from 'lucide-react';
import { Button } from '../components/ui/Button';

export default function Landing() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="fixed w-full bg-white/80 backdrop-blur-md z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Leaf className="w-6 h-6 text-carbon-600" />
            <span className="text-xl font-bold font-display text-carbon-900">Carbon Health</span>
          </div>
          <nav className="flex items-center gap-4">
            <Link to="/onboarding">
              <Button variant="primary">Get Started</Button>
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-5xl font-extrabold text-gray-900 font-display tracking-tight mb-6 leading-tight">
            Deterministic Climate Action for the <span className="text-carbon-600">Modern Professional</span>
          </h1>
          <p className="text-xl text-gray-600 mb-10 leading-relaxed">
            Stop guessing your impact. The Carbon Health Platform uses a pure-function intelligence engine to translate your habits into exact, explainable, and achievable emissions reductions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/onboarding">
              <Button size="lg" className="w-full sm:w-auto">
                Calculate Your Footprint <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="w-full sm:w-auto">
              View Architecture Docs
            </Button>
          </div>
        </div>
      </section>

      {/* Benefits / How It Works */}
      <section className="py-20 bg-gray-50 border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 font-display mb-4">How it works</h2>
            <p className="text-lg text-gray-600">A strict unidirectional execution graph powers your experience.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <div className="w-12 h-12 bg-carbon-100 text-carbon-600 rounded-xl flex items-center justify-center mb-6">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">1. Assess</h3>
              <p className="text-gray-600">Complete a comprehensive lifestyle assessment to establish your baseline carbon score and footprint distribution.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-6">
                <Activity className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">2. Adapt</h3>
              <p className="text-gray-600">Our intelligence pipeline analyzes your motivation and context to recommend highly personalized, prioritized actions.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <div className="w-12 h-12 bg-green-100 text-green-600 rounded-xl flex items-center justify-center mb-6">
                <Shield className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">3. Act</h3>
              <p className="text-gray-600">Commit to missions, track your progress deterministically, and watch your carbon score improve week over week.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl font-bold text-gray-900 font-display mb-6">Ready to reduce your footprint?</h2>
          <p className="text-lg text-gray-600 mb-8">Join thousands of others taking deterministic action on climate change.</p>
          <Link to="/onboarding">
            <Button size="lg" className="px-12">Start Assessment</Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <Leaf className="w-5 h-5 text-carbon-500" />
            <span className="text-lg font-bold font-display text-white">Carbon Health</span>
          </div>
          <div className="text-sm">
            © 2026 Carbon Health Platform. Built with deterministic architecture.
          </div>
        </div>
      </footer>
    </div>
  );
}
