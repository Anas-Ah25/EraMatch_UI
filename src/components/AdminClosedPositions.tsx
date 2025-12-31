import { useState } from 'react';
import { ArrowUpDown, Search, Eye, FileText, X, TrendingUp, TrendingDown, AlertTriangle, ArrowLeft } from 'lucide-react';
import { Button } from './ui/button';
import { CandidateProfile } from './CandidateProfile';
import { ApprovedCandidatesList } from './ApprovedCandidatesList';

interface ClosedPosition {
  id: number;
  jobTitle: string;
  department: string;
  closureStatus: 'Filled' | 'Cancelled' | 'On Hold';
  closureReason: string[];
  closureNote?: string;
  closedDate: string;
  assignedHR: string;
  assignedTechnicalRecruiter: string;
  candidatesCount: number;
  groupsCreated: number;
  securityIssues: number;
  closureStatusReport?: string;
  approvedCandidates?: ApprovedCandidate[];
}

interface ApprovedCandidate {
  id: number;
  name: string;
  title: string;
  email: string;
  overallScore: number;
  assessmentScore: number;
  aiInterviewScore: number;
  githubScore: number;
  groupId: string;
  groupName: string;
}

interface AdminClosedPositionsProps {
  onSignOut: () => void;
}

type ViewMode = 'table' | 'insights' | 'candidate' | 'approved-list';

