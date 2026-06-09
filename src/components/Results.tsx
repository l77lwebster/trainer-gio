import { motion } from "framer-motion";

const RESULTS = [
  { name: "Marcus T.", result: "Lost 22 lbs · 10 weeks", stat: "-22 LBS", grad: "from-[#3a0d0d] to-[#0a0a0a]" },
  { name: "Sarah L.", result: "Built 14 lbs muscle · 16 weeks", stat: "+14 LBS", grad: "from-[#2a0606] to-[#1a1a1a]" },
  { name: "David K.", result: "Bench +60 lbs · 12 weeks", stat: "+60 LBS", grad: "from-[#1f0a0a] to-[#0c0c0c]" },
  { name: "Priya R.", result: "Body fat -9% · 14 weeks", stat: "-9%", grad: "from-[#3a0d0d] to-[#0a0a0a]" },
  { name: "James O.", result: "Lost 31 lbs · 20 weeks", stat: "-31 LBS", grad: "from-[#2a0606] to-[#1a1a1a]" },
  { name: "Aisha M.", result: "Full recomp · 18 weeks", stat: "RECOMP", grad: "from-[#1f0a0a] to-[#0c0c0c]" },
];

export function Results() {
  return (
    <section id="results" className="relative min-h-screen w-full bg-[var(--black)] py-24">
      <div className="mx-auto max-w-7xl px-6">
        <p className="font-syne text-xs font-bold uppercase tracking-[0.22em] text-[var(--red)]">
          Real People. Real Results.
        </p>
        <h2 className="mt-3 font-display leading-[0.9] text-[var(--white)]" style={{ fontSize: "clamp(48px, 7vw, 110px)" }}>
          TRANSFORMATIONS THAT SPEAK.
        </h2>
        <p className="mt-4 max-w-2xl text-[var(--white)]/65">
          Every result below is a real client from the GTA.
        </p>

        <div className="mt-16 grid grid-cols-2 gap-5 md:grid-cols-3 md:gap-8">
          {RESULTS.map((r, i) => (
            <motion.div
              key={r.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.08, duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
              whileHover={{ scale: 1.06, y: -6 }}
              className="group overflow-hidden rounded-[3px] border border-white/10 bg-[var(--mid)] transition-shadow duration-500 hover:border-[var(--red)] hover:shadow-[0_25px_60px_rgba(0,0,0,0.85),0_0_50px_rgba(192,57,43,0.3)]"
            >
              <div className={`relative flex aspect-[4/5] items-center justify-center bg-gradient-to-b ${r.grad}`}>
                <span className="font-display text-6xl text-[var(--red)] md:text-7xl">{r.stat}</span>
              </div>
              <div className="p-5">
                <p className="font-syne text-xs font-bold uppercase tracking-[0.14em] text-[var(--white)]">{r.name}</p>
                <p className="mt-1.5 flex items-center gap-2 text-sm text-[var(--white)]/65">
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--red)]" />
                  {r.result}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-24 text-center"
        >
          <p className="text-lg font-light text-[var(--white)]/75">Ready to write your own story?</p>
          <button
            onClick={() => document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" })}
            className="shimmer-btn relative mt-6 overflow-hidden bg-[var(--red)] px-10 py-5 font-display text-2xl tracking-wide text-[var(--white)] transition-colors duration-200 hover:bg-[var(--red-dk)]"
          >
            BOOK YOUR FREE CONSULTATION
          </button>
        </motion.div>
      </div>
    </section>
  );
}
