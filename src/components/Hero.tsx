import { useEffect, useRef, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import trainerImg from "@/assets/trainer-gio.webp";

// ─── Real client transformation photos ───────────────────────────────────────
import ba1 from "@/assets/client1.webp"; // woman with glasses — fat loss
import ba2 from "@/assets/client2.webp"; // blurred-face man — muscle gain
import ba3 from "@/assets/client3.webp"; // young woman — recomp
import ba4 from "@/assets/client4.webp"; // man at river — fat loss
import ba5 from "@/assets/client5.webp"; // man back view — muscle gain
import ba6 from "@/assets/client6.webp"; // man — body transformation

type Card = {
  img: string;
  stat: string;
  label: string;
  weeks: string;
  side: "L" | "R";
  top: string;
  off: string;
  rot: number;
  depth: number;
  size: "sm" | "md" | "lg"; // card width variation
};

const cards: Card[] = [
  // LEFT — top/bottom pulled close to center, mid slightly less
  { img: ba1, stat: "−18 lbs", label: "Fat Loss",    weeks: "14 Weeks", side: "L", top: "4%",  off: "21%", rot: -6, depth: 26, size: "lg" },
  { img: ba2, stat: "+15 lbs", label: "−7% Body Fat", weeks: "16 Weeks", side: "L", top: "34%", off: "15%", rot: -2, depth: 18, size: "md" },
  { img: ba3, stat: "−10 lbs", label: "Recomp",       weeks: "11 Weeks", side: "L", top: "62%", off: "22%", rot:  5, depth: 10, size: "md" },
  // RIGHT — top/bottom pulled close to center, mid slightly less
  { img: ba4, stat: "−27 lbs", label: "Fat Loss",     weeks: "9 Weeks",  side: "R", top: "5%",  off: "22%", rot:  7, depth: 26, size: "md" },
  { img: ba5, stat: "+15 lbs", label: "Muscle Gain",  weeks: "10 Weeks", side: "R", top: "30%", off: "14%", rot:  2, depth: 18, size: "lg" },
  { img: ba6, stat: "−19 lbs", label: "Recomp",       weeks: "14 Weeks", side: "R", top: "62%", off: "20%", rot: -4, depth: 10, size: "lg" },
];

function MobileHeroButton() {
  const btnControls = useAnimation();
  const shimmerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let alive = true;
    const run = async () => {
      await new Promise(r => setTimeout(r, 1800)); // initial delay
      while (alive) {
        // Trigger shimmer
        if (shimmerRef.current) {
          shimmerRef.current.style.transition = "none";
          shimmerRef.current.style.transform = "translateX(-120%) skewX(-20deg)";
          void shimmerRef.current.offsetWidth; // force reflow
          shimmerRef.current.style.transition = "transform 0.65s ease";
          shimmerRef.current.style.transform = "translateX(220%) skewX(-20deg)";
        }
        // Enlarge in sync
        await btnControls.start({ scale: 1.07, boxShadow: "0 0 0 8px rgba(192,57,43,0.2), 0 4px 30px rgba(192,57,43,0.5)", transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] } });
        await btnControls.start({ scale: 1, boxShadow: "0 4px 30px rgba(192,57,43,0.4)", transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] } });
        await new Promise(r => setTimeout(r, 3000));
      }
    };
    run();
    return () => { alive = false; };
  }, [btnControls]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.9, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="absolute top-[5vh] left-0 right-0 z-50 flex justify-center whitespace-nowrap"
    >
      <motion.button
        animate={btnControls}
        initial={{ scale: 1, boxShadow: "0 4px 30px rgba(192,57,43,0.4)" }}
        onClick={() => document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" })}
        whileTap={{ scale: 0.97 }}
        className="group relative overflow-hidden rounded-xl bg-[var(--red)] px-6 py-3 font-display text-base tracking-widest text-white transition-colors duration-300 hover:bg-[var(--red-dk)]"
      >
        {/* Shimmer */}
        <span
          ref={shimmerRef}
          className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent"
          style={{ transform: "translateX(-120%) skewX(-20deg)" }}
        />
        <span className="relative flex items-center justify-center">
          BOOK FREE CONSULT
        </span>
      </motion.button>
    </motion.div>
  );
}

