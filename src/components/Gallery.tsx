import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import ba1 from "@/assets/client1.webp";
import ba2 from "@/assets/client2.webp";
import ba3 from "@/assets/client3.webp";
import ba6 from "@/assets/client6.webp";
import oa1 from "@/assets/openart-image_1779075649340_ede57d4d_1779075649781_1bf8fe0d.webp";
import oa2 from "@/assets/openart-image_1779076598682_6a5cce3b_1779076599122_65595d51.webp";
import oa3 from "@/assets/openart-image_1779297328009_ed8a7f73_1779297329299_fa6d34b4.webp";
import oa5 from "@/assets/openart-image_1779570166997_cb318c5f_1779570167669_8d2b9cc7.webp";
import oa6 from "@/assets/openart-image_1779570864245_7809ad7a_1779570864568_0cfe4aae.webp";

type Client = { img: string; stat: string; label: string; weeks: string };

const MAIN: Client[] = [
  { img: ba1,  stat: "−18 lbs", label: "Fat Loss",      weeks: "14 Weeks" },
  { img: ba2,  stat: "+15 lbs", label: "−7% Body Fat",  weeks: "16 Weeks" },
  { img: oa1,  stat: "−28 lbs", label: "Fat Loss",      weeks: "13 Weeks" },
  { img: oa2,  stat: "−20 lbs", label: "Fat Loss",      weeks: "12 Weeks" },
  { img: oa3,  stat: "+16 lbs", label: "Muscle Gain",   weeks: "18 Weeks" },
  { img: oa5,  stat: "−22 lbs", label: "Fat Loss",      weeks: "15 Weeks" },
];

const MORE: Client[] = [
  { img: oa6,  stat: "−18 lbs", label: "Fat Loss",      weeks: "14 Weeks" },
  { img: ba3,  stat: "−10 lbs", label: "Recomp",        weeks: "11 Weeks" },
  { img: ba6,  stat: "−19 lbs", label: "Recomp",        weeks: "14 Weeks" },
];

function ClientCard({ c, i, onOpen }: { c: Client; i: number; onOpen: (c: Client) => void }) {
  return (
    <motion.div
      onClick={() => onOpen(c)}
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay: i * 0.09, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -6, scale: 1.03 }}
      className="group relative cursor-zoom-in overflow-hidden rounded-lg border border-white/10 transition-all duration-500 hover:border-[var(--red)]/60 hover:shadow-[0_20px_60px_rgba(0,0,0,0.8),0_0_40px_rgba(192,57,43,0.25)]"
      style={{ aspectRatio: i % 3 === 1 ? "3/4" : "2/3" }}
    >
      <img
        src={c.img}
        alt={`${c.label} transformation`}
        loading="lazy"
        decoding="async"
        className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
        draggable={false}
      />
      <div className="absolute inset-x-0 bottom-0 h-[55%] bg-gradient-to-t from-black/95 via-black/60 to-transparent" />

      {/* Weeks pill */}
      <div className="absolute left-3 top-3 rounded-full border border-[var(--red)]/40 bg-black/60 px-2.5 py-1 backdrop-blur-sm">
        <span className="font-syne text-[9px] font-bold uppercase tracking-[0.18em] text-[var(--red)]">
          {c.weeks}
        </span>
      </div>

      {/* Red inset border on hover */}
      <div
        className="pointer-events-none absolute inset-0 rounded-lg opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ boxShadow: "inset 0 0 0 1px rgba(192,57,43,0.6)" }}
      />

      {/* Stat + label */}
      <div className="absolute inset-x-0 bottom-0 p-4 md:p-5">
        <span
          className="block font-display leading-none text-[var(--red)]"
          style={{ fontSize: "clamp(28px, 3.5vw, 52px)" }}
        >
          {c.stat}
        </span>
        <span className="mt-1 block font-syne text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--white)]/70">
          {c.label}
        </span>
      </div>
    </motion.div>
  );
}

