"use client";

import type { LessonSection } from "@/types/content";
import SectionBlock from "./SectionBlock";

interface LessonViewerProps {
  sections: LessonSection[];
}

export default function LessonViewer({ sections }: LessonViewerProps) {
  if (sections.length === 0) {
    return (
      <div className="text-zinc-500 text-sm py-8 text-center">
        No lesson content yet.
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {sections.map((section, i) => (
        <SectionBlock
          key={i}
          id={`section-${i}`}
          sectionIndex={i}
          type={section.type}
          title={section.title}
          content={section.content}
          commentary={section.commentary}
          steps={section.steps}
          starred={section.starred}
          collapsed={section.collapsed}
          exercise={section.exercise}
        />
      ))}
    </div>
  );
}
