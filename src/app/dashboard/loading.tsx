export default function DashboardLoading() {
  return (
    <div className="min-h-screen bg-zinc-950 px-4 py-8">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header skeleton */}
        <div className="h-8 w-48 bg-zinc-800 rounded-lg animate-pulse" />

        {/* Stats row skeleton */}
        <div className="grid grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-20 bg-zinc-800/30 rounded-xl animate-pulse border border-zinc-800/40"
            />
          ))}
        </div>

        {/* List skeleton */}
        <div className="space-y-3 pt-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="h-16 bg-zinc-800/20 rounded-xl animate-pulse border border-zinc-800/30"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
