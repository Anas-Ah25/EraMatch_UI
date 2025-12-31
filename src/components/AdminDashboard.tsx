import { useState } from 'react';
import { Eye, ArrowUpDown, X, TrendingUp, TrendingDown, AlertTriangle, ArrowLeft } from 'lucide-react';
import { Button } from './ui/button';

interface JobPosition {
  id: number;
  jobTitle: string;
  department: string;
  assignedHR: string;
  assignedTechnicalRecruiter: string;
  candidatesCount: number;
  status: 'Open' | 'Interview' | 'Closed' | 'On Hold';
}

interface Project {
  id: number;
  projectName: string;
  positionsCount: number;
  applicantsCount: number;
  subGroupsCount: number;
  openDate: string;
}

interface PositionGroup {
  id: number;
  groupName: string;
  positionTitle: string;
  candidatesCount: number;
  status: 'Active' | 'Processing' | 'Completed' | 'On Hold';
  createdDate: string;
}

interface AdminDashboardProps {
  onSignOut: () => void;
}

type ViewMode = 'dashboard' | 'projects' | 'positions' | 'groups' | 'insights';

export function AdminDashboard({ onSignOut }: AdminDashboardProps) {
  const [sortField, setSortField] = useState<string>('');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [viewMode, setViewMode] = useState<ViewMode>('dashboard');
  const [selectedPosition, setSelectedPosition] = useState<JobPosition | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedPositionForGroups, setSelectedPositionForGroups] = useState<JobPosition | null>(null);
  const [selectedGroup, setSelectedGroup] = useState<PositionGroup | null>(null);

  const jobPositions: JobPosition[] = [
    {
      id: 1,
      jobTitle: 'Senior React Developer',
      department: 'Engineering',
      assignedHR: 'Sarah Johnson',
      assignedTechnicalRecruiter: 'Michael Chen',
      candidatesCount: 45,
      status: 'Open'
    },
    {
      id: 2,
      jobTitle: 'Product Manager',
      department: 'Product',
      assignedHR: 'Sarah Johnson',
      assignedTechnicalRecruiter: 'Emily Rodriguez',
      candidatesCount: 32,
      status: 'Interview'
    },
    {
      id: 3,
      jobTitle: 'DevOps Engineer',
      department: 'Engineering',
      assignedHR: 'David Kim',
      assignedTechnicalRecruiter: 'Michael Chen',
      candidatesCount: 28,
      status: 'Open'
    },
    {
      id: 4,
      jobTitle: 'UX Designer',
      department: 'Design',
      assignedHR: 'Sarah Johnson',
      assignedTechnicalRecruiter: 'Emily Rodriguez',
      candidatesCount: 19,
      status: 'Interview'
    },
    {
      id: 5,
      jobTitle: 'Data Scientist',
      department: 'Engineering',
      assignedHR: 'David Kim',
      assignedTechnicalRecruiter: 'Michael Chen',
      candidatesCount: 52,
      status: 'Open'
    },
    {
      id: 6,
      jobTitle: 'Marketing Manager',
      department: 'Marketing',
      assignedHR: 'Jessica Martinez',
      assignedTechnicalRecruiter: 'Emily Rodriguez',
      candidatesCount: 0,
      status: 'Closed'
    },
    {
      id: 7,
      jobTitle: 'Backend Engineer',
      department: 'Engineering',
      assignedHR: 'David Kim',
      assignedTechnicalRecruiter: 'Michael Chen',
      candidatesCount: 38,
      status: 'On Hold'
    }
  ];

  // Mock Projects Data
  const projects: Project[] = [
    {
      id: 1,
      projectName: 'Q1 Engineering Expansion',
      positionsCount: 3,
      applicantsCount: 111,
      subGroupsCount: 8,
      openDate: '2025-01-05'
    },
    {
      id: 2,
      projectName: 'Product Team Growth',
      positionsCount: 2,
      applicantsCount: 51,
      subGroupsCount: 4,
      openDate: '2025-01-12'
    },
    {
      id: 3,
      projectName: 'Design & UX Hiring',
      positionsCount: 1,
      applicantsCount: 19,
      subGroupsCount: 2,
      openDate: '2025-01-20'
    },
    {
      id: 4,
      projectName: 'Marketing Initiative',
      positionsCount: 1,
      applicantsCount: 0,
      subGroupsCount: 0,
      openDate: '2024-12-10'
    }
  ];

  // Mock Position Groups Data
  const positionGroups: PositionGroup[] = [
    {
      id: 1,
      groupName: 'Senior React Developers Q1 2025',
      positionTitle: 'Senior React Developer',
      candidatesCount: 15,
      status: 'Active',
      createdDate: '2025-01-15'
    },
    {
      id: 2,
      groupName: 'React Mid-Level Candidates',
      positionTitle: 'Senior React Developer',
      candidatesCount: 12,
      status: 'Processing',
      createdDate: '2025-01-18'
    },
    {
      id: 3,
      groupName: 'High Performers - Final Round',
      positionTitle: 'Senior React Developer',
      candidatesCount: 8,
      status: 'Active',
      createdDate: '2025-01-22'
    },
    {
      id: 4,
      groupName: 'Alternative Candidates Pool',
      positionTitle: 'Senior React Developer',
      candidatesCount: 10,
      status: 'On Hold',
      createdDate: '2025-01-25'
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

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'Open':
        return 'bg-[#10b981] text-white';
      case 'Interview':
        return 'bg-[#6366f1] text-white';
      case 'Closed':
        return 'bg-[#6b7280] text-white';
      case 'On Hold':
        return 'bg-[#f59e0b] text-white';
      default:
        return 'bg-[#e5e7eb] text-[#6b7280]';
    }
  };

  // Calculate stats
  const openPositions = jobPositions.filter(p => p.status === 'Open').length;
  const interviewStagePositions = jobPositions.filter(p => p.status === 'Interview').length;
  const closedPositions = jobPositions.filter(p => p.status === 'Closed').length;
  const avgTimeToFill = 42; // Mock value in days

  // Pipeline stats for visualization
  const pipelineData = [
    { stage: 'Applied', count: 214, color: '#6366f1' },
    { stage: 'Assessment', count: 156, color: '#8b5cf6' },
    { stage: 'Interview', count: 89, color: '#a855f7' },
    { stage: 'Offer', count: 34, color: '#c084fc' },
    { stage: 'Hired', count: 18, color: '#10b981' }
  ];

  const maxCount = Math.max(...pipelineData.map(d => d.count));

  // If viewing insights, show full page insights view
  if (viewMode === 'insights' && selectedPosition) {
    return (
      <div className="px-12 py-8">
        {/* Header with Back Button */}
        <div className="mb-8">
          <button
            onClick={() => setViewMode('groups')}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors mb-4"
          >
            <ArrowLeft size={20} />
            <span className="font-['Arimo',sans-serif] text-[14px]">Back to Groups</span>
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
            onClick={() => setViewMode('dashboard')}
          >
            Back to Dashboard
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

  return (
    <div className="px-12 py-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-6 mb-12">
        <div className="bg-white rounded-3xl px-8 py-9 shadow-sm">
          <div className="flex items-center gap-3">
            <span className="text-5xl text-gray-900">{openPositions}</span>
            <div className="flex-1">
              <div className="text-gray-900 mb-1">Total Open Positions</div>
              <div className="text-gray-400 text-sm">actively recruiting</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl px-8 py-9 shadow-sm">
          <div className="flex items-center gap-3">
            <span className="text-5xl text-gray-900">{interviewStagePositions}</span>
            <div className="flex-1">
              <div className="text-gray-900 mb-1">Positions in Interview Stage</div>
              <div className="text-gray-400 text-sm">active interviews</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl px-8 py-9 shadow-sm">
          <div className="flex items-center gap-3">
            <span className="text-5xl text-gray-900">{closedPositions}</span>
            <div className="flex-1">
              <div className="text-gray-900 mb-1">Closed Positions</div>
              <div className="text-gray-400 text-sm">this quarter</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl px-8 py-9 shadow-sm">
          <div className="flex items-center gap-3">
            <span className="text-5xl text-gray-900">{avgTimeToFill}</span>
            <div className="flex-1">
              <div className="text-gray-900 mb-1">Average Time to Fill</div>
              <div className="text-gray-400 text-sm">days</div>
            </div>
          </div>
        </div>
      </div>

      {/* Pipeline Visualization Section */}
      <div className="bg-white rounded-3xl p-8 shadow-sm mb-8">
        <div className="mb-6">
          <h3 className="text-gray-900 mb-2">Recruitment Pipeline</h3>
          <p className="text-gray-500 text-sm">Overview of candidates across all positions</p>
        </div>

        {/* Pipeline Progress Bars */}
        <div className="space-y-6">
          {pipelineData.map((stage, index) => (
            <div key={stage.stage} className="flex items-center gap-4">
              <div className="w-32 flex-shrink-0">
                <span className="font-['Arimo',sans-serif] text-[14px] text-[#374151]">
                  {stage.stage}
                </span>
              </div>
              <div className="flex-1 relative">
                <div className="h-10 bg-[#f3f4f6] rounded-lg overflow-hidden">
                  <div
                    className="h-full rounded-lg transition-all duration-500 flex items-center justify-end pr-3"
                    style={{
                      width: `${(stage.count / maxCount) * 100}%`,
                      backgroundColor: stage.color
                    }}
                  >
                    <span className="font-['Arimo',sans-serif] text-[14px] text-white">
                      {stage.count}
                    </span>
                  </div>
                </div>
              </div>
              {index < pipelineData.length - 1 && (
                <div className="text-[#9ca3af] font-['Arimo',sans-serif] text-[14px]">
                  →
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Show different tables based on view mode */}
      {viewMode === 'dashboard' && (
        /* Opened Projects Table */
        <div className="bg-white rounded-3xl p-6 shadow-sm">
          <div className="mb-6">
            <h3 className="text-gray-900 mb-2">Opened Projects</h3>
            <p className="text-gray-500 text-sm">All active recruitment projects across the organization</p>
          </div>

          <div className="bg-white rounded-[12px] border border-[#e5e7eb] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#f9fafb] border-b border-[#e5e7eb]">
                  <tr>
                    <th className="text-left p-4">
                      <button
                        onClick={() => handleSort('projectName')}
                        className="flex items-center gap-1 font-['Arimo',sans-serif] text-[13px] text-[#6b7280] hover:text-[#111827]"
                      >
                        Project Name
                        <ArrowUpDown size={14} />
                      </button>
                    </th>
                    <th className="text-left p-4">
                      <button
                        onClick={() => handleSort('positionsCount')}
                        className="flex items-center gap-1 font-['Arimo',sans-serif] text-[13px] text-[#6b7280] hover:text-[#111827]"
                      >
                        Number of Positions
                        <ArrowUpDown size={14} />
                      </button>
                    </th>
                    <th className="text-left p-4">
                      <span className="font-['Arimo',sans-serif] text-[13px] text-[#6b7280]">
                        Number of Applicants
                      </span>
                    </th>
                    <th className="text-left p-4">
                      <span className="font-['Arimo',sans-serif] text-[13px] text-[#6b7280]">
                        Number of Sub Groups
                      </span>
                    </th>
                    <th className="text-left p-4">
                      <span className="font-['Arimo',sans-serif] text-[13px] text-[#6b7280]">
                        Project Open Date
                      </span>
                    </th>
                    <th className="text-left p-4">
                      <span className="font-['Arimo',sans-serif] text-[13px] text-[#6b7280]">
                        Actions
                      </span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {projects.map((project, index) => (
                    <tr
                      key={project.id}
                      className={`border-b border-[#e5e7eb] hover:bg-[#f9fafb] transition-colors cursor-pointer ${
                        index === projects.length - 1 ? 'border-b-0' : ''
                      }`}
                      onClick={() => {
                        setSelectedProject(project);
                        setViewMode('positions');
                      }}
                    >
                      <td className="p-4">
                        <span className="font-['Arimo',sans-serif] text-[14px] text-[#111827]">
                          {project.projectName}
                        </span>
                      </td>
                      <td className="p-4">
                        <span className="font-['Arimo',sans-serif] text-[14px] text-[#6b7280]">
                          {project.positionsCount}
                        </span>
                      </td>
                      <td className="p-4">
                        <span className="font-['Arimo',sans-serif] text-[14px] text-[#111827]">
                          {project.applicantsCount}
                        </span>
                      </td>
                      <td className="p-4">
                        <span className="font-['Arimo',sans-serif] text-[14px] text-[#6b7280]">
                          {project.subGroupsCount}
                        </span>
                      </td>
                      <td className="p-4">
                        <span className="font-['Arimo',sans-serif] text-[14px] text-[#6b7280]">
                          {new Date(project.openDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                        </span>
                      </td>
                      <td className="p-4">
                        <button
                          className="flex items-center gap-2 h-[32px] px-[16px] rounded-[8px] border border-[#e5e7eb] bg-white hover:bg-[#f9fafb] transition-colors"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedProject(project);
                            setViewMode('positions');
                          }}
                        >
                          <Eye size={16} className="text-[#6366f1]" />
                          <span className="font-['Arimo',sans-serif] text-[13px] text-[#111827]">
                            View Positions
                          </span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {viewMode === 'positions' && selectedProject && (
        /* Job Positions Table (without Department column) */
        <div className="bg-white rounded-3xl p-6 shadow-sm">
          <div className="mb-6 flex items-center gap-3">
            <button
              onClick={() => setViewMode('dashboard')}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft size={20} />
            </button>
            <div>
              <h3 className="text-gray-900 mb-1">Project Positions: {selectedProject.projectName}</h3>
              <p className="text-gray-500 text-sm">Positions within this project</p>
            </div>
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
                        Assigned HR
                      </span>
                    </th>
                    <th className="text-left p-4">
                      <span className="font-['Arimo',sans-serif] text-[13px] text-[#6b7280]">
                        Assigned Technical Recruiter
                      </span>
                    </th>
                    <th className="text-left p-4">
                      <button
                        onClick={() => handleSort('candidatesCount')}
                        className="flex items-center gap-1 font-['Arimo',sans-serif] text-[13px] text-[#6b7280] hover:text-[#111827]"
                      >
                        Candidates Count
                        <ArrowUpDown size={14} />
                      </button>
                    </th>
                    <th className="text-left p-4">
                      <span className="font-['Arimo',sans-serif] text-[13px] text-[#6b7280]">
                        Status
                      </span>
                    </th>
                    <th className="text-left p-4">
                      <span className="font-['Arimo',sans-serif] text-[13px] text-[#6b7280]">
                        Actions
                      </span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {jobPositions.slice(0, selectedProject.positionsCount).map((position, index) => (
                    <tr
                      key={position.id}
                      className={`border-b border-[#e5e7eb] hover:bg-[#f9fafb] transition-colors cursor-pointer ${
                        index === selectedProject.positionsCount - 1 ? 'border-b-0' : ''
                      }`}
                      onClick={() => {
                        setSelectedPositionForGroups(position);
                        setViewMode('groups');
                      }}
                    >
                      <td className="p-4">
                        <span className="font-['Arimo',sans-serif] text-[14px] text-[#111827]">
                          {position.jobTitle}
                        </span>
                      </td>
                      <td className="p-4">
                        <span className="font-['Arimo',sans-serif] text-[14px] text-[#6b7280]">
                          {position.assignedHR}
                        </span>
                      </td>
                      <td className="p-4">
                        <span className="font-['Arimo',sans-serif] text-[14px] text-[#6b7280]">
                          {position.assignedTechnicalRecruiter}
                        </span>
                      </td>
                      <td className="p-4">
                        <span className="font-['Arimo',sans-serif] text-[14px] text-[#111827]">
                          {position.candidatesCount}
                        </span>
                      </td>
                      <td className="p-4">
                        <span
                          className={`inline-block px-3 py-1 rounded-full font-['Arimo',sans-serif] text-[12px] ${getStatusBadgeColor(
                            position.status
                          )}`}
                        >
                          {position.status}
                        </span>
                      </td>
                      <td className="p-4">
                        <button
                          className="flex items-center gap-2 h-[32px] px-[16px] rounded-[8px] border border-[#e5e7eb] bg-white hover:bg-[#f9fafb] transition-colors"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedPositionForGroups(position);
                            setViewMode('groups');
                          }}
                        >
                          <Eye size={16} className="text-[#6366f1]" />
                          <span className="font-['Arimo',sans-serif] text-[13px] text-[#111827]">
                            View Groups
                          </span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {viewMode === 'groups' && selectedPositionForGroups && (
        /* Position Groups Table */
        <div className="bg-white rounded-3xl p-6 shadow-sm">
          <div className="mb-6 flex items-center gap-3">
            <button
              onClick={() => setViewMode('positions')}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft size={20} />
            </button>
            <div>
              <h3 className="text-gray-900 mb-1">Position Groups: {selectedPositionForGroups.jobTitle}</h3>
              <p className="text-gray-500 text-sm">Candidate groups for this position</p>
            </div>
          </div>

          <div className="bg-white rounded-[12px] border border-[#e5e7eb] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#f9fafb] border-b border-[#e5e7eb]">
                  <tr>
                    <th className="text-left p-4">
                      <button
                        onClick={() => handleSort('groupName')}
                        className="flex items-center gap-1 font-['Arimo',sans-serif] text-[13px] text-[#6b7280] hover:text-[#111827]"
                      >
                        Group Name
                        <ArrowUpDown size={14} />
                      </button>
                    </th>
                    <th className="text-left p-4">
                      <span className="font-['Arimo',sans-serif] text-[13px] text-[#6b7280]">
                        Position Title
                      </span>
                    </th>
                    <th className="text-left p-4">
                      <button
                        onClick={() => handleSort('candidatesCount')}
                        className="flex items-center gap-1 font-['Arimo',sans-serif] text-[13px] text-[#6b7280] hover:text-[#111827]"
                      >
                        Candidates Count
                        <ArrowUpDown size={14} />
                      </button>
                    </th>
                    <th className="text-left p-4">
                      <span className="font-['Arimo',sans-serif] text-[13px] text-[#6b7280]">
                        Status
                      </span>
                    </th>
                    <th className="text-left p-4">
                      <span className="font-['Arimo',sans-serif] text-[13px] text-[#6b7280]">
                        Created Date
                      </span>
                    </th>
                    <th className="text-left p-4">
                      <span className="font-['Arimo',sans-serif] text-[13px] text-[#6b7280]">
                        Actions
                      </span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {positionGroups.map((group, index) => (
                    <tr
                      key={group.id}
                      className={`border-b border-[#e5e7eb] hover:bg-[#f9fafb] transition-colors ${
                        index === positionGroups.length - 1 ? 'border-b-0' : ''
                      }`}
                    >
                      <td className="p-4">
                        <span className="font-['Arimo',sans-serif] text-[14px] text-[#111827]">
                          {group.groupName}
                        </span>
                      </td>
                      <td className="p-4">
                        <span className="font-['Arimo',sans-serif] text-[14px] text-[#6b7280]">
                          {group.positionTitle}
                        </span>
                      </td>
                      <td className="p-4">
                        <span className="font-['Arimo',sans-serif] text-[14px] text-[#111827]">
                          {group.candidatesCount}
                        </span>
                      </td>
                      <td className="p-4">
                        <span
                          className={`inline-block px-3 py-1 rounded-full font-['Arimo',sans-serif] text-[12px] ${getStatusBadgeColor(
                            group.status
                          )}`}
                        >
                          {group.status}
                        </span>
                      </td>
                      <td className="p-4">
                        <span className="font-['Arimo',sans-serif] text-[14px] text-[#6b7280]">
                          {new Date(group.createdDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                        </span>
                      </td>
                      <td className="p-4">
                        <button
                          className="flex items-center gap-2 h-[32px] px-[16px] rounded-[8px] border border-[#e5e7eb] bg-white hover:bg-[#f9fafb] transition-colors"
                          onClick={() => {
                            setSelectedPosition(selectedPositionForGroups);
                            setSelectedGroup(group);
                            setViewMode('insights');
                          }}
                        >
                          <Eye size={16} className="text-[#6366f1]" />
                          <span className="font-['Arimo',sans-serif] text-[13px] text-[#111827]">
                            View Insights
                          </span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}