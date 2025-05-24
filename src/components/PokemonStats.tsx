export default function PokemonStats({ stats }: { stats: { name: string; value: number }[] }) {
  const maxStat = Math.max(...stats.map(s => s.value), 100);

  return (
    <div className="bg-gray-100 rounded-lg p-4 mt-6">
      <div className="grid grid-cols-6 gap-2">
        {stats.map(stat => (
          <div key={stat.name} className="flex flex-col items-center">
            <span className="text-xs text-gray-500">{stat.name}</span>
            <div className="w-8 h-24 bg-gray-300 rounded flex items-end">
              <div
                className="bg-blue-400 rounded-b"
                style={{ height: `${(stat.value / maxStat) * 100}%`, width: "100%" }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 