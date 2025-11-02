# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## **Project Overview**

PerfEdge is an **interactive web-based knowledge base** focused on frontend performance optimization. It's an educational documentation application with live interactive demos, built with Next.js 15 and React 19. Content is written in MDX, combining markdown with React components for an engaging learning experience.

## **Common Development Commands**

```bash
# Development
pnpm dev              # Start development server (http://localhost:3000)
pnpm build            # Build for production
pnpm start            # Start production server

# Code Quality
pnpm lint             # Run ESLint
pnpm format           # Format all files with Prettier
pnpm lint-staged      # Run lint-staged manually

# Git Workflow
pnpm prepare          # Install and setup Husky hooks
pnpm commitlint       # Run commitlint on staged files
```

**Package Manager:** Uses `pnpm` (not npm/yarn).

**Pre-commit Hooks:** Husky + lint-staged automatically format and lint staged files on commit.

## **Architecture Overview**

### **Technology Stack**
- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript 5
- **UI:** React 19, Tailwind CSS 3.4, Motion (Framer Motion)
- **Content:** MDX (@next/mdx, remark-gfm)
- **Styling:** Tailwind with Typography plugin, custom color palette (primary: #1a8194)
- **Icons:** lucide-react
- **Animations:** motion (Framer Motion 12.0.0-alpha.2)
- **Syntax Highlighting:** highlight.js, prism-themes, rehype-highlight

### **Directory Structure**
```
perfedge/
├── app/                     # Next.js App Router
│   ├── docs/               # Documentation (MDX files)
│   │   ├── judgingcriteria/# Performance metrics & analysis
│   │   ├── preface/        # Introduction & contribution
│   │   ├── resource/       # Font & image optimization
│   │   └── uirendering/    # Rendering optimization
│   ├── globals.css         # Global styles with Tailwind
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Homepage with interactive logo

├── components/             # React components
│   ├── docs/              # Documentation-specific components
│   ├── mdx/               # MDX custom components
│   └── ui/                # Base UI components (Button, Input, mask)

├── lib/                   # Utility libraries
│   └── data/              # TOC generation & data utilities

└── public/                # Static assets
    ├── fonts/             # DemoFont.ttf
    ├── logo.*             # Logo files
    └── audio/             # Sound effects
```

### **Key Architecture Patterns**

1. **MDX-Driven Content:** Documentation pages are MDX files (`app/docs/[topic]/page.mdx`) that can import and use React components directly.

2. **Interactive Components:** Demo components live in `/components/docs/[topic]/` and are embedded in MDX files to demonstrate performance concepts interactively.

3. **Path Aliases:** TypeScript configured with `@/*` alias pointing to root (see `tsconfig.json`).

4. **Custom MDX Components:** Register custom components in `mdx-components.tsx` for use across all MDX files.

### **Entry Points**
- **Homepage:** `app/page.tsx` - Interactive landing page with animated logo and sound effects
- **Documentation:** `app/docs/[...]/page.mdx` - Dynamic route rendering MDX files
- **Layout:** `app/layout.tsx` - Root layout with Tippy.js CSS and metadata

## **Development Workflow**

### **Adding New Documentation**
1. Create MDX file in appropriate section: `app/docs/[topic]/page.mdx`
2. Add interactive demos as components in `/components/docs/[topic]/`
3. Import components directly in MDX:
   ```mdx
   <DebounceButton />
   <ScrollDemo />
   ```

### **Styling Guidelines**
- Use Tailwind utility classes throughout
- Custom colors defined in `tailwind.config.ts` (primary: #1a8194)
- Typography plugin enabled for MDX content
- Global styles in `app/globals.css`

### **Code Quality Standards**
- **ESLint:** next/core-web-vitals + next/typescript
- **Prettier:** With Tailwind CSS plugin and organize-imports
- **TypeScript:** Strict mode enabled
- **Pre-commit Hooks:** Auto-formatting and linting on commit

## **Configuration Files**
- `next.config.ts` - MDX support, environment variables
- `tailwind.config.ts` - Custom color palette
- `tsconfig.json` - Path aliases
- `postcss.config.mjs` - PostCSS configuration
- `mdx-components.tsx` - MDX component registry
- `commitlint.config.cjs` - Conventional commits enforcement

## **Key Information from README**
- Project is under active development with continuous updates
- Contributions welcome via Pull Requests and Issues
- Fork → branch → PR workflow
- MIT licensed (see LICENSE file)
