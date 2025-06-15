import { useCardStore } from '../store/cardStore';

export const ActionButtons = () => {
  const guess = useCardStore((s) => s.guess);
  return (
    <div className="flex justify-center gap-6 mt-8">
      <button
        className="w-[min(12vw,60px)] h-[min(12vw,60px)] bg-white rounded-lg shadow-lg border border-gray-200 flex items-center justify-center text-2xl font-bold transition hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
        aria-label="Up"
        onClick={() => guess('up')}
      >
        ▲
      </button>
      <button
        className="w-[min(12vw,60px)] h-[min(12vw,60px)] bg-white rounded-lg shadow-lg border border-gray-200 flex items-center justify-center text-2xl font-bold transition hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
        aria-label="Equal"
        onClick={() => guess('equal')}
      >
        =
      </button>
      <button
        className="w-[min(12vw,60px)] h-[min(12vw,60px)] bg-white rounded-lg shadow-lg border border-gray-200 flex items-center justify-center text-2xl font-bold transition hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
        aria-label="Down"
        onClick={() => guess('down')}
      >
        ▼
      </button>
    </div>
  );
}; 
