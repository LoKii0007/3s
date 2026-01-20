# 3S Fleet Management

A React application built with Vite, TypeScript, and Tailwind CSS.

## How to Run the Project

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

```bash
# Install dependencies
npm install
```

### Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linting
npm run lint
```

## Component Structure

This project follows a **feature-based component structure**, organizing code by feature rather than by type.

```
src/
├── components/
│   ├── features/           # Feature-specific components
│   │   └── fleetManagement/
│   │       ├── components/  # UI components for this feature
│   │       │   ├── HighlightText.tsx
│   │       │   ├── SearchBar.tsx
│   │       │   ├── TreeContent.tsx
│   │       │   └── TreeNodes.tsx
│   │       ├── types/       # TypeScript types for this feature
│   │       │   └── index.ts
│   │       └── utils/       # Utility functions and constants
│   │           ├── constants.ts
│   │           └── helper.ts
│   │
│   └── shared/             # Reusable components across features
│       ├── Breadcrumb.tsx
│       ├── Footer.tsx
│       └── sidebar/
│           ├── components/
│           │   ├── Sidebar.tsx
│           │   ├── SidebarFooter.tsx
│           │   ├── SidebarLogo.tsx
│           │   ├── SidebarNav.tsx
│           │   └── SidebarUser.tsx
│           ├── constants/
│           │   └── menuItems.tsx
│           ├── types/
│           │   └── index.ts
│           └── index.ts
│
├── layouts/                # Layout components
│   └── MainLayout.tsx
│
├── screens/                # Page/Screen components
│   └── FleetManagement.tsx
│
├── lib/                    # Shared utilities
│   └── utils.ts
│
├── App.tsx
├── App.css
├── main.tsx
└── index.css
```

### Structure Benefits

- **Scalability**: Easy to add new features without affecting existing code
- **Maintainability**: Related code is co-located, making it easier to understand and modify
- **Encapsulation**: Each feature contains its own components, types, and utilities
- **Reusability**: Shared components are separated for use across multiple features
