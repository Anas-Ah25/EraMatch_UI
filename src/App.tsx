import { useState } from 'react';
import { CreateAssessmentPage, Question } from './components/CreateAssessmentPage';
import { LandingPage } from './components/LandingPage';
import { CandidateLoginPage } from './components/CandidateLoginPage';
import { AdminLoginPage } from './components/AdminLoginPage';
import { RecruiterLoginPage } from './components/RecruiterLoginPage';
import { PaymentGatewayPage } from './components/PaymentGatewayPage';
import { CandidateDashboard } from './components/CandidateDashboard';
import { RecordedInterviewFlow } from './components/RecordedInterviewFlow';
import { LiveInterviewFlow } from './components/LiveInterviewFlow';
import { TechnicalAssessmentFlow } from './components/TechnicalAssessmentFlow';
import { ModuleDetailAssessment } from './components/ModuleDetailAssessment';
import { ModuleDetailAIInterview } from './components/ModuleDetailAIInterview';
import { SkillClusteringWorkflow } from './components/SkillClusteringWorkflow';
import { AdminSidebar } from './components/AdminSidebar';
import { AdminDashboard } from './components/AdminDashboard';
import { AdminOrganizationMembers } from './components/AdminOrganizationMembers';
import { AdminPendingRequests } from './components/AdminPendingRequests';
import { AdminSettings } from './components/AdminSettings';
import { AdminRecruiterDelegation } from './components/AdminRecruiterDelegation';
import { AdminClosedPositions } from './components/AdminClosedPositions';
import { AdminSuspiciousEvents } from './components/AdminSuspiciousEvents';
import { AdminSuspectReviewPage } from './components/AdminSuspectReviewPage';
import { Sidebar } from './components/Sidebar';
import { Notifications } from './components/Notifications';
import { Button } from './components/ui/button';
import { AlertsNotifications } from './components/AlertsNotifications';
import { PositionDashboard } from './components/PositionDashboard';
import { EnhancedGroupOverviewV2 } from './components/EnhancedGroupOverviewV2';
import { AIInterviewSetupLive } from './components/AIInterviewSetupLive';
import { AIInterviewSetupRecorded } from './components/AIInterviewSetupRecorded';
import { RecordedInterviewQuestionSetup } from './components/RecordedInterviewQuestionSetup';
import { CandidateProfile } from './components/CandidateProfile';
import { KnowledgeGraph } from './components/KnowledgeGraph';
import { Dashboard } from './components/Dashboard';
import { CreateAIInterview } from './components/CreateAIInterview';
import { QuestionBankPage } from './components/QuestionBankPage';
import { CandidatesPage } from './components/CandidatesPage';
import { ProjectsPage } from './components/ProjectsPage';
import logo from './imports/image-eramatch.png';
import imgImageEramatch from './imports/image-eramatch.png';

interface Assessment {
  id: string;
  title: string;
  questions: Question[];
  createdAt: Date;
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<'landing' | 'payment-gateway' | 'admin-login' | 'recruiter-login' | 'candidate-login' | 'candidate-dashboard' | 'recorded-interview' | 'live-interview' | 'technical-assessment' | 'dashboard' | 'projects' | 'create-assessment' | 'create-ai-interview' | 'position-dashboard' | 'group-overview' | 'candidate-profile' | 'knowledge-graph' | 'alerts' | 'candidates' | 'admin-dashboard' | 'admin-members' | 'admin-requests' | 'admin-settings' | 'admin-delegation' | 'admin-closed-positions' | 'admin-suspicious-events' | 'admin-suspect-review' | 'ai-interview-live-setup' | 'ai-interview-recorded-setup' | 'recorded-interview-questions' | 'question-bank' | 'module-detail-assessment' | 'module-detail-ai-interview' | 'skill-clustering'>('landing');
  const [selectedProject, setSelectedProject] = useState<string>('');
  const [selectedPosition, setSelectedPosition] = useState<{ projectTitle: string; positionTitle: string } | null>(null);
  const [selectedCandidateId, setSelectedCandidateId] = useState<number | null>(null);
  const [selectedGroupId, setSelectedGroupId] = useState<string | null>(null);
  const [selectedGroupName, setSelectedGroupName] = useState<string>('Senior React Developers Q1 2025');
  const [previousPage, setPreviousPage] = useState<string>('projects'); // Track previous page for group navigation
  const [recordedInterviewCompleted, setRecordedInterviewCompleted] = useState(false);
  const [liveInterviewCompleted, setLiveInterviewCompleted] = useState(false);
  const [technicalAssessmentCompleted, setTechnicalAssessmentCompleted] = useState(false);
  const [pendingAssessment, setPendingAssessment] = useState<Assessment | null>(null);
  const [recruiterType, setRecruiterType] = useState<'recruiter' | 'technical'>('recruiter');
  const [selectedSuspiciousEvent, setSelectedSuspiciousEvent] = useState<{
    eventId: string;
    candidateId: number;
    candidateName: string;
    position: string;
    group: string;
    recruiterAssigned: string;
    module: string;
  } | null>(null);
  const [selectedModuleDetail, setSelectedModuleDetail] = useState<{
    type: 'assessment' | 'ai-interview';
    candidateId: number;
    candidateName: string;
    score: number;
    completedDate: string;
  } | null>(null);

