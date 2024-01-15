export default function Home() {
  return (
    <div className="space-y-10">
      <h1>Home</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="w-full h-20 rounded-lg bg-zinc-600 animate-pulse"
          />
        ))}
      </div>
    </div>
  )
}
