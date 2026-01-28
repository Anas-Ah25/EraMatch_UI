
const API_URL = 'http://localhost:8000';

async function fetchAPI<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const res = await fetch(`${API_URL}${endpoint}`, options);
    if (!res.ok) throw new Error(`API Error: ${res.statusText}`);
    return res.json();
}

// --- Interfaces ---

export interface JobPosition {
    id: number;
    jobTitle: string;
    department: string;
    assignedHR: string;
    assignedTechnicalRecruiter: string;
    candidatesCount: number;
    status: 'Open' | 'Interview' | 'Closed' | 'On Hold';
    projectId?: number;
}

export interface Project {
    id: number;
    projectName: string;
    positionsCount: number;
    applicantsCount: number;
    subGroupsCount: number;
    openDate: string;
}

export interface PositionGroup {
    id: number;
    groupName: string;
    positionTitle: string;
    candidatesCount: number;
    status: 'Active' | 'Processing' | 'Completed' | 'On Hold';
    createdDate: string;
    hasAssessment: boolean;
    hasAIInterview: boolean;
    hasLiveInterview: boolean;
}

export interface SelectedCandidate {
    id: number;
    name: string;
    email: string;
    selectionDate: string;
    finalScore: number;
    position: string;
}

export interface ClosedPosition {
    id: number;
    jobTitle: string;
    projectName: string;
    closureStatus: 'Filled' | 'Cancelled' | 'On Hold';
    closedDate: string;
    closureReason: string;
    candidatesCount: number;
    groupsCreated: number;
    selectedCandidates?: SelectedCandidate[];
    assessmentsPassed: number;
    aiInterviewsPassed: number;
    liveInterviewsPassed: number;
}

export interface ClosedProject {
    id: string;
    projectName: string;
    closedDate: string;
    positionsCount: number;
    totalCandidates: number;
    openDate: string;
}

export interface Member {
    id: number;
    name: string;
    email: string;
    role: string;
    position: string;
    department: string;
    joinDate: string;
}

// --- API Service ---

