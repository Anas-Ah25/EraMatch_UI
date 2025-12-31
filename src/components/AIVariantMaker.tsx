import { useState } from 'react';
import { X, Wand2, Check, Edit2 } from 'lucide-react';
import { Button } from './ui/button';

interface QuestionVariant {
  id: string;
  questionText: string;
  type: 'mcq' | 'essay' | 'code';
  [key: string]: any;
}

interface AIVariantMakerProps {
  baseVariant: QuestionVariant;
  onGenerate: (variants: QuestionVariant[]) => void;
  onClose: () => void;
}

export function AIVariantMaker({ baseVariant, onGenerate, onClose }: AIVariantMakerProps) {
  const [numVariants, setNumVariants] = useState(3);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedVariants, setGeneratedVariants] = useState<QuestionVariant[]>([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editedText, setEditedText] = useState('');

  const handleGenerate = () => {
    setIsGenerating(true);
    
    // Simulate AI variant generation
    setTimeout(() => {
      const variants: QuestionVariant[] = [];
      
      for (let i = 0; i < numVariants; i++) {
        let variant: QuestionVariant;
        
        if (baseVariant.type === 'mcq') {
          variant = {
            ...baseVariant,
            id: `variant-${Date.now()}-${i}`,
            questionText: baseVariant.questionText.replace(/\?$/, '') + ` (Variant ${i + 1})?`,
            options: baseVariant.options?.map((opt: string) => 
              opt + ` [V${i + 1}]`
            ) || []
          };
        } else if (baseVariant.type === 'essay') {
          variant = {
            ...baseVariant,
            id: `variant-${Date.now()}-${i}`,
            questionText: baseVariant.questionText + ` Consider this from a different perspective (Variant ${i + 1}).`,
            rubric: `${baseVariant.rubric} [Variant ${i + 1} - slightly different focus]`
          };
        } else { // code
          variant = {
            ...baseVariant,
            id: `variant-${Date.now()}-${i}`,
            questionText: baseVariant.questionText + ` [Variant ${i + 1} with modified constraints]`,
            testCases: baseVariant.testCases?.map((tc: any) => ({
              ...tc,
              id: `tc-${Date.now()}-${i}`,
              input: `${tc.input}_v${i + 1}`,
              expectedOutput: `${tc.expectedOutput}_v${i + 1}`
            })) || []
          };
        }
        
        variants.push(variant);
      }
      
      setGeneratedVariants(variants);
      setIsGenerating(false);
    }, 2000);
  };

  const handleStartEdit = (index: number) => {
    setEditingIndex(index);
    setEditedText(generatedVariants[index].questionText);
  };

  const handleSaveEdit = () => {
    if (editingIndex !== null) {
      const updatedVariants = [...generatedVariants];
      updatedVariants[editingIndex] = {
        ...updatedVariants[editingIndex],
        questionText: editedText
      };
      setGeneratedVariants(updatedVariants);
      setEditingIndex(null);
      setEditedText('');
    }
  };

  const handleCancelEdit = () => {
    setEditingIndex(null);
    setEditedText('');
  };

  const handleRemoveVariant = (index: number) => {
    setGeneratedVariants(generatedVariants.filter((_, i) => i !== index));
  };

  const handleSaveAll = () => {
    if (generatedVariants.length === 0) {
      alert('No variants to save');
      return;
    }
    onGenerate(generatedVariants);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6">
      <div className="bg-white rounded-[16px] shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="px-8 py-6 border-b border-[#e5e7eb]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 flex items-center justify-center">
                <Wand2 size={20} className="text-white" />
              </div>
              <div>
                <h2 className="text-[#111827]">AI Variant Generator</h2>
                <p className="font-['Arimo',sans-serif] text-[14px] text-[#6b7280]">
                  Generate similar questions with equal difficulty
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-[8px] flex items-center justify-center hover:bg-[#f9fafb] transition-colors"
            >
              <X size={20} className="text-[#6b7280]" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-8">
          {generatedVariants.length === 0 ? (
            <>
              {/* Base Question */}
              <div className="mb-6">
                <label className="block font-['Arimo',sans-serif] text-[14px] text-[#374151] mb-2">
                  Base Question
                </label>
                <div className="p-4 bg-[#f9fafb] rounded-[12px] border border-[#e5e7eb]">
                  <p className="font-['Arimo',sans-serif] text-[14px] text-[#111827]">
                    {baseVariant.questionText}
                  </p>
                </div>
              </div>

              {/* Number of Variants */}
              <div className="mb-6">
                <label className="block font-['Arimo',sans-serif] text-[14px] text-[#374151] mb-2">
                  Number of Variants to Generate
                </label>
                <input
                  type="number"
                  value={numVariants}
                  onChange={(e) => setNumVariants(Math.max(1, Math.min(10, parseInt(e.target.value) || 1)))}
                  min="1"
                  max="10"
                  className="w-32 h-[44px] px-4 rounded-[8px] border border-[#e5e7eb] font-['Arimo',sans-serif] text-[14px] focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              {/* Info Box */}
              <div className="p-4 bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-200 rounded-[12px]">
                <p className="font-['Arimo',sans-serif] text-[13px] text-purple-900 mb-2">
                  <strong>AI will create {numVariants} variant{numVariants !== 1 ? 's' : ''}:</strong>
                </p>
                <ul className="font-['Arimo',sans-serif] text-[13px] text-purple-800 list-disc list-inside space-y-1">
                  <li>Equal difficulty to the original question</li>
                  <li>Similar structure and format</li>
                  <li>Different wording and examples</li>
                  <li>You can edit each variant before saving</li>
                </ul>
              </div>
            </>
          ) : (
            <>
              {/* Generated Variants */}
              <div className="mb-4">
                <h3 className="text-[#111827] mb-1">Generated Variants</h3>
                <p className="font-['Arimo',sans-serif] text-[14px] text-[#6b7280]">
                  Review and edit variants before saving. All variants will be added to your section.
                </p>
              </div>

              <div className="space-y-4">
                {generatedVariants.map((variant, index) => (
                  <div
                    key={variant.id}
                    className="border border-[#e5e7eb] rounded-[12px] p-6"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center">
                          <span className="text-purple-700 text-[12px] font-medium">{index + 1}</span>
                        </div>
                        <span className="font-['Arimo',sans-serif] text-[13px] text-[#6b7280] font-medium">
                          Variant {index + 1}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        {editingIndex === index ? (
                          <>
                            <Button
                              onClick={handleSaveEdit}
                              size="sm"
                              className="h-8 px-3 rounded-[6px] bg-emerald-600 hover:bg-emerald-700 text-white"
                            >
                              <Check size={14} className="mr-1" />
                              Save
                            </Button>
                            <Button
                              onClick={handleCancelEdit}
                              variant="outline"
                              size="sm"
                              className="h-8 px-3 rounded-[6px]"
                            >
                              Cancel
                            </Button>
                          </>
                        ) : (
                          <>
                            <button
                              onClick={() => handleStartEdit(index)}
                              className="w-8 h-8 rounded-[6px] border border-[#e5e7eb] bg-white hover:bg-[#f9fafb] transition-colors flex items-center justify-center"
                              title="Edit"
                            >
                              <Edit2 size={14} className="text-[#6b7280]" />
                            </button>
                            <button
                              onClick={() => handleRemoveVariant(index)}
                              className="w-8 h-8 rounded-[6px] border border-[#e5e7eb] bg-white hover:bg-red-50 hover:border-red-200 transition-colors flex items-center justify-center"
                              title="Remove"
                            >
                              <X size={14} className="text-red-600" />
                            </button>
                          </>
                        )}
                      </div>
                    </div>

                    {editingIndex === index ? (
                      <textarea
                        value={editedText}
                        onChange={(e) => setEditedText(e.target.value)}
                        rows={4}
                        className="w-full px-4 py-3 rounded-[8px] border border-[#e5e7eb] font-['Arimo',sans-serif] text-[14px] focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                      />
                    ) : (
                      <p className="font-['Arimo',sans-serif] text-[14px] text-[#111827]">
                        {variant.questionText}
                      </p>
                    )}

                    {/* Preview based on type */}
                    {!editingIndex && variant.type === 'mcq' && variant.options && (
                      <div className="mt-3 space-y-1">
                        {variant.options.slice(0, 2).map((opt: string, idx: number) => (
                          <div key={idx} className="text-[13px] text-[#6b7280]">
                            {String.fromCharCode(65 + idx)}. {opt}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="px-8 py-4 border-t border-[#e5e7eb]">
          <div className="flex items-center justify-between">
            {generatedVariants.length > 0 && (
              <span className="font-['Arimo',sans-serif] text-[14px] text-[#6b7280]">
                {generatedVariants.length} variant{generatedVariants.length !== 1 ? 's' : ''} ready
              </span>
            )}
            <div className="flex items-center gap-3 ml-auto">
              <Button
                variant="outline"
                onClick={onClose}
                className="rounded-[8px]"
                disabled={isGenerating}
              >
                Cancel
              </Button>
              {generatedVariants.length === 0 ? (
                <Button
                  onClick={handleGenerate}
                  className="rounded-[8px] bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white"
                  disabled={isGenerating}
                >
                  {isGenerating ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Wand2 size={16} className="mr-2" />
                      Generate Variants
                    </>
                  )}
                </Button>
              ) : (
                <Button
                  onClick={handleSaveAll}
                  className="rounded-[8px] bg-emerald-600 hover:bg-emerald-700 text-white"
                >
                  <Check size={16} className="mr-2" />
                  Save All Variants
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
