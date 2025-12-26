import { ArrowRight, CheckCircle, Users, Brain, BarChart3, Shield, Clock, Target, Check, Star } from 'lucide-react';
import { Button } from './ui/button';
import logo from 'figma:asset/8bd93ed4627c09346a804ff348fc063b132b8b5d.png';

interface LandingPageProps {
  onGetStarted: () => void;
  onViewDesigns: () => void;
}

export function LandingPage({ onGetStarted, onViewDesigns }: LandingPageProps) {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#FFFFFF' }}>
      {/* Navigation */}
      <nav className="px-12 py-6 flex items-center justify-between border-b border-gray-200">
        <img src={logo} alt="ERAMATCH" className="h-12" />
        <Button 
          className="rounded-full px-6 transition-colors duration-200"
          style={{ backgroundColor: '#6366F1', color: '#FFFFFF' }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#4F46E5';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#6366F1';
          }}
          onClick={onViewDesigns}
        >
          Figma Designs
        </Button>
      </nav>

      {/* Hero Section */}
      <section className="px-12 py-24 max-w-7xl mx-auto">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6" style={{ backgroundColor: '#F0FDF4', color: '#10B981' }}>
            <CheckCircle size={18} />
            <span className="text-sm">AI-Powered Recruitment Platform</span>
          </div>
          
          <h1 className="text-6xl mb-6" style={{ color: '#1F2937' }}>
            A Smarter Way to
            <br />
            <span style={{ color: '#10B981' }}>Build Your Team</span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
            ERAMATCH revolutionizes recruitment with AI-driven assessments, live interviews, 
            and comprehensive analytics. Find the perfect candidate faster than ever before.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-8 mt-24 max-w-4xl mx-auto">
          <div className="text-center p-6 rounded-2xl" style={{ backgroundColor: '#F9FAFB' }}>
            <div className="text-4xl mb-2" style={{ color: '#10B981' }}>95%</div>
            <p className="text-gray-600">Accuracy Rate</p>
          </div>
          <div className="text-center p-6 rounded-2xl" style={{ backgroundColor: '#F9FAFB' }}>
            <div className="text-4xl mb-2" style={{ color: '#6366F1' }}>50%</div>
            <p className="text-gray-600">Time Saved</p>
          </div>
          <div className="text-center p-6 rounded-2xl" style={{ backgroundColor: '#F9FAFB' }}>
            <div className="text-4xl mb-2" style={{ color: '#10B981' }}>10K+</div>
            <p className="text-gray-600">Candidates Hired</p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-12 py-24" style={{ backgroundColor: '#EDF0F8' }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl mb-4" style={{ color: '#1F2937' }}>
              Everything You Need to Hire Better
            </h2>
            <p className="text-xl text-gray-600">
              Powerful features designed for modern recruitment teams
            </p>
          </div>

          <div className="grid grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: '#F0FDF4' }}>
                <Brain size={28} style={{ color: '#10B981' }} />
              </div>
              <h3 className="text-xl mb-3" style={{ color: '#1F2937' }}>AI-Powered Interviews</h3>
              <p className="text-gray-600">
                Conduct intelligent live interviews with real-time AI analysis and automatic scoring
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: '#EEF2FF' }}>
                <Target size={28} style={{ color: '#6366F1' }} />
              </div>
              <h3 className="text-xl mb-3" style={{ color: '#1F2937' }}>Technical Assessments</h3>
              <p className="text-gray-600">
                Comprehensive coding tests with anti-cheating mechanisms and detailed analytics
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: '#F0FDF4' }}>
                <Users size={28} style={{ color: '#10B981' }} />
              </div>
              <h3 className="text-xl mb-3" style={{ color: '#1F2937' }}>Team Collaboration</h3>
              <p className="text-gray-600">
                Seamless coordination between recruiters, admins, and team members
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: '#EEF2FF' }}>
                <BarChart3 size={28} style={{ color: '#6366F1' }} />
              </div>
              <h3 className="text-xl mb-3" style={{ color: '#1F2937' }}>Advanced Analytics</h3>
              <p className="text-gray-600">
                Real-time dashboards and insights to track recruitment performance
              </p>
            </div>

            {/* Feature 5 */}
            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: '#F0FDF4' }}>
                <Shield size={28} style={{ color: '#10B981' }} />
              </div>
              <h3 className="text-xl mb-3" style={{ color: '#1F2937' }}>Secure & Compliant</h3>
              <p className="text-gray-600">
                Enterprise-grade security with role-based access control and data protection
              </p>
            </div>

            {/* Feature 6 */}
            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: '#EEF2FF' }}>
                <Clock size={28} style={{ color: '#6366F1' }} />
              </div>
              <h3 className="text-xl mb-3" style={{ color: '#1F2937' }}>Save Time & Effort</h3>
              <p className="text-gray-600">
                Automate repetitive tasks and reduce time-to-hire by up to 50%
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="px-12 py-24 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl mb-4" style={{ color: '#1F2937' }}>
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-gray-600">
              Choose the plan that fits your hiring needs
            </p>
          </div>

          <div className="grid grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Starter Plan */}
            <div className="bg-white border-2 border-gray-200 rounded-3xl p-8 hover:shadow-xl transition-all duration-300">
              <h3 className="text-2xl mb-2" style={{ color: '#1F2937' }}>Starter</h3>
              <p className="text-gray-600 text-sm mb-6">For small teams getting started</p>
              
              <div className="mb-6">
                <div className="flex items-baseline gap-1">
                  <span className="text-5xl" style={{ color: '#1F2937' }}>$199</span>
                  <span className="text-gray-600">/month</span>
                </div>
                <p className="text-sm text-gray-500 mt-2">Billed annually or $249/mo monthly</p>
              </div>

              <Button 
                className="w-full rounded-xl py-6 mb-8 transition-colors duration-200 border-2"
                style={{ backgroundColor: '#FFFFFF', color: '#6366F1', borderColor: '#6366F1' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#6366F1';
                  e.currentTarget.style.color = '#FFFFFF';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#FFFFFF';
                  e.currentTarget.style.color = '#6366F1';
                }}
                onClick={onViewDesigns}
              >
                Start Free Trial
              </Button>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Check size={20} style={{ color: '#10B981' }} className="flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 text-sm">Up to 10 active job postings</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check size={20} style={{ color: '#10B981' }} className="flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 text-sm">100 AI interviews per month</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check size={20} style={{ color: '#10B981' }} className="flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 text-sm">Basic technical assessments</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check size={20} style={{ color: '#10B981' }} className="flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 text-sm">3 team members</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check size={20} style={{ color: '#10B981' }} className="flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 text-sm">Email support</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check size={20} style={{ color: '#10B981' }} className="flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 text-sm">Basic analytics dashboard</span>
                </div>
              </div>
            </div>

            {/* Professional Plan - Most Popular */}
            <div className="bg-white border-2 rounded-3xl p-8 relative hover:shadow-xl transition-all duration-300 transform scale-105" style={{ borderColor: '#10B981' }}>
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <div className="flex items-center gap-1 px-4 py-1.5 rounded-full text-sm" style={{ backgroundColor: '#10B981', color: '#FFFFFF' }}>
                  <Star size={14} />
                  Most Popular
                </div>
              </div>

              <h3 className="text-2xl mb-2" style={{ color: '#1F2937' }}>Professional</h3>
              <p className="text-gray-600 text-sm mb-6">For growing recruitment teams</p>
              
              <div className="mb-6">
                <div className="flex items-baseline gap-1">
                  <span className="text-5xl" style={{ color: '#10B981' }}>$499</span>
                  <span className="text-gray-600">/month</span>
                </div>
                <p className="text-sm text-gray-500 mt-2">Billed annually or $599/mo monthly</p>
              </div>

              <Button 
                className="w-full rounded-xl py-6 mb-8 transition-colors duration-200"
                style={{ backgroundColor: '#10B981', color: '#FFFFFF' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#059669';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#10B981';
                }}
                onClick={onViewDesigns}
              >
                Start Free Trial
              </Button>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Check size={20} style={{ color: '#10B981' }} className="flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 text-sm">Unlimited job postings</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check size={20} style={{ color: '#10B981' }} className="flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 text-sm">500 AI interviews per month</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check size={20} style={{ color: '#10B981' }} className="flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 text-sm">Advanced technical assessments</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check size={20} style={{ color: '#10B981' }} className="flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 text-sm">10 team members</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check size={20} style={{ color: '#10B981' }} className="flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 text-sm">Priority email & chat support</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check size={20} style={{ color: '#10B981' }} className="flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 text-sm">Advanced analytics & reports</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check size={20} style={{ color: '#10B981' }} className="flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 text-sm">Custom branding</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check size={20} style={{ color: '#10B981' }} className="flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 text-sm">API access</span>
                </div>
              </div>
            </div>

            {/* Enterprise Plan */}
            <div className="bg-white border-2 border-gray-200 rounded-3xl p-8 hover:shadow-xl transition-all duration-300">
              <h3 className="text-2xl mb-2" style={{ color: '#1F2937' }}>Enterprise</h3>
              <p className="text-gray-600 text-sm mb-6">For large organizations</p>
              
              <div className="mb-6">
                <div className="flex items-baseline gap-1">
                  <span className="text-5xl" style={{ color: '#1F2937' }}>Custom</span>
                </div>
                <p className="text-sm text-gray-500 mt-2">Tailored to your needs</p>
              </div>

              <Button 
                className="w-full rounded-xl py-6 mb-8 transition-colors duration-200 border-2"
                style={{ backgroundColor: '#FFFFFF', color: '#6366F1', borderColor: '#6366F1' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#6366F1';
                  e.currentTarget.style.color = '#FFFFFF';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#FFFFFF';
                  e.currentTarget.style.color = '#6366F1';
                }}
                onClick={onViewDesigns}
              >
                Contact Sales
              </Button>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Check size={20} style={{ color: '#10B981' }} className="flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 text-sm">Everything in Professional</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check size={20} style={{ color: '#10B981' }} className="flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 text-sm">Unlimited AI interviews</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check size={20} style={{ color: '#10B981' }} className="flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 text-sm">Unlimited team members</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check size={20} style={{ color: '#10B981' }} className="flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 text-sm">Dedicated account manager</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check size={20} style={{ color: '#10B981' }} className="flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 text-sm">24/7 phone support</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check size={20} style={{ color: '#10B981' }} className="flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 text-sm">Custom integrations</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check size={20} style={{ color: '#10B981' }} className="flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 text-sm">SLA guarantee</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check size={20} style={{ color: '#10B981' }} className="flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 text-sm">On-premise deployment option</span>
                </div>
              </div>
            </div>
          </div>

          {/* Pricing Note */}
          <div className="text-center mt-12">
            <p className="text-gray-600">
              All plans include a 14-day free trial. No credit card required.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="px-12 py-24 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl mb-4" style={{ color: '#1F2937' }}>
              How ERAMATCH Works
            </h2>
            <p className="text-xl text-gray-600">
              Simple, streamlined process from posting to hiring
            </p>
          </div>

          <div className="grid grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl" style={{ backgroundColor: '#10B981', color: '#FFFFFF' }}>
                1
              </div>
              <h3 className="text-lg mb-2" style={{ color: '#1F2937' }}>Create Position</h3>
              <p className="text-gray-600 text-sm">
                Post your job opening and define requirements
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl" style={{ backgroundColor: '#6366F1', color: '#FFFFFF' }}>
                2
              </div>
              <h3 className="text-lg mb-2" style={{ color: '#1F2937' }}>Receive Applications</h3>
              <p className="text-gray-600 text-sm">
                Candidates apply and complete assessments
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl" style={{ backgroundColor: '#10B981', color: '#FFFFFF' }}>
                3
              </div>
              <h3 className="text-lg mb-2" style={{ color: '#1F2937' }}>AI Evaluation</h3>
              <p className="text-gray-600 text-sm">
                Automated screening and intelligent ranking
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl" style={{ backgroundColor: '#6366F1', color: '#FFFFFF' }}>
                4
              </div>
              <h3 className="text-lg mb-2" style={{ color: '#1F2937' }}>Make Offers</h3>
              <p className="text-gray-600 text-sm">
                Interview top candidates and extend offers
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-12 py-24" style={{ backgroundColor: '#1F2937' }}>
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl mb-6" style={{ color: '#FFFFFF' }}>
            Ready to Transform Your Recruitment?
          </h2>
          <p className="text-xl mb-8" style={{ color: '#9CA3AF' }}>
            Join hundreds of companies already using ERAMATCH to build exceptional teams
          </p>
          <Button 
            className="rounded-full px-8 py-6 text-lg transition-colors duration-200 flex items-center gap-2 mx-auto"
            style={{ backgroundColor: '#10B981', color: '#FFFFFF' }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#059669';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#10B981';
            }}
            onClick={onGetStarted}
          >
            Get Started Now
            <ArrowRight size={20} />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-12 py-8 border-t border-gray-200">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <img src={logo} alt="ERAMATCH" className="h-10" />
          <p className="text-gray-600 text-sm">
            © 2025 ERAMATCH. A Smarter Recruitment System.
          </p>
        </div>
      </footer>
    </div>
  );
}