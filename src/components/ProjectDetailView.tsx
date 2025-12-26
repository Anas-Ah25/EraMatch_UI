import { ChevronLeft, Plus, Pencil, Sparkles } from 'lucide-react';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from './ui/dialog';
import { Switch } from './ui/switch';
import { useState, useEffect } from 'react';
import { PositionDetailView } from './PositionDetailView';

interface Position {
  id: number;
  title: string;
  description?: string;
  screeningConditions?: string;
  applicants: number;
  isOpen: boolean;
}

interface ProjectDetailViewProps {
  projectTitle: string;
  projectDescription?: string;
  onBack: () => void;
  backLabel?: string;
  onCreateAssessment?: () => void;
  pendingAssessment?: any;
  onAssessmentConsumed?: () => void;
  onViewDashboard?: (projectTitle: string, positionTitle: string) => void;
  onViewGroup?: (groupId: string) => void;
}

// Store positions data for each project
const projectPositions: { [key: string]: Position[] } = {
  'Summer Internship': [
    { id: 1, title: 'Senior Software Engineer', description: '', screeningConditions: '', applicants: 45, isOpen: true },
    { id: 2, title: 'Frontend Developer', description: '', screeningConditions: '', applicants: 32, isOpen: true },
    { id: 3, title: 'DevOps Engineer', description: '', screeningConditions: '', applicants: 19, isOpen: true },
    { id: 4, title: 'Backend Developer', description: '', screeningConditions: '', applicants: 28, isOpen: false },
  ],
  'Software Engineering II (DevOps Team)': [
    { id: 1, title: 'Senior DevOps Engineer', description: '', screeningConditions: '', applicants: 23, isOpen: true },
    { id: 2, title: 'Cloud Infrastructure Specialist', description: '', screeningConditions: '', applicants: 15, isOpen: true },
  ],
  'Product Migration Project': [
    { id: 1, title: 'Migration Architect', description: '', screeningConditions: '', applicants: 12, isOpen: true },
    { id: 2, title: 'Senior Backend Developer', description: '', screeningConditions: '', applicants: 34, isOpen: true },
    { id: 3, title: 'Database Engineer', description: '', screeningConditions: '', applicants: 18, isOpen: true },
    { id: 4, title: 'QA Engineer', description: '', screeningConditions: '', applicants: 22, isOpen: true },
    { id: 5, title: 'Technical Writer', description: '', screeningConditions: '', applicants: 8, isOpen: true },
    { id: 6, title: 'DevOps Specialist', description: '', screeningConditions: '', applicants: 14, isOpen: true },
    { id: 7, title: 'Product Manager', description: '', screeningConditions: '', applicants: 9, isOpen: false },
  ],
  'AI team': [
    { id: 1, title: 'Machine Learning Engineer', description: '', screeningConditions: '', applicants: 56, isOpen: false },
    { id: 2, title: 'Data Scientist', description: '', screeningConditions: '', applicants: 31, isOpen: false },
    { id: 3, title: 'AI Research Scientist', description: '', screeningConditions: '', applicants: 13, isOpen: false },
  ],
};

