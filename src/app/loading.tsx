export default function GlobalLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-950">
      <div className="space-y-4 w-full max-w-md px-4">
        <div className="h-8 w-48 bg-zinc-800 rounded-lg animate-pulse mx-auto" />
        <div className="h-4 w-64 bg-zinc-800/60 rounded animate-pulse mx-auto" />
        <div className="grid grid-cols-2 gap-3 pt-6">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="h-24 bg-zinc-800/40 rounded-xl animate-pulse"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
