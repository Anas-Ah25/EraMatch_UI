import { useState } from 'react';
import { ChevronLeft, Github, Linkedin, Mail, Phone, MapPin, Calendar, AlertTriangle, FileText, Video, BarChart3, Network, MessageSquare, Download } from 'lucide-react';

interface CandidateProfileProps {
  candidateId: number;
  onBack: () => void;
  onViewKnowledgeGraph: () => void;
}

type TabType = 'overview' | 'resume' | 'github' | 'linkedin' | 'assessment' | 'interview' | 'notes' | 'knowledge-graph';

export function CandidateProfile({ candidateId, onBack, onViewKnowledgeGraph }: CandidateProfileProps) {
  const [activeTab, setActiveTab] = useState<TabType>('overview');

  // Mock candidate data
  const candidate = {
    id: candidateId,
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
    scores: {
      overall: 95,
      assessment: 95,
      aiInterview: 92,
      github: 88,
      linkedin: 95
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

  const tabs = [
    { id: 'overview', label: 'Overview', icon: FileText },
    { id: 'resume', label: 'Resume', icon: FileText },
    { id: 'github', label: 'GitHub', icon: Github },
    { id: 'linkedin', label: 'LinkedIn', icon: Linkedin },
    { id: 'assessment', label: 'Assessment', icon: BarChart3 },
    { id: 'interview', label: 'AI Interview', icon: Video },
    { id: 'notes', label: 'Notes', icon: MessageSquare },
    { id: 'knowledge-graph', label: 'Knowledge Graph', icon: Network }
  ];

  return (
    <div className="h-full w-full overflow-auto bg-[#f9fafb]">
      <div className="max-w-[1400px] mx-auto px-[48px] py-[24px]">
        {/* Header */}
        <button
          onClick={onBack}
          className="flex items-center gap-2 mb-6 text-[#6b7280] hover:text-[#111827] transition-colors"
        >
          <ChevronLeft size={20} />
          <span className="font-['Arimo',sans-serif] text-[14px]">Back</span>
        </button>

        {/* Profile Header */}
        <div className="bg-white rounded-[12px] border border-[#e5e7eb] p-8 mb-6">
          <div className="flex items-start gap-6">
            <div className="w-[100px] h-[100px] rounded-[16px] bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] flex items-center justify-center text-white text-[36px]">
              {candidate.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div className="flex-1">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-[#111827] mb-1">{candidate.name}</h1>
                  <p className="font-['Arimo',sans-serif] text-[16px] text-[#6b7280] mb-3">
                    {candidate.title}
                  </p>
                  <div className="flex items-center gap-4 flex-wrap">
                    <div className="flex items-center gap-2 text-[#6b7280]">
                      <Mail size={16} />
                      <span className="font-['Arimo',sans-serif] text-[14px]">{candidate.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-[#6b7280]">
                      <Phone size={16} />
                      <span className="font-['Arimo',sans-serif] text-[14px]">{candidate.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-[#6b7280]">
                      <MapPin size={16} />
                      <span className="font-['Arimo',sans-serif] text-[14px]">{candidate.location}</span>
                    </div>
                  </div>
                </div>
                <button className="flex items-center gap-2 h-[40px] px-[20px] rounded-[8px] border border-[#e5e7eb] hover:bg-[#f9fafb] transition-colors">
                  <Download size={16} className="text-[#6b7280]" />
                  <span className="font-['Arimo',sans-serif] text-[14px] text-[#374151]">
                    Download Resume
                  </span>
                </button>
              </div>

              {/* Scores */}
              <div className="grid grid-cols-4 gap-4">
                <div className="bg-[#f9fafb] rounded-[8px] p-4">
                  <div className="font-['Arimo',sans-serif] text-[12px] text-[#6b7280] mb-1">Overall Score</div>
                  <div className="text-[24px] text-[#111827]">{candidate.scores.overall}</div>
                </div>
                <div className="bg-[#f9fafb] rounded-[8px] p-4">
                  <div className="font-['Arimo',sans-serif] text-[12px] text-[#6b7280] mb-1">Assessment</div>
                  <div className="text-[24px] text-[#111827]">{candidate.scores.assessment}</div>
                </div>
                <div className="bg-[#f9fafb] rounded-[8px] p-4">
                  <div className="font-['Arimo',sans-serif] text-[12px] text-[#6b7280] mb-1">AI Interview</div>
                  <div className="text-[24px] text-[#111827]">{candidate.scores.aiInterview}</div>
                </div>
                <div className="bg-[#f9fafb] rounded-[8px] p-4">
                  <div className="font-['Arimo',sans-serif] text-[12px] text-[#6b7280] mb-1">GitHub</div>
                  <div className="text-[24px] text-[#111827]">{candidate.scores.github}</div>
                </div>
              </div>

              {candidate.antiCheating && (
                <div className="mt-4 flex items-center gap-2 px-[16px] py-[10px] bg-[#fef2f2] border border-[#fecaca] rounded-[8px]">
                  <AlertTriangle size={18} className="text-[#ef4444]" />
                  <span className="font-['Arimo',sans-serif] text-[14px] text-[#ef4444]">
                    Anti-cheating flag detected
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-[12px] border border-[#e5e7eb] overflow-hidden">
          <div className="border-b border-[#e5e7eb] px-6">
            <div className="flex gap-1 overflow-x-auto">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => {
                      if (tab.id === 'knowledge-graph') {
                        onViewKnowledgeGraph();
                      } else {
                        setActiveTab(tab.id as TabType);
                      }
                    }}
                    className={`flex items-center gap-2 px-[20px] py-[14px] font-['Arimo',sans-serif] text-[14px] border-b-2 transition-colors whitespace-nowrap ${
                      activeTab === tab.id
                        ? 'border-[#6366f1] text-[#6366f1]'
                        : 'border-transparent text-[#6b7280] hover:text-[#111827]'
                    }`}
                  >
                    <Icon size={16} />
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Tab Content */}
          <div className="p-8">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-[#111827] mb-4">Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {candidate.skills.map((skill, i) => (
                      <span
                        key={i}
                        className="px-[16px] py-[8px] bg-[#ede9fe] text-[#6366f1] rounded-[8px] font-['Arimo',sans-serif] text-[14px]"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-[#111827] mb-4">Work Experience</h3>
                  <div className="space-y-4">
                    {candidate.workHistory.map((job, i) => (
                      <div key={i} className="border-l-2 border-[#6366f1] pl-4">
                        <div className="font-['Arimo',sans-serif] text-[16px] text-[#111827] mb-1">
                          {job.title}
                        </div>
                        <div className="font-['Arimo',sans-serif] text-[14px] text-[#6b7280] mb-2">
                          {job.company} • {job.duration}
                        </div>
                        <p className="font-['Arimo',sans-serif] text-[14px] text-[#374151]">
                          {job.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-[#111827] mb-4">Education</h3>
                  <div className="space-y-3">
                    {candidate.education.map((edu, i) => (
                      <div key={i}>
                        <div className="font-['Arimo',sans-serif] text-[15px] text-[#111827]">
                          {edu.degree}
                        </div>
                        <div className="font-['Arimo',sans-serif] text-[14px] text-[#6b7280]">
                          {edu.school} • {edu.year}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'resume' && (
              <div>
                <h3 className="text-[#111827] mb-4">Parsed Resume Data</h3>
                <div className="bg-[#f9fafb] rounded-[8px] p-6">
                  <p className="font-['Arimo',sans-serif] text-[14px] text-[#6b7280]">
                    Full resume parsing and detailed analysis will be displayed here.
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'github' && (
              <div>
                <h3 className="text-[#111827] mb-4">GitHub Activity</h3>
                <div className="bg-[#f9fafb] rounded-[8px] p-6">
                  <p className="font-['Arimo',sans-serif] text-[14px] text-[#6b7280]">
                    GitHub repositories, contributions, and activity will be displayed here.
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'linkedin' && (
              <div>
                <h3 className="text-[#111827] mb-4">LinkedIn Profile</h3>
                <div className="bg-[#f9fafb] rounded-[8px] p-6">
                  <p className="font-['Arimo',sans-serif] text-[14px] text-[#6b7280]">
                    LinkedIn profile data and analysis will be displayed here.
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'assessment' && (
              <div className="space-y-6">
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-[#f9fafb] rounded-[8px] p-4">
                    <div className="font-['Arimo',sans-serif] text-[12px] text-[#6b7280] mb-1">Completed</div>
                    <div className="font-['Arimo',sans-serif] text-[16px] text-[#111827]">
                      {candidate.assessmentData.completedAt}
                    </div>
                  </div>
                  <div className="bg-[#f9fafb] rounded-[8px] p-4">
                    <div className="font-['Arimo',sans-serif] text-[12px] text-[#6b7280] mb-1">Duration</div>
                    <div className="font-['Arimo',sans-serif] text-[16px] text-[#111827]">
                      {candidate.assessmentData.duration}
                    </div>
                  </div>
                  <div className="bg-[#f9fafb] rounded-[8px] p-4">
                    <div className="font-['Arimo',sans-serif] text-[12px] text-[#6b7280] mb-1">Score</div>
                    <div className="font-['Arimo',sans-serif] text-[16px] text-[#111827]">
                      {candidate.assessmentData.questionsCorrect}/{candidate.assessmentData.questionsTotal}
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-[#111827] mb-4">Topic Scores</h3>
                  <div className="space-y-3">
                    {candidate.assessmentData.topicScores.map((topic, i) => (
                      <div key={i}>
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-['Arimo',sans-serif] text-[14px] text-[#111827]">
                            {topic.topic}
                          </span>
                          <span className="font-['Arimo',sans-serif] text-[14px] text-[#6b7280]">
                            {topic.score}%
                          </span>
                        </div>
                        <div className="w-full h-[8px] bg-[#e5e7eb] rounded-full overflow-hidden">
                          <div
                            className="h-full bg-[#6366f1] rounded-full"
                            style={{ width: `${topic.score}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'interview' && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-[#f9fafb] rounded-[8px] p-4">
                    <div className="font-['Arimo',sans-serif] text-[12px] text-[#6b7280] mb-1">Completed</div>
                    <div className="font-['Arimo',sans-serif] text-[16px] text-[#111827]">
                      {candidate.interviewData.completedAt}
                    </div>
                  </div>
                  <div className="bg-[#f9fafb] rounded-[8px] p-4">
                    <div className="font-['Arimo',sans-serif] text-[12px] text-[#6b7280] mb-1">Duration</div>
                    <div className="font-['Arimo',sans-serif] text-[16px] text-[#111827]">
                      {candidate.interviewData.duration}
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-[#111827] mb-4">Questions & Scores</h3>
                  <div className="space-y-3">
                    {candidate.interviewData.questions.map((q, i) => (
                      <div key={i} className="bg-[#f9fafb] rounded-[8px] p-4">
                        <div className="flex items-start justify-between mb-2">
                          <span className="font-['Arimo',sans-serif] text-[14px] text-[#111827] flex-1">
                            {q.question}
                          </span>
                          <span className="font-['Arimo',sans-serif] text-[16px] text-[#6366f1] ml-4">
                            {q.score}/10
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-[#111827] mb-3">Overall Feedback</h3>
                  <div className="bg-[#f9fafb] rounded-[8px] p-4">
                    <p className="font-['Arimo',sans-serif] text-[14px] text-[#374151]">
                      {candidate.interviewData.overallFeedback}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'notes' && (
              <div>
                <h3 className="text-[#111827] mb-4">Recruiter Notes</h3>
                <textarea
                  placeholder="Add notes about this candidate..."
                  rows={10}
                  className="w-full px-[16px] py-[12px] rounded-[8px] border border-[#e5e7eb] font-['Arimo',sans-serif] text-[14px] resize-none focus:outline-none focus:ring-2 focus:ring-[#6366f1] focus:border-transparent"
                />
                <button className="mt-4 h-[40px] px-[24px] rounded-[8px] bg-[#6366f1] hover:bg-[#5558e3] font-['Arimo',sans-serif] text-[14px] text-white transition-colors">
                  Save Notes
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
