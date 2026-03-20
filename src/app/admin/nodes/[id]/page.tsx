"use client";

import { useEffect, useState, use, useRef } from "react";
import Link from "next/link";
import MarkdownRenderer from "@/components/content/MarkdownRenderer";

interface LessonSection {
  type: string;
  title: string;
  content: string;
}

interface Exercise {
  id: string;
  title: string;
  type: string;
  statement: string;
  difficulty: number;
  hints: string[];
  solution: string;
  answer: string;
  choices: { text: string; correct: boolean }[];
  orderIndex: number;
}

interface NodeInfo {
  id: string;
  title: string;
  code: string;
  moduleId: string;
  module?: { title: string };
}

interface NodeData {
  node: NodeInfo;
  lesson: { sections: LessonSection[] } | null;
  exercises: Exercise[];
}

const sectionTypes = [
  "motivation",
  "definition",
  "theorem",
  "proof",
  "example",
  "remark",
  "historique",
];

function MediaToolbar({ onInsert }: { onInsert: (text: string) => void }) {
  const [showInput, setShowInput] = useState<string | null>(null);
  const [url, setUrl] = useState("");

  const insert = (type: string) => {
    let text = "";
    switch (type) {
      case "image":
        text = `![description](${url})`;
        break;
      case "video":
        text = `\n::video[${url}]\n`;
        break;
      case "desmos":
        text = `\n::desmos[${url}]\n`;
        break;
      case "geogebra":
        text = `\n::geogebra[${url}]\n`;
        break;
      case "link":
        text = `[Link text](${url})`;
        break;
    }
    onInsert(text);
    setUrl("");
    setShowInput(null);
  };

  const buttons = [
    { key: "image", label: "Image", icon: "🖼", placeholder: "Image URL..." },
    { key: "video", label: "Video", icon: "▶", placeholder: "YouTube / Vimeo URL..." },
    { key: "desmos", label: "Desmos", icon: "📈", placeholder: "Desmos calculator URL or expression..." },
    { key: "geogebra", label: "GeoGebra", icon: "📐", placeholder: "GeoGebra material ID..." },
    { key: "link", label: "Link", icon: "🔗", placeholder: "URL..." },
  ];

  return (
    <div className="flex flex-wrap items-center gap-1 mb-1">
      {buttons.map((btn) => (
        <button
          key={btn.key}
          type="button"
          onClick={() => setShowInput(showInput === btn.key ? null : btn.key)}
          className={`px-2 py-1 rounded text-[11px] font-medium transition-colors ${
            showInput === btn.key
              ? "bg-indigo-600 text-white"
              : "bg-zinc-800 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-700"
          }`}
          title={`Insert ${btn.label}`}
        >
          {btn.icon} {btn.label}
        </button>
      ))}
      {showInput && (
        <div className="flex items-center gap-1 ml-2">
          <input
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder={buttons.find((b) => b.key === showInput)?.placeholder}
            className="px-2 py-1 rounded bg-zinc-800 border border-zinc-700 text-zinc-200 text-xs w-64"
            onKeyDown={(e) => e.key === "Enter" && url && insert(showInput)}
          />
          <button
            type="button"
            onClick={() => url && insert(showInput)}
            className="px-2 py-1 rounded bg-indigo-600 text-white text-xs"
          >
            Insert
          </button>
        </div>
      )}
    </div>
  );
}

