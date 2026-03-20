"use client";

import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import remarkGfm from "remark-gfm";
import rehypeKatex from "rehype-katex";
import rehypeRaw from "rehype-raw";
import "katex/dist/katex.min.css";
import ConceptTooltip from "./ConceptTooltip";
import DesmosEmbed from "./DesmosEmbed";

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

function preprocessGlossary(content: string): string {
  return content.replace(
    /\[\[([^\]]+)\]\]/g,
    '<glossary data-term="$1">$1</glossary>'
  );
}

function getYouTubeId(url: string): string | null {
  const match = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
  );
  return match ? match[1] : null;
}

function getVimeoId(url: string): string | null {
  const match = url.match(/vimeo\.com\/(\d+)/);
  return match ? match[1] : null;
}

function preprocessEmbeds(content: string): string {
  // ::video[url]
  content = content.replace(/::video\[([^\]]+)\]/g, (_match, url: string) => {
    const ytId = getYouTubeId(url);
    if (ytId) {
      return `<div class="embed-video"><iframe src="https://www.youtube.com/embed/${ytId}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>`;
    }
    const vimeoId = getVimeoId(url);
    if (vimeoId) {
      return `<div class="embed-video"><iframe src="https://player.vimeo.com/video/${vimeoId}" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe></div>`;
    }
    return `<div class="embed-video"><iframe src="${url}" frameborder="0" allowfullscreen></iframe></div>`;
  });

  // ::desmos[url or expression]
  content = content.replace(/::desmos\[([^\]]+)\]/g, (_match, val: string) => {
    // If it looks like a Desmos URL, extract the calculator ID
    const desmosMatch = val.match(/desmos\.com\/calculator\/([a-zA-Z0-9]+)/);
    if (desmosMatch) {
      return `<div class="embed-desmos"><iframe src="https://www.desmos.com/calculator/${desmosMatch[1]}?embed" frameborder="0" allowfullscreen></iframe></div>`;
    }
    // Otherwise treat as a full URL or expression
    if (val.startsWith("http")) {
      return `<div class="embed-desmos"><iframe src="${val}" frameborder="0" allowfullscreen></iframe></div>`;
    }
    // If it's an expression, use our custom component via a tag
    return `<desmos data-expr="${val}"></desmos>`;
  });

  // ::geogebra[id]
  content = content.replace(/::geogebra\[([^\]]+)\]/g, (_match, id: string) => {
    return `<div class="embed-geogebra"><iframe src="https://www.geogebra.org/material/iframe/id/${id}/width/800/height/500/border/888888/sfsb/true/smb/false/stb/false/stbh/false/ai/false/asb/false/sri/false/rc/false/ld/false/sdz/false/ctl/false" frameborder="0" allowfullscreen></iframe></div>`;
  });

  return content;
}

export default function MarkdownRenderer({
  content,
  className = "",
}: MarkdownRendererProps) {
  const processed = preprocessEmbeds(preprocessGlossary(content));

  return (
    <div className={`prose prose-invert prose-sm max-w-none ${className}`}>
      <style jsx global>{`
        .embed-video, .embed-desmos, .embed-geogebra {
          position: relative;
          width: 100%;
          padding-bottom: 56.25%;
          margin: 1rem 0;
          border-radius: 0.75rem;
          overflow: hidden;
          background: #18181b;
        }
        .embed-desmos, .embed-geogebra {
          padding-bottom: 62.5%;
        }
        .embed-video iframe, .embed-desmos iframe, .embed-geogebra iframe {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          border: none;
        }
      `}</style>
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkMath]}
        rehypePlugins={[rehypeKatex, rehypeRaw]}
        components={{
          p: ({ node, ...props }: any) => <div className="mb-4" {...props} />,
          // @ts-expect-error - Custom glossary component mapped to HTML
          glossary: ({ node, ...props }: any) => {
            const term = props["data-term"] || "";
            return (
              <ConceptTooltip term={term}>
                {props.children}
              </ConceptTooltip>
            );
          },
          desmos: ({ node, ...props }: any) => {
            return <DesmosEmbed expression={props["data-expr"]} />;
          },
        }}
      >
        {processed}
      </ReactMarkdown>
    </div>
  );
}
