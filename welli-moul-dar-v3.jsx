import { useState, useEffect, useRef } from "react";

const G = "#B8952A";
const G2 = "#D4AF4A";
const G_BG = "#F9F5E8";
const BLACK = "#050505";
const GRAY = "#6E6E73";
const LIGHT = "#F5F5F7";
const WHITE = "#FFFFFF";

const useReveal = (threshold = 0.1) => {
  const ref = useRef(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) setV(true); }, { threshold });
    if (ref.current) o.observe(ref.current);
    return () => o.disconnect();
  }, []);
  return [ref, v];
};

const R = ({ children, delay = 0, y = 30 }) => {
  const [ref, v] = useReveal();
  return (
    <div ref={ref} style={{ opacity: v ? 1 : 0, transform: v ? "none" : `translateY(${y}px)`, transition: `opacity 0.8s ${delay}s cubic-bezier(.22,1,.36,1), transform 0.8s ${delay}s cubic-bezier(.22,1,.36,1)` }}>
      {children}
    </div>
  );
};

const NAV = [
  { id: "problem", label: "Problem" },
  { id: "strategy", label: "Strategy" },
  { id: "stp", label: "STP" },
  { id: "fourop", label: "4Ps" },
  { id: "funnel", label: "Funnel" },
  { id: "profit", label: "P&L" },
  { id: "mre", label: "MRE" },
  { id: "roadmap", label: "Roadmap" },
  { id: "ads", label: "Ads" },
];

