import { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { ProjectsPage } from './components/ProjectsPage';
import { ProjectDetailPage } from './components/ProjectDetailPage';
import { CreateAssessmentPage, Question } from './components/CreateAssessmentPage';
import { LandingPage } from './components/LandingPage';
import { DesignsRedirectPage } from './components/DesignsRedirectPage';
import { RoleSelectionPage } from './components/RoleSelectionPage';
import { CandidateLoginPage } from './components/CandidateLoginPage';
import { CandidateDashboard } from './components/CandidateDashboard';
import { RecordedInterviewFlow } from './components/RecordedInterviewFlow';
import { LiveInterviewFlow } from './components/LiveInterviewFlow';
import { TechnicalAssessmentFlow } from './components/TechnicalAssessmentFlow';
import { CandidateApplicationForm } from './components/CandidateApplicationForm';
import { AdminSidebar } from './components/AdminSidebar';
import { AdminDashboard } from './components/AdminDashboard';
import { AdminOrganizationMembers } from './components/AdminOrganizationMembers';
import { AdminPendingRequests } from './components/AdminPendingRequests';
import { AdminSettings } from './components/AdminSettings';
import { AdminRecruiterDelegation } from './components/AdminRecruiterDelegation';
import { AdminClosedPositions } from './components/AdminClosedPositions';
import { Notifications } from './components/Notifications';
import { PositionDashboard } from './components/PositionDashboard';
import { EnhancedGroupOverviewV2 } from './components/EnhancedGroupOverviewV2';
import { CandidateProfile } from './components/CandidateProfile';
import { KnowledgeGraph } from './components/KnowledgeGraph';
import { AlertsNotifications } from './components/AlertsNotifications';
import { AIInterviewSetupLive } from './components/AIInterviewSetupLive';
import { AIInterviewSetupRecorded } from './components/AIInterviewSetupRecorded';
import { RecordedInterviewQuestionSetup } from './components/RecordedInterviewQuestionSetup';
import { Button } from './components/ui/button';
import { Bell } from 'lucide-react';
import logo from 'figma:asset/8bd93ed4627c09346a804ff348fc063b132b8b5d.png';
import imgImageEramatch from 'figma:asset/32b64e522a3b524affa7936547f1cc68d3dc74c8.png';

interface Assessment {
  id: string;
  title: string;
  questions: Question[];
  createdAt: Date;
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<'landing' | 'designs-redirect' | 'application-form' | 'role-selection' | 'candidate-login' | 'candidate-dashboard' | 'recorded-interview' | 'live-interview' | 'technical-assessment' | 'dashboard' | 'projects' | 'create-assessment' | 'position-dashboard' | 'group-overview' | 'candidate-profile' | 'knowledge-graph' | 'alerts' | 'admin-dashboard' | 'admin-members' | 'admin-requests' | 'admin-settings' | 'admin-delegation' | 'admin-closed-positions' | 'ai-interview-live-setup' | 'ai-interview-recorded-setup' | 'recorded-interview-questions'>('landing');
  const [selectedProject, setSelectedProject] = useState<string>('');
  const [selectedPosition, setSelectedPosition] = useState<{ projectTitle: string; positionTitle: string } | null>(null);
  const [selectedCandidateId, setSelectedCandidateId] = useState<number | null>(null);
  const [selectedGroupId, setSelectedGroupId] = useState<string | null>(null);
  const [selectedGroupName, setSelectedGroupName] = useState<string>('Senior React Developers Q1 2025');
  const [recordedInterviewCompleted, setRecordedInterviewCompleted] = useState(false);
  const [liveInterviewCompleted, setLiveInterviewCompleted] = useState(false);
  const [technicalAssessmentCompleted, setTechnicalAssessmentCompleted] = useState(false);
  const [pendingAssessment, setPendingAssessment] = useState<Assessment | null>(null);

  const handleViewProject = (projectTitle: string) => {
    setSelectedProject(projectTitle);
    setCurrentPage('projects');
  };

  // If on landing page, show only that page
  if (currentPage === 'landing') {
    return (
      <LandingPage 
        onGetStarted={() => setCurrentPage('designs-redirect')}
        onViewDesigns={() => setCurrentPage('designs-redirect')}
      />
    );
  }

  // If on designs redirect page, show only that page
  if (currentPage === 'designs-redirect') {
    return (
      <DesignsRedirectPage 
        onBack={() => setCurrentPage('landing')}
        onSelectAdmin={() => setCurrentPage('admin-dashboard')}
        onSelectRecruiter={() => setCurrentPage('dashboard')}
        onSelectCandidate={() => setCurrentPage('candidate-login')}
        onSelectApplicationForm={() => setCurrentPage('application-form')}
      />
    );
  }

  // If on application form page, show only that page
  if (currentPage === 'application-form') {
    return (
      <CandidateApplicationForm 
        onBack={() => setCurrentPage('designs-redirect')}
      />
    );
  }

  // If on role selection page, show only that page
  if (currentPage === 'role-selection') {
    return (
      <RoleSelectionPage 
        onSelectRecruiter={() => setCurrentPage('dashboard')} 
        onSelectCandidate={() => setCurrentPage('candidate-login')}
        onSelectAdmin={() => setCurrentPage('admin-dashboard')}
      />
    );
  }

  // If on candidate login page, show only that page
  if (currentPage === 'candidate-login') {
    return (
      <CandidateLoginPage 
        onBack={() => setCurrentPage('designs-redirect')} 
        onSignIn={() => setCurrentPage('candidate-dashboard')}
      />
    );
  }

  // If on candidate dashboard, show candidate view
  if (currentPage === 'candidate-dashboard') {
    return (
      <CandidateDashboard 
        onSignOut={() => setCurrentPage('candidate-login')}
        onStartRecordedInterview={() => setCurrentPage('recorded-interview')}
        recordedInterviewCompleted={recordedInterviewCompleted}
        onStartLiveInterview={() => setCurrentPage('live-interview')}
        liveInterviewCompleted={liveInterviewCompleted}
        onStartTechnicalAssessment={() => setCurrentPage('technical-assessment')}
        technicalAssessmentCompleted={technicalAssessmentCompleted}
      />
    );
  }

  // If on recorded interview, show recorded interview flow
  if (currentPage === 'recorded-interview') {
    return (
      <RecordedInterviewFlow 
        onSignOut={() => setCurrentPage('candidate-login')}
        onExit={() => setCurrentPage('candidate-dashboard')}
        onCompletion={() => setRecordedInterviewCompleted(true)}
      />
    );
  }

  // If on live interview, show live interview flow
  if (currentPage === 'live-interview') {
    return (
      <LiveInterviewFlow 
        onSignOut={() => setCurrentPage('candidate-login')}
        onExit={() => setCurrentPage('candidate-dashboard')}
        onCompletion={() => setLiveInterviewCompleted(true)}
      />
    );
  }

  // If on technical assessment, show technical assessment flow
  if (currentPage === 'technical-assessment') {
    return (
      <TechnicalAssessmentFlow 
        onSignOut={() => setCurrentPage('candidate-login')}
        onExit={() => setCurrentPage('candidate-dashboard')}
        onCompletion={() => {
          setTechnicalAssessmentCompleted(true);
          setCurrentPage('candidate-dashboard');
        }}
      />
    );
  }

  // If on admin pages, show admin view
  if (currentPage === 'admin-dashboard' || currentPage === 'admin-members' || currentPage === 'admin-requests' || currentPage === 'admin-settings' || currentPage === 'admin-delegation' || currentPage === 'admin-closed-positions') {
    return (
      <div className="min-h-screen" style={{ backgroundColor: '#EDF0F8' }}>
        <AdminSidebar 
          activePage={
            currentPage === 'admin-dashboard' ? 'dashboard' : 
            currentPage === 'admin-members' ? 'members' : 
            currentPage === 'admin-requests' ? 'requests' : 
            currentPage === 'admin-settings' ? 'settings' : 
            currentPage === 'admin-delegation' ? 'delegation' :
            currentPage === 'admin-closed-positions' ? 'closed-positions' :
            'dashboard'
          } 
          onNavigate={(page) => setCurrentPage(
            page === 'dashboard' ? 'admin-dashboard' : 
            page === 'members' ? 'admin-members' : 
            page === 'requests' ? 'admin-requests' : 
            page === 'settings' ? 'admin-settings' : 
            page === 'delegation' ? 'admin-delegation' :
            page === 'closed-positions' ? 'admin-closed-positions' :
            'admin-dashboard'
          )} 
        />
        
        <div className="ml-20">
          {/* Header */}
          <header className="px-12 py-6">
            <div className="flex items-center justify-between">
              <div>
                <img src={logo} alt="ERAMATCH - A Smarter Recruitment System" className="h-12" />
              </div>
              <div className="flex items-center gap-4">
                <Notifications />
                <Button 
                  className="rounded-full px-6 transition-colors duration-200 border"
                  style={{ backgroundColor: '#EDF0F8', color: '#EF4444', borderColor: '#EF4444' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#EF4444';
                    e.currentTarget.style.color = '#FFFFFF';
                    e.currentTarget.style.borderColor = '#EF4444';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#EDF0F8';
                    e.currentTarget.style.color = '#EF4444';
                    e.currentTarget.style.borderColor = '#EF4444';
                  }}
                  onClick={() => setCurrentPage('landing')}
                >
                  Sign out
                </Button>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main>
            {currentPage === 'admin-dashboard' ? (
              <AdminDashboard 
                onSignOut={() => setCurrentPage('role-selection')}
              />
            ) : currentPage === 'admin-members' ? (
              <AdminOrganizationMembers 
                onSignOut={() => setCurrentPage('role-selection')} 
                onViewPendingRequests={() => setCurrentPage('admin-requests')}
              />
            ) : currentPage === 'admin-requests' ? (
              <AdminPendingRequests 
                onSignOut={() => setCurrentPage('role-selection')} 
                onBack={() => setCurrentPage('admin-members')}
              />
            ) : currentPage === 'admin-settings' ? (
              <AdminSettings 
                onSignOut={() => setCurrentPage('role-selection')}
              />
            ) : currentPage === 'admin-delegation' ? (
              <AdminRecruiterDelegation 
                onSignOut={() => setCurrentPage('role-selection')}
              />
            ) : (
              <AdminClosedPositions 
                onSignOut={() => setCurrentPage('role-selection')}
              />
            )}
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#EDF0F8' }}>
      {currentPage.startsWith('admin') ? (
        <AdminSidebar activePage={currentPage} onNavigate={setCurrentPage} />
      ) : (
        <Sidebar activePage={currentPage} onNavigate={setCurrentPage} />
      )}
      
      <div className="ml-[96px] transition-all duration-300">
        {/* Header - Figma Design Style for Recruiter View */}
        <header className="bg-[#edf0f8] h-[90px]">
          <div className="flex flex-row items-center size-full">
            <div className="box-border content-stretch flex h-[90px] items-center justify-between px-[32px] py-0 w-full">
              {/* Logo */}
              <div className="h-[40px] w-[201.188px]">
                <img 
                  src={imgImageEramatch} 
                  alt="ERAMATCH" 
                  className="h-[40px] w-[201.188px] object-cover" 
                />
              </div>
              
              {/* Notifications and Sign Out */}
              <div className="flex items-center gap-[16px]">
                {/* Notification Bell Icon */}
                <div className="w-[36px] h-[36px] rounded-[10px] flex items-center justify-center cursor-pointer hover:bg-[#dad3ff] transition-colors">
                  <Notifications />
                </div>
                
                {/* Sign Out Button */}
                <button 
                  className="h-[42px] rounded-full border border-[#c63434] px-6 flex items-center justify-center text-[#c63434] hover:bg-[#c63434] hover:text-white transition-colors duration-200 font-['Arimo',sans-serif] text-[16px]"
                  onClick={() => setCurrentPage('role-selection')}
                >
                  Sign out
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main>
          {currentPage === 'alerts' ? (
            <AlertsNotifications 
              onViewCandidate={(candidateId) => {
                setSelectedCandidateId(candidateId);
                setCurrentPage('candidate-profile');
              }}
            />
          ) : currentPage === 'position-dashboard' ? (
            <PositionDashboard
              positionTitle={selectedPosition?.positionTitle || ''}
              projectTitle={selectedPosition?.projectTitle || ''}
              onBack={() => setCurrentPage('projects')}
              onViewCandidate={(candidateId) => {
                setSelectedCandidateId(candidateId);
                setCurrentPage('candidate-profile');
              }}
              onCreateGroup={(candidateIds, groupData) => {
                setSelectedGroupId(`group-${Date.now()}`);
                setSelectedGroupName(groupData?.name || 'New Candidate Group');
                setCurrentPage('group-overview');
              }}
              onViewGroup={(groupId) => {
                setSelectedGroupId(groupId);
                setCurrentPage('group-overview');
              }}
            />
          ) : currentPage === 'group-overview' ? (
            <EnhancedGroupOverviewV2
              groupId={selectedGroupId || ''}
              groupName={selectedGroupName}
              description="High-performing candidates filtered by advanced criteria"
              assignedRecruiter="John Doe - Senior Recruiter"
              candidateIds={[1, 2, 3, 4, 5, 6, 7, 8]}
              onBack={() => setCurrentPage('position-dashboard')}
              onViewCandidate={(candidateId) => {
                setSelectedCandidateId(candidateId);
                setCurrentPage('candidate-profile');
              }}
              onOpenLiveAISetup={() => setCurrentPage('ai-interview-live-setup')}
              onOpenRecordedAISetup={() => setCurrentPage('ai-interview-recorded-setup')}
              onCreateAssessment={() => setCurrentPage('create-assessment')}
            />
          ) : currentPage === 'ai-interview-live-setup' ? (
            <AIInterviewSetupLive
              groupName="Senior React Developers Q1 2025"
              onBack={() => setCurrentPage('group-overview')}
            />
          ) : currentPage === 'ai-interview-recorded-setup' ? (
            <AIInterviewSetupRecorded
              groupName="Senior React Developers Q1 2025"
              onBack={() => setCurrentPage('group-overview')}
              onSetupQuestions={() => setCurrentPage('recorded-interview-questions')}
            />
          ) : currentPage === 'recorded-interview-questions' ? (
            <RecordedInterviewQuestionSetup
              groupName="Senior React Developers Q1 2025"
              onBack={() => setCurrentPage('ai-interview-recorded-setup')}
              onContinue={() => setCurrentPage('ai-interview-recorded-setup')}
            />
          ) : currentPage === 'candidate-profile' ? (
            <CandidateProfile
              candidateId={selectedCandidateId || 1}
              onBack={() => {
                // Go back to previous page based on context
                if (selectedGroupId) {
                  setCurrentPage('group-overview');
                } else if (selectedPosition) {
                  setCurrentPage('position-dashboard');
                } else {
                  setCurrentPage('projects');
                }
              }}
              onViewKnowledgeGraph={() => setCurrentPage('knowledge-graph')}
            />
          ) : currentPage === 'knowledge-graph' ? (
            <KnowledgeGraph
              candidateId={selectedCandidateId || 1}
              candidateName="John Smith"
              onBack={() => setCurrentPage('candidate-profile')}
            />
          ) : currentPage === 'dashboard' ? (
            <Dashboard 
              onViewAllProjects={() => {
                setSelectedProject('');
                setCurrentPage('projects');
              }} 
              onViewProject={handleViewProject}
            />
          ) : currentPage === 'candidate-dashboard' ? (
            <CandidateDashboard />
          ) : currentPage === 'create-assessment' ? (
            <CreateAssessmentPage 
              onBack={() => setCurrentPage('projects')}
              onSave={(title, questions) => {
                const newAssessment: Assessment = {
                  id: `assessment-${Date.now()}`,
                  title,
                  questions,
                  createdAt: new Date(),
                };
                setPendingAssessment(newAssessment);
                setCurrentPage('projects');
              }}
            />
          ) : (
            <ProjectsPage 
              onViewProject={handleViewProject} 
              initialProjectTitle={selectedProject}
              onBackToDashboard={() => {
                setSelectedProject('');
                setCurrentPage('dashboard');
              }}
              onCreateAssessment={() => setCurrentPage('create-assessment')}
              onViewDashboard={(projectTitle, positionTitle) => {
                setSelectedPosition({ projectTitle, positionTitle });
                setCurrentPage('position-dashboard');
              }}
              onViewGroup={(groupId) => {
                setSelectedGroupId(groupId);
                setCurrentPage('group-overview');
              }}
              pendingAssessment={pendingAssessment}
              onAssessmentConsumed={() => setPendingAssessment(null)}
            />
          )}
        </main>
      </div>
    </div>
  );
}