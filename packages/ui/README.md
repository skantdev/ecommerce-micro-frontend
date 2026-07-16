# @repo/ui

🎨 **Reusable UI Component Library**

Comprehensive collection of 20+ accessible, customizable UI components built with React, TypeScript, and Tailwind CSS.

## Overview

This package provides production-ready UI components following Material Design and web accessibility standards (WCAG 2.1).

## Components (20+)

### Form Components

#### Button
- Variants: primary, secondary, outline, ghost, danger
- Sizes: sm, md, lg
- Features: Loading state, icons, full-width

```tsx
<Button variant="primary" size="md" loading={isLoading}>
  Save
</Button>
```

#### Input
- Types: text, email, password, number, tel, url
- Features: Icons, password toggle, error states, helper text
- Sizes: sm, md, lg

```tsx
<Input
  type="email"
  label="Email"
  placeholder="your@email.com"
  error={emailError}
  helperText="We'll never share your email"
/>
```

#### Textarea
- Features: Resizable, character count, helper text
- Sizes: sm, md, lg

```tsx
<Textarea
  label="Message"
  maxLength={500}
  showCount
  rows={5}
/>
```

#### Select
- Features: Options, disabled items, error states
- Sizes: sm, md, lg

```tsx
<Select
  label="Choose option"
  options={[
    { label: 'Option 1', value: '1' },
    { label: 'Option 2', value: '2' },
  ]}
/>
```

#### Checkbox
- Features: Indeterminate state, label, error validation
- Sizes: sm, md, lg

```tsx
<Checkbox
  label="Agree to terms"
  checked={isChecked}
  onChange={setIsChecked}
  error={checkboxError}
/>
```

#### Radio
- Features: Group support, error states, helper text
- Sizes: sm, md, lg

```tsx
<Radio name="option" value="a" label="Option A" />
<Radio name="option" value="b" label="Option B" />
```

#### Switch
- Features: Toggle switch, label, error states
- Sizes: sm, md, lg

```tsx
<Switch
  label="Enable notifications"
  enabled={isEnabled}
  onChange={setIsEnabled}
/>
```

### Layout Components

#### Card
- Variants: elevated, outlined, filled
- Features: Header/footer, interactive hover, padding options

```tsx
<Card header="Title" footer="Footer" interactive>
  Card content
</Card>
```

#### Badge
- Variants: primary, secondary, success, error, warning, info, neutral
- Features: Icons, removable, sizes

```tsx
<Badge variant="success" size="md" onRemove={handleRemove}>
  Active
</Badge>
```

#### Avatar
- Features: Image, initials fallback, status indicator, shapes
- Sizes: sm, md, lg, xl
- Shapes: circle, square
- Status: online, offline, away

```tsx
<Avatar src="user.jpg" initials="JD" size="lg" status="online" />
```

### Feedback Components

#### Loader
- Types: spinner, dots, bars
- Features: Sizes, colors, full-screen, overlay, loading text
- Sizes: sm, md, lg
- Colors: primary, secondary, success, error, info

```tsx
<Loader size="lg" text="Loading..." type="spinner" />
<Loader fullScreen overlay /> {/* Full screen overlay */}
```

#### Skeleton
- Features: Lines, circle, custom dimensions
- Animation: Shimmer effect

```tsx
<Skeleton lines={3} />
<Skeleton circle width="40px" height="40px" />
```

#### Modal
- Features: Customizable size, backdrop, keyboard escape
- Sizes: sm, md, lg, xl

```tsx
<Modal
  isOpen={isOpen}
  onClose={onClose}
  title="Confirm"
  closeOnBackdrop
  footer={<Button onClick={onClose}>Close</Button>}
>
  Modal content
</Modal>
```

#### Progress
- Features: Percentage display, colors, animated stripes
- Sizes: sm, md, lg
- Colors: primary, secondary, success, warning, error, info

```tsx
<Progress value={75} showLabel animated label="Upload" />
```

### Navigation Components

