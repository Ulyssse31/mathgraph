# MathGraph

A non-linear, graph-based platform for learning mathematics from undergraduate to graduate level. Inspired by 42 School's gamified curriculum — but for pure mathematics.

## Why MathGraph?

Traditional math education is linear: chapter 1, chapter 2, chapter 3. But math isn't linear. Polynomials connect to field theory, number theory, linear algebra, and analysis simultaneously. MathGraph makes these connections visible and navigable.

**No Bourbaki.** Every definition is motivated ("why do we need this?"), every theorem has a date and an author, and examples come before abstraction.

## Features

- **Fractal graph architecture** — Modules (Polynomials, Arithmetic, Galois Theory...) are themselves nodes in a top-level graph. Zoom into any module to explore its concept subgraph.
- **Cross-module connections** — Portal nodes show how concepts in one module connect to another. Three depth levels: surface (analogy), structural (shared technique), and deep (fundamental equivalence).
- **Rich content** — Lessons with LaTeX (KaTeX), styled sections (motivation, definition, theorem, proof, example, historical notes), and a "No Bourbaki" philosophy.
- **Three exercise types** — Computational (auto-checked), QCM (multiple choice), and proof-style (progressive hints + solution).
- **X-ENS projects** — Hard, multi-concept problems spanning multiple modules, inspired by French competitive exam problems.
- **Gamification** — XP, node status progression (locked → available → in progress → practiced → mastered), visual feedback.
- **Meta-skills modules** — How to write proofs, problem-solving strategies, and more.
- **Admin panel** — Create modules, nodes, edges, lessons, and exercises through the web UI.
- **User authentication** — Sign in with GitHub or email/password. Progress saved per user.

## Tech Stack

- **Next.js** (App Router) + TypeScript
- **React Flow** (@xyflow/react) for interactive graph visualization
- **KaTeX** for LaTeX rendering
- **Prisma** + SQLite for data storage
- **Tailwind CSS** for styling (dark theme)
- **NextAuth.js** for authentication

## Getting Started

### Prerequisites

- Node.js 18+
- npm or pnpm

### Installation

```bash
git clone https://github.com/your-username/mathgraph.git
cd mathgraph
npm install
```

### Database Setup

```bash
npx prisma migrate dev
npx tsx src/lib/seed.ts
```

### Environment Variables

Copy `.env` and set your values:

```env
AUTH_SECRET="your-secret-here"
# Optional: GitHub OAuth
GITHUB_CLIENT_ID=""
GITHUB_CLIENT_SECRET=""
```

### Run

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

```
src/
├── app/
│   ├── page.tsx              # Main graph view
│   ├── learn/[nodeId]/       # Lesson + exercises page
│   ├── projects/             # X-ENS project listing + detail
│   ├── auth/signin/          # Authentication
│   ├── admin/                # Admin panel
│   └── api/                  # API routes
├── components/
│   ├── graph/                # React Flow components (MathNode, MathEdge, PortalNode, etc.)
│   ├── content/              # Content components (MarkdownRenderer, SectionBlock, ExerciseCard, etc.)
│   └── auth/                 # Auth components
├── types/                    # TypeScript types
└── lib/                      # Prisma client, auth config, seed
```

## Content Philosophy

Every lesson follows the "No Bourbaki" guidelines:

1. **Motivate before defining** — Why do we need this concept? What problem does it solve?
2. **Examples before abstraction** — Show a concrete case, then generalize.
3. **Historical context** — Every major result has a date and attribution.
4. **Friendly but rigorous** — Conversational tone to build intuition, then formal statements.
5. **Dense cross-references** — Connections to other modules are explicit and navigable.

## Contributing

Contributions welcome! You can help by:

- Adding new modules and content
- Improving existing lessons
- Creating exercises and projects
- Fixing bugs or improving the UI
- Translating content

## License

MIT — see [LICENSE](LICENSE).
