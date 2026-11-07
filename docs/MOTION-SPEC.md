# Paymama — Motion Spec ("Direction in Motion")

Up/right = sending · down/left = receiving · rotate/swap = exchange. Calm, precise, no bounce
(the only spring is the success tick, `back.out(1.4)`).

## Tokens (`src/lib/motion.ts`, mirrored as CSS vars in `globals.css`)

| Token | Value |
|---|---|
| Durations | micro 150ms · fast 250ms · base 400ms · section 600ms · hero 900–1400ms |
| `standard` | `cubic-bezier(0.2, 0, 0, 1)` |
| `enter` (expo-out) | `cubic-bezier(0.16, 1, 0.3, 1)` — all reveals |
| `exit` | `cubic-bezier(0.4, 0, 1, 1)` |
| Reveal distance | 24px desktop / 16px mobile |
| Stagger | 70ms desktop / 50ms mobile, max 6 steps per group |
| Reveal trigger | once, at 20% in view (`top 80%`), never replays |
| Properties | transform + opacity (+ clip-path, letter-spacing, stroke-dashoffset where noted) |

## Utilities (`src/lib/motion.ts`)

`reveal` · `staggerIn` · `countUp` · `drawPath` (+`prepPath`) · `float` · `marquee` · `maskReveal`
· `visibleLoop` · `confetti` · `smoothTo` · `onceInView`.

Markup hooks (`data-*`): `data-reveal`, `data-stagger[=ms]`, `data-mask=words|lines`, `data-h`
(hidden until animated), `data-eyebrow`, `data-par=<factor>`, `data-demo=<card>`.

## Spec table