export const api = {
    admin: {
        getDashboardStats: async () => {
            const [stats, projects, positions, groups] = await Promise.all([
                fetchAPI<any>('/admin/stats'),
                fetchAPI<Project[]>('/projects'),
                fetchAPI<JobPosition[]>('/positions'),
                fetchAPI<PositionGroup[]>('/groups')
            ]);

            return {
                ...stats,
                projects,
                jobPositions: positions,
                positionGroups: groups,
                recentGroups: groups.slice(0, 3),
                avgTimeToFill: stats.avgTimetoHire || 28,
                pipelineData: [
                    { stage: 'Applied', count: 1245, conversion: 100 },
                    { stage: 'Screening', count: 856, conversion: 68 },
                    { stage: 'Assessment', count: 423, conversion: 49 },
                    { stage: 'Interview', count: 187, conversion: 44 },
                    { stage: 'Offer', count: 64, conversion: 34 },
                    { stage: 'Hired', count: 45, conversion: 70 }
                ],
                revenue: {
                    current: 125000,
                    target: 150000,
                    growth: 15
                }
            };
        },
        getRecruiterPerformance: async () => fetchAPI('/admin/performance'),
        getMembers: async () => fetchAPI<Member[]>('/members'),
        getPendingRequests: async () => fetchAPI('/admin/requests'),
        getSubscriptionPlans: async () => fetchAPI('/admin/subscription'),
        getNotifications: async () => fetchAPI('/admin/notifications'),
        getAlerts: async () => fetchAPI('/admin/alerts'),
        getGroupAnalytics: async (groupId: string) => fetchAPI(`/groups/${groupId}/overview`)
    },
    recruiter: {
        getDashboard: async () => {
            const [projects, groups] = await Promise.all([
                fetchAPI<Project[]>('/projects'),
                fetchAPI<PositionGroup[]>('/groups')
            ]);
            return { projects, activePositions: groups };
        },
        getProjects: async () => fetchAPI<Project[]>('/projects'),
        getProjectDetails: async (projectId: string) => {
            const projects = await fetchAPI<Project[]>('/projects');
            return projects.find(p => p.id.toString() === projectId) || projects[0];
        },
        getProjectPositions: async (projectId: number) => {
            const positions = await fetchAPI<JobPosition[]>('/positions');
            return positions.filter(p => p.projectId === projectId);
        },
        getCandidates: async () => fetchAPI('/groups/candidates/all'),
        getClosedProjects: async () => fetchAPI<ClosedProject[]>('/projects/closed'),
        getProjectGroups: async (projectId: string) => fetchAPI<PositionGroup[]>('/groups'),
        getDashboardAnalytics: async () => {
            const [projects, positions, groups] = await Promise.all([
                fetchAPI<Project[]>('/projects'),
                fetchAPI<JobPosition[]>('/positions'),
                fetchAPI<PositionGroup[]>('/groups')
            ]);
            return {
                overview: {
                    totalProjects: projects.length,
                    totalPositions: positions.length,
                    totalGroups: groups.length,
                    totalCandidates: 156
                },
                topStats: {
                    applicantsCount: 30,
                    perfectMatchCount: 3,
                    suspiciousCount: 1
                },
                groupsByStatus: [
                    { status: 'Live', count: 12, color: '#10b981' },
                    { status: 'Paused', count: 4, color: '#f59e0b' },
                    { status: 'Completed', count: 2, color: '#6366f1' }
                ],
                candidatesByStage: [
                    { stage: 'Assessment', count: 68, color: '#6366f1' },
                    { stage: 'AI Interview', count: 52, color: '#8b5cf6' },
                    { stage: 'Live Interview', count: 24, color: '#10b981' },
                    { stage: 'Approved', count: 12, color: '#059669' }
                ],
                projectPerformance: projects.map(p => ({
                    project: p.projectName,
                    groups: p.subGroupsCount,
                    candidates: p.applicantsCount
                })),
                recentActivity: [],
                weeklyTrend: []
            };
        },
        getRecruiters: async () => {
            const [hr, tech] = await Promise.all([
                fetchAPI<string[]>('/recruiters/hr'),
                fetchAPI<string[]>('/recruiters/technical')
            ]);
            const mapToObj = (names: string[], role: string) => names.map((n, i) => ({ id: `${role}-${i}`, name: n, role }));
            return [...mapToObj(hr, 'HR Recruiter'), ...mapToObj(tech, 'Technical Recruiter')];
        },
        getPipelineModules: async () => {
            return [
                { id: 'assessment', type: 'assessment', name: 'Technical Assessment', description: 'Technical skills evaluation', enabled: true },
                { id: 'ai-interview', type: 'ai-interview', name: 'AI Video Interview', description: 'AI-powered video screening', enabled: true },
                { id: 'live-interview', type: 'live-interview', name: 'Live Interview', description: 'Real-time interview session', enabled: false }
            ];
        },
        getGroupDetails: async (groupId: string) => fetchAPI(`/groups/${groupId}/details`),
        getPositionDetails: async (positionId: string) => fetchAPI(`/positions/${positionId}/details`),
        getPositionInsights: async (positionId: string) => fetchAPI(`/positions/${positionId}/insights`),
        getSuspectReview: async (candidateId: number) => fetchAPI(`/candidates/${candidateId}/suspect-review`),
        getKnowledgeGraphData: async (candidateId: number) => fetchAPI(`/candidates/${candidateId}/knowledge-graph`),
        getCandidateSkills: async (candidateIds: number[]) => {
            const res = await fetch(`${API_URL}/candidates/skills`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(candidateIds)
            });
            return res.json();
        },
        getQuestionBankVariants: async (type: string) => fetchAPI(`/questions/variants?type=${type}`),
        getGroupCandidates: async () => fetchAPI('/groups/candidates/all'),
        generateQuestionVariants: async (baseVariant: any, numVariants: number = 3) => {
            const res = await fetch(`${API_URL}/questions/generate-variants?numVariants=${numVariants}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(baseVariant)
            });
            return res.json();
        },
        getAssessmentDetails: async (candidateId: number) => fetchAPI(`/candidates/${candidateId}/assessment-details`),
        getQuestionBank: async () => fetchAPI('/questions/bank'),
        getAssessmentTemplates: async () => fetchAPI('/assessments/templates'),
        getLiveInterviewQuestions: async (interviewId: string) => fetchAPI(`/interviews/${interviewId}/questions`),
        getAIInterviewConfig: async (interviewId: string) => fetchAPI(`/interviews/${interviewId}/config`),
        getGroupCreationConfig: async () => fetchAPI('/groups/config/creation'),
        getGroupOverviewV2: async (groupId: string) => fetchAPI(`/groups/${groupId}/overview`),
        getFiltrationFlowConfig: async (positionId: string) => fetchAPI(`/positions/${positionId}/filtration-flow`),
        getSkillClusters: async (positionId: string) => fetchAPI(`/positions/${positionId}/skills`),
        getAssessmentSession: async (sessionId: string) => fetchAPI(`/assessments/sessions/${sessionId}`),
        getRecordedInterviewQuestions: async (interviewId: string) => fetchAPI(`/interviews/recorded/questions/${interviewId}`)
    },
    candidate: {
        getHome: async () => fetchAPI('/candidate/home'),
        getAssessments: async () => fetchAPI('/candidate/assessments'),
        getProfile: async () => fetchAPI('/candidate/profile')
    }
};
