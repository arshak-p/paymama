"use client";
import { useEffect, useRef, useState } from "react";
import { Logo } from "./Logo";
import { ArrowRight } from "./Icons";
import { smoothTo } from "@/lib/motion";
import { lenis } from "@/lib/smooth";

const LINKS = [
  ["Features", "#features"],
  ["How it works", "#how"],
  ["Security", "#security"],
  ["FAQ", "#faq"],
] as const;

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  const last = useRef({ y: 0, t: 0 });

  /* frosted + compact after 80px; hide on fast scroll down, return on scroll up */
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const now = performance.now();
      const dy = y - last.current.y;
      const v = Math.abs(dy) / Math.max(now - last.current.t, 1); // px per ms
      setScrolled(y > 80);
      if (dy < 0 || y < 120) setHidden(false);
      else if (dy > 0 && v > 1.1 && y > 200) setHidden(true); // fast scroll down only
      last.current = { y, t: now };
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* scroll-spy */
  useEffect(() => {
    const secs = LINKS.map(([, h]) => document.querySelector(h)).filter(Boolean) as Element[];
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && setActive("#" + e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    secs.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    if (open) lenis?.stop(); else lenis?.start();
  }, [open]);

  const go = (e: React.MouseEvent, h: string) => {
    e.preventDefault();
    setOpen(false);
    setHidden(false);
    smoothTo(h);
  };

  return (
    <>
      <header className="nav" data-nav data-scrolled={scrolled} data-hidden={hidden && !open}>
        <div className="nav__in wrap" data-h data-nav-in>
          <a href="#top" aria-label="Paymama home" onClick={(e) => go(e, "#top")}><Logo /></a>
          <nav className="nav__links" aria-label="Primary">
            {LINKS.map(([n, h]) => (
              <a key={h} href={h} className="ulink" aria-current={active === h} onClick={(e) => go(e, h)}>{n}</a>
            ))}
          </nav>
          <a href="#download" className="btn btn--white cta" onClick={(e) => go(e, "#download")}>
            <ArrowRight /><span>Get the app</span>
          </a>
          <a href="#download" className="btn btn--white cta-m" onClick={(e) => go(e, "#download")}>Get the app</a>
          <button className="burger" aria-label="Menu" aria-expanded={open} onClick={() => setOpen((o) => !o)}>
            <i /><i /><i />
          </button>
        </div>
      </header>
      <div className="sheet" data-open={open} aria-hidden={!open}>
        {LINKS.map(([n, h], i) => (
          <a key={h} href={h} style={{ "--i": i } as React.CSSProperties} onClick={(e) => go(e, h)} tabIndex={open ? 0 : -1}>{n}</a>
        ))}
        <a href="#download" className="btn btn--white" onClick={(e) => go(e, "#download")} tabIndex={open ? 0 : -1}>Get the app</a>
      </div>
    </>
  );
}
