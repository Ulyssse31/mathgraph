"use client";

import { useState, useEffect } from "react";
import type { ExerciseData } from "@/types/content";
import MarkdownRenderer from "./MarkdownRenderer";

interface ExerciseCardProps {
  exercise: ExerciseData;
  onXpGain?: (xp: number) => void;
  initialCompleted?: boolean;
  initialHintsUsed?: number;
}

const difficultyStars = (d: number) =>
  Array.from({ length: 5 }, (_, i) => (i < d ? "\u2605" : "\u2606")).join("");

const difficultyColor = (d: number) => {
  if (d <= 1) return "text-emerald-400";
  if (d <= 2) return "text-blue-400";
  if (d <= 3) return "text-amber-400";
  if (d <= 4) return "text-orange-400";
  return "text-red-400";
};

function saveAttempt(exerciseId: string, completed: boolean, hintsUsed: number, score: number) {
  fetch(`/api/exercises/${exerciseId}/attempt`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ completed, hintsUsed, score }),
  }).catch(() => {
    // Silently fail for unauthenticated users
  });
}

export default function ExerciseCard({
  exercise,
  onXpGain,
  initialCompleted = false,
  initialHintsUsed = 0,
}: ExerciseCardProps) {
  const [revealedHints, setRevealedHints] = useState(initialHintsUsed);
  const [showSolution, setShowSolution] = useState(false);
  const [userAnswer, setUserAnswer] = useState("");
  const [answerStatus, setAnswerStatus] = useState<null | "correct" | "incorrect">(
    initialCompleted ? "correct" : null
  );
  const [selectedChoices, setSelectedChoices] = useState<Set<number>>(new Set());
  const [qcmChecked, setQcmChecked] = useState(initialCompleted);
  const [xpAwarded, setXpAwarded] = useState(initialCompleted);

  const awardXp = (amount: number) => {
    if (!xpAwarded) {
      setXpAwarded(true);
      onXpGain?.(amount);
    }
  };

  const checkComputational = () => {
    const normalize = (s: string) =>
      s.toLowerCase().replace(/\s+/g, "").replace(/,/g, ", ");
    if (normalize(userAnswer) === normalize(exercise.answer)) {
      setAnswerStatus("correct");
      const xp = revealedHints > 0 ? 5 : 10;
      awardXp(xp);
      saveAttempt(exercise.id, true, revealedHints, xp);
    } else {
      setAnswerStatus("incorrect");
      saveAttempt(exercise.id, false, revealedHints, 0);
    }
  };

  const checkQcm = () => {
    setQcmChecked(true);
    const choices = exercise.choices;
    const correctSet = new Set(
      choices.map((c, i) => (c.correct ? i : -1)).filter((i) => i >= 0)
    );
    const isCorrect =
      selectedChoices.size === correctSet.size &&
      [...selectedChoices].every((i) => correctSet.has(i));
    if (isCorrect) {
      setAnswerStatus("correct");
      awardXp(5);
      saveAttempt(exercise.id, true, revealedHints, 5);
    } else {
      setAnswerStatus("incorrect");
      saveAttempt(exercise.id, false, revealedHints, 0);
    }
  };

  const revealHint = () => {
    if (revealedHints < exercise.hints.length) {
      setRevealedHints((h) => h + 1);
    }
  };

  const revealSolution = () => {
    setShowSolution(true);
    if (exercise.type === "proof") {
      awardXp(5);
      saveAttempt(exercise.id, true, revealedHints, 5);
    } else {
      awardXp(2);
      saveAttempt(exercise.id, true, revealedHints, 2);
    }
  };

  return (
    <div
      className={`rounded-xl border p-5 my-3 ${
        answerStatus === "correct"
          ? "bg-emerald-950/20 border-emerald-800/40"
          : "bg-zinc-900 border-zinc-800"
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <h4 className="font-semibold text-zinc-200 text-sm">
            {exercise.title}
          </h4>
          {answerStatus === "correct" && (
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-600/20 text-emerald-400 font-medium">
              Completed
            </span>
          )}
        </div>
        <span className={`text-xs font-mono ${difficultyColor(exercise.difficulty)}`}>
          {difficultyStars(exercise.difficulty)}
        </span>
      </div>

      {/* Type badge */}
      <span className="text-[10px] uppercase tracking-wider text-zinc-500 font-medium">
        {exercise.type === "computational"
          ? "Calcul"
          : exercise.type === "qcm"
          ? "QCM"
          : "Raisonnement"}
      </span>

      {/* Statement */}
      <div className="mt-3">
        <MarkdownRenderer content={exercise.statement} />
      </div>

      {/* QCM choices */}
      {exercise.type === "qcm" && (
        <div className="mt-4 space-y-2">
          {exercise.choices.map((choice, i) => {
            let bg = "bg-zinc-800 hover:bg-zinc-700";
            if (qcmChecked) {
              if (choice.correct) bg = "bg-emerald-900/40 border-emerald-600";
              else if (selectedChoices.has(i))
                bg = "bg-red-900/40 border-red-600";
            } else if (selectedChoices.has(i)) {
              bg = "bg-indigo-900/40 border-indigo-500";
            }
            return (
              <button
                key={i}
                onClick={() => {
                  if (qcmChecked) return;
                  setSelectedChoices((prev) => {
                    const next = new Set(prev);
                    if (next.has(i)) next.delete(i);
                    else next.add(i);
                    return next;
                  });
                }}
                className={`w-full text-left px-4 py-2 rounded-lg border border-zinc-700 text-sm text-zinc-300 transition-colors ${bg}`}
              >
                <span className="font-mono text-zinc-500 mr-2">
                  {String.fromCharCode(65 + i)})
                </span>
                <MarkdownRenderer content={choice.text} className="inline" />
              </button>
            );
          })}
          {!qcmChecked && selectedChoices.size > 0 && (
            <button
              onClick={checkQcm}
              className="mt-2 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium"
            >
              Verifier
            </button>
          )}
        </div>
      )}

      {/* Computational answer */}
      {exercise.type === "computational" && exercise.answer && answerStatus !== "correct" && (
        <div className="mt-4 flex gap-2">
          <input
            value={userAnswer}
            onChange={(e) => {
              setUserAnswer(e.target.value);
              setAnswerStatus(null);
            }}
            placeholder="Votre reponse..."
            className="flex-1 px-3 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-zinc-200 text-sm"
            onKeyDown={(e) => e.key === "Enter" && checkComputational()}
          />
          <button
            onClick={checkComputational}
            className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium"
          >
            Verifier
          </button>
        </div>
      )}

      {/* Answer feedback */}
      {answerStatus && !initialCompleted && (
        <div
          className={`mt-2 text-sm font-medium ${
            answerStatus === "correct" ? "text-emerald-400" : "text-red-400"
          }`}
        >
          {answerStatus === "correct"
            ? "Correct ! Bien joue."
            : "Incorrect. Reessayez ou consultez un indice."}
        </div>
      )}

      {/* Hints */}
      {exercise.hints.length > 0 && (
        <div className="mt-4">
          {Array.from({ length: revealedHints }).map((_, i) => (
            <div
              key={i}
              className="mt-2 p-3 rounded-lg bg-amber-900/20 border border-amber-800/30"
            >
              <span className="text-xs text-amber-400 font-medium">
                Indice {i + 1}
              </span>
              <MarkdownRenderer content={exercise.hints[i]} />
            </div>
          ))}
          {revealedHints < exercise.hints.length && (
            <button
              onClick={revealHint}
              className="mt-2 text-xs text-amber-400 hover:text-amber-300"
            >
              Montrer l&apos;indice {revealedHints + 1}/{exercise.hints.length}
            </button>
          )}
        </div>
      )}

      {/* Solution */}
      {exercise.solution && (
        <div className="mt-4">
          {showSolution ? (
            <div className="p-4 rounded-lg bg-zinc-800/50 border border-zinc-700">
              <span className="text-xs text-zinc-400 font-medium block mb-2">
                Solution
              </span>
              <MarkdownRenderer content={exercise.solution} />
            </div>
          ) : (
            <button
              onClick={revealSolution}
              className="text-xs text-zinc-500 hover:text-zinc-400"
            >
              Voir la solution
            </button>
          )}
        </div>
      )}
    </div>
  );
}
