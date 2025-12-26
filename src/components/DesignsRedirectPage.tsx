import { ArrowLeft, Shield, Briefcase, UserCircle, FileText } from 'lucide-react';
import { Button } from './ui/button';
import logo from 'figma:asset/8bd93ed4627c09346a804ff348fc063b132b8b5d.png';

interface DesignsRedirectPageProps {
  onBack: () => void;
  onSelectAdmin: () => void;
  onSelectRecruiter: () => void;
  onSelectCandidate: () => void;
  onSelectApplicationForm: () => void;
}

export function DesignsRedirectPage({ onBack, onSelectAdmin, onSelectRecruiter, onSelectCandidate, onSelectApplicationForm }: DesignsRedirectPageProps) {
  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#EDF0F8' }}>
      {/* Header */}
      <div className="px-12 py-6 flex items-center justify-between border-b border-gray-200 bg-white">
        <img src={logo} alt="ERAMATCH" className="h-12" />
        <Button 
          variant="ghost"
          className="rounded-full px-6 flex items-center gap-2 text-gray-600 hover:text-gray-900"
          onClick={onBack}
        >
          <ArrowLeft size={18} />
          Back to Home
        </Button>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-12 py-16">
        <div className="w-full max-w-6xl">
          {/* Title Section */}
          <div className="text-center mb-16">
            <h1 className="text-5xl mb-4" style={{ color: '#1F2937' }}>
              Explore Our <span style={{ color: '#6366F1' }}>Figma Designs</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Choose a role to view the complete design system and user interface flows
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-4 gap-6">
            {/* Admin Card */}
            <div 
              className="bg-white rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2 group"
              onClick={onSelectAdmin}
            >
              <div 
                className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300"
                style={{ backgroundColor: '#FEF3C7' }}
              >
                <Shield size={32} style={{ color: '#F59E0B' }} />
              </div>
              
              <h2 className="text-xl text-center mb-3" style={{ color: '#1F2937' }}>
                Admin Gateway
              </h2>
              
              <p className="text-gray-600 text-center text-sm mb-4 min-h-[60px]">
                Manage organization members, approve join requests, and control system-wide settings
              </p>
              
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-xs text-gray-600">
                  <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: '#F59E0B' }}></div>
                  Organization Members
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-600">
                  <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: '#F59E0B' }}></div>
                  Pending Join Requests
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-600">
                  <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: '#F59E0B' }}></div>
                  Edit Privileges
                </div>
              </div>
              
              <Button 
                className="w-full rounded-xl py-4 text-sm transition-all duration-200"
                style={{ backgroundColor: '#F59E0B', color: '#FFFFFF' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#D97706';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#F59E0B';
                }}
              >
                View Admin Portal
              </Button>
            </div>

            {/* Recruiter Card */}
            <div 
              className="bg-white rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2 group"
              onClick={onSelectRecruiter}
            >
              <div 
                className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300"
                style={{ backgroundColor: '#EEF2FF' }}
              >
                <Briefcase size={32} style={{ color: '#6366F1' }} />
              </div>
              
              <h2 className="text-xl text-center mb-3" style={{ color: '#1F2937' }}>
                Recruiter Portal
              </h2>
              
              <p className="text-gray-600 text-center text-sm mb-4 min-h-[60px]">
                Post positions, review applications, conduct interviews, and track recruitment metrics
              </p>
              
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-xs text-gray-600">
                  <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: '#6366F1' }}></div>
                  Dashboard & Analytics
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-600">
                  <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: '#6366F1' }}></div>
                  Open Projects
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-600">
                  <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: '#6366F1' }}></div>
                  Notifications
                </div>
              </div>
              
              <Button 
                className="w-full rounded-xl py-4 text-sm transition-all duration-200"
                style={{ backgroundColor: '#6366F1', color: '#FFFFFF' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#4F46E5';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#6366F1';
                }}
              >
                View Recruiter Portal
              </Button>
            </div>

            {/* Candidate Card */}
            <div 
              className="bg-white rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2 group"
              onClick={onSelectCandidate}
            >
              <div 
                className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300"
                style={{ backgroundColor: '#F0FDF4' }}
              >
                <UserCircle size={32} style={{ color: '#10B981' }} />
              </div>
              
              <h2 className="text-xl text-center mb-3" style={{ color: '#1F2937' }}>
                Candidate Experience
              </h2>
              
              <p className="text-gray-600 text-center text-sm mb-4 min-h-[60px]">
                Complete assessments, participate in interviews, and track application progress
              </p>
              
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-xs text-gray-600">
                  <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: '#10B981' }}></div>
                  Technical Assessments
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-600">
                  <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: '#10B981' }}></div>
                  AI-Powered Interviews
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-600">
                  <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: '#10B981' }}></div>
                  Recorded Video Interviews
                </div>
              </div>
              
              <Button 
                className="w-full rounded-xl py-4 text-sm transition-all duration-200"
                style={{ backgroundColor: '#10B981', color: '#FFFFFF' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#059669';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#10B981';
                }}
              >
                View Candidate Flow
              </Button>
            </div>

            {/* Application Form Card - NEW */}
            <div 
              className="bg-white rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2 group"
              onClick={onSelectApplicationForm}
            >
              <div 
                className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300"
                style={{ backgroundColor: '#DBEAFE' }}
              >
                <FileText size={32} style={{ color: '#3B82F6' }} />
              </div>
              
              <h2 className="text-xl text-center mb-3" style={{ color: '#1F2937' }}>
                Application Form
              </h2>
              
              <p className="text-gray-600 text-center text-sm mb-4 min-h-[60px]">
                Submit your application with personal details, contact info, and upload your CV
              </p>
              
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-xs text-gray-600">
                  <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: '#3B82F6' }}></div>
                  Personal Information
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-600">
                  <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: '#3B82F6' }}></div>
                  Contact Details
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-600">
                  <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: '#3B82F6' }}></div>
                  CV Upload
                </div>
              </div>
              
              <Button 
                className="w-full rounded-xl py-4 text-sm transition-all duration-200"
                style={{ backgroundColor: '#3B82F6', color: '#FFFFFF' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#2563EB';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#3B82F6';
                }}
              >
                View Application Form
              </Button>
            </div>
          </div>

          {/* Info Text */}
          <div className="text-center mt-12">
            <p className="text-gray-500 text-sm">
              Each design showcases the complete user flow, components, and interactions for that specific role
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}