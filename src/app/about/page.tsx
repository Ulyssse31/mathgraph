import Link from "next/link";

export const metadata = {
  title: "About — MathGraph",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-200 overflow-y-auto">
      {/* Header */}
      <header className="h-14 border-b border-zinc-800 flex items-center justify-between px-6 sticky top-0 bg-zinc-950/80 backdrop-blur-sm z-50">
        <Link
          href="/"
          className="text-lg font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent hover:from-indigo-300 hover:to-purple-300 transition-all"
        >
          MathGraph
        </Link>
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="text-xs px-3 py-1.5 rounded-lg bg-zinc-800 border border-zinc-700 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-700 transition-colors"
          >
            Home
          </Link>
          <Link
            href="/projects"
            className="text-xs px-3 py-1.5 rounded-lg bg-zinc-800 border border-zinc-700 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-700 transition-colors"
          >
            Projects
          </Link>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-3xl mx-auto px-6 py-16">
        {/* Hero */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
            About MathGraph
          </h1>
          <p className="text-lg text-zinc-400 max-w-xl mx-auto leading-relaxed">
            A free, open-source platform for learning mathematics through
            interconnected concept graphs.
          </p>
        </div>

        {/* Mission */}
        <section className="mb-12">
          <h2 className="text-xl font-bold text-zinc-100 mb-4 flex items-center gap-2">
            <span className="w-1 h-6 rounded-full bg-indigo-500" />
            Mission
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-4">
            Mathematics is not a linear sequence of chapters in a textbook.
            It&apos;s a vast, interconnected web of ideas where algebra informs
            geometry, analysis motivates topology, and number theory connects to
            everything. Traditional courses flatten this rich structure into a
            single path. MathGraph restores it.
          </p>
          <p className="text-zinc-400 leading-relaxed">
            Our goal is to build the most comprehensive, freely available
            graph-based mathematics curriculum — from undergraduate fundamentals
            to graduate-level theory — where every concept knows its
            prerequisites, every module shows its connections, and every learner
            can chart their own path through the landscape of mathematics.
          </p>
        </section>

        {/* How it works */}
        <section className="mb-12">
          <h2 className="text-xl font-bold text-zinc-100 mb-4 flex items-center gap-2">
            <span className="w-1 h-6 rounded-full bg-purple-500" />
            How It Works
          </h2>
          <div className="space-y-4">
            {[
              {
                step: "1",
                title: "Modules",
                desc: "Mathematics is organized into modules — Polynomials, Real Analysis, Topology, and more. Each module is a self-contained course with its own directed graph of concepts.",
                color: "#6366f1",
              },
              {
                step: "2",
                title: "Concept Graphs",
                desc: "Inside each module, concepts are arranged as a directed acyclic graph (DAG). Prerequisites are explicit: you can see exactly what you need before tackling a new idea.",
                color: "#8b5cf6",
              },
              {
                step: "3",
                title: "Lessons",
                desc: "Each concept has a lesson written in a conversational, motivation-first style — not dry Bourbaki formalism. Definitions are motivated, theorems are explained, and proofs are revealed step by step.",
                color: "#a855f7",
              },
              {
                step: "4",
                title: "Exercises & Projects",
                desc: "Practice with computational problems, multiple-choice questions, and proof exercises. Tackle X-ENS style projects that weave together concepts from multiple modules.",
                color: "#c084fc",
              },
            ].map((item) => (
              <div
                key={item.step}
                className="flex gap-4 p-4 rounded-xl bg-zinc-900/50 border border-zinc-800/50"
              >
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold shrink-0"
                  style={{
                    backgroundColor: `${item.color}20`,
                    color: item.color,
                  }}
                >
                  {item.step}
                </div>
                <div>
                  <h3 className="font-semibold text-zinc-200 mb-1">
                    {item.title}
                  </h3>
                  <p className="text-sm text-zinc-400 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Tech Stack */}
        <section className="mb-12">
          <h2 className="text-xl font-bold text-zinc-100 mb-4 flex items-center gap-2">
            <span className="w-1 h-6 rounded-full bg-pink-500" />
            Tech Stack
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              { name: "Next.js", desc: "React framework with App Router" },
              { name: "React Flow", desc: "Interactive graph visualization" },
              { name: "Prisma", desc: "Type-safe database ORM" },
              { name: "SQLite", desc: "Lightweight embedded database" },
              { name: "Tailwind CSS", desc: "Utility-first styling" },
              { name: "KaTeX", desc: "Fast LaTeX math rendering" },
              { name: "dagre", desc: "Automatic directed graph layout" },
              { name: "NextAuth.js", desc: "Authentication" },
            ].map((tech) => (
              <div
                key={tech.name}
                className="px-4 py-3 rounded-lg bg-zinc-900/50 border border-zinc-800/50"
              >
                <div className="text-sm font-medium text-zinc-200">
                  {tech.name}
                </div>
                <div className="text-xs text-zinc-500">{tech.desc}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Philosophy */}
        <section className="mb-12">
          <h2 className="text-xl font-bold text-zinc-100 mb-4 flex items-center gap-2">
            <span className="w-1 h-6 rounded-full bg-amber-500" />
            Philosophy
          </h2>
          <ul className="space-y-3 text-zinc-400">
            <li className="flex gap-2">
              <span className="text-indigo-400 mt-1">&#x2022;</span>
              <span>
                <strong className="text-zinc-200">Motivation first.</strong>{" "}
                Every definition is preceded by a &ldquo;why should I
                care?&rdquo; paragraph. No result appears without context.
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-indigo-400 mt-1">&#x2022;</span>
              <span>
                <strong className="text-zinc-200">
                  Prerequisites are explicit.
                </strong>{" "}
                No more &ldquo;we assume the reader is familiar with...&rdquo;.
                If you need a concept, we tell you exactly which one and link to
                it.
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-indigo-400 mt-1">&#x2022;</span>
              <span>
                <strong className="text-zinc-200">
                  Cross-module connections.
                </strong>{" "}
                When eigenvalues connect to polynomial roots, or when topology
                informs analysis, we make that link visible and explorable.
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-indigo-400 mt-1">&#x2022;</span>
              <span>
                <strong className="text-zinc-200">
                  History and culture matter.
                </strong>{" "}
                Optional nodes cover the human stories behind the
                mathematics — who discovered what, why it mattered, and how
                ideas evolved.
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-indigo-400 mt-1">&#x2022;</span>
              <span>
                <strong className="text-zinc-200">Free and open-source.</strong>{" "}
                Mathematics belongs to everyone. MathGraph will always be free.
              </span>
            </li>
          </ul>
        </section>

        {/* Contributing */}
        <section className="mb-12">
          <h2 className="text-xl font-bold text-zinc-100 mb-4 flex items-center gap-2">
            <span className="w-1 h-6 rounded-full bg-emerald-500" />
            Contributing
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-4">
            MathGraph is an open-source project and contributions are welcome.
            Whether you want to write a lesson, add exercises, propose new
            modules, fix bugs, or improve the UI — every contribution helps
            build a better math learning experience.
          </p>
          <p className="text-zinc-400 leading-relaxed">
            If you&apos;re a mathematician, a student, or a developer who cares
            about math education, we&apos;d love to have you on board.
          </p>
        </section>

        {/* License */}
        <section className="mb-16">
          <h2 className="text-xl font-bold text-zinc-100 mb-4 flex items-center gap-2">
            <span className="w-1 h-6 rounded-full bg-cyan-500" />
            License
          </h2>
          <p className="text-zinc-400 leading-relaxed">
            MathGraph is released under the{" "}
            <span className="text-zinc-200 font-medium">MIT License</span>.
            Use it, fork it, improve it, share it.
          </p>
        </section>

        {/* Footer */}
        <div className="text-center text-sm text-zinc-600 border-t border-zinc-800 pt-8">
          Made with care for the love of mathematics.
        </div>
      </main>
    </div>
  );
}
