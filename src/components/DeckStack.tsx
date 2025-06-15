interface DeckStackProps {
  count: number;
}

export const DeckStack = ({ count }: DeckStackProps) => {
  // Limit the number of visible cards for performance/clarity
  const visible = Math.min(count, 12);
  // Calculate the offset per card
  const offset = 3; // px

  return (
    <div className="relative w-[min(20vw,120px)] h-[min(28vw,168px)] mr-6 flex items-center justify-center select-none">
      {[...Array(visible)].map((_, i) => (
        <div
          key={i}
          className="absolute"
          style={{
            top: `${-i * offset}px`,
            left: `${-i * offset}px`,
            zIndex: i,
            width: '100%',
            height: '100%',
          }}
        >
          <div className="relative w-full h-full">
            <div className="absolute inset-0 w-full h-full bg-blue-600 rounded-lg shadow-lg border border-gray-200 overflow-hidden">
              <svg
                className="absolute inset-0 w-full h-full"
                viewBox="0 0 100 140"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="100" height="140" rx="12" fill="#2563eb" />
                <pattern id={`pattern${i}`} patternUnits="userSpaceOnUse" width="20" height="20">
                  <circle cx="10" cy="10" r="6" fill="#fff" fillOpacity="0.25" />
                </pattern>
                <rect width="100" height="140" rx="12" fill={`url(#pattern${i})`} />
              </svg>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}; 
