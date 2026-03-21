"use client";

import { useState } from "react";
import { toast } from "sonner";
import type { ExerciseData, ExerciseType } from "@/types/content";
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

const typeLabels: Record<ExerciseType, string> = {
  computational: "Calcul",
  qcm: "QCM",
  proof: "Raisonnement",
  automatism: "Automatisme",
  open_problem: "Problème ouvert",
  numerical: "Numérique",
  abstract: "Abstrait",
  true_false: "Vrai / Faux",
  fill_blank: "Compléter",
  matching: "Associer",
  construction: "Construction",
};

const typeBadgeStyles: Record<ExerciseType, string> = {
  computational: "text-blue-500 dark:text-blue-400 bg-blue-500/10",
  qcm: "text-purple-500 dark:text-purple-400 bg-purple-500/10",
  proof: "text-zinc-500 dark:text-zinc-400 bg-zinc-500/10",
  automatism: "text-amber-500 dark:text-amber-400 bg-amber-500/10",
  open_problem: "text-emerald-500 dark:text-emerald-400 bg-emerald-500/10",
  numerical: "text-cyan-500 dark:text-cyan-400 bg-cyan-500/10",
  abstract: "text-rose-500 dark:text-rose-400 bg-rose-500/10",
  true_false: "text-indigo-500 dark:text-indigo-400 bg-indigo-500/10",
  fill_blank: "text-teal-500 dark:text-teal-400 bg-teal-500/10",
  matching: "text-orange-500 dark:text-orange-400 bg-orange-500/10",
  construction: "text-violet-500 dark:text-violet-400 bg-violet-500/10",
};

// Types that show an answer input (like computational)
const inputTypes: ExerciseType[] = ["computational", "automatism", "numerical", "fill_blank"];
// Types that are open-ended (no auto-grading, like proof)
const openTypes: ExerciseType[] = ["proof", "open_problem", "abstract", "matching", "construction"];

function saveAttempt(exerciseId: string, completed: boolean, hintsUsed: number, score: number) {
  fetch(`/api/exercises/${exerciseId}/attempt`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ completed, hintsUsed, score }),
  }).catch(() => {
    toast.error("Failed to save progress. Are you logged in?");
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
    if (openTypes.includes(exercise.type)) {
      awardXp(5);
      saveAttempt(exercise.id, true, revealedHints, 5);
    } else {
      awardXp(2);
      saveAttempt(exercise.id, true, revealedHints, 2);
    }
  };

  const badgeStyle = typeBadgeStyles[exercise.type] || typeBadgeStyles.computational;

  return (
    <div
      className={`rounded-xl border p-5 my-3 ${
        answerStatus === "correct"
          ? "bg-emerald-50 dark:bg-emerald-950/20 border-emerald-300 dark:border-emerald-800/40"
          : "bg-card border-card-border"
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <h4 className="font-semibold text-foreground text-sm">
            {exercise.title}
          </h4>
          {answerStatus === "correct" && (
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-600/20 text-emerald-500 dark:text-emerald-400 font-medium">
              Completed
            </span>
          )}
        </div>
        <span className={`text-xs font-mono ${difficultyColor(exercise.difficulty)}`}>
          {difficultyStars(exercise.difficulty)}
        </span>
      </div>

      {/* Type badge */}
      <span className={`text-[10px] uppercase tracking-wider font-medium px-1.5 py-0.5 rounded ${badgeStyle}`}>
        {typeLabels[exercise.type] || exercise.type}
      </span>

      {/* Statement */}
      <div className="mt-3">
        <MarkdownRenderer content={exercise.statement} />
      </div>

      {/* QCM choices */}
      {exercise.type === "qcm" && (
        <div className="mt-4 space-y-2">
          {exercise.choices.map((choice, i) => {
            let bg = "bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700";
            if (qcmChecked) {
              if (choice.correct) bg = "bg-emerald-100 dark:bg-emerald-900/40 border-emerald-500 dark:border-emerald-600";
              else if (selectedChoices.has(i))
                bg = "bg-red-100 dark:bg-red-900/40 border-red-500 dark:border-red-600";
            } else if (selectedChoices.has(i)) {
              bg = "bg-indigo-100 dark:bg-indigo-900/40 border-indigo-500";
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
                className={`w-full text-left px-4 py-2 rounded-lg border border-zinc-200 dark:border-zinc-700 text-sm text-foreground transition-colors ${bg}`}
              >
                <span className="font-mono text-zinc-400 dark:text-zinc-500 mr-2">
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

      {/* True/False buttons */}
      {exercise.type === "true_false" && answerStatus !== "correct" && (
        <div className="mt-4 flex gap-3">
          {["Vrai", "Faux"].map((label) => {
            const val = label === "Vrai" ? "true" : "false";
            const isSelected = userAnswer === val;
            return (
              <button
                key={val}
                onClick={() => {
                  setUserAnswer(val);
                  const normalize = (s: string) => s.toLowerCase().trim();
                  if (normalize(val) === normalize(exercise.answer)) {
                    setAnswerStatus("correct");
                    awardXp(5);
                    saveAttempt(exercise.id, true, revealedHints, 5);
                  } else {
                    setAnswerStatus("incorrect");
                    saveAttempt(exercise.id, false, revealedHints, 0);
                  }
                }}
                className={`flex-1 py-2.5 rounded-lg border text-sm font-medium transition-colors ${
                  isSelected
                    ? "bg-indigo-100 dark:bg-indigo-900/40 border-indigo-500 text-indigo-700 dark:text-indigo-300"
                    : "bg-zinc-100 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 text-foreground hover:bg-zinc-200 dark:hover:bg-zinc-700"
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>
      )}

      {/* Answer input for computational-like types */}
      {inputTypes.includes(exercise.type) && exercise.answer && answerStatus !== "correct" && (
        <div className="mt-4 flex gap-2">
          <input
            value={userAnswer}
            onChange={(e) => {
              setUserAnswer(e.target.value);
              setAnswerStatus(null);
            }}
            placeholder="Votre reponse..."
            className="flex-1 px-3 py-2 rounded-lg bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-foreground text-sm"
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
            answerStatus === "correct" ? "text-emerald-500 dark:text-emerald-400" : "text-red-500 dark:text-red-400"
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
              className="mt-2 p-3 rounded-lg bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/30"
            >
              <span className="text-xs text-amber-600 dark:text-amber-400 font-medium">
                Indice {i + 1}
              </span>
              <MarkdownRenderer content={exercise.hints[i]} />
            </div>
          ))}
          {revealedHints < exercise.hints.length && (
            <button
              onClick={revealHint}
              className="mt-2 text-xs text-amber-600 dark:text-amber-400 hover:text-amber-500 dark:hover:text-amber-300"
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
            <div className="p-4 rounded-lg bg-zinc-100/50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700">
              <span className="text-xs text-zinc-500 dark:text-zinc-400 font-medium block mb-2">
                Solution
              </span>
              <MarkdownRenderer content={exercise.solution} />
            </div>
          ) : (
            <button
              onClick={revealSolution}
              className="text-xs text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-400"
            >
              Voir la solution
            </button>
          )}
        </div>
      )}
    </div>
  );
}