#### Tabs
- Variants: underline, pills, boxed
- Features: Disabled items, controlled state
- Sizes: sm, md, lg

```tsx
<Tabs
  tabs={[
    { label: 'Tab 1', content: 'Content 1' },
    { label: 'Tab 2', content: 'Content 2', disabled: true },
  ]}
/>
```

#### Pagination
- Features: Previous/next buttons, configurable page range
- Sizes: sm, md, lg

```tsx
<Pagination current={1} total={10} onChange={setPage} />
```

### Overlay Components

#### Tooltip
- Positions: top, bottom, left, right
- Triggers: hover, click
- Features: Customizable delay

```tsx
<Tooltip content="Click to save" position="bottom">
  <Button>Save</Button>
</Tooltip>
```

#### Accordion
- Features: Single/multiple expansion, disabled items
- Variants: neutral, bordered

```tsx
<Accordion
  items={[
    { id: '1', title: 'Item 1', content: 'Content 1' },
    { id: '2', title: 'Item 2', content: 'Content 2' },
  ]}
  allowMultiple
/>
```

### Data Display Components

#### Table
- Features: Striped rows, hover effect, column alignment
- Sizes: sm, md, lg

```tsx
<Table
  columns={[
    { key: 'name', header: 'Name' },
    { key: 'email', header: 'Email', align: 'left' },
  ]}
  rows={[
    { id: 1, name: 'John', email: 'john@example.com' },
  ]}
  striped
  hoverable
/>
```

### State Components

#### EmptyState
- Features: Icon, title, description, action button
- Sizes: sm, md, lg

```tsx
<EmptyState
  title="No products found"
  description="Try searching with different keywords"
  action={<Button>Clear filters</Button>}
/>
```

#### ErrorState
- Features: Icon, error code, title, message, action
- Sizes: sm, md, lg

```tsx
<ErrorState
  code="500"
  title="Server Error"
  message="Something went wrong"
  action={<Button onClick={retry}>Retry</Button>}
/>
```

## Features

### Accessibility
- ✅ WCAG 2.1 Level AA compliant
- ✅ ARIA labels and roles
- ✅ Keyboard navigation
- ✅ Focus management
- ✅ Screen reader support

### Styling
- ✅ Tailwind CSS classes
- ✅ Dark mode support
- ✅ Design token integration (@repo/theme)
- ✅ Responsive design
- ✅ Custom className support

### TypeScript
- ✅ Full type safety
- ✅ Exported interfaces
- ✅ Generic component support
- ✅ Type inference

### Performance
- ✅ Minimal dependencies
- ✅ Optimized re-renders
- ✅ Tree-shakeable exports
- ✅ Lazy loading ready

## Usage

### Basic Import

```tsx
import { Button, Input, Modal, Card } from '@repo/ui';

export function MyComponent() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Card>
      <Input type="email" label="Email" />
      <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
      
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        Modal content
      </Modal>
    </Card>
  );
}
```

### Themed Colors

All components automatically use design tokens from `@repo/theme`:

```tsx
// Primary color
<Button variant="primary">Primary</Button>

// Success color
<Badge variant="success">Success</Badge>

// Error color
<ErrorState code="404" message="Not found" />

// Dark mode - Automatic!
<Button className="dark:bg-primary-600">Adaptive</Button>
```

### Custom Styling

```tsx
// Use className prop
<Button className="custom-class">Custom</Button>

// Use cn utility for conditional classes
import { cn } from '@repo/ui';

<Button className={cn('w-full', isFullWidth && 'opacity-50')}>
  Conditional
</Button>
```

### Combining Components

```tsx
<Card header="User Profile" interactive>
  <div className="space-y-4">
    <Input type="text" label="Name" />
    <Input type="email" label="Email" />
    <Select
      label="Role"
      options={[
        { label: 'Admin', value: 'admin' },
        { label: 'User', value: 'user' },
      ]}
    />
    <Checkbox label="Verified" />
    <Button variant="primary" fullWidth>Save</Button>
  </div>
</Card>
```

