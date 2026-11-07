"use client";
import { useRef, useState } from "react";
import gsap from "gsap";
import { Check } from "./Icons";
import { confetti, E, isReduced, drawPath } from "@/lib/motion";

type S = "idle" | "loading" | "success";
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function Download() {
  const [email, setEmail] = useState("");
  const [err, setErr] = useState("");
  const [state, setState] = useState<S>("idle");
  const field = useRef<HTMLDivElement>(null);
  const btn = useRef<HTMLButtonElement>(null);
  const host = useRef<HTMLDivElement>(null);
  const tick = useRef<SVGPathElement>(null);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (state !== "idle") return;
    if (!EMAIL.test(email.trim())) {
      setErr("Enter a valid email address, like you@example.com.");
      if (!isReduced() && field.current)
        gsap.to(field.current, { keyframes: { x: [-6, 6, -6, 6, -6, 6, 0] }, duration: 0.3, ease: "none" }); // 3 cycles, 6px
      return;
    }
    setErr("");
    setState("loading");
    // Prototype: no backend yet — simulate the request, then show success.
    window.setTimeout(() => {
      const b = btn.current;
      const from = b?.offsetWidth ?? 120;
      setState("success");
      requestAnimationFrame(() => {
        if (!b) return;
        if (!isReduced()) {
          gsap.fromTo(b, { width: from }, { width: Math.max(from, 190), duration: 0.4, ease: E.standard, clearProps: "width" });
          if (tick.current) drawPath(tick.current, { duration: 0.4, delay: 0.15 });
          if (host.current) confetti(host.current, 8, { spread: 40, height: 120, duration: 1 });
        }
      });
    }, 900);
  };

  return (
    <section className="dl" id="download" data-dl>
      <div className="wrap dl__grid">
        <div>
          <span className="eyebrow" data-eyebrow>Coming soon</span>
          <h2 data-mask="words">Put your money in its place.</h2>
          <p className="sub" data-reveal>Pay Mama is launching on iPhone and Android.</p>
          <div className="badges" data-stagger="0.08">
            <a className="sbadge" href="#download"><small>Coming soon on the</small><b>App Store</b></a>
            <a className="sbadge" href="#download"><small>Coming soon on</small><b>Google Play</b></a>
          </div>
        </div>
        <form className="wl" onSubmit={submit} noValidate data-reveal data-wl>
          <h4>Join the waitlist</h4>
          <div className="wl__row" ref={host} style={{ position: "relative" }}>
            <div className={`field${email ? " filled" : ""}${err ? " err" : ""}`} ref={field}>
              <input id="wl-email" type="email" inputMode="email" autoComplete="email" value={email} aria-invalid={!!err} aria-describedby="wl-err"
                onChange={(e) => { setEmail(e.target.value); if (err) setErr(""); }} />
              <label htmlFor="wl-email">you@example.com</label>
            </div>
            <button className={`notify${state === "success" ? " ok" : ""}`} ref={btn} type="submit" disabled={state === "loading"} aria-live="polite">
              {state === "idle" && "Notify me"}
              {state === "loading" && <><i className="spin" /><span className="sr">Submitting</span></>}
              {state === "success" && <><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path ref={tick} d="M4 12.5l5 5L20 6.5" /></svg>You&apos;re on the list</>}
            </button>
          </div>
          <p className={`errt${err ? " on" : ""}`} id="wl-err" role="alert">{err}</p>
          <p className="wl__note">We&apos;ll only email you about the launch.</p>
        </form>
      </div>
    </section>
  );
}

export { Check };
