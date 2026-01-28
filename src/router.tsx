import { createBrowserRouter, Navigate, useNavigate, useSearchParams } from 'react-router-dom';
import ErrorPage from './components/common/ErrorPage';
import { LandingPage } from './components/common/LandingPage';
import { PaymentGatewayPage } from './components/common/PaymentGatewayPage';
import { AdminLoginPage } from './components/admin/AdminLoginPage';
import { RecruiterLoginPage } from './components/recruiter/RecruiterLoginPage';
import { CandidateLoginPage } from './components/candidate/CandidateLoginPage';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { AdminSettings } from './components/admin/AdminSettings';
import { AdminRecruiterDelegation } from './components/admin/AdminRecruiterDelegation';
import { AdminClosedPositions } from './components/admin/AdminClosedPositions';
import { AdminSubscriptionManagement } from './components/admin/AdminSubscriptionManagement';
import { AdminOrganizationMembers } from './components/admin/AdminOrganizationMembers';
import { AdminSidebar } from './components/admin/AdminSidebar';
import { Sidebar } from './components/recruiter/Sidebar';
import { Dashboard } from './components/recruiter/Dashboard';
import { ProjectsPage } from './components/recruiter/ProjectsPage';
import { CandidatesPage } from './components/recruiter/CandidatesPage';
import { QuestionBankPage } from './components/recruiter/QuestionBankPage';
import { AlertsNotifications } from './components/common/AlertsNotifications';
import { CandidateHomePage } from './components/candidate/CandidateHomePage';
import { CandidateDashboard } from './components/candidate/CandidateDashboard';
import { EnhancedGroupOverviewV2 } from './components/recruiter/EnhancedGroupOverviewV2';
import { mockPositionGroups } from './data/mockData';
import { useParams } from 'react-router-dom';

// Layout Wrappers
const AdminLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="min-h-screen" style={{ backgroundColor: '#EDF0F8' }}>
            <AdminSidebar />
            <div className="ml-20">
                <main>{children}</main>
            </div>
        </div>
    );
};

const RecruiterLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="min-h-screen" style={{ backgroundColor: '#EDF0F8' }}>
            <Sidebar />
            <div className="ml-[96px] transition-all duration-300">
                <main>{children}</main>
            </div>
        </div>
    );
};

// Wrapper Components for Navigation
const DashboardWrapper = () => {
    const navigate = useNavigate();
    return (
        <Dashboard
            onViewAllProjects={() => navigate('/recruiter/projects')}
            onViewProject={(title) => navigate(`/recruiter/projects?project=${encodeURIComponent(title)}`)}
        />
    );
};

const ProjectsPageWrapper = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const initialProjectTitle = searchParams.get('project') || undefined;

    return (
        <ProjectsPage
            onViewProject={(title) => navigate(`/recruiter/projects?project=${encodeURIComponent(title)}`)}
            initialProjectTitle={initialProjectTitle}
            onBackToDashboard={() => navigate('/recruiter/dashboard')}
            onCreateAssessment={() => console.log('Create Assessment')}
            onViewDashboard={(title, position) => navigate(`/recruiter/dashboard`)}
            onViewGroup={(groupId) => navigate(`/recruiter/group/${groupId}`)}
            pendingAssessment={null}
            onAssessmentConsumed={() => { }}
            returnToGroupsTab={false}
            initialPosition=""
            onPositionSelect={() => { }}
        />
    );
};

const CandidateDashboardWrapper = () => {
    const navigate = useNavigate();
    return (
        <CandidateDashboard
            onSignOut={() => navigate('/')}
            onBack={() => navigate('/candidate/home')}
            onStartRecordedInterview={() => console.log('Start Recorded Interview')}
            recordedInterviewCompleted={false}
            onStartLiveInterview={() => console.log('Start Live Interview')}
            liveInterviewCompleted={false}
            onStartTechnicalAssessment={() => console.log('Start Technical Assessment')}
            technicalAssessmentCompleted={false}
        />
    )
}

const CandidateHomePageWrapper = () => {
    const navigate = useNavigate();
    return (
        <CandidateHomePage
            onOpenTestingPage={() => navigate('/candidate/testing')}
            currentStage="assessment"
        />
    );
};

const GroupOverviewWrapper = () => {
    const { groupId } = useParams();
    const navigate = useNavigate();
    const group = mockPositionGroups.find(g => g.id.toString() === groupId);

    if (!group) return <div>Group not found</div>;

    // Construct filtration flow based on flags
    const flow: ('assessment' | 'ai-interview' | 'live-interview')[] = [];
    if (group.hasAssessment) flow.push('assessment');
    if (group.hasAIInterview) flow.push('ai-interview');
    if (group.hasLiveInterview) flow.push('live-interview');

    return (
        <EnhancedGroupOverviewV2
            groupId={group.id.toString()}
            groupName={group.groupName}
            description="High-performing candidates filtered by advanced criteria"
            assignedRecruiter={"John Doe - Senior Recruiter"} // Fallback or mock property
            candidateIds={[1, 2, 3, 4, 5, 6, 7, 8]} // Mock IDs
            recruiterType="technical" // Restored to technical default
            filtrationFlow={flow}
            onBack={() => navigate(-1)}
            onViewCandidate={(id) => console.log('View candidate', id)}
        />
    );
};

