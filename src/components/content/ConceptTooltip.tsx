"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { createPortal } from "react-dom";
import glossary from "@/lib/glossary";
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

interface ConceptTooltipProps {
  term: string;
  children: React.ReactNode;
}

function InlineDefinition({ content }: { content: string }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkMath]}
      rehypePlugins={[rehypeKatex]}
      components={{
        p: ({ children }) => <span className="block">{children}</span>,
      }}
    >
      {content}
    </ReactMarkdown>
  );
}

export default function ConceptTooltip({
  term,
  children,
}: ConceptTooltipProps) {
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [pos, setPos] = useState({ top: 0, left: 0 });
  const triggerRef = useRef<HTMLSpanElement>(null);
  const hideTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const entry = glossary[term.toLowerCase()];

  useEffect(() => {
    setMounted(true);
  }, []);

  const show = useCallback(() => {
    if (hideTimeout.current) {
      clearTimeout(hideTimeout.current);
      hideTimeout.current = null;
    }
    if (triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      setPos({
        top: rect.top + window.scrollY - 8,
        left: rect.left + rect.width / 2 + window.scrollX,
      });
    }
    setVisible(true);
  }, []);

  const hide = useCallback(() => {
    hideTimeout.current = setTimeout(() => setVisible(false), 200);
  }, []);

  if (!entry) {
    return <>{children}</>;
  }

  const tooltip =
    mounted && visible
      ? createPortal(
          <div
            className="z-50 w-80 p-3 bg-zinc-800 border border-zinc-700 rounded-lg shadow-xl"
            style={{
              position: "absolute",
              top: pos.top,
              left: pos.left,
              transform: "translate(-50%, -100%)",
            }}
            onMouseEnter={show}
            onMouseLeave={hide}
          >
            <div className="text-xs font-bold text-blue-400 mb-1">
              {entry.term}
            </div>
            <div className="text-xs text-zinc-300 leading-relaxed prose prose-invert prose-sm max-w-none">
              <InlineDefinition content={entry.definition} />
            </div>
            <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-px border-4 border-transparent border-t-zinc-700" />
          </div>,
          document.body
        )
      : null;

  return (
    <span
      ref={triggerRef}
      className="relative inline"
      onMouseEnter={show}
      onMouseLeave={hide}
      onClick={() => setVisible((v) => !v)}
    >
      <span className="border-b border-dotted border-zinc-500 text-blue-400 cursor-help">
        {children}
      </span>
      {tooltip}
    </span>
  );
}
