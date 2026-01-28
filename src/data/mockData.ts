import {
    JobPosition,
    Project,
    PositionGroup,
    ClosedProject,
    ClosedPosition,
    Member
} from '../services/api';

// Mock Data

export const mockJobPositions: JobPosition[] = [
    {
        id: 1,
        jobTitle: 'Senior React Developer',
        department: 'Engineering',
        assignedHR: 'Sarah Johnson',
        assignedTechnicalRecruiter: 'Michael Chen',
        candidatesCount: 45,
        status: 'Open',
        projectId: 1
    },
    {
        id: 2,
        jobTitle: 'Product Manager',
        department: 'Product',
        assignedHR: 'Sarah Johnson',
        assignedTechnicalRecruiter: 'Emily Rodriguez',
        candidatesCount: 32,
        status: 'Interview',
        projectId: 1
    },
    {
        id: 3,
        jobTitle: 'DevOps Engineer',
        department: 'Engineering',
        assignedHR: 'David Kim',
        assignedTechnicalRecruiter: 'Michael Chen',
        candidatesCount: 28,
        status: 'Open',
        projectId: 1
    },
    {
        id: 4,
        jobTitle: 'UX Designer',
        department: 'Design',
        assignedHR: 'Sarah Johnson',
        assignedTechnicalRecruiter: 'Emily Rodriguez',
        candidatesCount: 19,
        status: 'Interview',
        projectId: 2
    },
    {
        id: 5,
        jobTitle: 'Data Scientist',
        department: 'Engineering',
        assignedHR: 'David Kim',
        assignedTechnicalRecruiter: 'Michael Chen',
        candidatesCount: 52,
        status: 'Open',
        projectId: 4
    },
    {
        id: 6,
        jobTitle: 'Marketing Manager',
        department: 'Marketing',
        assignedHR: 'Jessica Martinez',
        assignedTechnicalRecruiter: 'Emily Rodriguez',
        candidatesCount: 23,
        status: 'Open',
        projectId: 2
    },
    {
        id: 7,
        jobTitle: 'Backend Engineer',
        department: 'Engineering',
        assignedHR: 'David Kim',
        assignedTechnicalRecruiter: 'Michael Chen',
        candidatesCount: 38,
        status: 'On Hold',
        projectId: 1
    }
];

export const mockProjects: Project[] = [
    {
        id: 1,
        projectName: 'Q1 2024 Engineering Expansion',
        positionsCount: 8,
        applicantsCount: 234,
        subGroupsCount: 15,
        openDate: '2024-01-15'
    },
    {
        id: 2,
        projectName: 'Product Team Scale-up',
        positionsCount: 5,
        applicantsCount: 156,
        subGroupsCount: 10,
        openDate: '2024-02-01'
    },
    {
        id: 3,
        projectName: 'Design Department Expansion',
        positionsCount: 4,
        applicantsCount: 89,
        subGroupsCount: 8,
        openDate: '2024-02-15'
    },
    {
        id: 4,
        projectName: 'Data Analytics Team Build',
        positionsCount: 6,
        applicantsCount: 178,
        subGroupsCount: 12,
        openDate: '2024-03-01'
    }
];

export const mockPositionGroups: PositionGroup[] = [
    {
        id: 1,
        groupName: 'Senior Developers - Batch A',
        positionTitle: 'Senior React Developer',
        candidatesCount: 25,
        status: 'Active',
        createdDate: '2024-01-20',
        hasAssessment: true,
        hasAIInterview: true,
        hasLiveInterview: true
    },
    {
        id: 2,
        groupName: 'Senior Developers - Batch B',
        positionTitle: 'Senior React Developer',
        candidatesCount: 20,
        status: 'Processing',
        createdDate: '2024-02-05',
        hasAssessment: true,
        hasAIInterview: true,
        hasLiveInterview: false
    },
    {
        id: 3,
        groupName: 'Fast Track Candidates',
        positionTitle: 'Senior React Developer',
        candidatesCount: 8,
        status: 'Completed',
        createdDate: '2024-01-18',
        hasAssessment: true,
        hasAIInterview: false,
        hasLiveInterview: true
    }
];

export const mockClosedProjects: ClosedProject[] = [
    {
        id: 'proj-1',
        projectName: 'Tech Corp Engineering 2024',
        closedDate: '2024-12-31',
        positionsCount: 8,
        totalCandidates: 234,
        openDate: '2024-01-15'
    },
    {
        id: 'proj-2',
        projectName: 'Marketing Initiative Q4',
        closedDate: '2024-11-15',
        positionsCount: 3,
        totalCandidates: 86,
        openDate: '2024-08-10'
    },
    {
        id: 'proj-3',
        projectName: 'Product Team Expansion',
        closedDate: '2024-10-20',
        positionsCount: 5,
        totalCandidates: 142,
        openDate: '2024-05-05'
    },
    {
        id: 'proj-4',
        projectName: 'Sales Department Growth',
        closedDate: '2024-09-05',
        positionsCount: 4,
        totalCandidates: 97,
        openDate: '2024-03-20'
    }
];

