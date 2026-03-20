"use client";

import { useEffect, useState, useCallback } from "react";
import ModuleGraph from "@/components/graph/ModuleGraph";
import ConceptGraph from "@/components/graph/ConceptGraph";
import LoginButton from "@/components/auth/LoginButton";
import type {
  MathModule,
  ModuleEdge,
  ConceptNode,
  ConceptEdge,
  CrossModuleEdge,
  CrossEdgeWithNodes,
} from "@/types/graph";

interface ModuleWithCount extends MathModule {
  _count?: { nodes: number };
}

interface ModuleDetail {
  module: MathModule;
  nodes: ConceptNode[];
  edges: ConceptEdge[];
  crossEdges: CrossEdgeWithNodes[];
}

export default function Home() {
  const [modules, setModules] = useState<ModuleWithCount[]>([]);
  const [moduleEdges, setModuleEdges] = useState<ModuleEdge[]>([]);
  const [activeModule, setActiveModule] = useState<ModuleDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [totalXp, setTotalXp] = useState(0);

  useEffect(() => {
    fetch("/api/modules")
      .then((r) => r.json())
      .then((data) => {
        setModules(data.modules);
        setModuleEdges(data.moduleEdges);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch modules:", err);
        setLoading(false);
      });
  }, []);

  const openModule = useCallback(async (moduleId: string) => {
    const res = await fetch(`/api/modules/${moduleId}`);
    const data = await res.json();
    setActiveModule(data);
    const xp = data.nodes.reduce(
      (sum: number, n: ConceptNode) => sum + n.xp,
      0
    );
    setTotalXp(xp);
  }, []);

  const goBack = useCallback(() => {
    setActiveModule(null);
  }, []);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl font-bold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-2">
            MathGraph
          </div>
          <div className="text-zinc-500 text-sm">Loading the universe...</div>
        </div>
      </div>
    );
  }

  // Module grid view — no top bar (grid has its own header)
  if (!activeModule) {
    return (
      <div className="h-screen overflow-hidden flex flex-col bg-zinc-950">
        {/* Slim top bar for navigation links */}
        <header className="h-12 border-b border-zinc-800/50 flex items-center justify-end px-6 shrink-0 bg-zinc-950/80 backdrop-blur-sm z-50">
          <div className="flex items-center gap-3">
            <LoginButton />
            <a
              href="/dashboard"
              className="text-xs px-3 py-1.5 rounded-lg bg-zinc-800 border border-zinc-700 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-700 transition-colors"
            >
              My Progress
            </a>
            <a
              href="/projects"
              className="text-xs px-3 py-1.5 rounded-lg bg-zinc-800 border border-zinc-700 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-700 transition-colors"
            >
              Projects
            </a>
            <a
              href="/about"
              className="text-xs px-3 py-1.5 rounded-lg bg-zinc-800 border border-zinc-700 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-700 transition-colors"
            >
              About
            </a>
            <a
              href="/admin"
              className="text-xs px-3 py-1.5 rounded-lg bg-zinc-800 border border-zinc-700 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-700 transition-colors"
            >
              Admin
            </a>
          </div>
        </header>
        <main className="flex-1 overflow-hidden">
          <ModuleGraph
            modules={modules}
            moduleEdges={moduleEdges}
            onModuleClick={openModule}
          />
        </main>
      </div>
    );
  }

  // Concept graph view — full header with breadcrumb
  return (
    <div className="h-screen flex flex-col">
      <header className="h-14 border-b border-zinc-800 flex items-center justify-between px-6 shrink-0 bg-zinc-950/80 backdrop-blur-sm z-50">
        <div className="flex items-center gap-3">
          <button
            onClick={goBack}
            className="text-lg font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent hover:from-indigo-300 hover:to-purple-300 transition-all cursor-pointer"
          >
            MathGraph
          </button>
          <span className="text-zinc-700">/</span>
          <span
            className="text-sm font-medium"
            style={{ color: activeModule.module.color }}
          >
            {activeModule.module.title}
          </span>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-sm text-zinc-400">
            <span className="font-mono text-indigo-400">{totalXp}</span> XP
          </div>
          <LoginButton />
          <a
            href="/projects"
            className="text-xs px-3 py-1.5 rounded-lg bg-zinc-800 border border-zinc-700 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-700 transition-colors"
          >
            Projects
          </a>
          <a
            href="/admin"
            className="text-xs px-3 py-1.5 rounded-lg bg-zinc-800 border border-zinc-700 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-700 transition-colors"
          >
            Admin
          </a>
        </div>
      </header>

      <main className="flex-1 relative">
        <ConceptGraph
          moduleId={activeModule.module.id}
          moduleColor={activeModule.module.color}
          moduleTitle={activeModule.module.title}
          conceptNodes={activeModule.nodes}
          conceptEdges={activeModule.edges}
          crossEdges={activeModule.crossEdges}
          onBack={goBack}
          onNavigateModule={openModule}
        />
      </main>
    </div>
  );
}