  const handleViewProject = (projectTitle: string) => {
    setSelectedProject(projectTitle);
    setCurrentPage('projects');
  };

  // If on landing page, show only that page
  if (currentPage === 'landing') {
    return (
      <LandingPage 
        onGetStarted={() => setCurrentPage('payment-gateway')}
        onViewDesigns={() => setCurrentPage('payment-gateway')}
        onAdminLogin={() => setCurrentPage('admin-login')}
        onRecruiterLogin={() => setCurrentPage('recruiter-login')}
        onCandidateView={() => setCurrentPage('candidate-login')}
      />
    );
  }

  // If on payment gateway page, show only that page
  if (currentPage === 'payment-gateway') {
    return (
      <PaymentGatewayPage
        onBack={() => setCurrentPage('landing')}
        onComplete={() => setCurrentPage('recruiter-login')}
      />
    );
  }

  // If on admin login page, show only that page
  if (currentPage === 'admin-login') {
    return (
      <AdminLoginPage
        onBack={() => setCurrentPage('landing')}
        onSignIn={() => setCurrentPage('admin-dashboard')}
      />
    );
  }

  // If on recruiter login page, show only that page
  if (currentPage === 'recruiter-login') {
    return (
      <RecruiterLoginPage
        onBack={() => setCurrentPage('landing')}
        onSignIn={(type) => {
          setRecruiterType(type);
          setCurrentPage('dashboard');
        }}
      />
    );
  }

