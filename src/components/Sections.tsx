import { ArrowDown, ArrowDownLeft, ArrowUp, ArrowUpRight, Bolt, Check, EyeOff, LayersIcon, LockIcon, Shield, SwapIcon, FaceGlyph, Scan, User } from "./Icons";
import { Logo } from "./Logo";
import { ExchangeScreen, HomeScreen, Phone, ReceiptScreen, SubAccountsScreen } from "./Phones";

/* ───────── hero ───────── */
export function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero__glow" aria-hidden="true" />
      <div className="wrap hero__grid">
        <div>
          <span className="pill" data-h data-hero-item><i />Dollars and naira, in one app</span>
          <h1 data-mask="words" data-hero-h1>
            Money, sorted into{" "}
            <span className="hl"><span className="hl-bar" data-hl-bar aria-hidden="true" />its place.</span>
          </h1>
          <p className="hero__p" data-h data-hero-item>
            Pay Mama holds your US dollars with the naira value always beside it. Split money into sub-accounts for projects, vendors and family, transfer and receive, convert, invest, and lock your important documents in a vault.
          </p>
          <div className="hero__btns" data-h data-hero-item>
            <a className="btn btn--white" href="#download">Download the app</a>
            <a className="btn btn--ghost" href="#features">See what it does</a>
          </div>
          <ul className="checks" data-h data-hero-item>
            {["Face ID & app PIN", "USD & NGN side by side", "Unlimited sub-accounts"].map((t) => (
              <li key={t}><Check />{t}</li>
            ))}
          </ul>
        </div>

        <div className="stage" data-stage>
          <div className="par" data-par="0.04" aria-hidden="true">
            <div className="circle circle--b" data-h data-circle />
            <div className="circle circle--g" data-h data-circle />
          </div>
          <div className="par" data-par="0.02">
            <div className="phone-slot">
              <div data-h data-hero-phone><Phone><HomeScreen /></Phone></div>
            </div>
          </div>
          <div className="par" data-par="0.06" style={{ pointerEvents: "none" }}>
            <div className="chip chip--rx" data-h data-chip="left">
              <div className="chip__in" data-float>
                <span className="chip__ic" style={{ background: "#eaf4d6", color: "#5c8a00" }}><ArrowDownLeft /></span>
                <span><b className="num">+$1,840.00</b><small>Received · Upwork</small></span>
              </div>
            </div>
            <div className="chip chip--sub" data-h data-chip="right">
              <div className="chip__in" data-float>
                <span className="chip__ic" style={{ background: "var(--blue)", color: "#fff" }}><LayersIcon /></span>
                <span><b>Lekki Duplex Build</b><small className="num">Sub-account · $4,820</small></span>
              </div>
            </div>
            <div className="chip chip--rate" data-h data-chip="up">
              <div className="chip__in" data-float>
                <span className="chip__ic" style={{ background: "#e3f1fa", color: "var(--navy)" }}><SwapIcon /></span>
                <span><b className="num">$1 = <span className="rate-num" data-rate><span>₦1,540</span></span></b><small>Rate locked for 30s</small></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────── ticker ───────── */
const TICK = ["Sub-accounts for projects, vendors & family", "USD and NGN side by side", "Rate lock while you confirm", "Virtual cards with spending limits", "Scan to pay with QR", "Encrypted document vault", "Schedule payments once or on repeat"];
export function Ticker() {
  return (
    <div className="ticker" aria-label="Highlights">
      <ul className="ticker__track" data-ticker>
        {[...TICK, ...TICK].map((t, i) => (
          <li key={i} aria-hidden={i >= TICK.length}>{t}</li>
        ))}
      </ul>
    </div>
  );
}

