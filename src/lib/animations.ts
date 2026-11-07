/**
 * Paymama page choreography. Markup carries data-attributes; this file wires them up.
 * Content is fully visible without JS (boot CSS only hides things when html.mo/.rm is set).
 */
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  COLORS, E, T, confetti, countUp, dist, each, env, float, formatNum, marquee, maskReveal, onceInView,
  prepPath, reveal, setupGsap, staggerIn, startAt, visibleLoop,
} from "./motion";

const $ = <T extends Element = HTMLElement>(s: string, r: ParentNode = document) => r.querySelector<T>(s);
const $$ = <T extends Element = HTMLElement>(s: string, r: ParentNode = document) => Array.from(r.querySelectorAll<T>(s));
const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));

export function initMotion(): () => void {
  setupGsap();
  const cleanups: Array<() => void> = [];
  const mm = gsap.matchMedia();
  mm.add(
    { rm: "(prefers-reduced-motion: reduce)", mobile: "(max-width: 767px)", fine: "(hover: hover) and (pointer: fine)" },
    (ctx) => {
      const c = ctx.conditions as { rm: boolean; mobile: boolean; fine: boolean };
      env.reduced = c.rm; env.mobile = c.mobile; env.fine = c.fine;
      document.documentElement.dataset.ready = "1";
      if (c.rm) return reduced();
      build();
      return () => cleanups.splice(0).forEach((f) => f());
    },
  );

  /* ─────────── reduced motion: opacity fades only (200ms), final numbers, no loops ─────────── */
  function reduced() {
    gsap.set("[data-mask]", { visibility: "visible" });
    ScrollTrigger.batch("[data-reveal], [data-stagger] > *, [data-h], [data-eyebrow], [data-bento] > *, [data-srow], [data-badge], [data-step] h3, [data-step] p, [data-dl]", {
      start: "top 95%", once: true,
      onEnter: (b) => gsap.to(b, { opacity: 1, duration: 0.2, ease: "none" }),
    });
  }

  function build() {
    /* ticker */
    $$("[data-ticker]").forEach((t) => marquee(t, env.mobile ? 30 : 40));

    /* eyebrow: letter-space 20% → 8% while fading */
    $$("[data-eyebrow]").forEach((el) =>
      gsap.fromTo(el, { letterSpacing: "0.2em", opacity: 0 }, { letterSpacing: "0.08em", opacity: 1, duration: 0.5, ease: E.enter, scrollTrigger: { trigger: el, start: startAt(), once: true } }),
    );

    /* generic: mask headings, reveals, stagger groups */
    $$("[data-mask]:not([data-hero-h1])").forEach((el) =>
      maskReveal(el, { by: el.dataset.mask === "lines" ? "lines" : "words", step: el.dataset.mask === "lines" ? 0.09 : 0.07, trigger: true }),
    );
    $$("[data-reveal]").forEach((el) => reveal(el, { trigger: el }));
    $$("[data-stagger]").forEach((p) => {
      const a = parseFloat(p.dataset.stagger || "");
      staggerIn(p, ":scope > *", { each: env.mobile ? Math.min(a || 0.05, 0.05) : a || each() });
    });

    hero(); nav(); about(); features(); how(); appPreview(); security(); download();
  }

  /* ─────────── 2 + 3. page load, hero, ambient ─────────── */
  function hero() {
    const h1 = $("[data-hero-h1]")!;
    const tl = gsap.timeline({ delay: 0.1 });

    tl.fromTo("[data-nav-in]", { opacity: 0, y: -8 }, { opacity: 1, y: 0, duration: T.base, ease: E.enter }, 0);

    // Logo intro — first load only
    let first = true;
    try { first = !sessionStorage.getItem("pm-intro"); sessionStorage.setItem("pm-intro", "1"); } catch {}
    if (first) {
      tl.fromTo("[data-logo-up]", { y: 18, opacity: 0, rotate: 4 }, { y: 0, opacity: 1, rotate: 0, duration: 0.7, ease: E.enter }, 0.1)
        .fromTo("[data-logo-word]", { clipPath: "inset(0 100% 0 0)" }, { clipPath: "inset(0 0% 0 0)", duration: 0.55, ease: E.enter }, 0.65);
    }

    // Headline: words rise from a mask, then the green bar grows
    const words = maskReveal(h1, { step: 0.07, duration: 0.9, delay: 0.35 });
    const n = h1.querySelectorAll(".w-in").length;
    const landed = 0.35 + (n - 1) * 0.07 + 0.9;
    gsap.fromTo("[data-hl-bar]", { scaleX: 0 }, { scaleX: 1, duration: 0.6, ease: E.enter, delay: landed - 0.1 });
    gsap.fromTo("[data-hero-item]", { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.6, ease: E.enter, stagger: 0.08, delay: landed });
    void words;

    // Phone + circles
    const rise = env.mobile ? 40 : 60;
    gsap.fromTo("[data-hero-phone]", { opacity: 0, y: rise, rotate: 4 }, { opacity: 1, y: 0, rotate: 0, duration: 1.1, ease: E.enter, delay: 0.65 });
    gsap.fromTo("[data-circle]", { opacity: 0, scale: 0.85 }, { opacity: 1, scale: 1, duration: 1.2, ease: E.enter, delay: 0.8, stagger: 0.15 });

    // Balances count up, naira lines follow
    $$("[data-hero-count]").forEach((el) =>
      countUp(el, { to: parseFloat(el.dataset.count!), decimals: 2, duration: 1.2, delay: 1.1 }),
    );
    gsap.fromTo("[data-ngn]", { opacity: 0 }, { opacity: 1, duration: 0.5, delay: 2.4, ease: E.standard });

    // Chips: receiving = from the left, sub-account = from the right, rate = from below. Then float.
    const chipFrom: Record<string, gsap.TweenVars> = { left: { x: -40 }, right: { x: 40 }, up: { y: 30 } };
    $$("[data-chip]").forEach((chip, i) => {
      const at = 1.6 + i * 0.22;
      gsap.fromTo(chip, { opacity: 0, x: 0, y: 0, ...chipFrom[chip.dataset.chip!] }, { opacity: 1, x: 0, y: 0, duration: 0.8, ease: E.enter, delay: at });
      float(chip.firstElementChild!, { amp: 6, dur: 5 + i * 1, after: at + 0.8 });
    });

    // Rate chip ticks every 6s: vertical roll + 1px green flash
    const rate = $("[data-rate]");
    if (rate) {
      let hi = false;
      visibleLoop(rate, 6, () => {
        hi = !hi;
        const s = rate.firstElementChild as HTMLElement;
        gsap.timeline()
          .to(s, { yPercent: -100, opacity: 0, duration: 0.2, ease: E.exit })
          .add(() => { s.textContent = hi ? "₦1,541" : "₦1,540"; })
          .fromTo(s, { yPercent: 100, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.3, ease: E.enter })
          .fromTo(rate, { boxShadow: "0 0 0 1px rgba(141,201,17,1)" }, { boxShadow: "0 0 0 1px rgba(141,201,17,0)", duration: 0.6, ease: E.standard }, "<");
      });
    }

    // Mouse parallax (desktop only): phone .02, circles .04, chips .06 — max 12px, 150ms smoothing
    if (env.fine) {
      const stage = $(".hero")!;
      const pars = $$("[data-par]").map((el) => ({
        k: parseFloat(el.dataset.par!),
        x: gsap.quickTo(el, "x", { duration: 0.15, ease: "power2.out" }),
        y: gsap.quickTo(el, "y", { duration: 0.15, ease: "power2.out" }),
      }));
      const move = (e: MouseEvent) => {
        const r = stage.getBoundingClientRect();
        const dx = e.clientX - (r.left + r.width / 2), dy = e.clientY - (r.top + r.height / 2);
        pars.forEach((p) => { p.x(clamp(dx * p.k, -12, 12)); p.y(clamp(dy * p.k, -12, 12)); });
      };
      stage.addEventListener("mousemove", move);
      cleanups.push(() => stage.removeEventListener("mousemove", move));
    }
  }

  /* ─────────── 4. nav: the link underline / scroll-spy / hide logic lives in <Nav/> ─────────── */
  function nav() {
    // Pause the ticker-style ambient loops while the tab is hidden (rAF already sleeps; this stops CSS loops too)
    const vis = () => document.documentElement.classList.toggle("tab-hidden", document.hidden);
    document.addEventListener("visibilitychange", vis);
    cleanups.push(() => document.removeEventListener("visibilitychange", vis));
  }

  /* ─────────── 6. about: icon micro-animations ─────────── */
  function about() {
    const wrap = $("[data-about-cards]");
    if (!wrap) return;
    const cards = $$(".card", wrap);
    onceInView(wrap, () => {
      const d = (i: number) => 0.25 + i * 0.09;
      gsap.fromTo($(".ic-a", cards[0])!, { x: -6, opacity: 0.4 }, { x: 0, opacity: 1, duration: 0.3, delay: d(0), ease: E.enter });
      gsap.fromTo($(".ic-b", cards[0])!, { x: 6, opacity: 0.4 }, { x: 0, opacity: 1, duration: 0.3, delay: d(0), ease: E.enter });
      gsap.fromTo($(".ic-layers", cards[1])!, { y: -9, opacity: 0 }, { y: 0, opacity: 1, duration: 0.3, delay: d(1), ease: E.enter });
      gsap.fromTo($(".ic-shackle", cards[2])!, { y: -4 }, { y: 0, duration: 0.3, delay: d(2), ease: E.enter });
    });
  }

  /* ─────────── 7. features bento ─────────── */
  function features() {
    const cards = $$("[data-bento] > .bcard");
    ScrollTrigger.batch(cards, {
      start: "top 88%", once: true,
      onEnter: (b) =>
        gsap.fromTo(b, { opacity: 0, y: dist(), scale: 0.98 }, {
          opacity: 1, y: 0, scale: 1, duration: T.section, ease: E.enter, stagger: (i) => Math.min(i, 5) * each(),
          onComplete: () => gsap.set(b, { clearProps: "transform,willChange" }),
        }),
    });
    const once = (name: string, fn: (card: HTMLElement) => void) => {
      const card = $(`[data-demo="${name}"]`);
      if (card) ScrollTrigger.create({ trigger: card, start: env.mobile ? "top 50%" : "top 60%", once: true, onEnter: () => fn(card) });
    };

    // Dark cards: inner highlight follows the cursor
    if (env.fine) $$(".bcard--dark").forEach((c) => {
      const mv = (e: MouseEvent) => { const r = c.getBoundingClientRect(); c.style.setProperty("--mx", `${e.clientX - r.left}px`); c.style.setProperty("--my", `${e.clientY - r.top}px`); };
      c.addEventListener("mousemove", mv);
      cleanups.push(() => c.removeEventListener("mousemove", mv));
    });

    // Main + Float
    const bal = $("[data-demo=balances]")!;
    const counts = $$("[data-bal]", bal).map((el) => countUp(el, { to: parseFloat(el.dataset.bal!), decimals: 2, prefix: "$", duration: 1.2, paused: true }));
    gsap.set($("[data-divider]", bal)!, { scaleX: 0 });
    once("balances", () => { counts.forEach((t) => t.play()); gsap.to($("[data-divider]", bal)!, { scaleX: 1, duration: 0.8, ease: E.standard }); });

    // Pockets
    const pk = $("[data-demo=pockets]")!;
    gsap.set($$("[data-pk]", pk), { opacity: 0, x: 40 });
    gsap.set($$("[data-fill]", pk), { scaleX: 0, transformOrigin: "left" });
    once("pockets", () => {
      $$("[data-pk]", pk).forEach((row, i) => {
        gsap.to(row, { opacity: 1, x: 0, duration: 0.6, ease: E.enter, delay: i * 0.18 });
        gsap.to($("[data-fill]", row)!, { scaleX: 1, duration: 0.6, ease: E.standard, delay: i * 0.18 + 0.25 });
      });
    });

    // Transfer: up arrow flies out top-right while down arrow lands from top-left (12px, 4s loop while in view)
    const tr = $("[data-demo=transfer]")!;
    const up = $("[data-xup]", tr)!, dn = $("[data-xdn]", tr)!;
    const loop = gsap.timeline({ repeat: -1, paused: true })
      .to(dn, { opacity: 0, duration: 0.3, ease: E.exit }, 0.2)
      .set(dn, { x: -12, y: -12 }, 0.5)
      .to(up, { x: 12, y: -12, opacity: 0, duration: 0.6, ease: E.exit }, 0.6)
      .to(dn, { x: 0, y: 0, opacity: 1, duration: 0.6, ease: E.enter }, 0.6)
      .set(up, { x: 0, y: 0 }, 1.5)
      .to(up, { opacity: 1, duration: 0.5, ease: E.standard }, 1.5)
      .to({}, { duration: 0.1 }, 3.9);
    ScrollTrigger.create({ trigger: tr, start: "top 70%", end: "bottom top", onToggle: (s) => (s.isActive ? loop.play() : loop.pause()) });

    // Virtual card: 3D tilt + sheen on hover (desktop) · tap-to-flip (touch/mobile) · digit roll on reveal
    const vc = $("[data-vcard]")!, wrap = $("[data-tilt-wrap]")!, sheen = $("[data-sheen]")!, digits = $("[data-digits]")!;
    const sweep = () => gsap.fromTo(sheen, { xPercent: 0 }, { xPercent: 520, duration: 1.2, ease: E.standard });
    if (env.fine) {
      vc.removeAttribute("tabindex"); vc.removeAttribute("role");
      const rx = gsap.quickTo(vc, "rotationX", { duration: 0.3, ease: "power2.out" });
      const ry = gsap.quickTo(vc, "rotationY", { duration: 0.3, ease: "power2.out" });
      const mv = (e: MouseEvent) => { const r = wrap.getBoundingClientRect(); ry(((e.clientX - r.left) / r.width - 0.5) * 16); rx(-((e.clientY - r.top) / r.height - 0.5) * 16); };
      const enter = () => sweep();
      const leave = () => { rx(0); ry(0); };
      wrap.addEventListener("mousemove", mv); wrap.addEventListener("mouseenter", enter); wrap.addEventListener("mouseleave", leave);
      cleanups.push(() => { wrap.removeEventListener("mousemove", mv); wrap.removeEventListener("mouseenter", enter); wrap.removeEventListener("mouseleave", leave); });
    } else {
      const flip = () => vc.classList.toggle("flip");
      const key = (e: KeyboardEvent) => (e.key === "Enter" || e.key === " ") && (e.preventDefault(), flip());
      vc.addEventListener("click", flip); vc.addEventListener("keydown", key);
      cleanups.push(() => { vc.removeEventListener("click", flip); vc.removeEventListener("keydown", key); vc.classList.remove("flip"); });
    }
    once("card", () => {
      sweep();
      const p = { v: 0 };
      gsap.to(p, { v: 1, duration: 0.9, ease: E.standard, onUpdate: () => {
        digits.textContent = "4471".split("").map((d, i) => (p.v > (i + 1) / 4 ? d : String(Math.floor(Math.random() * 10)))).join("");
      }, onComplete: () => { digits.textContent = "4471"; } });
    });

    // QR assembles square-by-square, then a scan line sweeps once
    const qr = $("[data-qr]")!;
    const sq = $$("i:not(.o)", qr);
    gsap.set(sq, { opacity: 0, scale: 0.4 });
    once("qr", () => {
      gsap.to(sq, { opacity: 1, scale: 1, duration: 0.3, ease: E.enter, stagger: { amount: 0.6, from: "random" } });
      gsap.fromTo($("[data-scan]", qr)!, { y: 0, opacity: 1 }, { y: qr.clientHeight - 4, duration: 0.9, ease: "sine.inOut", delay: 0.9, onComplete: () => { gsap.to($("[data-scan]", qr)!, { opacity: 0, duration: 0.2 }); } });
    });

    // Convert: rate counts up, swap rotates 180° once
    const rc = $("[data-rate-count]")!;
    const rcT = countUp(rc, { to: 1540, duration: 1.2, paused: true });
    once("convert", () => { rcT.play(); gsap.fromTo($("[data-swap]")!, { rotate: 0 }, { rotate: 180, duration: 0.8, ease: E.standard, delay: 0.3 }); });

    // Invest: line draws, area fades in, a dot travels to the end and pulses once
    const line = $<SVGPathElement>("[data-line]")!, dot = $<SVGCircleElement>("[data-dot]")!, area = $("[data-area]")!;
    const len = prepPath(line);
    gsap.set(area, { opacity: 0 });
    const p0 = line.getPointAtLength(0);
    dot.setAttribute("cx", String(p0.x)); dot.setAttribute("cy", String(p0.y));
    once("invest", () => {
      const pr = { v: 0 };
      gsap.to(line, { strokeDashoffset: 0, duration: 1.2, ease: E.standard });
      gsap.to(pr, { v: 1, duration: 1.2, ease: E.standard, onUpdate: () => { const pt = line.getPointAtLength(pr.v * len); dot.setAttribute("cx", String(pt.x)); dot.setAttribute("cy", String(pt.y)); } });
      gsap.to(area, { opacity: 1, duration: 0.6, delay: 1.0, ease: E.standard });
      gsap.fromTo(dot, { scale: 1 }, { scale: 1.9, duration: 0.3, yoyo: true, repeat: 1, delay: 1.2, ease: E.standard });
    });

    // Schedule: dates light up one by one (60ms), then active dates pop
    const dates = $$("[data-date]");
    gsap.set(dates, { opacity: 0.3 });
    once("schedule", () => {
      gsap.to(dates, { opacity: 1, duration: 0.3, stagger: 0.06, ease: E.standard });
      gsap.to($$("[data-date].a, [data-date].b"), { keyframes: { scale: [1, 1.12, 1] }, duration: 0.4, delay: 0.06 * dates.length + 0.1, ease: E.standard });
    });

    // Vault: document tabs are pulled up from behind the card edge
    const docs = $$("[data-doc]");
    gsap.set(docs, { y: 90, opacity: 0 });
    once("vault", () => gsap.to(docs, { y: 0, opacity: 1, duration: 0.7, ease: E.enter, stagger: 0.08 }));
  }

  /* ─────────── 8. how it works ─────────── */
  function how() {
    const steps = $("[data-steps]");
    if (!steps) return;
    const line = $<SVGLineElement>("[data-conn]", steps)!;
    const badges = $$("[data-badge]", steps), cards = $$("[data-step]", steps);
    const layout = () => {
      const sr = steps.getBoundingClientRect();
      const pt = (b: HTMLElement) => { const r = b.getBoundingClientRect(); return { x: r.left - sr.left + r.width / 2, y: r.top - sr.top + r.height / 2 }; };
      const a = pt(badges[0]), z = pt(badges[2]);
      line.setAttribute("x1", String(a.x)); line.setAttribute("y1", String(a.y)); line.setAttribute("x2", String(z.x)); line.setAttribute("y2", String(z.y));
    };
    layout();
    ScrollTrigger.addEventListener("refresh", layout);
    cleanups.push(() => ScrollTrigger.removeEventListener("refresh", layout));
    gsap.set(line, { strokeDasharray: 1, strokeDashoffset: 1 });
    const tl = gsap.timeline({ paused: true });
    tl.to(line, { strokeDashoffset: 0, duration: 1, ease: E.standard }, 0);
    cards.forEach((card, i) => {
      tl.fromTo(badges[i], { scale: 0.6, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.3, ease: E.enter }, 0.1 + i * 0.2)
        .fromTo($$("h3, p", card), { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.6, ease: E.enter, stagger: 0.06 }, 0.25 + i * 0.2);
    });
    onceInView(steps, () => tl.play(), "top 75%");
  }

  /* ─────────── 9. app preview band ─────────── */
  function appPreview() {
    const band = $("[data-band]");
    if (!band) return;
    const r = env.mobile ? 28 : 40;
    gsap.fromTo(band, { clipPath: `inset(6% 6% 6% 6% round ${r}px)` }, { clipPath: `inset(0% 0% 0% 0% round ${r}px)`, duration: 0.8, ease: E.enter, scrollTrigger: { trigger: band, start: "top 85%", once: true } });

    const [l, c, rt] = ["side-l", "center", "side-r"].map((k) => $(`[data-pp=${k}]`)!);
    const sx = env.mobile ? 20 : 40;
    const chart = $<SVGPathElement>("[data-xchart]")!, tick = $<SVGPathElement>("[data-tick]")!, tile = $("[data-tick-tile]")!, receipt = $("[data-receipt]")!;
    prepPath(chart); prepPath(tick);
    const tl = gsap.timeline({ paused: true });
    tl.fromTo(c, { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 0.9, ease: E.enter }, 0)
      .fromTo(l, { opacity: 0, x: -sx, rotate: 3 }, { opacity: 1, x: 0, rotate: 0, duration: 0.9, ease: E.enter }, 0.12)
      .fromTo(rt, { opacity: 0, x: sx, rotate: -3 }, { opacity: 1, x: 0, rotate: 0, duration: 0.9, ease: E.enter }, 0.12)
      .to(chart, { strokeDashoffset: 0, duration: 1.2, ease: E.standard }, 0.7)
      .to(tick, { strokeDashoffset: 0, duration: 0.5, ease: E.standard }, 1.0)
      .fromTo(tile, { scale: 0.85 }, { scale: 1, duration: 0.7, ease: "back.out(1.4)" }, 1.0) // the one soft spring
      .add(() => confetti(receipt, 12, { spread: 70, height: 230 }), 1.3)
      .fromTo("[data-plabel]", { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.5, ease: E.enter, stagger: 0.08 }, 1.7);
    onceInView(band, () => tl.play(), "top 55%");

    // Scroll-linked parallax (scrubbed, max 30px; halved on mobile)
    const k = env.mobile ? 0.5 : 1;
    const [pl, pc, pr] = $$("[data-pwrap]");
    gsap.to(pl, { x: -30 * k, ease: "none", scrollTrigger: { trigger: band, start: "top bottom", end: "bottom top", scrub: 0.6 } });
    gsap.to(pr, { x: 30 * k, ease: "none", scrollTrigger: { trigger: band, start: "top bottom", end: "bottom top", scrub: 0.6 } });
    gsap.to(pc, { y: -20 * k, ease: "none", scrollTrigger: { trigger: band, start: "top bottom", end: "bottom top", scrub: 0.6 } });
  }

  /* ─────────── 10. security ─────────── */
  function security() {
    const rowsWrap = $("[data-srows]");
    if (rowsWrap) {
      const rows = $$("[data-srow]", rowsWrap);
      const tks = $$(".tk", rowsWrap), paths = $$<SVGPathElement>("[data-tk]", rowsWrap);
      gsap.set(tks, { scale: 0 });
      paths.forEach(prepPath);
      onceInView(rowsWrap, () => {
        rows.forEach((row, i) => {
          const at = i * 0.09;
          gsap.fromTo(row, { opacity: 0, x: -32 }, { opacity: 1, x: 0, duration: T.section, ease: E.enter, delay: at, onComplete: () => { gsap.set(row, { clearProps: "transform" }); } });
          gsap.to(tks[i], { scale: 1, duration: 0.3, ease: E.enter, delay: at + 0.4 });
          gsap.to(paths[i], { strokeDashoffset: 0, duration: 0.3, ease: E.standard, delay: at + 0.5 });
        });
      });
    }

    const fid = $("[data-fid]");
    if (!fid) return;
    const brs = $$<SVGPathElement>(".br", fid), fc = $$<SVGPathElement>(".fc", fid), scan = $("[data-fscan]", fid)!, ring = $(".fid__ring", fid)!;
    brs.forEach(prepPath); fc.forEach(prepPath);
    const h = scan.parentElement!.clientHeight;
    let verified = false;
    const verify = () => gsap.timeline()
      .to(brs, { stroke: COLORS.green, duration: 0.15, ease: E.standard })
      .to(brs, { stroke: "#fff", duration: 0.3, ease: E.standard }, "+=0.15");
    const sweep = gsap.timeline({ repeat: -1, repeatDelay: 2.1, paused: true })
      .fromTo(scan, { y: 0, opacity: 0 }, { opacity: 1, duration: 0.1 })
      .to(scan, { y: h * 0.76, duration: 0.8, ease: "sine.inOut" }, "<")
      .to(scan, { opacity: 0, duration: 0.1 })
      .add(() => { if (!verified) { verified = true; verify(); } });
    const intro = gsap.timeline({ paused: true })
      .to(brs, { strokeDashoffset: 0, duration: 0.6, ease: E.standard, stagger: 0.1 })
      .to(fc, { strokeDashoffset: 0, duration: 0.5, ease: E.standard }, 0.5);
    onceInView(fid, () => intro.play(), "top 75%");
    ScrollTrigger.create({
      trigger: fid, start: "top bottom", end: "bottom top",
      onToggle: (s) => { (ring as HTMLElement).style.animationPlayState = s.isActive ? "running" : "paused"; if (s.isActive && intro.progress() > 0) sweep.play(); else sweep.pause(); },
    });
    ScrollTrigger.create({ trigger: fid, start: "top 70%", once: true, onEnter: () => { gsap.delayedCall(0.9, () => { if (ScrollTrigger.isInViewport(fid)) sweep.play(); }); } });
  }

  /* ─────────── 12. download band ─────────── */
  function download() {
    const dl = $("[data-dl]");
    if (!dl) return;
    gsap.fromTo(dl, { opacity: 0, scale: 0.96 }, { opacity: 1, scale: 1, duration: 0.8, ease: E.enter, scrollTrigger: { trigger: dl, start: "top 85%", once: true }, onComplete: () => { gsap.set(dl, { clearProps: "transform" }); } });
  }

  return () => { mm.revert(); cleanups.splice(0).forEach((f) => f()); };
}

export { formatNum };
