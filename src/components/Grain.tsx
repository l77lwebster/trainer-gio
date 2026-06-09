export function Grain() {
  return (
    <svg
      className="pointer-events-none fixed inset-0 z-[100] h-full w-full"
      style={{ opacity: 0.03 }}
      aria-hidden
    >
      <filter id="grain-noise">
        <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect width="100%" height="100%" filter="url(#grain-noise)" />
    </svg>
  );
}