| # | Element | Trigger | Property | From → To | Dur | Easing | Delay |
|---|---|---|---|---|---|---|---|
| 2 | Nav | load | opacity, y | 0, −8 → 1, 0 | 400ms | enter | 0 |
| 2 | Logo up arrow | first load | y, opacity | +16 → 0 | 500ms | enter | 100ms |
| 2 | Logo down arrow | first load | y, opacity | −16 → 0 | 500ms | enter | 100ms |
| 2 | Logo lock-up | first load | rotate | 4° → 0 | 300ms | standard | 600ms |
| 2 | Wordmark | first load | clip-path | inset(0 100% 0 0) → 0 | 500ms | enter | 700ms |
| 2 | H1 words | load | yPercent (masked) | 110 → 0 | 900ms | enter | stagger 70ms |
| 2 | Green bar | after words | scaleX (origin left) | 0 → 1 | 600ms | enter | words end |
| 2 | Pill, p, buttons, checks | after words | opacity, y | 0, 16 → 1, 0 | 600ms | enter | stagger 80ms |
| 2 | Hero phone | load | y, rotate, opacity | 60, 4°, 0 → 0, 0, 1 | 1100ms | enter | 650ms |
| 2 | Circles | load | scale, opacity | 0.85, 0 → 1, 1 | 1200ms | enter | 800ms, +150ms |
| 2 | Phone balances | load | count | 0 → 18,420.50 / 2,150.00 | 1200ms | power3.out | 1100ms |
| 2 | Naira lines | after count | opacity | 0 → 1 | 500ms | standard | 2400ms |
| 3 | Chips | load | x / y, opacity | L −40, R +40, rate y +30 → 0 | 800ms | enter | 1600ms, +220ms |
| 3 | Chips (idle) | in view | y | ±6px sine, 5/6/7s | loop | sine.inOut | desync |
| 3 | Mouse parallax | desktop pointer | x, y | phone .02 · circles .04 · chips .06, max 12px | 150ms | power2.out | — |
| 3 | Rate chip | every 6s, in view | yPercent + 1px green ring | ₦1,540 ↔ ₦1,541 | 200+300ms | exit / enter | — |
| 3 | Hero glow | ambient | translate | slow drift | 20s | ease-in-out | — |
| 4 | Nav scrolled | scroll > 80px | height, bg, shadow | 72→60px, blur 16, #028CD4 @92% | 250ms | standard | — |
| 4 | Nav hide | fast scroll down / up | translateY | 0 ↔ −100% | 400ms | standard | — |
| 4 | Link underline | hover / scroll-spy | scaleX (from centre) | 0 → 1 | 250ms | standard | — |
| 4 | CTA arrow | hover | x, width, opacity | arrow in from left, label +4px | 250ms | standard | — |
| 4 | Mobile sheet | burger | translateY | −100% → 0 | 400ms | enter | links +50ms each |
| 4 | Burger → X | burger | rotate ±45°, middle fades | — | 400ms | standard | — |
| 5 | Ticker | always | translateX | 40px/s (30 mobile), pause on hover | loop | linear | — |
| 14 | Eyebrows | 20% in view | letter-spacing, opacity | 0.2em → 0.08em | 500ms | enter | — |
| 6 | About headline | in view | words by line | 110% → 0 | 900ms | enter | 90ms / line |
| 6 | Pillar cards | in view | opacity, y | 0, 24 → 1, 0 | 600ms | enter | 90ms |
| 6 | Card icons | with card | swap / drop / shackle | ±6px / −9px / −4px → 0 | 300ms | enter | 250ms+ |
| 6 | Card hover | hover | y, shadow, border | −4px, 0 16 32 rgba(1,36,58,.10), #BFE2F5 | 250ms | standard | — |
| 7 | Bento cards | in view | opacity, y, scale | 0, 24, .98 → 1, 0, 1 | 600ms | enter | 70ms, reading order |
| 7 | Balances | 40% visible | count + divider scaleX | 0 → value | 1200ms / 800ms | power3.out / standard | — |
| 7 | Pockets | 40% visible | x, bar scaleX | 40 → 0; 0 → 1 | 600ms | enter / standard | 180ms rows |
| 7 | Transfer | in view, loop | x/y, opacity | ↗ 12px out, ↖ 12px in | 600ms / 4s loop | exit / enter | — |
| 7 | Virtual card | hover / reveal | rotateX/Y ±8°, sheen sweep, digit roll | — / −60% → 260% | 300ms / 1200ms / 900ms | — | — |
| 7 | Virtual card (touch) | tap | rotateY | 0 → 180° | 500ms | standard | — |
| 7 | QR | 40% visible | squares scale/opacity, scan y | random 600ms, then top→bottom once | 300ms each / 900ms | enter / sine | 900ms |
| 7 | Convert | 40% visible | count, swap rotate | 0 → 1,540; 0 → 180° | 1200ms / 800ms | power3.out / standard | 300ms |
| 7 | Invest | 40% visible | stroke draw, area fade, dot travel + pulse | — | 1200ms / 600ms | standard | area +1.0s |
| 7 | Schedule | 40% visible | date opacity, active pop | .3 → 1; 1 → 1.12 → 1 | 300ms / 400ms | standard | 60ms stagger |
| 7 | Vault | 40% visible | y, opacity | 90 → 0 | 700ms | enter | 80ms |
| 7 | Dark cards | hover | radial highlight follows cursor | — | — | — | — |
| 8 | Connector line | in view | stroke-dashoffset | 1 → 0 | 1000ms | standard | 0 |
| 8 | Step badges | in view | scale, opacity | .6, 0 → 1, 1 | 300ms | enter | 200ms apart |
| 8 | Step text | after badge | opacity, y | 0, 16 → 1, 0 | 600ms | enter | badge + 150ms |
| 9 | Band | in view | clip-path | inset(6%, r40) → inset(0) | 800ms | enter | — |
| 9 | Phones | in view | centre y 60→0; sides x ±40, rotate ∓3° → 0 | — | 900ms | enter | centre 0, sides +120ms |
| 9 | Phone parallax | scroll (scrub) | sides x ±30, centre y −20 (halved mobile) | — | scrub .6 | none | — |
| 9 | Exchange chart | band in view | stroke draw | — | 1200ms | standard | 700ms |
| 9 | Receipt tick | band in view | stroke draw + tile spring, 12 confetti | .85 → 1 | 500 / 700 / 1200ms | standard / back.out(1.4) | 1000ms / 1300ms |
| 9 | Labels | last | opacity, y | 0, 8 → 1, 0 | 500ms | enter | 1700ms |
| 10 | Security rows | in view | x, opacity | −32 → 0 | 600ms | enter | 90ms |
| 10 | Row tick | per row | scale + stroke draw | 0 → 1 | 300ms | enter | row + 400ms |
| 10 | Face ID ring | ambient, in view | rotate | 360° | 30s | linear | — |
| 10 | Face ID brackets | in view | stroke draw, then green 600ms after first sweep | — | 600ms | standard | stagger 100ms |
| 10 | Scan line | every 3s, in view | y, opacity | top → 76% | 800ms | sine.inOut | — |
| 11 | FAQ panel | click | grid-template-rows 0fr → 1fr, text fade + 8px | — | 350ms | standard | overlaps |
| 11 | FAQ icon | click | rotate | 0 → 45° | 250ms | standard | — |
| 12 | Download band | in view | scale, opacity | .96, 0 → 1, 1 | 800ms | enter | — |
| 12 | Email field | focus | border → blue + 4px glow, label floats | — | 250ms | standard | — |
| 12 | Notify | submit | spinner → width tween → pill + drawn tick + 8 confetti | — | 400ms | standard | — |
| 12 | Invalid email | submit | x shake 3 cycles ±6px, red border, error fades | — | 300ms | none | — |
| 13 | Footer columns | in view | opacity, y | 0, 24 → 1, 0 | 600ms | enter | 70ms |
| 13 | Footer logo | hover | up/down arrow ±3px opposite | — | 600ms | standard | — |
| 14 | Buttons | hover / press / focus | bg ±6%, scale .97 (100ms), 2px ring | — | 200ms | standard | — |
| 14 | Cursor | desktop fine pointer | dot → 44px ring over interactives | — | 250ms | standard | — |

## Responsive (≤ 767px)
Reveal travel 16px, stagger ≤ 50ms, parallax halved, mouse parallax and 3D tilt removed (tap-to-flip card),
ticker 30px/s, bento single column with demos at 50% viewport, step connector re-measured vertically from badge centres.

## Accessibility and performance
- `prefers-reduced-motion`: every transform/loop/parallax/marquee is replaced by a 200ms opacity fade; counts show final values; ambient loops and CSS keyframes are off; ticker becomes a static wrapped list.
- Content is visible without JS; boot CSS only hides elements when `html.mo`/`html.rm` is set, with a 5s failsafe that removes it.
- Ambient loops (float, rate tick, transfer, scan, Face ID ring) pause off-screen via ScrollTrigger; the rAF ticker sleeps in hidden tabs.
- `will-change` is set just before a reveal and cleared on completion.
- No flash exceeds 3/s (fastest is the 3s scan line).