export function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    const el = heroRef.current;
    if (!el || isMobile) return;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      setMouse({
        x: (e.clientX - r.left) / r.width - 0.5,
        y: (e.clientY - r.top) / r.height - 0.5,
      });
    };
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", () => setMouse({ x: 0, y: 0 }));
    return () => el.removeEventListener("mousemove", onMove);
  }, [isMobile]);

  const visibleCards = cards;

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative min-h-screen w-full overflow-hidden bg-[var(--black)]"
    >
      {/* ── Ambient red glow behind trainer ── */}
      <div
        className="anim-glow pointer-events-none absolute left-1/2 top-[30%] z-0 h-[80vh] w-[55vw] -translate-x-1/2"
        style={{
          background:
            "radial-gradient(ellipse, rgba(192,57,43,0.32) 0%, rgba(139,26,26,0.10) 45%, transparent 72%)",
          filter: "blur(60px)",
        }}
      />

      {/* ── Edge vignettes ── */}
      <div
        className="pointer-events-none absolute inset-0 z-20"
        style={{
          background: [
            "radial-gradient(ellipse 80% 55% at 50% 108%, rgba(0,0,0,0.97) 0%, transparent 65%)",
            "radial-gradient(ellipse 38% 100% at 0% 50%,  rgba(0,0,0,0.90), transparent 65%)",
            "radial-gradient(ellipse 38% 100% at 100% 50%,rgba(0,0,0,0.90), transparent 65%)",
            "radial-gradient(ellipse 100% 40% at 50% 0%,  rgba(0,0,0,0.75), transparent 70%)",
          ].join(", "),
        }}
      />

      {/* ── Location eyebrow ── */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.7, ease: "easeOut" }}
        className={`absolute left-1/2 z-40 -translate-x-1/2 ${isMobile ? "hidden" : "top-[3vh]"}`}
      >
        <div className="flex items-center gap-3">
          <div className="h-px w-8 bg-[var(--red)]" />
          <p className="font-syne text-[10px] font-bold uppercase tracking-[0.28em] text-[var(--red)] md:text-[11px]">
            GoodLife Fitness · Stouffville, ON · GTA
          </p>
          <div className="h-px w-8 bg-[var(--red)]" />
        </div>
      </motion.div>

      {/* ── Trainer photo ── */}
      <div className="absolute inset-0 z-10 flex items-end justify-center">
        <img
          src={trainerImg}
          alt="Giorgi Lomidze — Trainer Gio"
          fetchPriority="high"
          decoding="async"
          className="trainer-mask select-none"
          style={{
            width: "100vw",
            height: "100vh",
            objectFit: "cover",
            objectPosition: isMobile ? "49% 0%" : "center 30%",
            transform: `translate(${mouse.x * -12}px, ${mouse.y * -4}px)`,
            transition: "transform 0.5s cubic-bezier(0.2,0.8,0.2,1)",
            willChange: "transform",
          }}
        />
      </div>

      {/* ── Hero name block — GIORGI grazes the lower forearms ── */}
      <div className="pointer-events-none absolute inset-x-0 z-30 flex flex-col items-center text-center" style={{ bottom: isMobile ? "9vh" : "16vh", willChange: "transform" }}>
        {/* GIORGI */}
        <motion.h1
          initial={{ clipPath: "inset(100% 0 0 0)", opacity: 0 }}
          animate={{ clipPath: "inset(0% 0 0 0)", opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="font-display leading-[0.82] text-[var(--white)]"
          style={{ fontSize: "clamp(36px, 6.5vw, 88px)", letterSpacing: "0.05em", marginBottom: isMobile ? "0.75vh" : 0 }}
        >
          GIO
        </motion.h1>

        {/* LOMIDZE — outline */}
        <motion.h1
          initial={{ clipPath: "inset(100% 0 0 0)", opacity: 0 }}
          animate={{ clipPath: "inset(0% 0 0 0)", opacity: 1 }}
          transition={{ delay: 0.32, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="text-outline font-display leading-[0.82]"
          style={{ fontSize: "clamp(36px, 6.5vw, 88px)", letterSpacing: "0.05em", marginTop: 2 }}
        >
          LOMIDZE
        </motion.h1>

        {/* Certified PT — 4px below LOMIDZE */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.7, ease: "easeOut" }}
          className="pointer-events-none text-[var(--white)]/70"
          style={{ fontFamily: "Oswald, sans-serif", fontSize: isMobile ? 13 : 14, marginTop: 9, letterSpacing: "0.06em", wordSpacing: "0.5em", fontWeight: 600 }}
        >
          Certified Personal Trainer
        </motion.p>

        {/* GoodLife — 2px below Certified PT (mobile only) */}
        {isMobile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.7 }}
            className="flex items-center gap-2"
            style={{ marginTop: 2 }}
          >
            <div className="h-px w-6 bg-[var(--red)]" />
            <p className="font-syne text-[9px] font-bold uppercase tracking-[0.28em] text-[var(--red)]">
              GoodLife Fitness · Stouffville, ON · GTA
            </p>
            <div className="h-px w-6 bg-[var(--red)]" />
          </motion.div>
        )}

      </div>

      {/* ── Book CTA — desktop (subtle scroll prompt) ── */}
      {!isMobile && (
        <motion.button
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6, ease: "easeOut" }}
          onClick={() => document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" })}
          className="absolute bottom-[5.5vh] left-1/2 z-40 flex -translate-x-1/2 flex-col items-center gap-2"
        >
          <span className="font-syne text-[11px] font-bold uppercase tracking-[0.28em] text-[var(--white)]/80">
            Book Your Free Session
          </span>
          <motion.div
            animate={{ y: [0, 7, 0] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
            className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-[var(--red)] bg-[var(--red)]/15"
            style={{ boxShadow: "0 0 24px rgba(192,57,43,0.55)" }}
          >
            <span className="text-2xl font-bold text-[var(--red)]">↓</span>
          </motion.div>
        </motion.button>
      )}

      {/* ── Book CTA — mobile (bold button) ── */}
      {isMobile && <MobileHeroButton />}

      {/* ── Desktop result cards ── */}
      {!isMobile && visibleCards.map((c, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 + i * 0.12, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="absolute z-30"
          style={{
            top: c.top,
            [c.side === "L" ? "left" : "right"]: c.off,
            transform: `translate(${mouse.x * c.depth}px, ${mouse.y * (c.depth * 0.6)}px) rotate(${c.rot}deg)`,
            transition: "transform 0.65s cubic-bezier(0.2,0.8,0.2,1)",
            willChange: "transform",
          }}
        >
          <PhotoCard card={c} />
        </motion.div>
      ))}

      {/* ── Mobile result cards ── */}
      {isMobile && <MobileCards cards={cards} />}
    </section>
  );
}

