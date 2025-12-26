import { useState } from 'react';
import { ChevronDown, X, TrendingUp, TrendingDown, AlertTriangle } from 'lucide-react';
import { Card } from './ui/card';
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

interface AdminRecruiterDelegationProps {
  onSignOut: () => void;
}

export function AdminRecruiterDelegation({ onSignOut }: AdminRecruiterDelegationProps) {
  const [selectedPosition, setSelectedPosition] = useState<JobPosition | null>(null);
  const [showHRDropdown, setShowHRDropdown] = useState(false);
  const [showTechDropdown, setShowTechDropdown] = useState(false);
  const [showInsightsPanel, setShowInsightsPanel] = useState(false);

  // Mock data - HR Recruiters
  const hrRecruiters = [
    'Sarah Johnson',
    'David Kim',
    'Jessica Martinez',
    'Amanda Lee'
  ];

  // Mock data - Technical Recruiters
  const technicalRecruiters = [
    'Michael Chen',
    'Emily Rodriguez',
    'Robert Martinez',
    'Jane Smith'
  ];

  // Mock data - Job Positions
  const [jobPositions, setJobPositions] = useState<JobPosition[]>([
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
  ]);

  const handleAssignHR = (positionId: number, hrName: string) => {
    setJobPositions(prev =>
      prev.map(pos =>
        pos.id === positionId ? { ...pos, assignedHR: hrName } : pos
      )
    );
    if (selectedPosition && selectedPosition.id === positionId) {
      setSelectedPosition({ ...selectedPosition, assignedHR: hrName });
    }
    setShowHRDropdown(false);
  };

  const handleAssignTechnical = (positionId: number, techName: string) => {
    setJobPositions(prev =>
      prev.map(pos =>
        pos.id === positionId ? { ...pos, assignedTechnicalRecruiter: techName } : pos
      )
    );
    if (selectedPosition && selectedPosition.id === positionId) {
      setSelectedPosition({ ...selectedPosition, assignedTechnicalRecruiter: techName });
    }
    setShowTechDropdown(false);
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'Open':
        return '#10b981';
      case 'Interview':
        return '#6366f1';
      case 'Closed':
        return '#6b7280';
      case 'On Hold':
        return '#f59e0b';
      default:
        return '#e5e7eb';
    }
  };

  return (
    <div className="px-12 py-8">
      <div className="mb-8">
        <h2 className="text-gray-900 mb-2">Recruiter Delegation</h2>
        <p className="text-gray-500 text-sm">
          Assign and manage HR and Technical Recruiters for each job position
        </p>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* Left Section - Job Positions List */}
        <div>
          <Card className="p-6 rounded-3xl shadow-sm">
            <h3 className="text-gray-900 mb-4">Job Positions</h3>
            <p className="text-gray-500 text-sm mb-6">
              Select a position to view and manage recruiter assignments
            </p>

            <div className="space-y-3">
              {jobPositions.map((position) => (
                <div
                  key={position.id}
                  onClick={() => setSelectedPosition(position)}
                  className={`bg-[#f7fafe] h-[88px] rounded-[14px] w-full cursor-pointer transition-all ${
                    selectedPosition?.id === position.id
                      ? 'ring-2 ring-[#6366f1] shadow-md'
                      : 'hover:shadow-md'
                  }`}
                >
                  <div className="flex flex-row items-center size-full">
                    <div className="box-border content-stretch flex h-[88px] items-center justify-between px-[24px] py-0 w-full gap-[16px]">
                      {/* Title and Department */}
                      <div className="flex-1 min-w-0">
                        <p className="font-['Arimo',sans-serif] leading-[24px] text-[16px] text-black truncate mb-1">
                          {position.jobTitle}
                        </p>
                        <p className="font-['Arimo',sans-serif] text-[14px] text-[#9f9f9f]">
                          {position.department}
                        </p>
                      </div>

                      {/* Status Badge and Candidates Count */}
                      <div className="flex items-center gap-[16px] shrink-0">
                        <div
                          className="h-[24px] rounded-full px-[12px] flex items-center justify-center"
                          style={{ backgroundColor: getStatusBadgeColor(position.status) }}
                        >
                          <p className="font-['Arimo',sans-serif] text-[12px] text-white whitespace-nowrap">
                            {position.status}
                          </p>
                        </div>
                        <div className="h-[24px] min-w-[80px]">
                          <p className="font-['Arimo',sans-serif] leading-[24px] text-[#aaaaaa] text-[14px] whitespace-nowrap">
                            {position.candidatesCount} candidates
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Right Section - Recruiter Assignment */}
        <div>
          {selectedPosition ? (
            <Card className="p-6 rounded-3xl shadow-sm">
              <h3 className="text-gray-900 mb-2">Assigned Recruiters</h3>
              <p className="text-gray-500 text-sm mb-6">
                Manage HR and Technical Recruiter assignments for {selectedPosition.jobTitle}
              </p>

              {/* Position Info Card */}
              <div className="mb-6 p-4 rounded-lg" style={{ backgroundColor: '#F9FAFB' }}>
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <p className="text-gray-900">{selectedPosition.jobTitle}</p>
                    <p className="text-gray-500 text-sm">{selectedPosition.department} Department</p>
                  </div>
                  <div
                    className="h-[28px] rounded-full px-[14px] flex items-center justify-center"
                    style={{ backgroundColor: getStatusBadgeColor(selectedPosition.status) }}
                  >
                    <p className="font-['Arimo',sans-serif] text-[13px] text-white">
                      {selectedPosition.status}
                    </p>
                  </div>
                </div>
                <p className="text-gray-600 text-sm">
                  {selectedPosition.candidatesCount} candidates in pipeline
                </p>
              </div>

              {/* HR Recruiter Assignment */}
              <div className="mb-6">
                <label className="block text-gray-900 mb-3">HR Recruiter</label>
                <div className="flex items-center gap-3">
                  <div className="flex-1 p-4 rounded-lg border border-gray-200 bg-white">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center text-white"
                        style={{ backgroundColor: '#6366F1' }}
                      >
                        {selectedPosition.assignedHR
                          .split(' ')
                          .map((n) => n[0])
                          .join('')}
                      </div>
                      <div className="flex-1">
                        <p className="text-gray-900 text-sm">
                          {selectedPosition.assignedHR}
                        </p>
                        <p className="text-gray-500 text-xs">HR Recruiter</p>
                      </div>
                    </div>
                  </div>
                  <div className="relative">
                    <Button
                      variant="outline"
                      className="rounded-lg gap-2"
                      onClick={() => {
                        setShowHRDropdown(!showHRDropdown);
                        setShowTechDropdown(false);
                      }}
                    >
                      Reassign
                      <ChevronDown size={16} />
                    </Button>
                    {showHRDropdown && (
                      <div className="absolute right-0 top-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10 min-w-[200px]">
                        {hrRecruiters.map((recruiter) => (
                          <button
                            key={recruiter}
                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 first:rounded-t-lg last:rounded-b-lg"
                            onClick={() =>
                              handleAssignHR(selectedPosition.id, recruiter)
                            }
                          >
                            {recruiter}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Technical Recruiter Assignment */}
              <div className="mb-6">
                <label className="block text-gray-900 mb-3">
                  Technical Recruiter
                </label>
                <div className="flex items-center gap-3">
                  <div className="flex-1 p-4 rounded-lg border border-gray-200 bg-white">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center text-white"
                        style={{ backgroundColor: '#10b981' }}
                      >
                        {selectedPosition.assignedTechnicalRecruiter
                          .split(' ')
                          .map((n) => n[0])
                          .join('')}
                      </div>
                      <div className="flex-1">
                        <p className="text-gray-900 text-sm">
                          {selectedPosition.assignedTechnicalRecruiter}
                        </p>
                        <p className="text-gray-500 text-xs">
                          Technical Recruiter
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="relative">
                    <Button
                      variant="outline"
                      className="rounded-lg gap-2"
                      onClick={() => {
                        setShowTechDropdown(!showTechDropdown);
                        setShowHRDropdown(false);
                      }}
                    >
                      Reassign
                      <ChevronDown size={16} />
                    </Button>
                    {showTechDropdown && (
                      <div className="absolute right-0 top-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10 min-w-[200px]">
                        {technicalRecruiters.map((recruiter) => (
                          <button
                            key={recruiter}
                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 first:rounded-t-lg last:rounded-b-lg"
                            onClick={() =>
                              handleAssignTechnical(
                                selectedPosition.id,
                                recruiter
                              )
                            }
                          >
                            {recruiter}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Assignment History */}
              <div className="pt-6 border-t border-gray-200">
                <h4 className="text-gray-900 mb-3">Recent Assignment Changes</h4>
                <div className="space-y-3">
                  <div className="flex items-start gap-3 text-sm">
                    <div className="w-2 h-2 rounded-full bg-indigo-600 mt-1.5"></div>
                    <div className="flex-1">
                      <p className="text-gray-900">
                        HR Recruiter assigned to{' '}
                        <span className="text-gray-900">
                          {selectedPosition.assignedHR}
                        </span>
                      </p>
                      <p className="text-gray-500 text-xs mt-1">2 days ago</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 text-sm">
                    <div className="w-2 h-2 rounded-full bg-emerald-600 mt-1.5"></div>
                    <div className="flex-1">
                      <p className="text-gray-900">
                        Technical Recruiter assigned to{' '}
                        <span className="text-gray-900">
                          {selectedPosition.assignedTechnicalRecruiter}
                        </span>
                      </p>
                      <p className="text-gray-500 text-xs mt-1">3 days ago</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 flex items-center gap-3">
                <Button
                  variant="outline"
                  className="flex-1 rounded-full"
                  onClick={() => setShowInsightsPanel(true)}
                >
                  View Insights
                </Button>
                <Button
                  className="flex-1 rounded-full text-white"
                  style={{ backgroundColor: '#6366F1' }}
                  onClick={() => {
                    console.log('Notifying recruiters for position:', selectedPosition);
                  }}
                >
                  Notify Recruiters
                </Button>
              </div>
            </Card>
          ) : (
            <Card className="p-6 rounded-3xl shadow-sm">
              <div className="flex flex-col items-center justify-center py-16">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
                  style={{ backgroundColor: '#F3F4F6' }}
                >
                  <svg
                    className="w-8 h-8 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-gray-900 mb-2">No Position Selected</h3>
                <p className="text-gray-500 text-sm text-center max-w-sm">
                  Select a job position from the list to view and manage recruiter
                  assignments
                </p>
              </div>
            </Card>
          )}
        </div>
      </div>

      {/* Insights Panel Modal */}
      {showInsightsPanel && selectedPosition && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6">
          <div className="bg-white rounded-3xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 px-8 py-6 rounded-t-3xl">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-gray-900 mb-1">Position Insights</h2>
                  <p className="text-gray-500 text-sm">
                    {selectedPosition.jobTitle} • {selectedPosition.department} Department
                  </p>
                </div>
                <button
                  onClick={() => setShowInsightsPanel(false)}
                  className="w-10 h-10 rounded-xl flex items-center justify-center hover:bg-gray-100 transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>
            </div>

            <div className="px-8 py-6">
              {/* Overview Stats Grid */}
              <div className="grid grid-cols-4 gap-4 mb-8">
                <div className="bg-white rounded-2xl p-5 border border-gray-200">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-gray-500 text-sm">Total Candidates</span>
                    <TrendingUp className="w-4 h-4 text-emerald-600" />
                  </div>
                  <div className="text-3xl text-gray-900 mb-1">{selectedPosition.candidatesCount}</div>
                  <div className="text-xs text-emerald-600">+12% from last week</div>
                </div>

                <div className="bg-white rounded-2xl p-5 border border-gray-200">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-gray-500 text-sm">Avg. Assessment</span>
                  </div>
                  <div className="text-3xl text-gray-900 mb-1">87%</div>
                  <div className="text-xs text-gray-500">Above threshold</div>
                </div>

                <div className="bg-white rounded-2xl p-5 border border-gray-200">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-gray-500 text-sm">Interview Rate</span>
                  </div>
                  <div className="text-3xl text-gray-900 mb-1">64%</div>
                  <div className="text-xs text-indigo-600">Strong pipeline</div>
                </div>

                <div className="bg-white rounded-2xl p-5 border border-gray-200">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-gray-500 text-sm">Time to Hire</span>
                    <TrendingDown className="w-4 h-4 text-red-600" />
                  </div>
                  <div className="text-3xl text-gray-900 mb-1">28d</div>
                  <div className="text-xs text-red-600">+3 days slower</div>
                </div>
              </div>

              {/* Candidate Pipeline Overview */}
              <div className="bg-white rounded-2xl p-6 border border-gray-200 mb-6">
                <div className="mb-6">
                  <h3 className="text-gray-900 mb-1">Candidate Pipeline</h3>
                  <p className="text-gray-500 text-sm">Hiring funnel progression and stage drop-offs</p>
                </div>

                <div className="space-y-5">
                  {[
                    { stage: 'Applied', count: selectedPosition.candidatesCount, color: '#6366f1', percentage: 100 },
                    { stage: 'Assessment', count: Math.floor(selectedPosition.candidatesCount * 0.78), color: '#8b5cf6', percentage: 78 },
                    { stage: 'Interview', count: Math.floor(selectedPosition.candidatesCount * 0.52), color: '#a855f7', percentage: 52 },
                    { stage: 'Offer', count: Math.floor(selectedPosition.candidatesCount * 0.24), color: '#c084fc', percentage: 24 },
                    { stage: 'Hired', count: Math.floor(selectedPosition.candidatesCount * 0.16), color: '#10b981', percentage: 16 }
                  ].map((stage, index, arr) => (
                    <div key={stage.stage}>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <span className="font-['Arimo',sans-serif] text-[14px] text-[#374151] min-w-[100px]">
                            {stage.stage}
                          </span>
                          <span className="font-['Arimo',sans-serif] text-[14px] text-[#6b7280]">
                            {stage.count} candidates
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="font-['Arimo',sans-serif] text-[13px] text-[#6b7280]">
                            {stage.percentage}%
                          </span>
                          {index > 0 && (
                            <span className="font-['Arimo',sans-serif] text-[12px] text-[#9ca3af]">
                              -{arr[index - 1].percentage - stage.percentage}% drop
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="h-12 bg-[#f3f4f6] rounded-lg overflow-hidden">
                        <div
                          className="h-full rounded-lg transition-all duration-500 flex items-center justify-between px-4"
                          style={{
                            width: `${stage.percentage}%`,
                            backgroundColor: stage.color
                          }}
                        >
                          <span className="font-['Arimo',sans-serif] text-[13px] text-white font-medium">
                            {stage.stage}
                          </span>
                          <span className="font-['Arimo',sans-serif] text-[14px] text-white font-semibold">
                            {stage.count}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Assessment & Interview Analytics Grid */}
              <div className="grid grid-cols-2 gap-6 mb-6">
                {/* Assessment Performance */}
                <div className="bg-white rounded-2xl p-6 border border-gray-200">
                  <div className="mb-6">
                    <h3 className="text-gray-900 mb-1">Assessment Performance</h3>
                    <p className="text-gray-500 text-sm">Score distribution and pass rates</p>
                  </div>

                  {/* Score Stats */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-[#f9fafb] rounded-xl p-4">
                      <div className="text-sm text-gray-500 mb-1">Average Score</div>
                      <div className="text-2xl text-gray-900">87.4%</div>
                    </div>
                    <div className="bg-[#f9fafb] rounded-xl p-4">
                      <div className="text-sm text-gray-500 mb-1">Pass Rate</div>
                      <div className="text-2xl text-emerald-600">78%</div>
                    </div>
                  </div>

                  {/* Pass/Fail Distribution */}
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-700">Passed</span>
                        <span className="text-sm text-gray-900 font-medium">35 candidates (78%)</span>
                      </div>
                      <div className="h-8 bg-[#f3f4f6] rounded-lg overflow-hidden">
                        <div
                          className="h-full bg-emerald-500 rounded-lg flex items-center justify-end pr-3"
                          style={{ width: '78%' }}
                        >
                          <span className="text-xs text-white font-medium">78%</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-700">Failed</span>
                        <span className="text-sm text-gray-900 font-medium">10 candidates (22%)</span>
                      </div>
                      <div className="h-8 bg-[#f3f4f6] rounded-lg overflow-hidden">
                        <div
                          className="h-full bg-gray-400 rounded-lg flex items-center justify-end pr-3"
                          style={{ width: '22%' }}
                        >
                          <span className="text-xs text-white font-medium">22%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Interview Outcomes */}
                <div className="bg-white rounded-2xl p-6 border border-gray-200">
                  <div className="mb-6">
                    <h3 className="text-gray-900 mb-1">Interview Outcomes</h3>
                    <p className="text-gray-500 text-sm">Completion rates and recommendations</p>
                  </div>

                  {/* Interview Stats */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-[#f9fafb] rounded-xl p-4">
                      <div className="text-sm text-gray-500 mb-1">Completed</div>
                      <div className="text-2xl text-gray-900">23/35</div>
                    </div>
                    <div className="bg-[#f9fafb] rounded-xl p-4">
                      <div className="text-sm text-gray-500 mb-1">Recommended</div>
                      <div className="text-2xl text-indigo-600">18</div>
                    </div>
                  </div>

                  {/* Recommendation Distribution */}
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-700">Recommended</span>
                        <span className="text-sm text-gray-900 font-medium">18 candidates (78%)</span>
                      </div>
                      <div className="h-8 bg-[#f3f4f6] rounded-lg overflow-hidden">
                        <div
                          className="h-full bg-indigo-500 rounded-lg flex items-center justify-end pr-3"
                          style={{ width: '78%' }}
                        >
                          <span className="text-xs text-white font-medium">78%</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-700">Not Recommended</span>
                        <span className="text-sm text-gray-900 font-medium">5 candidates (22%)</span>
                      </div>
                      <div className="h-8 bg-[#f3f4f6] rounded-lg overflow-hidden">
                        <div
                          className="h-full bg-gray-400 rounded-lg flex items-center justify-end pr-3"
                          style={{ width: '22%' }}
                        >
                          <span className="text-xs text-white font-medium">22%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Integrity Indicators */}
              <div className="bg-white rounded-2xl p-6 border border-gray-200">
                <div className="mb-6">
                  <h3 className="text-gray-900 mb-1">Integrity & Cheating Indicators</h3>
                  <p className="text-gray-500 text-sm">Assessment integrity flags and severity distribution</p>
                </div>

                <div className="grid grid-cols-3 gap-6">
                  {/* Low Severity */}
                  <div className="bg-[#f0fdf4] border border-[#86efac] rounded-xl p-5">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                      <span className="text-sm text-gray-700 font-medium">Low Severity</span>
                    </div>
                    <div className="text-3xl text-gray-900 mb-2">2</div>
                    <div className="text-xs text-gray-600">Minor timing irregularities</div>
                  </div>

                  {/* Medium Severity */}
                  <div className="bg-[#fef3c7] border border-[#fcd34d] rounded-xl p-5">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                      <span className="text-sm text-gray-700 font-medium">Medium Severity</span>
                    </div>
                    <div className="text-3xl text-gray-900 mb-2">1</div>
                    <div className="text-xs text-gray-600">Tab switching detected</div>
                  </div>

                  {/* High Severity */}
                  <div className="bg-[#fef2f2] border border-[#fca5a5] rounded-xl p-5">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <span className="text-sm text-gray-700 font-medium">High Severity</span>
                    </div>
                    <div className="text-3xl text-gray-900 mb-2">0</div>
                    <div className="text-xs text-gray-600">No critical violations</div>
                  </div>
                </div>

                {/* Summary Note */}
                <div className="mt-5 p-4 bg-[#f9fafb] rounded-lg flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-900 font-medium mb-1">Integrity Assessment Summary</p>
                    <p className="text-sm text-gray-600">
                      3 candidates flagged for review (7% of total). All flags are low to medium severity. Recommend manual review before advancing to offer stage.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="sticky bottom-0 bg-white border-t border-gray-200 px-8 py-4 rounded-b-3xl">
              <div className="flex items-center justify-end gap-3">
                <Button
                  variant="outline"
                  className="rounded-full px-6"
                  onClick={() => setShowInsightsPanel(false)}
                >
                  Close
                </Button>
                <Button
                  className="rounded-full px-6 text-white"
                  style={{ backgroundColor: '#6366F1' }}
                  onClick={() => {
                    console.log('Exporting insights for:', selectedPosition);
                  }}
                >
                  Export Report
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}