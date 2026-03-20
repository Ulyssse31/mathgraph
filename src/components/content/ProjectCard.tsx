"use client";

import Link from "next/link";

interface ProjectCardProps {
  id: string;
  title: string;
  description: string;
  difficulty: number;
  module?: { id: string; title: string; color: string } | null;
  requiredNodes: {
    node: {
      id: string;
      title: string;
      module: { id: string; title: string; color: string };
    };
  }[];
}

export default function ProjectCard({
  id,
  title,
  description,
  difficulty,
  module,
  requiredNodes,
}: ProjectCardProps) {
  return (
    <Link
      href={`/projects/${id}`}
      className="block rounded-xl border border-zinc-800 bg-zinc-900 hover:bg-zinc-800/80 transition-all hover:border-zinc-700 p-5"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-lg font-bold text-zinc-100">{title}</h3>
        <div className="flex gap-0.5 shrink-0 ml-3">
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

      {/* Description */}
      <p className="text-sm text-zinc-400 mb-4 line-clamp-2">{description}</p>

      {/* Module badge */}
      {module && (
        <div className="mb-3">
          <span
            className="text-xs font-medium px-2 py-1 rounded-full"
            style={{
              backgroundColor: `${module.color}20`,
              color: module.color,
            }}
          >
            {module.title}
          </span>
        </div>
      )}

      {/* Required concepts */}
      {requiredNodes.length > 0 && (
        <div>
          <div className="text-xs text-zinc-600 mb-1.5">Required concepts:</div>
          <div className="flex flex-wrap gap-1.5">
            {requiredNodes.map(({ node }) => (
              <span
                key={node.id}
                className="text-xs px-2 py-0.5 rounded-full border"
                style={{
                  borderColor: `${node.module.color}40`,
                  color: `${node.module.color}cc`,
                  backgroundColor: `${node.module.color}10`,
                }}
              >
                {node.title}
              </span>
            ))}
          </div>
        </div>
      )}
    </Link>
  );
}
