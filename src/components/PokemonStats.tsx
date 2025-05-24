export default function PokemonStats({ stats }: { stats: { name: string; value: number }[] }) {
  const maxStat = Math.max(...stats.map(s => s.value), 100);

  return (
    <div className="bg-gray-100 rounded-lg p-6 mt-6">
      <h2 className="text-xl font-bold mb-4">Base Stats</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {stats.map(stat => (
          <div key={stat.name} className="flex items-center">
            <span className="w-32 text-sm font-medium text-gray-600">{stat.name}</span>
            <div className="flex-1">
              <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-500 rounded-full transition-all duration-300"
                  style={{ width: `${(stat.value / maxStat) * 100}%` }}
                />
              </div>
            </div>
            <span className="w-12 text-right text-sm font-medium text-gray-600">{stat.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
} 