# SMS Conversation Simulator

## Overview

This is a browser-based SMS conversation simulator that allows users to compose fake text message conversations between two people and preview them in real-time on a smartphone mockup. The application is entirely frontend-focused with no user accounts, backend API, or persistent database storage. All conversation data is stored locally in the browser using localStorage, ensuring privacy and simplicity.

The interface is split into two main sections: an editor panel on the left where users define and manage conversation messages, and a live preview panel on the right that renders the conversation as an authentic-looking smartphone chat interface.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build System:**
- React 18 with TypeScript for type-safe component development
- Vite as the build tool and development server
- Wouter for lightweight client-side routing (though currently only using a single route)
- TanStack React Query for state management and data fetching patterns (minimal usage in this frontend-only app)

**Component Architecture:**
- Component-based architecture following React best practices
- Custom reusable UI components built with Radix UI primitives
- Shadcn/ui design system (New York style) for consistent, accessible UI components
- Tailwind CSS for utility-first styling with custom design tokens

**State Management:**
- Local component state using React hooks (useState, useEffect)
- Custom `useLocalStorage` hook for persistent browser storage
- No global state management library needed due to simple state requirements

**Key Components:**
1. **ConversationEditor** - Left panel container for managing messages and participants
2. **PhonePreview** - Right panel smartphone mockup displaying the conversation
3. **MessageForm** - Form for adding new messages with sender selection
4. **MessageItem** - Individual message editor with edit, delete, and reorder controls
5. **ParticipantSettings** - Input fields for customizing participant names
6. **ChatBubble** - Visual message bubble component for the preview

**Data Model:**
```typescript
type Sender = 'personA' | 'personB';

interface Message {
  id: string;
  sender: Sender;
  text: string;
}

interface Participants {
  personA: string;
  personB: string;
}
```

### Styling & Design System

**Tailwind Configuration:**
- Custom color system using CSS custom properties for theme variables
- Responsive breakpoints for mobile, tablet, and desktop layouts
- Custom border-radius values (lg: 9px, md: 6px, sm: 3px)
- Dark mode support via class-based theme switching

**Design Principles:**
- Clear visual separation between editor (functional) and preview (representational)
- Smartphone preview designed for authenticity with iOS/Android aesthetic
- Consistent spacing system using Tailwind units (2, 4, 6, 8)
- Two-column grid layout on desktop/tablet, stacked on mobile

**Chat Bubble Styling:**
- Sent messages (personB): Blue background, white text, right-aligned, rounded with small tail on bottom-right
- Received messages (personA): Gray background, dark text, left-aligned, rounded with small tail on bottom-left
- Consecutive message spacing reduced for natural conversation flow

### Browser Storage

**LocalStorage Strategy:**
- Messages stored at key: `sms-simulator-messages`
- Participants stored at key: `sms-simulator-participants`
- Theme preference stored at key: `sms-simulator-theme`
- Data persists across browser sessions
- No backend synchronization or cloud storage

**Rationale:** LocalStorage provides a simple, privacy-focused solution for this frontend-only tool. Users maintain complete control over their data, and there's no need for server infrastructure or user authentication.

### Backend Architecture

**Express Server Setup:**
- Minimal Express.js server primarily for serving static files in production
- Development mode uses Vite's dev server with HMR (Hot Module Replacement)
- No API routes currently implemented (routes.ts is a placeholder)
- In-memory storage interface defined but unused in current implementation

**Database Schema:**
- PostgreSQL schema defined using Drizzle ORM (users table with id, username, password)
- Database configuration present but not actively used by the application
- Prepared for future enhancement if backend functionality needed

**Rationale for Minimal Backend:** The project requirements specify a frontend-only application with no user accounts or data persistence beyond localStorage. The backend infrastructure exists to serve the built application and provides a foundation for potential future features, but is intentionally minimal for the current scope.

### Build & Deployment

**Build Process:**
- Client: Vite builds React app to `dist/public`
- Server: esbuild bundles Express server to `dist/index.cjs`
- Custom build script handles both client and server compilation
- Production build creates optimized, minified bundles

**Development Workflow:**
- `npm run dev` - Starts development server with HMR
- `npm run build` - Creates production build
- `npm run start` - Runs production build
- `npm run check` - TypeScript type checking

## External Dependencies

### UI Component Libraries
- **Radix UI**: Accessible, unstyled component primitives (accordion, dialog, dropdown, radio-group, scroll-area, select, switch, tabs, toast, tooltip, etc.)
- **Shadcn/ui**: Pre-configured Radix components with Tailwind styling
- **Lucide React**: Icon library for UI elements

### Styling
- **Tailwind CSS**: Utility-first CSS framework
- **class-variance-authority**: Utility for creating variant-based component styles
- **clsx & tailwind-merge**: Class name utilities for conditional styling

### Form Management
- **React Hook Form**: Form state management (configured via @hookform/resolvers)
- **Zod**: Schema validation for forms and data structures

### Development Tools
- **Vite**: Build tool and dev server with HMR support
- **TypeScript**: Static type checking
- **tsx**: TypeScript execution for Node.js scripts
- **esbuild**: Fast JavaScript bundler for server code

### Database (Configured but Unused)
- **Drizzle ORM**: TypeScript ORM for PostgreSQL
- **drizzle-kit**: Database migration and schema management tools
- **pg**: PostgreSQL client library

### Utility Libraries
- **date-fns**: Date formatting utilities (available but minimal usage)
- **nanoid**: Unique ID generation
- **wouter**: Lightweight client-side routing

### Replit-Specific
- **@replit/vite-plugin-runtime-error-modal**: Development error overlay
- **@replit/vite-plugin-cartographer**: Development tooling
- **@replit/vite-plugin-dev-banner**: Development environment banner