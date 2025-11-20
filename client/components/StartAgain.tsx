import { RotateCcw } from "lucide-react";

interface StartAgainProps {
  onRestart: () => void;
}

export default function StartAgain({ onRestart }: StartAgainProps) {
  return (
    <div className="flex justify-center mt-6">
      <button
        onClick={onRestart}
        className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white px-8 py-3 rounded-full font-bold flex items-center gap-3 shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
      >
        <RotateCcw className="w-5 h-5" />
        Start Again
      </button>
    </div>
  );
}
