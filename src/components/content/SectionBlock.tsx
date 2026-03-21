"use client";

import { useState } from "react";
import type { SectionType } from "@/types/content";
import MarkdownRenderer from "./MarkdownRenderer";

interface SectionBlockProps {
  id?: string;
  sectionIndex?: number;
  type: SectionType;
  title: string;
  content: string;
  commentary?: string;
  steps?: string[];
}

/* ─── 3B1B-inspired section styles ─── */

const sectionConfig: Record<
  SectionType,
  {
    badge: string;
    badgeColor: string;
    wrapper: string;
  }
> = {
  motivation: {
    badge: "Motivation",
    badgeColor: "text-orange-600 dark:text-orange-400",
    wrapper:
      "border-l-2 border-orange-400/50 dark:border-orange-500/30 pl-5 py-1",
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

export default function SectionBlock({
  id,
  sectionIndex,
  type,
  title,
  content,
  commentary,
  steps,
}: SectionBlockProps) {
  const config = sectionConfig[type] || sectionConfig.remark;

  let body: React.ReactNode;

  if (type === "proof" && steps && steps.length > 0) {
    body = <ProofSteps steps={steps} />;
  } else if (type === "proof") {
    body = <CollapsibleProof content={content} />;
  } else if (type === "theorem" && content.includes("---proof---")) {
    body = <TheoremWithProof content={content} />;
  } else {
    body = <MarkdownRenderer content={content} />;
  }

  return (
    <div
      id={id}
      data-section-index={sectionIndex}
      className={`${config.wrapper} my-6`}
    >
      {/* Section header */}
      <div className="flex items-center gap-2 mb-3">
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
}