export function ProjectDetailView({ projectTitle, projectDescription, onBack, backLabel = 'Back', onCreateAssessment, pendingAssessment, onAssessmentConsumed, onViewDashboard, onViewGroup }: ProjectDetailViewProps) {
  // Get positions for this specific project, or use empty array as fallback
  const initialPositions = projectPositions[projectTitle] || [];
  
  const [positions, setPositions] = useState<Position[]>(initialPositions);
  const [viewingPosition, setViewingPosition] = useState<Position | null>(null);
  
  // Store assessments per position
  const [positionAssessments, setPositionAssessments] = useState<{ [positionId: number]: any[] }>({});

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingPosition, setEditingPosition] = useState<Position | null>(null);

  const [newPositionTitle, setNewPositionTitle] = useState('');
  const [newPositionDescription, setNewPositionDescription] = useState('');
  const [newPositionScreening, setNewPositionScreening] = useState('');

  const [editPositionTitle, setEditPositionTitle] = useState('');
  const [editPositionDescription, setEditPositionDescription] = useState('');
  const [editPositionScreening, setEditPositionScreening] = useState('');
  const [editPositionIsOpen, setEditPositionIsOpen] = useState(false);

  const handleAddPosition = () => {
    if (newPositionTitle.trim()) {
      const newPosition: Position = {
        id: Date.now(),
        title: newPositionTitle,
        description: newPositionDescription,
        screeningConditions: newPositionScreening,
        applicants: 0,
        isOpen: true,
      };
      setPositions([...positions, newPosition]);
      setNewPositionTitle('');
      setNewPositionDescription('');
      setNewPositionScreening('');
      setIsAddDialogOpen(false);
    }
  };

  const handleEditClick = (position: Position) => {
    setEditingPosition(position);
    setEditPositionTitle(position.title);
    setEditPositionDescription(position.description || '');
    setEditPositionScreening(position.screeningConditions || '');
    setEditPositionIsOpen(position.isOpen);
    setIsEditDialogOpen(true);
  };

  const handleSaveChanges = () => {
    if (editingPosition && editPositionTitle.trim()) {
      setPositions(positions.map(p =>
        p.id === editingPosition.id
          ? {
              ...p,
              title: editPositionTitle,
              description: editPositionDescription,
              screeningConditions: editPositionScreening,
              isOpen: editPositionIsOpen
            }
          : p
      ));
      setIsEditDialogOpen(false);
      setEditingPosition(null);
    }
  };

  const handleViewPosition = (position: Position) => {
    setViewingPosition(position);
  };

  const handleBackToPositionsList = () => {
    setViewingPosition(null);
  };

  const handleSaveFromPositionView = (title: string, description: string, screening: string, isOpen: boolean) => {
    if (viewingPosition) {
      setPositions(positions.map(p =>
        p.id === viewingPosition.id
          ? {
              ...p,
              title,
              description,
              screeningConditions: screening,
              isOpen
            }
          : p
      ));
      // Update the viewing position with new values
      setViewingPosition({
        ...viewingPosition,
        title,
        description,
        screeningConditions: screening,
        isOpen
      });
    }
  };

  // Handle pending assessment in useEffect to avoid setState during render
  useEffect(() => {
    if (viewingPosition && pendingAssessment && !positionAssessments[viewingPosition.id]?.some(a => a.id === pendingAssessment.id)) {
      const updatedAssessments = {
        ...positionAssessments,
        [viewingPosition.id]: [...(positionAssessments[viewingPosition.id] || []), pendingAssessment]
      };
      setPositionAssessments(updatedAssessments);
      if (onAssessmentConsumed) {
        onAssessmentConsumed();
      }
    }
  }, [viewingPosition, pendingAssessment]);

  // If viewing a specific position, show the position detail view
  if (viewingPosition) {
    return (
      <PositionDetailView
        positionTitle={viewingPosition.title}
        projectTitle={projectTitle}
        description={viewingPosition.description}
        screeningConditions={viewingPosition.screeningConditions}
        isOpen={viewingPosition.isOpen}
        onBack={handleBackToPositionsList}
        onSave={handleSaveFromPositionView}
        onCreateAssessment={onCreateAssessment || (() => {})}
        savedAssessments={positionAssessments[viewingPosition.id] || []}
        onSaveAssessment={(assessment) => {
          setPositionAssessments({
            ...positionAssessments,
            [viewingPosition.id]: [...(positionAssessments[viewingPosition.id] || []), assessment]
          });
        }}
        onViewDashboard={() => onViewDashboard?.(projectTitle, viewingPosition.title)}
        onViewGroup={onViewGroup}
      />
    );
  }

  return (
    <>
      <div className="h-full w-full overflow-auto">
        <div className="max-w-[1400px] mx-auto px-[48px] py-[24px]">
          {/* Back Button */}
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-[#9ca3af] hover:text-[#6b7280] transition-colors font-['Arimo',sans-serif] text-[14px] mb-[28px]"
          >
            <ChevronLeft size={18} strokeWidth={1.5} />
            {backLabel}
          </button>

          {/* Project Title */}
          <h1 className="font-['Arimo',sans-serif] text-[28px] text-black mb-[12px]">
            {projectTitle}
          </h1>

          {/* Project Description */}
          <p className="font-['Arimo',sans-serif] text-[14px] text-[#9ca3af] mb-[36px] leading-[20px]">
            {projectDescription || 'This project aims to enhance the overall system performance and user experience by implementing modern development practices and technologies.'}
          </p>

          {/* Positions Section */}
          <div className="mb-[24px]">
            <div className="flex items-center justify-between mb-[20px]">
              <h2 className="font-['Arimo',sans-serif] text-[18px] text-black">
                Positions
              </h2>
              <button
                onClick={() => setIsAddDialogOpen(true)}
                className="w-[28px] h-[28px] rounded-[6px] flex items-center justify-center hover:bg-[#ede9ff] transition-colors"
              >
                <Plus size={18} className="text-black" strokeWidth={2} />
              </button>
            </div>

            {/* Positions List */}
            <div className="space-y-[12px]">
              {positions.length === 0 ? (
                <div className="bg-white rounded-[10px] shadow-sm h-[120px] flex items-center justify-center">
                  <p className="font-['Arimo',sans-serif] text-[14px] text-[#9ca3af]">
                    No positions available for this project
                  </p>
                </div>
              ) : (
                positions.map((position) => (
                  <div
                    key={position.id}
                    className="bg-white rounded-[10px] shadow-sm h-[68px] flex items-center px-[24px] gap-[20px]"
                  >
                    {/* Position Title */}
                    <div className="flex-1 min-w-0">
                      <p className="font-['Arimo',sans-serif] text-[15px] text-black">
                        {position.title}
                      </p>
                    </div>

                    {/* Currently Open Badge */}
                    {position.isOpen && (
                      <div className="h-[26px] rounded-full border border-[#10b981] px-[12px] flex items-center justify-center">
                        <span className="font-['Arimo',sans-serif] text-[12px] text-[#10b981]">
                          currently open
                        </span>
                      </div>
                    )}

                    {/* Applicants Count */}
                    <div className="min-w-[100px] text-right">
                      <span className="font-['Arimo',sans-serif] text-[13px] text-[#9ca3af]">
                        {position.applicants} applicants
                      </span>
                    </div>

                    {/* Edit Button */}
                    <button
                      onClick={() => handleEditClick(position)}
                      className="w-[32px] h-[32px] rounded-[6px] flex items-center justify-center hover:bg-[#f3f4f6] transition-colors"
                    >
                      <Pencil size={16} className="text-[#9ca3af]" strokeWidth={1.5} />
                    </button>

                    {/* View Button */}
                    <button 
                      onClick={() => handleViewPosition(position)}
                      className="bg-[#6366f1] h-[34px] rounded-[6px] px-[20px] flex items-center justify-center hover:bg-[#5558e3] transition-colors"
                    >
                      <span className="font-['Arimo',sans-serif] text-[14px] text-white">
                        View
                      </span>
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Add New Position Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[500px] bg-white p-0">
          <div className="p-6 pb-4">
            <DialogHeader className="mb-4">
              <DialogTitle className="text-[18px] font-['Arimo',sans-serif] text-black">Add New Position</DialogTitle>
              <DialogDescription className="text-[13px] text-[#9ca3af] font-['Arimo',sans-serif] mt-1">
                Enter the details to create a new position.
              </DialogDescription>
            </DialogHeader>

            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-[14px] font-['Arimo',sans-serif] text-black">
                  Position Title
                </label>
                <input
                  type="text"
                  placeholder="Enter position title"
                  value={newPositionTitle}
                  onChange={(e) => setNewPositionTitle(e.target.value)}
                  className="w-full h-[40px] bg-[#f9fafb] rounded-[6px] border-0 px-[12px] font-['Arimo',sans-serif] text-[14px] text-black placeholder:text-[#9ca3af] focus:outline-none focus:ring-2 focus:ring-[#6366f1]"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[14px] font-['Arimo',sans-serif] text-black">
                  Description
                </label>
                <textarea
                  placeholder="Enter position description"
                  value={newPositionDescription}
                  onChange={(e) => setNewPositionDescription(e.target.value)}
                  rows={3}
                  className="w-full bg-[#f9fafb] rounded-[6px] border-0 px-[12px] py-[10px] font-['Arimo',sans-serif] text-[14px] text-black placeholder:text-[#9ca3af] focus:outline-none focus:ring-2 focus:ring-[#6366f1] resize-none"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[14px] font-['Arimo',sans-serif] text-black">
                  Screening Conditions
                </label>
                <textarea
                  placeholder="Enter screening conditions"
                  value={newPositionScreening}
                  onChange={(e) => setNewPositionScreening(e.target.value)}
                  rows={3}
                  className="w-full bg-[#f9fafb] rounded-[6px] border-0 px-[12px] py-[10px] font-['Arimo',sans-serif] text-[14px] text-black placeholder:text-[#9ca3af] focus:outline-none focus:ring-2 focus:ring-[#6366f1] resize-none"
                />
              </div>

              <button className="flex items-center gap-2 h-[36px] px-[14px] rounded-[6px] border border-[#6366f1] bg-white hover:bg-[#f9fafb] transition-colors self-start">
                <Sparkles size={16} className="text-[#6366f1]" />
                <span className="text-[14px] font-['Arimo',sans-serif] text-[#6366f1]">
                  AI Enhance
                </span>
              </button>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-[#f3f4f6]">
            <button
              onClick={() => {
                setIsAddDialogOpen(false);
                setNewPositionTitle('');
                setNewPositionDescription('');
                setNewPositionScreening('');
              }}
              className="h-[38px] px-[20px] rounded-[6px] font-['Arimo',sans-serif] text-[14px] text-[#9ca3af] hover:bg-[#f9fafb] transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleAddPosition}
              className="h-[38px] px-[20px] rounded-[6px] bg-[#6366f1] hover:bg-[#5558e3] font-['Arimo',sans-serif] text-[14px] text-white transition-colors"
            >
              Add Position
            </button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Position Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[500px] bg-white p-0">
          <div className="p-6 pb-4">
            <DialogHeader className="mb-4">
              <DialogTitle className="text-[18px] font-['Arimo',sans-serif] text-black">Edit Position</DialogTitle>
              <DialogDescription className="text-[13px] text-[#9ca3af] font-['Arimo',sans-serif] mt-1">
                Update the position details and opening status.
              </DialogDescription>
            </DialogHeader>

            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-[14px] font-['Arimo',sans-serif] text-black">
                  Position Title
                </label>
                <input
                  type="text"
                  placeholder="Enter position title"
                  value={editPositionTitle}
                  onChange={(e) => setEditPositionTitle(e.target.value)}
                  className="w-full h-[40px] bg-[#f9fafb] rounded-[6px] border-0 px-[12px] font-['Arimo',sans-serif] text-[14px] text-black placeholder:text-[#9ca3af] focus:outline-none focus:ring-2 focus:ring-[#6366f1]"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[14px] font-['Arimo',sans-serif] text-black">
                  Description
                </label>
                <textarea
                  placeholder="Enter position description"
                  value={editPositionDescription}
                  onChange={(e) => setEditPositionDescription(e.target.value)}
                  rows={3}
                  className="w-full bg-[#f9fafb] rounded-[6px] border-0 px-[12px] py-[10px] font-['Arimo',sans-serif] text-[14px] text-black placeholder:text-[#9ca3af] focus:outline-none focus:ring-2 focus:ring-[#6366f1] resize-none"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[14px] font-['Arimo',sans-serif] text-black">
                  Screening Conditions
                </label>
                <textarea
                  placeholder="Enter screening conditions"
                  value={editPositionScreening}
                  onChange={(e) => setEditPositionScreening(e.target.value)}
                  rows={3}
                  className="w-full bg-[#f9fafb] rounded-[6px] border-0 px-[12px] py-[10px] font-['Arimo',sans-serif] text-[14px] text-black placeholder:text-[#9ca3af] focus:outline-none focus:ring-2 focus:ring-[#6366f1] resize-none"
                />
              </div>

              <button className="flex items-center gap-2 h-[36px] px-[14px] rounded-[6px] border border-[#6366f1] bg-white hover:bg-[#f9fafb] transition-colors self-start">
                <Sparkles size={16} className="text-[#6366f1]" />
                <span className="text-[14px] font-['Arimo',sans-serif] text-[#6366f1]">
                  AI Enhance
                </span>
              </button>

              <div className="flex items-center justify-between pt-2">
                <label className="text-[14px] font-['Arimo',sans-serif] text-black">
                  Currently Open
                </label>
                <Switch
                  checked={editPositionIsOpen}
                  onCheckedChange={setEditPositionIsOpen}
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-[#f3f4f6]">
            <button
              onClick={() => {
                setIsEditDialogOpen(false);
                setEditingPosition(null);
              }}
              className="h-[38px] px-[20px] rounded-[6px] font-['Arimo',sans-serif] text-[14px] text-[#9ca3af] hover:bg-[#f9fafb] transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveChanges}
              className="h-[38px] px-[20px] rounded-[6px] bg-[#6366f1] hover:bg-[#5558e3] font-['Arimo',sans-serif] text-[14px] text-white transition-colors"
            >
              Save Changes
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}