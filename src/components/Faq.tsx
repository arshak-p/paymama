"use client";
import { useState } from "react";
import { Plus } from "./Icons";

const ITEMS = [
  ["Which currencies does Pay Mama support?", "Balances are held in US dollars, with the naira value shown alongside. You can switch which one leads. More currencies are planned as Pay Mama expands to new countries."],
  ["What is a sub-account?", "A sub-account is a named pocket of money for one purpose, like a building project, school fees or a vendor. Fund it from Main or Float, pay straight out of it, and move, merge or close it anytime."],
  ["What's the difference between Main and Float?", "Main is where the bulk of your money rests. Float is for day-to-day spending. Move money between them whenever you like."],
  ["Who holds my money?", "[Placeholder: describe the licensed partner that holds customer funds, once confirmed.]"],
  ["How much does it cost?", "[Placeholder: pricing and fees to be confirmed. The exchange screen currently shows an example 0.5% fee.]"],
  ["When can I download the app?", "Pay Mama is launching on iPhone and Android. Join the waitlist below and we'll email you when it's ready."],
];

/** One open at a time; open/close animations overlap (CSS grid-rows 0fr → 1fr). */
export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="faq" data-stagger="0.07" data-faq>
      {ITEMS.map(([q, a], i) => (
        <div className="qa-i" key={q} data-open={open === i}>
          <h3 style={{ margin: 0, font: "inherit", letterSpacing: 0 }}>
            <button className="qa-q" aria-expanded={open === i} aria-controls={`faq-${i}`} id={`faq-q-${i}`} onClick={() => setOpen(open === i ? null : i)}>
              {q}
              <Plus />
            </button>
          </h3>
          <div className="qa-a" id={`faq-${i}`} role="region" aria-labelledby={`faq-q-${i}`}>
            <div><p>{a}</p></div>
          </div>
        </div>
      ))}
    </div>
  );
}
