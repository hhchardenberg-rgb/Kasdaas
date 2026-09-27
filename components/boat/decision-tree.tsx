"use client";
import { useState } from "react";
import { ArrowLeft, CheckCircle2, RotateCcw, Siren } from "lucide-react";
import { useDict } from "@/components/providers";
import { haptic } from "@/lib/client-store";

export interface TreeNodeView {
  id: string;
  text: string;
  placeholder?: boolean;
  detail?: string;
  options: { label: string; next: string }[];
}

export interface ProblemView {
  id: string;
  title: string;
  urgent?: boolean;
  icon: React.ReactNode;
  start: string;
  nodes: TreeNodeView[];
}

/** Big problem buttons, each opening a simple step-by-step decision tree. */
export function DecisionTrees({ problems, contact, sos }: { problems: ProblemView[]; contact: React.ReactNode; sos: React.ReactNode }) {
  const { t } = useDict();
  const [problem, setProblem] = useState<ProblemView | null>(null);
  const [path, setPath] = useState<string[]>([]);
  const current = path[path.length - 1];
  const node = problem?.nodes.find((n) => n.id === current);

  const open = (p: ProblemView) => {
    haptic();
    setProblem(p);
    setPath([p.start]);
  };

  if (!problem) {
    return (
      <div className="grid grid-cols-2 gap-2.5">
        {problems.map((p) => (
          <button
            key={p.id}
            type="button"
            onClick={() => open(p)}
            className={`card flex min-h-24 flex-col items-start justify-between gap-3 p-4 text-left transition active:scale-[0.98] ${p.urgent ? "ring-2 ring-danger/25" : ""}`}
          >
            <span className={`grid h-10 w-10 place-items-center rounded-xl ${p.urgent ? "bg-danger/10 text-danger" : "bg-ocean-100 text-ocean-800"}`}>{p.icon}</span>
            <span className="text-[0.92rem] font-semibold leading-tight">{p.title}</span>
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className="card p-5" aria-live="polite">
      <div className="mb-4 flex items-center justify-between gap-2">
        <button
          type="button"
          onClick={() => (path.length > 1 ? setPath(path.slice(0, -1)) : setProblem(null))}
          className="inline-flex h-10 items-center gap-1.5 rounded-full bg-sand-100 px-3.5 text-sm font-semibold"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden /> {t.common.back}
        </button>
        <button type="button" onClick={() => setPath([problem.start])} className="inline-flex h-10 items-center gap-1.5 rounded-full px-3 text-xs font-semibold text-muted">
          <RotateCcw className="h-3.5 w-3.5" aria-hidden /> {t.boatGuide.startOver}
        </button>
      </div>
      <p className="eyebrow mb-2">{problem.title}</p>

      {current === "solved" && (
        <div className="flex flex-col items-center py-6 text-center">
          <CheckCircle2 className="h-12 w-12 text-sage" aria-hidden />
          <p className="mt-3 font-display text-xl">{t.boatGuide.solved}</p>
        </div>
      )}
      {current === "contact" && (
        <div>
          <p className="mb-4 font-display text-xl">{t.boatGuide.contactOwner}</p>
          {contact}
        </div>
      )}
      {current === "sos" && (
        <div>
          <p className="mb-2 flex items-center gap-2 font-display text-xl text-danger"><Siren className="h-5 w-5" aria-hidden />{t.boatGuide.sosTitle}</p>
          <p className="mb-4 text-sm text-ink-soft">{t.boatGuide.sosText}</p>
          {sos}
        </div>
      )}
      {node && (
        <div>
          <p className="text-[0.7rem] font-semibold text-muted">{t.common.step} {path.length}</p>
          <p className="mt-1 font-display text-[1.35rem] leading-snug">
            {node.placeholder ? <span className="placeholder-text">{node.text}</span> : node.text}
          </p>
          {node.detail && <p className="mt-2 text-sm italic text-muted">{node.detail}</p>}
          <div className="mt-5 flex flex-col gap-2.5">
            {node.options.map((o) => (
              <button
                key={o.label + o.next}
                type="button"
                onClick={() => {
                  haptic();
                  setPath([...path, o.next]);
                }}
                className="min-h-13 rounded-full bg-ocean-800 px-5 py-3 text-[0.95rem] font-semibold text-white"
              >
                {o.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
