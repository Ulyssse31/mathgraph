export default function LearnLoading() {
  return (
    <div className="min-h-screen bg-zinc-950 px-4 py-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Back button skeleton */}
        <div className="h-8 w-32 bg-zinc-800 rounded-lg animate-pulse" />

        {/* Title skeleton */}
        <div className="space-y-3">
          <div className="h-4 w-24 bg-zinc-800/60 rounded animate-pulse" />
          <div className="h-8 w-80 bg-zinc-800 rounded-lg animate-pulse" />
          <div className="h-4 w-96 bg-zinc-800/40 rounded animate-pulse" />
        </div>

        {/* Content skeleton */}
        <div className="space-y-4 pt-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="h-4 bg-zinc-800/30 rounded animate-pulse"
              style={{ width: `${85 - i * 8}%` }}
            />
          ))}
        </div>

        {/* Section cards skeleton */}
        <div className="grid gap-4 pt-6">
          {[1, 2].map((i) => (
            <div
              key={i}
              className="h-32 bg-zinc-800/20 rounded-xl animate-pulse border border-zinc-800/40"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