function PhotoModal({ c, onClose }: { c: Client; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
      className="fixed inset-0 z-[500] flex items-center justify-center bg-black/75 backdrop-blur-sm"
    >
      <motion.div
        initial={{ scale: 0.82, opacity: 0, y: 24 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.88, opacity: 0, y: 16 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        onClick={e => e.stopPropagation()}
        className="relative mx-4 overflow-hidden rounded-2xl border border-white/10 shadow-[0_40px_100px_rgba(0,0,0,0.9)]"
        style={{ maxWidth: "min(480px, 90vw)", maxHeight: "80vh" }}
      >
        <img
          src={c.img}
          alt={`${c.label} transformation`}
          loading="lazy"
          decoding="async"
          className="block w-full object-cover"
          style={{ maxHeight: "80vh" }}
          draggable={false}
        />
        <div className="absolute inset-x-0 bottom-0 h-[45%] bg-gradient-to-t from-black/95 via-black/50 to-transparent" />

        {/* Weeks pill */}
        <div className="absolute left-4 top-4 rounded-full border border-[var(--red)]/50 bg-black/70 px-3 py-1.5 backdrop-blur-sm">
          <span className="font-syne text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--red)]">
            {c.weeks}
          </span>
        </div>

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-white/70 backdrop-blur-sm transition-colors hover:bg-[var(--red)] hover:text-white"
        >
          ✕
        </button>

        {/* Stat */}
        <div className="absolute inset-x-0 bottom-0 p-5">
          <span className="block font-display text-5xl leading-none text-[var(--red)]">{c.stat}</span>
          <span className="mt-1 block font-syne text-xs font-bold uppercase tracking-[0.18em] text-[var(--white)]/70">{c.label}</span>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function Gallery() {
  const [showAll, setShowAll] = useState(false);
  const [selected, setSelected] = useState<Client | null>(null);

  return (
    <section id="gallery" className="relative w-full overflow-hidden bg-[var(--black)] pt-11 pb-16 md:pt-14 md:pb-20">

      {/* Background glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{
          width: "60vw", height: "60vw",
          background: "radial-gradient(ellipse, rgba(192,57,43,0.07) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-6 md:px-16">

        {/* Header */}
        <div className="mb-16">
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-syne text-xs font-bold uppercase tracking-[0.3em] text-[var(--red)]"
          >
            Client Gallery
          </motion.p>

          <div className="mt-5">
            {["TRANSFORMATIONS", "THAT SPEAK."].map((line, i) => (
              <motion.h2
                key={line}
                initial={{ y: 80, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className={`block font-display leading-[0.88] ${i === 1 ? "text-[var(--red)]" : "text-[var(--white)]"}`}
                style={{ fontSize: "clamp(44px, 6.5vw, 100px)" }}
              >
                {line}
              </motion.h2>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mt-6 max-w-md text-sm leading-relaxed text-[var(--white)]/50"
          >
            Every transformation below is a real GoodLife client. No filters, no tricks — just consistent work and the right plan.
          </motion.p>
        </div>

        {/* Main 6 photos */}
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-5">
          {MAIN.map((c, i) => <ClientCard key={i} c={c} i={i} onOpen={setSelected} />)}
        </div>

        {/* Expandable "View All" section */}
        <AnimatePresence>
          {showAll && (
            <motion.div
              key="more"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden"
            >
              <div className="mt-3 grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-5">
                {MORE.map((c, i) => <ClientCard key={i} c={c} i={i} onOpen={setSelected} />)}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Photo modal */}
        <AnimatePresence>
          {selected && <PhotoModal c={selected} onClose={() => setSelected(null)} />}
        </AnimatePresence>

        {/* View All / Collapse button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-10 flex justify-center"
        >
          <motion.button
            onClick={() => setShowAll(v => !v)}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="group relative overflow-hidden rounded-xl border border-[var(--red)]/50 bg-transparent px-8 py-4 font-display text-lg tracking-widest text-[var(--white)] transition-all duration-300 hover:border-[var(--red)] hover:bg-[var(--red)]/10"
          >
            <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            <span className="relative flex items-center gap-3">
              {showAll ? "SHOW LESS" : "VIEW ALL RESULTS"}
              <span className={`inline-block transition-transform duration-300 ${showAll ? "rotate-180" : ""}`}>↓</span>
            </span>
          </motion.button>
        </motion.div>


      </div>
    </section>
  );
}
