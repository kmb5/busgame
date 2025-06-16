import { useGameStore } from "../store/gameStore";

export const ActionButtons = () => {
  const guess = useGameStore((s) => s.guess);
  const isTransitioning = false;
  return (
    <div className="flex justify-center gap-6 mt-8">
      <button
        className="w-[min(12vw,60px)] h-[min(12vw,60px)] bg-white rounded-lg shadow-lg border border-gray-200 flex items-center justify-center text-2xl font-bold transition hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Up"
        onClick={() => guess("up")}
        disabled={isTransitioning}
      >
        ▲
      </button>
      <button
        className="w-[min(12vw,60px)] h-[min(12vw,60px)] bg-white rounded-lg shadow-lg border border-gray-200 flex items-center justify-center text-2xl font-bold transition hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Equal"
        onClick={() => guess("equal")}
        disabled={isTransitioning}
      >
        =
      </button>
      <button
        className="w-[min(12vw,60px)] h-[min(12vw,60px)] bg-white rounded-lg shadow-lg border border-gray-200 flex items-center justify-center text-2xl font-bold transition hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Down"
        onClick={() => guess("down")}
        disabled={isTransitioning}
      >
        ▼
      </button>
    </div>
  );
};
