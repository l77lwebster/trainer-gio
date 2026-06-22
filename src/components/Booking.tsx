import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const GOALS = ["Fat Loss", "Build Muscle", "Get Stronger", "Body Recomp", "Athletic Perf.", "Mobility", "Nutrition Only", "General Health"];

const PERKS = [
  "Free first consultation — always",
  "Custom program built for your goals",
  "Nutrition coaching included",
  "Based at GoodLife Fitness · Stouffville",
  "Real results, real accountability",
];

const FORMSPREE_ENDPOINT = "https://formspree.io/f/mzdqgdrb";

declare global {
  interface Window { gtag?: (...args: unknown[]) => void; }
}

function trackConversion() {
  window.gtag?.("event", "generate_lead", {
    event_category: "form",
    event_label: "booking_form",
    value: 1,
  });
}

function Field({ label, name, type = "text", required }: {
  label: string; name: string; type?: string; required?: boolean;
}) {
  const [focused, setFocused] = useState(false);
  return (
    <div className="group relative">
      <label className={`block font-syne text-[10px] font-bold uppercase tracking-[0.2em] transition-colors ${focused ? "text-[var(--red)]" : "text-[var(--white)]/40"}`}>
        {label}
      </label>
      <input
        name={name} type={type} required={required}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className={`mt-2 w-full border-0 border-b bg-transparent py-3 text-base text-[var(--white)] outline-none transition-colors duration-200 ${focused ? "border-[var(--red)]" : "border-white/10"}`}
      />
    </div>
  );
}

export function Booking() {
  const [goals, setGoals]         = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading]     = useState(false);
  const [error, setError]         = useState("");

  const toggleGoal = (g: string) =>
    setGoals(prev => prev.includes(g) ? prev.filter(x => x !== g) : [...prev, g]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const form = e.currentTarget;
    const data = new FormData(form);
    data.append("goals", goals.join(", "));

    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });

      if (res.ok) {
        trackConversion();
        setSubmitted(true);
      } else {
        setError("Something went wrong. Please try again or text me directly.");
      }
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="booking" className="relative w-full bg-[var(--black)]">
      <div className="grid min-h-screen grid-cols-1 lg:grid-cols-[1fr_1.1fr]">

        {/* ── LEFT ───────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="relative flex flex-col justify-center overflow-hidden bg-[var(--black)] px-8 py-20 md:px-16 lg:py-0 order-2 lg:order-1"
        >
          <span className="pointer-events-none absolute -left-4 bottom-0 select-none font-display text-[200px] leading-none text-white/[0.025]">
            GIO
          </span>

          <p className="font-syne text-xs font-bold uppercase tracking-[0.3em] text-[var(--red)]">
            Get Started
          </p>

          <h2 className="mt-5 font-display leading-[0.88]" style={{ fontSize: "clamp(38px, 5.5vw, 90px)" }}>
            <span className="block text-[var(--white)]">START YOUR</span>
            <span className="block text-[var(--red)]">JOURNEY.</span>
          </h2>

          <p className="mt-8 max-w-sm text-sm leading-relaxed text-[var(--white)]/55">
            Takes 30 seconds. I'll reach out within 24 hours to schedule your free call.
          </p>

          <ul className="mt-10 space-y-4">
            {PERKS.map((p, i) => (
              <motion.li
                key={p}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.08, duration: 0.5 }}
                className="flex items-center gap-4"
              >
                <span className="h-px w-5 shrink-0 bg-[var(--red)]" />
                <span className="font-syne text-xs font-semibold uppercase tracking-[0.12em] text-[var(--white)]/65">{p}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* ── RIGHT: Single-page form ─────────────────────────── */}
        <div className="relative flex flex-col justify-center bg-[var(--mid)] px-8 py-16 md:px-14 order-1 lg:order-2">
          <div className="absolute inset-x-0 top-0 h-0.5 bg-[var(--red)]" />

          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col items-center justify-center py-24 text-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 260, damping: 16, delay: 0.1 }}
                  className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-[var(--red)] text-4xl"
                >
                  ⚡
                </motion.div>
                <h3 className="mt-8 font-display text-6xl text-[var(--red)] md:text-7xl">LET'S GO!</h3>
                <p className="mt-5 max-w-sm text-sm leading-relaxed text-[var(--white)]/70">
                  Got it. I'll reach out within 24 hours. Get ready — your transformation starts now.
                </p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                className="mx-auto w-full max-w-lg space-y-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div>
                  <h3 className="font-display leading-tight text-[var(--white)]" style={{ fontSize: "clamp(28px, 3.5vw, 48px)" }}>
                    Book Your Free Consult
                  </h3>
                  <p className="mt-2 text-xs tracking-wide text-[var(--white)]/40">
                    30 seconds · No commitment · Just results
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <Field label="First Name" name="first_name" required />
                  <Field label="Phone Number" name="phone" type="tel" required />
                </div>

                <div>
                  <p className="mb-4 font-syne text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--white)]/40">
                    Main Goal <span className="text-white/20">(pick all that apply)</span>
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {GOALS.map(g => {
                      const active = goals.includes(g);
                      return (
                        <motion.button
                          type="button" key={g}
                          onClick={() => toggleGoal(g)}
                          whileTap={{ scale: 0.94 }}
                          className={`rounded-full border px-4 py-2.5 font-syne text-[10px] font-bold uppercase tracking-[0.12em] transition-all duration-200 ${
                            active ? "border-[var(--red)] bg-[var(--red)] text-white" : "border-white/10 text-white/50 hover:border-[var(--red)]/50 hover:text-white/80"
                          }`}
                        >
                          {g}
                        </motion.button>
                      );
                    })}
                  </div>
                </div>

                {error && (
                  <p className="text-center text-xs text-red-400">{error}</p>
                )}

                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={{ scale: loading ? 1 : 1.02 }}
                  whileTap={{ scale: loading ? 1 : 0.97 }}
                  className="group relative w-full overflow-hidden rounded-xl bg-[var(--red)] py-5 font-display text-2xl tracking-widest text-white transition-colors duration-300 hover:bg-[var(--red-dk)] disabled:opacity-70"
                  style={{ boxShadow: "0 4px 30px rgba(192,57,43,0.4)" }}
                >
                  <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                  <span className="relative flex items-center justify-center gap-3">
                    {loading ? "SENDING..." : "LET'S BUILD"}
                    {!loading && <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>}
                  </span>
                </motion.button>

                <p className="text-center text-[10px] text-white/25 tracking-wide">
                  Your info is private. No spam, ever.
                </p>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
