"use client";

import { useState } from "react";
import type { SectionType, InlineExercise } from "@/types/content";
import MarkdownRenderer from "./MarkdownRenderer";

interface SectionBlockProps {
  id?: string;
  sectionIndex?: number;
  type: SectionType;
  title: string;
  content: string;
  commentary?: string;
  steps?: string[];
  starred?: boolean;
  collapsed?: boolean;
  exercise?: InlineExercise;
}

/* ─── 3B1B-inspired section styles ─── */

const sectionConfig: Record<
  SectionType,
  {
    badge: string;
    badgeColor: string;
    wrapper: string;
    icon?: string;
  }
> = {
  motivation: {
    badge: "Motivation",
    badgeColor: "text-orange-600 dark:text-orange-400",
    wrapper:
      "border-l-2 border-orange-400/50 dark:border-orange-500/30 pl-5 py-1",
  },
  problem: {
    badge: "Problème",
    badgeColor: "text-red-600 dark:text-red-400",
    wrapper:
      "border-2 border-red-400/40 dark:border-red-500/25 rounded-lg bg-red-50/30 dark:bg-red-950/15 px-6 py-5",
    icon: "?",
  },
  intuition: {
    badge: "Intuition",
    badgeColor: "text-teal-600 dark:text-teal-400",
    wrapper:
      "border-l-2 border-teal-400/50 dark:border-teal-500/30 pl-5 py-1",
  },
  definition: {
    badge: "Définition",
    badgeColor: "text-blue-600 dark:text-blue-400",
    wrapper:
      "border border-blue-300/60 dark:border-blue-500/20 rounded-lg bg-blue-50/50 dark:bg-blue-950/20 px-6 py-5",
  },
  theorem: {
    badge: "Théorème",
    badgeColor: "text-purple-600 dark:text-purple-400",
    wrapper:
      "border-2 border-purple-300/60 dark:border-purple-500/25 rounded-lg bg-purple-50/30 dark:bg-purple-950/15 px-6 py-5",
  },
  proof: {
    badge: "Preuve",
    badgeColor: "text-zinc-500 dark:text-zinc-400",
    wrapper: "pl-5 py-1",
  },
  example: {
    badge: "Exemple",
    badgeColor: "text-emerald-600 dark:text-emerald-400",
    wrapper:
      "bg-emerald-50/40 dark:bg-emerald-950/10 border border-emerald-200/40 dark:border-emerald-800/20 rounded-lg px-6 py-5",
  },
  remark: {
    badge: "Remarque",
    badgeColor: "text-amber-600 dark:text-amber-400",
    wrapper:
      "border-l-2 border-amber-400/50 dark:border-amber-500/30 pl-5 py-1",
  },
  historique: {
    badge: "Histoire",
    badgeColor: "text-yellow-700 dark:text-yellow-500",
    wrapper:
      "border-l-2 border-yellow-600/30 dark:border-yellow-600/20 pl-5 py-1 italic",
  },
  warning: {
    badge: "Piège",
    badgeColor: "text-rose-600 dark:text-rose-400",
    wrapper:
      "border-l-4 border-rose-500/50 dark:border-rose-500/30 bg-rose-50/30 dark:bg-rose-950/15 pl-5 pr-4 py-4 rounded-r-lg",
    icon: "⚠",
  },
  approfondissement: {
    badge: "Aller plus loin ★",
    badgeColor: "text-indigo-600 dark:text-indigo-400",
    wrapper:
      "border border-dashed border-indigo-300/50 dark:border-indigo-500/25 rounded-lg bg-indigo-50/20 dark:bg-indigo-950/10 px-6 py-5",
  },
  application: {
    badge: "Application",
    badgeColor: "text-cyan-600 dark:text-cyan-400",
    wrapper:
      "border border-cyan-300/50 dark:border-cyan-500/20 rounded-lg bg-cyan-50/30 dark:bg-cyan-950/10 px-6 py-5",
  },
  "exercise-inline": {
    badge: "À vous",
    badgeColor: "text-violet-600 dark:text-violet-400",
    wrapper:
      "border-2 border-violet-300/40 dark:border-violet-500/20 rounded-lg bg-violet-50/20 dark:bg-violet-950/10 px-6 py-5",
    icon: "✎",
  },
  recap: {
    badge: "Résumé",
    badgeColor: "text-zinc-600 dark:text-zinc-300",
    wrapper:
      "border border-zinc-300/60 dark:border-zinc-600/30 rounded-lg bg-gradient-to-br from-zinc-50/50 to-zinc-100/30 dark:from-zinc-900/30 dark:to-zinc-800/20 px-6 py-5",
  },
  prerequisites: {
    badge: "Prérequis",
    badgeColor: "text-zinc-500 dark:text-zinc-400",
    wrapper:
      "border-l-2 border-zinc-300/50 dark:border-zinc-600/30 pl-5 py-1 opacity-80",
  },
};