  // If on candidate login page, show only that page
  if (currentPage === 'candidate-login') {
    return (
      <CandidateLoginPage 
        onBack={() => setCurrentPage('landing')} 
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

  // If on module detail pages, show them full-screen
  if (currentPage === 'module-detail-assessment' && selectedModuleDetail) {
    return (
      <ModuleDetailAssessment
        candidateId={selectedModuleDetail.candidateId}
        candidateName={selectedModuleDetail.candidateName}
        score={selectedModuleDetail.score}
        completedDate={selectedModuleDetail.completedDate}
        onClose={() => {
          setSelectedModuleDetail(null);
          setCurrentPage('group-overview');
        }}
        onMoveToNextStage={() => {
          setSelectedModuleDetail(null);
          setCurrentPage('group-overview');
          // Toast will be shown by EnhancedGroupOverviewV2
        }}
      />
    );
  }

  if (currentPage === 'module-detail-ai-interview' && selectedModuleDetail) {
    return (
      <ModuleDetailAIInterview
        candidateId={selectedModuleDetail.candidateId}
        candidateName={selectedModuleDetail.candidateName}
        score={selectedModuleDetail.score}
        completedDate={selectedModuleDetail.completedDate}
        onClose={() => {
          setSelectedModuleDetail(null);
          setCurrentPage('group-overview');
        }}
        onMoveToNextStage={() => {
          setSelectedModuleDetail(null);
          setCurrentPage('group-overview');
          // Toast will be shown by EnhancedGroupOverviewV2
        }}
      />
    );
  }

  // If on skill clustering workflow, show it full-screen
  if (currentPage === 'skill-clustering') {
    const mockCandidates = [
      { id: 1, name: 'John Smith', email: 'john.smith@example.com', position: 'Senior Frontend Developer', skills: [], overallScore: 92 },
      { id: 2, name: 'Sarah Johnson', email: 'sarah.j@example.com', position: 'Full Stack Developer', skills: [], overallScore: 88 },
      { id: 3, name: 'Michael Chen', email: 'm.chen@example.com', position: 'Frontend Engineer', skills: [], overallScore: 85 },
    ];

    return (
      <SkillClusteringWorkflow
        candidates={mockCandidates}
        groupName={selectedGroupName}
        onComplete={(clusters) => {
          console.log('Clusters created:', clusters);
          setCurrentPage('group-overview');
        }}
        onBack={() => setCurrentPage('group-overview')}
      />
    );
  }

  // If on admin pages, show admin view
  if (currentPage === 'admin-dashboard' || currentPage === 'admin-members' || currentPage === 'admin-requests' || currentPage === 'admin-settings' || currentPage === 'admin-delegation' || currentPage === 'admin-closed-positions' || currentPage === 'admin-suspicious-events' || currentPage === 'admin-suspect-review') {
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
            currentPage === 'admin-suspicious-events' ? 'suspicious-events' :
            currentPage === 'admin-suspect-review' ? 'suspect-review' :
            'dashboard'
          } 
          onNavigate={(page) => setCurrentPage(
            page === 'dashboard' ? 'admin-dashboard' : 
            page === 'members' ? 'admin-members' : 
            page === 'requests' ? 'admin-requests' : 
            page === 'settings' ? 'admin-settings' : 
            page === 'delegation' ? 'admin-delegation' :
            page === 'closed-positions' ? 'admin-closed-positions' :
            page === 'suspicious-events' ? 'admin-suspicious-events' :
            page === 'suspect-review' ? 'admin-suspect-review' :
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
                onSignOut={() => setCurrentPage('landing')}
              />
            ) : currentPage === 'admin-members' ? (
              <AdminOrganizationMembers 
                onSignOut={() => setCurrentPage('landing')} 
                onViewPendingRequests={() => setCurrentPage('admin-requests')}
              />
            ) : currentPage === 'admin-requests' ? (
              <AdminPendingRequests 
                onSignOut={() => setCurrentPage('landing')} 
                onBack={() => setCurrentPage('admin-members')}
              />
            ) : currentPage === 'admin-settings' ? (
              <AdminSettings 
                onSignOut={() => setCurrentPage('landing')}
              />
            ) : currentPage === 'admin-delegation' ? (
              <AdminRecruiterDelegation 
                onSignOut={() => setCurrentPage('landing')}
              />
            ) : currentPage === 'admin-closed-positions' ? (
              <AdminClosedPositions 
                onSignOut={() => setCurrentPage('landing')}
              />
            ) : currentPage === 'admin-suspicious-events' ? (
              <AdminSuspiciousEvents 
                onSignOut={() => setCurrentPage('landing')}
                onViewEventDetail={(event) => {
                  setSelectedSuspiciousEvent(event);
                  setCurrentPage('admin-suspect-review');
                }}
              />
            ) : currentPage === 'admin-suspect-review' && selectedSuspiciousEvent ? (
              <AdminSuspectReviewPage 
                eventId={selectedSuspiciousEvent.eventId}
                candidateId={selectedSuspiciousEvent.candidateId}
                candidateName={selectedSuspiciousEvent.candidateName}
                position={selectedSuspiciousEvent.position}
                group={selectedSuspiciousEvent.group}
                recruiterAssigned={selectedSuspiciousEvent.recruiterAssigned}
                currentModule={selectedSuspiciousEvent.module}
                onBack={() => {
                  setSelectedSuspiciousEvent(null);
                  setCurrentPage('admin-suspicious-events');
                }}
              />
            ) : (
              <AdminDashboard 
                onSignOut={() => setCurrentPage('landing')}
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
                  onClick={() => setCurrentPage('landing')}
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
                setPreviousPage('position-dashboard'); // Save current page
                setCurrentPage('group-overview');
              }}
              onViewGroup={(groupId) => {
                setSelectedGroupId(groupId);
                setPreviousPage('position-dashboard'); // Save current page
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
              recruiterType={recruiterType}
              onBack={() => setCurrentPage(previousPage as any)} // Use saved previous page
              onViewCandidate={(candidateId) => {
                setSelectedCandidateId(candidateId);
                setCurrentPage('candidate-profile');
              }}
              onOpenLiveAISetup={() => setCurrentPage('ai-interview-live-setup')}
              onOpenRecordedAISetup={() => setCurrentPage('ai-interview-recorded-setup')}
              onCreateAssessment={() => setCurrentPage('create-assessment')}
              onCreateAIInterview={() => setCurrentPage('create-ai-interview')}
              onViewModuleDetail={(detail) => {
                setSelectedModuleDetail(detail);
                setCurrentPage(detail.type === 'assessment' ? 'module-detail-assessment' : 'module-detail-ai-interview');
              }}
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
          ) : currentPage === 'create-ai-interview' ? (
            <CreateAIInterview 
              onBack={() => setCurrentPage('group-overview')}
              onSave={(interview) => {
                // Handle AI interview save
                console.log('AI Interview created:', interview);
                setCurrentPage('group-overview');
              }}
            />
          ) : currentPage === 'question-bank' ? (
            <QuestionBankPage onBack={() => setCurrentPage('dashboard')} />
          ) : currentPage === 'candidates' ? (
            <CandidatesPage onBack={() => setCurrentPage('dashboard')} />
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
                setPreviousPage('projects'); // Save that we came from projects page
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