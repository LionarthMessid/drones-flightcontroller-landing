# Aeroque - Drone Programming Platform

## Overview

Aeroque is a full-stack web application designed to make drone programming accessible to everyone. The platform combines hardware flight controllers with visual programming tools, simulation environments, and educational resources. Built with a modern tech stack including React, Express, TypeScript, and PostgreSQL, the application follows a monorepo structure with clear separation between client, server, and shared components.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: Radix UI primitives with shadcn/ui styling
- **State Management**: TanStack Query for server state management
- **Animations**: Framer Motion for smooth interactions
- **Form Handling**: React Hook Form with Zod validation

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript for type safety
- **Database ORM**: Drizzle ORM with PostgreSQL
- **Database Provider**: Neon (serverless PostgreSQL)
- **Session Management**: PostgreSQL-based sessions with connect-pg-simple
- **Development**: Hot reload with Vite middleware integration

### Project Structure
```
├── client/           # React frontend application
├── server/           # Express backend API
├── shared/           # Shared types and schemas
├── migrations/       # Database migration files
└── dist/            # Production build output
```

## Key Components

### Database Layer
- **Schema Definition**: Centralized in `shared/schema.ts` using Drizzle ORM
- **Current Tables**: Users table with username/password authentication
- **Migration Strategy**: Drizzle Kit for schema migrations
- **Connection**: Neon serverless PostgreSQL database

### Storage Interface
- **Abstraction**: IStorage interface for data operations
- **Implementation**: Memory storage for development, easily extensible to database storage
- **Methods**: User CRUD operations (create, read by ID, read by username)

### API Architecture
- **Pattern**: RESTful API with `/api` prefix
- **Middleware**: Request logging with response time tracking
- **Error Handling**: Centralized error middleware with status code mapping
- **Type Safety**: Shared TypeScript types between client and server

### UI Component System
- **Design System**: Custom Tailwind configuration with CSS variables
- **Components**: Comprehensive set of Radix UI components
- **Theming**: Dark mode support with class-based theme switching
- **Typography**: Monospace font family for technical aesthetic

## Data Flow

### Development Flow
1. Client requests served by Vite development server
2. API requests proxied to Express server on different port
3. Hot module replacement for instant development feedback
4. Server-side TypeScript compilation with tsx

### Production Flow
1. Client built as static assets with Vite
2. Server bundled with esbuild for Node.js target
3. Express serves both API routes and static client files
4. Database connections pooled through Neon serverless

### Authentication Flow
- Session-based authentication using PostgreSQL storage
- User registration and login through secure password handling
- Session persistence across browser sessions

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: Serverless PostgreSQL client
- **drizzle-orm**: Type-safe database ORM
- **express**: Web application framework
- **react**: Frontend UI library
- **vite**: Build tool and development server

### UI Dependencies
- **@radix-ui/***: Accessible UI primitives
- **tailwindcss**: Utility-first CSS framework
- **framer-motion**: Animation library
- **lucide-react**: Icon library

### Development Dependencies
- **typescript**: Type checking and compilation
- **tsx**: TypeScript execution for Node.js
- **esbuild**: Fast JavaScript bundler
- **drizzle-kit**: Database schema management

## Deployment Strategy

### Build Process
1. **Client Build**: Vite builds React app to `dist/public`
2. **Server Build**: esbuild bundles Express server to `dist/index.js`
3. **Dependencies**: External packages marked as external in build
4. **Assets**: Static assets served from built client directory

### Environment Configuration
- **Database**: PostgreSQL connection via `DATABASE_URL` environment variable
- **Node Environment**: `NODE_ENV` for development/production modes
- **Replit Integration**: Special handling for Replit development environment

### Production Deployment
- Express server serves both API routes and static client files
- Single process handles all requests
- Database migrations applied before server start
- Environment variables required for database connection

## Changelog

```
Changelog:
- July 4, 2025. Enhanced 3D simulation with demo notification and code editor - Converted 2D drone simulation to full 3D using Three.js with geometric drone model (orange body, spinning rotors, realistic lighting/shadows). Added demo notification banner indicating development status. Integrated custom code editor with ESP32 flight controller code, real-time compilation output, serial monitor display, and live telemetry data. Generated high-quality 3D drone model asset for future integration. Improved user experience with comprehensive flight controls and visual feedback.
- July 3, 2025. Migration from Replit Agent completed - Updated landing page design with minimal sections (Home, Team, FAQ, Updates), added Company Mission and Product Glimpse sections, created drone mini-game, updated routes to /controller and /simulation, added shared Header/Footer to all pages. Logo now links to dedicated game page at /game, added HOME navigation link. Enhanced controller page with comprehensive sections including ESP32 hardware visualization, PCB schematic, pin configuration details, technical specifications (processing, sensors, power), and programming platform information. Generated ESP32 3D model asset for future use.
- June 30, 2025. Initial setup
```

## User Preferences

```
Preferred communication style: Simple, everyday language.
```