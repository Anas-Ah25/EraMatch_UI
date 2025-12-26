import { useState } from 'react';
import { ChevronLeft, Play, Edit, Download, Users, TrendingUp, Sparkles, Calendar, Send, CheckCircle, XCircle, AlertCircle, Clock, Eye, Trash2, UserPlus, UserMinus, Activity, MoreVertical, Flag, Filter, X, ChevronDown, Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ModuleDetailAssessment } from './ModuleDetailAssessment';
import { ModuleDetailAIInterview } from './ModuleDetailAIInterview';
import { SuspectReviewPage } from './SuspectReviewPage';

interface EnhancedGroupOverviewV2Props {
  groupId: string;
  groupName: string;
  description: string;
  assignedRecruiter: string;
  candidateIds: number[];
  onBack: () => void;
  onViewCandidate: (candidateId: number) => void;
  onOpenLiveAISetup?: () => void;
  onOpenRecordedAISetup?: () => void;
  onCreateAssessment?: () => void;
}

interface PipelineStep {
  id: string;
  name: string;
  completed: number;
  total: number;
  pending: number;
}

interface CandidateStatus {
  id: number;
  name: string;
  avatar: string;
  assessment: 'completed' | 'pending' | 'not-started' | 'failed';
  aiInterview: 'completed' | 'pending' | 'not-started' | 'failed';
  liveInterview: 'completed' | 'pending' | 'not-started' | 'failed';
  review: 'completed' | 'pending' | 'not-started' | 'failed';
  offer: 'completed' | 'pending' | 'not-started' | 'failed';
  assessmentScore: number;
  aiInterviewScore: number;
  flags: string[];
  currentStage: string;
}

