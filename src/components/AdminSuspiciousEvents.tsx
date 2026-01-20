import { useState } from 'react';
import { Search, AlertTriangle, Flag, ChevronRight, Filter, Download, Mail, Eye, CheckCircle, XCircle, Clock, Users, Shield } from 'lucide-react';

interface AdminSuspiciousEventsProps {
  onSignOut: () => void;
  onViewEventDetail: (event: {
    eventId: string;
    candidateId: number;
    candidateName: string;
    position: string;
    group: string;
    recruiterAssigned: string;
    module: string;
  }) => void;
}

export function AdminSuspiciousEvents({ onSignOut, onViewEventDetail }: AdminSuspiciousEventsProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSeverity, setSelectedSeverity] = useState<'all' | 'high' | 'medium' | 'low'>('all');
  const [selectedStatus, setSelectedStatus] = useState<'all' | 'pending' | 'reviewed' | 'cleared' | 'escalated'>('all');
  const [selectedModule, setSelectedModule] = useState<'all' | 'Assessment' | 'AI Interview'>('all');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<SuspiciousEvent | null>(null);

  // Mock data for suspicious events across all positions and groups
  const suspiciousEvents: SuspiciousEvent[] = [
    {
      id: 'SE-001',
      position: 'Senior React Developer',
      group: 'Q1 2025 Tech Candidates',
      candidateId: 1,
      candidateName: 'Michael Chen',
      eventType: 'tab-switch',
      severity: 'high',
      module: 'Assessment',
      timestamp: '2025-01-20 14:23:45',
      description: 'Tab focus lost for 45 seconds during Question 3 (React Hooks)',
      status: 'pending',
      recruiterAssigned: 'Sarah Johnson - Technical Recruiter'
    },
    {
      id: 'SE-002',
      position: 'Full Stack Engineer',
      group: 'Backend Team Expansion',
      candidateId: 2,
      candidateName: 'David Park',
      eventType: 'copy-paste',
      severity: 'high',
      module: 'Assessment',
      timestamp: '2025-01-20 13:15:22',
      description: 'Large code block (300+ lines) pasted into answer field',
      status: 'escalated',
      actionTakenBy: 'Admin - John Smith',
      actionTakenAt: '2025-01-20 15:30:00',
      notes: 'Escalated to HR for further investigation. Candidate has been notified.',
      recruiterAssigned: 'Mark Wilson - HR Recruiter'
    },
    {
      id: 'SE-003',
      position: 'Senior React Developer',
      group: 'Q1 2025 Tech Candidates',
      candidateId: 3,
      candidateName: 'Emily Rodriguez',
      eventType: 'suspicious-pause',
      severity: 'medium',
      module: 'AI Interview',
      timestamp: '2025-01-20 11:45:30',
      description: '30-second pause before answering technical question about system design',
      status: 'cleared',
      actionTakenBy: 'Technical Recruiter - Sarah Johnson',
      actionTakenAt: '2025-01-20 12:00:00',
      notes: 'Reviewed recording. Candidate was thinking through the problem. No suspicious activity detected.',
      recruiterAssigned: 'Sarah Johnson - Technical Recruiter'
    },
    {
      id: 'SE-004',
      position: 'DevOps Engineer',
      group: 'Infrastructure Team Q1',
      candidateId: 4,
      candidateName: 'James Thompson',
      eventType: 'background-noise',
      severity: 'low',
      module: 'AI Interview',
      timestamp: '2025-01-20 10:30:15',
      description: 'Multiple voices detected in background during interview',
      status: 'reviewed',
      actionTakenBy: 'Technical Recruiter - Alex Martinez',
      actionTakenAt: '2025-01-20 11:00:00',
      notes: 'Candidate working from co-working space. No cheating detected.',
      recruiterAssigned: 'Alex Martinez - Technical Recruiter'
    },
    {
      id: 'SE-005',
      position: 'Senior React Developer',
      group: 'Q1 2025 Tech Candidates',
      candidateId: 5,
      candidateName: 'Sophia Lee',
      eventType: 'multiple-attempts',
      severity: 'medium',
      module: 'Assessment',
      timestamp: '2025-01-19 16:20:00',
      description: 'Attempted to access assessment 3 times before starting',
      status: 'pending',
      recruiterAssigned: 'Sarah Johnson - Technical Recruiter'
    },
    {
      id: 'SE-006',
      position: 'Full Stack Engineer',
      group: 'Backend Team Expansion',
      candidateId: 6,
      candidateName: 'Robert Kim',
      eventType: 'timing-anomaly',
      severity: 'high',
      module: 'Assessment',
      timestamp: '2025-01-19 15:10:45',
      description: 'Completed complex algorithm question in 45 seconds (avg: 8 minutes)',
      status: 'pending',
      recruiterAssigned: 'Mark Wilson - HR Recruiter'
    },
    {
      id: 'SE-007',
      position: 'Frontend Developer',
      group: 'Mobile Team Q1',
      candidateId: 7,
      candidateName: 'Amanda White',
      eventType: 'tab-switch',
      severity: 'medium',
      module: 'Assessment',
      timestamp: '2025-01-19 14:05:30',
      description: 'Tab switched 3 times during CSS layout question',
      status: 'cleared',
      actionTakenBy: 'HR Recruiter - Lisa Anderson',
      actionTakenAt: '2025-01-19 16:00:00',
      notes: 'Candidate was referencing documentation, which is allowed for this question.',
      recruiterAssigned: 'Lisa Anderson - HR Recruiter'
    },
    {
      id: 'SE-008',
      position: 'DevOps Engineer',
      group: 'Infrastructure Team Q1',
      candidateId: 8,
      candidateName: 'Christopher Davis',
      eventType: 'copy-paste',
      severity: 'medium',
      module: 'Assessment',
      timestamp: '2025-01-19 12:30:00',
      description: 'Pasted configuration file content (150 lines)',
      status: 'reviewed',
      actionTakenBy: 'Technical Recruiter - Alex Martinez',
      actionTakenAt: '2025-01-19 14:00:00',
      notes: 'Acceptable - candidate was using their own previous work as reference.',
      recruiterAssigned: 'Alex Martinez - Technical Recruiter'
    }
  ];

  const getEventTypeLabel = (type: string) => {
    switch (type) {
      case 'tab-switch': return 'Tab Switch';
      case 'copy-paste': return 'Copy-Paste';
      case 'suspicious-pause': return 'Suspicious Pause';
      case 'background-noise': return 'Background Noise';
      case 'multiple-attempts': return 'Multiple Attempts';
      case 'timing-anomaly': return 'Timing Anomaly';
      default: return type;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'bg-[#fef2f2] text-[#ef4444] border-[#fecaca]';
      case 'medium':
        return 'bg-[#fffbeb] text-[#f59e0b] border-[#fde68a]';
      case 'low':
        return 'bg-[#eff6ff] text-[#3b82f6] border-[#bfdbfe]';
      default:
        return 'bg-[#f9fafb] text-[#6b7280] border-[#e5e7eb]';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-[#fef3c7] text-[#d97706]';
      case 'reviewed':
        return 'bg-[#dbeafe] text-[#2563eb]';
      case 'cleared':
        return 'bg-[#dcfce7] text-[#10b981]';
      case 'escalated':
        return 'bg-[#fef2f2] text-[#ef4444]';
      default:
        return 'bg-[#f3f4f6] text-[#6b7280]';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock size={14} />;
      case 'reviewed':
        return <Eye size={14} />;
      case 'cleared':
        return <CheckCircle size={14} />;
      case 'escalated':
        return <XCircle size={14} />;
      default:
        return null;
    }
  };

  // Filter events
  const filteredEvents = suspiciousEvents.filter(event => {
    const matchesSearch = 
      event.candidateName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.group.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.id.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesSeverity = selectedSeverity === 'all' || event.severity === selectedSeverity;
    const matchesStatus = selectedStatus === 'all' || event.status === selectedStatus;
    const matchesModule = selectedModule === 'all' || event.module === selectedModule;

    return matchesSearch && matchesSeverity && matchesStatus && matchesModule;
  });

  // Statistics
  const stats = {
    total: suspiciousEvents.length,
    pending: suspiciousEvents.filter(e => e.status === 'pending').length,
    highSeverity: suspiciousEvents.filter(e => e.severity === 'high').length,
    escalated: suspiciousEvents.filter(e => e.status === 'escalated').length
  };

  const handleExportEvents = () => {
    console.log('Exporting events...');
    // Export logic would go here
  };

  const handleBulkEmail = () => {
    console.log('Sending bulk emails...');
    // Bulk email logic would go here
  };

  return (
    <div className="min-h-screen bg-[#f9fafb]">
      {/* Header */}
      <div className="bg-white border-b border-[#e5e7eb] px-8 py-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-[#111827] mb-2">Suspicious Events</h1>
            <p className="font-['Arimo',sans-serif] text-[14px] text-[#6b7280]">
              Monitor and manage suspicious activities across all positions and groups
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleBulkEmail}
              className="flex items-center gap-2 h-[40px] px-[16px] rounded-[8px] border border-[#e5e7eb] bg-white hover:bg-[#f9fafb] transition-colors"
            >
              <Mail size={16} className="text-[#6b7280]" />
              <span className="font-['Arimo',sans-serif] text-[14px] text-[#111827]">
                Bulk Email
              </span>
            </button>
            <button
              onClick={handleExportEvents}
              className="flex items-center gap-2 h-[40px] px-[16px] rounded-[8px] border border-[#e5e7eb] bg-white hover:bg-[#f9fafb] transition-colors"
            >
              <Download size={16} className="text-[#6b7280]" />
              <span className="font-['Arimo',sans-serif] text-[14px] text-[#111827]">
                Export
              </span>
            </button>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <div className="bg-gradient-to-br from-[#eff6ff] to-[#dbeafe] rounded-[12px] p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="font-['Arimo',sans-serif] text-[13px] text-[#1e40af]">Total Events</span>
              <Shield size={20} className="text-[#3b82f6]" />
            </div>
            <div className="text-[#111827] font-semibold">{stats.total}</div>
          </div>

          <div className="bg-gradient-to-br from-[#fef3c7] to-[#fde68a] rounded-[12px] p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="font-['Arimo',sans-serif] text-[13px] text-[#92400e]">Pending Review</span>
              <Clock size={20} className="text-[#f59e0b]" />
            </div>
            <div className="text-[#111827] font-semibold">{stats.pending}</div>
          </div>

          <div className="bg-gradient-to-br from-[#fee2e2] to-[#fecaca] rounded-[12px] p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="font-['Arimo',sans-serif] text-[13px] text-[#991b1b]">High Severity</span>
              <AlertTriangle size={20} className="text-[#ef4444]" />
            </div>
            <div className="text-[#111827] font-semibold">{stats.highSeverity}</div>
          </div>

          <div className="bg-gradient-to-br from-[#fef2f2] to-[#fee2e2] rounded-[12px] p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="font-['Arimo',sans-serif] text-[13px] text-[#991b1b]">Escalated</span>
              <Flag size={20} className="text-[#ef4444]" />
            </div>
            <div className="text-[#111827] font-semibold">{stats.escalated}</div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <Search size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9ca3af]" />
            <input
              type="text"
              placeholder="Search by candidate, position, group, or event ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-[40px] pl-10 pr-4 rounded-[8px] border border-[#e5e7eb] font-['Arimo',sans-serif] text-[14px] focus:outline-none focus:ring-2 focus:ring-[#6366f1]"
            />
          </div>

          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 h-[40px] px-[16px] rounded-[8px] border transition-colors ${
              showFilters
                ? 'bg-[#6366f1] text-white border-[#6366f1]'
                : 'bg-white border-[#e5e7eb] text-[#111827] hover:bg-[#f9fafb]'
            }`}
          >
            <Filter size={16} />
            <span className="font-['Arimo',sans-serif] text-[14px]">
              Filters
            </span>
          </button>
        </div>

        {/* Filter Options */}
        {showFilters && (
          <div className="mt-4 p-4 bg-[#f9fafb] rounded-[8px] border border-[#e5e7eb]">
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block font-['Arimo',sans-serif] text-[13px] text-[#6b7280] mb-2">
                  Severity
                </label>
                <select
                  value={selectedSeverity}
                  onChange={(e) => setSelectedSeverity(e.target.value as any)}
                  className="w-full h-[36px] px-3 rounded-[6px] border border-[#e5e7eb] bg-white font-['Arimo',sans-serif] text-[14px]"
                >
                  <option value="all">All Severities</option>
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
              </div>

              <div>
                <label className="block font-['Arimo',sans-serif] text-[13px] text-[#6b7280] mb-2">
                  Status
                </label>
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value as any)}
                  className="w-full h-[36px] px-3 rounded-[6px] border border-[#e5e7eb] bg-white font-['Arimo',sans-serif] text-[14px]"
                >
                  <option value="all">All Statuses</option>
                  <option value="pending">Pending</option>
                  <option value="reviewed">Reviewed</option>
                  <option value="cleared">Cleared</option>
                  <option value="escalated">Escalated</option>
                </select>
              </div>

              <div>
                <label className="block font-['Arimo',sans-serif] text-[13px] text-[#6b7280] mb-2">
                  Module
                </label>
                <select
                  value={selectedModule}
                  onChange={(e) => setSelectedModule(e.target.value as any)}
                  className="w-full h-[36px] px-3 rounded-[6px] border border-[#e5e7eb] bg-white font-['Arimo',sans-serif] text-[14px]"
                >
                  <option value="all">All Modules</option>
                  <option value="Assessment">Assessment</option>
                  <option value="AI Interview">AI Interview</option>
                </select>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Events List */}
      <div className="p-8">
        <div className="bg-white rounded-[12px] border border-[#e5e7eb] overflow-hidden">
          {/* Table Header */}
          <div className="grid grid-cols-12 gap-4 px-6 py-4 bg-[#f9fafb] border-b border-[#e5e7eb]">
            <div className="col-span-1 font-['Arimo',sans-serif] text-[13px] text-[#6b7280] font-semibold">
              Event ID
            </div>
            <div className="col-span-2 font-['Arimo',sans-serif] text-[13px] text-[#6b7280] font-semibold">
              Candidate
            </div>
            <div className="col-span-2 font-['Arimo',sans-serif] text-[13px] text-[#6b7280] font-semibold">
              Position / Group
            </div>
            <div className="col-span-2 font-['Arimo',sans-serif] text-[13px] text-[#6b7280] font-semibold">
              Event Type
            </div>
            <div className="col-span-1 font-['Arimo',sans-serif] text-[13px] text-[#6b7280] font-semibold">
              Severity
            </div>
            <div className="col-span-1 font-['Arimo',sans-serif] text-[13px] text-[#6b7280] font-semibold">
              Module
            </div>
            <div className="col-span-2 font-['Arimo',sans-serif] text-[13px] text-[#6b7280] font-semibold">
              Status
            </div>
            <div className="col-span-1 font-['Arimo',sans-serif] text-[13px] text-[#6b7280] font-semibold">
              Actions
            </div>
          </div>

          {/* Table Body */}
          <div className="divide-y divide-[#e5e7eb]">
            {filteredEvents.length === 0 ? (
              <div className="px-6 py-12 text-center">
                <AlertTriangle size={48} className="mx-auto mb-4 text-[#9ca3af]" />
                <p className="font-['Arimo',sans-serif] text-[14px] text-[#6b7280]">
                  No suspicious events found matching your criteria
                </p>
              </div>
            ) : (
              filteredEvents.map((event) => (
                <div
                  key={event.id}
                  className="grid grid-cols-12 gap-4 px-6 py-4 hover:bg-[#f9fafb] transition-colors"
                >
                  <div className="col-span-1">
                    <span className="font-['Arimo',sans-serif] text-[13px] text-[#6366f1] font-medium">
                      {event.id}
                    </span>
                  </div>

                  <div className="col-span-2">
                    <div className="font-['Arimo',sans-serif] text-[14px] text-[#111827]">
                      {event.candidateName}
                    </div>
                    <div className="font-['Arimo',sans-serif] text-[12px] text-[#6b7280]">
                      ID: {event.candidateId}
                    </div>
                  </div>

                  <div className="col-span-2">
                    <div className="font-['Arimo',sans-serif] text-[13px] text-[#111827]">
                      {event.position}
                    </div>
                    <div className="font-['Arimo',sans-serif] text-[12px] text-[#6b7280]">
                      {event.group}
                    </div>
                  </div>

                  <div className="col-span-2">
                    <div className="font-['Arimo',sans-serif] text-[13px] text-[#111827] mb-1">
                      {getEventTypeLabel(event.eventType)}
                    </div>
                    <div className="font-['Arimo',sans-serif] text-[12px] text-[#6b7280]">
                      {event.timestamp}
                    </div>
                  </div>

                  <div className="col-span-1">
                    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-[6px] border font-['Arimo',sans-serif] text-[12px] font-medium ${getSeverityColor(event.severity)}`}>
                      {event.severity.toUpperCase()}
                    </span>
                  </div>

                  <div className="col-span-1">
                    <span className="font-['Arimo',sans-serif] text-[13px] text-[#6b7280]">
                      {event.module}
                    </span>
                  </div>

                  <div className="col-span-2">
                    <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-[6px] font-['Arimo',sans-serif] text-[12px] font-medium mb-1 ${getStatusColor(event.status)}`}>
                      {getStatusIcon(event.status)}
                      {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                    </div>
                    {event.actionTakenBy && (
                      <div className="font-['Arimo',sans-serif] text-[11px] text-[#6b7280]">
                        By: {event.actionTakenBy}
                      </div>
                    )}
                  </div>

                  <div className="col-span-1">
                    <button
                      onClick={() => onViewEventDetail({
                        eventId: event.id,
                        candidateId: event.candidateId,
                        candidateName: event.candidateName,
                        position: event.position,
                        group: event.group,
                        recruiterAssigned: event.recruiterAssigned,
                        module: event.module
                      })}
                      className="flex items-center gap-1 text-[#6366f1] hover:text-[#5558e3] font-['Arimo',sans-serif] text-[13px]"
                    >
                      View
                      <ChevronRight size={14} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Event Detail Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-8">
          <div className="bg-white rounded-[16px] w-full max-w-[800px] max-h-[90vh] overflow-hidden flex flex-col">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-[#e5e7eb] flex items-center justify-between">
              <div>
                <h2 className="text-[#111827] font-semibold mb-1">
                  Event Details - {selectedEvent.id}
                </h2>
                <p className="font-['Arimo',sans-serif] text-[13px] text-[#6b7280]">
                  {selectedEvent.candidateName} • {selectedEvent.position}
                </p>
              </div>
              <button
                onClick={() => setSelectedEvent(null)}
                className="w-8 h-8 rounded-[8px] flex items-center justify-center hover:bg-[#f9fafb] transition-colors"
              >
                <ChevronRight size={20} className="text-[#6b7280]" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="flex-1 overflow-y-auto p-6">
              {/* Event Information */}
              <div className="grid grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block font-['Arimo',sans-serif] text-[13px] text-[#6b7280] mb-2">
                    Event Type
                  </label>
                  <div className="font-['Arimo',sans-serif] text-[14px] text-[#111827]">
                    {getEventTypeLabel(selectedEvent.eventType)}
                  </div>
                </div>

                <div>
                  <label className="block font-['Arimo',sans-serif] text-[13px] text-[#6b7280] mb-2">
                    Severity
                  </label>
                  <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-[6px] border font-['Arimo',sans-serif] text-[12px] font-medium ${getSeverityColor(selectedEvent.severity)}`}>
                    {selectedEvent.severity.toUpperCase()}
                  </span>
                </div>

                <div>
                  <label className="block font-['Arimo',sans-serif] text-[13px] text-[#6b7280] mb-2">
                    Module
                  </label>
                  <div className="font-['Arimo',sans-serif] text-[14px] text-[#111827]">
                    {selectedEvent.module}
                  </div>
                </div>

                <div>
                  <label className="block font-['Arimo',sans-serif] text-[13px] text-[#6b7280] mb-2">
                    Timestamp
                  </label>
                  <div className="font-['Arimo',sans-serif] text-[14px] text-[#111827]">
                    {selectedEvent.timestamp}
                  </div>
                </div>

                <div className="col-span-2">
                  <label className="block font-['Arimo',sans-serif] text-[13px] text-[#6b7280] mb-2">
                    Group
                  </label>
                  <div className="font-['Arimo',sans-serif] text-[14px] text-[#111827]">
                    {selectedEvent.group}
                  </div>
                </div>

                <div className="col-span-2">
                  <label className="block font-['Arimo',sans-serif] text-[13px] text-[#6b7280] mb-2">
                    Assigned Recruiter
                  </label>
                  <div className="font-['Arimo',sans-serif] text-[14px] text-[#111827]">
                    {selectedEvent.recruiterAssigned}
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="mb-6">
                <label className="block font-['Arimo',sans-serif] text-[13px] text-[#6b7280] mb-2">
                  Description
                </label>
                <div className="p-4 bg-[#f9fafb] rounded-[8px] border border-[#e5e7eb] font-['Arimo',sans-serif] text-[14px] text-[#111827]">
                  {selectedEvent.description}
                </div>
              </div>

              {/* Status and Action */}
              <div className="mb-6">
                <label className="block font-['Arimo',sans-serif] text-[13px] text-[#6b7280] mb-2">
                  Current Status
                </label>
                <div className={`inline-flex items-center gap-2 px-3 py-2 rounded-[8px] font-['Arimo',sans-serif] text-[13px] font-medium ${getStatusColor(selectedEvent.status)}`}>
                  {getStatusIcon(selectedEvent.status)}
                  {selectedEvent.status.charAt(0).toUpperCase() + selectedEvent.status.slice(1)}
                </div>
              </div>

              {/* Action Taken Details */}
              {selectedEvent.actionTakenBy && (
                <div className="p-4 bg-[#eff6ff] rounded-[8px] border border-[#bfdbfe]">
                  <div className="flex items-center gap-2 mb-3">
                    <Users size={16} className="text-[#3b82f6]" />
                    <span className="font-['Arimo',sans-serif] text-[13px] text-[#1e40af] font-semibold">
                      Action Taken
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mb-3">
                    <div>
                      <span className="font-['Arimo',sans-serif] text-[12px] text-[#6b7280]">
                        Reviewed By
                      </span>
                      <div className="font-['Arimo',sans-serif] text-[13px] text-[#111827]">
                        {selectedEvent.actionTakenBy}
                      </div>
                    </div>
                    <div>
                      <span className="font-['Arimo',sans-serif] text-[12px] text-[#6b7280]">
                        Reviewed At
                      </span>
                      <div className="font-['Arimo',sans-serif] text-[13px] text-[#111827]">
                        {selectedEvent.actionTakenAt}
                      </div>
                    </div>
                  </div>
                  {selectedEvent.notes && (
                    <div>
                      <span className="font-['Arimo',sans-serif] text-[12px] text-[#6b7280]">
                        Notes
                      </span>
                      <div className="font-['Arimo',sans-serif] text-[13px] text-[#111827] mt-1">
                        {selectedEvent.notes}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 border-t border-[#e5e7eb] flex justify-end gap-3">
              <button
                onClick={() => setSelectedEvent(null)}
                className="h-[40px] px-[16px] rounded-[8px] border border-[#e5e7eb] bg-white hover:bg-[#f9fafb] font-['Arimo',sans-serif] text-[14px] text-[#111827] transition-colors"
              >
                Close
              </button>
              <button
                className="h-[40px] px-[16px] rounded-[8px] bg-[#6366f1] hover:bg-[#5558e3] font-['Arimo',sans-serif] text-[14px] text-white transition-colors"
              >
                View Full Report
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}