import { XCircle, CheckCircle, PauseCircle, User } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from './ui/dialog';
import { Button } from './ui/button';
import { useState } from 'react';
import { Textarea } from './ui/textarea';

interface ClosePositionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (outcome: PositionOutcome) => void;
  positionTitle: string;
  candidatesCount: number;
  groupsCount: number;
}

export type PositionClosureStatus = 'Filled' | 'Cancelled' | 'On-Hold';

export interface PositionOutcome {
  status: PositionClosureStatus;
  reason: string;
  selectedCandidatesCount?: number;
  closureDate: string;
}

export function ClosePositionModal({
  isOpen,
  onClose,
  onConfirm,
  positionTitle,
  candidatesCount,
  groupsCount
}: ClosePositionModalProps) {
  const [selectedStatus, setSelectedStatus] = useState<PositionClosureStatus | null>(null);
  const [reason, setReason] = useState('');
  const [selectedCount, setSelectedCount] = useState<number>(1);

  const handleConfirm = () => {
    if (!selectedStatus) return;

    const outcome: PositionOutcome = {
      status: selectedStatus,
      reason: reason.trim() || getDefaultReason(selectedStatus),
      selectedCandidatesCount: selectedStatus === 'Filled' ? selectedCount : undefined,
      closureDate: new Date().toISOString()
    };

    onConfirm(outcome);
    handleReset();
    onClose();
  };

  const handleReset = () => {
    setSelectedStatus(null);
    setReason('');
    setSelectedCount(1);
  };

  const handleClose = () => {
    handleReset();
    onClose();
  };

  const getDefaultReason = (status: PositionClosureStatus): string => {
    switch (status) {
      case 'Filled':
        return `Position successfully filled with ${selectedCount} qualified candidate${selectedCount > 1 ? 's' : ''}`;
      case 'Cancelled':
        return 'Position cancelled';
      case 'On-Hold':
        return 'Position placed on hold';
    }
  };

  const outcomeOptions: Array<{
    status: PositionClosureStatus;
    icon: typeof CheckCircle;
    color: string;
    bgColor: string;
    title: string;
    description: string;
  }> = [
    {
      status: 'Filled',
      icon: CheckCircle,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
      title: 'Position Filled',
      description: 'Successfully hired candidate(s)'
    },
    {
      status: 'Cancelled',
      icon: XCircle,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      title: 'Position Cancelled',
      description: 'No longer recruiting for this role'
    },
    {
      status: 'On-Hold',
      icon: PauseCircle,
      color: 'text-amber-600',
      bgColor: 'bg-amber-50',
      title: 'Position On-Hold',
      description: 'Temporarily paused recruitment'
    }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="font-['Arimo',sans-serif] text-[20px] text-black">
            Close Position
          </DialogTitle>
          <DialogDescription className="font-['Arimo',sans-serif] text-[14px] text-[#6b7280] leading-[20px]">
            You are closing <span className="text-black font-medium">"{positionTitle}"</span>. 
            Select the outcome and provide details.
          </DialogDescription>
        </DialogHeader>

        {/* Position Summary */}
        <div className="bg-[#f9fafb] rounded-[10px] p-[16px] space-y-[8px]">
          <p className="font-['Arimo',sans-serif] text-[13px] text-[#6b7280]">
            Position Summary:
          </p>
          <div className="flex items-center gap-[16px]">
            <div className="flex items-center gap-[6px]">
              <User size={14} className="text-[#9ca3af]" />
              <span className="font-['Arimo',sans-serif] text-[13px] text-[#374151]">
                <span className="font-medium">{candidatesCount}</span> candidates
              </span>
            </div>
            <div className="flex items-center gap-[6px]">
              <div className="w-[4px] h-[4px] rounded-full bg-[#9ca3af]" />
              <span className="font-['Arimo',sans-serif] text-[13px] text-[#374151]">
                <span className="font-medium">{groupsCount}</span> groups created
              </span>
            </div>
          </div>
        </div>

        {/* Outcome Selection */}
        <div className="space-y-[12px]">
          <p className="font-['Arimo',sans-serif] text-[14px] text-[#374151] font-medium">
            Select Outcome:
          </p>
          <div className="grid grid-cols-3 gap-[12px]">
            {outcomeOptions.map((option) => {
              const Icon = option.icon;
              const isSelected = selectedStatus === option.status;
              
              return (
                <button
                  key={option.status}
                  onClick={() => setSelectedStatus(option.status)}
                  className={`p-[16px] rounded-[10px] border-2 transition-all ${
                    isSelected
                      ? 'border-[#6366f1] bg-[#eef2ff]'
                      : 'border-[#e5e7eb] bg-white hover:border-[#d1d5db]'
                  }`}
                >
                  <div className={`w-[40px] h-[40px] rounded-full ${option.bgColor} flex items-center justify-center mx-auto mb-[12px]`}>
                    <Icon size={20} className={option.color} />
                  </div>
                  <p className={`font-['Arimo',sans-serif] text-[13px] font-medium mb-[4px] ${
                    isSelected ? 'text-[#6366f1]' : 'text-[#374151]'
                  }`}>
                    {option.title}
                  </p>
                  <p className="font-['Arimo',sans-serif] text-[11px] text-[#9ca3af] leading-[16px]">
                    {option.description}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Filled - Candidate Count */}
        {selectedStatus === 'Filled' && (
          <div className="space-y-[8px]">
            <label className="font-['Arimo',sans-serif] text-[14px] text-[#374151] font-medium">
              Number of Candidates Hired:
            </label>
            <div className="flex items-center gap-[12px]">
              <button
                onClick={() => setSelectedCount(Math.max(1, selectedCount - 1))}
                className="w-[36px] h-[36px] rounded-[6px] border border-[#e5e7eb] hover:bg-[#f9fafb] flex items-center justify-center"
              >
                <span className="text-[18px] text-[#6b7280]">−</span>
              </button>
              <input
                type="number"
                min="1"
                value={selectedCount}
                onChange={(e) => setSelectedCount(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-[80px] h-[36px] rounded-[6px] border border-[#e5e7eb] text-center font-['Arimo',sans-serif] text-[14px] text-black focus:outline-none focus:ring-2 focus:ring-[#6366f1]"
              />
              <button
                onClick={() => setSelectedCount(selectedCount + 1)}
                className="w-[36px] h-[36px] rounded-[6px] border border-[#e5e7eb] hover:bg-[#f9fafb] flex items-center justify-center"
              >
                <span className="text-[18px] text-[#6b7280]">+</span>
              </button>
              <span className="font-['Arimo',sans-serif] text-[13px] text-[#9ca3af]">
                candidate{selectedCount !== 1 ? 's' : ''}
              </span>
            </div>
          </div>
        )}

        {/* Reason/Notes */}
        {selectedStatus && (
          <div className="space-y-[8px]">
            <label className="font-['Arimo',sans-serif] text-[14px] text-[#374151] font-medium">
              {selectedStatus === 'Filled' ? 'Notes (Optional):' : 'Reason (Optional):'}
            </label>
            <Textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder={
                selectedStatus === 'Filled' 
                  ? 'Add any notes about the hire...'
                  : selectedStatus === 'Cancelled'
                  ? 'e.g., Budget constraints, role no longer needed...'
                  : 'e.g., Pending budget approval, strategic review...'
              }
              rows={3}
              className="font-['Arimo',sans-serif] text-[13px] resize-none"
            />
          </div>
        )}

        <DialogFooter className="gap-[12px] mt-[8px]">
          <Button
            onClick={handleClose}
            variant="outline"
            className="font-['Arimo',sans-serif] text-[14px] h-[40px] px-[20px] border-[#e5e7eb] hover:bg-[#f9fafb]"
          >
            Cancel
          </Button>
          <Button
            onClick={handleConfirm}
            disabled={!selectedStatus}
            className={`font-['Arimo',sans-serif] text-[14px] h-[40px] px-[20px] ${
              selectedStatus === 'Filled'
                ? 'bg-emerald-600 hover:bg-emerald-700'
                : selectedStatus === 'Cancelled'
                ? 'bg-red-600 hover:bg-red-700'
                : selectedStatus === 'On-Hold'
                ? 'bg-amber-600 hover:bg-amber-700'
                : 'bg-[#9ca3af]'
            } text-white disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            Close Position
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
