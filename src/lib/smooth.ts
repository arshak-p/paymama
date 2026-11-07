/**
 * Site-wide smooth scroll (Lenis), driven by the GSAP ticker so ScrollTrigger stays in sync.
 * Desktop/trackpad only: touch devices keep native momentum scrolling. Off for reduced motion.
 */
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

export let lenis: Lenis | null = null;

export function startSmooth(): () => void {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return () => {};
  const l = new Lenis({
    duration: 1.1,
    easing: (t) => 1 - Math.pow(1 - t, 4), // expo-ish out: calm, no overshoot
    smoothWheel: true,
    anchors: false,
  });
  lenis = l;
  const onScroll = () => ScrollTrigger.update();
  l.on("scroll", onScroll);
  const tick = (time: number) => l.raf(time * 1000);
  gsap.ticker.add(tick);
  gsap.ticker.lagSmoothing(0);
  return () => {
    gsap.ticker.remove(tick);
    l.off("scroll", onScroll);
    l.destroy();
    lenis = null;
  };
}
