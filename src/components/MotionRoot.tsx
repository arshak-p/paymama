"use client";
import { useEffect } from "react";
import { initMotion } from "@/lib/animations";
import { startSmooth } from "@/lib/smooth";

/** Boots the motion system once fonts are ready (so line-by-line masks measure correctly). */
export function MotionRoot() {
  useEffect(() => {
    let stop: (() => void) | undefined;
    let stopSmooth: (() => void) | undefined;
    let dead = false;
    const run = () => {
      if (dead) return;
      stop = initMotion();
      stopSmooth = startSmooth();
    };
    if (document.fonts?.ready) document.fonts.ready.then(run); else run();
    return () => { dead = true; stop?.(); stopSmooth?.(); };
  }, []);
  return null;
}
