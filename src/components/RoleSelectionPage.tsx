import { UserCircle, Briefcase, Shield } from 'lucide-react';
import { Card } from './ui/card';
import logo from 'figma:asset/8bd93ed4627c09346a804ff348fc063b132b8b5d.png';

interface RoleSelectionPageProps {
  onSelectRecruiter: () => void;
  onSelectCandidate: () => void;
  onSelectAdmin: () => void;
}

export function RoleSelectionPage({ onSelectRecruiter, onSelectCandidate, onSelectAdmin }: RoleSelectionPageProps) {
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#EDF0F8' }}>
      <div className="w-full max-w-6xl px-6">
        {/* Logo */}
        <div className="text-center mb-12">
          <img src={logo} alt="ERAMATCH - A Smarter Recruitment System" className="h-16 mx-auto mb-6" />
          <h1 className="text-gray-700 mb-2">Welcome to ERAMATCH</h1>
          <p className="text-gray-500">Please select your role to continue</p>
        </div>

        {/* Role Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Candidate Card */}
          <Card 
            className="p-8 hover:shadow-lg transition-all duration-200 cursor-pointer border-2 border-transparent hover:border-indigo-200"
            onClick={onSelectCandidate}
          >
            <div className="text-center">
              <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: '#6366F1' }}>
                <UserCircle size={48} className="text-white" />
              </div>
              <h2 className="text-gray-700 mb-2">Candidate</h2>
              <p className="text-gray-500 mb-6">Access your job applications and profile</p>
              <div className="px-6 py-2 rounded-full inline-block text-white" style={{ backgroundColor: '#6366F1' }}>
                Continue
              </div>
            </div>
          </Card>

          {/* Recruiter Card */}
          <Card 
            className="p-8 hover:shadow-lg transition-all duration-200 cursor-pointer border-2 border-transparent hover:border-indigo-200"
            onClick={onSelectRecruiter}
          >
            <div className="text-center">
              <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: '#6366F1' }}>
                <Briefcase size={48} className="text-white" />
              </div>
              <h2 className="text-gray-700 mb-2">Recruiter</h2>
              <p className="text-gray-500 mb-6">Manage projects, candidates, and hiring</p>
              <div className="px-6 py-2 rounded-full inline-block text-white" style={{ backgroundColor: '#6366F1' }}>
                Continue
              </div>
            </div>
          </Card>

          {/* Admin Card */}
          <Card 
            className="p-8 hover:shadow-lg transition-all duration-200 cursor-pointer border-2 border-transparent hover:border-indigo-200"
            onClick={onSelectAdmin}
          >
            <div className="text-center">
              <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: '#6366F1' }}>
                <Shield size={48} className="text-white" />
              </div>
              <h2 className="text-gray-700 mb-2">Admin</h2>
              <p className="text-gray-500 mb-6">Manage system settings and users</p>
              <div className="px-6 py-2 rounded-full inline-block text-white" style={{ backgroundColor: '#6366F1' }}>
                Continue
              </div>
            </div>
          </Card>
        </div>

        {/* Temporary Note */}
        <div className="text-center mt-8">
          <p className="text-gray-400 text-sm italic">This page is temporary for Figma modeling and will be removed later</p>
        </div>
      </div>
    </div>
  );
}