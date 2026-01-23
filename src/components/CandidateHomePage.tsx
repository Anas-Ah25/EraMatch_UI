import { useState } from 'react';
import { Calendar, Clock, CheckCircle, XCircle, AlertCircle, Mail, FileText, Video, Activity, BarChart3, Play, User, Bell, LogOut } from 'lucide-react';
import { Button } from './ui/button';

interface CandidateHomePageProps {
  candidateName: string;
  candidateEmail: string;
  onLogout: () => void;
}

interface ApplicationStatus {
  positionTitle: string;
  company: string;
  groupName: string;
  appliedDate: string;
  currentStage: string;
  pipelineProgress: {
    groupAssignment: { status: 'completed' | 'pending' | 'not-started'; date?: string };
    assessment: { status: 'completed' | 'pending' | 'not-started'; date?: string; score?: number };
    aiInterview: { status: 'completed' | 'pending' | 'not-started'; date?: string; score?: number };
    liveInterview: { status: 'completed' | 'pending' | 'not-started'; date?: string };
    finalDecision: { status: 'completed' | 'pending' | 'not-started'; date?: string; result?: 'offer' | 'rejected' | 'pending' };
  };
  nextStep?: {
    name: string;
    dueDate?: string;
    description: string;
  };
}

export function CandidateHomePage({ candidateName, candidateEmail, onLogout }: CandidateHomePageProps) {
  // Mock data - in production, this would come from API
  const [applications] = useState<ApplicationStatus[]>([
    {
      positionTitle: 'Senior Frontend Developer',
      company: 'Tech Corp',
      groupName: 'Frontend Team Q1 2025',
      appliedDate: '2025-01-10',
      currentStage: 'AI Interview',
      pipelineProgress: {
        groupAssignment: { status: 'completed', date: '2025-01-10' },
        assessment: { status: 'completed', date: '2025-01-12', score: 95 },
        aiInterview: { status: 'pending', date: '2025-01-15' },
        liveInterview: { status: 'not-started' },
        finalDecision: { status: 'not-started' }
      },
      nextStep: {
        name: 'Complete AI Video Interview',
        dueDate: '2025-01-25',
        description: 'Please complete the AI-powered video interview. You will be asked 5 questions with 2 minutes to answer each.'
      }
    },
    {
      positionTitle: 'Full Stack Engineer',
      company: 'Startup Inc',
      groupName: 'Engineering Batch 2025',
      appliedDate: '2025-01-08',
      currentStage: 'Live Interview',
      pipelineProgress: {
        groupAssignment: { status: 'completed', date: '2025-01-08' },
        assessment: { status: 'completed', date: '2025-01-10', score: 88 },
        aiInterview: { status: 'completed', date: '2025-01-14', score: 92 },
        liveInterview: { status: 'pending', date: '2025-01-18' },
        finalDecision: { status: 'not-started' }
      },
      nextStep: {
        name: 'Live Interview Scheduled',
        dueDate: '2025-01-28',
        description: 'Your live interview is scheduled for January 28, 2025 at 2:00 PM EST. You will meet with the engineering team.'
      }
    },
    {
      positionTitle: 'Backend Developer',
      company: 'Enterprise Solutions',
      groupName: 'Backend Team Hiring',
      appliedDate: '2024-12-20',
      currentStage: 'Offer Received',
      pipelineProgress: {
        groupAssignment: { status: 'completed', date: '2024-12-20' },
        assessment: { status: 'completed', date: '2024-12-22', score: 91 },
        aiInterview: { status: 'completed', date: '2024-12-28', score: 89 },
        liveInterview: { status: 'completed', date: '2025-01-05' },
        finalDecision: { status: 'completed', date: '2025-01-10', result: 'offer' }
      },
      nextStep: {
        name: 'Review Offer',
        description: 'Congratulations! You have received an offer. Please review the offer details sent to your email.'
      }
    }
  ]);

  const getStatusIcon = (status: 'completed' | 'pending' | 'not-started') => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="text-emerald-500" size={20} />;
      case 'pending':
        return <Activity className="text-indigo-500 animate-pulse" size={20} />;
      case 'not-started':
        return <Clock className="text-gray-400" size={20} />;
    }
  };

  const getStageProgress = (pipeline: ApplicationStatus['pipelineProgress']) => {
    const stages = [
      pipeline.groupAssignment,
      pipeline.assessment,
      pipeline.aiInterview,
      pipeline.liveInterview,
      pipeline.finalDecision
    ];
    const completed = stages.filter(s => s.status === 'completed').length;
    return (completed / stages.length) * 100;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white border-b-2 border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-lg">
                {candidateName.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">{candidateName}</h1>
                <p className="text-sm text-gray-600">{candidateEmail}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" className="flex items-center gap-2">
                <Bell size={16} />
                Notifications
              </Button>
              <Button onClick={onLogout} variant="outline" className="flex items-center gap-2 text-red-600 border-red-300 hover:bg-red-50">
                <LogOut size={16} />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Welcome Banner */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 text-white mb-8 shadow-xl">
          <h2 className="text-3xl font-bold mb-2">Welcome back, {candidateName.split(' ')[0]}!</h2>
          <p className="text-indigo-100 text-lg">Track your application progress and complete pending tasks</p>
        </div>

        {/* Applications Summary */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl border-2 border-indigo-200 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm font-semibold text-indigo-700">Active Applications</div>
              <FileText className="text-indigo-600" size={20} />
            </div>
            <div className="text-4xl font-bold text-indigo-900">{applications.filter(a => a.pipelineProgress.finalDecision.status !== 'completed').length}</div>
          </div>
          <div className="bg-white rounded-xl border-2 border-emerald-200 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm font-semibold text-emerald-700">Pending Tasks</div>
              <AlertCircle className="text-emerald-600" size={20} />
            </div>
            <div className="text-4xl font-bold text-emerald-900">{applications.filter(a => a.nextStep).length}</div>
          </div>
          <div className="bg-white rounded-xl border-2 border-purple-200 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm font-semibold text-purple-700">Offers Received</div>
              <Mail className="text-purple-600" size={20} />
            </div>
            <div className="text-4xl font-bold text-purple-900">
              {applications.filter(a => a.pipelineProgress.finalDecision.result === 'offer').length}
            </div>
          </div>
        </div>

        {/* Applications List */}
        <div className="space-y-6">
          <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <BarChart3 className="text-indigo-600" size={28} />
            Your Applications
          </h3>

          {applications.map((app, index) => {
            const progress = getStageProgress(app.pipelineProgress);
            
            return (
              <div key={index} className="bg-white rounded-2xl border-2 border-gray-200 overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                {/* Application Header */}
                <div className="bg-gradient-to-r from-indigo-100 to-purple-100 p-6 border-b-2 border-gray-200">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h4 className="text-2xl font-bold text-gray-900 mb-1">{app.positionTitle}</h4>
                      <p className="text-gray-700 font-medium">{app.company} • {app.groupName}</p>
                      <p className="text-sm text-gray-600 mt-2">Applied on {new Date(app.appliedDate).toLocaleDateString()}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-semibold text-indigo-700 mb-1">Current Stage</div>
                      <div className="text-lg font-bold text-indigo-900">{app.currentStage}</div>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mt-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-semibold text-gray-700">Overall Progress</span>
                      <span className="text-sm font-bold text-indigo-600">{Math.round(progress)}%</span>
                    </div>
                    <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-indigo-500 to-emerald-500 transition-all duration-500 rounded-full"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Pipeline Stages */}
                <div className="p-6">
                  <div className="relative">
                    {/* Progress Line */}
                    <div className="absolute top-10 left-0 right-0 h-1 bg-gray-200" style={{ zIndex: 0 }}>
                      <div
                        className="h-full bg-gradient-to-r from-indigo-500 to-emerald-500 transition-all duration-500"
                        style={{ width: `${progress}%` }}
                      />
                    </div>

                    {/* Pipeline Stages Grid */}
                    <div className="relative grid grid-cols-5 gap-4" style={{ zIndex: 1 }}>
                      {/* Group Assignment */}
                      <div className="flex flex-col items-center">
                        <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-3 border-4 ${
                          app.pipelineProgress.groupAssignment.status === 'completed'
                            ? 'bg-emerald-500 border-emerald-200'
                            : app.pipelineProgress.groupAssignment.status === 'pending'
                            ? 'bg-indigo-500 border-indigo-200'
                            : 'bg-gray-300 border-gray-200'
                        }`}>
                          {getStatusIcon(app.pipelineProgress.groupAssignment.status)}
                        </div>
                        <div className="text-center">
                          <div className="text-xs font-semibold text-gray-900 mb-1">Application</div>
                          <div className="text-xs font-semibold text-gray-900 mb-1">Submitted</div>
                          {app.pipelineProgress.groupAssignment.date && (
                            <div className="text-[10px] text-gray-500">
                              {new Date(app.pipelineProgress.groupAssignment.date).toLocaleDateString()}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Assessment */}
                      <div className="flex flex-col items-center">
                        <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-3 border-4 ${
                          app.pipelineProgress.assessment.status === 'completed'
                            ? 'bg-emerald-500 border-emerald-200'
                            : app.pipelineProgress.assessment.status === 'pending'
                            ? 'bg-indigo-500 border-indigo-200'
                            : 'bg-gray-300 border-gray-200'
                        }`}>
                          {getStatusIcon(app.pipelineProgress.assessment.status)}
                        </div>
                        <div className="text-center">
                          <div className="text-xs font-semibold text-gray-900 mb-1">Technical</div>
                          <div className="text-xs font-semibold text-gray-900 mb-1">Assessment</div>
                          {app.pipelineProgress.assessment.score && (
                            <div className="text-[10px] font-bold text-indigo-600">
                              Score: {app.pipelineProgress.assessment.score}
                            </div>
                          )}
                          {app.pipelineProgress.assessment.date && (
                            <div className="text-[10px] text-gray-500">
                              {new Date(app.pipelineProgress.assessment.date).toLocaleDateString()}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* AI Interview */}
                      <div className="flex flex-col items-center">
                        <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-3 border-4 ${
                          app.pipelineProgress.aiInterview.status === 'completed'
                            ? 'bg-emerald-500 border-emerald-200'
                            : app.pipelineProgress.aiInterview.status === 'pending'
                            ? 'bg-indigo-500 border-indigo-200'
                            : 'bg-gray-300 border-gray-200'
                        }`}>
                          {getStatusIcon(app.pipelineProgress.aiInterview.status)}
                        </div>
                        <div className="text-center">
                          <div className="text-xs font-semibold text-gray-900 mb-1">AI Video</div>
                          <div className="text-xs font-semibold text-gray-900 mb-1">Interview</div>
                          {app.pipelineProgress.aiInterview.score && (
                            <div className="text-[10px] font-bold text-indigo-600">
                              Score: {app.pipelineProgress.aiInterview.score}
                            </div>
                          )}
                          {app.pipelineProgress.aiInterview.date && (
                            <div className="text-[10px] text-gray-500">
                              {new Date(app.pipelineProgress.aiInterview.date).toLocaleDateString()}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Live Interview */}
                      <div className="flex flex-col items-center">
                        <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-3 border-4 ${
                          app.pipelineProgress.liveInterview.status === 'completed'
                            ? 'bg-emerald-500 border-emerald-200'
                            : app.pipelineProgress.liveInterview.status === 'pending'
                            ? 'bg-indigo-500 border-indigo-200'
                            : 'bg-gray-300 border-gray-200'
                        }`}>
                          {getStatusIcon(app.pipelineProgress.liveInterview.status)}
                        </div>
                        <div className="text-center">
                          <div className="text-xs font-semibold text-gray-900 mb-1">Live</div>
                          <div className="text-xs font-semibold text-gray-900 mb-1">Interview</div>
                          {app.pipelineProgress.liveInterview.date && (
                            <div className="text-[10px] text-gray-500">
                              {new Date(app.pipelineProgress.liveInterview.date).toLocaleDateString()}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Final Decision */}
                      <div className="flex flex-col items-center">
                        <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-3 border-4 ${
                          app.pipelineProgress.finalDecision.status === 'completed'
                            ? app.pipelineProgress.finalDecision.result === 'offer'
                              ? 'bg-emerald-500 border-emerald-200'
                              : 'bg-red-500 border-red-200'
                            : app.pipelineProgress.finalDecision.status === 'pending'
                            ? 'bg-indigo-500 border-indigo-200'
                            : 'bg-gray-300 border-gray-200'
                        }`}>
                          {app.pipelineProgress.finalDecision.result === 'offer' ? (
                            <CheckCircle className="text-white" size={20} />
                          ) : app.pipelineProgress.finalDecision.result === 'rejected' ? (
                            <XCircle className="text-white" size={20} />
                          ) : (
                            getStatusIcon(app.pipelineProgress.finalDecision.status)
                          )}
                        </div>
                        <div className="text-center">
                          <div className="text-xs font-semibold text-gray-900 mb-1">Final</div>
                          <div className="text-xs font-semibold text-gray-900 mb-1">Decision</div>
                          {app.pipelineProgress.finalDecision.result === 'offer' && (
                            <div className="text-[10px] font-bold text-emerald-600">Offer!</div>
                          )}
                          {app.pipelineProgress.finalDecision.date && (
                            <div className="text-[10px] text-gray-500">
                              {new Date(app.pipelineProgress.finalDecision.date).toLocaleDateString()}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Next Step */}
                  {app.nextStep && (
                    <div className="mt-6 bg-gradient-to-r from-indigo-50 to-purple-50 border-2 border-indigo-200 rounded-xl p-5">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-full bg-indigo-600 flex items-center justify-center flex-shrink-0">
                          <AlertCircle className="text-white" size={24} />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h5 className="font-bold text-indigo-900 text-lg">Next Step: {app.nextStep.name}</h5>
                            {app.nextStep.dueDate && (
                              <div className="flex items-center gap-2 text-sm text-indigo-700">
                                <Calendar size={16} />
                                Due: {new Date(app.nextStep.dueDate).toLocaleDateString()}
                              </div>
                            )}
                          </div>
                          <p className="text-gray-700 mb-4">{app.nextStep.description}</p>
                          {app.pipelineProgress.finalDecision.result !== 'offer' && (
                            <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
                              <Play size={16} className="mr-2" />
                              Take Action
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
