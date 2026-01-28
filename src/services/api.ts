import {
    mockJobPositions,
    mockProjects,
    mockPositionGroups,
    mockClosedProjects,
    mockClosedPositions,
    mockMembers,
    mockHrRecruiters,
    mockTechnicalRecruiters,
    JobPosition,
    Project,
    PositionGroup,
    ClosedProject,
    ClosedPosition,
    Member
} from '../data/mockData';

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
                }
            };
        }
    }
};
