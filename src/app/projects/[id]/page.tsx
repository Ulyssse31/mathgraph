"use client";

import { useEffect, useState, use } from "react";
import Link from "next/link";
import ProjectViewer from "@/components/content/ProjectViewer";

interface ProjectDetail {
  id: string;
  title: string;
  description: string;
  statement: string;
  difficulty: number;
  hints: string[];
  solution: string;
  module: { id: string; title: string; color: string } | null;
  requiredNodes: {
    node: {
      id: string;
      title: string;
      module: { id: string; title: string; color: string };
    };
  }[];
}

export default function ProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [project, setProject] = useState<ProjectDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/projects/${id}`)
      .then((r) => r.json())
      .then((data) => {
        setProject(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch project:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-zinc-500 text-sm">Loading project...</div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-950">
        <div className="text-center space-y-4">
          <div className="text-4xl">:(</div>
          <h1 className="text-xl font-bold text-zinc-100">Project not found</h1>
          <p className="text-sm text-zinc-400">
            This project doesn&apos;t exist or has been removed.
          </p>
          <div className="flex gap-3 justify-center pt-2">
            <Link
              href="/projects"
              className="px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-500 transition-colors"
            >
              All projects
            </Link>
            <Link
              href="/"
              className="px-4 py-2 rounded-lg bg-zinc-800 text-zinc-300 text-sm font-medium hover:bg-zinc-700 transition-colors"
            >
              Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950">
      {/* Header */}
      <header className="h-14 border-b border-zinc-800 flex items-center px-6 bg-zinc-950/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="text-lg font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent hover:from-indigo-300 hover:to-purple-300 transition-all"
          >
            MathGraph
          </Link>
          <span className="text-zinc-600 text-sm">/</span>
          <Link
            href="/projects"
            className="text-zinc-400 text-sm hover:text-zinc-200 transition-colors"
          >
            Projects
          </Link>
          <span className="text-zinc-600 text-sm">/</span>
          <span className="text-zinc-300 text-sm">{project.title}</span>
        </div>
      </header>

      {/* Content */}
      <main className="px-6 py-10">
        <ProjectViewer
          title={project.title}
          statement={project.statement}
          difficulty={project.difficulty}
          hints={project.hints}
          solution={project.solution}
          module={project.module}
          requiredNodes={project.requiredNodes}
        />
      </main>
    </div>
  );
}
