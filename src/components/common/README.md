# Design System Components

Centralized, reusable components following Tokyo Night theme.

## Button Component

**Location**: `/src/components/common/Button.tsx`

### Usage

```tsx
import { Button, IconButton } from '../../../components/common/Button';

// Primary action (purple background)
<Button $variant="primary" onClick={handleSave}>
  Save Character
</Button>

// Secondary action (gray background)
<Button $variant="secondary" onClick={handleCancel}>
  Cancel
</Button>

// Destructive action (red background)
<Button $variant="danger" onClick={handleDelete}>
  Delete
</Button>

// Ghost button (transparent, hover shows background)
<Button $variant="ghost" onClick={handleClose}>
  Close
</Button>

// With size variants
<Button $variant="primary" $size="sm">Small</Button>
<Button $variant="primary" $size="md">Medium (default)</Button>
<Button $variant="primary" $size="lg">Large</Button>

// Full width
<Button $variant="primary" $fullWidth>
  Full Width Button
</Button>

// Disabled state
<Button $variant="primary" disabled>
  Disabled
</Button>

// Icon button (square, for icons only)
<IconButton onClick={handleEdit}>
  ✏️
</IconButton>
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `$variant` | `'primary' \| 'secondary' \| 'danger' \| 'ghost'` | `'secondary'` | Button style variant |
| `$size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Button size |
| `$fullWidth` | `boolean` | `false` | Makes button full width |
| `disabled` | `boolean` | `false` | Disables button interaction |

### Styling

All buttons use Tokyo Night theme tokens:
- **Primary**: Purple `#BB9AF7` - for main actions
- **Secondary**: Gray with purple hover - for auxiliary actions
- **Danger**: Red - for destructive actions
- **Ghost**: Transparent with subtle hover - for minimal actions

Hover effects include:
- Slight upward translation (`translateY(-1px)`)
- Box shadow on primary/danger
- Background color change on secondary/ghost

## Modal Component

**Location**: `/src/components/common/Modal.tsx`

### Usage

```tsx
import {
  ModalBackdrop,
  ModalContainer,
  ModalHeader,
  ModalTitle,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  SearchInput
} from '../../../components/common/Modal';

{isOpen && (
  <>
    <ModalBackdrop onClick={onClose} />
    <ModalContainer>
      <ModalHeader>
        <ModalTitle>Modal Title</ModalTitle>
        <ModalCloseButton onClick={onClose} type="button">
          ✕
        </ModalCloseButton>
      </ModalHeader>
      <ModalBody>
        {/* Modal content */}
      </ModalBody>
      <ModalFooter>
        <Button $variant="secondary" onClick={onClose}>Cancel</Button>
        <Button $variant="primary" onClick={onConfirm}>Confirm</Button>
      </ModalFooter>
    </ModalContainer>
  </>
)}
```

## Migration Guide

### From shadcn Button

**Before:**
```tsx
import { Button } from '../../../components/ui/button';

<Button variant="secondary" size="sm">Click</Button>
```

**After:**
```tsx
import { Button } from '../../../components/common/Button';

<Button $variant="secondary" $size="sm">Click</Button>
```

Note: Use `$` prefix for styled-components props.

### From inline styled buttons

**Before:**
```tsx
<button className="rounded bg-purple-600 px-4 py-2 hover:bg-purple-700">
  Click Me
</button>
```

**After:**
```tsx
<Button $variant="primary">Click Me</Button>
```

### From ActionButton (legacy)

**Before:**
```tsx
import { ActionButton } from './styles/MonsterStyles';

<ActionButton $variant="primary">Save</ActionButton>
```

**After:**
```tsx
import { Button } from '../../../components/common/Button';

<Button $variant="primary">Save</Button>
```

## Benefits

✅ **Consistency**: Single source of truth for all buttons  
✅ **Theme Tokens**: Uses Tokyo Night theme throughout  
✅ **Type Safety**: TypeScript props with autocompletion  
✅ **Accessibility**: Proper disabled states and focus styles  
✅ **Maintainability**: Update once, applies everywhere  
✅ **Performance**: Reuses styled components efficiently  

## Where Used

- `/dm/monsters/*` - Monster Laboratory
- `/dm/encounters/*` - Encounter Planner
- Character creation flow
- Character sheet
- Custom equipment builder
- All future components should use this system