function ProofSteps({ steps }: { steps: string[] }) {
  const [revealed, setRevealed] = useState(0);
  const total = steps.length;
  const allRevealed = revealed >= total;

  return (
    <div className="mt-1">
      {steps.slice(0, revealed).map((step, i) => (
        <div key={i} className="mb-3">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-mono text-zinc-500 bg-zinc-200 dark:bg-zinc-800 px-1.5 py-0.5 rounded">
              {i + 1}/{total}
            </span>
          </div>
          <div className="italic pl-3 border-l border-zinc-300 dark:border-zinc-700/50">
            <MarkdownRenderer content={step} />
          </div>
        </div>
      ))}

      {allRevealed ? (
        <div className="text-right text-zinc-400 dark:text-zinc-500 mt-2 text-sm select-none">
          &#9724;
        </div>
      ) : (
        <button
          onClick={() => setRevealed((r) => r + 1)}
          className="mt-2 flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200 transition-colors group cursor-pointer"
        >
          <span className="inline-flex items-center justify-center w-5 h-5 rounded bg-zinc-200 dark:bg-zinc-800 group-hover:bg-zinc-300 dark:group-hover:bg-zinc-700 text-[10px] font-mono">
            {revealed + 1}
          </span>
          <span>
            {revealed === 0 ? "Montrer la preuve ▸" : "Étape suivante ▸"}
          </span>
          <span className="text-zinc-400 dark:text-zinc-600 text-xs">
            ({revealed}/{total})
          </span>
        </button>
      )}
    </div>
  );
}

function CollapsibleProof({ content }: { content: string }) {
  const [revealed, setRevealed] = useState(false);

  if (!revealed) {
    return (
      <button
        onClick={() => setRevealed(true)}
        className="text-sm text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200 transition-colors cursor-pointer"
      >
        Montrer la preuve ▸
      </button>
    );
  }

  return (
    <>
      <div className="italic">
        <MarkdownRenderer content={content} />
      </div>
      <div className="text-right text-zinc-400 dark:text-zinc-500 mt-2 text-sm select-none">
        &#9724;
      </div>
    </>
  );
}

function TheoremWithProof({ content }: { content: string }) {
  const parts = content.split("---proof---");
  const statement = parts[0].trim();
  const proofRaw = parts[1]?.trim();

  if (!proofRaw) {
    return <MarkdownRenderer content={content} />;
  }

  const proofSteps = proofRaw
    .split("---step---")
    .map((s) => s.trim())
    .filter(Boolean);

  return (
    <div>
      <MarkdownRenderer content={statement} />
      <ProofSteps steps={proofSteps} />
    </div>
  );
}

function InlineExerciseBlock({ exercise }: { exercise: InlineExercise }) {
  const [showHint, setShowHint] = useState(false);
  const [showSolution, setShowSolution] = useState(false);

  return (
    <div className="space-y-3">
      <MarkdownRenderer content={exercise.statement} />
      <div className="flex gap-2 flex-wrap">
        {exercise.hint && (
          <button
            onClick={() => setShowHint(!showHint)}
            className="text-xs px-3 py-1.5 rounded-md bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300 hover:bg-violet-200 dark:hover:bg-violet-900/50 transition-colors cursor-pointer"
          >
            {showHint ? "Masquer l'indice" : "Indice ▸"}
          </button>
        )}
        <button
          onClick={() => setShowSolution(!showSolution)}
          className="text-xs px-3 py-1.5 rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors cursor-pointer"
        >
          {showSolution ? "Masquer la solution" : "Solution ▸"}
        </button>
      </div>
      {showHint && exercise.hint && (
        <div className="text-sm text-violet-600 dark:text-violet-300 bg-violet-50/50 dark:bg-violet-950/20 rounded-md px-4 py-3">
          <MarkdownRenderer content={exercise.hint} />
        </div>
      )}
      {showSolution && (
        <div className="text-sm border-l-2 border-emerald-400/50 pl-4">
          <MarkdownRenderer content={exercise.solution} />
        </div>
      )}
    </div>
  );
}

