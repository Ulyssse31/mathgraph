"use client";

export default function DesmosEmbed({ expression }: { expression: string }) {
  // Use Desmos's embeddable calculator with the expression encoded in the hash
  // This avoids API key issues entirely
  const src = `/api/desmos?expr=${encodeURIComponent(expression)}`;

  return (
    <div className="w-full aspect-video rounded-xl overflow-hidden bg-zinc-900 my-4">
      <iframe
        src={src}
        className="w-full h-full border-0"
        title={`Desmos graph: ${expression}`}
        loading="lazy"
      />
    </div>
  );
}