export function EnhancedGroupOverviewV2({
  groupId,
  groupName,
  description,
  assignedRecruiter,
  candidateIds,
  onBack,
  onViewCandidate,
  onOpenLiveAISetup,
  onOpenRecordedAISetup,
  onCreateAssessment
}: EnhancedGroupOverviewV2Props) {
  const [showRankModal, setShowRankModal] = useState(false);
  const [showTopNModal, setShowTopNModal] = useState(false);
  const [showAutoScheduleModal, setShowAutoScheduleModal] = useState(false);
  const [showSendAssessmentModal, setShowSendAssessmentModal] = useState(false);
  const [showMoveStageModal, setShowMoveStageModal] = useState(false);
  const [showRuleBuilderModal, setShowRuleBuilderModal] = useState(false);
  const [selectedStep, setSelectedStep] = useState<string | null>(null);
  const [isRunningPipeline, setIsRunningPipeline] = useState(false);
  const [pipelineProgress, setPipelineProgress] = useState(0);
  
  // New state for enhancements
  const [selectedCandidates, setSelectedCandidates] = useState<number[]>([]);
  const [showModuleDetail, setShowModuleDetail] = useState<{ type: 'assessment' | 'ai-interview'; candidateId: number } | null>(null);
  const [showSuspectReview, setShowSuspectReview] = useState<number | null>(null);
  const [activeKPIFilter, setActiveKPIFilter] = useState<string | null>(null);
  const [showModuleFilters, setShowModuleFilters] = useState(false);
  const [moduleFilters, setModuleFilters] = useState({
    assessmentStatus: [] as string[],
    aiInterviewStatus: [] as string[],
    scoreRange: [0, 100] as [number, number],
    flagsFilter: 'all' as 'all' | 'integrity' | 'suspicious',
  });
  const [showBulkActions, setShowBulkActions] = useState(false);
  const [showFlaggedBatch, setShowFlaggedBatch] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [showAIInterviewSettingsModal, setShowAIInterviewSettingsModal] = useState(false);

  // Mock pipeline data
  const pipelineSteps: PipelineStep[] = [
    { id: 'assessment', name: 'Assessment', completed: 6, total: 8, pending: 2 },
    { id: 'ai-interview', name: 'AI Interview', completed: 4, total: 8, pending: 4 },
    { id: 'live-interview', name: 'Live Interview', completed: 2, total: 8, pending: 6 },
    { id: 'review', name: 'Review', completed: 1, total: 8, pending: 7 },
    { id: 'offer', name: 'Offer', completed: 0, total: 8, pending: 8 }
  ];

  // Mock candidate status data
  const candidateStatuses: CandidateStatus[] = [
    {
      id: 1,
      name: 'Sarah Chen',
      avatar: 'SC',
      assessment: 'completed',
      aiInterview: 'completed',
      liveInterview: 'completed',
      review: 'completed',
      offer: 'pending',
      assessmentScore: 92,
      aiInterviewScore: 88,
      flags: [],
      currentStage: 'Offer'
    },
    {
      id: 2,
      name: 'Michael Rodriguez',
      avatar: 'MR',
      assessment: 'completed',
      aiInterview: 'completed',
      liveInterview: 'pending',
      review: 'not-started',
      offer: 'not-started',
      assessmentScore: 85,
      aiInterviewScore: 82,
      flags: [],
      currentStage: 'Live Interview'
    },
    {
      id: 3,
      name: 'Emma Thompson',
      avatar: 'ET',
      assessment: 'completed',
      aiInterview: 'completed',
      liveInterview: 'not-started',
      review: 'not-started',
      offer: 'not-started',
      assessmentScore: 88,
      aiInterviewScore: 90,
      flags: [],
      currentStage: 'AI Interview'
    },
    {
      id: 4,
      name: 'James Wilson',
      avatar: 'JW',
      assessment: 'completed',
      aiInterview: 'pending',
      liveInterview: 'not-started',
      review: 'not-started',
      offer: 'not-started',
      assessmentScore: 78,
      aiInterviewScore: 0,
      flags: ['Suspicious Activity', 'Tab Switch'],
      currentStage: 'Assessment'
    },
    {
      id: 5,
      name: 'Olivia Martinez',
      avatar: 'OM',
      assessment: 'completed',
      aiInterview: 'not-started',
      liveInterview: 'not-started',
      review: 'not-started',
      offer: 'not-started',
      assessmentScore: 95,
      aiInterviewScore: 0,
      flags: [],
      currentStage: 'Assessment'
    },
    {
      id: 6,
      name: 'David Kim',
      avatar: 'DK',
      assessment: 'completed',
      aiInterview: 'completed',
      liveInterview: 'not-started',
      review: 'not-started',
      offer: 'not-started',
      assessmentScore: 81,
      aiInterviewScore: 79,
      flags: [],
      currentStage: 'AI Interview'
    },
    {
      id: 7,
      name: 'Sophie Anderson',
      avatar: 'SA',
      assessment: 'pending',
      aiInterview: 'not-started',
      liveInterview: 'not-started',
      review: 'not-started',
      offer: 'not-started',
      assessmentScore: 0,
      aiInterviewScore: 0,
      flags: [],
      currentStage: 'Assessment'
    },
    {
      id: 8,
      name: 'Alex Johnson',
      avatar: 'AJ',
      assessment: 'pending',
      aiInterview: 'not-started',
      liveInterview: 'not-started',
      review: 'not-started',
      offer: 'not-started',
      assessmentScore: 0,
      aiInterviewScore: 0,
      flags: [],
      currentStage: 'Assessment'
    }
  ];

  // Filter candidates based on active filters
  const getFilteredCandidates = () => {
    let filtered = [...candidateStatuses];
    
    // KPI filter
    if (activeKPIFilter === 'integrity') {
      filtered = filtered.filter(c => c.flags.length > 0);
    }
    
    // Step filter
    if (selectedStep) {
      const stepMap: Record<string, string> = {
        'assessment': 'Assessment',
        'ai-interview': 'AI Interview',
        'live-interview': 'Live Interview',
        'review': 'Review',
        'offer': 'Offer'
      };
      filtered = filtered.filter(c => c.currentStage === stepMap[selectedStep]);
    }
    
    return filtered;
  };

  const filteredCandidates = getFilteredCandidates();

  const toggleSelectCandidate = (id: number) => {
    setSelectedCandidates(prev =>
      prev.includes(id) ? prev.filter(cId => cId !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedCandidates.length === filteredCandidates.length) {
      setSelectedCandidates([]);
    } else {
      setSelectedCandidates(filteredCandidates.map(c => c.id));
    }
  };

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleBulkAction = (action: string) => {
    showToast(`${action} applied to ${selectedCandidates.length} candidates`);
    setSelectedCandidates([]);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle size={16} className="text-[#10b981]" />;
      case 'pending':
        return <Clock size={16} className="text-[#f59e0b]" />;
      case 'failed':
        return <XCircle size={16} className="text-[#ef4444]" />;
      default:
        return <div className="w-[16px] h-[16px] rounded-full border-2 border-[#e5e7eb]" />;
    }
  };

  const handleRunPipeline = async () => {
    setIsRunningPipeline(true);
    setPipelineProgress(0);
    
    for (let i = 0; i <= 100; i += 10) {
      await new Promise(resolve => setTimeout(resolve, 200));
      setPipelineProgress(i);
    }
    
    setIsRunningPipeline(false);
    showToast('Pipeline execution completed!');
  };

  // If showing suspect review for a candidate
  if (showSuspectReview !== null) {
    const candidate = candidateStatuses.find(c => c.id === showSuspectReview);
    if (candidate) {
      return (
        <SuspectReviewPage
          candidateId={candidate.id}
          candidateName={candidate.name}
          groupId={groupId}
          groupName={groupName}
          currentModule="Assessment"
          onBack={() => setShowSuspectReview(null)}
          onViewCandidate={onViewCandidate}
        />
      );
    }
  }

  return (
    <div className="min-h-screen bg-[#f9fafb]">
      {/* Header */}
      <div className="bg-white border-b border-[#e5e7eb] px-8 py-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 mb-4 font-['Arimo',sans-serif] text-[14px] text-[#6366f1] hover:underline"
        >
          <ChevronLeft size={16} />
          Back to Position Dashboard
        </button>
        
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-[#111827]">{groupName}</h1>
              <span className="px-[12px] py-[4px] bg-[#ede9fe] text-[#6366f1] rounded-[6px] font-['Arimo',sans-serif] text-[13px]">
                {candidateStatuses.length} Candidates
              </span>
              <div className="flex items-center gap-1">
                <div className="w-[8px] h-[8px] rounded-full bg-[#10b981] animate-pulse" />
                <span className="font-['Arimo',sans-serif] text-[12px] text-[#10b981]">
                  Live
                </span>
              </div>
              {candidateStatuses.filter(c => c.flags.length > 0).length > 0 && (
                <button
                  onClick={() => setShowFlaggedBatch(true)}
                  className="flex items-center gap-1 px-[10px] py-[4px] bg-[#fef2f2] text-[#ef4444] rounded-[6px] font-['Arimo',sans-serif] text-[12px] hover:bg-[#fee2e2] transition-colors"
                >
                  <Flag size={12} />
                  {candidateStatuses.filter(c => c.flags.length > 0).length} Flagged
                </button>
              )}
            </div>
            <p className="font-['Arimo',sans-serif] text-[14px] text-[#6b7280] mb-3">
              {description || 'No description provided'}
            </p>
            <div className="flex items-center gap-2">
              <Users size={14} className="text-[#6b7280]" />
              <span className="font-['Arimo',sans-serif] text-[13px] text-[#374151]">
                Assigned to: <span className="text-[#6366f1]">{assignedRecruiter}</span>
              </span>
              <span className="text-[#e5e7eb] mx-2">|</span>
              <Clock size={14} className="text-[#6b7280]" />
              <span className="font-['Arimo',sans-serif] text-[13px] text-[#6b7280]">
                Created on {new Date().toLocaleDateString()}
              </span>
            </div>
          </div>
          
          <div className="flex gap-2">
            <button
              onClick={handleRunPipeline}
              disabled={isRunningPipeline}
              className="flex items-center gap-2 h-[40px] px-[16px] rounded-[8px] bg-[#6366f1] hover:bg-[#5558e3] disabled:bg-[#e5e7eb] text-white transition-colors"
            >
              <Play size={16} />
              <span className="font-['Arimo',sans-serif] text-[14px]">
                {isRunningPipeline ? 'Running...' : 'Run Pipeline'}
              </span>
            </button>
            <button className="flex items-center gap-2 h-[40px] px-[16px] rounded-[8px] border border-[#e5e7eb] bg-white hover:bg-[#f9fafb] transition-colors">
              <Edit size={16} className="text-[#6b7280]" />
              <span className="font-['Arimo',sans-serif] text-[14px] text-[#111827]">
                Edit
              </span>
            </button>
            <button className="flex items-center gap-2 h-[40px] px-[16px] rounded-[8px] border border-[#e5e7eb] bg-white hover:bg-[#f9fafb] transition-colors">
              <Download size={16} className="text-[#6b7280]" />
              <span className="font-['Arimo',sans-serif] text-[14px] text-[#111827]">
                Export
              </span>
            </button>
          </div>
        </div>

        {isRunningPipeline && (
          <div className="mt-4 bg-[#f9fafb] rounded-[8px] p-4 border border-[#e5e7eb]">
            <div className="flex items-center justify-between mb-2">
              <span className="font-['Arimo',sans-serif] text-[13px] text-[#374151]">
                Pipeline execution in progress...
              </span>
              <span className="font-['Arimo',sans-serif] text-[13px] text-[#6366f1]">
                {pipelineProgress}%
              </span>
            </div>
            <div className="w-full h-[6px] bg-[#e5e7eb] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#6366f1] transition-all duration-200"
                style={{ width: `${pipelineProgress}%` }}
              />
            </div>
          </div>
        )}

        {/* Group Settings Section */}
        <div className="mt-6 bg-white rounded-[12px] border border-[#e5e7eb] p-4">
          <h3 className="font-['Arimo',sans-serif] text-[15px] text-[#111827] mb-3">Group Settings</h3>
          <div className="flex gap-3">
            <button
              onClick={() => {
                if (onCreateAssessment) {
                  onCreateAssessment();
                }
              }}
              className="flex-1 flex items-center justify-center gap-2 h-[40px] px-[16px] rounded-[8px] border border-[#e5e7eb] bg-white hover:bg-[#f9fafb] transition-colors"
            >
              <Plus size={16} className="text-[#6b7280]" />
              <span className="font-['Arimo',sans-serif] text-[14px] text-[#111827]">
                Add Assessment
              </span>
            </button>
            <button
              onClick={() => setShowAIInterviewSettingsModal(true)}
              className="flex-1 flex items-center justify-center gap-2 h-[40px] px-[16px] rounded-[8px] border border-[#e5e7eb] bg-white hover:bg-[#f9fafb] transition-colors"
            >
              <Activity size={16} className="text-[#6b7280]" />
              <span className="font-['Arimo',sans-serif] text-[14px] text-[#111827]">
                AI Interview Settings
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Action Toolbar */}
      <div className="bg-white border-b border-[#e5e7eb] px-8 py-4">
        <div className="grid grid-cols-4 gap-3">
          <button
            onClick={() => setShowRankModal(true)}
            className="flex items-center gap-2 h-[40px] px-[14px] rounded-[8px] bg-[#f5f3ff] hover:bg-[#ede9fe] border border-[#e5e7eb] transition-colors"
          >
            <Sparkles size={16} className="text-[#6366f1]" />
            <span className="font-['Arimo',sans-serif] text-[13px] text-[#6366f1]">
              Semantic Match
            </span>
          </button>
          <button
            onClick={() => setShowTopNModal(true)}
            className="flex items-center gap-2 h-[40px] px-[14px] rounded-[8px] bg-[#f5f3ff] hover:bg-[#ede9fe] border border-[#e5e7eb] transition-colors"
          >
            <TrendingUp size={16} className="text-[#6366f1]" />
            <span className="font-['Arimo',sans-serif] text-[13px] text-[#6366f1]">
              Rank Candidates
            </span>
          </button>
          <button
            onClick={() => setShowSendAssessmentModal(true)}
            className="flex items-center gap-2 h-[40px] px-[14px] rounded-[8px] bg-white hover:bg-[#f9fafb] border border-[#e5e7eb] transition-colors"
          >
            <Send size={16} className="text-[#6b7280]" />
            <span className="font-['Arimo',sans-serif] text-[13px] text-[#111827]">
              Send Assessments
            </span>
          </button>
          <button
            onClick={() => setShowAutoScheduleModal(true)}
            className="flex items-center gap-2 h-[40px] px-[14px] rounded-[8px] bg-white hover:bg-[#f9fafb] border border-[#e5e7eb] transition-colors"
          >
            <Calendar size={16} className="text-[#6b7280]" />
            <span className="font-['Arimo',sans-serif] text-[13px] text-[#111827]">
              Schedule AI Interviews
            </span>
          </button>
          <button className="flex items-center gap-2 h-[40px] px-[14px] rounded-[8px] bg-white hover:bg-[#f9fafb] border border-[#e5e7eb] transition-colors">
            <Calendar size={16} className="text-[#6b7280]" />
            <span className="font-['Arimo',sans-serif] text-[13px] text-[#111827]">
              Schedule Live Interviews
            </span>
          </button>
          <button
            onClick={() => setShowMoveStageModal(true)}
            className="flex items-center gap-2 h-[40px] px-[14px] rounded-[8px] bg-white hover:bg-[#f9fafb] border border-[#e5e7eb] transition-colors"
          >
            <Play size={16} className="text-[#6b7280]" />
            <span className="font-['Arimo',sans-serif] text-[13px] text-[#111827]">
              Move to Next Stage
            </span>
          </button>
          <button className="flex items-center gap-2 h-[40px] px-[14px] rounded-[8px] bg-white hover:bg-[#f9fafb] border border-[#e5e7eb] transition-colors">
            <Download size={16} className="text-[#6b7280]" />
            <span className="font-['Arimo',sans-serif] text-[13px] text-[#111827]">
              Export
            </span>
          </button>
          <button
            onClick={() => setShowModuleFilters(!showModuleFilters)}
            className={`flex items-center gap-2 h-[40px] px-[14px] rounded-[8px] border transition-colors ${
              showModuleFilters
                ? 'bg-[#f5f3ff] border-[#6366f1] text-[#6366f1]'
                : 'bg-white hover:bg-[#f9fafb] border-[#e5e7eb] text-[#111827]'
            }`}
          >
            <Filter size={16} />
            <span className="font-['Arimo',sans-serif] text-[13px]">
              Module Filters
            </span>
            <ChevronDown size={14} className={`transition-transform ${showModuleFilters ? 'rotate-180' : ''}`} />
          </button>
        </div>

        {/* Module Filters Dropdown */}
        <AnimatePresence>
          {showModuleFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="mt-4 p-4 bg-[#f9fafb] rounded-[12px] border border-[#e5e7eb]">
                <div className="grid grid-cols-4 gap-4">
                  <div>
                    <label className="block font-['Arimo',sans-serif] text-[12px] text-[#6b7280] mb-2">
                      Assessment Status
                    </label>
                    <div className="space-y-2">
                      {['Passed', 'Failed', 'Pending', 'Flagged'].map(status => (
                        <label key={status} className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            className="w-[16px] h-[16px] rounded border-[#e5e7eb] text-[#6366f1]"
                          />
                          <span className="font-['Arimo',sans-serif] text-[13px] text-[#374151]">
                            {status}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block font-['Arimo',sans-serif] text-[12px] text-[#6b7280] mb-2">
                      AI Interview Status
                    </label>
                    <div className="space-y-2">
                      {['Passed', 'Failed', 'Pending', 'Flagged'].map(status => (
                        <label key={status} className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            className="w-[16px] h-[16px] rounded border-[#e5e7eb] text-[#6366f1]"
                          />
                          <span className="font-['Arimo',sans-serif] text-[13px] text-[#374151]">
                            {status}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block font-['Arimo',sans-serif] text-[12px] text-[#6b7280] mb-2">
                      Score Range
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      className="w-full"
                    />
                    <div className="flex items-center justify-between mt-2">
                      <span className="font-['Arimo',sans-serif] text-[11px] text-[#6b7280]">0</span>
                      <span className="font-['Arimo',sans-serif] text-[11px] text-[#6b7280]">100</span>
                    </div>
                  </div>
                  <div>
                    <label className="block font-['Arimo',sans-serif] text-[12px] text-[#6b7280] mb-2">
                      Flags Filter
                    </label>
                    <select className="w-full h-[36px] px-[12px] rounded-[8px] border border-[#e5e7eb] bg-white font-['Arimo',sans-serif] text-[13px]">
                      <option value="all">All Candidates</option>
                      <option value="integrity">Integrity Issues</option>
                      <option value="suspicious">Suspicious Activity</option>
                    </select>
                  </div>
                </div>
                <div className="flex items-center justify-end gap-2 mt-4">
                  <button
                    onClick={() => setShowModuleFilters(false)}
                    className="h-[32px] px-[14px] rounded-[6px] border border-[#e5e7eb] bg-white hover:bg-[#f9fafb] font-['Arimo',sans-serif] text-[12px] text-[#111827] transition-colors"
                  >
                    Clear Filters
                  </button>
                  <button
                    onClick={() => setShowModuleFilters(false)}
                    className="h-[32px] px-[14px] rounded-[6px] bg-[#6366f1] hover:bg-[#5558e3] font-['Arimo',sans-serif] text-[12px] text-white transition-colors"
                  >
                    Apply Filters
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* KPI Cards (Clickable) */}
      <div className="px-8 py-6">
        <div className="grid grid-cols-4 gap-4 mb-6">
          <button
            onClick={() => setActiveKPIFilter(activeKPIFilter === 'assessments' ? null : 'assessments')}
            className={`bg-white rounded-[12px] border p-5 text-left transition-all ${
              activeKPIFilter === 'assessments'
                ? 'border-[#6366f1] ring-2 ring-[#6366f1]/20'
                : 'border-[#e5e7eb] hover:border-[#6366f1]'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="font-['Arimo',sans-serif] text-[13px] text-[#6b7280]">
                Assessments Completed
              </span>
              <CheckCircle size={18} className="text-[#10b981]" />
            </div>
            <div className="text-[#111827] text-[28px] mb-1">
              6/8
            </div>
            <div className="w-full h-[4px] bg-[#e5e7eb] rounded-full overflow-hidden">
              <div className="h-full bg-[#10b981]" style={{ width: '75%' }} />
            </div>
          </button>

          <button
            onClick={() => setActiveKPIFilter(activeKPIFilter === 'interviews' ? null : 'interviews')}
            className={`bg-white rounded-[12px] border p-5 text-left transition-all ${
              activeKPIFilter === 'interviews'
                ? 'border-[#6366f1] ring-2 ring-[#6366f1]/20'
                : 'border-[#e5e7eb] hover:border-[#6366f1]'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="font-['Arimo',sans-serif] text-[13px] text-[#6b7280]">
                Interviews Scheduled
              </span>
              <Calendar size={18} className="text-[#6366f1]" />
            </div>
            <div className="text-[#111827] text-[28px] mb-1">
              4/8
            </div>
            <div className="w-full h-[4px] bg-[#e5e7eb] rounded-full overflow-hidden">
              <div className="h-full bg-[#6366f1]" style={{ width: '50%' }} />
            </div>
          </button>

          <button
            onClick={() => setActiveKPIFilter(activeKPIFilter === 'score' ? null : 'score')}
            className={`bg-white rounded-[12px] border p-5 text-left transition-all ${
              activeKPIFilter === 'score'
                ? 'border-[#6366f1] ring-2 ring-[#6366f1]/20'
                : 'border-[#e5e7eb] hover:border-[#6366f1]'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="font-['Arimo',sans-serif] text-[13px] text-[#6b7280]">
                Average Score
              </span>
              <TrendingUp size={18} className="text-[#10b981]" />
            </div>
            <div className="text-[#111827] text-[28px] mb-1">
              86.2
            </div>
            <span className="font-['Arimo',sans-serif] text-[12px] text-[#10b981]">
              +4.3 from average
            </span>
          </button>

          <button
            onClick={() => setActiveKPIFilter(activeKPIFilter === 'integrity' ? null : 'integrity')}
            className={`bg-white rounded-[12px] border p-5 text-left transition-all ${
              activeKPIFilter === 'integrity'
                ? 'border-[#ef4444] ring-2 ring-[#ef4444]/20'
                : 'border-[#e5e7eb] hover:border-[#ef4444]'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="font-['Arimo',sans-serif] text-[13px] text-[#6b7280]">
                Integrity Issues
              </span>
              <AlertCircle size={18} className="text-[#ef4444]" />
            </div>
            <div className="text-[#111827] text-[28px] mb-1">
              1
            </div>
            <span className="font-['Arimo',sans-serif] text-[12px] text-[#ef4444]">
              Requires attention
            </span>
          </button>
        </div>

        {/* Active Filter Indicator */}
        {(activeKPIFilter || selectedStep) && (
          <div className="bg-[#f5f3ff] border border-[#e5e7eb] rounded-[8px] p-3 mb-6 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Filter size={14} className="text-[#6366f1]" />
              <span className="font-['Arimo',sans-serif] text-[13px] text-[#374151]">
                Active filter: {activeKPIFilter || selectedStep} • Showing {filteredCandidates.length} candidates
              </span>
            </div>
            <button
              onClick={() => {
                setActiveKPIFilter(null);
                setSelectedStep(null);
              }}
              className="flex items-center gap-1 font-['Arimo',sans-serif] text-[13px] text-[#6366f1] hover:underline"
            >
              Clear filter
              <X size={14} />
            </button>
          </div>
        )}

        {/* Pipeline Timeline (Clickable Steps) */}
        <div className="bg-white rounded-[12px] border border-[#e5e7eb] p-6 mb-6">
          <h3 className="text-[#111827] text-[16px] mb-5">Pipeline Progress</h3>
          <div className="flex items-center justify-between gap-4">
            {pipelineSteps.map((step, index) => (
              <div key={step.id} className="flex-1">
                <button
                  onClick={() => setSelectedStep(selectedStep === step.id ? null : step.id)}
                  className="w-full group"
                >
                  <div className="relative mb-3">
                    <div className="flex justify-center">
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`w-[64px] h-[64px] rounded-full flex items-center justify-center transition-all cursor-pointer ${
                          selectedStep === step.id
                            ? 'ring-4 ring-[#6366f1]/30'
                            : ''
                        } ${
                          step.completed === step.total
                            ? 'bg-[#10b981]'
                            : step.completed > 0
                            ? 'bg-[#6366f1]'
                            : 'bg-[#f3f4f6]'
                        }`}
                      >
                        <div className="text-center">
                          <div className="text-white text-[18px]">
                            {step.completed}
                          </div>
                          <div className={`text-[11px] ${step.completed > 0 ? 'text-white/80' : 'text-[#6b7280]'}`}>
                            of {step.total}
                          </div>
                        </div>
                      </motion.div>
                    </div>
                    {index < pipelineSteps.length - 1 && (
                      <div className="absolute top-[32px] left-[calc(50%+32px)] w-[calc(100%-32px)] h-[2px] bg-[#e5e7eb]">
                        <div
                          className="h-full bg-[#6366f1] transition-all"
                          style={{ width: `${(step.completed / step.total) * 100}%` }}
                        />
                      </div>
                    )}
                  </div>
                  
                  <div className="text-center">
                    <div className="font-['Arimo',sans-serif] text-[13px] text-[#111827] mb-1">
                      {step.name}
                    </div>
                    <div className="font-['Arimo',sans-serif] text-[11px] text-[#6b7280]">
                      {step.pending} pending
                    </div>
                    <div className="mt-2 w-full h-[4px] bg-[#e5e7eb] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#6366f1] transition-all"
                        style={{ width: `${(step.completed / step.total) * 100}%` }}
                      />
                    </div>
                  </div>
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Candidate Matrix with Enhancements */}
        <div className="bg-white rounded-[12px] border border-[#e5e7eb] overflow-hidden">
          <div className="px-6 py-4 border-b border-[#e5e7eb] flex items-center justify-between">
            <h3 className="text-[#111827] text-[16px]">Candidate Progress Matrix</h3>
            {selectedCandidates.length > 0 && (
              <span className="font-['Arimo',sans-serif] text-[13px] text-[#6366f1]">
                {selectedCandidates.length} selected
              </span>
            )}
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#f9fafb] border-b border-[#e5e7eb]">
                <tr>
                  <th className="text-left p-4 w-[50px]">
                    <input
                      type="checkbox"
                      checked={selectedCandidates.length === filteredCandidates.length && filteredCandidates.length > 0}
                      onChange={toggleSelectAll}
                      className="w-[18px] h-[18px] rounded border-[#e5e7eb] text-[#6366f1]"
                    />
                  </th>
                  <th className="text-left p-4 w-[240px]">
                    <span className="font-['Arimo',sans-serif] text-[13px] text-[#6b7280]">
                      Candidate
                    </span>
                  </th>
                  <th className="text-center p-4">
                    <span className="font-['Arimo',sans-serif] text-[13px] text-[#6b7280]">
                      Assessment
                    </span>
                  </th>
                  <th className="text-center p-4">
                    <span className="font-['Arimo',sans-serif] text-[13px] text-[#6b7280]">
                      AI Interview
                    </span>
                  </th>
                  <th className="text-center p-4">
                    <span className="font-['Arimo',sans-serif] text-[13px] text-[#6b7280]">
                      Live Interview
                    </span>
                  </th>
                  <th className="text-center p-4">
                    <span className="font-['Arimo',sans-serif] text-[13px] text-[#6b7280]">
                      Review
                    </span>
                  </th>
                  <th className="text-center p-4">
                    <span className="font-['Arimo',sans-serif] text-[13px] text-[#6b7280]">
                      Offer
                    </span>
                  </th>
                  <th className="text-left p-4">
                    <span className="font-['Arimo',sans-serif] text-[13px] text-[#6b7280]">
                      Current Stage
                    </span>
                  </th>
                  <th className="text-center p-4 w-[80px]">
                    <span className="font-['Arimo',sans-serif] text-[13px] text-[#6b7280]">
                      Actions
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredCandidates.map((candidate) => (
                  <tr
                    key={candidate.id}
                    className="border-b border-[#e5e7eb] hover:bg-[#f9fafb] group transition-colors"
                  >
                    <td className="p-4">
                      <input
                        type="checkbox"
                        checked={selectedCandidates.includes(candidate.id)}
                        onChange={() => toggleSelectCandidate(candidate.id)}
                        className="w-[18px] h-[18px] rounded border-[#e5e7eb] text-[#6366f1]"
                      />
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-[36px] h-[36px] rounded-full bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] flex items-center justify-center flex-shrink-0">
                          <span className="font-['Arimo',sans-serif] text-[13px] text-white">
                            {candidate.avatar}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-['Arimo',sans-serif] text-[14px] text-[#111827] truncate">
                            {candidate.name}
                          </div>
                          {candidate.flags.length > 0 && (
                            <button
                              onClick={() => setShowSuspectReview(candidate.id)}
                              className="flex items-center gap-1 mt-1 hover:underline"
                            >
                              <AlertCircle size={12} className="text-[#ef4444]" />
                              <span className="font-['Arimo',sans-serif] text-[11px] text-[#ef4444]">
                                {candidate.flags.length} flag{candidate.flags.length > 1 ? 's' : ''}
                              </span>
                            </button>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-center">
                      <button
                        onClick={() => candidate.assessmentScore > 0 && setShowModuleDetail({ type: 'assessment', candidateId: candidate.id })}
                        className={`flex flex-col items-center gap-1 mx-auto ${candidate.assessmentScore > 0 ? 'hover:bg-[#f9fafb] rounded-[6px] p-2 transition-colors' : ''}`}
                      >
                        {getStatusIcon(candidate.assessment)}
                        {candidate.assessmentScore > 0 && (
                          <span className="font-['Arimo',sans-serif] text-[11px] text-[#6366f1] hover:underline">
                            {candidate.assessmentScore}%
                          </span>
                        )}
                      </button>
                    </td>
                    <td className="p-4 text-center">
                      <button
                        onClick={() => candidate.aiInterviewScore > 0 && setShowModuleDetail({ type: 'ai-interview', candidateId: candidate.id })}
                        className={`flex flex-col items-center gap-1 mx-auto ${candidate.aiInterviewScore > 0 ? 'hover:bg-[#f9fafb] rounded-[6px] p-2 transition-colors' : ''}`}
                      >
                        {getStatusIcon(candidate.aiInterview)}
                        {candidate.aiInterviewScore > 0 && (
                          <span className="font-['Arimo',sans-serif] text-[11px] text-[#6366f1] hover:underline">
                            {candidate.aiInterviewScore}%
                          </span>
                        )}
                      </button>
                    </td>
                    <td className="p-4 text-center">
                      {getStatusIcon(candidate.liveInterview)}
                    </td>
                    <td className="p-4 text-center">
                      {getStatusIcon(candidate.review)}
                    </td>
                    <td className="p-4 text-center">
                      {getStatusIcon(candidate.offer)}
                    </td>
                    <td className="p-4">
                      <span className={`px-[10px] py-[4px] rounded-[6px] font-['Arimo',sans-serif] text-[12px] ${
                        candidate.currentStage === 'Offer'
                          ? 'bg-[#dcfce7] text-[#10b981]'
                          : candidate.currentStage === 'Live Interview'
                          ? 'bg-[#dbeafe] text-[#3b82f6]'
                          : 'bg-[#f3f4f6] text-[#6b7280]'
                      }`}>
                        {candidate.currentStage}
                      </span>
                    </td>
                    <td className="p-4 text-center">
                      <div className="relative inline-block">
                        <button
                          className="w-[32px] h-[32px] flex items-center justify-center rounded-[6px] hover:bg-[#f9fafb] transition-colors"
                        >
                          <MoreVertical size={16} className="text-[#6b7280]" />
                        </button>
                        {/* Dropdown menu would go here */}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Activity Log */}
        <div className="bg-white rounded-[12px] border border-[#e5e7eb] p-6 mt-6">
          <div className="flex items-center gap-2 mb-4">
            <Activity size={18} className="text-[#6366f1]" />
            <h3 className="text-[#111827] text-[16px]">Recent Activity</h3>
          </div>
          <div className="space-y-3">
            {[
              { time: '2 mins ago', action: 'Sarah Chen completed Live Interview', user: 'John Doe' },
              { time: '15 mins ago', action: 'Assessment sent to Sophie Anderson', user: 'System' },
              { time: '1 hour ago', action: 'Emma Thompson scheduled for Live Interview', user: 'Jane Smith' },
              { time: '2 hours ago', action: 'Group created with 8 candidates', user: 'John Doe' }
            ].map((activity, index) => (
              <div key={index} className="flex items-start gap-3 pb-3 border-b border-[#e5e7eb] last:border-0">
                <div className="w-[6px] h-[6px] rounded-full bg-[#6366f1] mt-2" />
                <div className="flex-1">
                  <div className="font-['Arimo',sans-serif] text-[13px] text-[#111827]">
                    {activity.action}
                  </div>
                  <div className="font-['Arimo',sans-serif] text-[12px] text-[#6b7280] mt-1">
                    {activity.time} • by {activity.user}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Floating Bulk Action Bar */}
      <AnimatePresence>
        {selectedCandidates.length > 0 && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40"
          >
            <div className="bg-[#111827] rounded-[16px] shadow-2xl px-8 py-4 flex items-center gap-4">
              <span className="font-['Arimo',sans-serif] text-[14px] text-white">
                {selectedCandidates.length} candidate{selectedCandidates.length > 1 ? 's' : ''} selected
              </span>
              <div className="w-[1px] h-[24px] bg-white/20" />
              <button
                onClick={() => {
                  setShowSendAssessmentModal(true);
                }}
                className="h-[36px] px-[16px] rounded-[8px] bg-white/10 hover:bg-white/20 font-['Arimo',sans-serif] text-[13px] text-white transition-colors"
              >
                Send Assessment
              </button>
              <button
                onClick={() => {
                  setShowAutoScheduleModal(true);
                }}
                className="h-[36px] px-[16px] rounded-[8px] bg-white/10 hover:bg-white/20 font-['Arimo',sans-serif] text-[13px] text-white transition-colors"
              >
                Schedule Interview
              </button>
              <button
                onClick={() => {
                  setShowMoveStageModal(true);
                }}
                className="h-[36px] px-[16px] rounded-[8px] bg-[#10b981] hover:bg-[#059669] font-['Arimo',sans-serif] text-[13px] text-white transition-colors"
              >
                Move to Next Stage
              </button>
              <button
                onClick={() => setSelectedCandidates([])}
                className="w-[36px] h-[36px] flex items-center justify-center rounded-[8px] hover:bg-white/10 transition-colors"
              >
                <X size={18} className="text-white" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            className="fixed top-8 right-8 z-50"
          >
            <div className="bg-[#111827] text-white px-6 py-4 rounded-[12px] shadow-2xl flex items-center gap-3">
              <CheckCircle size={20} className="text-[#10b981]" />
              <span className="font-['Arimo',sans-serif] text-[14px]">
                {toastMessage}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Module Detail Modals */}
      <AnimatePresence>
        {showModuleDetail && (
          <>
            {showModuleDetail.type === 'assessment' && (
              <ModuleDetailAssessment
                candidateId={showModuleDetail.candidateId}
                candidateName={candidateStatuses.find(c => c.id === showModuleDetail.candidateId)?.name || ''}
                score={candidateStatuses.find(c => c.id === showModuleDetail.candidateId)?.assessmentScore || 0}
                completedDate={new Date().toLocaleDateString()}
                onClose={() => setShowModuleDetail(null)}
                onMoveToNextStage={() => {
                  setShowModuleDetail(null);
                  showToast('Candidate moved to next stage');
                }}
              />
            )}
            {showModuleDetail.type === 'ai-interview' && (
              <ModuleDetailAIInterview
                candidateId={showModuleDetail.candidateId}
                candidateName={candidateStatuses.find(c => c.id === showModuleDetail.candidateId)?.name || ''}
                score={candidateStatuses.find(c => c.id === showModuleDetail.candidateId)?.aiInterviewScore || 0}
                completedDate={new Date().toLocaleDateString()}
                onClose={() => setShowModuleDetail(null)}
                onMoveToNextStage={() => {
                  setShowModuleDetail(null);
                  showToast('Candidate moved to next stage');
                }}
              />
            )}
          </>
        )}
      </AnimatePresence>

      {/* Existing Modals... */}
      {/* Rank Group Modal */}
      {showRankModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-[16px] w-full max-w-[500px] p-6 animate-scaleIn">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[#111827] text-[18px]">Semantic Ranking</h3>
              <button onClick={() => setShowRankModal(false)}>
                <X size={20} className="text-[#6b7280]" />
              </button>
            </div>
            <p className="font-['Arimo',sans-serif] text-[14px] text-[#6b7280] mb-4">
              Run semantic scorer across the group to reorder candidates based on relevance.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowRankModal(false)}
                className="flex-1 h-[44px] rounded-[8px] border border-[#e5e7eb] bg-white hover:bg-[#f9fafb] font-['Arimo',sans-serif] text-[14px] text-[#374151] transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowRankModal(false);
                  showToast('Semantic ranking completed');
                }}
                className="flex-1 h-[44px] rounded-[8px] bg-[#6366f1] hover:bg-[#5558e3] font-['Arimo',sans-serif] text-[14px] text-white transition-colors"
              >
                Run Ranking
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Top N Modal */}
      {showTopNModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-[16px] w-full max-w-[500px] p-6 animate-scaleIn">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[#111827] text-[18px]">Find Top N by Criteria</h3>
              <button onClick={() => setShowTopNModal(false)}>
                <X size={20} className="text-[#6b7280]" />
              </button>
            </div>
            <div className="space-y-4 mb-4">
              <input
                type="text"
                placeholder='e.g., "Top 3 leadership + cloud"'
                className="w-full h-[44px] px-[14px] rounded-[8px] border border-[#e5e7eb] font-['Arimo',sans-serif] text-[14px] focus:outline-none focus:ring-2 focus:ring-[#6366f1] focus:border-transparent"
              />
              <select className="w-full h-[44px] px-[14px] rounded-[8px] border border-[#e5e7eb] font-['Arimo',sans-serif] text-[14px] focus:outline-none focus:ring-2 focus:ring-[#6366f1] focus:border-transparent bg-white">
                <option>Top 3 candidates</option>
                <option>Top 5 candidates</option>
                <option>Top 10 candidates</option>
              </select>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowTopNModal(false)}
                className="flex-1 h-[44px] rounded-[8px] border border-[#e5e7eb] bg-white hover:bg-[#f9fafb] font-['Arimo',sans-serif] text-[14px] text-[#374151] transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowTopNModal(false);
                  showToast('Top candidates identified');
                }}
                className="flex-1 h-[44px] rounded-[8px] bg-[#6366f1] hover:bg-[#5558e3] font-['Arimo',sans-serif] text-[14px] text-white transition-colors"
              >
                Find Top Candidates
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Send Assessment Modal */}
      {showSendAssessmentModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-[16px] w-full max-w-[500px] p-6 animate-scaleIn">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[#111827] text-[18px]">Send Assessments</h3>
              <button onClick={() => setShowSendAssessmentModal(false)}>
                <X size={20} className="text-[#6b7280]" />
              </button>
            </div>
            <p className="font-['Arimo',sans-serif] text-[14px] text-[#6b7280] mb-4">
              Send assessments to {selectedCandidates.length > 0 ? `${selectedCandidates.length} selected candidates` : 'all candidates'}.
            </p>
            <select className="w-full h-[44px] px-[14px] rounded-[8px] border border-[#e5e7eb] font-['Arimo',sans-serif] text-[14px] mb-4 bg-white">
              <option>Technical Assessment - React</option>
              <option>Technical Assessment - Full Stack</option>
              <option>General Aptitude Test</option>
            </select>
            <div className="flex gap-3">
              <button
                onClick={() => setShowSendAssessmentModal(false)}
                className="flex-1 h-[44px] rounded-[8px] border border-[#e5e7eb] bg-white hover:bg-[#f9fafb] font-['Arimo',sans-serif] text-[14px] text-[#374151] transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowSendAssessmentModal(false);
                  showToast(`Assessment sent to ${selectedCandidates.length > 0 ? selectedCandidates.length : candidateStatuses.length} candidates`);
                  setSelectedCandidates([]);
                }}
                className="flex-1 h-[44px] rounded-[8px] bg-[#6366f1] hover:bg-[#5558e3] font-['Arimo',sans-serif] text-[14px] text-white transition-colors"
              >
                Send Assessment
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Auto Schedule Modal */}
      {showAutoScheduleModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-[16px] w-full max-w-[500px] p-6 animate-scaleIn">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[#111827] text-[18px]">Schedule AI Interviews</h3>
              <button onClick={() => setShowAutoScheduleModal(false)}>
                <X size={20} className="text-[#6b7280]" />
              </button>
            </div>
            <p className="font-['Arimo',sans-serif] text-[14px] text-[#6b7280] mb-4">
              Auto-schedule interviews for {selectedCandidates.length > 0 ? `${selectedCandidates.length} selected candidates` : 'all candidates'}.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowAutoScheduleModal(false)}
                className="flex-1 h-[44px] rounded-[8px] border border-[#e5e7eb] bg-white hover:bg-[#f9fafb] font-['Arimo',sans-serif] text-[14px] text-[#374151] transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowAutoScheduleModal(false);
                  showToast(`Interviews scheduled for ${selectedCandidates.length > 0 ? selectedCandidates.length : candidateStatuses.length} candidates`);
                  setSelectedCandidates([]);
                }}
                className="flex-1 h-[44px] rounded-[8px] bg-[#6366f1] hover:bg-[#5558e3] font-['Arimo',sans-serif] text-[14px] text-white transition-colors"
              >
                Schedule Interviews
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Move to Next Stage Modal with Rule Builder */}
      {showMoveStageModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-[16px] w-full max-w-[600px] p-6 animate-scaleIn">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[#111827] text-[18px]">Move to Next Stage</h3>
              <button onClick={() => setShowMoveStageModal(false)}>
                <X size={20} className="text-[#6b7280]" />
              </button>
            </div>
            <p className="font-['Arimo',sans-serif] text-[14px] text-[#6b7280] mb-4">
              Move {selectedCandidates.length > 0 ? `${selectedCandidates.length} selected candidates` : 'candidates'} to the next pipeline stage.
            </p>

            {/* Rule Builder */}
            <div className="bg-[#f9fafb] border border-[#e5e7eb] rounded-[12px] p-4 mb-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-['Arimo',sans-serif] text-[14px] text-[#111827]">
                  Auto-Advance Rule
                </h4>
                <button
                  onClick={() => setShowRuleBuilderModal(!showRuleBuilderModal)}
                  className="font-['Arimo',sans-serif] text-[12px] text-[#6366f1] hover:underline"
                >
                  {showRuleBuilderModal ? 'Hide' : 'Edit Rule'}
                </button>
              </div>
              
              {showRuleBuilderModal && (
                <div className="space-y-3">
                  <div className="bg-white border border-[#e5e7eb] rounded-[8px] p-3">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-['Arimo',sans-serif] text-[13px] text-[#6b7280]">IF</span>
                      <select className="h-[32px] px-[10px] rounded-[6px] border border-[#e5e7eb] font-['Arimo',sans-serif] text-[13px] bg-white">
                        <option>Assessment Score</option>
                        <option>AI Interview Score</option>
                        <option>Flags</option>
                      </select>
                      <select className="h-[32px] px-[10px] rounded-[6px] border border-[#e5e7eb] font-['Arimo',sans-serif] text-[13px] bg-white">
                        <option>&gt;=</option>
                        <option>&gt;</option>
                        <option>=</option>
                        <option>&lt;</option>
                        <option>&lt;=</option>
                      </select>
                      <input
                        type="number"
                        defaultValue="80"
                        className="w-[80px] h-[32px] px-[10px] rounded-[6px] border border-[#e5e7eb] font-['Arimo',sans-serif] text-[13px]"
                      />
                      <span className="font-['Arimo',sans-serif] text-[13px] text-[#6b7280]">AND</span>
                      <select className="h-[32px] px-[10px] rounded-[6px] border border-[#e5e7eb] font-['Arimo',sans-serif] text-[13px] bg-white">
                        <option>Flags</option>
                        <option>Assessment Score</option>
                      </select>
                      <select className="h-[32px] px-[10px] rounded-[6px] border border-[#e5e7eb] font-['Arimo',sans-serif] text-[13px] bg-white">
                        <option>== none</option>
                        <option>&gt; 0</option>
                      </select>
                    </div>
                  </div>
                  <div className="bg-white border border-[#e5e7eb] rounded-[8px] p-3">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-['Arimo',sans-serif] text-[13px] text-[#6b7280]">THEN Move to</span>
                      <select className="h-[32px] px-[10px] rounded-[6px] border border-[#e5e7eb] font-['Arimo',sans-serif] text-[13px] bg-white">
                        <option>AI Interview</option>
                        <option>Live Interview</option>
                        <option>Review</option>
                        <option>Offer</option>
                      </select>
                    </div>
                  </div>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      className="w-[16px] h-[16px] rounded border-[#e5e7eb] text-[#6366f1]"
                    />
                    <span className="font-['Arimo',sans-serif] text-[13px] text-[#374151]">
                      Save as auto-advance rule for this group
                    </span>
                  </label>
                </div>
              )}
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowMoveStageModal(false)}
                className="flex-1 h-[44px] rounded-[8px] border border-[#e5e7eb] bg-white hover:bg-[#f9fafb] font-['Arimo',sans-serif] text-[14px] text-[#374151] transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowMoveStageModal(false);
                  showToast(`${selectedCandidates.length || candidateStatuses.length} candidates will be advanced`);
                  setSelectedCandidates([]);
                }}
                className="flex-1 h-[44px] rounded-[8px] bg-[#10b981] hover:bg-[#059669] font-['Arimo',sans-serif] text-[14px] text-white transition-colors"
              >
                Move Candidates
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Flagged Batch Review Modal */}
      {showFlaggedBatch && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-[16px] w-full max-w-[500px] p-6 animate-scaleIn">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[#111827] text-[18px]">Flagged Candidates</h3>
              <button onClick={() => setShowFlaggedBatch(false)}>
                <X size={20} className="text-[#6b7280]" />
              </button>
            </div>
            <div className="space-y-2 mb-4">
              {candidateStatuses.filter(c => c.flags.length > 0).map(candidate => (
                <button
                  key={candidate.id}
                  onClick={() => {
                    setShowFlaggedBatch(false);
                    setShowSuspectReview(candidate.id);
                  }}
                  className="w-full flex items-center justify-between p-4 border border-[#e5e7eb] rounded-[12px] hover:border-[#6366f1] hover:bg-[#f9fafb] transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-[36px] h-[36px] rounded-full bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] flex items-center justify-center">
                      <span className="font-['Arimo',sans-serif] text-[13px] text-white">
                        {candidate.avatar}
                      </span>
                    </div>
                    <div className="text-left">
                      <div className="font-['Arimo',sans-serif] text-[14px] text-[#111827]">
                        {candidate.name}
                      </div>
                      <div className="flex items-center gap-1">
                        <AlertCircle size={12} className="text-[#ef4444]" />
                        <span className="font-['Arimo',sans-serif] text-[11px] text-[#ef4444]">
                          {candidate.flags.length} flag{candidate.flags.length > 1 ? 's' : ''}
                        </span>
                      </div>
                    </div>
                  </div>
                  <ChevronLeft size={16} className="text-[#6b7280] rotate-180" />
                </button>
              ))}
            </div>
            <button
              onClick={() => setShowFlaggedBatch(false)}
              className="w-full h-[40px] rounded-[8px] border border-[#e5e7eb] bg-white hover:bg-[#f9fafb] font-['Arimo',sans-serif] text-[14px] text-[#374151] transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}

      <style>{`
        @keyframes scaleIn {
          from {
            transform: scale(0.95);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
        .animate-scaleIn {
          animation: scaleIn 200ms ease-out;
        }
      `}</style>

      {/* AI Interview Settings Modal */}
      {showAIInterviewSettingsModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-[16px] w-full max-w-[600px] p-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-[#111827] text-[20px]">AI Interview Settings</h3>
              <button
                onClick={() => setShowAIInterviewSettingsModal(false)}
                className="w-[32px] h-[32px] flex items-center justify-center rounded-[6px] hover:bg-[#f3f4f6] transition-colors"
              >
                <X size={18} className="text-[#6b7280]" />
              </button>
            </div>

            <p className="font-['Arimo',sans-serif] text-[14px] text-[#6b7280] mb-6">
              Choose the type of AI interview to set up for this group
            </p>

            <div className="space-y-4">
              <button
                onClick={() => {
                  setShowAIInterviewSettingsModal(false);
                  if (onOpenRecordedAISetup) {
                    onOpenRecordedAISetup();
                  }
                }}
                className="w-full flex items-center gap-4 p-6 rounded-[12px] border-2 border-[#e5e7eb] hover:border-[#8b5cf6] hover:bg-[#f9fafb] transition-all text-left"
              >
                <div className="w-[56px] h-[56px] rounded-[10px] bg-[#f3e8ff] flex items-center justify-center flex-shrink-0">
                  <Calendar size={28} className="text-[#8b5cf6]" />
                </div>
                <div className="flex-1">
                  <h4 className="font-['Arimo',sans-serif] text-[16px] text-[#111827] mb-1">
                    Recorded Interview
                  </h4>
                  <p className="font-['Arimo',sans-serif] text-[13px] text-[#6b7280]">
                    Asynchronous video responses analyzed by AI
                  </p>
                </div>
              </button>

              <button
                onClick={() => {
                  setShowAIInterviewSettingsModal(false);
                  if (onOpenLiveAISetup) {
                    onOpenLiveAISetup();
                  }
                }}
                className="w-full flex items-center gap-4 p-6 rounded-[12px] border-2 border-[#e5e7eb] hover:border-[#6366f1] hover:bg-[#f9fafb] transition-all text-left"
              >
                <div className="w-[56px] h-[56px] rounded-[10px] bg-[#ede9fe] flex items-center justify-center flex-shrink-0">
                  <Activity size={28} className="text-[#6366f1]" />
                </div>
                <div className="flex-1">
                  <h4 className="font-['Arimo',sans-serif] text-[16px] text-[#111827] mb-1">
                    Live AI Interview
                  </h4>
                  <p className="font-['Arimo',sans-serif] text-[13px] text-[#6b7280]">
                    Real-time AI-conducted interviews with dynamic questioning
                  </p>
                </div>
              </button>
            </div>

            <button
              onClick={() => setShowAIInterviewSettingsModal(false)}
              className="w-full h-[44px] rounded-[8px] border border-[#e5e7eb] hover:bg-[#f9fafb] font-['Arimo',sans-serif] text-[14px] text-[#374151] transition-colors mt-6"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