/* ───────── about ───────── */
export function About() {
  return (
    <section className="section" id="about">
      <div className="wrap">
        <span className="eyebrow" data-eyebrow>What is Pay Mama</span>
        <h2 className="h2" data-mask="lines">One home for the money you earn, save and send.</h2>
        <p className="lead" data-reveal>Built for people who live between currencies: earning in dollars, spending and supporting family in naira, and running projects that need money set aside.</p>
        <div className="cards3" data-stagger="0.09" data-about-cards>
          <article className="card" data-card>
            <div className="chipic chipic--b"><SwapIcon /></div>
            <h3>Two currencies, one view</h3>
            <p>Every balance shows in USD with the naira value underneath. Tap once to make naira the main figure instead.</p>
          </article>
          <article className="card" data-card>
            <div className="chipic chipic--b"><LayersIcon /></div>
            <h3>A pocket for every purpose</h3>
            <p>Create colour-coded sub-accounts for a building project, school fees or a vendor, and pay straight out of them.</p>
          </article>
          <article className="card" data-card>
            <div className="chipic chipic--g"><LockIcon /></div>
            <h3>Locked like a vault</h3>
            <p>Face ID, an app PIN and a private vault for documents, passwords and your digital will.</p>
          </article>
        </div>
      </div>
    </section>
  );
}

