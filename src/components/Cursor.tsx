"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";

/** Small blue dot that grows into a ring over interactive elements. Desktop / fine pointer only. */
export function Cursor() {
  const el = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced || !el.current) return;
    const c = el.current;
    document.documentElement.classList.add("has-cursor");
    const x = gsap.quickTo(c, "x", { duration: 0.12, ease: "power3.out" });
    const y = gsap.quickTo(c, "y", { duration: 0.12, ease: "power3.out" });
    const move = (e: PointerEvent) => {
      x(e.clientX); y(e.clientY);
      c.classList.add("on");
      c.classList.toggle("ring", !!(e.target as Element)?.closest?.("a, button, input, [role=button], [data-cursor]"));
    };
    const leave = () => c.classList.remove("on");
    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerleave", leave);
    return () => {
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerleave", leave);
      document.documentElement.classList.remove("has-cursor");
    };
  }, []);
  return <div className="cursor" ref={el} aria-hidden="true" />;
}
