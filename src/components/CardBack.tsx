import CardBack from '../assets/cardBack.svg';

export function CardBackWrapper() {
  return (
    <div className="absolute inset-0 w-full h-full rounded-lg overflow-hidden">
      <img src={CardBack} className="w-full h-full" alt="Card Back" />
    </div>
  );
}
