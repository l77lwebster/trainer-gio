import { motion, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const STATS = [
  { value: 200, suffix: "+", label: "Clients Transformed" },
  { value: 5,   suffix: "+", label: "Years Experience" },
  { value: 3,   suffix: "",  label: "Locations Served" },
  { value: 100, suffix: "%", label: "Custom Programs" },
];

const STEPS = [
  {
    n: "01",
    title: "Book Free Consultation",
    desc: "Reach out and we hop on a quick call to map out your goals, timeline, and what's been holding you back.",
  },
  {
    n: "02",
    title: "Get Your Custom Plan",
    desc: "Training + nutrition built specifically around your body, schedule, and lifestyle. No templates, no recycled plans.",
  },
  {
    n: "03",
    title: "Train & Transform",
    desc: "Show up, follow the plan, and watch the results compound. I'm with you every step — adjusting as you progress.",
  },
];

function Counter({ to, suffix }: { to: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    const start = performance.now();
    const dur = 1800;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(to * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to]);
  return (
    <span ref={ref}>
      {n}{suffix}
    </span>
  );
}

export function About() {
  const sectionRef = useRef(null);
  const reduce = useReducedMotion();

  return (
    <section id="about" className="relative w-full overflow-hidden bg-[var(--black)]">

      {/* ── PART 1: Story ─────────────────────────────────────── */}
      <div className="relative px-6 pb-0 pt-14 md:px-16 lg:px-24">

        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-syne text-xs font-bold uppercase tracking-[0.3em] text-[var(--red)]"
        >
          About Trainer Gio
        </motion.p>

        {/* Headline — full width, cinematic */}
        <div className="mt-6 overflow-hidden">
          {["NOT JUST A TRAINER.", "YOUR PARTNER IN"].map((line, i) => (
            <motion.h2
              key={line}
              initial={{ y: reduce ? 0 : 40, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="block font-display leading-[0.88] text-[var(--white)]"
              style={{ fontSize: "clamp(48px, 7.5vw, 120px)" }}
            >
              {line}
            </motion.h2>
          ))}
          <motion.h2
            initial={{ y: reduce ? 0 : 40, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.24, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="block font-display leading-[0.88] text-[var(--red)]"
            style={{ fontSize: "clamp(48px, 7.5vw, 120px)" }}
          >
            RESULTS.
          </motion.h2>
        </div>

        {/* Bio + credentials — two-column below headline */}
        <div className="mt-14 grid grid-cols-1 gap-10 md:grid-cols-[1fr_1px_1fr]">
          {/* Left bio */}
          <motion.div
            initial={{ opacity: 0, y: reduce ? 0 : 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="space-y-5 text-base leading-relaxed text-[var(--white)]/70"
          >
            <p>
              I'm Gio — a certified personal trainer based at GoodLife Fitness in Stouffville, ON.
              I work with everyone from total beginners to competing athletes.
              No cookie-cutter programs, no recycled advice.
            </p>
            <p>
              You get a plan built for your body, your schedule, your goals — with nutrition
              coaching baked in and the accountability to actually finish what you started.
              Serving Stouffville, Markham, and the entire GTA.
            </p>
          </motion.div>

          {/* Divider */}
          <div className="hidden self-stretch bg-white/10 md:block" />

          {/* Right — credentials list */}
          <motion.ul
            initial={{ opacity: 0, y: reduce ? 0 : 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.35, duration: 0.5 }}
            className="space-y-4"
          >
            {[
              "Certified Personal Trainer (CPT)",
              "Nutrition Coaching Specialist",
              "GoodLife Fitness — Stouffville, ON",
              "Strength, Fat Loss & Body Recomposition",
              "Serving Stouffville · Markham · GTA",
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--red)]" />
                <span className="font-syne text-sm font-medium uppercase tracking-[0.1em] text-[var(--white)]/75">
                  {item}
                </span>
              </li>
            ))}
          </motion.ul>
        </div>
      </div>

      {/* ── STATS BAR ─────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="relative mt-20 overflow-hidden border-y border-white/10 bg-[var(--mid)]"
      >
        {/* Subtle red sweep */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: "linear-gradient(90deg, rgba(192,57,43,0.06) 0%, transparent 60%)" }}
        />
        <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-white/10 md:grid-cols-4">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="flex flex-col items-center justify-center px-6 py-12 text-center"
            >
              <span className="font-display text-5xl text-[var(--red)] md:text-6xl">
                <Counter to={s.value} suffix={s.suffix} />
              </span>
              <span className="mt-2 font-syne text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--white)]/50">
                {s.label}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* ── PART 2: Process ───────────────────────────────────── */}
      <div className="relative px-6 pb-28 pt-28 md:px-16 lg:px-24">

        {/* Section label */}
        <div className="flex items-center gap-5">
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="h-px w-12 origin-left bg-[var(--red)]"
          />
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="font-syne text-xs font-bold uppercase tracking-[0.3em] text-[var(--red)]"
          >
            The Process
          </motion.p>
        </div>

        <motion.h3
          initial={{ opacity: 0, y: reduce ? 0 : 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15, duration: 0.5 }}
          className="mt-5 font-display leading-[0.9] text-[var(--white)]"
          style={{ fontSize: "clamp(42px, 5.5vw, 84px)" }}
        >
          HOW IT WORKS
        </motion.h3>

        {/* Steps */}
        <div className="mt-16 grid grid-cols-1 gap-px bg-white/10 md:grid-cols-3">
          {STEPS.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: reduce ? 0 : 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
              className="group relative overflow-hidden bg-[var(--black)] p-10 transition-all duration-500 hover:bg-[var(--mid)]"
            >
              {/* Large ghost number */}
              <span
                className="pointer-events-none absolute -right-4 -top-6 select-none font-display text-[160px] leading-none text-white/[0.03] transition-colors duration-500 group-hover:text-[var(--red)]/10"
              >
                {s.n}
              </span>

              {/* Red top border on hover */}
              <div className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-[var(--red)] transition-transform duration-500 group-hover:scale-x-100" />

              <span className="font-display text-4xl text-[var(--red)]">{s.n}</span>
              <h4 className="mt-4 font-display text-2xl leading-tight text-[var(--white)] md:text-3xl">
                {s.title}
              </h4>
              <p className="mt-4 text-sm leading-relaxed text-[var(--white)]/60">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

    </section>
  );
}
