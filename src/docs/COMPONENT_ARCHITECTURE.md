gs' | 'sections' | 'preview';

const [currentView, setCurrentView] = useState<ViewMode>('list');
```

---

### State Management Patterns

#### Simple State
```typescript
const [isOpen, setIsOpen] = useState(false);
const [selectedId, setSelectedId] = useState<string | null>(null);
```

#### Object State
```typescript
const [config, setConfig] = useState<ConfigType>({
  field1: defaultValue1,
  field2: defaultValue2,
});

// Update pattern
setConfig({ ...config, field1: newValue });
```

#### Array State
```typescript
const [items, setItems] = useState<Item[]>([]);

// Add item
setItems([...items, newItem]);

// Update item
setItems(items.map(item => 
  item.id === targetId ? { ...item, ...updates } : item
));

// Remove item
setItems(items.filter(item => item.id !== targetId));
```

#### Set State (for selections)
```typescript
const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());

// Toggle selection
const toggleSelection = (id: number) => {
  const newSelected = new Set(selectedIds);
  if (newSelected.has(id)) {
    newSelected.delete(id);
  } else {
    newSelected.add(id);
  }
  setSelectedIds(newSelected);
};
```

---

### Event Handler Patterns

```typescript
// Simple handler
const handleClick = () => {
  // Logic
};

// Handler with parameter
const handleDelete = (id: string) => {
  setItems(items.filter(item => item.id !== id));
};

// Form submit handler
const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  // Validation and submission
};

// Input change handler
const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setValue(e.target.value);
};
```

---

## Naming Conventions

### Components
- **PascalCase** for component names: `CandidateProfile`, `CreateAssessmentPage`
- **Descriptive names** that indicate purpose: `EnhancedGroupOverviewV2` not `GroupPage`
- **Suffix patterns**:
  - `*Page` for full page views: `CandidatesPage`
  - `*Modal` for overlays: `GroupCreationModal`
  - `*Flow` for multi-step processes: `RecordedInterviewFlow`
  - `*Editor` for editing interfaces: `SectionEditor`
  - `*Settings` for configuration: `AssessmentSettings`
  - `*Dashboard` for overview pages: `AdminDashboard`

### Files
- Match component name: `CandidateProfile.tsx` exports `CandidateProfile`
- UI components in kebab-case: `button.tsx`, `dialog.tsx`

### Functions
- **camelCase** for functions: `handleClick`, `updateSection`
- **Prefix patterns**:
  - `handle*` for event handlers: `handleSubmit`, `handleDelete`
  - `on*` for prop callbacks: `onSave`, `onClose`, `onNavigate`
  - `is*` for boolean checks: `isOpen`, `isLoading`
  - `show*` for visibility states: `showModal`, `showAdvanced`

### Variables
- **camelCase** for variables: `selectedId`, `currentPage`
- **Descriptive names**: `activeFilterCount` not `count`
- **Boolean prefix**: `isLoading`, `hasError`, `canEdit`

---

## Import Patterns

### Import Order
```typescript
// 1. React imports
import { useState, useEffect, useMemo } from 'react';

// 2. External libraries
import { ChevronLeft, Plus, Settings } from 'lucide-react';

// 3. UI components
import { Button } from './ui/button';
import { Card, CardContent, CardHeader } from './ui/card';
import { Dialog } from './ui/dialog';

// 4. Local components
import { Sidebar } from './Sidebar';
import { CandidateProfile } from './CandidateProfile';

// 5. Assets
import logo from './imports/image-eramatch.png';

// 6. Types (if in separate file)
import type { Candidate, Assessment } from './types';
```

### Import Styles

#### Named imports (preferred)
```typescript
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
```

#### Default imports (for assets and some pages)
```typescript
import logo from './imports/image-eramatch.png';
export default function App() { ... }
```

#### Type-only imports
```typescript
import type { ComponentProps } from 'react';
```

---

## Key Architectural Patterns

### 1. Props Drilling Prevention
```typescript
// App.tsx manages routing state
const [currentPage, setCurrentPage] = useState<PageType>('dashboard');

// Pass navigation handlers down
<Sidebar 
  currentPage={currentPage}
  onNavigate={setCurrentPage}
/>

<Dashboard 
  onViewProject={(id) => {
    setSelectedProject(id);
    setCurrentPage('project-detail');
  }}
/>
```

### 2. Modal State Management
```typescript
// Parent component controls modal visibility
const [showModal, setShowModal] = useState(false);
const [modalData, setModalData] = useState<Data | null>(null);

// Modal receives close handler
<Modal 
  isOpen={showModal}
  onClose={() => setShowModal(false)}
  onSave={(data) => {
    handleSave(data);
    setShowModal(false);
  }}
/>
```

### 3. Tab-Based Views
```typescript
type TabType = 'overview' | 'details' | 'history';
const [activeTab, setActiveTab] = useState<TabType>('overview');

