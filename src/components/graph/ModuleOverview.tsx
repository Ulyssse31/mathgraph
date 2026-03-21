"use client";

import { useState } from "react";

interface BibEntry {
  title: string;
  author: string;
  level: string;
}

interface ModuleOverviewProps {
  title: string;
  code: string;
  description: string;
  motivation: string;
  bibliography: string;
  color: string;
}

const levelLabels: Record<string, string> = {
  intro: "Introduction",
  intermediate: "Intermédiaire",
  advanced: "Avancé",
  reference: "Référence",
};

export default function ModuleOverview({
  title,
  code,
  description,
  motivation,
  bibliography,
  color,
}: ModuleOverviewProps) {
  const [open, setOpen] = useState(false);

  let bibEntries: BibEntry[] = [];
  try {
    bibEntries = JSON.parse(bibliography || "[]");
  } catch {
    bibEntries = [];
  }

  const hasContent = motivation || bibEntries.length > 0;
  if (!hasContent) return null;

  return (
    <div className="absolute top-4 right-4 z-40">
      <button
        onClick={() => setOpen(!open)}
        className="w-9 h-9 rounded-lg bg-zinc-800/90 border border-zinc-700 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-700 transition-colors flex items-center justify-center text-sm font-medium backdrop-blur-sm cursor-pointer"
        title="À propos de ce module"
        aria-label="Module info"
        aria-expanded={open}
      >
        ℹ
      </button>

      {open && (
        <div className="absolute top-11 right-0 w-96 max-h-[70vh] overflow-y-auto rounded-xl bg-zinc-900/95 border border-zinc-700 shadow-2xl backdrop-blur-md p-5 space-y-4">
          {/* Header */}
          <div>
            <span
              className="text-[10px] font-mono px-2 py-0.5 rounded-full"
              style={{ backgroundColor: `${color}20`, color }}
            >
              {code}
            </span>
            <h3 className="text-lg font-bold text-zinc-100 mt-2">{title}</h3>
            <p className="text-sm text-zinc-400 mt-1">{description}</p>
          </div>

          {/* Motivation */}
          {motivation && (
            <div>
              <h4 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">
                Motivation
              </h4>
              <p className="text-sm text-zinc-300 leading-relaxed whitespace-pre-line">
                {motivation}
              </p>
            </div>
          )}

          {/* Bibliography */}
          {bibEntries.length > 0 && (
            <div>
              <h4 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">
                Bibliographie
              </h4>
              <div className="space-y-2">
                {bibEntries.map((b, i) => (
                  <div
                    key={i}
                    className="px-3 py-2 rounded-lg bg-zinc-800/60 border border-zinc-700/50"
                  >
                    <div className="text-sm font-medium text-zinc-200">
                      {b.title}
                    </div>
                    <div className="text-xs text-zinc-500 mt-0.5">
                      {b.author}
                      {b.level && (
                        <span className="ml-2 text-zinc-600">
                          · {levelLabels[b.level] || b.level}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <button
            onClick={() => setOpen(false)}
            className="w-full text-center text-xs text-zinc-500 hover:text-zinc-300 transition-colors cursor-pointer py-1"
          >
            Fermer
          </button>
        </div>
      )}
    </div>
  );
}