export const router = createBrowserRouter([
    {
        path: "/",
        element: <LandingPage
            onGetStarted={() => window.location.href = '/payment'}
            onViewDesigns={() => window.location.href = '/payment'}
            onAdminLogin={() => window.location.href = '/admin/login'}
            onRecruiterLogin={() => window.location.href = '/recruiter/login'}
            onCandidateView={() => window.location.href = '/candidate/login'}
        />,
        errorElement: <ErrorPage />,
    },
    {
        path: "/payment",
        element: <PaymentGatewayPage
            onBack={() => window.location.href = '/'}
            onComplete={() => window.location.href = '/recruiter/login'}
            onBypass={() => window.location.href = '/recruiter/login'}
        />,
        errorElement: <ErrorPage />,
    },
    // Admin Routes
    {
        path: "/admin/login",
        element: <AdminLoginPage onBack={() => window.location.href = '/'} onSignIn={() => window.location.href = '/admin/dashboard'} />,
        errorElement: <ErrorPage />,
    },
    {
        path: "/admin/dashboard",
        element: (
            <AdminLayout>
                <AdminDashboard onSignOut={() => window.location.href = '/'} />
            </AdminLayout>
        ),
        errorElement: <ErrorPage />,
    },
    {
        path: "/admin/members",
        element: (
            <AdminLayout>
                <AdminOrganizationMembers onSignOut={() => window.location.href = '/'} />
            </AdminLayout>
        ),
    },
    {
        path: "/admin/settings",
        element: (
            <AdminLayout>
                <AdminSettings onSignOut={() => window.location.href = '/'} />
            </AdminLayout>
        ),
    },
    {
        path: "/admin/delegation",
        element: (
            <AdminLayout>
                <AdminRecruiterDelegation onSignOut={() => window.location.href = '/'} />
            </AdminLayout>
        ),
    },
    {
        path: "/admin/closed-positions",
        element: (
            <AdminLayout>
                <AdminClosedPositions onSignOut={() => window.location.href = '/'} />
            </AdminLayout>
        ),
    },
    {
        path: "/admin/subscription",
        element: (
            <AdminLayout>
                <AdminSubscriptionManagement onSignOut={() => window.location.href = '/'} />
            </AdminLayout>
        ),
    },

    // Recruiter Routes
    {
        path: "/recruiter/login",
        element: <RecruiterLoginPage onBack={() => window.location.href = '/'} onSignIn={() => window.location.href = '/recruiter/dashboard'} />,
        errorElement: <ErrorPage />,
    },
    {
        path: "/recruiter/dashboard",
        element: (
            <RecruiterLayout>
                <DashboardWrapper />
            </RecruiterLayout>
        ),
        errorElement: <ErrorPage />,
    },
    {
        path: "/recruiter/projects",
        element: (
            <RecruiterLayout>
                <ProjectsPageWrapper />
            </RecruiterLayout>
        ),
    },
    {
        path: "/recruiter/group/:groupId",
        element: (
            <RecruiterLayout>
                <GroupOverviewWrapper />
            </RecruiterLayout>
        ),
    },

    // ... existing wrappers ...

    // In router configuration:
    {
        path: "/recruiter/projects",
        element: (
            <RecruiterLayout>
                <ProjectsPageWrapper />
            </RecruiterLayout>
        ),
    },
    {
        path: "/recruiter/group/:groupId",
        element: (
            <RecruiterLayout>
                <GroupOverviewWrapper />
            </RecruiterLayout>
        ),
    },
    {
        path: "/recruiter/alerts",
        element: (
            <RecruiterLayout>
                <AlertsNotifications onViewCandidate={(id) => console.log('View candidate', id)} />
            </RecruiterLayout>
        )
    },
    {
        path: "/recruiter/candidates",
        element: (
            <RecruiterLayout>
                <CandidatesPage onBack={() => { }} />
            </RecruiterLayout>
        ),
    },
    {
        path: "/recruiter/question-bank",
        element: (
            <RecruiterLayout>
                <QuestionBankPage onBack={() => window.history.back()} />
            </RecruiterLayout>
        )
    },
    {
        path: "/recruiter/settings",
        element: (
            <RecruiterLayout>
                <div className="p-8"><h1 className="text-2xl font-bold">Settings</h1><p>Settings page content placeholder</p></div>
            </RecruiterLayout>
        )
    },

    // Candidate Routes
    {
        path: "/candidate/login",
        element: <CandidateLoginPage onBack={() => window.location.href = '/'} onSignIn={() => window.location.href = '/candidate/home'} />,
        errorElement: <ErrorPage />,
    },
    {
        path: "/candidate/home",
        element: <CandidateHomePageWrapper />,
        errorElement: <ErrorPage />,
    },
    {
        path: "/candidate/testing",
        element: <CandidateDashboardWrapper />
    }
]);