const sizeMap = { sm: "clamp(95px, 8vw, 135px)", md: "clamp(120px, 10vw, 165px)", lg: "clamp(145px, 12.5vw, 200px)" };

// Orbital positions: top 2 close to each other near head, rest tighter together
const mobilePositions = [
  { top: "15%", left: "15%",  rot: -5 },  // L top — fat loss
  { top: "38%", left: "7%",   rot: -2 },  // L mid
  { top: "62.5%", left: "9%", rot:  4 },  // L bottom
  { top: "17%", right: "16%", rot:  6 },  // R top — fat loss
  { top: "38%", right: "7%",  rot:  2 },  // R mid
  { top: "62.5%", right: "9%",rot: -4 },  // R bottom
];

function MobileCards({ cards }: { cards: Card[] }) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setActive(prev => (prev + 1) % cards.length), 2000);
    return () => clearInterval(id);
  }, [cards.length]);

  return (
    <div className="pointer-events-none absolute inset-0 z-30">
      {cards.map((card, i) => {
        const pos = mobilePositions[i];
        const isActive = i === active;
        return (
          <motion.div
            key={i}
            className="absolute pointer-events-auto"
            style={{ top: pos.top, ...("left" in pos ? { left: pos.left } : { right: (pos as any).right }) }}
            animate={{
              scale: isActive ? 1.22 : 1,
              rotate: isActive ? 0 : pos.rot,
              zIndex: isActive ? 50 : 30,
              filter: isActive
                ? "saturate(1) brightness(1.08)"
                : "saturate(0.5) brightness(0.72)",
              opacity: isActive ? 1 : 0.55,
              boxShadow: isActive
                ? "0 0 0 1.5px rgba(192,57,43,0.8), 0 8px 32px rgba(0,0,0,0.7)"
                : "0 8px 32px rgba(0,0,0,0.6)",
            }}
            transition={{ duration: 0.45, ease: [0.2, 0.8, 0.2, 1] }}
          >
            <PhotoCard card={card} compact active={isActive} />
          </motion.div>
        );
      })}
    </div>
  );
}

