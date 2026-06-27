import { useEffect } from "react";
import { motion } from "framer-motion";

export function ThankYou() {
  useEffect(() => {
    if (typeof window !== "undefined" && typeof (window as any).gtag === "function") {
      (window as any).gtag("config", "AW-18264003949", {
        page_path: "/thank-you",
      });
    }
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[var(--black)] px-6 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col items-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 16, delay: 0.15 }}
          className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-[var(--red)] text-4xl"
        >
          ⚡
        </motion.div>

        <h1
          className="mt-8 font-display text-[var(--red)]"
          style={{ fontSize: "clamp(52px, 8vw, 100px)", lineHeight: 1 }}
        >
          LET'S GO!
        </h1>

        <p className="mt-6 max-w-md text-sm leading-relaxed text-[var(--white)]/60">
          Your message is in. I'll reach out within 24 hours to schedule your free consultation. Get ready — your transformation starts now.
        </p>

        <motion.a
          href="/"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="mt-10 rounded-full border border-[var(--red)]/40 px-8 py-3 font-syne text-xs font-bold uppercase tracking-[0.2em] text-[var(--white)]/60 transition-colors hover:border-[var(--red)] hover:text-[var(--white)]"
        >
          Back to site
        </motion.a>
      </motion.div>
    </main>
  );
}
