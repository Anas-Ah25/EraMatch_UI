import { useState } from 'react';
import { ArrowLeft, Eye, ArrowUpDown, Calendar, Users, FileText, CheckCircle, XCircle, Clock, Briefcase, Award, TrendingUp } from 'lucide-react';
import { Card } from './ui/card';

interface ClosedProject {
  id: string;
  projectName: string;
  closedDate: string;
  positionsCount: number;
  totalCandidates: number;
  openDate: string;
}

interface ClosedPosition {
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

interface SelectedCandidate {
  id: number;
  name: string;
  email: string;
  selectionDate: string;
  finalScore: number;
  position: string;
}

interface AdminClosedPositionsProps {
  onSignOut: () => void;
}

type ViewMode = 'projects' | 'positions' | 'details';

export function AdminClosedPositions({ onSignOut }: AdminClosedPositionsProps) {
  const [viewMode, setViewMode] = useState<ViewMode>('projects');
  const [selectedProject, setSelectedProject] = useState<ClosedProject | null>(null);
  const [selectedPosition, setSelectedPosition] = useState<ClosedPosition | null>(null);
  const [sortField, setSortField] = useState<string>('');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  // Mock data for closed projects
  const closedProjects: ClosedProject[] = [
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

  // Mock data for positions within a project
  const closedPositions: ClosedPosition[] = [
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

  const getPositionsForProject = (projectName: string) => {
    return closedPositions.filter(pos => pos.projectName === projectName);
  };

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

  return (
    <div className="px-12 py-8">
      {/* Projects View */}
      {viewMode === 'projects' && (
        <div>
          <div className="mb-8">
            <h2 className="text-gray-900 mb-2">Closed Projects Archive</h2>
            <p className="text-gray-500 text-sm">
              Browse closed projects and view position archives
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-sm">
            <div className="mb-6">
              <h3 className="text-gray-900 mb-2">Closed Projects</h3>
              <p className="text-gray-500 text-sm">Select a project to view its positions</p>
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
                        <span className="font-['Arimo',sans-serif] text-[13px] text-[#6b7280]">
                          Open Date
                        </span>
                      </th>
                      <th className="text-left p-4">
                        <span className="font-['Arimo',sans-serif] text-[13px] text-[#6b7280]">
                          Closed Date
                        </span>
                      </th>
                      <th className="text-left p-4">
                        <button
                          onClick={() => handleSort('positionsCount')}
                          className="flex items-center gap-1 font-['Arimo',sans-serif] text-[13px] text-[#6b7280] hover:text-[#111827]"
                        >
                          Positions
                          <ArrowUpDown size={14} />
                        </button>
                      </th>
                      <th className="text-left p-4">
                        <span className="font-['Arimo',sans-serif] text-[13px] text-[#6b7280]">
                          Total Candidates
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
                    {closedProjects.map((project, index) => (
                      <tr
                        key={project.id}
                        className={`border-b border-[#e5e7eb] hover:bg-[#f9fafb] transition-colors cursor-pointer ${
                          index === closedProjects.length - 1 ? 'border-b-0' : ''
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
                            {new Date(project.openDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                          </span>
                        </td>
                        <td className="p-4">
                          <span className="font-['Arimo',sans-serif] text-[14px] text-[#6b7280]">
                            {new Date(project.closedDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                          </span>
                        </td>
                        <td className="p-4">
                          <span className="font-['Arimo',sans-serif] text-[14px] text-[#111827]">
                            {project.positionsCount}
                          </span>
                        </td>
                        <td className="p-4">
                          <span className="font-['Arimo',sans-serif] text-[14px] text-[#6b7280]">
                            {project.totalCandidates}
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
        </div>
      )}

      {/* Positions View */}
      {viewMode === 'positions' && selectedProject && (
        <div>
          <div className="mb-6 flex items-center gap-3">
            <button
              onClick={() => {
                setViewMode('projects');
                setSelectedProject(null);
              }}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft size={20} />
            </button>
            <div>
              <h3 className="text-gray-900 mb-1">Project Archive: {selectedProject.projectName}</h3>
              <p className="text-gray-500 text-sm">Select a position to view detailed archive data</p>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-sm">
            <div className="mb-6">
              <h3 className="text-gray-900 mb-2">Closed Positions</h3>
              <p className="text-gray-500 text-sm">View archive details for each position</p>
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
                        <span className="font-['Arimo',sans-serif] text-[13px] text-[#6b7280]">
                          Closed Date
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
                        <span className="font-['Arimo',sans-serif] text-[13px] text-[#6b7280]">
                          Groups Created
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
                    {getPositionsForProject(selectedProject.projectName).map((position, index) => (
                      <tr
                        key={position.id}
                        className={`border-b border-[#e5e7eb] hover:bg-[#f9fafb] transition-colors cursor-pointer ${
                          index === getPositionsForProject(selectedProject.projectName).length - 1 ? 'border-b-0' : ''
                        }`}
                        onClick={() => {
                          setSelectedPosition(position);
                          setViewMode('details');
                        }}
                      >
                        <td className="p-4">
                          <span className="font-['Arimo',sans-serif] text-[14px] text-[#111827]">
                            {position.jobTitle}
                          </span>
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
                          <span className="font-['Arimo',sans-serif] text-[14px] text-[#6b7280]">
                            {new Date(position.closedDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                          </span>
                        </td>
                        <td className="p-4">
                          <span className="font-['Arimo',sans-serif] text-[14px] text-[#111827]">
                            {position.candidatesCount}
                          </span>
                        </td>
                        <td className="p-4">
                          <span className="font-['Arimo',sans-serif] text-[14px] text-[#6b7280]">
                            {position.groupsCreated}
                          </span>
                        </td>
                        <td className="p-4">
                          <button
                            className="flex items-center gap-2 h-[32px] px-[16px] rounded-[8px] border border-[#e5e7eb] bg-white hover:bg-[#f9fafb] transition-colors"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedPosition(position);
                              setViewMode('details');
                            }}
                          >
                            <Eye size={16} className="text-[#6366f1]" />
                            <span className="font-['Arimo',sans-serif] text-[13px] text-[#111827]">
                              View Archive
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
        </div>
      )}

      {/* Archive Details View */}
      {viewMode === 'details' && selectedPosition && selectedProject && (
        <div>
          <div className="mb-6 flex items-center gap-3">
            <button
              onClick={() => {
                setViewMode('positions');
                setSelectedPosition(null);
              }}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft size={20} />
            </button>
            <div>
              <h3 className="text-gray-900 mb-1">Position Archive: {selectedPosition.jobTitle}</h3>
              <p className="text-gray-500 text-sm">Detailed closure information and statistics</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {/* Left Column - Position Overview */}
            <Card className="p-6 rounded-3xl shadow-sm">
              <h3 className="text-gray-900 mb-4">Position Overview</h3>
              
              <div className="mb-6 p-4 rounded-lg bg-[#F9FAFB]">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="text-gray-900 mb-1">{selectedPosition.jobTitle}</p>
                    <p className="text-gray-500 text-sm">{selectedProject.projectName}</p>
                  </div>
                  <div
                    className="h-[28px] rounded-full px-[14px] flex items-center justify-center"
                    style={{ 
                      backgroundColor: selectedPosition.closureStatus === 'Filled' ? '#10b981' :
                                      selectedPosition.closureStatus === 'Cancelled' ? '#ef4444' :
                                      selectedPosition.closureStatus === 'On Hold' ? '#f59e0b' : '#e5e7eb'
                    }}
                  >
                    <p className="font-['Arimo',sans-serif] text-[13px] text-white">
                      {selectedPosition.closureStatus}
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex items-start gap-3">
                  <Calendar size={20} className="text-indigo-600 mt-0.5" />
                  <div>
                    <p className="text-gray-500 text-xs">Closure Date</p>
                    <p className="text-gray-900 text-sm">
                      {new Date(selectedPosition.closedDate).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <FileText size={20} className="text-indigo-600 mt-0.5" />
                  <div>
                    <p className="text-gray-500 text-xs">Closure Reason</p>
                    <p className="text-gray-900 text-sm">{selectedPosition.closureReason}</p>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-gray-200">
                <h4 className="text-gray-900 mb-4">Recruitment Statistics</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 rounded-lg bg-indigo-50">
                    <div className="flex items-center gap-2 mb-1">
                      <Users size={16} className="text-indigo-600" />
                      <p className="text-xs text-indigo-600">Total Candidates</p>
                    </div>
                    <p className="text-2xl font-semibold text-indigo-900">{selectedPosition.candidatesCount}</p>
                  </div>

                  <div className="p-3 rounded-lg bg-purple-50">
                    <div className="flex items-center gap-2 mb-1">
                      <Briefcase size={16} className="text-purple-600" />
                      <p className="text-xs text-purple-600">Groups Created</p>
                    </div>
                    <p className="text-2xl font-semibold text-purple-900">{selectedPosition.groupsCreated}</p>
                  </div>

                  <div className="p-3 rounded-lg bg-emerald-50">
                    <div className="flex items-center gap-2 mb-1">
                      <CheckCircle size={16} className="text-emerald-600" />
                      <p className="text-xs text-emerald-600">Assessment Passed</p>
                    </div>
                    <p className="text-2xl font-semibold text-emerald-900">{selectedPosition.assessmentsPassed}</p>
                  </div>

                  <div className="p-3 rounded-lg bg-blue-50">
                    <div className="flex items-center gap-2 mb-1">
                      <TrendingUp size={16} className="text-blue-600" />
                      <p className="text-xs text-blue-600">AI Interviews Passed</p>
                    </div>
                    <p className="text-2xl font-semibold text-blue-900">{selectedPosition.aiInterviewsPassed}</p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Right Column - Selected Candidates or Closure Details */}
            <Card className="p-6 rounded-3xl shadow-sm">
              {selectedPosition.closureStatus === 'Filled' && selectedPosition.selectedCandidates && selectedPosition.selectedCandidates.length > 0 ? (
                <div>
                  <h3 className="text-gray-900 mb-2">Selected Candidates</h3>
                  <p className="text-gray-500 text-sm mb-6">
                    {selectedPosition.selectedCandidates.length} candidate(s) selected for this position
                  </p>

                  <div className="space-y-4">
                    {selectedPosition.selectedCandidates.map((candidate) => (
                      <div key={candidate.id} className="p-4 rounded-lg border border-gray-200 bg-white">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div
                              className="w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold"
                              style={{ backgroundColor: '#6366F1' }}
                            >
                              {candidate.name.split(' ').map(n => n[0]).join('')}
                            </div>
                            <div>
                              <p className="text-gray-900 font-medium">{candidate.name}</p>
                              <p className="text-gray-500 text-sm">{candidate.email}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center gap-1">
                              <Award size={16} className="text-amber-500" />
                              <span className="text-lg font-semibold text-gray-900">{candidate.finalScore}</span>
                            </div>
                            <p className="text-gray-500 text-xs">Final Score</p>
                          </div>
                        </div>

                        <div className="pt-3 border-t border-gray-200">
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Calendar size={14} />
                            <span>Selected on {new Date(candidate.selectionDate).toLocaleDateString('en-US', { 
                              year: 'numeric', 
                              month: 'short', 
                              day: 'numeric' 
                            })}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 p-4 rounded-lg bg-emerald-50">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle size={20} className="text-emerald-600" />
                      <h4 className="text-emerald-900 font-medium">Position Successfully Filled</h4>
                    </div>
                    <p className="text-emerald-700 text-sm">
                      This position was successfully closed with {selectedPosition.selectedCandidates.length} selected candidate(s).
                    </p>
                  </div>
                </div>
              ) : selectedPosition.closureStatus === 'Cancelled' ? (
                <div>
                  <h3 className="text-gray-900 mb-6">Position Cancelled</h3>
                  
                  <div className="p-4 rounded-lg bg-red-50 mb-6">
                    <div className="flex items-center gap-2 mb-2">
                      <XCircle size={20} className="text-red-600" />
                      <h4 className="text-red-900 font-medium">Position Cancelled</h4>
                    </div>
                    <p className="text-red-700 text-sm mb-3">
                      {selectedPosition.closureReason}
                    </p>
                    <p className="text-red-600 text-xs">
                      No candidates were selected for this position.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <h4 className="text-gray-900 text-sm font-medium">Candidate Progression Summary</h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <span className="text-gray-600 text-sm">Total Applicants</span>
                        <span className="text-gray-900 font-semibold">{selectedPosition.candidatesCount}</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <span className="text-gray-600 text-sm">Passed Assessment</span>
                        <span className="text-gray-900 font-semibold">{selectedPosition.assessmentsPassed}</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <span className="text-gray-600 text-sm">Passed AI Interview</span>
                        <span className="text-gray-900 font-semibold">{selectedPosition.aiInterviewsPassed}</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <span className="text-gray-600 text-sm">Completed Live Interview</span>
                        <span className="text-gray-900 font-semibold">{selectedPosition.liveInterviewsPassed}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div>
                  <h3 className="text-gray-900 mb-6">Position On Hold</h3>
                  
                  <div className="p-4 rounded-lg bg-amber-50 mb-6">
                    <div className="flex items-center gap-2 mb-2">
                      <Clock size={20} className="text-amber-600" />
                      <h4 className="text-amber-900 font-medium">Position On Hold</h4>
                    </div>
                    <p className="text-amber-700 text-sm mb-3">
                      {selectedPosition.closureReason}
                    </p>
                    <p className="text-amber-600 text-xs">
                      The recruitment process is paused pending further decisions.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <h4 className="text-gray-900 text-sm font-medium">Candidate Progression Summary</h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <span className="text-gray-600 text-sm">Total Applicants</span>
                        <span className="text-gray-900 font-semibold">{selectedPosition.candidatesCount}</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <span className="text-gray-600 text-sm">Passed Assessment</span>
                        <span className="text-gray-900 font-semibold">{selectedPosition.assessmentsPassed}</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <span className="text-gray-600 text-sm">Passed AI Interview</span>
                        <span className="text-gray-900 font-semibold">{selectedPosition.aiInterviewsPassed}</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <span className="text-gray-600 text-sm">Completed Live Interview</span>
                        <span className="text-gray-900 font-semibold">{selectedPosition.liveInterviewsPassed}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
