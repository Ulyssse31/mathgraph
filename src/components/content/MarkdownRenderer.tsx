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

  // ::mp4[url] — native HTML5 video
  content = content.replace(/::mp4\[([^\]]+)\]/g, (_match, url: string) => {
    return `<div class="embed-mp4"><video src="${url}" controls preload="metadata"></video></div>`;
  });

  // ::desmos[url or expression]
  content = content.replace(/::desmos\[([^\]]+)\]/g, (_match, val: string) => {
    const desmosMatch = val.match(/desmos\.com\/calculator\/([a-zA-Z0-9]+)/);
    if (desmosMatch) {
      return `<div class="embed-desmos"><iframe src="https://www.desmos.com/calculator/${desmosMatch[1]}?embed" frameborder="0" allowfullscreen></iframe></div>`;
    }
    if (val.startsWith("http")) {
      return `<div class="embed-desmos"><iframe src="${val}" frameborder="0" allowfullscreen></iframe></div>`;
    }
    return `<desmos data-expr="${val}"></desmos>`;
  });

  // ::geogebra[id]
  content = content.replace(/::geogebra\[([^\]]+)\]/g, (_match, id: string) => {
    return `<div class="embed-geogebra"><iframe src="https://www.geogebra.org/material/iframe/id/${id}/width/800/height/500/border/888888/sfsb/true/smb/false/stb/false/stbh/false/ai/false/asb/false/sri/false/rc/false/ld/false/sdz/false/ctl/false" frameborder="0" allowfullscreen></iframe></div>`;
  });

  // ::three[url] — 3D model viewer (glb/gltf via model-viewer, or iframe for hosted scenes)
  content = content.replace(/::three\[([^\]]+)\]/g, (_match, url: string) => {
    if (url.endsWith(".glb") || url.endsWith(".gltf")) {
      return `<div class="embed-three"><model-viewer src="${url}" auto-rotate camera-controls shadow-intensity="1" style="width:100%;height:100%"></model-viewer></div>`;
    }
    return `<div class="embed-three"><iframe src="${url}" frameborder="0" allowfullscreen></iframe></div>`;
  });

  // ::iframe[url] — generic iframe embed
  content = content.replace(/::iframe\[([^\]]+)\]/g, (_match, url: string) => {
    return `<div class="embed-iframe"><iframe src="${url}" frameborder="0" allowfullscreen sandbox="allow-scripts allow-same-origin allow-popups"></iframe></div>`;
  });

  return content;
}

export default function MarkdownRenderer({
  content,
  className = "",
}: MarkdownRendererProps) {
  const processed = preprocessEmbeds(preprocessGlossary(content));

  return (
    <div className={`prose dark:prose-invert prose-sm max-w-none ${className}`}>
      <style jsx global>{`
        .embed-video, .embed-desmos, .embed-geogebra, .embed-three, .embed-iframe {
          position: relative;
          width: 100%;
          padding-bottom: 56.25%;
          margin: 1rem 0;
          border-radius: 0.75rem;
          overflow: hidden;
          background: var(--card);
        }
        .embed-desmos, .embed-geogebra {
          padding-bottom: 62.5%;
        }
        .embed-three {
          padding-bottom: 75%;
        }
        .embed-video iframe, .embed-desmos iframe, .embed-geogebra iframe,
        .embed-three iframe, .embed-three model-viewer,
        .embed-iframe iframe {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          border: none;
        }
        .embed-mp4 {
          margin: 1rem 0;
          border-radius: 0.75rem;
          overflow: hidden;
          background: var(--card);
        }
        .embed-mp4 video {
          width: 100%;
          display: block;
          border-radius: 0.75rem;
        }
        .prose img {
          border-radius: 0.75rem;
          margin: 1rem auto;
          max-width: 100%;
          height: auto;
        }
      `}</style>
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkMath]}
        rehypePlugins={[rehypeKatex, rehypeRaw]}
        components={{
          p: ({ node, ...props }: any) => <div className="mb-4" {...props} />,
          img: ({ node, ...props }: any) => (
            <figure className="my-4">
              <img
                {...props}
                className="rounded-xl max-w-full mx-auto"
                loading="lazy"
              />
              {props.alt && props.alt !== "" && (
                <figcaption className="text-center text-xs text-zinc-500 mt-2 italic">
                  {props.alt}
                </figcaption>
              )}
            </figure>
          ),
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