export const mockClosedPositions: ClosedPosition[] = [
    {
        id: 1,
        jobTitle: 'Senior Frontend Developer',
        projectName: 'Tech Corp Engineering 2024',
        closureStatus: 'Filled',
        closedDate: '2024-03-01',
        closureReason: 'Position successfully filled with qualified candidate',
        candidatesCount: 67,
        groupsCreated: 5,
        assessmentsPassed: 23,
        aiInterviewsPassed: 15,
        liveInterviewsPassed: 8,
        selectedCandidates: [
            {
                id: 1,
                name: 'Sarah Johnson',
                email: 'sarah.johnson@email.com',
                selectionDate: '2024-03-01',
                finalScore: 94,
                position: 'Senior Frontend Developer'
            }
        ]
    },
    {
        id: 2,
        jobTitle: 'Backend Engineer',
        projectName: 'Tech Corp Engineering 2024',
        closureStatus: 'Filled',
        closedDate: '2024-04-15',
        closureReason: 'Two positions filled from candidate pool',
        candidatesCount: 52,
        groupsCreated: 4,
        assessmentsPassed: 19,
        aiInterviewsPassed: 12,
        liveInterviewsPassed: 6,
        selectedCandidates: [
            {
                id: 2,
                name: 'Michael Chen',
                email: 'michael.chen@email.com',
                selectionDate: '2024-04-15',
                finalScore: 91,
                position: 'Backend Engineer'
            },
            {
                id: 3,
                name: 'Emily Rodriguez',
                email: 'emily.rodriguez@email.com',
                selectionDate: '2024-04-15',
                finalScore: 88,
                position: 'Backend Engineer'
            }
        ]
    },
    {
        id: 3,
        jobTitle: 'DevOps Specialist',
        projectName: 'Tech Corp Engineering 2024',
        closureStatus: 'Cancelled',
        closedDate: '2024-05-10',
        closureReason: 'Budget constraints led to position cancellation',
        candidatesCount: 38,
        groupsCreated: 3,
        assessmentsPassed: 14,
        aiInterviewsPassed: 8,
        liveInterviewsPassed: 0,
        selectedCandidates: []
    },
    {
        id: 4,
        jobTitle: 'Full Stack Developer',
        projectName: 'Tech Corp Engineering 2024',
        closureStatus: 'Filled',
        closedDate: '2024-06-22',
        closureReason: 'Excellent candidate selected from talent pool',
        candidatesCount: 45,
        groupsCreated: 4,
        assessmentsPassed: 16,
        aiInterviewsPassed: 10,
        liveInterviewsPassed: 5,
        selectedCandidates: [
            {
                id: 4,
                name: 'David Kim',
                email: 'david.kim@email.com',
                selectionDate: '2024-06-22',
                finalScore: 96,
                position: 'Full Stack Developer'
            }
        ]
    },
    {
        id: 5,
        jobTitle: 'Mobile Developer (iOS)',
        projectName: 'Tech Corp Engineering 2024',
        closureStatus: 'On Hold',
        closedDate: '2024-07-18',
        closureReason: 'Waiting for project prioritization decision',
        candidatesCount: 32,
        groupsCreated: 2,
        assessmentsPassed: 11,
        aiInterviewsPassed: 7,
        liveInterviewsPassed: 3,
        selectedCandidates: []
    }
];

export const mockMembers: Member[] = [
    {
        id: 1,
        name: 'Sarah Johnson',
        email: 'sarah.johnson@company.com',
        role: 'Admin',
        position: 'HR Manager',
        department: 'Human Resources',
        joinDate: 'Jan 15, 2023'
    },
    {
        id: 2,
        name: 'Michael Chen',
        email: 'michael.chen@company.com',
        role: 'Member',
        position: 'Engineering Lead',
        department: 'Engineering',
        joinDate: 'Mar 20, 2023'
    },
    {
        id: 3,
        name: 'Emily Rodriguez',
        email: 'emily.rodriguez@company.com',
        role: 'Member',
        position: 'Senior Designer',
        department: 'Design',
        joinDate: 'May 10, 2023'
    },
    {
        id: 4,
        name: 'David Kim',
        email: 'david.kim@company.com',
        role: 'Member',
        position: 'Marketing Director',
        department: 'Marketing',
        joinDate: 'Feb 28, 2023'
    },
    {
        id: 5,
        name: 'Jessica Martinez',
        email: 'jessica.martinez@company.com',
        role: 'Member',
        position: 'Sales Manager',
        department: 'Sales',
        joinDate: 'Jun 18, 2023'
    },
    {
        id: 6,
        name: 'Robert Martinez',
        email: 'robert.martinez@company.com',
        role: 'Employee',
        position: 'Junior Developer',
        department: 'Engineering',
        joinDate: 'Aug 5, 2023'
    },
    {
        id: 7,
        name: 'Amanda Lee',
        email: 'amanda.lee@company.com',
        role: 'Member',
        position: 'Finance Manager',
        department: 'Finance',
        joinDate: 'Apr 12, 2023'
    }
];

export const mockHrRecruiters = [
    'Sarah Johnson',
    'David Kim',
    'Jessica Martinez',
    'Amanda Lee'
];

export const mockTechnicalRecruiters = [
    'Michael Chen',
    'Emily Rodriguez',
    'Robert Martinez',
    'Jane Smith'
];
