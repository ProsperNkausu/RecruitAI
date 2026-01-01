# RecruitAI - Smart Recruitment Platform

A modern, professional SaaS recruitment platform built with Next.js and Tailwind CSS. RecruitAI helps companies create job application forms, review AI screening results, and manage shortlisted candidates.

## Features

### MVP Functionality

- **Login & Sign Up**: Secure company account authentication
- **Company Dashboard**: Overview of hiring activity with summary cards and job listings
- **Create Job**: Define job roles with AI screening criteria
- **Application Form Builder**: Create customized job application forms with default and custom fields
- **Applications Review**: View and filter AI screening results (Qualified, Not Qualified, Pending)
- **Shortlisted Candidates**: Interview-ready candidate management with Google Sheets sync capability
- **Public Application Form**: Clean, step-by-step form for job applicants

### Design Principles

- **Clean & Professional**: Minimal design with neutral color palette
- **User-Focused**: Clear CTAs, readable typography, generous whitespace
- **Responsive**: Desktop-first, fully responsive across all devices
- **Accessible**: Proper contrast, keyboard navigation, semantic HTML
- **Trustworthy**: Professional appearance with subtle accent colors

## Tech Stack

- **Framework**: Next.js 15+ (App Router)
- **Styling**: Tailwind CSS 3.4+
- **Language**: TypeScript
- **Font**: Inter (system-ui fallback)
- **Package Manager**: npm

## Project Structure

```
src/
├── app/                          # Next.js App Router pages
│   ├── page.tsx                  # Login/Sign Up
│   ├── layout.tsx                # Root layout
│   ├── dashboard/
│   │   └── page.tsx              # Company dashboard
│   ├── jobs/
│   │   ├── new/
│   │   │   └── page.tsx          # Create new job
│   │   └── [jobId]/
│   │       └── page.tsx          # Application form builder
│   ├── applications/
│   │   └── [jobId]/
│   │       └── page.tsx          # Applications review
│   ├── candidates/
│   │   └── page.tsx              # Shortlisted candidates
│   └── apply/
│       └── [jobId]/
│           └── page.tsx          # Public application form
├── components/                   # Reusable UI components
│   ├── Button.tsx                # Button component with variants
│   ├── Input.tsx                 # Text input with validation
│   ├── Textarea.tsx              # Textarea with validation
│   ├── Badge.tsx                 # Status badges
│   ├── Card.tsx                  # Card layout components
│   ├── Table.tsx                 # Data table components
│   ├── Select.tsx                # Select dropdown
│   ├── Header.tsx                # App header
│   ├── DashboardLayout.tsx        # Dashboard layout wrapper
│   ├── AuthLayout.tsx            # Auth pages layout
│   └── index.ts                  # Component exports
├── types/                        # TypeScript types and interfaces
├── lib/                          # Utility functions
└── globals.css                   # Global styles and Tailwind directives

```

## Color Palette

- **Primary**: #1e3a8a (Dark Navy)
- **Secondary**: #0ea5e9 (Blue)
- **Success**: #10b981 (Green)
- **Danger**: #ef4444 (Red)
- **Warning**: #f59e0b (Amber)
- **Neutral**: Grays (50-900)

## Component Overview

### UI Components

- **Button**: Primary, secondary, outline variants; sm, md, lg sizes; loading state
- **Input**: Text input with label, error, helper text
- **Textarea**: Textarea with label, error, helper text
- **Select**: Dropdown with options and labels
- **Badge**: Success, danger, warning, info variants
- **Card**: Flexible card layout with header, body, footer

### Layout Components

- **DashboardLayout**: Main app layout with header
- **AuthLayout**: Authentication pages layout
- **Header**: Sticky navigation header

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### Building

```bash
npm run build
npm start
```

### Linting

```bash
npm run lint
```

## Pages & Routes

| Page | Route | Purpose |
|------|-------|---------|
| Login/Sign Up | `/` | Company authentication |
| Dashboard | `/dashboard` | Main overview & job listings |
| Create Job | `/jobs/new` | Define job & screening criteria |
| Form Builder | `/jobs/[jobId]` | Create application form |
| Review Applications | `/applications/[jobId]` | AI screening results |
| Shortlisted Candidates | `/candidates` | Interview-ready candidates |
| Public Application | `/apply/[jobId]` | Applicant-facing form |

## Development Notes

- All components are functional components with hooks
- Form states are managed with React's `useState`
- Styling uses Tailwind CSS utility classes
- Typography uses Inter font with system-ui fallback
- Images/avatars are placeholders—replace with actual assets
- API integration is mocked with setTimeout simulations

## Next Steps for Production

1. Connect to authentication backend (Firebase, Auth0, etc.)
2. Integrate API endpoints for CRUD operations
3. Implement Google Sheets API integration
4. Add form validation library (Zod, Yup, etc.)
5. Set up error handling and toast notifications
6. Add loading skeletons for data tables
7. Implement pagination for large datasets
8. Add analytics and error tracking
9. Set up environment variables
10. Deploy to production (Vercel recommended for Next.js)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

Proprietary - RecruitAI © 2024
