# Video Mind

An educational video platform built with Next.js that allows users to create, comment on, and watch educational videos.

## Features

- **Video Library**: Browse and search through a collection of educational videos
- **Global Search (⌘K)**: Quickly find topics, videos, and users throughout the platform
- **Sidebar Navigation (⌘B)**: Easily toggle sidebar for intuitive navigation between sections
- **Video Creation & Editing**: Create videos with title, description, course, category and URL
- **Video Tagging**: Categorize videos by course and category to help users better discover videos for all levels
- **Video Playback**: Full-screen playback with adjustable speed and volume controls
- **Scratchpad**: Take notes while watching videos
- **Comments**: Comment on videos and view discussions from other users
- **Responsive Design**: Optimized for both desktop and mobile experiences
- **User Profiles**: Easy global user switching with profile management
- **Recommended Videos**: Recommendations shown alongside each video
- **Dynamic Categories**: Add new categories simply by using them in video URLs, with automatic color coding
- **Theme Support**: Toggle between light and dark mode for comfortable viewing

## Technology Stack

- **Frontend**: Next.js 14 with App Router, TypeScript, TailwindCSS
- **State Management**: Custom stores using Zustand
- **Data Fetching**: TanStack Query (React Query) for efficient API data fetching
- **API Integration**: RESTful API integration for videos and comments

## Project Structure

- `/app`: Next.js App Router routes and pages
- `/components`: Reusable UI components
- `/hooks`: Custom React hooks for state and functionality
- `/lib`: Utility functions and shared libraries
- `/providers`: React context providers
- `/services`: API service integrations
- `/store`: Zustand state stores

## Technical Implementation Details

- **Dynamic Category System**: URLs include optional category and course parameters for tracking without requiring backend changes
- **Automatic Color Generation**: Custom utility that generates consistent, visually distinct colors for categories based on string values
- **URL-based Discovery**: New categories and topics can be created simply by adding them to video URLs, enabling easy extensibility
- **Keyboard Shortcuts**: Optimized for power users with keyboard shortcuts for common actions

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm

### Installation

1. Install dependencies:

```bash
pnpm install
```

2. Set up environment variables:

```bash
cp .env.example .env
```

3. Start the development server:

```bash
pnpm dev
```

The application will be available at http://localhost:3000

## Build for Production

```bash
pnpm build
pnpm start
```

## Key Components

- **Video Player**: Full-featured player with playback controls
- **Video List**: Filterable, searchable video gallery with tag-based filtering
- **Comment System**: Threaded comments with user avatars
- **Video Upload**: Form for adding new educational content with category and tag selection
- **User Authentication**: Secure login and registration
- **Tag Management**: System for organizing videos by topics, difficulty, and courses