## Design Tokens Integration

All components use design tokens from `@repo/theme`:

```tsx
import { colors, spacing, shadows, typography } from '@repo/theme';
```

- **Colors**: 11-step scales for all color groups
- **Spacing**: 4px-based scale
- **Shadows**: Elevation system
- **Typography**: Comprehensive font scales
- **Breakpoints**: Responsive design
- **Animations**: Smooth transitions

## Customization

### Via CSS Variables

```css
:root {
  --color-primary-500: #custom-color;
  --font-size-base: 18px;
  --spacing-4: 20px;
}
```

### Via Tailwind Config

Components respect your Tailwind configuration:

```ts
// tailwind.config.ts
export default {
  theme: {
    colors: { /* custom colors */ },
    spacing: { /* custom spacing */ },
  },
};
```

### Via Component Props

```tsx
<Button
  className="bg-custom-color px-6 py-4"
  onClick={handleClick}
>
  Custom
</Button>
```

## Accessibility Features

### Focus Management
```tsx
<Button className="focus-ring"> {/* Automatic focus ring */}
  Accessible
</Button>
```

### ARIA Labels
```tsx
<Modal
  title="Confirm Action"
  role="dialog"
  aria-labelledby="modal-title"
>
  Content
</Modal>
```

### Keyboard Navigation
- All interactive components support keyboard interaction
- Tab navigation
- Enter/Space to activate
- Escape to close modals
- Arrow keys for tabs/accordion

### Screen Reader Support
- Semantic HTML
- ARIA roles and attributes
- Label associations
- Live regions for dynamic content

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers

## Performance

All components are optimized for:
- Quick interactions
- Smooth animations
- Minimal layout shifts
- Lazy loading compatibility
- Server-side rendering

## Examples

### Complete Form

```tsx
function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  return (
    <Card className="max-w-md">
      <div className="space-y-4">
        <Input
          type="email"
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          showPasswordToggle
        />
        <Checkbox label="Remember me" />
        <Button
          fullWidth
          loading={loading}
          onClick={handleLogin}
        >
          Login
        </Button>
      </div>
    </Card>
  );
}
```

### Data Table with Pagination

```tsx
function UserTable({ users }) {
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;
  const total = Math.ceil(users.length / itemsPerPage);

  return (
    <div className="space-y-4">
      <Table
        columns={[
          { key: 'name', header: 'Name' },
          { key: 'email', header: 'Email' },
          { key: 'status', header: 'Status', align: 'center' },
        ]}
        rows={users.slice(
          (page - 1) * itemsPerPage,
          page * itemsPerPage
        )}
        striped
        hoverable
      />
      <Pagination
        current={page}
        total={total}
        onChange={setPage}
      />
    </div>
  );
}
```

## File Structure

```
packages/ui/
├── src/
│   ├── components/
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Textarea.tsx
│   │   ├── Select.tsx
│   │   ├── Checkbox.tsx
│   │   ├── Radio.tsx
│   │   ├── Switch.tsx
│   │   ├── Card.tsx
│   │   ├── Badge.tsx
│   │   ├── Avatar.tsx
│   │   ├── Loader.tsx
│   │   ├── Skeleton.tsx
│   │   ├── Modal.tsx
│   │   ├── Progress.tsx
│   │   ├── Tabs.tsx
│   │   ├── Accordion.tsx
│   │   ├── Tooltip.tsx
│   │   ├── Pagination.tsx
│   │   ├── Table.tsx
│   │   ├── EmptyState.tsx
│   │   ├── ErrorState.tsx
│   │   └── index.ts
│   ├── utils.ts
│   └── index.ts
├── package.json
├── tsconfig.json
└── README.md
```

## Dependencies

```json
{
  "dependencies": {
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "@repo/theme": "workspace:*"
  }
}
```

## Next Steps

- Use in component demos/Storybook (optional)
- Integrate with host application (Step 13)
- Build micro frontends (Steps 14-21)

## Version

1.0.0

## License

Proprietary
