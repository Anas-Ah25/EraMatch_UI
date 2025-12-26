import { useState } from 'react';
import { ArrowUpDown, Search, Eye } from 'lucide-react';

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
}

interface AdminClosedPositionsProps {
  onSignOut: () => void;
}

export function AdminClosedPositions({ onSignOut }: AdminClosedPositionsProps) {
  const [sortField, setSortField] = useState<string>('');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedNotes, setExpandedNotes] = useState<Set<number>>(new Set());

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
      candidatesCount: 67
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
      candidatesCount: 42
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
      candidatesCount: 89
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
      candidatesCount: 34
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
      candidatesCount: 28
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
      candidatesCount: 56
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
      candidatesCount: 52
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
      candidatesCount: 31
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

  const getReasonTagColor = (reason: string) => {
    if (reason.toLowerCase().includes('eramatch') || reason.toLowerCase().includes('filled')) {
      return 'bg-[#dcfce7] text-[#10b981]';
    }
    if (reason.toLowerCase().includes('budget') || reason.toLowerCase().includes('freeze')) {
      return 'bg-[#fef3c7] text-[#f59e0b]';
    }
    if (reason.toLowerCase().includes('cancelled') || reason.toLowerCase().includes('eliminated')) {
      return 'bg-[#fee2e2] text-[#ef4444]';
    }
    if (reason.toLowerCase().includes('promotion') || reason.toLowerCase().includes('internal')) {
      return 'bg-[#dbeafe] text-[#3b82f6]';
    }
    return 'bg-[#f3f4f6] text-[#6b7280]';
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
                    <button
                      onClick={() => handleSort('department')}
                      className="flex items-center gap-1 font-['Arimo',sans-serif] text-[13px] text-[#6b7280] hover:text-[#111827]"
                    >
                      Department
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
                      Closure Reason(s)
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
                        {position.closureNote && (
                          <div>
                            <button
                              onClick={() => toggleNoteExpansion(position.id)}
                              className="text-[12px] text-indigo-600 hover:text-indigo-700 font-['Arimo',sans-serif]"
                            >
                              {expandedNotes.has(position.id) ? 'Hide note' : 'View note'}
                            </button>
                            {expandedNotes.has(position.id) && (
                              <div className="mt-2 p-3 bg-[#f9fafb] rounded-lg border border-[#e5e7eb]">
                                <p className="font-['Arimo',sans-serif] text-[12px] text-[#6b7280] leading-relaxed">
                                  {position.closureNote}
                                </p>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="font-['Arimo',sans-serif] text-[14px] text-[#6b7280]">
                        {position.department}
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
                      <div className="flex flex-wrap gap-2">
                        {position.closureReason.map((reason, idx) => (
                          <span
                            key={idx}
                            className={`px-[10px] py-[4px] rounded-[6px] font-['Arimo',sans-serif] text-[12px] whitespace-nowrap ${getReasonTagColor(
                              reason
                            )}`}
                          >
                            {reason}
                          </span>
                        ))}
                      </div>
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
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
