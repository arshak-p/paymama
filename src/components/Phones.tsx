import type { ReactNode } from "react";
import { ArrowUp, ArrowDown, ArrowUpRight, Back, Bell, Bolt, CardIc, Check, Chevron, Eye, Home, LayersIcon, LockIcon, Scan, Search, Share, SwapIcon, Trend, User } from "./Icons";

export function Phone({ children, dark = false, size }: { children: ReactNode; dark?: boolean; size?: number }) {
  return (
    <div className="phone" style={size ? ({ "--pw": `${size}px` } as React.CSSProperties) : undefined} aria-hidden="true">
      <div className={`phone__scr${dark ? " dark" : ""}`}>
        <div className="status"><span>9:41</span><span><i /> <i /></span></div>
        {children}
      </div>
    </div>
  );
}

const Tabs = ({ light = false }: { light?: boolean }) => (
  <div className={`tabbar${light ? " light-tabbar" : ""}`}>
    {[["Home", Home], ["Sub-Accounts", LayersIcon], ["Vault", LockIcon], ["Exchange", SwapIcon], ["Profile", User]].map(([n, Ic]) => {
      const C = Ic as typeof Home;
      return <div key={n as string}><C /><span>{n as string}</span></div>;
    })}
  </div>
);

/** Hero phone — balances are counted up by the motion layer */
export function HomeScreen() {
  return (
    <>
      <div className="scr-pad">
        <div className="row"><span className="hi">Hi John,</span><span className="row" style={{ gap: 8 }}><span className="avatar">JA</span><span style={{ fontSize: 18 }}>☰</span></span></div>
        <div className="bal bal--w">
          <small>Balance</small>
          <div><b>USD</b></div>
          <div style={{ marginLeft: "auto", paddingRight: 6 }}>
            <span className="amt num" data-count="18420.5" data-prefix="" data-decimals="2" data-hero-count>18,420.50</span>
            <span className="ngn" data-h data-ngn>≈ ₦28,367,570</span>
          </div>
          <Eye width={13} height={13} />
        </div>
        <div className="bal bal--k">
          <small>Float Balance</small>
          <div><b>USD</b></div>
          <div style={{ marginLeft: "auto", paddingRight: 6 }}>
            <span className="amt num" data-count="2150" data-decimals="2" data-hero-count>2,150.00</span>
            <span className="ngn" data-h data-ngn>≈ ₦3,311,000</span>
          </div>
          <Eye width={13} height={13} />
        </div>
        <div className="qa">
          <div><i style={{ background: "var(--blue)", color: "#fff" }}><Home /></i>Home</div>
          <div><i><Scan /></i>Scan</div>
          <div><i><CardIc /></i>Cards</div>
          <div><i style={{ background: "var(--green)" }}><Trend /></i>&nbsp;</div>
        </div>
        <div className="tiles">
          <div className="tile" style={{ background: "var(--blue)" }}>Transfer</div>
          <div className="tile" style={{ background: "var(--navy)" }}>Receive</div>
        </div>
        <div className="bal bal--k" style={{ borderRadius: 9 }}><b style={{ margin: 0, fontSize: 12 }}>Sub Accounts</b><b style={{ fontSize: 22, fontFamily: "var(--font-head)" }}>13</b></div>
        <div className="tiles" style={{ gridTemplateRows: "auto auto" }}>
          <div className="tile" style={{ background: "var(--green)", color: "var(--black)" }}>Invest</div>
          <div className="tile" style={{ background: "#3c4047", gridRow: "span 2", alignItems: "flex-end" }}>Vault</div>
          <div className="tile" style={{ background: "var(--g4)", color: "var(--ink)" }}>Transactions</div>
        </div>
      </div>
      <Tabs />
    </>
  );
}

const rows: [string, string, string, string, string][] = [
  ["Lekki Duplex Build", "Project · ₦7,422,800", "$4,820.00", "#23272d", "home"],
  ["Dangote Cement Supply", "Vendor · ₦1,941,016", "$1,260.40", "#e82d2d", "truck"],
  ["Staff Salaries", "Service · ₦3,557,400", "$2,310.00", "#8dc911", "bolt"],
  ["School Fees", "Personal · ₦2,541,000", "$1,650.00", "#028cd4", "heart"],
  ["Mum's Upkeep", "Personal · ₦646,800", "$420.00", "#4b4d52", "heart"],
  ["Office Rent, Ikeja", "Service · ₦1,509,200", "$980.00", "#028cd4", "bolt"],
];

