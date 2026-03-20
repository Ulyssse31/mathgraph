"use client";

import { useState } from "react";
import type { SectionType } from "@/types/content";
import MarkdownRenderer from "./MarkdownRenderer";

interface SectionBlockProps {
  type: SectionType;
  title: string;
  content: string;
  commentary?: string;
  steps?: string[];
}

const sectionStyles: Record<
  SectionType,
  { border: string; badge: string; badgeBg: string; badgeText: string }
> = {
  motivation: {
    border: "border-l-orange-500",
    badge: "Pourquoi ?",
    badgeBg: "bg-orange-500/10",
    badgeText: "text-orange-400",
  },
  definition: {
    border: "border-l-blue-500",
    badge: "Def.",
    badgeBg: "bg-blue-500/10",
    badgeText: "text-blue-400",
  },
  theorem: {
    border: "border-l-purple-500",
    badge: "Thm.",
    badgeBg: "bg-purple-500/10",
    badgeText: "text-purple-400",
  },
  proof: {
    border: "border-l-zinc-600",
    badge: "Preuve",
    badgeBg: "bg-zinc-500/10",
    badgeText: "text-zinc-400",
  },
  example: {
    border: "border-l-emerald-500",
    badge: "Ex.",
    badgeBg: "bg-emerald-500/10",
    badgeText: "text-emerald-400",
  },
  remark: {
    border: "border-l-amber-500",
    badge: "Rem.",
    badgeBg: "bg-amber-500/10",
    badgeText: "text-amber-400",
  },
  historique: {
    border: "border-l-yellow-700",
    badge: "Hist.",
    badgeBg: "bg-yellow-700/10",
    badgeText: "text-yellow-600",
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
            <span className="text-[10px] font-mono text-zinc-500 bg-zinc-800 px-1.5 py-0.5 rounded">
              {i + 1}/{total}
            </span>
          </div>
          <div className="italic pl-3 border-l border-zinc-700/50">
            <MarkdownRenderer content={step} />
          </div>
        </div>
      ))}

      {allRevealed ? (
        <div className="text-right text-zinc-500 mt-2 text-sm">&#9724;</div>
      ) : (
        <button
          onClick={() => setRevealed((r) => r + 1)}
          className="mt-2 flex items-center gap-2 text-sm text-zinc-400 hover:text-zinc-200 transition-colors group cursor-pointer"
        >
          <span className="inline-flex items-center justify-center w-5 h-5 rounded bg-zinc-800 group-hover:bg-zinc-700 text-[10px] font-mono">
            {revealed + 1}
          </span>
          <span>
            {revealed === 0 ? "Montrer la preuve ▸" : "Étape suivante ▸"}
          </span>
          <span className="text-zinc-600 text-xs">
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
        className="text-sm text-zinc-400 hover:text-zinc-200 transition-colors cursor-pointer"
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
      <div className="text-right text-zinc-500 mt-2 text-sm">&#9724;</div>
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
  type,
  title,
  content,
  commentary,
  steps,
}: SectionBlockProps) {
  const style = sectionStyles[type] || sectionStyles.remark;

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
      className={`border-l-4 ${style.border} rounded-r-lg bg-zinc-900/50 p-5 my-4`}
    >
      <div className="flex items-center gap-2 mb-3">
        <span
          className={`text-xs font-bold px-2 py-0.5 rounded ${style.badgeBg} ${style.badgeText}`}
        >
          {style.badge}
        </span>
        {title && (
          <h3 className="text-sm font-semibold text-zinc-200">{title}</h3>
        )}
      </div>

      {commentary && (
        <div className="text-zinc-400 text-sm mb-4 leading-relaxed border-b border-zinc-800 pb-3">
          <MarkdownRenderer content={commentary} />
        </div>
      )}

      {body}
    </div>
  );
}
