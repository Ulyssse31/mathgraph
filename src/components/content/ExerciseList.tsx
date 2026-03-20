"use client";

import type { ExerciseData } from "@/types/content";
import ExerciseCard from "./ExerciseCard";

interface AttemptState {
  completed: boolean;
  hintsUsed: number;
}

interface ExerciseListProps {
  exercises: ExerciseData[];
  onXpGain?: (xp: number) => void;
  attempts?: Record<string, AttemptState>;
}

export default function ExerciseList({ exercises, onXpGain, attempts }: ExerciseListProps) {
  const sorted = [...exercises].sort((a, b) => a.orderIndex - b.orderIndex || a.difficulty - b.difficulty);

  if (sorted.length === 0) {
    return (
      <div className="text-zinc-500 text-sm py-4 text-center">
        No exercises yet.
      </div>
    );
  }

  const completedCount = sorted.filter((ex) => attempts?.[ex.id]?.completed).length;

  return (
    <div>
      {attempts && completedCount > 0 && (
        <div className="mb-3 text-xs text-zinc-500">
          {completedCount}/{sorted.length} completed
        </div>
      )}
      <div className="space-y-3">
        {sorted.map((ex) => (
          <ExerciseCard
            key={ex.id}
            exercise={ex}
            onXpGain={onXpGain}
            initialCompleted={attempts?.[ex.id]?.completed}
            initialHintsUsed={attempts?.[ex.id]?.hintsUsed}
          />
        ))}
      </div>
    </div>
  );
}