return (
  <>
    <TabNavigation active={activeTab} onChange={setActiveTab} />
    {activeTab === 'overview' && <OverviewContent />}
    {activeTab === 'details' && <DetailsContent />}
    {activeTab === 'history' && <HistoryContent />}
  </>
);
```

### 4. Multi-Step Forms
```typescript
type Step = 'info' | 'config' | 'review';
const [currentStep, setCurrentStep] = useState<Step>('info');
const [formData, setFormData] = useState<FormData>({});

const handleNext = (stepData: Partial<FormData>) => {
  setFormData({ ...formData, ...stepData });
  // Move to next step
};
```

### 5. Loading and Error States
```typescript
const [isLoading, setIsLoading] = useState(false);
const [error, setError] = useState<string | null>(null);

const fetchData = async () => {
  setIsLoading(true);
  setError(null);
  try {
    // Fetch logic
  } catch (err) {
    setError(err.message);
  } finally {
    setIsLoading(false);
  }
};
```

---

## Special Patterns

### Authentication Flow
```
App.tsx
├── Landing → RecruiterLoginPage
│             ├── recruiter@eramatch.com → HR Recruiter
│             └── technical@eramatch.com → Technical Recruiter
├── Landing → CandidateLoginPage → Candidate Portal
└── Landing → AdminLoginPage → Admin Portal
```

### Role-Based Rendering
```typescript
// In App.tsx
const [recruiterType, setRecruiterType] = useState<'recruiter' | 'technical'>('recruiter');

// Passed to components
<Sidebar userRole={recruiterType} />

// In child components
{userRole === 'technical' && <TechnicalOnlyFeature />}
{userRole === 'recruiter' && <HROnlyFeature />}
```

### Permission-Based Access
```typescript
// In GroupSettings
const canManageAssessments = recruiterType === 'technical';
const canManageInterviews = recruiterType === 'technical';

{canManageAssessments && (
  <AssessmentManagementSection />
)}
```

---

## Design System Integration

### Color Usage
```typescript
// Primary actions
className="bg-[#6366f1] text-white"

// Success states
className="bg-[#10b981] text-white"

// Info/secondary
className="bg-[#4f46e5] text-white"

// Neutral backgrounds
className="bg-[#f9fafb]"

// Borders
className="border border-[#e5e7eb]"

// Text colors
className="text-[#111827]"  // Primary text
className="text-[#6b7280]"  // Secondary text
className="text-[#9ca3af]"  // Muted text
```

### Spacing Patterns
```typescript
// Consistent gaps
className="gap-[24px]"      // Standard spacing
className="gap-[16px]"      // Tight spacing
className="gap-[32px]"      // Loose spacing

// Padding
className="p-[24px]"        // Standard padding
className="px-[32px] py-[24px]"  // Asymmetric padding
```

### Border Radius
```typescript
className="rounded-[8px]"   // Small elements (buttons, inputs)
className="rounded-[12px]"  // Medium elements (cards)
className="rounded-[16px]"  // Large elements (modals, containers)
```

---

## Component Communication

### Parent → Child (Props)
```typescript
<ChildComponent 
  data={parentData}
  onAction={handleAction}
  config={settings}
/>
```

### Child → Parent (Callbacks)
```typescript
// In child
interface ChildProps {
  onSave: (data: Data) => void;
  onCancel: () => void;
}

// In parent
const handleSave = (data: Data) => {
  // Process data
  setShowModal(false);
};

<Child onSave={handleSave} onCancel={() => setShowModal(false)} />
```

### Sibling Communication (Via Parent)
```typescript
// Parent manages shared state
const [selectedId, setSelectedId] = useState<string | null>(null);

<Sidebar selectedId={selectedId} onSelect={setSelectedId} />
<MainContent selectedId={selectedId} />
```

---

## Testing & Development Tips

### Component Testing Checklist
- [ ] All props are typed correctly
- [ ] Optional props have defaults or conditional rendering
- [ ] Event handlers prevent default where needed
- [ ] Loading states are handled
- [ ] Error states are handled
- [ ] Empty states are handled
- [ ] Responsive design works
- [ ] Accessibility attributes present
- [ ] Icons are imported and sized correctly
- [ ] Tailwind classes are valid

### Common Patterns to Follow
1. **Always type props** with an interface
2. **Use optional chaining** for nested data: `data?.field?.subfield`
3. **Provide fallbacks** for optional data: `{title || 'Untitled'}`
4. **Extract magic numbers** to constants or config
5. **Keep components focused** - single responsibility
6. **Extract complex logic** to helper functions
7. **Use semantic HTML** - buttons, forms, labels
8. **Add ARIA labels** for accessibility
9. **Handle keyboard navigation** for interactive elements
10. **Memoize expensive computations** with useMemo

---

## Summary

This architecture provides:
- **Clear separation** of concerns across component types
- **Consistent patterns** for state management and data flow
- **Type safety** with TypeScript throughout
- **Reusability** through composable UI components
- **Scalability** with organized file structure
- **Maintainability** through naming conventions and documentation

For specific implementation details, refer to the individual component files. Each component serves as a reference implementation of these patterns.
