import { useEffect, useRef, useState } from "react";

export function Cursor() {
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [hover, setHover] = useState(false);

  useEffect(() => {
    const isFine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!isFine) return;
    setEnabled(true);

    const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const ring = { x: mouse.x, y: mouse.y };

    const onMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mouse.x - 4}px, ${mouse.y - 4}px)`;
      }
      const el = e.target as HTMLElement;
      const interactive = !!el.closest("a,button,input,textarea,select,label,[role='button'],.cursor-hover");
      setHover(interactive);
    };

    let raf = 0;
    const loop = () => {
      ring.x += (mouse.x - ring.x) * 0.1;
      ring.y += (mouse.y - ring.y) * 0.1;
      if (ringRef.current) {
        const size = hover ? 64 : 36;
        ringRef.current.style.transform = `translate(${ring.x - size / 2}px, ${ring.y - size / 2}px)`;
        ringRef.current.style.width = `${size}px`;
        ringRef.current.style.height = `${size}px`;
        ringRef.current.style.borderColor = hover ? "var(--red-dk)" : "var(--red)";
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    window.addEventListener("mousemove", onMove);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
    };
  }, [hover]);

  if (!enabled) return null;
  return (
    <>
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-2 w-2 rounded-full bg-[var(--red)]"
        style={{ mixBlendMode: "exclusion" }}
      />
      <div
        ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 z-[9998] rounded-full border-2 transition-[width,height,border-color] duration-200 ease-out"
      />
    </>
  );
}