export function AdminClosedPositions({ onSignOut }: AdminClosedPositionsProps) {
  const [sortField, setSortField] = useState<string>('');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedNotes, setExpandedNotes] = useState<Set<number>>(new Set());
  const [selectedReport, setSelectedReport] = useState<ClosedPosition | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>('table');
  const [selectedPosition, setSelectedPosition] = useState<ClosedPosition | null>(null);
  const [selectedCandidateId, setSelectedCandidateId] = useState<number | null>(null);
  const [selectedCandidates, setSelectedCandidates] = useState<ApprovedCandidate[]>([]);

  const closedPositions: ClosedPosition[] = [
    {
      id: 1,
      jobTitle: 'Senior Frontend Developer',
      department: 'Engineering',
      closureStatus: 'Filled',
      closureReason: ['Candidate found via EraMatch', 'Position successfully filled'],
      closureNote: 'Excellent candidate with 8 years of React experience. Started on March 15th.',
      closedDate: '2024-03-01',
      assignedHR: 'Sarah Johnson',
      assignedTechnicalRecruiter: 'Michael Chen',
      candidatesCount: 67,
      groupsCreated: 5,
      securityIssues: 2,
      closureStatusReport: 'After a thorough 4-week recruitment process, we successfully identified and hired John Smith for the Senior Frontend Developer position. The candidate demonstrated exceptional React expertise with 8+ years of experience and successfully passed all technical assessments with a score of 95/100. The AI interview revealed strong communication skills and cultural fit. We had 67 total applicants, conducted 15 technical assessments, and performed 8 final interviews. The position was filled within budget and timeline expectations.',
      approvedCandidates: [
        {
          id: 1,
          name: 'John Smith',
          title: 'Senior Frontend Developer',
          email: 'john.smith@example.com',
          overallScore: 95,
          assessmentScore: 95,
          aiInterviewScore: 95,
          githubScore: 95,
          groupId: 'group1',
          groupName: 'Frontend Team'
        }
      ]
    },
    {
      id: 2,
      jobTitle: 'Marketing Coordinator',
      department: 'Marketing',
      closureStatus: 'Cancelled',
      closureReason: ['Budget constraints', 'Role no longer needed'],
      closureNote: 'Department restructuring led to elimination of this position.',
      closedDate: '2024-02-28',
      assignedHR: 'Jessica Martinez',
      assignedTechnicalRecruiter: 'Emily Rodriguez',
      candidatesCount: 42,
      groupsCreated: 3,
      securityIssues: 0,
      closureStatusReport: 'Due to Q1 budget cuts and department restructuring, the Marketing Coordinator position has been cancelled. The responsibilities have been redistributed among existing team members. We had 42 qualified applicants and were in the process of scheduling interviews when the decision was made to cancel the position. All applicants have been notified and thanked for their interest.',
      approvedCandidates: []
    },
    {
      id: 3,
      jobTitle: 'Full Stack Engineer',
      department: 'Engineering',
      closureStatus: 'Filled',
      closureReason: ['Candidate found via EraMatch'],
      closedDate: '2024-02-20',
      assignedHR: 'Sarah Johnson',
      assignedTechnicalRecruiter: 'Michael Chen',
      candidatesCount: 89,
      groupsCreated: 6,
      securityIssues: 1,
      closureStatusReport: 'Successfully hired a full stack engineer through EraMatch platform. The candidate showed strong proficiency in both frontend and backend technologies. Completed the hiring process in 3 weeks, which is 40% faster than our average time to hire.',
      approvedCandidates: [
        {
          id: 2,
          name: 'Jane Doe',
          title: 'Full Stack Engineer',
          email: 'jane.doe@example.com',
          overallScore: 90,
          assessmentScore: 90,
          aiInterviewScore: 90,
          githubScore: 90,
          groupId: 'group2',
          groupName: 'Backend Team'
        },
        {
          id: 3,
          name: 'Alice Johnson',
          title: 'Full Stack Engineer',
          email: 'alice.johnson@example.com',
          overallScore: 88,
          assessmentScore: 88,
          aiInterviewScore: 88,
          githubScore: 88,
          groupId: 'group2',
          groupName: 'Backend Team'
        }
      ]
    },
    {
      id: 4,
      jobTitle: 'HR Business Partner',
      department: 'Human Resources',
      closureStatus: 'On Hold',
      closureReason: ['Pending budget approval', 'Q2 hiring freeze'],
      closureNote: 'Position will reopen in Q3 2024 pending budget review.',
      closedDate: '2024-02-15',
      assignedHR: 'David Kim',
      assignedTechnicalRecruiter: 'Emily Rodriguez',
      candidatesCount: 34,
      groupsCreated: 2,
      securityIssues: 0,
      closureStatusReport: 'This position has been placed on hold due to the company-wide Q2 hiring freeze. We had identified 3 strong candidates who made it to the final round. Once budget approval is received in Q3, we will reach out to these candidates to resume the hiring process.',
      approvedCandidates: []
    },
    {
      id: 5,
      jobTitle: 'Senior UX Researcher',
      department: 'Design',
      closureStatus: 'Filled',
      closureReason: ['Internal promotion', 'Candidate found via EraMatch'],
      closureNote: 'Promoted internal candidate from UX Designer role after successful interview process.',
      closedDate: '2024-02-10',
      assignedHR: 'Sarah Johnson',
      assignedTechnicalRecruiter: 'Emily Rodriguez',
      candidatesCount: 28,
      groupsCreated: 2,
      securityIssues: 0,
      closureStatusReport: 'After evaluating both external and internal candidates, we decided to promote an internal UX Designer to the Senior UX Researcher position. This decision was based on their deep understanding of our products and excellent performance in the assessment process. The internal promotion also helps with retention and demonstrates career growth opportunities within the company.',
      approvedCandidates: [
        {
          id: 4,
          name: 'Bob Smith',
          title: 'Senior UX Researcher',
          email: 'bob.smith@example.com',
          overallScore: 92,
          assessmentScore: 92,
          aiInterviewScore: 92,
          githubScore: 92,
          groupId: 'group3',
          groupName: 'Design Team'
        }
      ]
    },
    {
      id: 6,
      jobTitle: 'Sales Development Representative',
      department: 'Sales',
      closureStatus: 'Cancelled',
      closureReason: ['Position eliminated', 'Team restructuring'],
      closedDate: '2024-02-05',
      assignedHR: 'Jessica Martinez',
      assignedTechnicalRecruiter: 'Michael Chen',
      candidatesCount: 56,
      groupsCreated: 4,
      securityIssues: 1,
      closureStatusReport: 'The Sales Development Representative position was eliminated as part of a broader sales team restructuring. The SDR responsibilities will now be handled by our existing Account Executives. All 56 applicants were notified of the cancellation with our sincere appreciation for their interest.',
      approvedCandidates: []
    },
    {
      id: 7,
      jobTitle: 'Cloud Infrastructure Engineer',
      department: 'Engineering',
      closureStatus: 'Filled',
      closureReason: ['Candidate found via EraMatch', 'External hire'],
      closureNote: 'Hired candidate with extensive AWS and Kubernetes experience.',
      closedDate: '2024-01-30',
      assignedHR: 'David Kim',
      assignedTechnicalRecruiter: 'Michael Chen',
      candidatesCount: 52,
      groupsCreated: 4,
      securityIssues: 3,
      closureStatusReport: 'Successfully hired an experienced Cloud Infrastructure Engineer with 10+ years of AWS and Kubernetes expertise. The candidate exceeded all technical requirements and demonstrated strong DevOps practices. Note: 3 security background check issues were identified during the screening process for other candidates, all resolved satisfactorily.',
      approvedCandidates: [
        {
          id: 5,
          name: 'Charlie Brown',
          title: 'Cloud Infrastructure Engineer',
          email: 'charlie.brown@example.com',
          overallScore: 94,
          assessmentScore: 94,
          aiInterviewScore: 94,
          githubScore: 94,
          groupId: 'group4',
          groupName: 'Cloud Team'
        },
        {
          id: 6,
          name: 'Diana Prince',
          title: 'Cloud Infrastructure Engineer',
          email: 'diana.prince@example.com',
          overallScore: 93,
          assessmentScore: 93,
          aiInterviewScore: 93,
          githubScore: 93,
          groupId: 'group4',
          groupName: 'Cloud Team'
        }
      ]
    },
    {
      id: 8,
      jobTitle: 'Content Marketing Manager',
      department: 'Marketing',
      closureStatus: 'On Hold',
      closureReason: ['Pending strategy review', 'Department reorganization'],
      closedDate: '2024-01-25',
      assignedHR: 'Jessica Martinez',
      assignedTechnicalRecruiter: 'Emily Rodriguez',
      candidatesCount: 31,
      groupsCreated: 3,
      securityIssues: 0,
      closureStatusReport: 'The Content Marketing Manager position is on hold pending the completion of our Q2 marketing strategy review. We have 5 strong candidates in our pipeline who we plan to re-engage once the strategy is finalized and we receive approval to proceed with hiring.',
      approvedCandidates: []
    }
  ];

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const toggleNoteExpansion = (id: number) => {
    const newExpanded = new Set(expandedNotes);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedNotes(newExpanded);
  };

  const getStatusBadgeColor = (status: 'Filled' | 'Cancelled' | 'On Hold') => {
    switch (status) {
      case 'Filled':
        return 'bg-[#10b981] text-white';
      case 'Cancelled':
        return 'bg-[#ef4444] text-white';
      case 'On Hold':
        return 'bg-[#f59e0b] text-white';
      default:
        return 'bg-[#e5e7eb] text-[#6b7280]';
    }
  };

  // Filter by search query
  const filteredPositions = closedPositions.filter(position => {
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        position.jobTitle.toLowerCase().includes(query) ||
        position.department.toLowerCase().includes(query) ||
        position.closureStatus.toLowerCase().includes(query) ||
        position.closureReason.some(reason => reason.toLowerCase().includes(query))
      );
    }
    return true;
  });

  // If viewing insights, show full page insights view
  if (viewMode === 'insights' && selectedPosition) {
    return (
      <div className="px-12 py-8">
        {/* Header with Back Button */}
        <div className="mb-8">
          <button
            onClick={() => setViewMode('table')}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors mb-4"
          >
            <ArrowLeft size={20} />
            <span className="font-['Arimo',sans-serif] text-[14px]">Back to Closed Positions</span>
          </button>
          <div>
            <h1 className="text-gray-900 text-3xl mb-2">Position Insights</h1>
            <p className="text-gray-500">
              {selectedPosition.jobTitle} • {selectedPosition.department} Department
            </p>
          </div>
        </div>

        {/* Overview Stats Grid */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-3xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <span className="text-gray-500 text-sm">Total Candidates</span>
              <TrendingUp className="w-5 h-5 text-emerald-600" />
            </div>
            <div className="text-5xl text-gray-900 mb-1">{selectedPosition.candidatesCount}</div>
            <div className="text-xs text-emerald-600">+12% from last week</div>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <span className="text-gray-500 text-sm">Avg. Assessment</span>
            </div>
            <div className="text-5xl text-gray-900 mb-1">87%</div>
            <div className="text-xs text-gray-500">Above threshold</div>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <span className="text-gray-500 text-sm">Interview Rate</span>
            </div>
            <div className="text-5xl text-gray-900 mb-1">64%</div>
            <div className="text-xs text-indigo-600">Strong pipeline</div>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <span className="text-gray-500 text-sm">Time to Hire</span>
              <TrendingDown className="w-5 h-5 text-red-600" />
            </div>
            <div className="text-5xl text-gray-900 mb-1">28d</div>
            <div className="text-xs text-red-600">+3 days slower</div>
          </div>
        </div>

        {/* Candidate Pipeline Overview */}
        <div className="bg-white rounded-3xl p-8 shadow-sm mb-8">
          <div className="mb-6">
            <h3 className="text-gray-900 mb-2">Candidate Pipeline</h3>
            <p className="text-gray-500 text-sm">Hiring funnel progression and stage drop-offs</p>
          </div>

          <div className="space-y-6">
            {[
              { stage: 'Applied', count: selectedPosition.candidatesCount, color: '#6366f1', percentage: 100 },
              { stage: 'Assessment', count: Math.floor(selectedPosition.candidatesCount * 0.78), color: '#8b5cf6', percentage: 78 },
              { stage: 'Interview', count: Math.floor(selectedPosition.candidatesCount * 0.52), color: '#a855f7', percentage: 52 },
              { stage: 'Offer', count: Math.floor(selectedPosition.candidatesCount * 0.24), color: '#c084fc', percentage: 24 },
              { stage: 'Hired', count: Math.floor(selectedPosition.candidatesCount * 0.16), color: '#10b981', percentage: 16 }
            ].map((stage, index, arr) => (
              <div key={stage.stage}>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-4">
                    <span className="font-['Arimo',sans-serif] text-[15px] text-[#374151] min-w-[100px]">
                      {stage.stage}
                    </span>
                    <span className="font-['Arimo',sans-serif] text-[15px] text-[#6b7280]">
                      {stage.count} candidates
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-['Arimo',sans-serif] text-[14px] text-[#6b7280]">
                      {stage.percentage}%
                    </span>
                    {index > 0 && (
                      <span className="font-['Arimo',sans-serif] text-[13px] text-[#9ca3af]">
                        -{arr[index - 1].percentage - stage.percentage}% drop
                      </span>
                    )}
                  </div>
                </div>
                <div className="h-14 bg-[#f3f4f6] rounded-xl overflow-hidden">
                  <div
                    className="h-full rounded-xl transition-all duration-500 flex items-center justify-between px-5"
                    style={{
                      width: `${stage.percentage}%`,
                      backgroundColor: stage.color
                    }}
                  >
                    <span className="font-['Arimo',sans-serif] text-[14px] text-white font-medium">
                      {stage.stage}
                    </span>
                    <span className="font-['Arimo',sans-serif] text-[16px] text-white font-semibold">
                      {stage.count}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Assessment & Interview Analytics Grid */}
        <div className="grid grid-cols-2 gap-8 mb-8">
          {/* Assessment Performance */}
          <div className="bg-white rounded-3xl p-8 shadow-sm">
            <div className="mb-6">
              <h3 className="text-gray-900 mb-2">Assessment Performance</h3>
              <p className="text-gray-500 text-sm">Score distribution and pass rates</p>
            </div>

            {/* Score Stats */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-[#f9fafb] rounded-2xl p-5">
                <div className="text-sm text-gray-500 mb-2">Average Score</div>
                <div className="text-4xl text-gray-900">87.4%</div>
              </div>
              <div className="bg-[#f9fafb] rounded-2xl p-5">
                <div className="text-sm text-gray-500 mb-2">Pass Rate</div>
                <div className="text-4xl text-emerald-600">78%</div>
              </div>
            </div>

            {/* Pass/Fail Distribution */}
            <div className="space-y-5">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-700">Passed</span>
                  <span className="text-sm text-gray-900 font-medium">
                    {Math.floor(selectedPosition.candidatesCount * 0.78 * 0.78)} candidates (78%)
                  </span>
                </div>
                <div className="h-10 bg-[#f3f4f6] rounded-xl overflow-hidden">
                  <div
                    className="h-full bg-emerald-500 rounded-xl flex items-center justify-end pr-4"
                    style={{ width: '78%' }}
                  >
                    <span className="text-sm text-white font-medium">78%</span>
                  </div>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-700">Failed</span>
                  <span className="text-sm text-gray-900 font-medium">
                    {Math.floor(selectedPosition.candidatesCount * 0.78 * 0.22)} candidates (22%)
                  </span>
                </div>
                <div className="h-10 bg-[#f3f4f6] rounded-xl overflow-hidden">
                  <div
                    className="h-full bg-gray-400 rounded-xl flex items-center justify-end pr-4"
                    style={{ width: '22%' }}
                  >
                    <span className="text-sm text-white font-medium">22%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Interview Outcomes */}
          <div className="bg-white rounded-3xl p-8 shadow-sm">
            <div className="mb-6">
              <h3 className="text-gray-900 mb-2">Interview Outcomes</h3>
              <p className="text-gray-500 text-sm">Completion rates and recommendations</p>
            </div>

            {/* Interview Stats */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-[#f9fafb] rounded-2xl p-5">
                <div className="text-sm text-gray-500 mb-2">Completed</div>
                <div className="text-4xl text-gray-900">
                  {Math.floor(selectedPosition.candidatesCount * 0.52 * 0.66)}/{Math.floor(selectedPosition.candidatesCount * 0.52)}
                </div>
              </div>
              <div className="bg-[#f9fafb] rounded-2xl p-5">
                <div className="text-sm text-gray-500 mb-2">Recommended</div>
                <div className="text-4xl text-indigo-600">
                  {Math.floor(selectedPosition.candidatesCount * 0.52 * 0.66 * 0.78)}
                </div>
              </div>
            </div>

            {/* Recommendation Distribution */}
            <div className="space-y-5">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-700">Recommended</span>
                  <span className="text-sm text-gray-900 font-medium">
                    {Math.floor(selectedPosition.candidatesCount * 0.52 * 0.66 * 0.78)} candidates (78%)
                  </span>
                </div>
                <div className="h-10 bg-[#f3f4f6] rounded-xl overflow-hidden">
                  <div
                    className="h-full bg-indigo-500 rounded-xl flex items-center justify-end pr-4"
                    style={{ width: '78%' }}
                  >
                    <span className="text-sm text-white font-medium">78%</span>
                  </div>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-700">Not Recommended</span>
                  <span className="text-sm text-gray-900 font-medium">
                    {Math.floor(selectedPosition.candidatesCount * 0.52 * 0.66 * 0.22)} candidates (22%)
                  </span>
                </div>
                <div className="h-10 bg-[#f3f4f6] rounded-xl overflow-hidden">
                  <div
                    className="h-full bg-gray-400 rounded-xl flex items-center justify-end pr-4"
                    style={{ width: '22%' }}
                  >
                    <span className="text-sm text-white font-medium">22%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Integrity Indicators */}
        <div className="bg-white rounded-3xl p-8 shadow-sm mb-8">
          <div className="mb-6">
            <h3 className="text-gray-900 mb-2">Integrity & Cheating Indicators</h3>
            <p className="text-gray-500 text-sm">Assessment integrity flags and severity distribution</p>
          </div>

          <div className="grid grid-cols-3 gap-6 mb-6">
            {/* Low Severity */}
            <div className="bg-[#f0fdf4] border-2 border-[#86efac] rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-4 h-4 rounded-full bg-emerald-500"></div>
                <span className="text-sm text-gray-700 font-medium">Low Severity</span>
              </div>
              <div className="text-5xl text-gray-900 mb-2">2</div>
              <div className="text-sm text-gray-600">Minor timing irregularities</div>
            </div>

            {/* Medium Severity */}
            <div className="bg-[#fef3c7] border-2 border-[#fcd34d] rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-4 h-4 rounded-full bg-amber-500"></div>
                <span className="text-sm text-gray-700 font-medium">Medium Severity</span>
              </div>
              <div className="text-5xl text-gray-900 mb-2">1</div>
              <div className="text-sm text-gray-600">Tab switching detected</div>
            </div>

            {/* High Severity */}
            <div className="bg-[#fef2f2] border-2 border-[#fca5a5] rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-4 h-4 rounded-full bg-red-500"></div>
                <span className="text-sm text-gray-700 font-medium">High Severity</span>
              </div>
              <div className="text-5xl text-gray-900 mb-2">0</div>
              <div className="text-sm text-gray-600">No critical violations</div>
            </div>
          </div>

          {/* Summary Note */}
          <div className="p-5 bg-[#f9fafb] rounded-2xl flex items-start gap-4">
            <AlertTriangle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" />
            <div>
              <p className="text-sm text-gray-900 font-medium mb-1">Integrity Assessment Summary</p>
              <p className="text-sm text-gray-600">
                3 candidates flagged for review (7% of total). All flags are low to medium severity. Recommend manual review before advancing to offer stage.
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-4">
          <Button
            variant="outline"
            className="rounded-full px-8 py-6"
            onClick={() => setViewMode('table')}
          >
            Back to Closed Positions
          </Button>
          <Button
            className="rounded-full px-8 py-6 text-white"
            style={{ backgroundColor: '#6366F1' }}
            onClick={() => {
              console.log('Exporting insights for:', selectedPosition);
            }}
          >
            Export Report
          </Button>
        </div>
      </div>
    );
  }

  // If viewing candidate profile
  if (viewMode === 'candidate' && selectedCandidateId) {
    return (
      <CandidateProfile
        candidateId={selectedCandidateId}
        onBack={() => {
          setViewMode('table');
          setSelectedCandidateId(null);
        }}
        onViewKnowledgeGraph={() => {
          // Handle knowledge graph view if needed
        }}
      />
    );
  }

  // If viewing approved candidates list
  if (viewMode === 'approved-list' && selectedPosition && selectedCandidates.length > 0) {
    return (
      <ApprovedCandidatesList
        positionTitle={selectedPosition.jobTitle}
        department={selectedPosition.department}
        candidates={selectedCandidates}
        onBack={() => {
          setViewMode('table');
          setSelectedCandidates([]);
          setSelectedPosition(null);
        }}
        onViewCandidate={(candidateId) => {
          setSelectedCandidateId(candidateId);
          setViewMode('candidate');
        }}
      />
    );
  }

  return (
    <div className="px-12 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-gray-900 text-3xl mb-2">Closed Positions Archive</h1>
        <p className="text-gray-500">Review and manage all closed job positions</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-3xl px-8 py-6 shadow-sm">
          <div className="flex items-center gap-3">
            <span className="text-5xl text-gray-900">
              {closedPositions.filter(p => p.closureStatus === 'Filled').length}
            </span>
            <div className="flex-1">
              <div className="text-gray-900 mb-1">Filled Positions</div>
              <div className="text-gray-400 text-sm">successfully hired</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl px-8 py-6 shadow-sm">
          <div className="flex items-center gap-3">
            <span className="text-5xl text-gray-900">
              {closedPositions.filter(p => p.closureStatus === 'Cancelled').length}
            </span>
            <div className="flex-1">
              <div className="text-gray-900 mb-1">Cancelled Positions</div>
              <div className="text-gray-400 text-sm">no longer needed</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl px-8 py-6 shadow-sm">
          <div className="flex items-center gap-3">
            <span className="text-5xl text-gray-900">
              {closedPositions.filter(p => p.closureStatus === 'On Hold').length}
            </span>
            <div className="flex-1">
              <div className="text-gray-900 mb-1">On Hold</div>
              <div className="text-gray-400 text-sm">pending review</div>
            </div>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search by job title, department, status, or closure reason..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-12 pl-12 pr-4 rounded-xl border border-gray-200 font-['Arimo',sans-serif] text-[14px] focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Closed Positions Table */}
      <div className="bg-white rounded-3xl p-6 shadow-sm">
        <div className="mb-6">
          <h3 className="text-gray-900 mb-2">All Closed Positions</h3>
          <p className="text-gray-500 text-sm">
            {filteredPositions.length} {filteredPositions.length === 1 ? 'position' : 'positions'} found
          </p>
        </div>

        <div className="bg-white rounded-[12px] border border-[#e5e7eb] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#f9fafb] border-b border-[#e5e7eb]">
                <tr>
                  <th className="text-left p-4">
                    <button
                      onClick={() => handleSort('jobTitle')}
                      className="flex items-center gap-1 font-['Arimo',sans-serif] text-[13px] text-[#6b7280] hover:text-[#111827]"
                    >
                      Job Title
                      <ArrowUpDown size={14} />
                    </button>
                  </th>
                  <th className="text-left p-4">
                    <span className="font-['Arimo',sans-serif] text-[13px] text-[#6b7280]">
                      Closure Status
                    </span>
                  </th>
                  <th className="text-left p-4">
                    <button
                      onClick={() => handleSort('candidatesCount')}
                      className="flex items-center gap-1 font-['Arimo',sans-serif] text-[13px] text-[#6b7280] hover:text-[#111827]"
                    >
                      Candidates
                      <ArrowUpDown size={14} />
                    </button>
                  </th>
                  <th className="text-left p-4">
                    <button
                      onClick={() => handleSort('closedDate')}
                      className="flex items-center gap-1 font-['Arimo',sans-serif] text-[13px] text-[#6b7280] hover:text-[#111827]"
                    >
                      Closed Date
                      <ArrowUpDown size={14} />
                    </button>
                  </th>
                  <th className="text-left p-4">
                    <span className="font-['Arimo',sans-serif] text-[13px] text-[#6b7280]">
                      Closure Status Report
                    </span>
                  </th>
                  <th className="text-left p-4">
                    <span className="font-['Arimo',sans-serif] text-[13px] text-[#6b7280]">
                      Final Candidate Report
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredPositions.map((position, index) => (
                  <tr
                    key={position.id}
                    className={`border-b border-[#e5e7eb] hover:bg-[#f9fafb] transition-colors ${
                      index === filteredPositions.length - 1 ? 'border-b-0' : ''
                    }`}
                  >
                    <td className="p-4">
                      <div>
                        <div className="font-['Arimo',sans-serif] text-[14px] text-[#111827] mb-1">
                          {position.jobTitle}
                        </div>
                        <button
                          onClick={() => {
                            setSelectedPosition(position);
                            setViewMode('insights');
                          }}
                          className="font-['Arimo',sans-serif] text-[12px] text-[#6366f1] hover:text-[#4f46e5]"
                        >
                          View Position Insights
                        </button>
                      </div>
                    </td>
                    <td className="p-4">
                      <span
                        className={`inline-block px-3 py-1 rounded-full font-['Arimo',sans-serif] text-[12px] ${getStatusBadgeColor(
                          position.closureStatus
                        )}`}
                      >
                        {position.closureStatus}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className="font-['Arimo',sans-serif] text-[14px] text-[#111827]">
                        {position.candidatesCount}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className="font-['Arimo',sans-serif] text-[14px] text-[#6b7280]">
                        {new Date(position.closedDate).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </span>
                    </td>
                    <td className="p-4">
                      {position.closureStatusReport ? (
                        <button
                          onClick={() => setSelectedReport(position)}
                          className="flex items-center gap-2 h-[32px] px-[16px] rounded-[8px] border border-[#e5e7eb] bg-white hover:bg-[#f9fafb] transition-colors"
                        >
                          <FileText size={16} className="text-[#6366f1]" />
                          <span className="font-['Arimo',sans-serif] text-[13px] text-[#111827]">
                            View Report
                          </span>
                        </button>
                      ) : (
                        <span className="font-['Arimo',sans-serif] text-[13px] text-[#9ca3af]">
                          No report
                        </span>
                      )}
                    </td>
                    <td className="p-4">
                      {position.closureStatus === 'Filled' && position.approvedCandidates && position.approvedCandidates.length > 0 ? (
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => {
                              setSelectedPosition(position);
                              setSelectedCandidates(position.approvedCandidates || []);
                              setViewMode('approved-list');
                            }}
                            className="flex items-center gap-2 h-[32px] px-[16px] rounded-[8px] border border-[#e5e7eb] bg-white hover:bg-[#f9fafb] transition-colors"
                          >
                            <Eye size={16} className="text-[#6366f1]" />
                            <span className="font-['Arimo',sans-serif] text-[13px] text-[#111827]">
                              View {position.approvedCandidates.length > 1 ? `Candidates (${position.approvedCandidates.length})` : 'Candidate'}
                            </span>
                          </button>
                        </div>
                      ) : (
                        <span className="font-['Arimo',sans-serif] text-[13px] text-[#9ca3af]">
                          N/A
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Closure Status Report Modal */}
      {selectedReport && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6">
          <div className="bg-white rounded-3xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 px-8 py-6 rounded-t-3xl">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-gray-900 mb-1">Closure Status Report</h2>
                  <p className="text-gray-500 text-sm">
                    {selectedReport.jobTitle} • {selectedReport.department} Department
                  </p>
                </div>
                <button
                  onClick={() => setSelectedReport(null)}
                  className="w-10 h-10 rounded-xl flex items-center justify-center hover:bg-gray-100 transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>
            </div>

            <div className="px-8 py-6">
              {/* Status Badge */}
              <div className="mb-6 flex items-center gap-4">
                <span
                  className={`inline-block px-4 py-2 rounded-full font-['Arimo',sans-serif] text-[14px] ${getStatusBadgeColor(
                    selectedReport.closureStatus
                  )}`}
                >
                  {selectedReport.closureStatus}
                </span>
                <span className="text-gray-500 text-sm">
                  Closed on {new Date(selectedReport.closedDate).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
              </div>

              {/* Report Content */}
              <div className="mb-6">
                <h3 className="text-gray-900 mb-3">Report Summary</h3>
                <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                  <p className="font-['Arimo',sans-serif] text-[14px] text-[#374151] leading-relaxed whitespace-pre-wrap">
                    {selectedReport.closureStatusReport}
                  </p>
                </div>
              </div>

              {/* Position Details */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="p-4 bg-gray-50 rounded-xl">
                  <div className="text-gray-500 text-sm mb-1">Assigned HR</div>
                  <div className="text-gray-900">{selectedReport.assignedHR}</div>
                </div>
                <div className="p-4 bg-gray-50 rounded-xl">
                  <div className="text-gray-500 text-sm mb-1">Technical Recruiter</div>
                  <div className="text-gray-900">{selectedReport.assignedTechnicalRecruiter}</div>
                </div>
                <div className="p-4 bg-gray-50 rounded-xl">
                  <div className="text-gray-500 text-sm mb-1">Total Candidates</div>
                  <div className="text-gray-900">{selectedReport.candidatesCount}</div>
                </div>
                <div className="p-4 bg-gray-50 rounded-xl">
                  <div className="text-gray-500 text-sm mb-1">Groups Created</div>
                  <div className="text-gray-900">{selectedReport.groupsCreated}</div>
                </div>
              </div>

              {/* Security Issues */}
              {selectedReport.securityIssues > 0 && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-xl mb-6">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center">
                      <span className="text-white text-xs font-bold">{selectedReport.securityIssues}</span>
                    </div>
                    <h4 className="text-red-900 font-medium">Security/Integrity Issues Detected</h4>
                  </div>
                  <p className="text-red-700 text-sm">
                    {selectedReport.securityIssues} security or integrity {selectedReport.securityIssues === 1 ? 'issue was' : 'issues were'} identified during the recruitment process.
                  </p>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="sticky bottom-0 bg-white border-t border-gray-200 px-8 py-4 rounded-b-3xl">
              <div className="flex items-center justify-end">
                <Button
                  variant="outline"
                  className="rounded-full px-6"
                  onClick={() => setSelectedReport(null)}
                >
                  Close
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}