import { StatCard } from './StatCard';
import { ProjectCard } from './ProjectCard';
import { BarChart3, Users, Briefcase, FolderOpen, TrendingUp, Clock } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { useState } from 'react';

interface DashboardProps {
  onViewAllProjects: () => void;
  onViewProject: (projectTitle: string) => void;
}

export function Dashboard({ onViewAllProjects, onViewProject }: DashboardProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'analytics'>('overview');

  // Mock data aggregated from all projects/positions/groups
  // In a real app, this would be fetched from your backend
  const mockAnalytics = {
    overview: {
      totalProjects: 4,
      totalPositions: 14,
      totalGroups: 18,
      totalCandidates: 156
    },
    groupsByStatus: [
      { status: 'Live', count: 12, color: '#10b981' },
      { status: 'Paused', count: 4, color: '#f59e0b' },
      { status: 'Completed', count: 2, color: '#6366f1' }
    ],
    candidatesByStage: [
      { stage: 'Assessment', count: 68, color: '#6366f1' },
      { stage: 'AI Interview', count: 52, color: '#8b5cf6' },
      { stage: 'Live Interview', count: 24, color: '#10b981' },
      { stage: 'Approved', count: 12, color: '#059669' }
    ],
    projectPerformance: [
      { project: 'Summer Internship', groups: 7, candidates: 68 },
      { project: 'DevOps Team', groups: 4, candidates: 32 },
      { project: 'Migration Project', groups: 5, candidates: 42 },
      { project: 'AI Team', groups: 2, candidates: 14 }
    ],
    recentActivity: [
      { groupName: 'Senior React Developers Q1', project: 'Summer Internship', stage: 'Live Interview', time: '2 hours ago' },
      { groupName: 'Backend Engineers - Python', project: 'DevOps Team', stage: 'AI Interview', time: '5 hours ago' },
      { groupName: 'Full Stack - High Match', project: 'Migration Project', stage: 'Assessment', time: '1 day ago' },
      { groupName: 'ML Engineers Group', project: 'AI Team', stage: 'Assessment', time: '2 days ago' }
    ],
    weeklyTrend: [
      { day: 'Mon', candidates: 12 },
      { day: 'Tue', candidates: 18 },
      { day: 'Wed', candidates: 15 },
      { day: 'Thu', candidates: 22 },
      { day: 'Fri', candidates: 28 },
      { day: 'Sat', candidates: 8 },
      { day: 'Sun', candidates: 5 }
    ]
  };

  return (
    <div className="h-full w-full">
      <div className="box-border content-stretch flex flex-col gap-[32px] items-start pb-0 pt-[32px] px-[32px]">
        {/* Header with Tabs */}
        <div className="w-full">
          <h1 className="font-['Arimo',sans-serif] text-[32px] text-black mb-6">
            Recruitment Dashboard
          </h1>
          
          {/* Tab Navigation */}
          <div className="border-b border-[#e5e7eb]">
            <div className="flex gap-1">
              <button
                onClick={() => setActiveTab('overview')}
                className={`h-[48px] px-[24px] font-['Arimo',sans-serif] text-[15px] border-b-2 transition-colors ${
                  activeTab === 'overview'
                    ? 'border-[#6366f1] text-[#6366f1]'
                    : 'border-transparent text-[#6b7280] hover:text-[#111827]'
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab('analytics')}
                className={`h-[48px] px-[24px] font-['Arimo',sans-serif] text-[15px] border-b-2 transition-colors flex items-center gap-2 ${
                  activeTab === 'analytics'
                    ? 'border-[#6366f1] text-[#6366f1]'
                    : 'border-transparent text-[#6b7280] hover:text-[#111827]'
                }`}
              >
                <BarChart3 size={16} />
                Analytics
              </button>
            </div>
          </div>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <>
            {/* Stats Grid */}
            <div className="gap-[24px] grid grid-cols-[repeat(3,_minmax(0px,_1fr))] grid-rows-[repeat(1,_minmax(0px,_1fr))] h-[172px] w-full">
              <StatCard
                value={30}
                title="Applicants"
                subtitle="in the last 30 days"
                trend="down"
              />
              <StatCard
                value={3}
                title="Perfect Match"
                subtitle="on the last 24 hours"
                trend="up"
              />
              <StatCard
                value={1}
                title="Suspicious assessment"
                subtitle="awaiting review"
                hasLink
              />
            </div>

            {/* Opened Projects Section */}
            <div className="content-stretch flex flex-col gap-[24px] w-full">
              {/* Header */}
              <div className="content-stretch flex h-[30px] items-center justify-between w-full">
                <div className="h-[30px]">
                  <p className="font-['Arimo',sans-serif] leading-[30px] text-[20px] text-black">
                    Opened Projects
                  </p>
                </div>
                <button 
                  className="font-['Arimo',sans-serif] leading-[24px] text-[#9f9f9f] text-[16px] hover:text-[#7f7f7f] transition-colors"
                  onClick={onViewAllProjects}
                >
                  View all
                </button>
              </div>

              {/* Projects Container */}
              <div className="bg-[#fefefe] rounded-[16px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] w-full">
                <div className="size-full">
                  <div className="box-border content-stretch flex flex-col gap-[16px] items-start pb-[32px] pt-[32px] px-[32px]">
                    <ProjectCard
                      title="Summer Internship"
                      roles={3}
                      applicants="999"
                      isOpen
                      showEditButton={false}
                      onView={() => onViewProject('Summer Internship')}
                    />
                    <ProjectCard
                      title="Software Engineering II (DevOps Team)"
                      roles={1}
                      applicants={30}
                      isOpen
                      showEditButton={false}
                      onView={() => onViewProject('Software Engineering II (DevOps Team)')}
                    />
                    <ProjectCard
                      title="Product Migration Project"
                      roles={7}
                      applicants={100}
                      isOpen
                      showEditButton={false}
                      onView={() => onViewProject('Product Migration Project')}
                    />
                    <ProjectCard
                      title="AI team"
                      roles={3}
                      applicants={100}
                      isOpen
                      showEditButton={false}
                      onView={() => onViewProject('AI team')}
                    />
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <div className="w-full space-y-6">
            {/* Overview Metrics */}
            <div className="grid grid-cols-4 gap-6">
              <div className="bg-white rounded-[12px] p-6 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-['Arimo',sans-serif] text-[13px] text-[#6b7280]">
                    Total Projects
                  </h4>
                  <FolderOpen size={20} className="text-[#6366f1]" />
                </div>
                <p className="font-['Arimo',sans-serif] text-[32px] text-black">
                  {mockAnalytics.overview.totalProjects}
                </p>
                <p className="font-['Arimo',sans-serif] text-[12px] text-[#10b981] mt-1">
                  All active
                </p>
              </div>

              <div className="bg-white rounded-[12px] p-6 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-['Arimo',sans-serif] text-[13px] text-[#6b7280]">
                    Total Positions
                  </h4>
                  <Briefcase size={20} className="text-[#8b5cf6]" />
                </div>
                <p className="font-['Arimo',sans-serif] text-[32px] text-black">
                  {mockAnalytics.overview.totalPositions}
                </p>
                <p className="font-['Arimo',sans-serif] text-[12px] text-[#6b7280] mt-1">
                  Across all projects
                </p>
              </div>

              <div className="bg-white rounded-[12px] p-6 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-['Arimo',sans-serif] text-[13px] text-[#6b7280]">
                    Active Groups
                  </h4>
                  <Users size={20} className="text-[#10b981]" />
                </div>
                <p className="font-['Arimo',sans-serif] text-[32px] text-black">
                  {mockAnalytics.overview.totalGroups}
                </p>
                <p className="font-['Arimo',sans-serif] text-[12px] text-[#6b7280] mt-1">
                  Created from positions
                </p>
              </div>

              <div className="bg-white rounded-[12px] p-6 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-['Arimo',sans-serif] text-[13px] text-[#6b7280]">
                    Total Candidates
                  </h4>
                  <Users size={20} className="text-[#f59e0b]" />
                </div>
                <p className="font-['Arimo',sans-serif] text-[32px] text-black">
                  {mockAnalytics.overview.totalCandidates}
                </p>
                <p className="font-['Arimo',sans-serif] text-[12px] text-[#6b7280] mt-1">
                  In all groups
                </p>
              </div>
            </div>

            {/* Charts Grid */}
            <div className="grid grid-cols-2 gap-6">
              {/* Group Status Distribution */}
              <div className="bg-white rounded-[12px] p-6 shadow-sm">
                <h3 className="font-['Arimo',sans-serif] text-[18px] text-black mb-6">
                  Groups by Status
                </h3>
                <div className="h-[280px] flex items-center justify-center">
                  <ResponsiveContainer width="100%" height={280}>
                    <PieChart>
                      <Pie
                        data={mockAnalytics.groupsByStatus}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={2}
                        dataKey="count"
                      >
                        {mockAnalytics.groupsByStatus.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#374151', 
                          border: 'none', 
                          borderRadius: '6px',
                          color: 'white',
                          fontSize: '12px',
                          fontFamily: 'Arimo, sans-serif'
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex items-center justify-center gap-4 mt-4">
                  {mockAnalytics.groupsByStatus.map((item, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                      <span className="font-['Arimo',sans-serif] text-[13px] text-[#6b7280]">
                        {item.status}: {item.count}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Candidates by Filtration Stage */}
              <div className="bg-white rounded-[12px] p-6 shadow-sm">
                <h3 className="font-['Arimo',sans-serif] text-[18px] text-black mb-6">
                  Candidates by Filtration Stage
                </h3>
                <div className="h-[280px]">
                  <ResponsiveContainer width="100%" height={280}>
                    <BarChart data={mockAnalytics.candidatesByStage} margin={{ top: 10, right: 20, left: -10, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis 
                        dataKey="stage" 
                        axisLine={{ stroke: '#6b7280' }}
                        tickLine={false}
                        tick={{ fill: '#6b7280', fontSize: 12, fontFamily: 'Arimo, sans-serif' }}
                      />
                      <YAxis 
                        axisLine={{ stroke: '#6b7280' }}
                        tickLine={false}
                        tick={{ fill: '#6b7280', fontSize: 12, fontFamily: 'Arimo, sans-serif' }}
                      />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#374151', 
                          border: 'none', 
                          borderRadius: '6px',
                          color: 'white',
                          fontSize: '12px',
                          fontFamily: 'Arimo, sans-serif'
                        }}
                      />
                      <Bar dataKey="count" radius={[6, 6, 0, 0]} maxBarSize={60}>
                        {mockAnalytics.candidatesByStage.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* Project Performance Comparison */}
            <div className="bg-white rounded-[12px] p-6 shadow-sm">
              <h3 className="font-['Arimo',sans-serif] text-[18px] text-black mb-6">
                Project Performance Comparison
              </h3>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={mockAnalytics.projectPerformance} margin={{ top: 10, right: 30, left: 0, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis 
                      dataKey="project" 
                      axisLine={{ stroke: '#6b7280' }}
                      tickLine={false}
                      tick={{ fill: '#6b7280', fontSize: 12, fontFamily: 'Arimo, sans-serif' }}
                      angle={-15}
                      textAnchor="end"
                      height={80}
                    />
                    <YAxis 
                      axisLine={{ stroke: '#6b7280' }}
                      tickLine={false}
                      tick={{ fill: '#6b7280', fontSize: 12, fontFamily: 'Arimo, sans-serif' }}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#374151', 
                        border: 'none', 
                        borderRadius: '6px',
                        color: 'white',
                        fontSize: '12px',
                        fontFamily: 'Arimo, sans-serif'
                      }}
                    />
                    <Bar dataKey="groups" fill="#6366f1" name="Groups" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="candidates" fill="#10b981" name="Candidates" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Weekly Candidate Trend */}
            <div className="bg-white rounded-[12px] p-6 shadow-sm">
              <h3 className="font-['Arimo',sans-serif] text-[18px] text-black mb-6">
                Weekly Candidate Activity
              </h3>
              <div className="h-[280px]">
                <ResponsiveContainer width="100%" height={280}>
                  <LineChart data={mockAnalytics.weeklyTrend} margin={{ top: 10, right: 30, left: 0, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis 
                      dataKey="day" 
                      axisLine={{ stroke: '#6b7280' }}
                      tickLine={false}
                      tick={{ fill: '#6b7280', fontSize: 12, fontFamily: 'Arimo, sans-serif' }}
                    />
                    <YAxis 
                      axisLine={{ stroke: '#6b7280' }}
                      tickLine={false}
                      tick={{ fill: '#6b7280', fontSize: 12, fontFamily: 'Arimo, sans-serif' }}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#374151', 
                        border: 'none', 
                        borderRadius: '6px',
                        color: 'white',
                        fontSize: '12px',
                        fontFamily: 'Arimo, sans-serif'
                      }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="candidates" 
                      stroke="#6366f1" 
                      strokeWidth={3}
                      dot={{ fill: '#6366f1', r: 5 }}
                      activeDot={{ r: 7 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Recent Group Activity */}
            <div className="bg-white rounded-[12px] p-6 shadow-sm">
              <h3 className="font-['Arimo',sans-serif] text-[18px] text-black mb-4">
                Recent Group Activity
              </h3>
              <div className="space-y-3">
                {mockAnalytics.recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-center justify-between p-4 rounded-[8px] bg-[#f9fafb] hover:bg-[#f3f4f6] transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-[4px] h-[44px] rounded-full bg-[#6366f1]"></div>
                      <div>
                        <p className="font-['Arimo',sans-serif] text-[15px] text-black">
                          {activity.groupName}
                        </p>
                        <p className="font-['Arimo',sans-serif] text-[13px] text-[#6b7280]">
                          {activity.project}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="px-3 py-1 rounded-[6px] bg-[#dbeafe] text-[#1e40af] font-['Arimo',sans-serif] text-[12px] mb-1">
                        {activity.stage}
                      </div>
                      <p className="font-['Arimo',sans-serif] text-[12px] text-[#9ca3af] flex items-center gap-1">
                        <Clock size={12} />
                        {activity.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
