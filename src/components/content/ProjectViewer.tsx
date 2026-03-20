"use client";

import { useState } from "react";
import MarkdownRenderer from "./MarkdownRenderer";

interface ProjectViewerProps {
  title: string;
  statement: string;
  difficulty: number;
  hints: string[];
  solution: string;
  module?: { id: string; title: string; color: string } | null;
  requiredNodes: {
    node: {
      id: string;
      title: string;
      module: { id: string; title: string; color: string };
    };
  }[];
}

export default function ProjectViewer({
  title,
  statement,
  difficulty,
  hints,
  solution,
  module,
  requiredNodes,
}: ProjectViewerProps) {
  const [revealedHints, setRevealedHints] = useState(0);
  const [showSolution, setShowSolution] = useState(false);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-3 mb-2">
          {module && (
            <span
              className="text-xs font-medium px-2 py-1 rounded-full"
              style={{
                backgroundColor: `${module.color}20`,
                color: module.color,
              }}
            >
              {module.title}
            </span>
          )}
          <div className="flex gap-0.5">
            {Array.from({ length: 5 }, (_, i) => (
              <span
                key={i}
                className={`text-sm ${i < difficulty ? "text-yellow-500" : "text-zinc-700"}`}
              >
                ★
              </span>
            ))}
          </div>
        </div>
        <h1 className="text-3xl font-bold text-zinc-100">{title}</h1>
      </div>

      {/* Required concepts */}
      {requiredNodes.length > 0 && (
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-4">
          <h3 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-3">
            Prerequisites
          </h3>
          <div className="flex flex-wrap gap-2">
            {requiredNodes.map(({ node }) => (
              <a
                key={node.id}
                href={`/learn/${node.id}`}
                className="text-sm px-3 py-1.5 rounded-lg border hover:bg-zinc-800 transition-colors"
                style={{
                  borderColor: `${node.module.color}40`,
                  color: `${node.module.color}cc`,
                }}
              >
                {node.title}
                <span className="text-zinc-600 ml-1.5 text-xs">
                  ({node.module.title})
                </span>
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Statement */}
      <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
        <h2 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-4">
          Problem Statement
        </h2>
        <div className="prose prose-invert prose-sm max-w-none">
          <MarkdownRenderer content={statement} />
        </div>
      </div>

      {/* Hints */}
      {hints.length > 0 && (
        <div className="rounded-xl border border-amber-900/30 bg-amber-950/10 p-6">
          <h2 className="text-xs font-semibold text-amber-500 uppercase tracking-wider mb-4">
            Hints ({revealedHints}/{hints.length})
          </h2>
          <div className="space-y-3">
            {hints.map((hint, i) => (
              <div key={i}>
                {i < revealedHints ? (
                  <div className="text-sm text-zinc-300 pl-4 border-l-2 border-amber-800/50">
                    <MarkdownRenderer content={hint} />
                  </div>
                ) : i === revealedHints ? (
                  <button
                    onClick={() => setRevealedHints((h) => h + 1)}
                    className="text-sm px-4 py-2 rounded-lg bg-amber-900/30 text-amber-400 hover:bg-amber-900/50 transition-colors"
                  >
                    Reveal hint {i + 1}
                  </button>
                ) : (
                  <div className="text-sm text-zinc-600 italic">
                    Hint {i + 1} (reveal previous hint first)
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Solution */}
      {solution && (
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
          {showSolution ? (
            <>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xs font-semibold text-emerald-500 uppercase tracking-wider">
                  Solution
                </h2>
                <button
                  onClick={() => setShowSolution(false)}
                  className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors"
                >
                  Hide
                </button>
              </div>
              <div className="prose prose-invert prose-sm max-w-none">
                <MarkdownRenderer content={solution} />
              </div>
            </>
          ) : (
            <button
              onClick={() => setShowSolution(true)}
              className="w-full py-3 text-center text-sm font-medium text-emerald-400 hover:text-emerald-300 transition-colors"
            >
              Show Solution
            </button>
          )}
        </div>
      )}
    </div>
  );
}
