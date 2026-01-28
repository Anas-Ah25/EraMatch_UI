import {
    mockJobPositions,
    mockProjects,
    mockPositionGroups,
    mockClosedProjects,
    mockClosedPositions,
    mockMembers,
    mockHrRecruiters,
    mockTechnicalRecruiters
} from '../data/mockData';

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

// Simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const api = {
    admin: {
        getDashboardStats: async () => {
            await delay(500);
            return {
                projects: mockProjects,
                jobPositions: mockJobPositions,
                positionGroups: mockPositionGroups,
                recentGroups: mockPositionGroups.slice(0, 3), // Just an example subset
                avgTimeToFill: 28, // Fetched metric
                pipelineData: [
                    { stage: 'Applied', count: 176, percentage: 100, color: '#6366f1' },
                    { stage: 'Screening', count: 142, percentage: 81, color: '#8b5cf6' },
                    { stage: 'Assessment', count: 98, percentage: 56, color: '#a855f7' },
                    { stage: 'Interview', count: 64, percentage: 36, color: '#c084fc' },
                    { stage: 'Offer', count: 28, percentage: 16, color: '#10b981' }
                ]
            };
        },
        getClosedPositions: async () => {
            await delay(600);
            return {
                projects: mockClosedProjects,
                positions: mockClosedPositions
            };
        },
        getRecruiterDelegation: async () => {
            await delay(400);
            return {
                projects: mockProjects,
                positions: mockJobPositions,
                hrRecruiters: mockHrRecruiters,
                technicalRecruiters: mockTechnicalRecruiters
            };
        },
        getMembers: async () => {
            await delay(500);
            return mockMembers;
        },
        getSettings: async () => {
            await delay(300);
            // Return mock settings object
            return {};
        },
        getSubscription: async () => {
            await delay(300);
            // Return mock subscription object
            return {};
        },
        getGroupAnalytics: async (groupId: string) => {
            await delay(400);
            // Simulate detailed analytics calculation on server side
            const group = mockPositionGroups.find(g => g.id.toString() === groupId);
            if (!group) throw new Error('Group not found');

            const totalCandidates = group.candidatesCount;
            // Mock server-side calculations
            return {
                totalCandidates,
                matches: {
                    initial: 82,
                    current: 85,
                    trend: 'up'
                },
                phases: {
                    assessment: group.hasAssessment ? {
                        completed: Math.floor(totalCandidates * 0.92),
                        avgScore: 78.4,
                        passRate: 76,
                        cheatingDetected: Math.floor(totalCandidates * 0.08),
                        highRisk: Math.floor(totalCandidates * 0.02),
                        mediumRisk: Math.floor(totalCandidates * 0.04),
                        lowRisk: Math.floor(totalCandidates * 0.02)
                    } : null,
                    aiInterview: group.hasAIInterview ? {
                        completed: Math.floor(totalCandidates * 0.85),
                        avgScore: 72.6,
                        passRate: 68,
                        avgConfidence: 84,
                        sentimentPositive: 78,
                        sentimentNeutral: 18,
                        sentimentNegative: 4
                    } : null,
                    liveInterview: group.hasLiveInterview ? {
                        scheduled: Math.floor(totalCandidates * 0.65),
                        completed: Math.floor(totalCandidates * 0.58),
                        avgRating: 3.8,
                        recommended: Math.floor(totalCandidates * 0.58 * 0.72),
                        rejected: Math.floor(totalCandidates * 0.58 * 0.18),
                        pending: Math.floor(totalCandidates * 0.58 * 0.10)
                    } : null
                }
            };
        },
        getPendingRequests: async () => {
            await delay(400);
            return [
                {
                    id: 1,
                    type: 'recruiter_access',
                    requesterName: 'John Doe',
                    requesterEmail: 'john.doe@company.com',
                    requestedRole: 'Technical Recruiter',
                    requestedAt: '2025-01-20',
                    status: 'pending',
                    message: 'I would like access to manage technical positions for the engineering team.'
                },
                {
                    id: 2,
                    type: 'position_creation',
                    requesterName: 'Sarah Johnson',
                    requesterEmail: 'sarah.j@company.com',
                    requestedRole: 'HR Recruiter',
                    requestedAt: '2025-01-19',
                    status: 'pending',
                    message: 'Requesting permission to create new positions for Q1 hiring.'
                },
                {
                    id: 3,
                    type: 'data_export',
                    requesterName: 'Michael Chen',
                    requesterEmail: 'mchen@company.com',
                    requestedRole: 'Admin',
                    requestedAt: '2025-01-18',
                    status: 'approved',
                    message: 'Need to export candidate data for compliance audit.'
                }
            ];
        },
        getSubscriptionPlans: async () => {
            await delay(400);
            return {
                currentPlan: {
                    name: 'Professional',
                    price: 299,
                    billingCycle: 'monthly',
                    startDate: '2025-01-01',
                    nextBillingDate: '2025-02-01',
                    status: 'active'
                },
                usage: {
                    activePositions: 12,
                    maxPositions: 25,
                    candidatesProcessed: 156,
                    maxCandidates: 500,
                    storageUsed: 2.4,
                    maxStorage: 10
                },
                availablePlans: [
                    {
                        id: 'starter',
                        name: 'Starter',
                        price: 99,
                        features: ['Up to 5 positions', 'Up to 100 candidates', '2GB storage', 'Basic analytics'],
                        recommended: false
                    },
                    {
                        id: 'professional',
                        name: 'Professional',
                        price: 299,
                        features: ['Up to 25 positions', 'Up to 500 candidates', '10GB storage', 'Advanced analytics', 'AI interviews'],
                        recommended: true
                    },
                    {
                        id: 'enterprise',
                        name: 'Enterprise',
                        price: 999,
                        features: ['Unlimited positions', 'Unlimited candidates', '100GB storage', 'Custom analytics', 'Priority support', 'API access'],
                        recommended: false
                    }
                ]
            };
        },
        getNotifications: async () => {
            await delay(300);
            return [
                {
                    id: 1,
                    type: 'success',
                    title: 'New Candidate Match',
                    message: 'John Smith (95% match) applied to Senior React Developer position',
                    timestamp: '2 hours ago',
                    read: false,
                    actionUrl: '/candidates/1'
                },
                {
                    id: 2,
                    type: 'warning',
                    title: 'Suspicious Activity Detected',
                    message: 'Candidate Michael Chen flagged for potential cheating in assessment',
                    timestamp: '5 hours ago',
                    read: false,
                    actionUrl: '/suspect-review/3'
                },
                {
                    id: 3,
                    type: 'info',
                    title: 'Interview Scheduled',
                    message: 'Live interview scheduled with Sarah Johnson for tomorrow at 2 PM',
                    timestamp: '1 day ago',
                    read: true,
                    actionUrl: '/interviews/2'
                },
                {
                    id: 4,
                    type: 'success',
                    title: 'Position Filled',
                    message: 'Backend Engineer position has been successfully filled',
                    timestamp: '2 days ago',
                    read: true,
                    actionUrl: '/positions/5'
                }
            ];
        },
        getAlerts: async () => {
            await delay(300);
            return [
                {
                    id: 1,
                    severity: 'high',
                    title: 'High Cheating Risk',
                    message: '3 candidates flagged with high-risk cheating indicators in the last 24 hours',
                    count: 3,
                    timestamp: '1 hour ago',
                    actionUrl: '/suspect-review'
                },
                {
                    id: 2,
                    severity: 'medium',
                    title: 'Pending Reviews',
                    message: '12 candidates awaiting final review decision',
                    count: 12,
                    timestamp: '3 hours ago',
                    actionUrl: '/pending-reviews'
                },
                {
                    id: 3,
                    severity: 'low',
                    title: 'Expiring Assessments',
                    message: '5 assessment sessions will expire in 48 hours',
                    count: 5,
                    timestamp: '1 day ago',
                    actionUrl: '/assessments'
                }
            ];
        }
    },
    recruiter: {
        getDashboard: async () => {
            await delay(500);
            return {
                projects: mockProjects,
                activePositions: mockPositionGroups
            };
        },
        getProjects: async () => {
            await delay(500);
            return mockProjects;
        },
        getProjectDetails: async (projectId: string) => {
            await delay(400);
            // In a real app, filter by ID. For now return all projects or first one
            return mockProjects[0];
        },
        getProjectPositions: async (projectId: number) => {
            await delay(400);
            return mockJobPositions.filter(p => p.projectId === projectId);
        },
        getCandidates: async () => {
            await delay(600);
            return [
                {
                    id: 1,
                    name: 'John Smith',
                    email: 'john.smith@email.com',
                    match: 92,
                    score: 95,
                    antiCheating: false,
                    skills: ['React', 'TypeScript', 'Node.js', 'AWS'],
                    lastActivity: '2 hours ago',
                    tags: ['Top Performer', 'Quick Responder'],
                    experienceLevel: 'Senior',
                    seniority: 'Senior',
                    location: 'San Francisco, CA',
                    availability: 'Immediate',
                    education: 'Master\'s Degree',
                    yearsOfExperience: 8,
                    assessmentScore: 95,
                    aiInterviewScore: 92,
                    githubScore: 88,
                    linkedinCompleteness: 95,
                    salaryExpectation: '$120k-$150k'
                },
                {
                    id: 2,
                    name: 'Sarah Johnson',
                    email: 'sarah.j@email.com',
                    match: 85,
                    score: 88,
                    antiCheating: false,
                    skills: ['Python', 'Machine Learning', 'TensorFlow'],
                    lastActivity: '5 hours ago',
                    tags: ['AI Expert'],
                    experienceLevel: 'Mid',
                    seniority: 'Mid-Level',
                    location: 'New York, NY',
                    availability: '2 weeks',
                    education: 'Bachelor\'s Degree',
                    yearsOfExperience: 5,
                    assessmentScore: 88,
                    aiInterviewScore: 86,
                    githubScore: 82,
                    linkedinCompleteness: 90,
                    salaryExpectation: '$100k-$130k'
                }
                // ... add more if needed, but 2 is enough for demo
            ];
        },
        getClosedProjects: async () => {
            await delay(500);
            return mockClosedProjects;
        },
        getProjectGroups: async (projectId: string) => {
            await delay(400);
            return mockPositionGroups.filter(g => true); // In real app, filter by project
        },
        getDashboardAnalytics: async () => {
            await delay(500);
            return {
                overview: {
                    totalProjects: mockProjects.length,
                    totalPositions: mockJobPositions.length,
                    totalGroups: mockPositionGroups.length,
                    totalCandidates: 156 // Mock total
                },
                topStats: {
                    applicantsCount: 30, // 30 days
                    perfectMatchCount: 3, // 24 hours
                    suspiciousCount: 1 // awaiting review
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
                projectPerformance: mockProjects.map(p => ({
                    project: p.projectName,
                    groups: p.subGroupsCount,
                    candidates: p.applicantsCount
                })),
                recentActivity: [
                    { groupName: 'Senior React Developers Q1', project: 'Summer Internship', stage: 'Live Interview', time: '2 hours ago' },
                    { groupName: 'Backend Engineers - Python', project: 'DevOps Team', stage: 'AI Interview', time: '5 hours ago' },
                    { groupName: 'Full Stack - High Match', project: 'Migration Project', stage: 'Assessment', time: '1 day ago' },
                    { groupName: 'ML Engineers Group', project: 'AI Team', stage: 'Assessment', time: '2 days ago' }
                ],
                weeklyTrend: [
                    { day: 'Mon', candidates: 12 },
                    { day: 'Tue', candidates: 18 },
                    { day: 'Wed', candidates: 15 },
                    { day: 'Thu', candidates: 22 },
                    { day: 'Fri', candidates: 28 },
                    { day: 'Sat', candidates: 8 },
                    { day: 'Sun', candidates: 5 }
                ]
            };
        },
        getRecruiters: async () => {
            await delay(300);
            return [
                { id: '1', name: 'John Doe', role: 'Senior Recruiter' },
                { id: '2', name: 'Jane Smith', role: 'Technical Recruiter' },
                { id: '3', name: 'Mike Johnson', role: 'Lead Recruiter' },
                { id: '4', name: 'Sarah Williams', role: 'HR Manager' }
            ];
        },
        getPipelineModules: async () => {
            await delay(300);
            return [
                { id: 'assessment', type: 'assessment', name: 'Technical Assessment', description: 'Technical skills evaluation', enabled: true },
                { id: 'ai-interview', type: 'ai-interview', name: 'AI Video Interview', description: 'AI-powered video screening', enabled: true },
                { id: 'live-interview', type: 'live-interview', name: 'Live Interview', description: 'Real-time interview session', enabled: false }
            ];
        },
        getGroupDetails: async (groupId: string) => {
            await delay(400);
            return {
                candidates: [
                    {
                        id: 1,
                        name: 'John Smith',
                        email: 'john.smith@email.com',
                        score: 95,
                        antiCheating: false,
                        pipelineStatus: {
                            assessment: 'completed',
                            aiInterview: 'completed',
                            liveInterview: 'completed',
                            review: 'pending',
                            offer: 'not-started'
                        },
                        assessmentScore: 92,
                        aiInterviewScore: 88,
                        flags: [],
                        currentStage: 'Review',
                        technicalVerdict: 'pass',
                        meetsCriteria: true,
                        progressionState: 'active'
                    },
                    {
                        id: 2,
                        name: 'Sarah Johnson',
                        email: 'sarah.j@email.com',
                        score: 88,
                        antiCheating: false,
                        pipelineStatus: {
                            assessment: 'completed',
                            aiInterview: 'completed',
                            liveInterview: 'pending',
                            review: 'not-started',
                            offer: 'not-started'
                        },
                        assessmentScore: 85,
                        aiInterviewScore: 82,
                        flags: [],
                        currentStage: 'Live Interview',
                        technicalVerdict: 'pass',
                        meetsCriteria: true,
                        progressionState: 'active'
                    },
                    {
                        id: 3,
                        name: 'Michael Chen',
                        email: 'mchen@email.com',
                        score: 82,
                        antiCheating: true,
                        pipelineStatus: {
                            assessment: 'completed',
                            aiInterview: 'pending',
                            liveInterview: 'not-started',
                            review: 'not-started',
                            offer: 'not-started'
                        },
                        assessmentScore: 82,
                        aiInterviewScore: 0,
                        flags: ['Suspicious Activity'],
                        currentStage: 'AI Interview',
                        technicalVerdict: 'conditional',
                        meetsCriteria: true,
                        progressionState: 'active'
                    }
                ],
                pipelineStages: [
                    { id: 'assessment', name: 'Technical Assessment', completed: 3, pending: 0, total: 3, state: 'closed' },
                    { id: 'ai-interview', name: 'AI Interview', completed: 2, pending: 1, total: 3, state: 'active' },
                    { id: 'live-interview', name: 'Live Interview', completed: 1, pending: 2, total: 3, state: 'not-started' },
                    { id: 'review', name: 'Review', completed: 0, pending: 3, total: 3, state: 'not-started' },
                    { id: 'offer', name: 'Offer', completed: 0, pending: 3, total: 3, state: 'not-started' }
                ],
                acceptanceCriteria: {
                    minimumTechnicalScore: 70,
                    allowedIntegrityRisk: 'low',
                    requiredVerdict: 'pass'
                },
                activityLog: [
                    {
                        id: 'log-1',
                        type: 'criteria-defined',
                        actor: 'System',
                        actorRole: 'technical',
                        description: 'Initial acceptance criteria set',
                        timestamp: new Date(Date.now() - 86400000).toISOString()
                    },
                    {
                        id: 'log-2',
                        type: 'stage-start',
                        actor: 'Sarah Johnson',
                        actorRole: 'hr',
                        description: 'Started Technical Assessment stage',
                        timestamp: new Date(Date.now() - 172800000).toISOString()
                    }
                ]
            };
        },
        getPositionDetails: async (positionId: string) => {
            await delay(400);
            return {
                candidates: [
                    { id: 1, name: 'John Smith', email: 'john.smith@email.com', score: 95, match: 92, color: '#10b981', starred: false, selected: false },
                    { id: 2, name: 'Sarah Johnson', email: 'sarah.j@email.com', score: 88, match: 85, color: '#10b981', starred: false, selected: false },
                    { id: 3, name: 'Michael Chen', email: 'mchen@email.com', score: 82, match: 78, color: '#f59e0b', starred: false, selected: false },
                    { id: 4, name: 'Emily Davis', email: 'emily.davis@email.com', score: 79, match: 75, color: '#f59e0b', starred: false, selected: false },
                    { id: 5, name: 'David Wilson', email: 'dwilson@email.com', score: 72, match: 68, color: '#f59e0b', starred: false, selected: false }
                ],
                groups: [
                    { id: '1', name: 'Senior React Developers Q1 2025', candidateCount: 8, recruiter: 'John Doe', stage: 'Live Interview', progress: 62, lastUpdated: '2 hours ago', status: 'Live' },
                    { id: '2', name: 'Backend Engineers - Python Focus', candidateCount: 12, recruiter: 'Jane Smith', stage: 'Assessment', progress: 45, lastUpdated: '1 day ago', status: 'Live' },
                    { id: '3', name: 'Full Stack - High Match', candidateCount: 5, recruiter: 'Mike Johnson', stage: 'Review', progress: 85, lastUpdated: '3 days ago', status: 'Paused' }
                ]
            };
        },
        getPositionInsights: async (positionId: string) => {
            await delay(500);
            return {
                fittingData: [
                    { name: 'Excellent (80-100%): 2', value: 2, color: '#10b981' },
                    { name: 'Poor (<40%): 0', value: 1, color: '#ff9a76' },
                    { name: 'Fair (40-59%): 4', value: 4, color: '#ffa366' },
                    { name: 'Good (60-79%): 4', value: 4, color: '#f59e0b' }
                ],
                scoreData: [
                    { range: '0-20', count: 0 },
                    { range: '20-40', count: 0 },
                    { range: '40-60', count: 3 },
                    { range: '60-80', count: 4 },
                    { range: '80-100', count: 3 }
                ],
                skillDistribution: [
                    { skill: 'React', count: 8, percentage: 67 },
                    { skill: 'TypeScript', count: 7, percentage: 58 },
                    { skill: 'Node.js', count: 6, percentage: 50 },
                    { skill: 'AWS', count: 5, percentage: 42 }
                ],
                seniorityDistribution: [
                    { level: 'Senior', count: 4, percentage: 33 },
                    { level: 'Mid-Level', count: 5, percentage: 42 },
                    { level: 'Junior', count: 3, percentage: 25 }
                ],
                universityDistribution: [
                    { university: 'Stanford University', count: 3 },
                    { university: 'MIT', count: 2 },
                    { university: 'UC Berkeley', count: 2 },
                    { university: 'Other', count: 5 }
                ],
                availabilityDistribution: [
                    { availability: 'Immediate', count: 4, percentage: 33 },
                    { availability: '2 weeks', count: 5, percentage: 42 },
                    { availability: '1 month', count: 3, percentage: 25 }
                ]
            };
        },
        getSuspectReview: async (candidateId: number) => {
            await delay(400);
            return {
                duration: 720,
                flags: [
                    {
                        id: 1,
                        timestamp: 245,
                        timeDisplay: '04:05',
                        event: 'Tab Switch Detected',
                        severity: 'high',
                        module: 'Assessment',
                        evidence: 'Tab focus lost for 45 seconds during Question 3',
                        notes: '',
                        status: 'pending'
                    },
                    {
                        id: 2,
                        timestamp: 268,
                        timeDisplay: '04:28',
                        event: 'Copy-Paste Event',
                        severity: 'medium',
                        module: 'Assessment',
                        evidence: 'Large text block pasted into answer field',
                        notes: '',
                        status: 'pending'
                    },
                    {
                        id: 3,
                        timestamp: 415,
                        timeDisplay: '06:55',
                        event: 'Suspicious Pause',
                        severity: 'medium',
                        module: 'AI Interview',
                        evidence: '30-second pause before answering technical question',
                        notes: '',
                        status: 'pending'
                    },
                    {
                        id: 4,
                        timestamp: 550,
                        timeDisplay: '09:10',
                        event: 'Background Noise',
                        severity: 'low',
                        module: 'AI Interview',
                        evidence: 'Multiple voices detected in background',
                        notes: '',
                        status: 'pending'
                    }
                ],
                moduleProgress: [
                    { module: 'Assessment', progress: 100, status: 'completed', time: '18 mins', flags: 2 },
                    { module: 'AI Interview', progress: 100, status: 'completed', time: '12 mins', flags: 2 },
                    { module: 'Live Interview', progress: 0, status: 'pending', time: '-', flags: 0 }
                ]
            };
        },
        getKnowledgeGraphData: async (candidateId: number) => {
            await delay(500);
            // Return comprehensive knowledge graph data for a candidate
            return {
                nodes: [
                    // Candidate (center)
                    { id: 'candidate-1', type: 'candidate', label: `Candidate ${candidateId}`, data: { id: candidateId }, x: 0, y: 0 },

                    // Skills (verified with levels and scores)
                    { id: 'skill-1', type: 'skill', label: 'React', data: { yearsExp: 6 }, verified: true, level: 'Expert', score: 95, x: 0, y: 0 },
                    { id: 'skill-2', type: 'skill', label: 'TypeScript', data: { yearsExp: 5 }, verified: true, level: 'Expert', score: 98, x: 0, y: 0 },
                    { id: 'skill-3', type: 'skill', label: 'Node.js', data: { yearsExp: 7 }, verified: true, level: 'Advanced', score: 92, x: 0, y: 0 },
                    { id: 'skill-4', type: 'skill', label: 'AWS', data: { yearsExp: 4 }, verified: true, level: 'Advanced', score: 88, x: 0, y: 0 },
                    { id: 'skill-5', type: 'skill', label: 'Docker', data: { yearsExp: 3 }, verified: false, level: 'Intermediate', score: 75, x: 0, y: 0 },
                    { id: 'skill-6', type: 'skill', label: 'Python', data: { yearsExp: 2 }, verified: true, level: 'Intermediate', score: 80, hasIntegrityFlag: true, flagSeverity: 'low', x: 0, y: 0 },

                    // Projects
                    { id: 'project-1', type: 'project', label: 'E-commerce Platform', data: { duration: '2 years', impact: 'high' }, x: 0, y: 0 },
                    { id: 'project-2', type: 'project', label: 'Analytics Dashboard', data: { duration: '1 year', impact: 'medium' }, x: 0, y: 0 },
                    { id: 'project-3', type: 'project', label: 'Mobile App Backend', data: { duration: '1.5 years', impact: 'high' }, x: 0, y: 0 },

                    // Roles
                    { id: 'role-1', type: 'role', label: 'Senior Software Engineer', data: { duration: '2020-Present' }, x: 0, y: 0 },
                    { id: 'role-2', type: 'role', label: 'Software Engineer', data: { duration: '2017-2020' }, x: 0, y: 0 },

                    // Companies
                    { id: 'company-1', type: 'company', label: 'Tech Corp', data: { size: 'Large', industry: 'Technology' }, x: 0, y: 0 },
                    { id: 'company-2', type: 'company', label: 'StartupXYZ', data: { size: 'Startup', industry: 'E-commerce' }, x: 0, y: 0 },

                    // Education
                    { id: 'edu-1', type: 'education', label: 'MS Computer Science', data: { school: 'Stanford University', year: '2015-2017' }, x: 0, y: 0 },
                    { id: 'edu-2', type: 'education', label: 'BS Software Engineering', data: { school: 'UC Berkeley', year: '2011-2015' }, x: 0, y: 0 },

                    // Assessment
                    { id: 'assessment-1', type: 'assessment', label: 'Technical Assessment', data: { score: 95, completedAt: '2025-01-15' }, score: 95, x: 0, y: 0 },

                    // AI Interview
                    { id: 'interview-1', type: 'interview', label: 'AI Interview', data: { score: 92, completedAt: '2025-01-16' }, score: 92, x: 0, y: 0 },

                    // GitHub
                    { id: 'github-1', type: 'github', label: 'react-dashboard', data: { stars: 245, language: 'TypeScript' }, score: 88, x: 0, y: 0 },
                    { id: 'github-2', type: 'github', label: 'node-api-boilerplate', data: { stars: 128, language: 'JavaScript' }, score: 85, x: 0, y: 0 },

                    // Integrity Flags
                    { id: 'integrity-1', type: 'integrity', label: 'Minor Inconsistency', data: { module: 'Python Assessment', severity: 'low' }, hasIntegrityFlag: true, flagSeverity: 'low', x: 0, y: 0 },

                    // JD Requirements
                    { id: 'jd-1', type: 'jd-requirement', label: 'React Expert Required', data: { priority: 'high' }, x: 0, y: 0 },
                    { id: 'jd-2', type: 'jd-requirement', label: 'Cloud Experience', data: { priority: 'medium' }, x: 0, y: 0 },

                    // Evidence nodes
                    { id: 'evidence-1', type: 'evidence', label: 'GitHub Contributions', data: { commits: 1245, repos: 12 }, x: 0, y: 0 },
                    { id: 'evidence-2', type: 'evidence', label: 'Certificate: AWS Solutions Architect', data: { issuer: 'Amazon', year: 2023 }, verified: true, x: 0, y: 0 },
                    { id: 'evidence-3', type: 'evidence', label: 'LinkedIn Endorsements', data: { count: 24 }, x: 0, y: 0 }
                ],

                edges: [
                    // Candidate to top-level entities
                    { id: 'e1', source: 'candidate-1', target: 'role-1', type: 'related' },
                    { id: 'e2', source: 'candidate-1', target: 'role-2', type: 'related' },
                    { id: 'e3', source: 'candidate-1', target: 'edu-1', type: 'related' },
                    { id: 'e4', source: 'candidate-1', target: 'edu-2', type: 'related' },
                    { id: 'e5', source: 'candidate-1', target: 'assessment-1', type: 'related' },
                    { id: 'e6', source: 'candidate-1', target: 'interview-1', type: 'related' },

                    // Role to Company
                    { id: 'e7', source: 'role-1', target: 'company-1', type: 'related' },
                    { id: 'e8', source: 'role-2', target: 'company-2', type: 'related' },

                    // Role to Projects
                    { id: 'e9', source: 'role-1', target: 'project-1', type: 'related' },
                    { id: 'e10', source: 'role-1', target: 'project-2', type: 'related' },
                    { id: 'e11', source: 'role-2', target: 'project-3', type: 'related' },

                    // Projects to Skills
                    { id: 'e12', source: 'project-1', target: 'skill-1', label: 'used', type: 'evidence' },
                    { id: 'e13', source: 'project-1', target: 'skill-2', label: 'used', type: 'evidence' },
                    { id: 'e14', source: 'project-1', target: 'skill-3', label: 'used', type: 'evidence' },
                    { id: 'e15', source: 'project-2', target: 'skill-1', label: 'used', type: 'evidence' },
                    { id: 'e16', source: 'project-2', target: 'skill-4', label: 'used', type: 'evidence' },
                    { id: 'e17', source: 'project-3', target: 'skill-3', label: 'used', type: 'evidence' },
                    { id: 'e18', source: 'project-3', target: 'skill-5', label: 'used', type: 'evidence' },

                    // Assessment to Skills
                    { id: 'e19', source: 'assessment-1', target: 'skill-1', label: 'tested', type: 'verified' },
                    { id: 'e20', source: 'assessment-1', target: 'skill-2', label: 'tested', type: 'verified' },
                    { id: 'e21', source: 'assessment-1', target: 'skill-6', label: 'tested', type: 'verified' },

                    // Interview to Skills
                    { id: 'e22', source: 'interview-1', target: 'skill-1', label: 'discussed', type: 'verified' },
                    { id: 'e23', source: 'interview-1', target: 'skill-3', label: 'discussed', type: 'verified' },

                    // GitHub to Skills
                    { id: 'e24', source: 'github-1', target: 'skill-1', label: 'demonstrates', type: 'evidence' },
                    { id: 'e25', source: 'github-1', target: 'skill-2', label: 'demonstrates', type: 'evidence' },
                    { id: 'e26', source: 'github-2', target: 'skill-3', label: 'demonstrates', type: 'evidence' },

                    // Evidence to Skills
                    { id: 'e27', source: 'evidence-1', target: 'skill-1', label: 'supports', type: 'evidence' },
                    { id: 'e28', source: 'evidence-2', target: 'skill-4', label: 'certifies', type: 'verified' },
                    { id: 'e29', source: 'evidence-3', target: 'skill-1', label: 'endorses', type: 'evidence' },

                    // Integrity Flag relationships
                    { id: 'e30', source: 'integrity-1', target: 'skill-6', label: 'flags', type: 'flagged' },
                    { id: 'e31', source: 'integrity-1', target: 'assessment-1', label: 'detected in', type: 'flagged' },

                    // JD Requirements to Skills
                    { id: 'e32', source: 'jd-1', target: 'skill-1', label: 'requires', type: 'required' },
                    { id: 'e33', source: 'jd-2', target: 'skill-4', label: 'requires', type: 'required' }
                ]
            };
        },
        getCandidateSkills: async (candidateIds: number[]) => {
            await delay(600);
            // Return detected skills for each candidate
            const skillsData: Record<number, any[]> = {};

            candidateIds.forEach((id, index) => {
                // Generate different skill sets for different candidates
                const baseSkills = [
                    { id: `s${id}-1`, name: 'React', category: 'technical', proficiency: index % 3 === 0 ? 'expert' : 'advanced', yearsOfExperience: 3 + index, source: 'resume' },
                    { id: `s${id}-2`, name: 'TypeScript', category: 'technical', proficiency: index % 2 === 0 ? 'advanced' : 'intermediate', yearsOfExperience: 2 + index, source: 'assessment' },
                    { id: `s${id}-3`, name: 'Node.js', category: 'technical', proficiency: 'advanced', yearsOfExperience: 3 + index, source: 'resume' },
                    { id: `s${id}-4`, name: 'Communication', category: 'interpersonal', proficiency: index % 2 === 0 ? 'expert' : 'advanced', yearsOfExperience: 4 + index, source: 'interview' },
                    { id: `s${id}-5`, name: 'Problem Solving', category: 'interpersonal', proficiency: 'expert', yearsOfExperience: 5 + index, source: 'interview' }
                ];

                // Add some variation
                if (index % 2 === 0) {
                    baseSkills.push(
                        { id: `s${id}-6`, name: 'GraphQL', category: 'technical', proficiency: 'intermediate', yearsOfExperience: 2, source: 'resume' },
                        { id: `s${id}-7`, name: 'Leadership', category: 'interpersonal', proficiency: 'advanced', yearsOfExperience: 3, source: 'interview' }
                    );
                }

                if (index % 3 === 0) {
                    baseSkills.push(
                        { id: `s${id}-8`, name: 'Python', category: 'technical', proficiency: 'advanced', yearsOfExperience: 4, source: 'resume' },
                        { id: `s${id}-9`, name: 'Team Collaboration', category: 'interpersonal', proficiency: 'advanced', yearsOfExperience: 4, source: 'interview' }
                    );
                }

                skillsData[id] = baseSkills;
            });

            return skillsData;
        },
        // For QuestionBankModal.tsx
        getQuestionBankVariants: async (type: string) => {
            await delay(400);
            // Return full question variants with details (options, test cases, etc.) based on type
            const MOCK_QUESTIONS: Record<string, any[]> = {
                mcq: [
                    {
                        id: 'qb-mcq-1',
                        type: 'mcq',
                        questionText: 'What is the primary purpose of React hooks?',
                        options: ['State management in functional components', 'Styling components', 'API calls', 'Routing'],
                        correctAnswer: 0,
                        difficulty: 'Medium',
                        tags: ['React', 'Hooks'],
                        semanticScore: 0.95
                    },
                    {
                        id: 'qb-mcq-2',
                        type: 'mcq',
                        questionText: 'Which of the following is NOT a valid HTTP method?',
                        options: ['GET', 'POST', 'FETCH', 'DELETE'],
                        correctAnswer: 2,
                        difficulty: 'Easy',
                        tags: ['HTTP', 'Web'],
                        semanticScore: 0.88
                    },
                    {
                        id: 'qb-mcq-3',
                        type: 'mcq',
                        questionText: 'What does SQL stand for?',
                        options: ['Structured Query Language', 'Simple Question Language', 'Sequential Query Logic', 'System Query Language'],
                        correctAnswer: 0,
                        difficulty: 'Easy',
                        tags: ['SQL', 'Database'],
                        semanticScore: 0.92
                    },
                    {
                        id: 'qb-mcq-4',
                        type: 'mcq',
                        questionText: 'In React, what is the purpose of useEffect hook?',
                        options: ['Handle side effects', 'Manage state', 'Create components', 'Style elements'],
                        correctAnswer: 0,
                        difficulty: 'Medium',
                        tags: ['React', 'Hooks', 'Side Effects'],
                        semanticScore: 0.90
                    }
                ],
                essay: [
                    {
                        id: 'qb-essay-1',
                        type: 'essay',
                        questionText: 'Explain the concept of closure in JavaScript with an example.',
                        maxWords: 300,
                        rubric: 'Answer should explain that closures are functions that remember their outer scope, provide a clear example, and discuss practical use cases.',
                        difficulty: 'Medium',
                        tags: ['JavaScript', 'Closures'],
                        semanticScore: 0.93
                    },
                    {
                        id: 'qb-essay-2',
                        type: 'essay',
                        questionText: 'Describe the SOLID principles and their importance in software design.',
                        maxWords: 500,
                        rubric: 'Should cover all 5 SOLID principles with examples and explain their impact on code maintainability.',
                        difficulty: 'Hard',
                        tags: ['Design Patterns', 'OOP'],
                        semanticScore: 0.89
                    }
                ],
                code: [
                    {
                        id: 'qb-code-1',
                        type: 'code',
                        questionText: 'Write a function to reverse a string without using built-in reverse methods.',
                        language: 'JavaScript',
                        codeTemplate: 'function reverseString(str) {\n  // Your code here\n}',
                        testCases: [
                            { id: 'tc1', input: '"hello"', expectedOutput: '"olleh"', isHidden: false, points: 10 },
                            { id: 'tc2', input: '"world"', expectedOutput: '"dlrow"', isHidden: false, points: 10 }
                        ],
                        difficulty: 'Easy',
                        tags: ['Strings', 'Algorithms'],
                        semanticScore: 0.91
                    },
                    {
                        id: 'qb-code-2',
                        type: 'code',
                        questionText: 'Implement a function to find the longest palindromic substring.',
                        language: 'Python',
                        codeTemplate: 'def longest_palindrome(s):\n    # Your code here\n    pass',
                        testCases: [
                            { id: 'tc1', input: '"babad"', expectedOutput: '"bab" or "aba"', isHidden: false, points: 15 },
                            { id: 'tc2', input: '"cbbd"', expectedOutput: '"bb"', isHidden: false, points: 15 }
                        ],
                        difficulty: 'Hard',
                        tags: ['Strings', 'Dynamic Programming'],
                        semanticScore: 0.87
                    }
                ]
            };
            return MOCK_QUESTIONS[type] || [];
        },
        // For GroupCreationPage.tsx
        getGroupCandidates: async () => {
            await delay(500);
            return [
                { id: 1, name: 'John Smith', email: 'john.smith@email.com', experience: 8, location: 'San Francisco, CA', skills: ['React', 'TypeScript', 'Node.js', 'AWS'], match: 92, starred: false },
                { id: 2, name: 'Sarah Johnson', email: 'sarah.j@email.com', experience: 6, location: 'New York, NY', skills: ['React', 'JavaScript', 'Python', 'Docker'], match: 88, starred: false },
                { id: 3, name: 'Michael Chen', email: 'mchen@email.com', experience: 10, location: 'Austin, TX', skills: ['TypeScript', 'Node.js', 'GraphQL', 'MongoDB'], match: 85, starred: false },
                { id: 4, name: 'Emily Davis', email: 'emily.davis@email.com', experience: 5, location: 'Seattle, WA', skills: ['React', 'TypeScript', 'Redux', 'PostgreSQL'], match: 82, starred: false },
                { id: 5, name: 'David Wilson', email: 'dwilson@email.com', experience: 7, location: 'San Francisco, CA', skills: ['JavaScript', 'Node.js', 'Express', 'MySQL'], match: 79, starred: false },
                { id: 6, name: 'Lisa Anderson', email: 'l.anderson@email.com', experience: 4, location: 'Boston, MA', skills: ['React', 'Vue.js', 'CSS', 'HTML'], match: 76, starred: false },
                { id: 7, name: 'Robert Martinez', email: 'rmartinez@email.com', experience: 9, location: 'Los Angeles, CA', skills: ['Python', 'Django', 'PostgreSQL', 'Redis'], match: 73, starred: false },
                { id: 8, name: 'Jennifer Taylor', email: 'jtaylor@email.com', experience: 3, location: 'Chicago, IL', skills: ['JavaScript', 'React', 'HTML', 'CSS'], match: 70, starred: false },
                { id: 9, name: 'James Brown', email: 'jbrown@email.com', experience: 6, location: 'Denver, CO', skills: ['TypeScript', 'Angular', 'RxJS', 'NestJS'], match: 67, starred: false },
                { id: 10, name: 'Patricia Garcia', email: 'pgarcia@email.com', experience: 5, location: 'Miami, FL', skills: ['React', 'Next.js', 'Tailwind', 'Vercel'], match: 64, starred: false },
                { id: 11, name: 'Christopher Lee', email: 'clee@email.com', experience: 8, location: 'San Francisco, CA', skills: ['Java', 'Spring', 'Kubernetes', 'AWS'], match: 61, starred: false },
                { id: 12, name: 'Maria Rodriguez', email: 'mrodriguez@email.com', experience: 4, location: 'Atlanta, GA', skills: ['JavaScript', 'Vue.js', 'Vuex', 'Firebase'], match: 58, starred: false },
                { id: 13, name: 'Daniel Kim', email: 'dkim@email.com', experience: 7, location: 'Seattle, WA', skills: ['Go', 'Microservices', 'Docker', 'Kubernetes'], match: 55, starred: false },
                { id: 14, name: 'Amanda White', email: 'awhite@email.com', experience: 5, location: 'Portland, OR', skills: ['React', 'TypeScript', 'GraphQL', 'Apollo'], match: 52, starred: false },
                { id: 15, name: 'Kevin Thompson', email: 'kthompson@email.com', experience: 6, location: 'Austin, TX', skills: ['Python', 'FastAPI', 'MongoDB', 'Docker'], match: 49, starred: false },
                { id: 16, name: 'Rachel Kim', email: 'rkim@email.com', experience: 9, location: 'San Francisco, CA', skills: ['React', 'TypeScript', 'AWS', 'Node.js', 'GraphQL'], match: 91, starred: false },
                { id: 17, name: 'Marcus Johnson', email: 'mjohnson@email.com', experience: 12, location: 'New York, NY', skills: ['Java', 'Spring Boot', 'Microservices', 'Kafka'], match: 89, starred: false },
                { id: 18, name: 'Sofia Rodriguez', email: 'sofia.r@email.com', experience: 7, location: 'Austin, TX', skills: ['Python', 'Django', 'PostgreSQL', 'AWS'], match: 86, starred: false }
            ];
        },
        // For AIVariantMaker.tsx
        generateQuestionVariants: async (baseVariant: any, numVariants: number = 3) => {
            await delay(2000);
            const variants = [];

            for (let i = 0; i < numVariants; i++) {
                let variant;

                if (baseVariant.type === 'mcq') {
                    variant = {
                        ...baseVariant,
                        id: `variant-${Date.now()}-${i}`,
                        questionText: baseVariant.questionText.replace(/\?$/, '') + ` (Variant ${i + 1})?`,
                        options: baseVariant.options?.map((opt: string) => opt + ` [V${i + 1}]`) || []
                    };
                } else if (baseVariant.type === 'essay') {
                    variant = {
                        ...baseVariant,
                        id: `variant-${Date.now()}-${i}`,
                        questionText: baseVariant.questionText + ` Consider this from a different perspective (Variant ${i + 1}).`,
                        rubric: `${baseVariant.rubric} [Variant ${i + 1} - slightly different focus]`
                    };
                } else { // code
                    variant = {
                        ...baseVariant,
                        id: `variant-${Date.now()}-${i}`,
                        questionText: baseVariant.questionText + ` [Variant ${i + 1} with modified constraints]`,
                        testCases: baseVariant.testCases?.map((tc: any) => ({
                            ...tc,
                            id: `tc-${Date.now()}-${i}`,
                            input: `${tc.input}_v${i + 1}`,
                            expectedOutput: `${tc.expectedOutput}_v${i + 1}`
                        })) || []
                    };
                }

                variants.push(variant);
            }
            return variants;
        },
        // For ModuleDetailAssessment.tsx
        getAssessmentDetails: async (candidateId: number) => {
            await delay(500);
            return {
                score: 92,
                completedDate: '2 Oct, 2025',
                questions: [
                    {
                        id: 1,
                        text: 'Explain the difference between let, const, and var in JavaScript.',
                        answer: 'let and const are block-scoped, while var is function-scoped. const cannot be reassigned after declaration, while let can be. var has hoisting behavior that can lead to unexpected results.',
                        timeSpent: 180,
                        flagged: false
                    },
                    {
                        id: 2,
                        text: 'What is the Virtual DOM and how does React use it?',
                        answer: 'The Virtual DOM is a lightweight copy of the actual DOM. React uses it to optimize rendering by comparing the virtual DOM with the real DOM and only updating what changed.',
                        timeSpent: 240,
                        flagged: false
                    },
                    {
                        id: 3,
                        text: 'Implement a function to debounce API calls.',
                        answer: 'function debounce(func, wait) { let timeout; return function(...args) { clearTimeout(timeout); timeout = setTimeout(() => func.apply(this, args), wait); }; }',
                        timeSpent: 420,
                        flagged: true
                    },
                    {
                        id: 4,
                        text: 'Explain the concept of closures in JavaScript.',
                        answer: 'A closure is a function that has access to variables in its outer scope, even after the outer function has returned. This allows for data privacy and function factories.',
                        timeSpent: 200,
                        flagged: false
                    },
                    {
                        id: 5,
                        text: 'What are React hooks and why were they introduced?',
                        answer: 'Hooks are functions that let you use state and lifecycle features in functional components. They were introduced to simplify component logic and make it more reusable without classes.',
                        timeSpent: 160,
                        flagged: false
                    }
                ],
                integritySignals: [
                    {
                        id: 1,
                        type: 'tab-switch',
                        severity: 'high',
                        timestamp: '14:23:45',
                        description: 'Candidate switched to another tab during Question 3',
                        evidence: 'Tab focus lost for 45 seconds'
                    },
                    {
                        id: 2,
                        type: 'copy-paste',
                        severity: 'medium',
                        timestamp: '14:28:12',
                        description: 'Paste event detected in Question 3 answer field',
                        evidence: 'Large text block pasted at once'
                    },
                    {
                        id: 3,
                        type: 'suspicious-timing',
                        severity: 'low',
                        timestamp: '14:15:30',
                        description: 'Unusually fast completion of Question 2',
                        evidence: 'Completed in 2 minutes (avg: 4 minutes)'
                    }
                ]
            };
        },
        getQuestionBank: async () => {
            await delay(400);
            return [
                {
                    id: '1',
                    text: 'Explain the difference between useMemo and useCallback in React.',
                    category: 'React',
                    difficulty: 'Medium',
                    type: 'Essay',
                    tags: ['React', 'Hooks', 'Performance'],
                    usageCount: 45,
                    avgScore: 78,
                    createdAt: '2024-01-15',
                    createdBy: 'Sarah Johnson',
                    isFavorite: true
                },
                {
                    id: '2',
                    text: 'Write a function to implement debounce in JavaScript.',
                    category: 'JavaScript',
                    difficulty: 'Medium',
                    type: 'Code',
                    tags: ['JavaScript', 'Functions', 'Performance'],
                    usageCount: 89,
                    avgScore: 72,
                    createdAt: '2024-01-10',
                    createdBy: 'Michael Chen',
                    isFavorite: false
                },
                {
                    id: '3',
                    text: 'What is the purpose of the virtual DOM in React?',
                    category: 'React',
                    difficulty: 'Easy',
                    type: 'Multiple Choice',
                    tags: ['React', 'Fundamentals'],
                    usageCount: 123,
                    avgScore: 85,
                    createdAt: '2024-01-05',
                    createdBy: 'Sarah Johnson',
                    isFavorite: true
                },
                {
                    id: '4',
                    text: 'Design a RESTful API for a blog platform with posts and comments.',
                    category: 'System Design',
                    difficulty: 'Hard',
                    type: 'Essay',
                    tags: ['API', 'System Design', 'Backend'],
                    usageCount: 34,
                    avgScore: 68,
                    createdAt: '2024-01-20',
                    createdBy: 'David Kim',
                    isFavorite: false
                },
                {
                    id: '5',
                    text: 'Implement a binary search algorithm in TypeScript.',
                    category: 'Algorithms',
                    difficulty: 'Medium',
                    type: 'Code',
                    tags: ['Algorithms', 'TypeScript', 'Search'],
                    usageCount: 67,
                    avgScore: 75,
                    createdAt: '2024-01-18',
                    createdBy: 'Michael Chen',
                    isFavorite: true
                },
                {
                    id: '6',
                    text: 'What are the ACID properties in database transactions?',
                    category: 'Database',
                    difficulty: 'Medium',
                    type: 'Multiple Choice',
                    tags: ['Database', 'Transactions', 'SQL'],
                    usageCount: 56,
                    avgScore: 81,
                    createdAt: '2024-01-12',
                    createdBy: 'Sarah Johnson',
                    isFavorite: false
                },
                {
                    id: '7',
                    text: 'Explain the difference between Promise.all() and Promise.race().',
                    category: 'JavaScript',
                    difficulty: 'Easy',
                    type: 'Essay',
                    tags: ['JavaScript', 'Async', 'Promises'],
                    usageCount: 78,
                    avgScore: 82,
                    createdAt: '2024-01-08',
                    createdBy: 'David Kim',
                    isFavorite: false
                },
                {
                    id: '8',
                    text: 'Design a URL shortener service like bit.ly.',
                    category: 'System Design',
                    difficulty: 'Hard',
                    type: 'Essay',
                    tags: ['System Design', 'Scalability', 'Architecture'],
                    usageCount: 29,
                    avgScore: 65,
                    createdAt: '2024-01-22',
                    createdBy: 'Michael Chen',
                    isFavorite: true
                }
            ];
        },
        // Assessment & Interview APIs
        getAssessmentTemplates: async () => {
            await delay(400);
            return [
                {
                    id: '1',
                    name: 'Frontend Developer Assessment',
                    description: 'Comprehensive assessment for frontend developers covering React, JavaScript, and CSS',
                    questionCount: 25,
                    duration: 60,
                    difficulty: 'Medium',
                    categories: ['React', 'JavaScript', 'CSS', 'HTML'],
                    usageCount: 45,
                    avgScore: 76
                },
                {
                    id: '2',
                    name: 'Backend Engineer Assessment',
                    description: 'Technical assessment for backend engineers focusing on Node.js, databases, and APIs',
                    questionCount: 30,
                    duration: 75,
                    difficulty: 'Hard',
                    categories: ['Node.js', 'Database', 'API Design', 'System Design'],
                    usageCount: 32,
                    avgScore: 68
                },
                {
                    id: '3',
                    name: 'Full Stack Assessment',
                    description: 'Complete assessment covering both frontend and backend technologies',
                    questionCount: 40,
                    duration: 90,
                    difficulty: 'Hard',
                    categories: ['React', 'Node.js', 'Database', 'System Design'],
                    usageCount: 28,
                    avgScore: 72
                }
            ];
        },
        getLiveInterviewQuestions: async (interviewId: string) => {
            await delay(400);
            return [
                {
                    id: 1,
                    question: 'Tell me about your experience with React and modern frontend development.',
                    category: 'Experience',
                    duration: 180,
                    order: 1
                },
                {
                    id: 2,
                    question: 'How do you approach debugging complex issues in production?',
                    category: 'Problem Solving',
                    duration: 180,
                    order: 2
                },
                {
                    id: 3,
                    question: 'Describe a challenging technical problem you solved recently.',
                    category: 'Technical',
                    duration: 240,
                    order: 3
                },
                {
                    id: 4,
                    question: 'How do you stay updated with new technologies and best practices?',
                    category: 'Learning',
                    duration: 120,
                    order: 4
                }
            ];
        },
        getAIInterviewConfig: async (interviewId: string) => {
            await delay(400);
            return {
                id: interviewId,
                name: 'Technical AI Interview',
                description: 'AI-powered technical interview for software engineers',
                duration: 30,
                questionCount: 10,
                difficulty: 'Medium',
                topics: ['React', 'JavaScript', 'System Design', 'Algorithms'],
                enableFaceDetection: true,
                enableVoiceAnalysis: true,
                enableSentimentAnalysis: true,
                variants: [
                    {
                        id: 'v1',
                        name: 'Frontend Focus',
                        description: 'More questions on React and frontend technologies',
                        weight: 0.4
                    },
                    {
                        id: 'v2',
                        name: 'Backend Focus',
                        description: 'More questions on Node.js and backend concepts',
                        weight: 0.3
                    },
                    {
                        id: 'v3',
                        name: 'Balanced',
                        description: 'Equal distribution across all topics',
                        weight: 0.3
                    }
                ]
            };
        },
        getGroupCreationConfig: async () => {
            await delay(300);
            return {
                availableStages: [
                    { id: 'screening', name: 'Resume Screening', enabled: true, required: true },
                    { id: 'assessment', name: 'Technical Assessment', enabled: true, required: false },
                    { id: 'ai-interview', name: 'AI Interview', enabled: true, required: false },
                    { id: 'live-interview', name: 'Live Interview', enabled: true, required: false },
                    { id: 'final-review', name: 'Final Review', enabled: true, required: true }
                ],
                filtrationOptions: [
                    { id: 'skills', name: 'Skills Match', type: 'percentage', min: 0, max: 100, default: 70 },
                    { id: 'experience', name: 'Years of Experience', type: 'range', min: 0, max: 20, default: [2, 10] },
                    { id: 'education', name: 'Education Level', type: 'select', options: ['High School', 'Bachelor', 'Master', 'PhD'] },
                    { id: 'location', name: 'Location', type: 'multiselect', options: ['Remote', 'On-site', 'Hybrid'] }
                ],
                assessmentTemplates: [
                    { id: '1', name: 'Frontend Developer Assessment', questionCount: 25, duration: 60 },
                    { id: '2', name: 'Backend Engineer Assessment', questionCount: 30, duration: 75 },
                    { id: '3', name: 'Full Stack Assessment', questionCount: 40, duration: 90 }
                ],
                interviewTemplates: [
                    { id: '1', name: 'Technical AI Interview', duration: 30, questionCount: 10 },
                    { id: '2', name: 'Behavioral Interview', duration: 45, questionCount: 8 },
                    { id: '3', name: 'System Design Interview', duration: 60, questionCount: 5 }
                ]
            };
        },
        getGroupOverviewV2: async (groupId: string) => {
            await delay(500);
            return {
                id: groupId,
                name: 'Senior React Developers Q1',
                project: 'Summer Internship',
                status: 'active',
                createdAt: '2025-01-15',
                candidateCount: 45,
                stages: [
                    { name: 'Screening', completed: 45, pending: 0, passed: 42, failed: 3 },
                    { name: 'Assessment', completed: 38, pending: 4, passed: 35, failed: 3 },
                    { name: 'AI Interview', completed: 28, pending: 7, passed: 26, failed: 2 },
                    { name: 'Live Interview', completed: 15, pending: 11, passed: 14, failed: 1 },
                    { name: 'Final Review', completed: 8, pending: 6, passed: 7, failed: 1 }
                ],
                topCandidates: [
                    { id: 1, name: 'John Smith', score: 95, stage: 'Final Review' },
                    { id: 2, name: 'Sarah Johnson', score: 92, stage: 'Live Interview' },
                    { id: 3, name: 'Michael Chen', score: 88, stage: 'AI Interview' }
                ],
                analytics: {
                    avgScore: 82,
                    avgTimeToComplete: '12 days',
                    dropoffRate: 18,
                    cheatingFlags: 3
                }
            };
        },
        getFiltrationFlowConfig: async (positionId: string) => {
            await delay(400);
            return {
                positionId,
                positionName: 'Senior React Developer',
                currentFilters: [
                    { type: 'skills', operator: 'match', value: 85, weight: 0.4 },
                    { type: 'experience', operator: 'range', value: [3, 10], weight: 0.3 },
                    { type: 'education', operator: 'minimum', value: 'Bachelor', weight: 0.2 },
                    { type: 'location', operator: 'includes', value: ['Remote', 'Hybrid'], weight: 0.1 }
                ],
                availableFilters: [
                    { id: 'skills', name: 'Skills Match', type: 'percentage', operators: ['match', 'above', 'below'] },
                    { id: 'experience', name: 'Experience', type: 'number', operators: ['range', 'above', 'below', 'exact'] },
                    { id: 'education', name: 'Education', type: 'select', operators: ['minimum', 'exact', 'any'] },
                    { id: 'location', name: 'Location', type: 'multiselect', operators: ['includes', 'excludes', 'exact'] },
                    { id: 'salary', name: 'Salary Expectation', type: 'range', operators: ['range', 'below', 'above'] },
                    { id: 'availability', name: 'Availability', type: 'select', operators: ['exact', 'before'] }
                ],
                previewResults: {
                    totalCandidates: 156,
                    matchingCandidates: 42,
                    avgMatchScore: 87
                }
            };
        },
        getKnowledgeGraphData: async (candidateId: string) => {
            await delay(500);
            return {
                candidateId,
                candidateName: 'John Smith',
                nodes: [
                    { id: 'react', label: 'React', type: 'skill', level: 'expert', x: 0, y: 0 },
                    { id: 'typescript', label: 'TypeScript', type: 'skill', level: 'advanced', x: 100, y: 50 },
                    { id: 'nodejs', label: 'Node.js', type: 'skill', level: 'intermediate', x: -100, y: 50 },
                    { id: 'aws', label: 'AWS', type: 'skill', level: 'intermediate', x: 0, y: 100 },
                    { id: 'redux', label: 'Redux', type: 'skill', level: 'advanced', x: 50, y: -50 },
                    { id: 'frontend', label: 'Frontend', type: 'category', x: 0, y: -100 },
                    { id: 'backend', label: 'Backend', type: 'category', x: -150, y: 0 }
                ],
                edges: [
                    { from: 'react', to: 'frontend', strength: 0.9 },
                    { from: 'typescript', to: 'frontend', strength: 0.8 },
                    { from: 'redux', to: 'react', strength: 0.85 },
                    { from: 'nodejs', to: 'backend', strength: 0.75 },
                    { from: 'aws', to: 'backend', strength: 0.7 },
                    { from: 'typescript', to: 'nodejs', strength: 0.6 }
                ],
                skillSummary: {
                    totalSkills: 15,
                    expertLevel: 3,
                    advancedLevel: 5,
                    intermediateLevel: 7
                }
            };
        },
        getSkillClusters: async (positionId: string) => {
            await delay(400);
            return [
                {
                    id: '1',
                    name: 'Frontend Core',
                    skills: ['React', 'TypeScript', 'JavaScript', 'HTML', 'CSS'],
                    candidateCount: 42,
                    avgProficiency: 85,
                    color: '#6366f1'
                },
                {
                    id: '2',
                    name: 'State Management',
                    skills: ['Redux', 'MobX', 'Context API', 'Zustand'],
                    candidateCount: 35,
                    avgProficiency: 78,
                    color: '#8b5cf6'
                },
                {
                    id: '3',
                    name: 'Build Tools',
                    skills: ['Webpack', 'Vite', 'Babel', 'ESLint'],
                    candidateCount: 28,
                    avgProficiency: 72,
                    color: '#10b981'
                },
                {
                    id: '4',
                    name: 'Testing',
                    skills: ['Jest', 'React Testing Library', 'Cypress', 'Playwright'],
                    candidateCount: 31,
                    avgProficiency: 75,
                    color: '#f59e0b'
                },
                {
                    id: '5',
                    name: 'Backend Integration',
                    skills: ['REST API', 'GraphQL', 'WebSockets', 'Authentication'],
                    candidateCount: 38,
                    avgProficiency: 80,
                }
            ];
        },
        getAssessmentSession: async (sessionId: string) => {
            await delay(500);
            return {
                id: 'session-123',
                timeLimit: 45 * 60,
                questions: [
                    {
                        id: 1,
                        type: 'mcq',
                        question: 'What is the most effective way to optimize performance in a large-scale React application?',
                        options: [
                            'Using inline styles for everything',
                            'Memoizing expensive components and using code splitting',
                            'Removing all functional components',
                            'Avoiding the use of any state management'
                        ],
                        correctAnswer: 1,
                        points: 10
                    },
                    {
                        id: 2,
                        type: 'coding',
                        question: 'Implement a function that finds the longest palindromic substring in a given string.',
                        starterCode: 'function longestPalindrome(s) {\n  // Your code here\n}',
                        points: 25
                    },
                    {
                        id: 3,
                        type: 'essay',
                        question: 'Explain the concept of microservices architecture and describe two major challenges when implementing it.',
                        points: 15
                    }
                ]
            };
        },
        getRecordedInterviewQuestions: async (interviewId: string) => {
            await delay(400);
            return [
                { id: 1, question: "Describe your most challenging project and how you overcame the obstacles you faced." },
                { id: 2, question: "Tell us about a time when you had to work with a difficult team member. How did you handle the situation?" },
                { id: 3, question: "What motivates you in your professional career, and how do you stay productive during challenging times?" },
                { id: 4, question: "Describe a situation where you had to learn a new technology or skill quickly. How did you approach it?" },
                { id: 5, question: "Where do you see yourself in 5 years, and how does this position align with your career goals?" }
            ];
        }
    },
    candidate: {
        getHome: async () => {
            await delay(400);
            return {
                currentStage: 'assessment',
                notifications: [
                    {
                        id: 1,
                        type: 'success',
                        title: 'Application Received',
                        message: 'Your application for Senior Software Engineer has been received',
                        time: '2 hours ago',
                        read: false
                    },
                    {
                        id: 2,
                        type: 'info',
                        title: 'Assessment Available',
                        message: 'Technical assessment is now available to complete',
                        time: '5 hours ago',
                        read: false
                    },
                    {
                        id: 3,
                        type: 'warning',
                        title: 'Deadline Reminder',
                        message: 'Complete your assessment within 3 days',
                        time: '1 day ago',
                        read: true
                    }
                ]
            };
        },
        getAssessments: async () => {
            await delay(300);
            return [
                {
                    id: 1,
                    title: 'Software engineering technical assessment',
                    description: 'Evaluate your technical skills and problem-solving abilities with coding challenges',
                    type: 'assessment',
                    questions: 15,
                    expectedTime: '45 minutes'
                },
                {
                    id: 2,
                    title: 'Software engineering live interview',
                    description: 'Real-time interview session with technical experts to assess your skills',
                    type: 'interview',
                    parts: 1,
                    expectedTime: '60 minutes'
                },
                {
                    id: 3,
                    title: 'Software engineering recorded interview',
                    description: 'Record your responses to pre-set questions at your own convenience',
                    type: 'interview',
                    parts: 5,
                    expectedTime: '30 minutes'
                }
            ];
        },
        getProfile: async () => {
            await delay(300);
            return {
                id: 1,
                name: 'John Smith',
                email: 'john.smith@email.com',
                phone: '+1 (555) 123-4567',
                location: 'San Francisco, CA',
                avatar: null,
                title: 'Senior Full Stack Developer',
                experience: 8,
                skills: ['React', 'TypeScript', 'Node.js', 'AWS', 'Docker', 'PostgreSQL'],
                education: [
                    {
                        degree: 'Master of Science in Computer Science',
                        school: 'Stanford University',
                        year: '2015-2017'
                    },
                    {
                        degree: 'Bachelor of Science in Software Engineering',
                        school: 'UC Berkeley',
                        year: '2011-2015'
                    }
                ],
                workHistory: [
                    {
                        title: 'Senior Software Engineer',
                        company: 'Tech Corp',
                        duration: '2020 - Present',
                        description: 'Led development of microservices architecture serving 10M+ users'
                    },
                    {
                        title: 'Software Engineer',
                        company: 'StartupXYZ',
                        duration: '2017 - 2020',
                        description: 'Built and scaled e-commerce platform from 0 to 1M users'
                    }
                ],
                antiCheating: false,
                groupAssigned: true,
                pipelineStatus: {
                    groupAssignment: { status: 'completed', completedAt: '2025-01-14' },
                    assessment: { status: 'completed', completedAt: '2025-01-15' },
                    aiInterview: { status: 'completed', completedAt: '2025-01-16' },
                    liveInterview: { status: 'completed', completedAt: '2025-01-18' },
                    finalDecision: { status: 'completed', completedAt: '2025-01-20' }
                },
                offerStatus: 'sent',
                offerAcceptedDate: null,
                scores: {
                    overall: 95,
                    assessment: 95,
                    aiInterview: 92,
                    github: 88
                },
                resumeSummary: "Highly skilled Full Stack Developer with 8+ years of experience building scalable web applications. Proven track record of leading development teams, architecting microservices, and delivering high-quality software solutions. Expert in React, TypeScript, Node.js, and cloud technologies.",
                techSkills: {
                    frontend: ['React', 'TypeScript', 'Next.js', 'Vue.js', 'Tailwind CSS'],
                    backend: ['Node.js', 'Express', 'PostgreSQL', 'MongoDB', 'GraphQL', 'REST APIs'],
                    devops: ['AWS', 'Docker', 'CI/CD', 'Jenkins', 'Kubernetes']
                },
                certifications: [
                    'AWS Certified Solutions Architect',
                    'Professional Scrum Master (PSM I)',
                    'Google Cloud Professional Developer'
                ],
                githubStats: {
                    publicRepos: 47,
                    totalStars: 128,
                    followers: 85,
                    contributionsLastYear: 1452
                },
                assessmentData: {
                    completedAt: '2025-01-15',
                    duration: '45 minutes',
                    questionsTotal: 20,
                    questionsCorrect: 19,
                    topicScores: [
                        { topic: 'React', score: 95 },
                        { topic: 'TypeScript', score: 98 },
                        { topic: 'System Design', score: 90 },
                        { topic: 'Algorithms', score: 92 }
                    ]
                },
                interviewData: {
                    completedAt: '2025-01-16',
                    duration: '30 minutes',
                    questions: [
                        { question: 'Tell me about your experience with React', score: 9.5 },
                        { question: 'How do you handle state management?', score: 9.0 },
                        { question: 'Describe your deployment process', score: 8.8 }
                    ],
                    overallFeedback: 'Excellent technical knowledge and communication skills. Strong problem-solving abilities.'
                },
                assessmentQuestions: [
                    {
                        id: 1,
                        question: 'What is the main purpose of React hooks?',
                        candidateAnswer: 'React hooks allow functional components to use state and lifecycle features that were previously only available in class components. They provide a more direct API to the React concepts we already know.',
                        correctAnswer: 'React hooks let you use state and other React features without writing a class. They allow functional components to have state, lifecycle methods, and side effects.',
                        isCorrect: true,
                        topic: 'React'
                    },
                    {
                        id: 2,
                        question: 'Explain the difference between interface and type in TypeScript.',
                        candidateAnswer: 'Interfaces can be extended and merged, while types are more flexible and can represent unions, intersections, and primitives. Interfaces are better for object shapes that might be extended.',
                        correctAnswer: 'Interfaces can be extended and merged through declaration merging. Types are more flexible, supporting unions, intersections, primitives, and mapped types. Both can describe object shapes.',
                        isCorrect: true,
                        topic: 'TypeScript'
                    },
                    {
                        id: 3,
                        question: 'What is the time complexity of binary search?',
                        candidateAnswer: 'O(n)',
                        correctAnswer: 'O(log n)',
                        isCorrect: false,
                        topic: 'Algorithms'
                    },
                    {
                        id: 4,
                        question: 'How does event delegation work in JavaScript?',
                        candidateAnswer: 'Event delegation uses event bubbling to handle events at a higher level in the DOM. Instead of adding event listeners to multiple child elements, you add a single listener to a parent element.',
                        correctAnswer: 'Event delegation leverages event bubbling by placing an event listener on a parent element to handle events from child elements. This improves performance and works with dynamically added elements.',
                        isCorrect: true,
                        topic: 'JavaScript'
                    },
                    {
                        id: 5,
                        question: 'What is a closure in JavaScript?',
                        candidateAnswer: 'A closure is when a function has access to variables from its outer scope, even after the outer function has returned. It creates a private scope.',
                        correctAnswer: 'A closure is a function that has access to variables in its outer (enclosing) lexical scope, even after the outer function has returned. Closures are created every time a function is created.',
                        isCorrect: true,
                        topic: 'JavaScript'
                    }
                ],
                videoInterviewQuestions: [
                    {
                        id: 1,
                        question: 'Tell me about your experience with React and modern front-end development.',
                        videoUrl: '#',
                        transcript: 'I\'ve been working with React for over 5 years now. I started with class components and lifecycle methods, then transitioned to functional components and hooks. I\'ve built several large-scale applications using React, Redux for state management, and modern tools like Webpack and Vite for bundling. I\'m also experienced with TypeScript, which I believe is essential for maintaining large codebases. Recently, I\'ve been exploring Next.js for server-side rendering and static site generation.',
                        duration: '2:45',
                        score: 9.5
                    },
                    {
                        id: 2,
                        question: 'How do you approach debugging complex issues in production?',
                        videoUrl: '#',
                        transcript: 'When dealing with production issues, I follow a systematic approach. First, I try to reproduce the issue in a staging environment. I use logging services like Sentry or DataDog to track errors and understand the context. I also leverage browser DevTools and React DevTools for client-side issues. For backend issues, I check server logs and database queries. I believe in implementing proper error boundaries in React and comprehensive logging throughout the application.',
                        duration: '2:20',
                        score: 9.0
                    },
                    {
                        id: 3,
                        question: 'Describe a challenging technical problem you solved recently.',
                        videoUrl: '#',
                        transcript: 'Recently, I tackled a performance issue where our dashboard was taking 8-10 seconds to load. I used React Profiler to identify components that were re-rendering unnecessarily. I implemented React.memo for expensive components, used useMemo and useCallback hooks appropriately, and optimized our Redux selectors with reselect. I also implemented code splitting and lazy loading for routes. These optimizations reduced the load time to under 2 seconds.',
                        duration: '3:10',
                        score: 9.8
                    }
                ],
                liveInterviewData: {
                    duration: '45:32',
                    completedAt: '2025-01-18',
                    overallConfidence: 85,
                    overallCorrectness: 88,
                    emotionMetrics: [
                        { emotion: 'Confident', percentage: 68, color: '#10b981', icon: 'smile' },
                        { emotion: 'Engaged', percentage: 82, color: '#6366f1', icon: 'activity' },
                        { emotion: 'Calm', percentage: 75, color: '#8b5cf6', icon: 'meh' },
                        { emotion: 'Enthusiastic', percentage: 71, color: '#f59e0b', icon: 'trending-up' }
                    ],
                    transcript: `Interviewer: Good morning! Thank you for joining us today. Let's start with you telling me a bit about your background.

Candidate: Good morning! Thank you for having me. I've been working as a full-stack developer for about 8 years now. I started my career at a startup where I learned to wear multiple hats - from frontend development with React to backend services with Node.js and databases. Currently, I'm at Tech Corp where I lead a team of developers building microservices architecture.

Interviewer: That sounds great. Can you walk me through how you would design a scalable notification system?

Candidate: Absolutely. I would start by identifying the requirements - what types of notifications, expected volume, delivery channels (email, SMS, push), and latency requirements. For scalability, I'd use a message queue like RabbitMQ or AWS SQS to decouple the notification generation from delivery. I'd implement a worker pool to process notifications asynchronously. For storage, I'd use a combination of a fast cache like Redis for recent notifications and a database like PostgreSQL for persistence. I'd also implement retry logic with exponential backoff and dead letter queues for failed notifications.

Interviewer: Excellent. How would you handle rate limiting?

Candidate: Rate limiting is crucial to prevent abuse and ensure fair usage. I'd implement it at multiple levels. At the API gateway level, I'd use a token bucket algorithm to limit requests per user. For notifications specifically, I'd implement per-channel limits - for example, no more than 3 emails per hour to the same user unless it's critical. I'd use Redis to track counts with time-based keys that expire. I'd also implement circuit breakers to protect downstream services.

Interviewer: Great answers. Let's talk about your experience with testing. What's your approach?

Candidate: I'm a strong believer in comprehensive testing. I follow the testing pyramid - lots of unit tests, some integration tests, and fewer end-to-end tests. For React components, I use React Testing Library focusing on user behavior rather than implementation details. For API testing, I use Jest with supertest. I also implement contract testing for microservices communication. Code coverage is important, but I focus more on testing critical paths and edge cases. I also advocate for TDD when it makes sense, especially for complex business logic.

Interviewer: How do you stay updated with new technologies?

Candidate: I'm very passionate about continuous learning. I follow several tech blogs and newsletters like JavaScript Weekly and Node Weekly. I'm active on GitHub and contribute to open source projects when I can. I also attend local meetups and conferences. Recently, I've been exploring new patterns in React like server components and studying system design principles. I believe in learning by building, so I often create side projects to experiment with new technologies.

Interviewer: Perfect. Do you have any questions for us?

Candidate: Yes, I'd love to know more about the team structure and how you approach technical decision-making. Also, what are the biggest technical challenges the team is currently facing?`
                }
            };
        }
    }
};