export default function App() {
  const [activeP, setActiveP] = useState(0);
  const [activeLever, setActiveLever] = useState(0);
  const [activeAngle, setActiveAngle] = useState(0);
  const [openPhase, setOpenPhase] = useState(null);
  const [activeSeg, setActiveSeg] = useState(0);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const go = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  const ps = [
    { label: "Product", head: "The complete ownership journey", items: ["The unit + state subsidy eligibility explained", "Monthly payment simulator built-in", "Project info, neighborhood, floor plans", "Financing pathway & document guidance", "Post-reservation reassurance"] },
    { label: "Price", head: "Protect realized price", items: ["+1% realized price = MAD 23.25M additional gross profit", "Stay within the active subsidy-compatible band", "Financing clarity eliminates discount pressure", "Lead with monthly affordability, never with 'cheapness'"] },
    { label: "Place", head: "Integrated omnichannel", items: ["Website — central conversion hub", "WhatsApp — fast contact & qualification layer", "Sales offices & show units for trust", "Bank & mortgage partners for financing conversion", "Digital MRE acquisition for diaspora buyers"] },
    { label: "Promotion", head: "Messages that convert", items: ['"From renter to homeowner"', '"Know your subsidy. Know your monthly payment."', '"Reserve with confidence"', 'Never: luxury · cheap · green · best price'] },
  ];

  const phases = [
    { n: "01", name: "Foundation", items: ["Define STP & city priorities", "Build brand system & message hierarchy", "Design landing-page templates", "Map sales process & CRM stages"] },
    { n: "02", name: "Platform", items: ["Launch website & project pages", "Connect WhatsApp + CRM", "Install analytics & attribution", "Build payment / subsidy simulator"] },
    { n: "03", name: "Pilot", items: ["Pick 2–3 projects in aided MAD 300k–700k band", "Run city-specific campaigns", "Train advisors on response scripts & SLA"] },
    { n: "04", name: "Optimize", items: ["Improve highest-bounce pages", "Shift spend to best-performing channels", "Refine ad copy & qualification logic"] },
    { n: "05", name: "Scale", items: ["Roll out to more cities", "Add MRE campaign layer", "Standardize reporting & sales scripts", "Formalize bank-partner journeys"] },
  ];

  const angles = [
    { h: "From Renter to Homeowner", b: "Stop paying rent. See what your monthly payment could be.", cta: "Estimate My Payment" },
    { h: "Know Your Subsidy", b: "See if your home qualifies for state housing support in 60 seconds.", cta: "Check My Eligibility" },
    { h: "Buying From Abroad?", b: "Discover Addoha projects and speak to a bilingual advisor remotely.", cta: "Talk on WhatsApp" },
    { h: "New Homes in [City]", b: "Estimate your budget instantly. An advisor is available now.", cta: "Book a Visit" },
  ];

  const segs = [
    { name: "First-Time Buyers", detail: "Aided band MAD 300k–700k. Payment-sensitive. Primary targets for state subsidy communication." },
    { name: "Urban Salaried", detail: "Declared income households transitioning from renting to owning in urban & peri-urban areas." },
    { name: "Young Families", detail: "Couples forming families. First-home decision driven by space, stability, and monthly affordability." },
    { name: "MRE Diaspora", detail: "Moroccans abroad seeking a structured, remote-first, bank-compatible path to ownership." },
  ];

  return (
    <div style={{ background: WHITE, color: BLACK, fontFamily: "-apple-system, 'SF Pro Display', 'Helvetica Neue', Arial, sans-serif", minHeight: "100vh", overflowX: "hidden" }}>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-thumb { background: ${G}; border-radius: 2px; }
        button { cursor: pointer; font-family: inherit; }
        .nav-item { transition: color 0.2s; }
        .nav-item:hover { color: ${G} !important; }
        .seg-btn { transition: all 0.2s; }
        .seg-btn:hover { border-color: ${G} !important; }
        .p-btn { transition: all 0.15s; }
        .p-btn:hover { color: ${BLACK} !important; }
        .phase-row { transition: background 0.2s; }
        .phase-row:hover { background: ${LIGHT} !important; }
        .angle-btn { transition: all 0.2s; }
        .angle-btn:hover { border-color: ${G} !important; color: ${G} !important; }
        .cta-btn { transition: all 0.2s; }
        .cta-btn:hover { background: ${G2} !important; transform: scale(1.02); }
        @keyframes fadeSlide { from { opacity:0; transform:translateY(8px); } to { opacity:1; transform:none; } }
        .anim { animation: fadeSlide 0.3s cubic-bezier(.22,1,.36,1) forwards; }
        @keyframes scaleIn { from { opacity:0; transform:scale(0.97); } to { opacity:1; transform:none; } }
        .scale-in { animation: scaleIn 0.35s cubic-bezier(.22,1,.36,1) forwards; }
      `}</style>

      {/* ── HERO ── */}
      <div style={{ minHeight: "100vh", background: BLACK, display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "0 7vw 10vh", position: "relative", overflow: "hidden" }}>
        {/* Gold geometric accent */}
        <div style={{ position: "absolute", top: "8vh", right: "7vw", width: "1px", height: "35vh", background: `linear-gradient(180deg, transparent, ${G}, transparent)` }} />
        <div style={{ position: "absolute", top: "8vh", right: "calc(7vw + 40px)", width: "1px", height: "20vh", background: `linear-gradient(180deg, transparent, ${G}44, transparent)` }} />

        {/* Top label */}
        <div style={{ position: "absolute", top: "8vh", left: "7vw", display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={{ width: "24px", height: "1px", background: G }} />
          <span style={{ fontSize: "11px", letterSpacing: "0.2em", color: G, textTransform: "uppercase", fontWeight: "500" }}>Addoha · Marketing Strategy 2026</span>
        </div>

        <R delay={0.1}>
          <div style={{ fontSize: "clamp(64px, 13vw, 160px)", fontWeight: "700", lineHeight: 0.88, letterSpacing: "-0.04em", color: WHITE, marginBottom: "4px" }}>
            Welli
          </div>
          <div style={{ fontSize: "clamp(64px, 13vw, 160px)", fontWeight: "700", lineHeight: 0.88, letterSpacing: "-0.04em", color: G, marginBottom: "4px" }}>
            Moul
          </div>
          <div style={{ fontSize: "clamp(64px, 13vw, 160px)", fontWeight: "700", lineHeight: 0.88, letterSpacing: "-0.04em", color: WHITE, marginBottom: "48px" }}>
            Dar.
          </div>
        </R>

        <R delay={0.25}>
          <p style={{ fontSize: "clamp(16px, 2.2vw, 22px)", color: "#A1A1A6", maxWidth: "560px", lineHeight: 1.6, fontWeight: "300", marginBottom: "56px" }}>
            A website-first, WhatsApp-native, CRM-driven homeownership platform for Morocco's subsidy-compatible middle market.
          </p>
        </R>

        <R delay={0.35}>
          <div style={{ display: "flex", gap: "48px", flexWrap: "wrap" }}>
            {[["MAD 2.325B", "Eco & MS Revenue 2025"], ["27%", "Gross Margin"], ["10,195", "Eco & MS Pre-Sales"]].map(([v, l]) => (
              <div key={l}>
                <div style={{ fontSize: "clamp(22px, 3vw, 32px)", fontWeight: "700", color: WHITE, letterSpacing: "-0.02em" }}>{v}</div>
                <div style={{ fontSize: "12px", color: "#6E6E73", marginTop: "4px", letterSpacing: "0.04em" }}>{l}</div>
              </div>
            ))}
          </div>
        </R>
      </div>

      {/* ── STICKY NAV ── */}
      <nav style={{
        position: "sticky", top: 0, zIndex: 300,
        background: scrolled ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.95)",
        backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
        borderBottom: `1px solid #E5E5E5`,
        padding: "0 7vw",
        display: "flex", alignItems: "center", gap: "0",
        transition: "background 0.3s",
      }}>
        <span style={{ fontSize: "13px", fontWeight: "700", color: G, letterSpacing: "-0.01em", padding: "16px 24px 16px 0", borderRight: "1px solid #E5E5E5", marginRight: "8px", flexShrink: 0 }}>WMD</span>
        {NAV.map(n => (
          <button key={n.id} className="nav-item" onClick={() => go(n.id)} style={{
            background: "none", border: "none", padding: "16px 14px",
            fontSize: "12px", fontWeight: "500", letterSpacing: "0.02em",
            color: GRAY, textTransform: "uppercase",
          }}>{n.label}</button>
        ))}
      </nav>

      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 7vw" }}>

        {/* ── PROBLEM ── */}
        <section id="problem" style={{ padding: "120px 0 80px" }}>
          <R>
            <div style={{ fontSize: "11px", fontWeight: "600", letterSpacing: "0.18em", color: G, textTransform: "uppercase", marginBottom: "20px" }}>01 — The Problem</div>
            <h2 style={{ fontSize: "clamp(36px, 6vw, 72px)", fontWeight: "700", letterSpacing: "-0.03em", lineHeight: 1, marginBottom: "24px" }}>
              Not a brand awareness problem.<br />
              <span style={{ color: G }}>A conversion problem.</span>
            </h2>
            <div style={{ width: "48px", height: "2px", background: G, marginBottom: "32px" }} />
            <p style={{ fontSize: "clamp(16px, 1.8vw, 20px)", color: GRAY, lineHeight: 1.7, maxWidth: "600px", fontWeight: "300", marginBottom: "72px" }}>
              In Morocco's housing market, pricing power is limited. The developer that converts demand best wins — not the one spending most on brand impressions.
            </p>
          </R>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1px", background: "#E5E5E5" }}>
            {[
              { v: "+0.2%", l: "Residential price growth Q4 2026", s: "Bank Al-Maghrib" },
              { v: "85.8%", l: "Eco & MS share of total Addoha revenue", s: "Addoha 2025" },
              { v: "55,512", l: "Housing aid beneficiaries by July 2026", s: "Maroc.ma" },
              { v: "62%", l: "Applications for homes MAD 300k–700k", s: "Aid Program" },
            ].map(({ v, l, s }, i) => (
              <R key={i} delay={i * 0.08}>
                <div style={{ background: WHITE, padding: "40px 32px" }}>
                  <div style={{ fontSize: "clamp(36px, 4vw, 52px)", fontWeight: "700", letterSpacing: "-0.03em", color: BLACK, marginBottom: "12px" }}>{v}</div>
                  <div style={{ fontSize: "14px", color: GRAY, lineHeight: 1.5, marginBottom: "8px" }}>{l}</div>
                  <div style={{ fontSize: "10px", fontWeight: "600", letterSpacing: "0.14em", color: G, textTransform: "uppercase" }}>{s}</div>
                </div>
              </R>
            ))}
          </div>
        </section>

        <div style={{ height: "1px", background: "#E5E5E5" }} />

        {/* ── STRATEGY ── */}
        <section id="strategy" style={{ padding: "120px 0 80px" }}>
          <R>
            <div style={{ fontSize: "11px", fontWeight: "600", letterSpacing: "0.18em", color: G, textTransform: "uppercase", marginBottom: "20px" }}>02 — Strategic Proposition</div>
            <h2 style={{ fontSize: "clamp(36px, 6vw, 72px)", fontWeight: "700", letterSpacing: "-0.03em", lineHeight: 1, marginBottom: "24px" }}>
              Morocco's easiest path<br />
              <span style={{ color: G }}>to homeownership.</span>
            </h2>
            <div style={{ width: "48px", height: "2px", background: G, marginBottom: "60px" }} />
          </R>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
            <R delay={0.05}>
              <div style={{ background: BLACK, padding: "52px 44px", height: "100%" }}>
                <div style={{ fontSize: "10px", fontWeight: "600", letterSpacing: "0.2em", color: G, textTransform: "uppercase", marginBottom: "24px" }}>Core Promise</div>
                <p style={{ fontSize: "clamp(18px, 2vw, 22px)", color: WHITE, lineHeight: 1.7, fontWeight: "300" }}>
                  "Understand your eligibility, estimate your monthly payment, talk to a real advisor immediately, and move from rent to ownership with confidence."
                </p>
              </div>
            </R>
            <R delay={0.1}>
              <div style={{ display: "flex", flexDirection: "column", gap: "1px", background: "#E5E5E5" }}>
                {[
                  ["Qualified Leads", "Target buyers genuinely eligible for state housing aid"],
                  ["Instant Follow-Up", "WhatsApp as the fast human bridge to conversion"],
                  ["CRM-Driven", "Every contact becomes a measurable opportunity"],
                  ["Realized Price", "Less discounting, more margin on Eco & MS"],
                ].map(([t, d]) => (
                  <div key={t} style={{ background: WHITE, padding: "28px 32px", display: "flex", gap: "20px", alignItems: "flex-start" }}>
                    <div style={{ width: "5px", height: "5px", borderRadius: "50%", background: G, marginTop: "9px", flexShrink: 0 }} />
                    <div>
                      <div style={{ fontWeight: "600", fontSize: "15px", marginBottom: "4px" }}>{t}</div>
                      <div style={{ fontSize: "13px", color: GRAY, lineHeight: 1.5 }}>{d}</div>
                    </div>
                  </div>
                ))}
              </div>
            </R>
          </div>
        </section>

        <div style={{ height: "1px", background: "#E5E5E5" }} />

        {/* ── STP ── */}
        <section id="stp" style={{ padding: "120px 0 80px" }}>
          <R>
            <div style={{ fontSize: "11px", fontWeight: "600", letterSpacing: "0.18em", color: G, textTransform: "uppercase", marginBottom: "20px" }}>03 — Segmentation · Targeting · Positioning</div>
            <h2 style={{ fontSize: "clamp(36px, 6vw, 72px)", fontWeight: "700", letterSpacing: "-0.03em", lineHeight: 1, marginBottom: "24px" }}>
              Accessible aspiration.<br />
              <span style={{ color: G }}>Institutional trust.</span>
            </h2>
            <div style={{ width: "48px", height: "2px", background: G, marginBottom: "48px" }} />
          </R>

          <div style={{ display: "flex", gap: "8px", marginBottom: "24px", flexWrap: "wrap" }}>
            {segs.map((s, i) => (
              <button key={i} className="seg-btn" onClick={() => setActiveSeg(i)} style={{
                padding: "10px 22px", border: `1.5px solid ${activeSeg === i ? G : "#D2D2D7"}`,
                background: activeSeg === i ? G : "transparent", color: activeSeg === i ? WHITE : GRAY,
                borderRadius: "100px", fontSize: "13px", fontWeight: "500",
              }}>{s.name}</button>
            ))}
          </div>

          <div className="anim" key={activeSeg} style={{ padding: "28px 32px", background: LIGHT, borderRadius: "12px", marginBottom: "40px" }}>
            <div style={{ fontWeight: "600", fontSize: "17px", marginBottom: "8px" }}>{segs[activeSeg].name}</div>
            <div style={{ fontSize: "15px", color: GRAY, lineHeight: 1.6 }}>{segs[activeSeg].detail}</div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
            <R delay={0.05}>
              <div style={{ padding: "40px", border: "1.5px solid #E5E5E5", borderRadius: "16px" }}>
                <div style={{ fontSize: "10px", fontWeight: "600", letterSpacing: "0.18em", color: G, textTransform: "uppercase", marginBottom: "16px" }}>Primary Target</div>
                <p style={{ fontSize: "16px", lineHeight: 1.7, color: BLACK, fontWeight: "300" }}>
                  Urban and peri-urban middle-income households seeking a first home in the <strong style={{ fontWeight: "600" }}>MAD 300k–700k TTC</strong> band, eligible for state housing support.
                </p>
              </div>
            </R>
            <R delay={0.1}>
              <div style={{ padding: "40px", background: G, borderRadius: "16px" }}>
                <div style={{ fontSize: "10px", fontWeight: "600", letterSpacing: "0.18em", color: "rgba(255,255,255,0.6)", textTransform: "uppercase", marginBottom: "16px" }}>Positioning Statement</div>
                <p style={{ fontSize: "18px", lineHeight: 1.6, color: WHITE, fontWeight: "500", fontStyle: "italic" }}>
                  "Addoha is the most trusted and simplest way to become a homeowner in Morocco."
                </p>
              </div>
            </R>
          </div>
        </section>

        <div style={{ height: "1px", background: "#E5E5E5" }} />

        {/* ── 4Ps ── */}
        <section id="fourop" style={{ padding: "120px 0 80px" }}>
          <R>
            <div style={{ fontSize: "11px", fontWeight: "600", letterSpacing: "0.18em", color: G, textTransform: "uppercase", marginBottom: "20px" }}>04 — The 4Ps</div>
            <h2 style={{ fontSize: "clamp(36px, 6vw, 72px)", fontWeight: "700", letterSpacing: "-0.03em", lineHeight: 1, marginBottom: "24px" }}>
              A commercial system,<br />
              <span style={{ color: G }}>not a campaign.</span>
            </h2>
            <div style={{ width: "48px", height: "2px", background: G, marginBottom: "48px" }} />
          </R>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1px", background: "#E5E5E5", marginBottom: "0", borderRadius: "0" }}>
            {ps.map((p, i) => (
              <button key={i} className="p-btn" onClick={() => setActiveP(i)} style={{
                background: activeP === i ? BLACK : WHITE, border: "none",
                padding: "24px 16px", fontWeight: activeP === i ? "700" : "400",
                fontSize: "16px", letterSpacing: "-0.01em",
                color: activeP === i ? WHITE : GRAY,
              }}>{p.label}</button>
            ))}
          </div>

          <div className="anim" key={activeP} style={{ padding: "48px", background: LIGHT }}>
            <div style={{ fontSize: "10px", fontWeight: "600", letterSpacing: "0.18em", color: G, textTransform: "uppercase", marginBottom: "16px" }}>{ps[activeP].label}</div>
            <div style={{ fontSize: "clamp(20px, 2.5vw, 28px)", fontWeight: "600", letterSpacing: "-0.02em", marginBottom: "36px" }}>{ps[activeP].head}</div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
              {ps[activeP].items.map((item, i) => (
                <div key={i} style={{ display: "flex", gap: "24px", alignItems: "flex-start", padding: "18px 0", borderBottom: "1px solid #E5E5E5" }}>
                  <span style={{ fontSize: "11px", fontWeight: "600", color: G, minWidth: "20px", marginTop: "3px", letterSpacing: "0.1em" }}>0{i + 1}</span>
                  <span style={{ fontSize: "16px", lineHeight: 1.6, fontWeight: "300" }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div style={{ height: "1px", background: "#E5E5E5" }} />

        {/* ── FUNNEL ── */}
        <section id="funnel" style={{ padding: "120px 0 80px" }}>
          <R>
            <div style={{ fontSize: "11px", fontWeight: "600", letterSpacing: "0.18em", color: G, textTransform: "uppercase", marginBottom: "20px" }}>05 — The Funnel</div>
            <h2 style={{ fontSize: "clamp(36px, 6vw, 72px)", fontWeight: "700", letterSpacing: "-0.03em", lineHeight: 1, marginBottom: "24px" }}>
              From ad click<br />
              <span style={{ color: G }}>to reservation.</span>
            </h2>
            <div style={{ width: "48px", height: "2px", background: G, marginBottom: "60px" }} />
          </R>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "60px", alignItems: "start" }}>
            <R delay={0.05}>
              <div>
                {["Ad / Social / Search", "Project landing page", "Payment + subsidy simulator", "WhatsApp or callback", "CRM qualification", "Visit booking", "Reservation", "Financing follow-up"].map((s, i, a) => (
                  <div key={i} style={{ display: "flex", gap: "20px", alignItems: "stretch" }}>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                      <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: i === 0 ? G : "transparent", border: `1.5px solid ${i === 0 ? G : "#D2D2D7"}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <span style={{ fontSize: "10px", fontWeight: "700", color: i === 0 ? WHITE : GRAY }}>{i + 1}</span>
                      </div>
                      {i < a.length - 1 && <div style={{ width: "1px", flex: 1, background: "#E5E5E5", minHeight: "20px" }} />}
                    </div>
                    <div style={{ paddingBottom: "24px", paddingTop: "6px" }}>
                      <span style={{ fontSize: "15px", fontWeight: i === 0 ? "600" : "300", color: i === 0 ? BLACK : GRAY }}>{s}</span>
                    </div>
                  </div>
                ))}
              </div>
            </R>

            <R delay={0.1}>
              <div>
                <div style={{ fontSize: "10px", fontWeight: "600", letterSpacing: "0.18em", color: G, textTransform: "uppercase", marginBottom: "32px" }}>Conversion Targets — Pilot</div>
                {[
                  { m: "Visitor → Lead", v: "3–5%", pct: 5 },
                  { m: "Lead → Visit", v: "20–30%", pct: 30 },
                  { m: "Visit → Reservation", v: "10–15%", pct: 15 },
                  { m: "Reservation → Finance-Ready", v: "70%+", pct: 70 },
                ].map(({ m, v, pct }) => (
                  <div key={m} style={{ marginBottom: "32px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "8px" }}>
                      <span style={{ fontSize: "13px", color: GRAY, fontWeight: "400" }}>{m}</span>
                      <span style={{ fontSize: "24px", fontWeight: "700", letterSpacing: "-0.02em" }}>{v}</span>
                    </div>
                    <div style={{ height: "3px", background: "#E5E5E5", borderRadius: "2px" }}>
                      <div style={{ height: "3px", background: G, borderRadius: "2px", width: `${pct}%`, transition: "width 1s cubic-bezier(.22,1,.36,1)" }} />
                    </div>
                  </div>
                ))}
              </div>
            </R>
          </div>
        </section>

        <div style={{ height: "1px", background: "#E5E5E5" }} />

        {/* ── P&L ── */}
        <section id="profit" style={{ padding: "120px 0 80px" }}>
          <R>
            <div style={{ fontSize: "11px", fontWeight: "600", letterSpacing: "0.18em", color: G, textTransform: "uppercase", marginBottom: "20px" }}>06 — Profitability</div>
            <h2 style={{ fontSize: "clamp(36px, 6vw, 72px)", fontWeight: "700", letterSpacing: "-0.03em", lineHeight: 1, marginBottom: "24px" }}>
              Not a marketing idea.<br />
              <span style={{ color: G }}>A margin strategy.</span>
            </h2>
            <div style={{ width: "48px", height: "2px", background: G, marginBottom: "20px" }} />
            <p style={{ fontSize: "13px", color: GRAY, fontFamily: "monospace", marginBottom: "56px", letterSpacing: "0.04em" }}>
              Base: MAD 2.325B Eco & MS Revenue · 27% gross margin → ~MAD 627.75M estimated gross profit
            </p>
          </R>

          <div style={{ display: "flex", gap: "1px", background: "#E5E5E5", marginBottom: "1px" }}>
            {["Lever A — Realized Price", "Lever B — Volume"].map((l, i) => (
              <button key={i} onClick={() => setActiveLever(i)} style={{
                flex: 1, padding: "18px", background: activeLever === i ? BLACK : WHITE, border: "none",
                color: activeLever === i ? WHITE : GRAY, fontWeight: activeLever === i ? "600" : "400",
                fontSize: "14px", letterSpacing: "0.01em", transition: "all 0.2s",
              }}>{l}</button>
            ))}
          </div>

          <div className="anim" key={activeLever} style={{ background: LIGHT, marginBottom: "24px" }}>
            {(activeLever === 0 ? [
              ["+0.5% realized price", "MAD 11.625M"],
              ["+1.0% realized price", "MAD 23.25M"],
              ["+2.0% realized price", "MAD 46.5M"],
            ] : [
              ["+1% Eco & MS volume", "MAD 6.28M"],
              ["+2% Eco & MS volume", "MAD 12.56M"],
              ["+3% Eco & MS volume", "MAD 18.83M"],
            ]).map(([s, v], i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "24px 32px", borderBottom: "1px solid #E5E5E5" }}>
                <span style={{ fontSize: "16px", fontWeight: "300" }}>{s}</span>
                <span style={{ fontSize: "clamp(24px, 3vw, 36px)", fontWeight: "700", color: G, letterSpacing: "-0.02em" }}>{v}</span>
              </div>
            ))}
          </div>

          <div style={{ fontSize: "10px", fontWeight: "600", letterSpacing: "0.18em", color: G, textTransform: "uppercase", marginBottom: "16px" }}>Combined Upside</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
            {[
              ["+0.5% price + 2% vol.", "~MAD 24.18M", false],
              ["+1.0% price + 3% vol.", "~MAD 42.08M", true],
            ].map(([s, v, bold], i) => (
              <R key={i} delay={i * 0.1}>
                <div style={{ padding: "40px", background: bold ? BLACK : LIGHT, borderRadius: "16px" }}>
                  <div style={{ fontSize: "12px", color: bold ? "rgba(255,255,255,0.4)" : GRAY, marginBottom: "12px", letterSpacing: "0.06em" }}>{s}</div>
                  <div style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: "700", letterSpacing: "-0.03em", color: bold ? WHITE : BLACK }}>{v}</div>
                  <div style={{ fontSize: "12px", color: G, marginTop: "8px" }}>additional gross profit</div>
                </div>
              </R>
            ))}
          </div>
        </section>

        <div style={{ height: "1px", background: "#E5E5E5" }} />

        {/* ── MRE ── */}
        <section id="mre" style={{ padding: "120px 0 80px" }}>
          <R>
            <div style={{ fontSize: "11px", fontWeight: "600", letterSpacing: "0.18em", color: G, textTransform: "uppercase", marginBottom: "20px" }}>07 — MRE Layer</div>
            <h2 style={{ fontSize: "clamp(36px, 6vw, 72px)", fontWeight: "700", letterSpacing: "-0.03em", lineHeight: 1, marginBottom: "24px" }}>
              The diaspora is<br />
              <span style={{ color: G }}>a full market.</span>
            </h2>
            <div style={{ width: "48px", height: "2px", background: G, marginBottom: "60px" }} />
          </R>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "40px" }}>
            {[
              ["MAD 119B", "MRE remittances in 2024 — record high", "Maroc.ma"],
              ["$12.9B", "Morocco remittances 2024", "IFAD"],
            ].map(([v, l, s]) => (
              <R key={v}>
                <div style={{ padding: "48px 40px", background: LIGHT, borderRadius: "16px" }}>
                  <div style={{ fontSize: "clamp(36px, 5vw, 60px)", fontWeight: "700", letterSpacing: "-0.03em", color: BLACK, marginBottom: "12px" }}>{v}</div>
                  <div style={{ fontSize: "15px", color: GRAY, fontWeight: "300", marginBottom: "6px" }}>{l}</div>
                  <div style={{ fontSize: "10px", fontWeight: "600", letterSpacing: "0.14em", color: G, textTransform: "uppercase" }}>{s}</div>
                </div>
              </R>
            ))}
          </div>

          <R>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1px", background: "#E5E5E5" }}>
              {["France · Belgium · Spain · Netherlands targeting", "Bilingual pages FR / AR", "Remote video appointments", "Summer booking campaigns", "Family co-buyer pathways", "Concierge document assistance"].map((a, i) => (
                <div key={i} style={{ background: WHITE, padding: "28px 24px" }}>
                  <div style={{ width: "20px", height: "2px", background: G, marginBottom: "14px" }} />
                  <div style={{ fontSize: "14px", lineHeight: 1.6, fontWeight: "300" }}>{a}</div>
                </div>
              ))}
            </div>
          </R>
        </section>

        <div style={{ height: "1px", background: "#E5E5E5" }} />

        {/* ── ROADMAP ── */}
        <section id="roadmap" style={{ padding: "120px 0 80px" }}>
          <R>
            <div style={{ fontSize: "11px", fontWeight: "600", letterSpacing: "0.18em", color: G, textTransform: "uppercase", marginBottom: "20px" }}>08 — Roadmap</div>
            <h2 style={{ fontSize: "clamp(36px, 6vw, 72px)", fontWeight: "700", letterSpacing: "-0.03em", lineHeight: 1, marginBottom: "24px" }}>
              Five phases.<br />
              <span style={{ color: G }}>One clear progression.</span>
            </h2>
            <div style={{ width: "48px", height: "2px", background: G, marginBottom: "48px" }} />
          </R>

          <div style={{ borderTop: "1px solid #E5E5E5" }}>
            {phases.map((ph, i) => (
              <R key={i} delay={i * 0.05}>
                <div className="phase-row" onClick={() => setOpenPhase(openPhase === i ? null : i)} style={{ borderBottom: "1px solid #E5E5E5", background: WHITE }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "28px", padding: "28px 0" }}>
                    <span style={{ fontSize: "11px", fontWeight: "600", color: G, letterSpacing: "0.12em", minWidth: "28px" }}>{ph.n}</span>
                    <span style={{ fontSize: "clamp(18px, 2.5vw, 24px)", fontWeight: "600", letterSpacing: "-0.02em", flex: 1 }}>{ph.name}</span>
                    <div style={{ width: "28px", height: "28px", borderRadius: "50%", border: "1.5px solid #D2D2D7", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s", background: openPhase === i ? G : "transparent", borderColor: openPhase === i ? G : "#D2D2D7" }}>
                      <span style={{ fontSize: "16px", color: openPhase === i ? WHITE : GRAY, transform: openPhase === i ? "rotate(45deg)" : "none", display: "block", lineHeight: 1, transition: "transform 0.2s" }}>+</span>
                    </div>
                  </div>
                  {openPhase === i && (
                    <div className="anim" style={{ paddingBottom: "28px", paddingLeft: "56px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "12px" }}>
                      {ph.items.map((item, j) => (
                        <div key={j} style={{ display: "flex", gap: "10px", fontSize: "14px", color: GRAY, lineHeight: 1.5, fontWeight: "300" }}>
                          <span style={{ color: G, flexShrink: 0, fontWeight: "600" }}>→</span>
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </R>
            ))}
          </div>
        </section>

        <div style={{ height: "1px", background: "#E5E5E5" }} />

        {/* ── ADS ── */}
        <section id="ads" style={{ padding: "120px 0 80px" }}>
          <R>
            <div style={{ fontSize: "11px", fontWeight: "600", letterSpacing: "0.18em", color: G, textTransform: "uppercase", marginBottom: "20px" }}>09 — Ad Creative</div>
            <h2 style={{ fontSize: "clamp(36px, 6vw, 72px)", fontWeight: "700", letterSpacing: "-0.03em", lineHeight: 1, marginBottom: "24px" }}>
              One goal per ad.<br />
              <span style={{ color: G }}>The next step.</span>
            </h2>
            <div style={{ width: "48px", height: "2px", background: G, marginBottom: "48px" }} />
          </R>

          <div style={{ display: "flex", gap: "8px", marginBottom: "32px", flexWrap: "wrap" }}>
            {angles.map((a, i) => (
              <button key={i} className="angle-btn" onClick={() => setActiveAngle(i)} style={{
                padding: "10px 22px", border: `1.5px solid ${activeAngle === i ? G : "#D2D2D7"}`,
                background: activeAngle === i ? G : "transparent",
                color: activeAngle === i ? WHITE : GRAY,
                borderRadius: "100px", fontSize: "13px", fontWeight: "500",
              }}>Angle {i + 1}</button>
            ))}
          </div>

          <div className="scale-in" key={activeAngle} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", border: "1.5px solid #E5E5E5", borderRadius: "20px", overflow: "hidden" }}>
            <div style={{ padding: "52px 48px", borderRight: "1px solid #E5E5E5" }}>
              <div style={{ fontSize: "10px", fontWeight: "600", letterSpacing: "0.18em", color: G, textTransform: "uppercase", marginBottom: "20px" }}>Headline</div>
              <div style={{ fontSize: "clamp(22px, 3vw, 34px)", fontWeight: "700", letterSpacing: "-0.02em", lineHeight: 1.1, marginBottom: "24px" }}>{angles[activeAngle].h}</div>
              <p style={{ fontSize: "16px", color: GRAY, lineHeight: 1.7, fontWeight: "300" }}>{angles[activeAngle].b}</p>
            </div>
            <div style={{ padding: "52px 48px", background: LIGHT, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <div>
                <div style={{ fontSize: "10px", fontWeight: "600", letterSpacing: "0.18em", color: G, textTransform: "uppercase", marginBottom: "20px" }}>Call to Action</div>
                <div style={{ fontSize: "22px", fontWeight: "600", letterSpacing: "-0.01em", marginBottom: "40px" }}>{angles[activeAngle].cta}</div>
              </div>
              <button className="cta-btn" style={{
                display: "inline-flex", alignItems: "center", gap: "8px",
                padding: "14px 28px", background: G, border: "none", borderRadius: "100px",
                color: WHITE, fontSize: "14px", fontWeight: "600", letterSpacing: "0.02em",
                alignSelf: "flex-start",
              }}>
                {angles[activeAngle].cta}
                <span style={{ fontSize: "16px" }}>→</span>
              </button>
            </div>
          </div>
        </section>
      </div>

      {/* ── FOOTER ── */}
      <div style={{ background: BLACK, padding: "100px 7vw", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: 0, left: "7vw", right: "7vw", height: "1px", background: `linear-gradient(90deg, transparent, ${G}, transparent)` }} />
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ fontSize: "clamp(52px, 9vw, 100px)", fontWeight: "700", letterSpacing: "-0.04em", color: WHITE, lineHeight: 0.9, marginBottom: "12px" }}>
            Welli Moul Dar.
          </div>
          <div style={{ fontSize: "clamp(24px, 4vw, 48px)", color: G, letterSpacing: "0.05em", fontFamily: "monospace", marginBottom: "48px", direction: "rtl", display: "block" }}>
            وَلِّي مول الدار
          </div>
          <div style={{ width: "100%", height: "1px", background: "#1A1A1A", marginBottom: "48px" }} />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "48px" }}>
            <p style={{ fontSize: "16px", color: "#6E6E73", lineHeight: 1.7, fontWeight: "300" }}>
              On Addoha's own 2026 numbers, a modest improvement of +0.5% in realized price and +2% in volume on Eco & MS generates approximately{" "}
              <span style={{ color: WHITE, fontWeight: "600" }}>MAD 24.18M</span> in additional gross profit — without requiring any dramatic market shift. Just better funnel performance.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {[["Strategy", "Welli Moul Dar"], ["Focus", "Eco & MS aided band MAD 300k–700k"], ["Engine", "Website · WhatsApp · CRM"]].map(([k, v]) => (
                <div key={k} style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid #1A1A1A", paddingBottom: "16px" }}>
                  <span style={{ fontSize: "12px", color: "#444", letterSpacing: "0.1em", textTransform: "uppercase" }}>{k}</span>
                  <span style={{ fontSize: "13px", color: "#A1A1A6", fontWeight: "300" }}>{v}</span>
                </div>
              ))}
            </div>
          </div>
          <div style={{ marginTop: "60px", fontSize: "10px", color: "#333", letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: "600" }}>
            ADDOHA · WELLI MOUL DAR · 2026
          </div>
        </div>
      </div>
    </div>
  );
}
