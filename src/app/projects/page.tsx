"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import ProjectCard from "@/components/content/ProjectCard";

interface ProjectListItem {
  id: string;
  title: string;
  description: string;
  difficulty: number;
  module: { id: string; title: string; color: string } | null;
  requiredNodes: {
    node: {
      id: string;
      title: string;
      module: { id: string; title: string; color: string };
    };
  }[];
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<ProjectListItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/projects")
      .then((r) => r.json())
      .then((data) => {
        setProjects(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch projects:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-zinc-500 text-sm">Loading projects...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950">
      {/* Header */}
      <header className="h-14 border-b border-zinc-800 flex items-center justify-between px-6 bg-zinc-950/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="text-lg font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent hover:from-indigo-300 hover:to-purple-300 transition-all"
          >
            MathGraph
          </Link>
          <span className="text-zinc-600 text-sm">/ Projects</span>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-5xl mx-auto px-6 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-zinc-100 mb-2">Projects</h1>
          <p className="text-zinc-400">
            Hard, multi-concept problems inspired by X-ENS competitive exams.
            Each project spans multiple modules and requires deep understanding.
          </p>
        </div>

        {projects.length === 0 ? (
          <div className="text-center py-20 text-zinc-600">
            No projects yet. Check back soon!
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {projects.map((p) => (
              <ProjectCard
                key={p.id}
                id={p.id}
                title={p.title}
                description={p.description}
                difficulty={p.difficulty}
                module={p.module}
                requiredNodes={p.requiredNodes}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
