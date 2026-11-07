/**
 * Paymama motion core — "Direction in Motion".
 * Up/right = sending · down/left = receiving · rotate/swap = exchange.
 * Calm, precise, never bouncy. Only transform + opacity (plus clip-path where noted).
 */
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { CustomEase } from "gsap/CustomEase";
import { lenis } from "./smooth";

/* ───────── tokens ───────── */
export const T = { micro: 0.15, fast: 0.25, base: 0.4, section: 0.6, hero: 1.1 } as const;
export const E = { standard: "pm-standard", enter: "pm-enter", exit: "pm-exit" } as const;
export const COLORS = { blue: "#028CD4", green: "#8DC911", red: "#E82D2D", yellow: "#F5C518" } as const;

/** Mutable environment, refreshed by gsap.matchMedia in animations.ts */
export const env = { mobile: false, fine: true, reduced: false };

export const dist = () => (env.mobile ? 16 : 24);
export const each = () => (env.mobile ? 0.05 : 0.07);
export const startAt = () => "top 80%"; // 20% of the element is in view

let registered = false;
export function setupGsap() {
  if (registered) return;
  registered = true;
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, CustomEase);
  CustomEase.create(E.standard, "0.2,0,0,1");
  CustomEase.create(E.enter, "0.16,1,0.3,1");
  CustomEase.create(E.exit, "0.4,0,1,1");
}

/* will-change is applied just before an animation and removed after */
const wcOn = (t: gsap.TweenTarget) => gsap.set(t, { willChange: "transform, opacity" });

/* ───────── reveal: fade + rise, once ───────── */
export function reveal(
  el: gsap.TweenTarget,
  o: { delay?: number; y?: number; scale?: number; trigger?: Element; start?: string; duration?: number } = {},
) {
  const y = o.y ?? dist();
  const tl = gsap.fromTo(
    el,
    { opacity: 0, y, scale: o.scale ?? 1 },
    {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: o.duration ?? T.section,
      delay: o.delay ?? 0,
      ease: E.enter,
      paused: !!o.trigger,
      onStart: () => wcOn(el),
      onComplete: () => gsap.set(el, { clearProps: "transform,willChange" }),
    },
  );
  if (o.trigger) onceInView(o.trigger, () => tl.play(), o.start);
  return tl;
}

/* ───────── stagger: siblings, 70ms apart (max 6 per group) ───────── */
export function staggerIn(
  parent: Element,
  children: gsap.TweenTarget,
  o: { each?: number; y?: number; x?: number; start?: string; scale?: number; delay?: number } = {},
) {
  const step = o.each ?? each();
  const kids = gsap.utils.toArray<Element>(children, parent);
  const tl = gsap.fromTo(
    kids,
    { opacity: 0, y: o.y ?? (o.x ? 0 : dist()), x: o.x ?? 0, scale: o.scale ?? 1 },
    {
      opacity: 1,
      y: 0,
      x: 0,
      scale: 1,
      duration: T.section,
      ease: E.enter,
      delay: o.delay ?? 0,
      paused: true,
      stagger: (i: number) => Math.min(i, 5) * step, // cap at 6 steps
      onStart: () => wcOn(kids),
      onComplete: () => gsap.set(kids, { clearProps: "transform,willChange" }),
    },
  );
  onceInView(parent, () => tl.play(), o.start);
  return tl;
}

/* ───────── trigger once, never replay ───────── */
export function onceInView(el: Element, cb: () => void, start: string = startAt()) {
  return ScrollTrigger.create({ trigger: el, start, once: true, onEnter: cb });
}

/* ───────── countUp: tabular, ease-out ───────── */
export function formatNum(n: number, decimals = 0) {
  return n.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
}
export function countUp(
  el: Element,
  o: { to: number; from?: number; duration?: number; decimals?: number; prefix?: string; suffix?: string; delay?: number; paused?: boolean },
) {
  const d = o.decimals ?? 0;
  const proxy = { v: o.from ?? 0 };
  const write = () => (el.textContent = `${o.prefix ?? ""}${formatNum(proxy.v, d)}${o.suffix ?? ""}`);
  write();
  return gsap.to(proxy, {
    v: o.to,
    duration: o.duration ?? 1.2,
    delay: o.delay ?? 0,
    ease: "power3.out",
    paused: o.paused,
    onUpdate: write,
    onComplete: () => {
      proxy.v = o.to;
      write();
    },
  });
}

/* ───────── drawPath: stroke-dashoffset ───────── */
export function prepPath(p: SVGGeometryElement) {
  const len = p.getTotalLength();
  gsap.set(p, { strokeDasharray: len, strokeDashoffset: len });
  return len;
}
export function drawPath(p: SVGGeometryElement, o: { duration?: number; delay?: number; ease?: string; paused?: boolean } = {}) {
  prepPath(p);
  return gsap.to(p, { strokeDashoffset: 0, duration: o.duration ?? 1.2, delay: o.delay ?? 0, ease: o.ease ?? E.standard, paused: o.paused });
}

