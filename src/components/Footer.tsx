import { motion } from "framer-motion";

export function Footer() {
  return (
    <footer className="relative border-t border-[var(--red)]/40 bg-[var(--black)] pb-20 pt-16 sm:pb-10">

      {/* CTA button */}
      <div className="mx-auto mb-14 flex flex-col items-center gap-4 px-6 text-center">
        <p className="font-syne text-xs font-bold uppercase tracking-[0.3em] text-[var(--white)]/40">
          Your transformation starts with one call
        </p>
        <motion.button
          onClick={() => document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" })}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="group relative overflow-hidden rounded-xl bg-[var(--red)] px-10 py-5 font-display text-2xl tracking-widest text-white transition-colors duration-300 hover:bg-[var(--red-dk)]"
          style={{ boxShadow: "0 4px 30px rgba(192,57,43,0.4)" }}
        >
          <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
          <span className="relative flex items-center gap-3">
            BOOK YOUR FREE CONSULT
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
          </span>
        </motion.button>
      </div>

      <div className="mx-auto border-t border-white/10 max-w-7xl" />
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-6 md:grid-cols-3 md:items-center">
        <div>
          <p className="font-display text-3xl tracking-wide text-[var(--white)]">TRAINER GIO</p>
          <p className="mt-1 text-xs text-[var(--white)]/55">GoodLife Fitness · Stouffville, ON</p>
        </div>
        <nav className="flex justify-start gap-6 md:justify-center">
          {[
            ["About", "about"],
            ["Book", "booking"],
            ["Results", "results"],
          ].map(([l, id]) => (
            <a
              key={id}
              href={`#${id}`}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
              }}
              className="font-syne text-xs font-bold uppercase tracking-[0.18em] text-[var(--white)]/70 transition-colors hover:text-[var(--red)]"
            >
              {l}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-4 md:justify-end">
          <a href="mailto:gio@trainergio.ca" className="text-xs text-[var(--white)]/70 transition-colors hover:text-[var(--red)]">
            gio@trainergio.ca
          </a>
          <a href="https://instagram.com" target="_blank" rel="noreferrer" className="text-[var(--white)]/70 transition-colors hover:text-[var(--red)]" aria-label="Instagram">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <rect x="3" y="3" width="18" height="18" rx="4" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
            </svg>
          </a>
        </div>
      </div>
      <div className="mx-auto mt-10 max-w-7xl px-6">
        <p className="font-syne text-[10px] font-bold uppercase tracking-[0.22em] text-[var(--red)]/60">
          Serving Stouffville · Markham · Newmarket · Aurora · GTA
        </p>
      </div>
    </footer>
  );
}