export default function NodeEditorPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [data, setData] = useState<NodeData | null>(null);
  const [sections, setSections] = useState<LessonSection[]>([]);
  const [saving, setSaving] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [showAddExercise, setShowAddExercise] = useState(false);
  const [exerciseForm, setExerciseForm] = useState({
    title: "",
    type: "computational",
    statement: "",
    difficulty: 1,
    hints: "",
    solution: "",
    answer: "",
  });
  const textareaRefs = useRef<(HTMLTextAreaElement | null)[]>([]);

  useEffect(() => {
    fetch(`/api/nodes/${id}/content`)
      .then((r) => r.json())
      .then((d) => {
        setData(d);
        setSections(d.lesson?.sections || []);
      });
  }, [id]);

  const saveLesson = async () => {
    setSaving(true);
    await fetch(`/api/nodes/${id}/lesson`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sections }),
    });
    setSaving(false);
  };

  const addSection = () => {
    setSections((s) => [...s, { type: "definition", title: "", content: "" }]);
  };

  const removeSection = (idx: number) => {
    setSections((s) => s.filter((_, i) => i !== idx));
  };

  const updateSection = (idx: number, field: string, value: string) => {
    setSections((s) =>
      s.map((sec, i) => (i === idx ? { ...sec, [field]: value } : sec))
    );
  };

  const insertAtCursor = (idx: number, text: string) => {
    const textarea = textareaRefs.current[idx];
    if (textarea) {
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const current = sections[idx].content;
      const newContent = current.slice(0, start) + text + current.slice(end);
      updateSection(idx, "content", newContent);
      // Restore cursor position after React re-render
      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = start + text.length;
        textarea.focus();
      }, 0);
    } else {
      updateSection(idx, "content", sections[idx].content + text);
    }
  };

  const addExercise = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch(`/api/nodes/${id}/exercises`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...exerciseForm,
        hints: exerciseForm.hints.split("\n").filter((h) => h.trim()),
      }),
    });
    if (res.ok) {
      const ex = await res.json();
      const parsed = {
        ...ex,
        hints: JSON.parse(ex.hints || "[]"),
        choices: JSON.parse(ex.choices || "[]"),
      };
      setData((prev) =>
        prev ? { ...prev, exercises: [...prev.exercises, parsed] } : prev
      );
      setShowAddExercise(false);
      setExerciseForm({
        title: "",
        type: "computational",
        statement: "",
        difficulty: 1,
        hints: "",
        solution: "",
        answer: "",
      });
    }
  };

  const deleteExercise = async (exId: string) => {
    const res = await fetch(`/api/exercises/${exId}`, { method: "DELETE" });
    if (res.ok) {
      setData((prev) =>
        prev
          ? { ...prev, exercises: prev.exercises.filter((e) => e.id !== exId) }
          : prev
      );
    }
  };

  if (!data) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center text-zinc-500">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 p-8">
      <div className="max-w-5xl mx-auto">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-zinc-500 mb-4">
          <Link href="/admin" className="hover:text-zinc-300">Admin</Link>
          <span>/</span>
          <Link href={`/admin/modules/${data.node.moduleId}`} className="hover:text-zinc-300">
            {data.node.module?.title || data.node.moduleId}
          </Link>
          <span>/</span>
          <span className="text-zinc-300">{data.node.title}</span>
        </nav>

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1">
              {data.node.code && (
                <span className="text-[10px] font-mono text-zinc-500 bg-zinc-800 px-1.5 py-0.5 rounded">
                  {data.node.code}
                </span>
              )}
              <h1 className="text-2xl font-bold text-zinc-100">
                {data.node.title}
              </h1>
            </div>
            <p className="text-sm text-zinc-500">Content Editor</p>
          </div>
          <div className="flex gap-3">
            <Link
              href={`/admin/modules/${data.node.moduleId}`}
              className="px-4 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-zinc-400 text-sm"
            >
              &larr; Back to Module
            </Link>
            <Link
              href={`/learn/${id}`}
              className="px-4 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-zinc-400 text-sm"
            >
              Preview Page
            </Link>
          </div>
        </div>

        {/* ─── Lesson Editor ─── */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-zinc-200">
              Lesson Sections ({sections.length})
            </h2>
            <div className="flex gap-2">
              <button
                onClick={() => setShowPreview(!showPreview)}
                className="px-3 py-1.5 rounded-lg bg-zinc-800 text-zinc-400 text-sm hover:bg-zinc-700"
              >
                {showPreview ? "Hide Preview" : "Show Preview"}
              </button>
              <button
                onClick={addSection}
                className="px-3 py-1.5 rounded-lg bg-indigo-600 text-white text-sm"
              >
                + Section
              </button>
              <button
                onClick={saveLesson}
                disabled={saving}
                className="px-4 py-1.5 rounded-lg bg-emerald-600 text-white text-sm disabled:opacity-50"
              >
                {saving ? "Saving..." : "Save Lesson"}
              </button>
            </div>
          </div>

          <div className="space-y-4">
            {sections.map((sec, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 space-y-3"
              >
                <div className="flex items-center gap-3">
                  <select
                    value={sec.type}
                    onChange={(e) => updateSection(idx, "type", e.target.value)}
                    className="px-2 py-1 rounded bg-zinc-800 border border-zinc-700 text-zinc-300 text-sm"
                  >
                    {sectionTypes.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                  <input
                    value={sec.title}
                    onChange={(e) => updateSection(idx, "title", e.target.value)}
                    placeholder="Section title"
                    className="flex-1 px-3 py-1 rounded bg-zinc-800 border border-zinc-700 text-zinc-200 text-sm"
                  />
                  <button
                    onClick={() => removeSection(idx)}
                    className="text-red-500 hover:text-red-400 text-sm"
                  >
                    Remove
                  </button>
                </div>
                {/* Media toolbar */}
                <MediaToolbar onInsert={(text) => insertAtCursor(idx, text)} />
                <div className={showPreview ? "grid grid-cols-2 gap-4" : ""}>
                  <textarea
                    ref={(el) => { textareaRefs.current[idx] = el; }}
                    value={sec.content}
                    onChange={(e) => updateSection(idx, "content", e.target.value)}
                    rows={8}
                    className="w-full px-3 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-zinc-200 text-sm font-mono"
                    placeholder="Markdown + LaTeX content... Use toolbar above for media embeds."
                  />
                  {showPreview && (
                    <div className="p-3 rounded-lg bg-zinc-950 border border-zinc-800 text-sm overflow-auto max-h-64">
                      <MarkdownRenderer content={sec.content} />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ─── Exercises ─── */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-zinc-200">
              Exercises ({data.exercises.length})
            </h2>
            <button
              onClick={() => setShowAddExercise(true)}
              className="px-3 py-1.5 rounded-lg bg-indigo-600 text-white text-sm"
            >
              + Exercise
            </button>
          </div>

          {/* Add Exercise Form */}
          {showAddExercise && (
            <form
              onSubmit={addExercise}
              className="mb-6 p-5 rounded-xl bg-zinc-900 border border-zinc-800 space-y-4"
            >
              <h3 className="font-semibold text-zinc-200">New Exercise</h3>
              <div className="grid grid-cols-3 gap-4">
                <input
                  value={exerciseForm.title}
                  onChange={(e) =>
                    setExerciseForm((f) => ({ ...f, title: e.target.value }))
                  }
                  placeholder="Title"
                  required
                  className="col-span-2 px-3 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-zinc-200 text-sm"
                />
                <select
                  value={exerciseForm.type}
                  onChange={(e) =>
                    setExerciseForm((f) => ({ ...f, type: e.target.value }))
                  }
                  className="px-3 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-zinc-200 text-sm"
                >
                  <option value="computational">Computational</option>
                  <option value="qcm">QCM</option>
                  <option value="proof">Proof</option>
                </select>
              </div>
              <textarea
                value={exerciseForm.statement}
                onChange={(e) =>
                  setExerciseForm((f) => ({ ...f, statement: e.target.value }))
                }
                rows={3}
                placeholder="Statement (Markdown + LaTeX)"
                className="w-full px-3 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-zinc-200 text-sm font-mono"
              />
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-zinc-500 mb-1">
                    Difficulty (1-5)
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={5}
                    value={exerciseForm.difficulty}
                    onChange={(e) =>
                      setExerciseForm((f) => ({
                        ...f,
                        difficulty: Number(e.target.value),
                      }))
                    }
                    className="w-full px-3 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-zinc-200 text-sm"
                  />
                </div>
                {exerciseForm.type === "computational" && (
                  <div>
                    <label className="block text-xs text-zinc-500 mb-1">
                      Answer
                    </label>
                    <input
                      value={exerciseForm.answer}
                      onChange={(e) =>
                        setExerciseForm((f) => ({
                          ...f,
                          answer: e.target.value,
                        }))
                      }
                      className="w-full px-3 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-zinc-200 text-sm"
                      placeholder="Expected answer"
                    />
                  </div>
                )}
              </div>
              <div>
                <label className="block text-xs text-zinc-500 mb-1">
                  Hints (one per line)
                </label>
                <textarea
                  value={exerciseForm.hints}
                  onChange={(e) =>
                    setExerciseForm((f) => ({ ...f, hints: e.target.value }))
                  }
                  rows={2}
                  className="w-full px-3 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-zinc-200 text-sm font-mono"
                />
              </div>
              <div>
                <label className="block text-xs text-zinc-500 mb-1">
                  Solution
                </label>
                <textarea
                  value={exerciseForm.solution}
                  onChange={(e) =>
                    setExerciseForm((f) => ({ ...f, solution: e.target.value }))
                  }
                  rows={3}
                  className="w-full px-3 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-zinc-200 text-sm font-mono"
                />
              </div>
              <div className="flex gap-3">
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm"
                >
                  Create
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddExercise(false)}
                  className="px-4 py-2 rounded-lg bg-zinc-800 text-zinc-400 text-sm"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}

          {/* Exercise list */}
          <div className="space-y-3">
            {data.exercises.map((ex) => (
              <div
                key={ex.id}
                className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 flex items-start justify-between"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs px-2 py-0.5 rounded bg-zinc-800 text-zinc-400">
                      {ex.type}
                    </span>
                    <div className="flex gap-0.5">
                      {Array.from({ length: 5 }, (_, i) => (
                        <span
                          key={i}
                          className={`text-xs ${i < ex.difficulty ? "text-yellow-500" : "text-zinc-700"}`}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                  </div>
                  <h3 className="font-medium text-zinc-200 text-sm">
                    {ex.title}
                  </h3>
                  <p className="text-xs text-zinc-500 mt-1 line-clamp-1">
                    {ex.statement}
                  </p>
                </div>
                <button
                  onClick={() => deleteExercise(ex.id)}
                  className="text-xs text-red-500 hover:text-red-400 ml-3 shrink-0"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