/* ───────── features bento ───────── */
const QR = "111101110110011011101010110111011011010111011100101110110".split("");
export function Features() {
  const qr = Array.from({ length: 81 }, (_, i) => (QR[i % QR.length] === "1" && !(i % 7 === 3) ? "" : "o"));
  return (
    <section className="section" id="features">
      <div className="wrap">
        <span className="eyebrow" data-eyebrow>Features</span>
        <h2 className="h2" data-mask="lines">Everything your money needs, in its own place.</h2>
        <div className="bento" data-bento>
          <article className="bcard bcard--dark s3" data-demo="balances">
            <span className="tag">Accounts</span>
            <h3>Main and Float balances</h3>
            <p>Keep day-to-day money in your Float and the rest safe in Main. Hide balances with one tap when you&apos;re in public.</p>
            <div className="bal-row bal-row--w" style={{ marginTop: 28 }}><span><b style={{ fontSize: 16, fontFamily: "var(--font-body)" }}>Main</b><small className="num">≈ ₦28,367,570</small></span><b className="num" data-bal="18420.5">$18,420.50</b></div>
            <div className="bal-row bal-row--k"><span><b style={{ fontSize: 16, fontFamily: "var(--font-body)" }}>Float</b><small className="num">≈ ₦3,311,000</small></span><b className="num" data-bal="2150">$2,150.00</b></div>
            <div className="bal-div" data-divider />
          </article>

          <article className="bcard s3" data-demo="pockets">
            <span className="tag">Sub-accounts</span>
            <h3>Pockets with a purpose</h3>
            <p>Name them, colour them, add notes, fund them from Main or Float, schedule payments, and move, merge or close them anytime.</p>
            <div style={{ marginTop: 26 }}>
              {[["Lekki Duplex Build", "#028cd4", "var(--navy)", 70, "$4,820"], ["Staff Salaries", "var(--green)", "var(--green)", 88, "$2,310"], ["School Fees", "#028cd4", "var(--blue)", 40, "$1,650"]].map(([n, ic, bar, w, a]) => (
                <div className="pk" key={n as string} data-pk><i style={{ background: ic as string }} /><span>{n}</span><div className="bar"><u data-fill={w as number} style={{ width: `${w}%`, background: bar as string }} /></div><b className="num">{a}</b></div>
              ))}
            </div>
          </article>

          <article className="bcard bcard--blue s2" data-demo="transfer">
            <span className="tag">Transfers</span>
            <h3>Transfer and receive</h3>
            <p>Pay anyone from your Main account or a sub-account. Share your details or a QR code to get paid, including through PayPal.</p>
            <div className="xfer" aria-hidden="true"><i className="up" data-xup><ArrowUp /></i><i className="dn" data-xdn><ArrowDown /></i></div>
          </article>

          <article className="bcard s2" data-demo="card">
            <span className="tag">Virtual cards</span>
            <h3>Cards you control</h3>
            <p>Create virtual cards, set spending limits, and freeze or unfreeze them in a tap.</p>
            <div className="vcard-wrap" data-tilt-wrap>
              <div className="vcard" data-vcard tabIndex={0} role="button" aria-label="Virtual card, press to flip">
                <div className="vcard__f">
                  <div className="lbl"><b>pay mama</b><span>VIRTUAL</span></div>
                  <div className="no num">•••• <span data-digits>4471</span></div>
                  <div className="lbl"><span>JOHN ADEYEMI</span><span>09/29</span></div>
                  <i className="sheen" data-sheen />
                </div>
                <div className="vcard__b"><div className="mag" /><div className="cvv">CVV •••</div><p style={{ fontSize: 11, marginTop: 14, color: "#fff", opacity: .8 }}>Tap to flip back</p></div>
              </div>
            </div>
          </article>

          <article className="bcard s2" data-demo="qr">
            <span className="tag">QR payments</span>
            <h3>Scan to pay or get paid</h3>
            <p>Point your camera at a Pay Mama QR code, or show yours to receive money instantly.</p>
            <div className="qr" aria-hidden="true" data-qr>
              {qr.map((c, i) => <i key={i} className={c} />)}
              <b className="scan" data-scan />
            </div>
          </article>

          <article className="bcard bcard--green s3" data-demo="convert">
            <span className="tag">Exchange</span>
            <h3>Convert at a rate you can see</h3>
            <p>Check the live dollar–naira rate, lock it for 30 seconds while you confirm, and set alerts for the rate you&apos;re waiting for.</p>
            <div className="rate-big"><span className="num">$1 = ₦<span data-rate-count="1540">1,540</span></span><small>Example rate</small><span className="swap" data-swap><SwapIcon /></span></div>
          </article>

          <article className="bcard s3" data-demo="invest">
            <span className="tag">Invest</span>
            <h3>Grow what you don&apos;t need yet</h3>
            <p>Browse savings and investment products, see what you&apos;d get back before you commit, and track every holding to maturity.</p>
            <svg className="chart" viewBox="0 0 400 100" aria-hidden="true">
              <defs><linearGradient id="gfill" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="#8dc911" stopOpacity=".35" /><stop offset="1" stopColor="#8dc911" stopOpacity="0" /></linearGradient></defs>
              <path data-area d="M0 88 L40 84 L80 86 L120 74 L160 78 L200 64 L240 68 L280 52 L320 48 L360 38 L400 30 V100 H0Z" fill="url(#gfill)" />
              <path data-line d="M0 88 L40 84 L80 86 L120 74 L160 78 L200 64 L240 68 L280 52 L320 48 L360 38 L400 30" fill="none" stroke="#8dc911" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              <circle className="dotp" data-dot cx="400" cy="30" r="5" fill="#8dc911" />
            </svg>
          </article>

          <article className="bcard s3" data-demo="schedule">
            <span className="tag">Scheduled payments</span>
            <h3>Set it once</h3>
            <p>One-time or recurring payments, from any account, with automatic or manual approval.</p>
            <div className="cal" aria-hidden="true">
              {Array.from({ length: 14 }, (_, i) => <span key={i} className={i === 3 ? "a" : i === 10 ? "b" : ""} data-date>{i + 1}</span>)}
            </div>
          </article>

          <article className="bcard bcard--dark s3" data-demo="vault">
            <span className="tag">Digital vault &amp; will</span>
            <h3>Your important papers, behind your face</h3>
            <p>Store title deeds, passports and passwords in an encrypted vault, with a second vault for extra-sensitive files. Set up a digital will that passes the right things to the right people.</p>
            <div className="docs" aria-hidden="true">
              {[["Passport", "var(--blue)"], ["C of O", "var(--green)"], ["Digital will", "var(--red)"], ["Passwords", "var(--blue)"]].map(([n, c]) => (
                <div className="doc" key={n} data-doc style={{ borderTopColor: c }}>{n}</div>
              ))}
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

/* ───────── how it works ───────── */
export function How() {
  const steps = [
    ["Download and verify", "Sign up with your phone number, confirm the code we text you, and upload your ID."],
    ["Choose your currencies", "Dollars lead and naira sits beside them, or the other way round. Then create your first sub-account."],
    ["Send, save and secure", "Pay people, convert, invest and lock away your documents, all protected by Face ID."],
  ];
  return (
    <section className="section" id="how">
      <div className="wrap">
        <span className="eyebrow" data-eyebrow>How it works</span>
        <h2 className="h2" data-mask="lines">Set up in minutes.</h2>
        <div className="steps" data-steps>
          <svg className="conn" aria-hidden="true"><line data-conn pathLength={1} x1="0" y1="0" x2="0" y2="0" /></svg>
          <div className="steps__cards">
            {steps.map(([t, d], i) => (
              <article className="card" key={t} data-step>
                <span className="badge" data-badge>{i + 1}</span>
                <h3>{t}</h3>
                <p>{d}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────── app preview band ───────── */
export function AppPreview() {
  return (
    <section className="band" data-band>
      <div className="wrap">
        <span className="eyebrow" data-eyebrow>App preview</span>
        <h2 data-mask="lines">Designed to feel calm, even when money isn&apos;t.</h2>
        <p className="sub" data-reveal>A look at three screens from the Pay Mama app.</p>
        <div className="pcols" data-phones>
          <div className="pcol" data-pside="-1">
            <div className="par" data-pwrap><div className="phwrap"><div data-h data-pp="side-l"><Phone dark={false}><SubAccountsScreen /></Phone></div></div></div>
            <span className="plabel" data-h data-plabel>Sub-accounts</span>
          </div>
          <div className="pcol c" data-pside="0">
            <div className="par" data-pwrap><div className="phwrap"><div data-h data-pp="center"><Phone><ExchangeScreen /></Phone></div></div></div>
            <span className="plabel" data-h data-plabel>Exchange</span>
          </div>
          <div className="pcol" data-pside="1">
            <div className="par" data-pwrap><div className="phwrap"><div data-h data-pp="side-r"><Phone dark><ReceiptScreen /></Phone></div></div></div>
            <span className="plabel" data-h data-plabel>Payment receipt</span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────── security ───────── */
export function Security() {
  const rows = [
    [Scan, "Face ID on every payment", "Biometrics open the app and approve each transfer, conversion and investment."],
    [LockIcon, "App lock and PIN", "A separate app PIN keeps Pay Mama closed even if your phone is unlocked."],
    [EyeOff, "Hide your balance", "Blur every amount with one tap, so nobody nearby sees what you have."],
    [Shield, "Encrypted vault", "Documents in your vault are encrypted, with a second vault that asks for an extra check."],
  ] as const;
  return (
    <section className="section" id="security">
      <div className="wrap sec">
        <div>
          <span className="eyebrow" data-eyebrow>Security</span>
          <h2 className="h2" data-mask="lines">Your money and papers, protected at every step.</h2>
          <div className="srows" data-srows>
            {rows.map(([Ic, t, d]) => (
              <div className="srow" key={t} data-srow>
                <span className="sic"><Ic /><span className="tk"><svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="#01050c" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round"><path data-tk d="M5 12.5l5 5L19 7" /></svg></span></span>
                <div><h4>{t}</h4><p>{d}</p></div>
              </div>
            ))}
          </div>
        </div>
        <div className="fid" data-fid aria-hidden="true">
          <div className="fid__in" />
          <svg className="fid__ring" viewBox="0 0 100 100"><circle cx="50" cy="50" r="49" fill="none" stroke="rgba(255,255,255,.55)" strokeWidth=".5" strokeDasharray="2.4 3.6" /></svg>
          <div className="fid__sq"><FaceGlyph /><i className="fid__scan" data-fscan /></div>
        </div>
      </div>
    </section>
  );
}

/* ───────── footer ───────── */
export function Footer() {
  const cols: [string, [string, string][]][] = [
    ["Product", [["Features", "#features"], ["How it works", "#how"], ["Security", "#security"], ["Download", "#download"]]],
    ["Company", [["About", "#about"], ["FAQ", "#faq"], ["hello@[paymama-domain]", "#"]]],
    ["Legal", [["Privacy policy", "#"], ["Terms of use", "#"], ["Cookie policy", "#"]]],
  ];
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer__grid" data-stagger>
          <div>
            <a href="#top" aria-label="Paymama home"><Logo /></a>
            <p className="about">Money, sorted into its place. Dollars and naira, sub-accounts, exchange, investing and a secure vault in one app.</p>
          </div>
          {cols.map(([h, ls]) => (
            <div key={h}>
              <h5>{h}</h5>
              <ul>{ls.map(([n, href]) => <li key={n}><a className="ulink" href={href}>{n}</a></li>)}</ul>
            </div>
          ))}
        </div>
        <div className="footer__bar">
          <span>© 2026 Pay Mama. All rights reserved.</span>
          <span>[Regulatory disclosure: Pay Mama is a technology company. Financial services provided by [licensed partner].]</span>
        </div>
      </div>
    </footer>
  );
}

export { Bolt, ArrowUpRight, User };
