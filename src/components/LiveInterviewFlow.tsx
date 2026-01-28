import { useState, useEffect, useRef } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Sparkles, Video, Clock, User, Camera, Mic, Play, Info, Scan, CheckCircle2, Copy, X, AlertTriangle, Users, Volume2 } from 'lucide-react';
import logo from '../assets/image-eramatch.png';

interface LiveInterviewFlowProps {
  onSignOut: () => void;
  onExit: () => void;
  onCompletion: () => void;
}

export function LiveInterviewFlow({ onSignOut, onExit, onCompletion }: LiveInterviewFlowProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [isRecording, setIsRecording] = useState(false);
  const [hasRecorded, setHasRecorded] = useState(false);
  const [faceDetectionStarted, setFaceDetectionStarted] = useState(false);
  const [faceDetectionComplete, setFaceDetectionComplete] = useState(false);
  const [detectionProgress, setDetectionProgress] = useState(0);
  const [isCalibrating, setIsCalibrating] = useState(false);
  const [calibrationComplete, setCalibrationComplete] = useState(false);
  const [fireflies, setFireflies] = useState<Array<{ x: number; y: number; id: number; isCalibration: boolean }>>([]);
  const [score, setScore] = useState(0);
  const [targetsCaught, setTargetsCaught] = useState(0);
  const [totalTargets] = useState(20);
  const calibrationRef = useRef<HTMLDivElement>(null);
  const [copyPasteUnderstood, setCopyPasteUnderstood] = useState(false);
  const [mockRecording, setMockRecording] = useState(false);
  const [mockRecorded, setMockRecorded] = useState(false);

  // Live interview session states
  const [inInterviewSession, setInInterviewSession] = useState(false);
  const [aiSpeaking, setAiSpeaking] = useState(false);
  const [candidateSpeaking, setCandidateSpeaking] = useState(false);
  const [interviewComplete, setInterviewComplete] = useState(false);
  const [showUploadProgress, setShowUploadProgress] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [conversationTurns, setConversationTurns] = useState(0);
  const maxTurns = 10; // 5 AI questions + 5 candidate responses = 10 turns

  const totalQuestions = 5;

  const questions = [
    "Describe your most challenging project and how you overcame the obstacles you faced.",
    "Tell us about a time when you had to work with a difficult team member. How did you handle the situation?",
    "What motivates you in your professional career, and how do you stay productive during challenging times?",
    "Describe a situation where you had to learn a new technology or skill quickly. How did you approach it?",
    "Where do you see yourself in 5 years, and how does this position align with your career goals?"
  ];

  const steps = [
    { number: 1, label: 'Welcome' },
    { number: 2, label: 'Device Test' },
    { number: 3, label: 'Instructions' },
    { number: 4, label: 'Face Detection' },
    { number: 5, label: 'Break the Ice' },
    { number: 6, label: 'Copy/Paste' },
    { number: 7, label: 'One Person' },
    { number: 8, label: 'Ready' }
  ];

  // Simulate AI speaking when a new question starts
  useEffect(() => {
    if (inInterviewSession && conversationTurns < maxTurns) {
      setAiSpeaking(true);
      setCandidateSpeaking(false);

      // Simulate AI speaking for 3-5 seconds
      const speakDuration = 3000 + Math.random() * 2000;
      const timer = setTimeout(() => {
        setAiSpeaking(false);
        setCandidateSpeaking(true);

        // Auto-detect when candidate stops speaking (simulate 5-8 seconds of candidate speaking)
        const candidateSpeakDuration = 5000 + Math.random() * 3000;
        const candidateTimer = setTimeout(() => {
          setCandidateSpeaking(false);
          setConversationTurns(prev => prev + 1);

          // Check if interview is complete
          if (conversationTurns >= maxTurns - 1) {
            setShowUploadProgress(true);
            setUploadProgress(0);

            const uploadInterval = setInterval(() => {
              setUploadProgress(prev => {
                if (prev >= 100) {
                  clearInterval(uploadInterval);
                  setTimeout(() => {
                    onCompletion();
                    onExit();
                  }, 500);
                  return 100;
                }
                return prev + 10;
              });
            }, 200);
          }
        }, candidateSpeakDuration);

        return () => clearTimeout(candidateTimer);
      }, speakDuration);

      return () => clearTimeout(timer);
    }
  }, [conversationTurns, inInterviewSession]);

  const handleRecordTestClip = () => {
    setIsRecording(true);
    setTimeout(() => {
      setIsRecording(false);
      setHasRecorded(true);
    }, 2000);
  };

  const handlePlayClip = () => {
    console.log('Playing recorded clip');
  };

  const handleStartFaceDetection = () => {
    setFaceDetectionStarted(true);
    setDetectionProgress(0);

    const interval = setInterval(() => {
      setDetectionProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setFaceDetectionComplete(true);
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

  const handleRetryCamera = () => {
    console.log('Retrying camera access');
  };

  const handleStartCalibration = () => {
    setIsCalibrating(true);
    setScore(0);
    setTargetsCaught(0);
    setCalibrationComplete(false);

    if (calibrationRef.current) {
      if (calibrationRef.current.requestFullscreen) {
        calibrationRef.current.requestFullscreen();
      }
    }

    const calibrationPoints = [
      { x: 10, y: 10 },
      { x: 90, y: 10 },
      { x: 50, y: 50 },
      { x: 10, y: 90 },
      { x: 90, y: 90 }
    ];

    const decoyPoints = Array.from({ length: 15 }, () => ({
      x: Math.random() * 80 + 10,
      y: Math.random() * 80 + 10
    }));

    const allPoints = [
      ...calibrationPoints.map(p => ({ ...p, isCalibration: true })),
      ...decoyPoints.map(p => ({ ...p, isCalibration: false }))
    ].sort(() => Math.random() - 0.5);

    let currentIndex = 0;
    const spawnNextFirefly = () => {
      if (currentIndex >= allPoints.length) {
        setTimeout(() => {
          setCalibrationComplete(true);
          setIsCalibrating(false);
          if (document.fullscreenElement) {
            document.exitFullscreen();
          }
        }, 1000);
        return;
      }

      const point = allPoints[currentIndex];
      const fireflyId = Date.now();

      setFireflies([{ ...point, id: fireflyId }]);

      setTimeout(() => {
        setFireflies(prev => prev.filter(f => f.id !== fireflyId));
        currentIndex++;
        setTimeout(spawnNextFirefly, 1000); // Increased from 500ms to 1000ms
      }, 3000); // Increased from 2000ms to 3000ms
    };

    setTimeout(spawnNextFirefly, 1000);
  };

  const handleFireflyClick = (firefly: { x: number; y: number; id: number; isCalibration: boolean }) => {
    setFireflies(prev => prev.filter(f => f.id !== firefly.id));
    setScore(prev => prev + 1);

    if (firefly.isCalibration) {
      const newTargetsCaught = targetsCaught + 1;
      setTargetsCaught(newTargetsCaught);
      console.log('Calibration point clicked:', firefly.x, firefly.y);

      // Check if all 5 calibration targets have been caught
      if (newTargetsCaught >= 5) {
        setTimeout(() => {
          setCalibrationComplete(true);
          setIsCalibrating(false);
          if (document.fullscreenElement) {
            document.exitFullscreen();
          }
        }, 500); // Close game shortly after hitting the target
      }
    }
  };

  const handleCandidateStartSpeaking = () => {
    setCandidateSpeaking(true);
  };

  const handleCandidateStopSpeaking = () => {
    setCandidateSpeaking(false);

    // After candidate finishes, increment conversation turn
    setConversationTurns(prev => prev + 1);

    if (conversationTurns >= maxTurns - 1) {
      // Interview complete - show upload progress
      setShowUploadProgress(true);
      setUploadProgress(0);

      const uploadInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 100) {
            clearInterval(uploadInterval);
            setTimeout(() => {
              onCompletion();
              onExit();
            }, 500);
            return 100;
          }
          return prev + 10;
        });
      }, 200);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <Card className="max-w-5xl mx-auto p-12">
            <div className="flex flex-col items-center text-center space-y-6">
              <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ backgroundColor: '#6366F1' }}>
                <Sparkles className="w-8 h-8 text-white" />
              </div>

              <h2 className="text-gray-700">Welcome to Live AI Interview</h2>

              <p className="text-gray-600 max-w-lg">
                Get ready for a real-time conversation with our AI interviewer. This interview will feel like a natural conversation where the AI asks questions and you respond in real-time.
              </p>

              <div className="space-y-3 text-left w-full max-w-md pt-4">
                <div className="flex items-start gap-3 text-gray-600">
                  <span className="text-emerald-500 mt-1">✓</span>
                  <span className="text-sm">Interview duration: approximately 30 minutes</span>
                </div>
                <div className="flex items-start gap-3 text-gray-600">
                  <span className="text-emerald-500 mt-1">✓</span>
                  <span className="text-sm">Real-time conversation with AI interviewer</span>
                </div>
                <div className="flex items-start gap-3 text-gray-600">
                  <span className="text-emerald-500 mt-1">✓</span>
                  <span className="text-sm">Natural back-and-forth dialogue</span>
                </div>
              </div>

              <Button
                className="w-full max-w-md mt-6 text-white rounded-full"
                style={{ backgroundColor: '#6366F1' }}
                onClick={() => setCurrentStep(2)}
              >
                Proceed to Setup
              </Button>
            </div>
          </Card>
        );

      case 2:
        return (
          <Card className="max-w-5xl mx-auto p-8">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: '#6366F1' }}>
                  <Camera className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-gray-700">Test Your Camera & Microphone</h3>
              </div>

              <p className="text-gray-600 text-sm">
                Let's verify that your camera and microphone are working correctly. Record a short test clip to ensure everything is functioning properly.
              </p>

              <div className="bg-slate-800 rounded-lg h-80 flex flex-col items-center justify-center">
                <Camera className="w-16 h-16 text-slate-600 mb-4" />
                <p className="text-slate-500">Camera not available</p>
              </div>

              <div className="flex items-center gap-2 text-gray-600">
                <Mic className="w-4 h-4" />
                <span className="text-sm">Microphone level</span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Button
                  className="text-white rounded-full"
                  style={{ backgroundColor: isRecording ? '#EF4444' : '#6366F1' }}
                  onClick={handleRecordTestClip}
                  disabled={isRecording}
                >
                  {isRecording ? 'Recording...' : 'Record Test Clip'}
                </Button>
                <Button
                  variant="outline"
                  className="rounded-full"
                  onClick={handlePlayClip}
                  disabled={!hasRecorded}
                >
                  <Play className="w-4 h-4 mr-2" />
                  Play Clip
                </Button>
              </div>

              <p className="text-center text-gray-500 text-xs">
                Ensure your device seek prompts before proceeding
              </p>

              <div className="flex justify-end pt-4">
                <Button
                  className="text-white rounded-full"
                  style={{ backgroundColor: '#6366F1' }}
                  onClick={() => setCurrentStep(3)}
                >
                  Continue
                </Button>
              </div>
            </div>
          </Card>
        );

      case 3:
        return (
          <Card className="max-w-5xl mx-auto p-8">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: '#6366F1' }}>
                  <Video className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-gray-700">Before You Begin</h3>
              </div>

              <p className="text-gray-600">
                Please review these important guidelines before starting your live interview session.
              </p>

              <div className="space-y-6 pt-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#EEF2FF' }}>
                    <Video className="w-5 h-5" style={{ color: '#6366F1' }} />
                  </div>
                  <div>
                    <h4 className="text-gray-700 mb-1">Real-time conversation</h4>
                    <p className="text-gray-600 text-sm">
                      The AI will ask questions and wait for your response. Speak naturally as you would in a regular interview.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#EEF2FF' }}>
                    <Clock className="w-5 h-5" style={{ color: '#6366F1' }} />
                  </div>
                  <div>
                    <h4 className="text-gray-700 mb-1">No time pressure</h4>
                    <p className="text-gray-600 text-sm">
                      Take your time to think and respond. The AI will wait for you to finish speaking.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#EEF2FF' }}>
                    <User className="w-5 h-5" style={{ color: '#6366F1' }} />
                  </div>
                  <div>
                    <h4 className="text-gray-700 mb-1">Stay centered and speak clearly</h4>
                    <p className="text-gray-600 text-sm">
                      Keep yourself in frame, maintain good posture, and speak clearly into your microphone.
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-lg" style={{ backgroundColor: '#EFF6FF' }}>
                <div className="flex items-start gap-3">
                  <Info className="w-5 h-5 flex-shrink-0" style={{ color: '#3B82F6' }} />
                  <div>
                    <h4 className="text-sm mb-1" style={{ color: '#1E40AF' }}>Important notice:</h4>
                    <p className="text-sm" style={{ color: '#1E40AF' }}>
                      Make sure you're in a quiet environment. Background noise may affect audio quality and the AI's ability to understand you.
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4">
                <Button
                  variant="outline"
                  className="rounded-full"
                  onClick={() => setCurrentStep(2)}
                >
                  Back
                </Button>
                <Button
                  className="text-white rounded-full"
                  style={{ backgroundColor: '#6366F1' }}
                  onClick={() => setCurrentStep(4)}
                >
                  Continue
                </Button>
              </div>
            </div>
          </Card>
        );

      case 4:
        return (
          <Card className="max-w-5xl mx-auto p-8">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: '#6366F1' }}>
                  <Scan className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-gray-700">Face Mesh Detection</h3>
              </div>

              <p className="text-gray-600">
                We'll now calibrate our face detection system. Please follow the on-screen instructions and move your head as directed.
              </p>

              <div className="p-4 rounded-lg" style={{ backgroundColor: '#FEE2E2' }}>
                <p className="text-red-600 text-sm">
                  Unable to access camera. The demo will continue with simulated face tracking.
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-2 text-sm"
                  onClick={handleRetryCamera}
                >
                  Retry Camera
                </Button>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="bg-slate-900 rounded-lg h-80 flex flex-col items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div
                      className="w-64 h-64 rounded-full border-2 opacity-30"
                      style={{ borderColor: '#6366F1' }}
                    />
                  </div>
                  <Camera className="w-16 h-16 text-slate-600 mb-2 relative z-10" />
                  <p className="text-slate-500 text-sm relative z-10">Camera not available</p>
                  <p className="text-slate-600 text-xs mt-1 relative z-10">Demo mode active</p>
                </div>

                <div className="rounded-lg h-80 flex items-center justify-center" style={{ backgroundColor: '#F3E8FF' }}>
                  {faceDetectionStarted ? (
                    <svg width="200" height="240" viewBox="0 0 200 240" className="transition-opacity duration-500">
                      <ellipse cx="100" cy="120" rx="60" ry="80" fill="none" stroke="#A855F7" strokeWidth="2" />
                      <circle cx="80" cy="100" r="3" fill="#A855F7" />
                      <circle cx="120" cy="100" r="3" fill="#A855F7" />
                      <circle cx="100" cy="120" r="2" fill="#A855F7" />
                      <circle cx="85" cy="145" r="2" fill="#A855F7" />
                      <circle cx="100" cy="148" r="2" fill="#A855F7" />
                      <circle cx="115" cy="145" r="2" fill="#A855F7" />
                      <circle cx="70" cy="95" r="1.5" fill="#A855F7" />
                      <circle cx="130" cy="95" r="1.5" fill="#A855F7" />
                      <circle cx="100" cy="80" r="1.5" fill="#A855F7" />
                      <circle cx="100" cy="160" r="1.5" fill="#A855F7" />
                    </svg>
                  ) : (
                    <div className="text-center">
                      <div className="w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-3" style={{ backgroundColor: '#E9D5FF' }}>
                        <Scan className="w-8 h-8" style={{ color: '#A855F7' }} />
                      </div>
                      <p className="text-gray-500">Face mesh will appear here</p>
                    </div>
                  )}
                </div>
              </div>

              {faceDetectionStarted && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700 text-sm">
                      {faceDetectionComplete ? 'Face detection complete!' : 'Detecting face...'}
                    </span>
                    <span className="text-gray-600 text-sm">{detectionProgress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="h-2 rounded-full transition-all duration-300"
                      style={{
                        width: `${detectionProgress}%`,
                        backgroundColor: '#6366F1'
                      }}
                    />
                  </div>
                </div>
              )}

              {faceDetectionComplete && (
                <div className="flex items-center gap-2 p-4 rounded-lg" style={{ backgroundColor: '#D1FAE5' }}>
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <span className="text-emerald-700">Face successfully detected and calibrated!</span>
                </div>
              )}

              <div className="flex justify-center pt-4">
                {!faceDetectionStarted ? (
                  <Button
                    className="text-white rounded-full px-8"
                    style={{ backgroundColor: '#6366F1' }}
                    onClick={handleStartFaceDetection}
                  >
                    Start Face Detection
                  </Button>
                ) : faceDetectionComplete ? (
                  <Button
                    className="text-white rounded-full px-8"
                    style={{ backgroundColor: '#6366F1' }}
                    onClick={() => setCurrentStep(5)}
                  >
                    Next Step
                  </Button>
                ) : null}
              </div>
            </div>
          </Card>
        );

      case 5:
        if (!calibrationComplete) {
          return (
            <>
              {!isCalibrating && (
                <Card className="max-w-5xl mx-auto p-8">
                  <div className="space-y-6">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: '#6366F1' }}>
                        <Sparkles className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-gray-700">Let's Break the Ice!</h3>
                    </div>

                    <p className="text-gray-600">
                      Before we begin the interview, let's warm up with a fun little game! Catch the glowing fireflies as they appear across the screen.
                    </p>

                    <div className="flex items-center justify-center py-12">
                      <div className="relative">
                        <div className="w-32 h-32 rounded-full flex items-center justify-center" style={{ backgroundColor: '#F3E8FF' }}>
                          <svg width="80" height="80" viewBox="0 0 80 80">
                            <circle cx="40" cy="40" r="30" fill="#A855F7" opacity="0.3" />
                            <circle cx="40" cy="40" r="20" fill="#A855F7" opacity="0.5" />
                            <circle cx="40" cy="40" r="10" fill="#A855F7" />
                            <circle cx="35" cy="35" r="3" fill="#FFF" />
                          </svg>
                        </div>
                        <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full animate-pulse" style={{ backgroundColor: '#FCD34D' }} />
                        <div className="absolute top-4 -right-4 w-4 h-4 rounded-full animate-pulse" style={{ backgroundColor: '#FCD34D', animationDelay: '0.5s' }} />
                      </div>
                    </div>

                    <p className="text-center text-gray-600">
                      Relax and have fun! Click the fireflies as they light up. This helps you get comfortable before the interview.
                    </p>

                    <div className="flex justify-center pt-4">
                      <Button
                        className="text-white rounded-full px-8"
                        style={{
                          background: 'linear-gradient(135deg, #EC4899 0%, #8B5CF6 100%)'
                        }}
                        onClick={handleStartCalibration}
                      >
                        Start Game
                      </Button>
                    </div>
                  </div>
                </Card>
              )}

              {isCalibrating && (
                <div
                  ref={calibrationRef}
                  className="fixed inset-0 w-screen h-screen cursor-crosshair"
                  style={{
                    background: 'linear-gradient(135deg, #5B21B6 0%, #DB2777 100%)',
                    zIndex: 9999
                  }}
                >
                  <div className="absolute top-0 left-0 right-0 p-6 flex justify-between items-center">
                    <div className="text-white">
                      <div className="text-sm opacity-80 mb-1">Progress: {targetsCaught} / {totalTargets} targets</div>
                      <div className="w-64 bg-white/20 rounded-full h-2">
                        <div
                          className="bg-white h-2 rounded-full transition-all duration-300"
                          style={{ width: `${(targetsCaught / totalTargets) * 100}%` }}
                        />
                      </div>
                    </div>
                    <div className="text-white text-right">
                      <div className="text-sm opacity-80">Score</div>
                      <div className="text-3xl">{score}</div>
                    </div>
                  </div>

                  {fireflies.map((firefly) => (
                    <div
                      key={firefly.id}
                      className="absolute animate-pulse cursor-pointer"
                      style={{
                        left: `${firefly.x}%`,
                        top: `${firefly.y}%`,
                        transform: 'translate(-50%, -50%)'
                      }}
                      onClick={() => handleFireflyClick(firefly)}
                    >
                      <svg width="40" height="40" viewBox="0 0 40 40">
                        <circle cx="20" cy="20" r="15" fill="#FCD34D" opacity="0.3" />
                        <circle cx="20" cy="20" r="10" fill="#FCD34D" opacity="0.6" />
                        <circle cx="20" cy="20" r="5" fill="#FDE047" />
                        <circle cx="18" cy="18" r="2" fill="#FEF9C3" />
                      </svg>
                    </div>
                  ))}

                  {[...Array(30)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-1 h-1 bg-white rounded-full opacity-40"
                      style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`
                      }}
                    />
                  ))}
                </div>
              )}
            </>
          );
        } else {
          return (
            <Card className="max-w-5xl mx-auto p-8">
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: '#10B981' }}>
                    <CheckCircle2 className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-gray-700">Great Job!</h3>
                </div>

                <div className="flex items-center gap-2 p-4 rounded-lg" style={{ backgroundColor: '#D1FAE5' }}>
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <span className="text-emerald-700">We've successfully broken the ice! You're all warmed up and ready to go.</span>
                </div>

                <p className="text-gray-600">
                  Excellent! You're now comfortable and ready to shine in your interview. Let's proceed to the next step.
                </p>

                <div className="flex justify-center pt-4">
                  <Button
                    className="text-white rounded-full px-8"
                    style={{ backgroundColor: '#6366F1' }}
                    onClick={() => setCurrentStep(6)}
                  >
                    Continue to Next Step
                  </Button>
                </div>
              </div>
            </Card>
          );
        }

      case 6:
        return (
          <Card className="max-w-5xl mx-auto p-8">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: '#6366F1' }}>
                  <Copy className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-gray-700">Copy & Paste Disabled</h3>
              </div>

              <p className="text-gray-600">
                To maintain the integrity and fairness of this environment, copy and paste functionality has been disabled during your session.
              </p>

              <div className="p-4 rounded-lg" style={{ backgroundColor: '#FEE2E2' }}>
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 flex-shrink-0 text-red-600" />
                  <div>
                    <h4 className="text-red-600 mb-1">Important Notice</h4>
                    <p className="text-red-600 text-sm">
                      Any attempt to copy or paste content will be detected and may result in session termination.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-gray-700 mb-4">What this means:</h4>
                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-3 rounded-lg" style={{ backgroundColor: '#F9FAFB' }}>
                    <X className="w-5 h-5 flex-shrink-0 text-red-500 mt-0.5" />
                    <div>
                      <span className="text-gray-900">Copy (Ctrl+C / Cmd+C):</span>
                      <span className="text-gray-600 ml-1">Disabled throughout the session</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 rounded-lg" style={{ backgroundColor: '#F9FAFB' }}>
                    <X className="w-5 h-5 flex-shrink-0 text-red-500 mt-0.5" />
                    <div>
                      <span className="text-gray-900">Paste (Ctrl+V / Cmd+V):</span>
                      <span className="text-gray-600 ml-1">Disabled throughout the session</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 rounded-lg" style={{ backgroundColor: '#F9FAFB' }}>
                    <X className="w-5 h-5 flex-shrink-0 text-red-500 mt-0.5" />
                    <div>
                      <span className="text-gray-900">Right-click context menu:</span>
                      <span className="text-gray-600 ml-1">Copy/paste options removed</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={copyPasteUnderstood}
                    onChange={(e) => setCopyPasteUnderstood(e.target.checked)}
                    className="mt-1 w-4 h-4 rounded border-gray-300"
                    style={{ accentColor: '#6366F1' }}
                  />
                  <span className="text-gray-600 text-sm">
                    I understand that copy and paste functionality is disabled for this session
                  </span>
                </label>
              </div>

              <div className="flex justify-end pt-4">
                <Button
                  className="text-white rounded-full px-8"
                  style={{ backgroundColor: '#6366F1' }}
                  onClick={() => setCurrentStep(7)}
                  disabled={!copyPasteUnderstood}
                >
                  Next Step
                </Button>
              </div>
            </div>
          </Card>
        );

      case 7:
        return (
          <Card className="max-w-5xl mx-auto p-8">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#EEF2FF' }}>
                  <Users className="w-6 h-6" style={{ color: '#6366F1' }} />
                </div>
                <h3 className="text-gray-700">One Person Presence</h3>
              </div>

              <p className="text-gray-600">
                For a fair and secure environment, only one person should be present during the session. Our monitoring system will detect multiple people in the frame.
              </p>

              <div className="p-4 rounded-lg" style={{ backgroundColor: '#FEE2E2' }}>
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 flex-shrink-0 text-red-600" />
                  <div>
                    <h4 className="text-red-600 mb-1">Automatic Session Termination</h4>
                    <p className="text-red-600 text-sm">
                      If multiple people are detected, or if you leave the environment, your session will be automatically terminated and you will be required to restart.
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6 pt-4">
                <div className="p-6 rounded-lg" style={{ backgroundColor: '#D1FAE5' }}>
                  <div className="flex flex-col items-center text-center space-y-3">
                    <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ backgroundColor: '#10B981' }}>
                      <User className="w-8 h-8 text-white" />
                    </div>
                    <h4 className="text-emerald-700">Allowed</h4>
                    <p className="text-emerald-600 text-sm">
                      One person visible in the camera frame at all times
                    </p>
                  </div>
                </div>

                <div className="p-6 rounded-lg" style={{ backgroundColor: '#FEE2E2' }}>
                  <div className="flex flex-col items-center text-center space-y-3">
                    <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ backgroundColor: '#EF4444' }}>
                      <Users className="w-8 h-8 text-white" />
                    </div>
                    <h4 className="text-red-600">Not Allowed</h4>
                    <p className="text-red-600 text-sm">
                      Multiple people or leaving the environment during the session
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <h4 className="text-gray-700 mb-3">What will happen if violated:</h4>
                <div className="p-4 rounded-lg" style={{ backgroundColor: '#F9FAFB' }}>
                  <div className="text-center">
                    <p className="text-gray-900 mb-1">Will be Discussed</p>
                    <p className="text-gray-500 text-sm">Supporting text</p>
                  </div>
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <Button
                  className="text-white rounded-full px-8"
                  style={{ backgroundColor: '#6366F1' }}
                  onClick={() => setCurrentStep(8)}
                >
                  Next Step
                </Button>
              </div>
            </div>
          </Card>
        );

      case 8:
        return (
          <Card className="max-w-5xl mx-auto p-12">
            <div className="flex flex-col items-center text-center space-y-8">
              <div className="w-24 h-24 rounded-full flex items-center justify-center" style={{ backgroundColor: '#10B981' }}>
                <CheckCircle2 className="w-16 h-16 text-white" />
              </div>

              <h2 className="text-gray-700">All Set!</h2>

              <p className="text-gray-600">
                You've completed all the setup steps
              </p>

              <Button
                className="text-white rounded-full px-12 py-6 text-lg"
                style={{ backgroundColor: '#6366F1' }}
                onClick={() => setInInterviewSession(true)}
              >
                Start Session →
              </Button>

              <p className="text-gray-700 text-sm max-w-xl">
                Remember: Stay focused, remain alone in frame, and speak clearly when responding to the AI
              </p>
            </div>
          </Card>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#EDF0F8' }}>
      <header className="px-12 py-6">
        <div className="flex items-center justify-between">
          <div>
            <img src={logo} alt="ERAMATCH - A Smarter Recruitment System" className="h-12" />
          </div>
          <div>
            <Button
              className="rounded-full px-6 transition-colors duration-200 border"
              style={{ backgroundColor: '#EDF0F8', color: '#EF4444', borderColor: '#EF4444' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#EF4444';
                e.currentTarget.style.color = '#FFFFFF';
                e.currentTarget.style.borderColor = '#EF4444';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#EDF0F8';
                e.currentTarget.style.color = '#EF4444';
                e.currentTarget.style.borderColor = '#EF4444';
              }}
              onClick={onSignOut}
            >
              Sign out
            </Button>
          </div>
        </div>
      </header>

      {!inInterviewSession ? (
        <>
          <div className="px-12 py-6">
            <Card className="max-w-5xl mx-auto p-6">
              <div className="flex items-start justify-between px-12">
                {steps.map((step) => (
                  <div key={step.number} className="flex flex-col items-center w-20">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center text-white transition-all`}
                      style={currentStep >= step.number ? { backgroundColor: '#6366F1' } : { backgroundColor: '#D1D5DB' }}
                    >
                      {currentStep > step.number ? '✓' : step.number}
                    </div>
                    <span className={`text-xs mt-2 text-center ${currentStep >= step.number ? 'text-gray-700' : 'text-gray-400'}`}>
                      {step.label}
                    </span>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          <main className="px-12 py-8">
            {renderStepContent()}
          </main>
        </>
      ) : (
        <>
          {/* Interview Session Content */}
          <main className="px-12 py-8">
            {showUploadProgress ? (
              // Upload Progress Screen
              <Card className="max-w-4xl mx-auto p-12">
                <div className="flex flex-col items-center space-y-6">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center animate-spin" style={{ borderTop: '4px solid #6366F1', borderRight: '4px solid transparent', borderBottom: '4px solid transparent', borderLeft: '4px solid transparent' }} />

                  <h3 className="text-gray-700">Uploading interview recording...</h3>

                  <div className="w-full max-w-md">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-600 text-sm">Upload progress</span>
                      <span className="text-gray-700">{uploadProgress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="h-2 rounded-full transition-all duration-300"
                        style={{
                          width: `${uploadProgress}%`,
                          backgroundColor: '#6366F1'
                        }}
                      />
                    </div>
                  </div>

                  <p className="text-gray-500 text-sm">Please wait while we save your interview...</p>
                </div>
              </Card>
            ) : (
              // Interview Screen - Camera on left, Voice animation on right
              <div className="max-w-6xl mx-auto">
                <div className="grid grid-cols-2 gap-6">
                  {/* Left - Camera View */}
                  <div className="bg-slate-900 rounded-lg overflow-hidden flex flex-col items-center justify-center" style={{ height: '600px' }}>
                    <Camera className="w-16 h-16 text-slate-600 mb-2" />
                    <p className="text-slate-500 text-sm">Camera not available</p>
                  </div>

                  {/* Right - Voice Animation */}
                  <div className="flex flex-col items-center justify-center rounded-lg p-12" style={{ height: '600px', backgroundColor: '#F9FAFB' }}>
                    {aiSpeaking ? (
                      <div className="flex flex-col items-center gap-6">
                        <Volume2 className="w-16 h-16" style={{ color: '#6366F1' }} />
                        <div className="flex gap-2 items-end">
                          {[...Array(10)].map((_, i) => (
                            <div
                              key={i}
                              className="w-3 rounded-full animate-pulse"
                              style={{
                                height: `${Math.random() * 100 + 50}px`,
                                backgroundColor: '#6366F1',
                                animationDelay: `${i * 0.1}s`
                              }}
                            />
                          ))}
                        </div>
                        <p className="text-gray-700 text-xl">AI is asking...</p>
                      </div>
                    ) : candidateSpeaking ? (
                      <div className="flex flex-col items-center gap-6">
                        <Mic className="w-16 h-16" style={{ color: '#10B981' }} />
                        <div className="flex gap-2 items-end">
                          {[...Array(10)].map((_, i) => (
                            <div
                              key={i}
                              className="w-3 rounded-full animate-pulse"
                              style={{
                                height: `${Math.random() * 100 + 50}px`,
                                backgroundColor: '#10B981',
                                animationDelay: `${i * 0.1}s`
                              }}
                            />
                          ))}
                        </div>
                        <p className="text-gray-700 text-xl">You are speaking...</p>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center gap-6">
                        <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ backgroundColor: '#E5E7EB' }}>
                          <Mic className="w-8 h-8 text-gray-400" />
                        </div>
                        <div className="flex gap-2 items-end">
                          {[...Array(10)].map((_, i) => (
                            <div
                              key={i}
                              className="w-3 rounded-full"
                              style={{
                                height: '30px',
                                backgroundColor: '#D1D5DB'
                              }}
                            />
                          ))}
                        </div>
                        <p className="text-gray-500">Waiting...</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </main>
        </>
      )}
    </div>
  );
}