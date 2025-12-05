# Design Guidelines: SMS Conversation Simulator

## Design Approach

**Selected Approach:** Design System (Utility-Focused)

This is a productivity tool requiring clarity, efficiency, and visual distinction between editing and preview areas. The design will follow systematic component principles while creating custom elements for the smartphone mockup.

**Key Design Principles:**
- Clear visual separation between editor (functional) and preview (representational)
- Smartphone preview must feel authentic and immersive
- Editor must be efficient and uncluttered
- Immediate visual feedback for all user actions

---

## Typography

**Font Families:**
- Primary: Inter or System UI stack for editor interface
- Preview: San Francisco or Roboto for chat bubbles (iOS/Android feel)

**Hierarchy:**
- Page title/header: text-2xl font-semibold
- Section headers: text-lg font-medium
- Form labels: text-sm font-medium
- Body text/inputs: text-base
- Chat bubbles: text-sm
- Helper text/errors: text-xs

---

## Layout System

**Spacing Primitives:** Use Tailwind units of 2, 4, 6, and 8 for consistency
- Component padding: p-4, p-6
- Section gaps: gap-4, gap-6
- Message spacing: space-y-2, space-y-3
- Container margins: m-4, m-6

**Grid Structure:**

**Desktop (lg and above):**
- Two-column grid: `grid grid-cols-2 gap-8`
- Left panel (Editor): 45% width, `max-w-2xl`
- Right panel (Preview): 55% width, centered smartphone mockup

**Tablet (md):**
- Two-column maintained with reduced gap: `gap-6`
- Both panels scale proportionally

**Mobile (base):**
- Single column stack: `flex flex-col space-y-6`
- Editor first, preview below
- Both sections full-width

**Container:**
- Main wrapper: `max-w-7xl mx-auto px-4 lg:px-8`
- Vertical padding: `py-8 lg:py-12`

---

## Component Library

### Editor Panel Components

**Participant Name Inputs:**
- Two text inputs side-by-side: `grid grid-cols-2 gap-4`
- Labels above inputs
- Placeholder text: "Person A name" / "Person B name"
- Input styling: rounded borders, focused states with ring
- Grouped in a card with `p-6 rounded-lg border`

**Message Creation Form:**
- Contained in a card: `p-6 rounded-lg border space-y-4`
- Sender selector: Radio buttons or segmented control showing both participant names
- Message textarea: `min-h-24`, auto-resize, rounded corners
- Submit button: Full-width on mobile, inline on desktop, prominent styling

**Messages List:**
- Each message in a card: `p-4 rounded-lg border space-y-2`
- Sender indicator: Bold label or pill badge
- Message text: Regular weight, preserve line breaks
- Action buttons row: `flex gap-2 justify-end`
  - Edit: Icon button with pencil
  - Delete: Icon button with trash
  - Reorder: Up/down arrows or drag handle
- Empty state: Centered text with icon when no messages exist
- Vertical list: `space-y-3`

**Validation Feedback:**
- Error messages: Small text below input in alert styling
- Success indicators: Subtle green checkmark or border flash
- Inline validation as user types

### Smartphone Preview Components

**Phone Mockup Container:**
- Fixed aspect ratio container: 9:19.5 (iPhone-like)
- Max width: `max-w-sm mx-auto`
- Rounded corners: `rounded-3xl` or `rounded-[2.5rem]`
- Border and shadow: `border-8 shadow-2xl` for device frame effect
- Inner screen: `rounded-[2rem]` to account for border thickness

**Phone Header:**
- Sticky top bar: `sticky top-0 z-10`
- Height: `h-16`
- Contains:
  - Back arrow icon (left)
  - Contact name (center, using participant name)
  - Call/video icons (right, decorative)
- Status bar above (time, battery, signal): `h-6` - static decorative elements

**Messages Area:**
- Scrollable container: `overflow-y-auto flex-1`
- Padding: `p-4`
- Background: Subtle pattern or solid
- Gradient fade at top/bottom edges

**Chat Bubbles:**
- Container alignment:
  - Person A messages: `flex justify-start`
  - Person B messages: `flex justify-end`
- Bubble styling:
  - Max width: `max-w-[70%]`
  - Padding: `px-4 py-2`
  - Rounded corners: `rounded-2xl` with different corner radii for left/right alignment
  - Person A: Rounded-br-sm (tail effect bottom-right)
  - Person B: Rounded-bl-sm (tail effect bottom-left)
- Text: Preserve whitespace and line breaks
- Consecutive messages from same sender: Reduced spacing `space-y-1`, grouped visually
- Spacing between sender changes: `space-y-3`

**Empty Preview State:**
- Centered message: "Add messages to see preview"
- Icon placeholder
- Subtle instructional text

---

## Responsive Behavior

**Breakpoint Strategy:**
- Mobile first: Base styles optimized for small screens
- md (768px): Transition to two-column with reduced spacing
- lg (1024px): Full two-column layout with optimal spacing

**Editor Responsiveness:**
- Form controls stack on mobile, inline on desktop
- Button groups: Full-width on mobile, auto-width on desktop
- Messages list: Compact cards on mobile, more spacious on desktop

**Preview Responsiveness:**
- Phone mockup scales proportionally
- Minimum width maintained for readability
- On very small screens: Reduce border thickness and padding

---

## Images

No images required for this application. All visual elements are component-based UI and chat interface representations.

---

## Interaction Patterns

**Real-time Updates:**
- Preview updates immediately on any editor change
- No save button needed - live synchronization

**Message Management:**
- Hover states on message cards reveal action buttons
- Delete requires no confirmation (simple undo would be ideal but not mandatory)
- Edit mode: Inline textarea replacement or modal form
- Reorder: Buttons show disabled state at list boundaries

**Form Handling:**
- Enter key in textarea submits message (Shift+Enter for line break)
- Clear form after successful message addition
- Focus returns to textarea after submission