function CollapsibleSection({
  children,
  defaultCollapsed,
  badge,
}: {
  children: React.ReactNode;
  defaultCollapsed: boolean;
  badge: string;
}) {
  const [collapsed, setCollapsed] = useState(defaultCollapsed);

  return (
    <div>
      {collapsed ? (
        <button
          onClick={() => setCollapsed(false)}
          className="text-sm text-indigo-500 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors cursor-pointer flex items-center gap-2"
        >
          <span>▸ {badge}</span>
          <span className="text-xs text-zinc-400">(cliquez pour développer)</span>
        </button>
      ) : (
        <>
          <button
            onClick={() => setCollapsed(true)}
            className="text-xs text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors cursor-pointer mb-3"
          >
            ▾ Réduire
          </button>
          {children}
        </>
      )}
    </div>
  );
}

export default function SectionBlock({
  id,
  sectionIndex,
  type,
  title,
  content,
  commentary,
  steps,
  starred,
  collapsed: defaultCollapsed,
  exercise,
}: SectionBlockProps) {
  const config = sectionConfig[type] || sectionConfig.remark;

  let body: React.ReactNode;

  if (type === "exercise-inline" && exercise) {
    body = <InlineExerciseBlock exercise={exercise} />;
  } else if (type === "proof" && steps && steps.length > 0) {
    body = <ProofSteps steps={steps} />;
  } else if (type === "proof") {
    body = <CollapsibleProof content={content} />;
  } else if (type === "theorem" && content.includes("---proof---")) {
    body = <TheoremWithProof content={content} />;
  } else {
    body = <MarkdownRenderer content={content} />;
  }

  const isCollapsible = type === "approfondissement" || defaultCollapsed;

  const sectionContent = (
    <div
      id={id}
      data-section-index={sectionIndex}
      className={`${config.wrapper} my-6`}
    >
      {/* Section header */}
      <div className="flex items-center gap-2 mb-3">
        {config.icon && (
          <span className={`text-sm ${config.badgeColor}`}>{config.icon}</span>
        )}
        <span
          className={`text-xs font-semibold uppercase tracking-wider ${config.badgeColor}`}
        >
          {config.badge}
        </span>
        {title && (
          <>
            <span className="text-zinc-300 dark:text-zinc-600">—</span>
            <h3 className="text-sm font-semibold text-foreground">{title}</h3>
          </>
        )}
        {starred && (
          <span className="text-xs text-indigo-400" title="Contenu optionnel">★</span>
        )}
      </div>

      {/* Commentary / intuition */}
      {commentary && (
        <div className="text-zinc-500 dark:text-zinc-400 text-sm mb-4 leading-relaxed border-b border-zinc-200 dark:border-zinc-800 pb-3">
          <MarkdownRenderer content={commentary} />
        </div>
      )}

      {/* Content */}
      <div className="prose-lesson">{body}</div>
    </div>
  );

  if (isCollapsible) {
    return (
      <div className={`${config.wrapper} my-6`}>
        <CollapsibleSection
          defaultCollapsed={defaultCollapsed ?? type === "approfondissement"}
          badge={`${config.badge}${title ? ` — ${title}` : ""}`}
        >
          {/* Section header */}
          <div className="flex items-center gap-2 mb-3">
            {config.icon && (
              <span className={`text-sm ${config.badgeColor}`}>{config.icon}</span>
            )}
            <span
              className={`text-xs font-semibold uppercase tracking-wider ${config.badgeColor}`}
            >
              {config.badge}
            </span>
            {title && (
              <>
                <span className="text-zinc-300 dark:text-zinc-600">—</span>
                <h3 className="text-sm font-semibold text-foreground">{title}</h3>
              </>
            )}
            {starred && (
              <span className="text-xs text-indigo-400" title="Contenu optionnel">★</span>
            )}
          </div>
          {commentary && (
            <div className="text-zinc-500 dark:text-zinc-400 text-sm mb-4 leading-relaxed border-b border-zinc-200 dark:border-zinc-800 pb-3">
              <MarkdownRenderer content={commentary} />
            </div>
          )}
          <div className="prose-lesson">{body}</div>
        </CollapsibleSection>
      </div>
    );
  }

  return sectionContent;
}