// ─── Photo result card ────────────────────────────────────────────────────────
function PhotoCard({ card, compact, active }: { card: Card; compact?: boolean; active?: boolean }) {
  const w = compact ? 80 : sizeMap[card.size];
  const lit = active; // on desktop "lit" is driven by hover via CSS; on mobile by active prop

  return (
    <motion.div
      // On mobile (compact) the parent MobileCards controls filter/opacity/scale fully
      // On desktop we use whileHover
      initial={compact ? {} : { filter: "saturate(0.5) brightness(0.72)", opacity: 0.55 }}
      whileHover={compact ? {} : { scale: 1.18, filter: "saturate(1) brightness(1.08)", opacity: 1, zIndex: 50 }}
      transition={{ duration: 0.45, ease: [0.2, 0.8, 0.2, 1] }}
      className="group relative cursor-pointer overflow-hidden rounded-[4px]"
      style={{
        width: w,
        boxShadow: "0 8px 32px rgba(0,0,0,0.6)",
        border: "1px solid rgba(255,255,255,0.18)",
      }}
    >
      {/* Before/after photo */}
      <img
        src={card.img}
        alt={`${card.label} transformation`}
        loading="lazy"
        decoding="async"
        className={`w-full h-auto block transition-all duration-500 group-hover:scale-105 ${lit ? "scale-105" : ""}`}
        draggable={false}
      />

      {/* Bottom scrim */}
      <div className="absolute inset-x-0 bottom-0 h-[40%] bg-gradient-to-t from-black/90 via-black/50 to-transparent" />

      {/* Red border glow on hover — desktop only */}
      {!compact && (
        <div className="pointer-events-none absolute inset-0 rounded-[4px] transition-all duration-400 group-hover:shadow-[inset_0_0_0_1px_rgba(192,57,43,0.7)]" />
      )}

      {/* Stat + label */}
      <div
        className="absolute inset-x-0 flex flex-col items-center text-center"
        style={{ bottom: compact ? "-2px" : 0, paddingBottom: compact ? 0 : 8 }}
      >
        <span
          className="font-display text-[var(--red)] drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)]"
          style={{ fontSize: compact ? 18 : "clamp(22px, 2.2vw, 36px)", lineHeight: 1 }}
        >
          {card.stat}
        </span>
        <span
          className="mt-0.5 font-syne font-bold uppercase tracking-[0.13em] text-[var(--white)]/90"
          style={{ fontSize: compact ? 7 : "clamp(7px, 0.7vw, 10px)" }}
        >
          {card.label}
        </span>
      </div>

      {/* Weeks label — shown on hover (desktop) or active (mobile) */}
      <div
        className={`absolute inset-x-0 bg-gradient-to-b from-black/80 to-transparent px-2 text-center transition-all duration-400 ${
          lit ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full group-hover:translate-y-0 group-hover:opacity-100"
        }`}
        style={{ top: compact ? "-6px" : 0, paddingTop: compact ? 0 : 6 }}
      >
        <span
          className="font-syne font-bold uppercase tracking-[0.16em] text-[var(--red)]"
          style={{ fontSize: compact ? 7 : 9 }}
        >
          {card.weeks}
        </span>
      </div>

    </motion.div>
  );
}
