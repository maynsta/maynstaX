# Maynsta

## Overview

Maynsta is a music streaming and publishing application built with Next.js 15. It allows users to listen to music, create playlists, and for artists to publish their music. The app features a Spotify-like interface with a sidebar navigation, music player bar, and supports both light and dark themes.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: Next.js 15 with App Router and React Server Components
- **Styling**: Tailwind CSS v4 with CSS variables for theming
- **UI Components**: shadcn/ui component library (New York style) with Radix UI primitives
- **State Management**: React Context API for global state (player, sidebar, theme)

### Key Design Patterns
- **Route Groups**: Uses `(main)` route group for authenticated pages with shared layout
- **Server/Client Split**: Server components for data fetching, client components for interactivity
- **Context Providers**: PlayerContext for audio playback state, SidebarContext for navigation state, ThemeContext for theming

### Authentication & Authorization
- **Provider**: Supabase Auth with SSR support
- **Session Management**: Cookie-based sessions using @supabase/ssr
- **Route Protection**: Middleware in proxy.ts redirects unauthenticated users to login

### Data Storage
- **Backend**: Supabase (PostgreSQL database with real-time capabilities)
- **Storage**: Supabase Storage for audio files and cover images
- **Client Types**: Browser client for client components, server client for RSC

### Core Features
- Music playback with queue management
- Playlist creation and management
- Album and song browsing
- Parental controls with PIN protection
- Artist profiles and music publishing
- Explicit content filtering

### Project Structure
```
app/                    # Next.js App Router pages
  (main)/              # Authenticated routes layout
  auth/                # Authentication pages
components/            # React components
  ui/                  # shadcn/ui components
contexts/              # React Context providers
hooks/                 # Custom React hooks
lib/                   # Utilities and configurations
  supabase/            # Supabase client configurations
```

## External Dependencies

### Core Services
- **Supabase**: Database, authentication, and file storage
- **Vercel Analytics**: Usage analytics (@vercel/analytics)

### UI Libraries
- **Radix UI**: Accessible component primitives (dialog, dropdown, tabs, etc.)
- **Lucide React**: Icon library
- **Embla Carousel**: Carousel component
- **cmdk**: Command palette component
- **react-day-picker**: Calendar component
- **vaul**: Drawer component
- **react-resizable-panels**: Resizable panel layouts

### Form & Validation
- **React Hook Form**: Form management
- **Zod**: Schema validation (@hookform/resolvers)

### Utilities
- **date-fns**: Date formatting
- **lodash**: Utility functions
- **class-variance-authority**: Component variant styling
- **clsx/tailwind-merge**: Class name utilities