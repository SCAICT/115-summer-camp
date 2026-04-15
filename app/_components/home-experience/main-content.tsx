import type { AnimationPhase } from "./animation-phase";

type MainContentProps = {
  currentPhase: AnimationPhase;
};

export function MainContent({ currentPhase }: MainContentProps) {
  return (
    <main className="camp-main" aria-hidden={currentPhase === "loading"}>
      <div className="camp-page">
      </div>
    </main>
  );
}
