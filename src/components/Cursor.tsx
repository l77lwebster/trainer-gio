import { useEffect, useRef } from "react";

export function Cursor() {
  const dotRef  = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isFine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!isFine) return;

    // Start off-screen so they don't flash at 0,0
    const m = { x: -200, y: -200 };
    const r = { x: -200, y: -200 };
    let hover = false;
    let raf   = 0;

    const onMove = (e: MouseEvent) => {
      m.x = e.clientX;
      m.y = e.clientY;

      // Dot: instant — no lerp, no lag
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${m.x}px,${m.y}px)`;
      }

      // Detect interactive targets without touching React state
      const el = e.target as HTMLElement;
      hover = !!el.closest("a,button,input,textarea,select,label,[role='button'],.cursor-hover");
    };

    const loop = () => {
      // Ring: lerp at 0.22 — very fast but still has personality
      r.x += (m.x - r.x) * 0.22;
      r.y += (m.y - r.y) * 0.22;

      if (ringRef.current) {
        const s = hover ? 52 : 28;
        const half = s / 2;
        ringRef.current.style.transform   = `translate(${r.x - half}px,${r.y - half}px)`;
        ringRef.current.style.width       = `${s}px`;
        ringRef.current.style.height      = `${s}px`;
        ringRef.current.style.background  = hover ? "rgba(192,57,43,0.10)" : "transparent";
        ringRef.current.style.borderColor = hover ? "rgba(192,57,43,0.55)" : "rgba(192,57,43,0.9)";
        ringRef.current.style.opacity     = "1";
      }

      raf = requestAnimationFrame(loop);
    };

    // Reveal on first move so there's no cold-start flash
    const onFirst = (e: MouseEvent) => {
      m.x = e.clientX; m.y = e.clientY;
      r.x = e.clientX; r.y = e.clientY;
      if (dotRef.current) dotRef.current.style.opacity = "1";
      window.removeEventListener("mousemove", onFirst);
    };

    window.addEventListener("mousemove", onFirst, { passive: true });
    window.addEventListener("mousemove", onMove,  { passive: true });
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onFirst);
      window.removeEventListener("mousemove", onMove);
    };
  }, []); // ← empty deps: loop runs once, never restarts

  return (
    <>
      {/* Dot — sharp, instant, no lerp */}
      <div
        ref={dotRef}
        style={{
          opacity: 0,
          willChange: "transform",
          width: 5,
          height: 5,
          borderRadius: "50%",
          background: "var(--red)",
          position: "fixed",
          left: 0,
          top: 0,
          zIndex: 9999,
          pointerEvents: "none",
          transform: "translate(-200px,-200px)",
          marginLeft: -2.5,
          marginTop: -2.5,
          mixBlendMode: "exclusion",
        }}
      />

      {/* Ring — fast lerp, no CSS transition fighting it */}
      <div
        ref={ringRef}
        style={{
          opacity: 0,
          willChange: "transform, width, height",
          width: 28,
          height: 28,
          borderRadius: "50%",
          border: "1.5px solid rgba(192,57,43,0.9)",
          position: "fixed",
          left: 0,
          top: 0,
          zIndex: 9998,
          pointerEvents: "none",
          transform: "translate(-200px,-200px)",
          // NO css transition — JS handles everything
        }}
      />
    </>
  );
}
