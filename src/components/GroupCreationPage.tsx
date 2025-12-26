import { useState, useMemo } from 'react';
import { Search, Sparkles, Filter, X, ChevronDown, Check, User, MapPin, Briefcase, Star, ArrowUpDown, Users, Sliders } from 'lucide-react';
import { Switch } from './ui/switch';
import { Badge } from './ui/badge';
import { AdvancedFilterDrawer } from './AdvancedFilterDrawer';

interface Candidate {
  id: number;
  name: string;
  email: string;
  experience: number;
  location: string;
  skills: string[];
  match: number;
  aiScore?: number;
  starred: boolean;
}

interface GroupCreationPageProps {
  positionTitle: string;
  onCancel: () => void;
  onCreate: (groupData: { 
    name: string; 
    candidateIds: number[];
    aiRankingUsed: boolean;
    nlpQuery?: string;
  }) => void;
}

export function GroupCreationPage({ 
  positionTitle, 
  onCancel, 
  onCreate 
}: GroupCreationPageProps) {
  // Mock candidate data - Comprehensive
  const allCandidates: Candidate[] = [
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
    { id: 18, name: 'Sofia Rodriguez', email: 'sofia.r@email.com', experience: 7, location: 'Austin, TX', skills: ['Python', 'Django', 'PostgreSQL', 'AWS'], match: 86, starred: false },
    { id: 19, name: 'Alex Turner', email: 'aturner@email.com', experience: 5, location: 'Seattle, WA', skills: ['React', 'Redux', 'Node.js', 'MongoDB'], match: 83, starred: false },
    { id: 20, name: 'Nina Patel', email: 'npatel@email.com', experience: 11, location: 'Boston, MA', skills: ['Angular', 'TypeScript', 'RxJS', '.NET'], match: 80, starred: false },
    { id: 21, name: 'Jordan Brooks', email: 'jbrooks@email.com', experience: 4, location: 'Los Angeles, CA', skills: ['Vue.js', 'JavaScript', 'Firebase', 'Nuxt'], match: 77, starred: false },
    { id: 22, name: 'Emma Wilson', email: 'ewilson@email.com', experience: 8, location: 'Chicago, IL', skills: ['React', 'TypeScript', 'Next.js', 'Tailwind'], match: 74, starred: false },
    { id: 23, name: 'Liam Foster', email: 'lfoster@email.com', experience: 6, location: 'Denver, CO', skills: ['Go', 'Docker', 'Kubernetes', 'gRPC'], match: 71, starred: false },
    { id: 24, name: 'Olivia Martinez', email: 'omartinez@email.com', experience: 3, location: 'Miami, FL', skills: ['JavaScript', 'React', 'CSS', 'HTML'], match: 68, starred: false },
    { id: 25, name: 'Ethan Cooper', email: 'ecooper@email.com', experience: 10, location: 'San Francisco, CA', skills: ['Python', 'FastAPI', 'PostgreSQL', 'Redis'], match: 65, starred: false },
    { id: 26, name: 'Ava Thompson', email: 'athompson@email.com', experience: 5, location: 'Portland, OR', skills: ['React', 'GraphQL', 'Apollo', 'TypeScript'], match: 62, starred: false },
    { id: 27, name: 'Noah Anderson', email: 'nanderson@email.com', experience: 7, location: 'Atlanta, GA', skills: ['Java', 'Spring', 'MySQL', 'AWS'], match: 59, starred: false },
    { id: 28, name: 'Isabella Lee', email: 'ilee@email.com', experience: 9, location: 'Seattle, WA', skills: ['TypeScript', 'Node.js', 'Express', 'MongoDB'], match: 56, starred: false },
    { id: 29, name: 'Mason Garcia', email: 'mgarcia@email.com', experience: 4, location: 'Austin, TX', skills: ['React', 'JavaScript', 'Firebase', 'Tailwind'], match: 53, starred: false },
    { id: 30, name: 'Sophia White', email: 'swhite@email.com', experience: 6, location: 'New York, NY', skills: ['Angular', 'TypeScript', 'NgRx', 'Node.js'], match: 50, starred: false },
  ];

  // Filters
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [advancedFilters, setAdvancedFilters] = useState<any>({});
  const [activeFilterCount, setActiveFilterCount] = useState(0);

  // AI Features
  const [aiRankingEnabled, setAiRankingEnabled] = useState(false);
  const [nlpQuery, setNlpQuery] = useState('');
  const [isAiProcessing, setIsAiProcessing] = useState(false);

  // Selection
  const [selectedCandidates, setSelectedCandidates] = useState<Set<number>>(new Set());
  const [customBulkNumber, setCustomBulkNumber] = useState('');
  const [showCustomInput, setShowCustomInput] = useState(false);

  // Group Details
  const [groupName, setGroupName] = useState('');

  // Apply manual filters from advanced drawer
  const filteredCandidates = useMemo(() => {
    let filtered = [...allCandidates];
    // Apply advanced filters logic here when implemented
    // For now, return all candidates
    return filtered;
  }, [advancedFilters]);

  // Apply AI ranking
  const displayCandidates = useMemo(() => {
    if (!aiRankingEnabled) {
      return filteredCandidates;
    }

    // Simulate AI ranking by adding AI scores and reordering
    const withAiScores = filteredCandidates.map(c => ({
      ...c,
      aiScore: c.match + Math.floor(Math.random() * 10) - 5 // Simulate AI adjustment
    }));

    return withAiScores.sort((a, b) => (b.aiScore || b.match) - (a.aiScore || a.match));
  }, [filteredCandidates, aiRankingEnabled]);

  const handleAiEnhance = () => {
    if (!nlpQuery.trim()) return;
    
    setIsAiProcessing(true);
    setTimeout(() => {
      setAiRankingEnabled(true);
      setIsAiProcessing(false);
    }, 1500);
  };

  const toggleSkillFilter = (skill: string) => {
    setSkillsFilter(prev => 
      prev.includes(skill) 
        ? prev.filter(s => s !== skill)
        : [...prev, skill]
    );
  };

  const toggleCandidateSelection = (id: number) => {
    setSelectedCandidates(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const selectTopN = (n: number) => {
    const topIds = displayCandidates.slice(0, n).map(c => c.id);
    setSelectedCandidates(new Set(topIds));
  };

  const handleCustomBulkSelect = () => {
    const n = parseInt(customBulkNumber);
    if (!isNaN(n) && n > 0) {
      selectTopN(n);
      setShowCustomInput(false);
      setCustomBulkNumber('');
    }
  };

  const handleCreateGroup = () => {
    if (!groupName.trim() || selectedCandidates.size === 0) return;

    onCreate({
      name: groupName,
      candidateIds: Array.from(selectedCandidates),
      aiRankingUsed: aiRankingEnabled,
      nlpQuery: nlpQuery || undefined
    });
  };

  const getMatchColor = (score: number) => {
    if (score >= 80) return '#10b981';
    if (score >= 60) return '#f59e0b';
    return '#ffa366';
  };

  return (
    <div className="h-full w-full bg-[#edf0f8] flex flex-col">
      {/* Top Section - Discovery Engine */}
      <div className="bg-white border-b border-[#e5e7eb] px-8 py-6">
        <div className="mb-6">
          <h2 className="text-[#111827] mb-1">
            Create Candidate Group
          </h2>
          <p className="font-['Arimo',sans-serif] text-[14px] text-[#6b7280]">
            for {positionTitle}
          </p>
        </div>

        {/* Zone A: Manual Filters */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <Filter size={16} className="text-[#6366f1]" />
            <span className="font-['Arimo',sans-serif] text-[13px] text-[#374151]">
              Manual Filters
            </span>
          </div>
          <div>
            {/* Advanced Filters Button - Prominent */}
            <button
              onClick={() => setShowAdvancedFilters(true)}
              className="h-[44px] px-[20px] rounded-[8px] bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] hover:from-[#5558e3] hover:to-[#7c3aed] font-['Arimo',sans-serif] text-[14px] text-white flex items-center gap-2 transition-all shadow-md hover:shadow-lg"
            >
              <Sliders size={18} />
              Open Advanced Filters
              {activeFilterCount > 0 && (
                <Badge className="bg-white text-[#6366f1] h-[20px] px-[7px] text-[11px]">{activeFilterCount}</Badge>
              )}
            </button>
          </div>
        </div>

        {/* Zone B: AI Power */}
        <div className="border-t border-[#e5e7eb] pt-6">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles size={16} className="text-[#10b981]" />
            <span className="font-['Arimo',sans-serif] text-[13px] text-[#374151]">
              AI Enhancement
            </span>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-[14px] h-[36px] rounded-[8px] bg-[#f0fdf4] border border-[#bbf7d0]">
              <span className="font-['Arimo',sans-serif] text-[13px] text-[#15803d]">
                AI Semantic Rerank
              </span>
              <Switch
                checked={aiRankingEnabled}
                onCheckedChange={setAiRankingEnabled}
              />
            </div>
            <div className="flex-1 flex items-center gap-2">
              <div className="flex-1 relative">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6b7280]" />
                <input
                  type="text"
                  value={nlpQuery}
                  onChange={(e) => setNlpQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleAiEnhance()}
                  placeholder="e.g., 'Find Java experts with fintech background'"
                  className="w-full h-[36px] pl-[36px] pr-[14px] rounded-[8px] border border-[#e5e7eb] font-['Arimo',sans-serif] text-[13px] focus:outline-none focus:ring-2 focus:ring-[#6366f1] focus:border-transparent"
                />
              </div>
              <button
                onClick={handleAiEnhance}
                disabled={!nlpQuery.trim() || isAiProcessing}
                className="h-[36px] px-[16px] rounded-[8px] bg-[#10b981] hover:bg-[#059669] disabled:bg-[#d1d5db] disabled:cursor-not-allowed font-['Arimo',sans-serif] text-[13px] text-white flex items-center gap-2 transition-colors"
              >
                {isAiProcessing ? (
                  <>
                    <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Sparkles size={14} />
                    Enhance
                  </>
                )}
              </button>
            </div>
          </div>
          {aiRankingEnabled && nlpQuery && (
            <div className="mt-3 px-[14px] py-[8px] rounded-[8px] bg-[#f0fdf4] border border-[#bbf7d0]">
              <p className="font-['Arimo',sans-serif] text-[12px] text-[#15803d]">
                ✓ AI ranking active for query: "{nlpQuery}"
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Middle Section - Candidate Grid */}
      <div className="flex-1 overflow-auto px-8 py-6">
        {/* Bulk Selection Toolbar */}
        <div className="bg-white rounded-[12px] border border-[#e5e7eb] p-4 mb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-['Arimo',sans-serif] text-[13px] text-[#6b7280]">
                Quick Select:
              </span>
              <button
                onClick={() => selectTopN(10)}
                className="h-[32px] px-[12px] rounded-[6px] bg-[#f3f4f6] hover:bg-[#e5e7eb] font-['Arimo',sans-serif] text-[12px] text-[#374151] transition-colors"
              >
                Top 10
              </button>
              <button
                onClick={() => selectTopN(50)}
                className="h-[32px] px-[12px] rounded-[6px] bg-[#f3f4f6] hover:bg-[#e5e7eb] font-['Arimo',sans-serif] text-[12px] text-[#374151] transition-colors"
              >
                Top 50
              </button>
              {showCustomInput ? (
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={customBulkNumber}
                    onChange={(e) => setCustomBulkNumber(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleCustomBulkSelect()}
                    placeholder="N"
                    className="w-[60px] h-[32px] px-[8px] rounded-[6px] border border-[#e5e7eb] font-['Arimo',sans-serif] text-[12px] focus:outline-none focus:ring-2 focus:ring-[#6366f1]"
                    autoFocus
                  />
                  <button
                    onClick={handleCustomBulkSelect}
                    className="h-[32px] px-[12px] rounded-[6px] bg-[#6366f1] hover:bg-[#5558e3] font-['Arimo',sans-serif] text-[12px] text-white transition-colors"
                  >
                    Select
                  </button>
                  <button
                    onClick={() => {
                      setShowCustomInput(false);
                      setCustomBulkNumber('');
                    }}
                    className="h-[32px] px-[8px] rounded-[6px] hover:bg-[#f3f4f6] transition-colors"
                  >
                    <X size={14} className="text-[#6b7280]" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setShowCustomInput(true)}
                  className="h-[32px] px-[12px] rounded-[6px] bg-[#f3f4f6] hover:bg-[#e5e7eb] font-['Arimo',sans-serif] text-[12px] text-[#374151] transition-colors"
                >
                  Custom N
                </button>
              )}
            </div>
            <div className="flex items-center gap-2">
              <span className="font-['Arimo',sans-serif] text-[13px] text-[#6b7280]">
                {selectedCandidates.size} selected
              </span>
              {selectedCandidates.size > 0 && (
                <button
                  onClick={() => setSelectedCandidates(new Set())}
                  className="h-[32px] px-[12px] rounded-[6px] border border-[#e5e7eb] hover:bg-[#fef2f2] hover:border-[#ef4444] font-['Arimo',sans-serif] text-[12px] text-[#ef4444] transition-colors"
                >
                  Clear Selection
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Results Summary */}
        <div className="mb-4 flex items-center justify-between">
          <p className="font-['Arimo',sans-serif] text-[14px] text-[#6b7280]">
            Showing {displayCandidates.length} candidates
          </p>
          {aiRankingEnabled && (
            <div className="flex items-center gap-2 px-[12px] py-[6px] rounded-[6px] bg-[#f0fdf4] border border-[#bbf7d0]">
              <Sparkles size={14} className="text-[#10b981]" />
              <span className="font-['Arimo',sans-serif] text-[12px] text-[#15803d]">
                AI Ranked
              </span>
            </div>
          )}
        </div>

        {/* Candidates Table */}
        <div className="bg-white rounded-[12px] border border-[#e5e7eb] overflow-hidden">
          <table className="w-full">
            <thead className="bg-[#f9fafb] border-b border-[#e5e7eb]">
              <tr>
                <th className="w-[50px] px-4 py-3"></th>
                <th className="text-left px-4 py-3 font-['Arimo',sans-serif] text-[12px] text-[#6b7280]">
                  <div className="flex items-center gap-2">
                    <User size={14} />
                    Candidate
                  </div>
                </th>
                <th className="text-left px-4 py-3 font-['Arimo',sans-serif] text-[12px] text-[#6b7280]">
                  <div className="flex items-center gap-2">
                    <Briefcase size={14} />
                    Experience
                  </div>
                </th>
                <th className="text-left px-4 py-3 font-['Arimo',sans-serif] text-[12px] text-[#6b7280]">
                  <div className="flex items-center gap-2">
                    <MapPin size={14} />
                    Location
                  </div>
                </th>
                <th className="text-left px-4 py-3 font-['Arimo',sans-serif] text-[12px] text-[#6b7280]">
                  Skills
                </th>
                <th className="text-left px-4 py-3 font-['Arimo',sans-serif] text-[12px] text-[#6b7280]">
                  <div className={`flex items-center gap-2 ${aiRankingEnabled ? 'text-[#10b981]' : ''}`}>
                    <ArrowUpDown size={14} />
                    {aiRankingEnabled ? 'AI Score' : 'Match Score'}
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {displayCandidates.map((candidate, index) => (
                <tr
                  key={candidate.id}
                  className={`border-b border-[#e5e7eb] hover:bg-[#f9fafb] transition-colors cursor-pointer ${
                    selectedCandidates.has(candidate.id) ? 'bg-[#eef2ff]' : ''
                  }`}
                  onClick={() => toggleCandidateSelection(candidate.id)}
                >
                  <td className="px-4 py-3">
                    <input
                      type="checkbox"
                      checked={selectedCandidates.has(candidate.id)}
                      onChange={() => toggleCandidateSelection(candidate.id)}
                      className="w-4 h-4 rounded border-[#d1d5db] text-[#6366f1] focus:ring-[#6366f1]"
                      onClick={(e) => e.stopPropagation()}
                    />
                  </td>
                  <td className="px-4 py-3">
                    <div>
                      <div className="font-['Arimo',sans-serif] text-[13px] text-[#111827]">
                        {candidate.name}
                      </div>
                      <div className="font-['Arimo',sans-serif] text-[12px] text-[#6b7280]">
                        {candidate.email}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="font-['Arimo',sans-serif] text-[13px] text-[#374151]">
                      {candidate.experience} years
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="font-['Arimo',sans-serif] text-[13px] text-[#374151]">
                      {candidate.location}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-1">
                      {candidate.skills.slice(0, 3).map((skill, i) => (
                        <span
                          key={i}
                          className="px-[8px] py-[2px] rounded-[4px] bg-[#f3f4f6] font-['Arimo',sans-serif] text-[11px] text-[#374151]"
                        >
                          {skill}
                        </span>
                      ))}
                      {candidate.skills.length > 3 && (
                        <span className="px-[8px] py-[2px] rounded-[4px] bg-[#f3f4f6] font-['Arimo',sans-serif] text-[11px] text-[#6b7280]">
                          +{candidate.skills.length - 3}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-[60px] h-[8px] rounded-full bg-[#e5e7eb] overflow-hidden"
                      >
                        <div
                          className="h-full transition-all"
                          style={{
                            width: `${candidate.aiScore || candidate.match}%`,
                            backgroundColor: getMatchColor(candidate.aiScore || candidate.match)
                          }}
                        />
                      </div>
                      <span
                        className="font-['Arimo',sans-serif] text-[13px] min-w-[35px]"
                        style={{ color: getMatchColor(candidate.aiScore || candidate.match) }}
                      >
                        {candidate.aiScore || candidate.match}%
                      </span>
                      {aiRankingEnabled && candidate.aiScore && candidate.aiScore !== candidate.match && (
                        <span className="font-['Arimo',sans-serif] text-[11px] text-[#10b981]">
                          ↑
                        </span>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {displayCandidates.length === 0 && (
          <div className="bg-white rounded-[12px] border border-[#e5e7eb] p-12 text-center">
            <p className="font-['Arimo',sans-serif] text-[14px] text-[#6b7280]">
              No candidates match your current filters
            </p>
          </div>
        )}
      </div>

      {/* Bottom Section - Sticky Footer */}
      <div className="bg-white border-t border-[#e5e7eb] px-8 py-5">
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <label className="block font-['Arimo',sans-serif] text-[12px] text-[#6b7280] mb-2">
              Group Name
            </label>
            <input
              type="text"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              placeholder="e.g., Senior Backend Engineers - Q1 2025"
              className="w-full h-[44px] px-[16px] rounded-[8px] border border-[#e5e7eb] font-['Arimo',sans-serif] text-[14px] focus:outline-none focus:ring-2 focus:ring-[#6366f1] focus:border-transparent"
            />
          </div>
          <div className="flex items-center gap-3 pt-6">
            <div className="text-right">
              <div className="font-['Arimo',sans-serif] text-[12px] text-[#6b7280]">
                Selected Candidates
              </div>
              <div className="text-[#111827]">
                {selectedCandidates.size}
              </div>
            </div>
            <button
              onClick={onCancel}
              className="h-[44px] px-[24px] rounded-[8px] border border-[#e5e7eb] bg-white hover:bg-[#f9fafb] font-['Arimo',sans-serif] text-[14px] text-[#374151] transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleCreateGroup}
              disabled={!groupName.trim() || selectedCandidates.size === 0}
              className="h-[44px] px-[24px] rounded-[8px] bg-[#6366f1] hover:bg-[#5558e3] disabled:bg-[#d1d5db] disabled:cursor-not-allowed font-['Arimo',sans-serif] text-[14px] text-white transition-colors flex items-center gap-2"
            >
              <Users size={16} />
              Create Group
            </button>
          </div>
        </div>
      </div>

      {/* Advanced Filter Drawer */}
      {showAdvancedFilters && (
        <AdvancedFilterDrawer
          onClose={() => setShowAdvancedFilters(false)}
          onApply={(filters) => {
            setAdvancedFilters(filters);
            setShowAdvancedFilters(false);
            // Count active filters
            let count = 0;
            if (filters.fullName) count++;
            if (filters.email) count++;
            if (filters.location) count++;
            if (filters.school) count++;
            if (filters.company) count++;
            if (filters.techStack?.length > 0) count++;
            if (filters.seniority?.length > 0) count++;
            if (filters.degree?.length > 0) count++;
            setActiveFilterCount(count);
          }}
          activeFilters={advancedFilters}
        />
      )}
    </div>
  );
}