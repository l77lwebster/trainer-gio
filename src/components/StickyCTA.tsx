import { motion, useAnimation, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export function StickyCTA() {
  const btnControls = useAnimation();
  const [pastHero, setPastHero] = useState(false);

  const scrollToBooking = () =>
    document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" });

  // Show mobile bar as soon as the hero's top button (~15vh) scrolls off screen
  useEffect(() => {
    const onScroll = () => {
      setPastHero(window.scrollY > window.innerHeight * 0.15);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    let alive = true;
    const run = async () => {
      while (alive) {
        await new Promise(r => setTimeout(r, 3000));
        await btnControls.start({
          scale: 1.1,
          boxShadow: "0 0 0 10px rgba(192,57,43,0.3), 0 0 36px 8px rgba(192,57,43,0.25)",
          transition: { duration: 0.28, ease: "easeOut" },
        });
        await btnControls.start({
          scale: 0.93,
          boxShadow: "0 0 0 3px rgba(192,57,43,0.55), 0 0 10px 2px rgba(192,57,43,0.3)",
          transition: { duration: 0.13, ease: "easeIn" },
        });
        await btnControls.start({
          scale: 1,
          boxShadow: "0 4px 20px rgba(0,0,0,0.35)",
          transition: { duration: 0.22, ease: "easeOut" },
        });
      }
    };
    run();
    return () => { alive = false; };
  }, [btnControls]);

  return (
    <>
      {/* ── Desktop ─────────────────────────────────────────── */}
      <div
        className="anim-slide-in-right fixed z-[200] hidden sm:block"
        style={{ top: "1.5rem", right: "1.5rem" }}
      >
        <motion.button
          animate={btnControls}
          initial={{ scale: 1, boxShadow: "0 4px 20px rgba(0,0,0,0.35)" }}
          onClick={scrollToBooking}
          whileHover={{ scale: 1.05, boxShadow: "0 0 24px rgba(192,57,43,0.45)" }}
          className="rounded-full bg-[var(--red)] px-5 py-3 font-syne text-xs font-bold uppercase tracking-[0.18em] text-[var(--white)] transition-colors duration-200 hover:bg-[var(--red-dk)] md:px-6 md:py-3.5 md:text-sm"
        >
          Book Free Consult
        </motion.button>
      </div>

      {/* ── Mobile bottom bar — slides up after hero scrolls out of view ── */}
      <AnimatePresence>
        {pastHero && (
          <motion.button
            key="mobile-cta"
            onClick={scrollToBooking}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-x-0 bottom-0 z-[200] block bg-[var(--red)] py-4 text-center font-syne text-sm font-bold uppercase tracking-[0.18em] text-[var(--white)] shadow-2xl sm:hidden"
          >
            Book Free Consult
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