/* ───────── float: gentle sine loop, pauses off-screen ───────── */
export function float(el: Element, o: { amp?: number; dur?: number; after?: number } = {}) {
  const dur = o.dur ?? 6;
  const tw = gsap.fromTo(el, { y: -(o.amp ?? 6) }, { y: o.amp ?? 6, duration: dur, ease: "sine.inOut", yoyo: true, repeat: -1, paused: true });
  tw.time(dur / 2); // begin at the midpoint so there is no jump from rest
  let ready = !o.after;
  let active = false;
  const sync = () => (ready && active ? tw.play() : tw.pause());
  if (o.after) gsap.delayedCall(o.after, () => { ready = true; sync(); });
  ScrollTrigger.create({ trigger: el, start: "top bottom", end: "bottom top", onToggle: (s) => { active = s.isActive; sync(); } });
  return tw;
}

/* ───────── loop that only runs while visible ───────── */
export function visibleLoop(trigger: Element, every: number, fn: () => void) {
  const call = gsap.delayedCall(every, function tick() {
    fn();
    call.restart(true);
  });
  call.pause();
  ScrollTrigger.create({ trigger, start: "top bottom", end: "bottom top", onToggle: (s) => (s.isActive ? call.resume() : call.pause()) });
  return call;
}

/* ───────── marquee: constant px/s, seamless (track holds 2 copies) ───────── */
export function marquee(track: HTMLElement, pxPerSec: number) {
  const half = track.scrollWidth / 2;
  track.style.setProperty("--marquee-dur", `${(half / pxPerSec).toFixed(2)}s`);
  track.dataset.run = "1";
}

/* ───────── mask-reveal: words (or lines) rise out of a clip ───────── */
export function splitWords(el: HTMLElement) {
  if (el.dataset.split) return el.querySelectorAll<HTMLElement>(".w-in");
  el.dataset.split = "1";
  const walk = (node: Node) => {
    Array.from(node.childNodes).forEach((c) => {
      if (c.nodeType === 3) {
        const frag = document.createDocumentFragment();
        (c.textContent ?? "").split(/(\s+)/).forEach((part) => {
          if (!part) return;
          if (/^\s+$/.test(part)) return frag.append(" ");
          const w = document.createElement("span");
          w.className = "w";
          const i = document.createElement("span");
          i.className = "w-in";
          i.textContent = part;
          w.append(i);
          frag.append(w);
        });
        c.replaceWith(frag);
      } else if (c.nodeType === 1 && !(c as HTMLElement).classList.contains("hl-bar")) walk(c);
    });
  };
  walk(el);
  return el.querySelectorAll<HTMLElement>(".w-in");
}

export function maskReveal(
  el: HTMLElement,
  o: { by?: "words" | "lines"; step?: number; duration?: number; delay?: number; trigger?: boolean; start?: string } = {},
) {
  const words = splitWords(el);
  gsap.set(el, { visibility: "visible" });
  let delays: number[];
  if (o.by === "lines") {
    const tops: number[] = [];
    delays = Array.from(words).map((w) => {
      const t = Math.round((w.parentElement as HTMLElement).offsetTop);
      if (!tops.includes(t)) tops.push(t);
      return tops.indexOf(t) * (o.step ?? 0.09);
    });
  } else delays = Array.from(words).map((_, i) => i * (o.step ?? each()));
  const tl = gsap.fromTo(
    words,
    { yPercent: 110 },
    { yPercent: 0, duration: o.duration ?? 0.9, ease: E.enter, delay: o.delay ?? 0, paused: !!o.trigger, stagger: (i: number) => delays[i] },
  );
  if (o.trigger) onceInView(el, () => tl.play(), o.start);
  return tl;
}

/* ───────── confetti: n pieces fall once ───────── */
export function confetti(host: HTMLElement, n = 12, o: { duration?: number; spread?: number; height?: number; colors?: string[] } = {}) {
  if (env.reduced) return;
  const colors = o.colors ?? [COLORS.blue, COLORS.green, COLORS.yellow];
  for (let i = 0; i < n; i++) {
    const p = document.createElement("i");
    p.className = "confetti";
    p.style.background = colors[i % colors.length];
    p.style.left = `${50 + (Math.random() - 0.5) * (o.spread ?? 80)}%`;
    host.append(p);
    gsap.fromTo(
      p,
      { y: -10, x: 0, rotate: 0, opacity: 1 },
      {
        y: (o.height ?? 220) * (0.7 + Math.random() * 0.5),
        x: (Math.random() - 0.5) * 80,
        rotate: (Math.random() - 0.5) * 540,
        opacity: 0,
        duration: o.duration ?? 1.2,
        ease: "power1.in",
        onComplete: () => p.remove(),
      },
    );
  }
}

/* ───────── smooth in-page scroll with sticky-nav offset ───────── */
export function smoothTo(hash: string) {
  const el = document.querySelector(hash);
  if (!el) return;
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduced) return el.scrollIntoView();
  if (lenis) {
    lenis.scrollTo(el as HTMLElement, { offset: -64, duration: 0.6, easing: (t) => 1 - Math.pow(1 - t, 4) });
    history.replaceState(null, "", hash);
    return;
  }
  gsap.to(window, { duration: 0.6, ease: E.standard, scrollTo: { y: el, offsetY: 64 } });
  history.replaceState(null, "", hash);
}

export const isReduced = () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