export function SubAccountsScreen() {
  return (
    <>
      <div className="scr-pad" style={{ background: "#e4e5e7" }}>
        <div className="row"><b style={{ fontSize: 11 }}>Sub-Accounts</b><span style={{ background: "#fff", borderRadius: 8, padding: "2px 8px" }}>···</span></div>
        <div className="xcard"><small style={{ fontSize: 7, opacity: .7 }}>Held in sub-accounts</small>
          <div className="row"><div><div className="big num" style={{ fontSize: 18, margin: "4px 0 2px" }}>$17,487.85</div><small style={{ fontSize: 6.5, opacity: .6 }}>≈ ₦26,931,289</small></div><div style={{ textAlign: "right", color: "var(--blue)", fontWeight: 700, fontSize: 17 }}>13<small style={{ display: "block", fontSize: 6.5, opacity: .8, fontWeight: 400 }}>accounts</small></div></div>
        </div>
        <div className="listrow" style={{ padding: "8px 10px", color: "var(--g2)" }}><Search width={11} height={11} /><span style={{ fontSize: 8 }}>Search sub-accounts</span></div>
        <div className="chips"><span>All</span><span>Project</span><span>Vendor</span><span>Service</span><span>Personal</span></div>
        {rows.map(([n, s, a, c], i) => (
          <div className="listrow" key={i}><i style={{ background: c }}>{i === 2 || i === 5 ? <Bolt /> : <Home />}</i><div>{n}<small>{s}</small></div><b className="num">{a}</b></div>
        ))}
      </div>
      <span className="fab">+</span>
      <Tabs light />
    </>
  );
}

export function ExchangeScreen() {
  return (
    <>
      <div className="scr-pad" style={{ background: "#e4e5e7" }}>
        <div className="row"><span className="avatar" style={{ background: "#fff", color: "var(--ink)" }}><Back width={11} /></span><b style={{ fontSize: 10, marginRight: "auto", marginLeft: 8 }}>Exchange</b><span className="avatar" style={{ background: "#fff", color: "var(--ink)" }}><Bell width={11} /></span></div>
        <div className="xcard">
          <div className="row" style={{ justifyContent: "flex-start", gap: 6 }}><span className="mini-pill">🇺🇸 USD ⌄</span><SwapIcon width={10} height={10} /><span className="mini-pill">🇳🇬 NGN ⌄</span></div>
          <div className="big num">$1 = ₦1,540</div>
          <span className="up-pill">↗ +0.8% today</span>
          <svg viewBox="0 0 200 60" width="100%" height="56" style={{ marginTop: 10, overflow: "visible" }} aria-hidden="true">
            <path d="M0 40 C20 36 30 46 50 40 S80 30 100 36 S130 24 150 28 S185 14 200 10 V60 H0Z" fill="rgba(2,140,212,.28)" />
            <path data-xchart d="M0 40 C20 36 30 46 50 40 S80 30 100 36 S130 24 150 28 S185 14 200 10" fill="none" stroke="#028cd4" strokeWidth="1.6" />
          </svg>
          <div className="range"><span>1D</span><span className="on">7D</span><span>1M</span><span>1Y</span></div>
        </div>
        <div className="conv">
          <small style={{ fontSize: 7, color: "var(--g2)" }}>You convert</small>
          <div className="cr"><b className="big num">$500.00</b><span className="mini-pill" style={{ background: "#eee", color: "var(--ink)" }}>🇺🇸 USD ⌄</span></div>
          <span className="sw"><ArrowUp width={11} height={11} style={{ display: "none" }} /><SwapIcon width={12} height={12} style={{ transform: "rotate(90deg)" }} /></span>
          <hr />
          <small style={{ fontSize: 7, color: "var(--g2)" }}>You get</small>
          <div className="cr"><b className="big num">₦770,000</b><span className="mini-pill" style={{ background: "#eee", color: "var(--ink)" }}>🇳🇬 NGN ⌄</span></div>
          <small style={{ fontSize: 6.5, color: "var(--g2)", display: "block", marginTop: 8 }}>From Main account · $18,420.50 available · fee 0.5%</small>
        </div>
        <div className="btn-k">Convert now</div>
        <div className="alert"><Bell width={11} height={11} /><div>Alert me at ₦1,600<small>We&apos;ll notify you when $1 reaches it</small></div><Chevron width={10} style={{ marginLeft: "auto", transform: "rotate(-90deg)" }} /></div>
      </div>
    </>
  );
}

export function ReceiptScreen() {
  return (
    <div className="rcpt" data-receipt>
      <div className="tick-tile" data-tick-tile>
        <svg viewBox="0 0 34 34" fill="none" stroke="#01050c" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path data-tick d="M8 18l7 7 12-14" /></svg>
      </div>
      <h4>Money sent</h4>
      <p className="num">$250.00 is on its way to Chidi.</p>
      <div className="rcpt-card">
        {[["Amount", "$250.00 · ₦385,000"], ["To", "Chidi Okafor"], ["From", "Main account"], ["Reference", "PM-4419028811"], ["Date", "12 Oct 2026, 15:42"]].map(([k, v]) => (
          <div key={k}><span>{k}</span><b className="num">{v}</b></div>
        ))}
      </div>
      <div className="b1"><Share width={9} height={9} style={{ display: "inline", marginRight: 4, verticalAlign: -1 }} />Share receipt</div>
      <div className="b2">Back to home</div>
    </div>
  );
}

export { ArrowUp, ArrowDown, ArrowUpRight, Check };
