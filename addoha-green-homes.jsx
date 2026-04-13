import { useState, useEffect, useRef } from "react";

const G = "#1A6E3C";
const G2 = "#2EA05B";
const G_BG = "#EDF6F0";
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
  { id: "green", label: "Features" },
  { id: "roadmap", label: "Roadmap" },
  { id: "compare", label: "vs. WMD" },
];

export default function App() {
  const [activeP, setActiveP] = useState(0);
  const [activeLever, setActiveLever] = useState(0);
  const [activeAngle, setActiveAngle] = useState(0);
  const [openPhase, setOpenPhase] = useState(null);
  const [activeSeg, setActiveSeg] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [activeFunnelStep, setActiveFunnelStep] = useState(null);
  const [activeConvTarget, setActiveConvTarget] = useState(null);
  const [activeCompare, setActiveCompare] = useState(null);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const go = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  const ps = [
    {
      label: "Product", head: "Standard homes — green by design",
      items: [
        "Solar water heaters: 30–40% reduction in hot water energy costs",
        "Thermal insulation: 15–25% reduction in cooling & heating loads",
        "Optimized building orientation for natural light and ventilation",
        "No complex technology — integrates into current construction process",
        "Scalable across all Eco & MS unit types with zero structural changes",
      ]
    },
    {
      label: "Price", head: "Smart premium with a 2-year payback",
      items: [
        "MAD 6,000 additional construction cost per unit",
        "MAD 7,000 price premium → +1,000 MAD net margin per unit",
        "Customer payback: ~2 years from monthly energy bill savings",
        "10-year household savings: ~MAD 30,000 vs. MAD 7,000 premium",
        "Sell the investment story, not the feature list",
      ]
    },
    {
      label: "Place", head: "Everywhere the buyer already looks",
      items: [
        "Project showrooms with live Green Home mockup and bill display",
        "Facebook & Instagram ads anchored on MAD saved per month",
        "On-site energy savings calculator at every project site",
        "Bank & mortgage partner co-promotions on monthly affordability",
        "WhatsApp-first sales conversation anchored on the savings figure",
      ]
    },
    {
      label: "Promotion", head: "Economic messaging — not eco-messaging",
      items: [
        '"Tkhallas dar w tn9es l facture"',
        '"Your home reduces your bills from day one"',
        '"The MAD 7,000 upgrade that saves MAD 30,000"',
        'Never: sustainability · eco · carbon · environment · premium · luxury',
      ]
    },
  ];

  const phases = [
    { n: "01", name: "Integration Design", items: ["Select green features for each unit type", "Negotiate supplier contracts: solar heaters & insulation", "Certify MAD 6,000 cost target with construction partners", "Define energy savings measurement & reporting methodology"] },
    { n: "02", name: "Pilot Construction", items: ["Build 500–1,000 green units across 2–3 pilot projects", "Install features within standard construction timeline", "Measure real energy consumption vs. non-green control units", "Capture resident feedback on comfort and monthly bills"] },
    { n: "03", name: "Campaign Launch", items: ['"Tkhallas dar w tn9es l facture" campaign goes live', "Bill-comparison content on Facebook & Instagram", "Showroom mockup with live energy data display", "Train sales teams on savings pitch and bill calculator"] },
    { n: "04", name: "Optimize & Validate", items: ["Compare sales velocity: green vs. standard units", "Publish actual pilot savings data for public credibility", "Refine messaging based on buyer objections and acceptance rate", "Adjust pricing if 80%+ premium acceptance validates headroom"] },
    { n: "05", name: "Portfolio Rollout", items: ["Extend green features across all new Addoha projects", "Standardize supplier contracts for volume pricing", "Launch 'Addoha Green Homes' as recognized product sub-brand", "Explore HQE or ADEREE green certification for added credibility"] },
  ];

  const angles = [
    { h: "Tkhallas Dar w Tn9es L Facture", b: "Own your home and cut your monthly bills at the same time. Addoha Green Homes — built to save.", cta: "See My Monthly Savings" },
    { h: "Your Bill Drops From Day One", b: "Solar heaters. Thermal insulation. Smart orientation. A standard home with green savings built in.", cta: "Calculate My Savings" },
    { h: "A Home That Pays You Back", b: "The MAD 7,000 green upgrade saves you that much every 2 years. Then it keeps saving for 20 more.", cta: "See the Numbers" },
    { h: "Live Better for Less", b: "Cooler in summer. Warmer in winter. Lower bills year-round. That's an Addoha Green Home.", cta: "Book a Green Home Visit" },
  ];

  const segs = [
    { name: "First-Time Buyers", detail: "Primary buyers in the MAD 300k–700k Eco & MS band. Highly sensitive to post-purchase monthly costs. Green features reduce cost-of-living anxiety — a major commitment barrier for this segment." },
    { name: "Young Families", detail: "Long-term residents who benefit most from recurring savings. A 40% reduction in energy bills means thousands of MAD freed annually for education, food, and family priorities — deeply resonant messaging." },
    { name: "Middle-Income Households", detail: "Buyers where monthly budget is stretched thin. Green homes give Addoha a tangible reason to win over cheaper competitors: lower bills offset the price premium and improve the total cost of ownership." },
    { name: "Value-Driven Buyers", detail: "Buyers who calculate total cost of ownership, not just sticker price. The 10-year savings story (MAD 30,000 saved vs. MAD 7,000 premium) is an unambiguous financial argument that closes skeptical buyers." },
  ];

  const funnelSteps = [
    { label: "Energy-savings ad or social content", detail: "Entry point. Facebook and Instagram ads show the exact bill reduction — in dirhams — that a Green Home delivers. No eco messaging, just MAD saved per month. The hook is immediate and quantifiable." },
    { label: "Project page with bill comparison", detail: "Each project page features a side-by-side energy bill comparison: standard unit vs. Green Home. Makes savings concrete and personal before the first human conversation ever happens." },
    { label: "Savings calculator interaction", detail: "Visitor enters their current monthly bill. The tool shows monthly savings, annual savings, and the 10-year total vs. the MAD 7,000 premium. The math is always compelling. This is the conversion engine." },
    { label: "WhatsApp or callback", detail: "Lead captured. Advisor responds quickly and leads with the savings figure, not just property features. Speed + the savings anchor is the strongest conversion combination in this funnel." },
    { label: "CRM qualification", detail: "Lead is tagged: city, budget band, family size, current energy spend. Green Home is recommended to leads most sensitive to monthly costs. Advisor pitch is personalized to their calculated savings figure." },
    { label: "Green Home showroom visit", detail: "Visitor experiences the show unit with thermal insulation. The temperature difference from the standard unit is immediately tangible. On-site bill comparison and pilot resident testimonials close the gap." },
    { label: "Reservation", detail: "Buyer commits to a Green Home unit and pays the deposit. The 'savings investment' framing — you're buying a home that costs less to live in forever — makes the MAD 7,000 premium easy to absorb." },
    { label: "Post-sale energy report", detail: "Addoha sends quarterly energy usage reports from pilot residents. Builds word-of-mouth credibility: 'My Addoha Green Home actually reduced my bill by 40%.' The product earns its own marketing." },
  ];

  const convTargets = [
    { m: "Visitor → Lead", v: "4–7%", pct: 7, detail: "Higher than standard due to the bill-savings hook. A savings calculator converts visitors who would not engage with a standard project page. Target: 4–7% vs. industry 2–4%. A +2% lift means 50% more leads at zero incremental ad spend." },
    { m: "Lead → Visit", v: "25–35%", pct: 35, detail: "The savings narrative pre-sells the product before the showroom visit. Leads arrive already mathematically convinced of the value — advisors close more visits. Target: 25–35% vs. standard 20–30%." },
    { m: "Visit → Reservation", v: "12–18%", pct: 18, detail: "Showroom experience with thermal comfort and live energy data is a strong closer. The MAD 7,000 premium dissolves when the 10-year savings story is visible. Target: 12–18% vs. standard 10–15%." },
    { m: "Premium Acceptance Rate", v: "80%+", pct: 80, detail: "The critical KPI for Green Homes viability. Target: 80%+ of buyers accept the 7,000 MAD premium when savings are explained properly. Below 65%, messaging or calculator needs revision. Above 85%, pricing has room to move up." },
  ];

  const compareDims = [
    {
      dim: "Investment Model",
      wmd: "MAD 20–25M/yr operating spend",
      green: "MAD 6k/unit in COGS + MAD 5–8M/yr campaign",
      wmdDetail: "Annual operating expenditure: digital ads, CRM platform, content, staff. Recurring cost but fully flexible — can be scaled up or cut next quarter with no sunk cost.",
      greenDetail: "Construction cost is variable and embedded in COGS (recovered through the 7k premium). Annual campaign budget is smaller. One-time setup cost of ~MAD 5M for suppliers, showrooms, and training.",
      verdict: "WMD has higher ongoing annual cost. Green Homes front-loads setup but has significantly lower operating overhead once established. Better unit economics at scale.",
    },
    {
      dim: "Margin Driver",
      wmd: "+0.5–1% realized price + 2–3% volume lift",
      green: "+MAD 1,000 direct margin per unit + volume acceleration",
      wmdDetail: "Margin comes from better price realization (less discounting) and more units sold through a stronger digital funnel. Impact is aggregate across the full portfolio — not unit-by-unit.",
      greenDetail: "Direct per-unit margin contribution: MAD 1,000 on every green unit sold. Predictable, linear, and scalable. Every additional 1,000 green units = +MAD 1M in gross profit.",
      verdict: "Green Homes offers more predictable, auditable per-unit economics. WMD has a higher ceiling if price realization improves across the entire portfolio simultaneously.",
    },
    {
      dim: "Time to Impact",
      wmd: "3–6 months to full digital deployment",
      green: "12–18 months tied to construction cycles",
      wmdDetail: "A digital platform — landing pages, WhatsApp integration, CRM, simulators — can be built and live within one quarter. Sales impact is visible in the following sales cycle.",
      greenDetail: "Green features must be integrated at the construction design stage. A full project cycle from design decision to first sale takes 12–18 months minimum before any financial validation is possible.",
      verdict: "WMD wins decisively on speed. Green Homes demands organizational patience through at least one full construction-to-sales cycle before results can be measured.",
    },
    {
      dim: "Competitive Moat",
      wmd: "Low — digital playbook can be copied in 3–6 months",
      green: "Medium — product differentiation has a 6–12 month copy lag",
      wmdDetail: "A strong CRM and WhatsApp-first funnel is a known playbook in the sector. Any well-funded competitor can replicate it within one budget cycle and largely close the gap.",
      greenDetail: "Green features require supplier negotiations, engineering validation, staff training, and a full construction cycle. Competitors face a meaningful 6–12 month lag even after they decide to respond.",
      verdict: "Green Homes builds a more durable competitive advantage. WMD must continuously innovate its funnel to stay ahead of well-resourced copycats.",
    },
    {
      dim: "Customer Benefit",
      wmd: "Smoother buying process and faster financing clarity",
      green: "Permanent monthly bill reduction — tangible savings in MAD every month",
      wmdDetail: "Customers get a faster, clearer, less stressful ownership journey. Real value, but episodic — it matters most during the 3–6 month buying window, then is largely forgotten.",
      greenDetail: "Customers save money every single month for the lifetime of the home. The benefit persists for 20+ years and compounds as energy prices rise. It becomes a household talking point.",
      verdict: "Green Homes delivers a stronger, more lasting customer promise. WMD fixes the journey; Green Homes improves what the customer lives in every day for decades.",
    },
    {
      dim: "Execution Risk",
      wmd: "Low — operational, reversible, no supply chain dependency",
      green: "Medium — requires supply chain, QC, and construction coordination",
      wmdDetail: "If results disappoint, the marketing budget can be cut next quarter. No sunk infrastructure, no product liability risk, no construction dependency whatsoever.",
      greenDetail: "Supply chain disruptions, feature quality failures, or energy savings underperformance can damage brand reputation. Requires rigorous project management and supplier quality oversight.",
      verdict: "WMD has significantly lower execution risk. Green Homes requires stronger construction management capability and supply chain discipline to protect the brand.",
    },
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
        .cmp-row { transition: background 0.2s; cursor: pointer; }
        .cmp-row:hover { background: ${G_BG} !important; }
        @keyframes fadeSlide { from { opacity:0; transform:translateY(8px); } to { opacity:1; transform:none; } }
        .anim { animation: fadeSlide 0.3s cubic-bezier(.22,1,.36,1) forwards; }
        @keyframes scaleIn { from { opacity:0; transform:scale(0.97); } to { opacity:1; transform:none; } }
        .scale-in { animation: scaleIn 0.35s cubic-bezier(.22,1,.36,1) forwards; }
      `}</style>

      {/* ── HERO ── */}
      <div style={{ minHeight: "100vh", background: BLACK, display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "0 7vw 10vh", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "8vh", right: "7vw", width: "1px", height: "35vh", background: `linear-gradient(180deg, transparent, ${G}, transparent)` }} />
        <div style={{ position: "absolute", top: "8vh", right: "calc(7vw + 40px)", width: "1px", height: "20vh", background: `linear-gradient(180deg, transparent, ${G}44, transparent)` }} />

        <div style={{ position: "absolute", top: "8vh", left: "7vw", display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={{ width: "24px", height: "1px", background: G }} />
          <span style={{ fontSize: "11px", letterSpacing: "0.2em", color: G, textTransform: "uppercase", fontWeight: "500" }}>Addoha · Green Homes Strategy 2026</span>
        </div>

        <R delay={0.1}>
          <div style={{ fontSize: "clamp(64px, 13vw, 160px)", fontWeight: "700", lineHeight: 0.88, letterSpacing: "-0.04em", color: WHITE, marginBottom: "4px" }}>
            Addoha
          </div>
          <div style={{ fontSize: "clamp(64px, 13vw, 160px)", fontWeight: "700", lineHeight: 0.88, letterSpacing: "-0.04em", color: G, marginBottom: "4px" }}>
            Green
          </div>
          <div style={{ fontSize: "clamp(64px, 13vw, 160px)", fontWeight: "700", lineHeight: 0.88, letterSpacing: "-0.04em", color: WHITE, marginBottom: "48px" }}>
            Homes.
          </div>
        </R>

        <R delay={0.25}>
          <p style={{ fontSize: "clamp(16px, 2.2vw, 22px)", color: "#A1A1A6", maxWidth: "580px", lineHeight: 1.6, fontWeight: "300", marginBottom: "56px" }}>
            A product-first strategy that reduces household energy bills through low-cost green features — making Addoha units more affordable to live in, not just to buy.
          </p>
        </R>

        <R delay={0.35}>
          <div style={{ display: "flex", gap: "48px", flexWrap: "wrap" }}>
            {[["MAD 6,000", "Green features cost per unit"], ["MAD 7,000", "Price premium per unit"], ["~40%", "Estimated energy bill reduction"]].map(([v, l]) => (
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
        borderBottom: "1px solid #E5E5E5",
        padding: "0 7vw",
        display: "flex", alignItems: "center",
        transition: "background 0.3s",
      }}>
        <span style={{ fontSize: "13px", fontWeight: "700", color: G, letterSpacing: "-0.01em", padding: "16px 24px 16px 0", borderRight: "1px solid #E5E5E5", marginRight: "8px", flexShrink: 0 }}>AGH</span>
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
              Not a brand problem.<br />
              <span style={{ color: G }}>A cost-of-living problem.</span>
            </h2>
            <div style={{ width: "48px", height: "2px", background: G, marginBottom: "32px" }} />
            <p style={{ fontSize: "clamp(16px, 1.8vw, 20px)", color: GRAY, lineHeight: 1.7, maxWidth: "620px", fontWeight: "300", marginBottom: "72px" }}>
              Rising energy prices are eroding Moroccan household purchasing power. Buyers aren't just asking "Can I afford the home?" — they're asking "Can I afford to live in it?" Addoha can answer both.
            </p>
          </R>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1px", background: "#E5E5E5" }}>
            {[
              { v: "+18%", l: "Electricity tariff increase for residential users 2024", s: "ONEE Morocco" },
              { v: "62%", l: "Moroccan households cite bills as top post-purchase concern", s: "HCP Survey 2024" },
              { v: "MAD 600", l: "Average monthly household energy spend in urban Morocco", s: "Industry Estimate" },
              { v: "MAD 30k", l: "10-year savings potential with Green Home features", s: "Strategy Model" },
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
              Affordable housing<br />
              <span style={{ color: G }}>that reduces your bills.</span>
            </h2>
            <div style={{ width: "48px", height: "2px", background: G, marginBottom: "60px" }} />
          </R>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
            <R delay={0.05}>
              <div style={{ background: BLACK, padding: "52px 44px", height: "100%" }}>
                <div style={{ fontSize: "10px", fontWeight: "600", letterSpacing: "0.2em", color: G, textTransform: "uppercase", marginBottom: "24px" }}>Core Promise</div>
                <p style={{ fontSize: "clamp(18px, 2vw, 22px)", color: WHITE, lineHeight: 1.7, fontWeight: "300" }}>
                  "Become a homeowner while reducing your monthly cost of living — starting from day one."
                </p>
                <div style={{ marginTop: "40px", paddingTop: "32px", borderTop: "1px solid #1A1A1A" }}>
                  <div style={{ fontSize: "10px", fontWeight: "600", letterSpacing: "0.16em", color: G, textTransform: "uppercase", marginBottom: "12px" }}>Campaign Tagline</div>
                  <div style={{ fontSize: "clamp(18px, 2.2vw, 24px)", fontWeight: "700", color: G, letterSpacing: "-0.01em", fontStyle: "italic" }}>
                    "Tkhallas dar w tn9es l facture."
                  </div>
                  <div style={{ fontSize: "13px", color: "#6E6E73", marginTop: "6px", fontStyle: "italic" }}>Pay your home and reduce your bills.</div>
                </div>
              </div>
            </R>
            <R delay={0.1}>
              <div style={{ display: "flex", flexDirection: "column", gap: "1px", background: "#E5E5E5" }}>
                {[
                  ["Product-Led Differentiation", "Green features built into the unit — not a campaign promise but a physical reality"],
                  ["Economic Messaging", "Sell savings in MAD, not sustainability. Tangible, relatable, Moroccan-market-relevant"],
                  ["Per-Unit Margin", "Every green unit sold adds MAD 1,000 to gross profit — predictable and auditable"],
                  ["Volume Acceleration", "A better product sells faster, shortening cash cycles and improving project ROI"],
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
              Buy smarter.<br />
              <span style={{ color: G }}>Live cheaper.</span>
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
                  First-time buyers and young families in the <strong style={{ fontWeight: "600" }}>MAD 300k–700k TTC</strong> band — cost-sensitive buyers for whom monthly savings are a real, lasting financial benefit.
                </p>
              </div>
            </R>
            <R delay={0.1}>
              <div style={{ padding: "40px", background: G, borderRadius: "16px" }}>
                <div style={{ fontSize: "10px", fontWeight: "600", letterSpacing: "0.18em", color: "rgba(255,255,255,0.6)", textTransform: "uppercase", marginBottom: "16px" }}>Positioning Statement</div>
                <p style={{ fontSize: "18px", lineHeight: 1.6, color: WHITE, fontWeight: "500", fontStyle: "italic" }}>
                  "Addoha Green Homes: the most practical way to own a home and reduce your cost of living at the same time."
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
              A product strategy,<br />
              <span style={{ color: G }}>not a campaign.</span>
            </h2>
            <div style={{ width: "48px", height: "2px", background: G, marginBottom: "48px" }} />
          </R>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1px", background: "#E5E5E5" }}>
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
              From savings hook<br />
              <span style={{ color: G }}>to reservation.</span>
            </h2>
            <div style={{ width: "48px", height: "2px", background: G, marginBottom: "60px" }} />
          </R>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "60px", alignItems: "start" }}>
            <R delay={0.05}>
              <div>
                {funnelSteps.map((s, i, a) => {
                  const active = activeFunnelStep === i;
                  return (
                    <div key={i}>
                      <div onClick={() => setActiveFunnelStep(active ? null : i)} style={{ display: "flex", gap: "20px", alignItems: "stretch", cursor: "pointer" }}>
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                          <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: active ? G : "transparent", border: `1.5px solid ${active ? G : "#D2D2D7"}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "all 0.2s" }}>
                            <span style={{ fontSize: "10px", fontWeight: "700", color: active ? WHITE : GRAY }}>{i + 1}</span>
                          </div>
                          {i < a.length - 1 && <div style={{ width: "1px", flex: 1, background: active ? G : "#E5E5E5", minHeight: "20px", transition: "background 0.2s" }} />}
                        </div>
                        <div style={{ paddingBottom: "24px", paddingTop: "6px", flex: 1 }}>
                          <span style={{ fontSize: "15px", fontWeight: active ? "600" : "300", color: active ? BLACK : GRAY, transition: "all 0.2s" }}>{s.label}</span>
                        </div>
                        <div style={{ paddingTop: "8px", fontSize: "14px", color: active ? G : "#D2D2D7", transition: "color 0.2s", flexShrink: 0 }}>›</div>
                      </div>
                      {active && (
                        <div className="anim" style={{ marginLeft: "52px", marginTop: "-16px", marginBottom: "20px", padding: "16px 20px", background: G_BG, borderLeft: `2px solid ${G}`, borderRadius: "0 8px 8px 0" }}>
                          <p style={{ fontSize: "13px", color: BLACK, lineHeight: 1.7, fontWeight: "300" }}>{s.detail}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </R>

            <R delay={0.1}>
              <div>
                <div style={{ fontSize: "10px", fontWeight: "600", letterSpacing: "0.18em", color: G, textTransform: "uppercase", marginBottom: "32px" }}>Conversion Targets — Pilot</div>
                {convTargets.map(({ m, v, pct, detail }, idx) => {
                  const active = activeConvTarget === idx;
                  return (
                    <div key={m} style={{ marginBottom: "28px" }}>
                      <div onClick={() => setActiveConvTarget(active ? null : idx)} style={{ cursor: "pointer" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "8px" }}>
                          <span style={{ fontSize: "13px", color: active ? BLACK : GRAY, fontWeight: active ? "600" : "400", transition: "all 0.2s" }}>{m}</span>
                          <span style={{ fontSize: "24px", fontWeight: "700", letterSpacing: "-0.02em", color: active ? G : BLACK, transition: "color 0.2s" }}>{v}</span>
                        </div>
                        <div style={{ height: "3px", background: "#E5E5E5", borderRadius: "2px" }}>
                          <div style={{ height: "3px", background: G, borderRadius: "2px", width: `${pct}%`, transition: "width 1s cubic-bezier(.22,1,.36,1)" }} />
                        </div>
                      </div>
                      {active && (
                        <div className="anim" style={{ marginTop: "12px", padding: "14px 18px", background: G_BG, borderLeft: `2px solid ${G}`, borderRadius: "0 8px 8px 0" }}>
                          <p style={{ fontSize: "13px", color: BLACK, lineHeight: 1.7, fontWeight: "300" }}>{detail}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
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
              Per-unit economics.<br />
              <span style={{ color: G }}>Portfolio impact.</span>
            </h2>
            <div style={{ width: "48px", height: "2px", background: G, marginBottom: "20px" }} />
            <p style={{ fontSize: "13px", color: GRAY, fontFamily: "monospace", marginBottom: "40px", letterSpacing: "0.04em" }}>
              Base: MAD 2,594.7M Revenue 2024 · 25.4% gross margin → ~MAD 659.8M gross profit · ~10,000 Eco & MS units
            </p>
          </R>

          {/* Per-Unit Economics */}
          <R>
            <div style={{ fontSize: "10px", fontWeight: "600", letterSpacing: "0.18em", color: G, textTransform: "uppercase", marginBottom: "16px" }}>Per-Unit Green Economics</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: "1px", background: "#E5E5E5", marginBottom: "56px" }}>
              {[
                ["MAD 6,000", "Green Cost/Unit", null],
                ["MAD 7,000", "Price Premium/Unit", null],
                ["MAD 1,000", "Net Margin/Unit", "+17%"],
                ["~2 Years", "Customer Payback", "from savings"],
                ["MAD 30,000", "10-yr Customer Savings", "vs 7k premium"],
              ].map(([v, l, m], i) => (
                <R key={i} delay={i * 0.06}>
                  <div style={{ background: i === 4 ? BLACK : WHITE, padding: "28px 20px" }}>
                    <div style={{ fontSize: "clamp(13px, 1.5vw, 18px)", fontWeight: "700", letterSpacing: "-0.02em", color: i === 4 ? WHITE : BLACK, marginBottom: "8px" }}>{v}</div>
                    <div style={{ fontSize: "12px", color: i === 4 ? "rgba(255,255,255,0.5)" : GRAY, marginBottom: "4px" }}>{l}</div>
                    {m && <div style={{ fontSize: "11px", fontWeight: "600", color: G }}>{m}</div>}
                  </div>
                </R>
              ))}
            </div>
          </R>

          <div style={{ display: "flex", gap: "1px", background: "#E5E5E5", marginBottom: "1px" }}>
            {["Lever A — Green Premium Volume", "Lever B — Sales Velocity Lift"].map((l, i) => (
              <button key={i} onClick={() => setActiveLever(i)} style={{
                flex: 1, padding: "18px", background: activeLever === i ? BLACK : WHITE, border: "none",
                color: activeLever === i ? WHITE : GRAY, fontWeight: activeLever === i ? "600" : "400",
                fontSize: "14px", letterSpacing: "0.01em", transition: "all 0.2s",
              }}>{l}</button>
            ))}
          </div>

          <div className="anim" key={activeLever} style={{ background: LIGHT, marginBottom: "24px" }}>
            {(activeLever === 0 ? [
              ["5,000 green units sold", "MAD 5.0M"],
              ["8,000 green units sold", "MAD 8.0M"],
              ["12,000 green units sold", "MAD 12.0M"],
            ] : [
              ["+3% volume (faster sales from differentiation)", "MAD 19.8M"],
              ["+5% volume", "MAD 33.0M"],
              ["+7% volume", "MAD 46.2M"],
            ]).map(([s, v], i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "24px 32px", borderBottom: "1px solid #E5E5E5" }}>
                <span style={{ fontSize: "16px", fontWeight: "300" }}>{s}</span>
                <span style={{ fontSize: "clamp(24px, 3vw, 36px)", fontWeight: "700", color: G, letterSpacing: "-0.02em" }}>{v}</span>
              </div>
            ))}
          </div>

          <div style={{ fontSize: "10px", fontWeight: "600", letterSpacing: "0.18em", color: G, textTransform: "uppercase", marginBottom: "16px" }}>Combined Upside</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "56px" }}>
            {[
              ["8k units + 3% volume", "~MAD 27.8M", false],
              ["12k units + 5% volume", "~MAD 45.0M", true],
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

          {/* Investment Frame */}
          <R>
            <div style={{ width: "48px", height: "2px", background: G, marginBottom: "32px" }} />
            <div style={{ fontSize: "10px", fontWeight: "600", letterSpacing: "0.18em", color: G, textTransform: "uppercase", marginBottom: "16px" }}>Marketing Investment Frame</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "24px" }}>
              {[
                ["MAD 5–8M / yr", "Annual Campaign Investment", "Facebook & Instagram · Showroom displays · Sales training · Bill calculator tool", false],
                ["~0.3% of Revenue", "Investment-to-Revenue Ratio", "Exceptionally lean vs. WMD's 0.9% — main cost is embedded per-unit in COGS, not marketing spend", true],
              ].map(([v, t, d, bold], i) => (
                <R key={i} delay={i * 0.08}>
                  <div style={{ padding: "36px 32px", background: bold ? G_BG : LIGHT, borderRadius: "16px", border: bold ? `1.5px solid ${G}44` : "none" }}>
                    <div style={{ fontSize: "clamp(20px, 2.5vw, 28px)", fontWeight: "700", letterSpacing: "-0.02em", color: bold ? G : BLACK, marginBottom: "10px" }}>{v}</div>
                    <div style={{ fontWeight: "600", fontSize: "14px", marginBottom: "8px" }}>{t}</div>
                    <div style={{ fontSize: "13px", color: GRAY, lineHeight: 1.5, fontWeight: "300" }}>{d}</div>
                  </div>
                </R>
              ))}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1px", background: "#E5E5E5" }}>
              {[
                ["Break-even", "8,000 green units", "Direct margin from the premium alone covers MAD 8M annual campaign at 8k units — no volume uplift needed"],
                ["Conservative ROI", "+247% net return", "+MAD 27.8M upside − MAD 8M cost → +MAD 19.8M net. Volume and premium both contributing."],
                ["Ambitious ROI", "+463% net return", "+MAD 45M upside − MAD 8M cost → +MAD 37M net on invested capital. Strongest ROI scenario in this strategy set."],
              ].map(([t, v, d], i) => (
                <R key={i} delay={i * 0.06}>
                  <div style={{ background: WHITE, padding: "32px 24px" }}>
                    <div style={{ fontSize: "10px", fontWeight: "600", letterSpacing: "0.14em", color: G, textTransform: "uppercase", marginBottom: "12px" }}>{t}</div>
                    <div style={{ fontSize: "clamp(15px, 1.8vw, 20px)", fontWeight: "700", letterSpacing: "-0.02em", color: BLACK, marginBottom: "10px", whiteSpace: "pre-line" }}>{v}</div>
                    <div style={{ fontSize: "12px", color: GRAY, lineHeight: 1.5, fontWeight: "300" }}>{d}</div>
                  </div>
                </R>
              ))}
            </div>
          </R>
        </section>

        <div style={{ height: "1px", background: "#E5E5E5" }} />

        {/* ── GREEN FEATURES ── */}
        <section id="green" style={{ padding: "120px 0 80px" }}>
          <R>
            <div style={{ fontSize: "11px", fontWeight: "600", letterSpacing: "0.18em", color: G, textTransform: "uppercase", marginBottom: "20px" }}>07 — Green Features</div>
            <h2 style={{ fontSize: "clamp(36px, 6vw, 72px)", fontWeight: "700", letterSpacing: "-0.03em", lineHeight: 1, marginBottom: "24px" }}>
              Simple features.<br />
              <span style={{ color: G }}>Real savings.</span>
            </h2>
            <div style={{ width: "48px", height: "2px", background: G, marginBottom: "60px" }} />
          </R>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "40px" }}>
            {[
              ["~40%", "Estimated total energy bill reduction with full green feature set", "Strategy Model"],
              ["MAD 30K", "Estimated 10-year household savings vs MAD 7,000 one-time premium", "Net Present Value Est."],
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
              {[
                ["Solar Water Heaters", "30–40% reduction in hot water energy costs. Proven technology, low maintenance, scalable across all unit types."],
                ["Thermal Insulation", "15–25% reduction in cooling and heating loads. Immediate comfort improvement — cooler summers, warmer winters."],
                ["Optimized Orientation", "Building design maximizes natural light and cross-ventilation, reducing AC dependence from day one."],
                ["Double-Glazed Windows", "Reduces heat transfer, improves acoustic comfort, and lowers heating and cooling energy consumption."],
                ["LED Common Areas", "Energy-efficient lighting in all shared spaces — corridors, stairwells, parking — reduces building operating costs."],
                ["ONEE Partnership", "Certified energy audit for each Green Home project — gives Addoha credible, third-party validated savings data."],
              ].map(([title, desc], i) => (
                <div key={i} style={{ background: WHITE, padding: "32px 24px" }}>
                  <div style={{ width: "20px", height: "2px", background: G, marginBottom: "14px" }} />
                  <div style={{ fontSize: "14px", fontWeight: "600", marginBottom: "8px" }}>{title}</div>
                  <div style={{ fontSize: "13px", lineHeight: 1.6, fontWeight: "300", color: GRAY }}>{desc}</div>
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
              <span style={{ color: G }}>Build, validate, scale.</span>
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
              One message per ad.<br />
              <span style={{ color: G }}>MAD saved.</span>
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

        <div style={{ height: "1px", background: "#E5E5E5" }} />

        {/* ── COMPARISON vs. WMD ── */}
        <section id="compare" style={{ padding: "120px 0 80px" }}>
          <R>
            <div style={{ fontSize: "11px", fontWeight: "600", letterSpacing: "0.18em", color: G, textTransform: "uppercase", marginBottom: "20px" }}>10 — Strategy Comparison</div>
            <h2 style={{ fontSize: "clamp(36px, 6vw, 72px)", fontWeight: "700", letterSpacing: "-0.03em", lineHeight: 1, marginBottom: "24px" }}>
              Green Homes<br />
              <span style={{ color: G }}>vs. Welli Moul Dar.</span>
            </h2>
            <div style={{ width: "48px", height: "2px", background: G, marginBottom: "32px" }} />
            <p style={{ fontSize: "clamp(16px, 1.8vw, 20px)", color: GRAY, lineHeight: 1.7, maxWidth: "620px", fontWeight: "300", marginBottom: "60px" }}>
              Two distinct strategic paths — one fixes the funnel, one improves the product. Click any dimension to see the full analysis. Neither is wrong; the question is sequencing.
            </p>
          </R>

          {/* Column headers */}
          <R>
            <div style={{ display: "grid", gridTemplateColumns: "2fr 3fr 3fr", gap: "1px", background: "#E5E5E5", marginBottom: "1px" }}>
              <div style={{ background: LIGHT, padding: "20px 24px" }}>
                <div style={{ fontSize: "10px", fontWeight: "600", letterSpacing: "0.16em", color: GRAY, textTransform: "uppercase" }}>Dimension</div>
              </div>
              <div style={{ background: "#050505", padding: "20px 24px" }}>
                <div style={{ fontSize: "10px", fontWeight: "600", letterSpacing: "0.16em", color: "#B8952A", textTransform: "uppercase", marginBottom: "4px" }}>WMD</div>
                <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.5)", fontWeight: "300" }}>Welli Moul Dar — funnel & conversion</div>
              </div>
              <div style={{ background: G, padding: "20px 24px" }}>
                <div style={{ fontSize: "10px", fontWeight: "600", letterSpacing: "0.16em", color: "rgba(255,255,255,0.7)", textTransform: "uppercase", marginBottom: "4px" }}>Green Homes</div>
                <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.6)", fontWeight: "300" }}>Addoha Green Homes — product & savings</div>
              </div>
            </div>
          </R>

          <div style={{ borderBottom: "1px solid #E5E5E5" }}>
            {compareDims.map((c, i) => {
              const open = activeCompare === i;
              return (
                <R key={i} delay={i * 0.04}>
                  <div>
                    <div className="cmp-row" onClick={() => setActiveCompare(open ? null : i)} style={{ display: "grid", gridTemplateColumns: "2fr 3fr 3fr", gap: "1px", background: open ? G_BG : WHITE, borderTop: "1px solid #E5E5E5", transition: "background 0.2s" }}>
                      <div style={{ padding: "24px", display: "flex", alignItems: "center", gap: "12px" }}>
                        <div style={{ width: "20px", height: "20px", borderRadius: "50%", border: `1.5px solid ${open ? G : "#D2D2D7"}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, background: open ? G : "transparent", transition: "all 0.2s" }}>
                          <span style={{ fontSize: "10px", color: open ? WHITE : GRAY, transform: open ? "rotate(45deg)" : "none", display: "block", lineHeight: 1, transition: "transform 0.2s" }}>+</span>
                        </div>
                        <span style={{ fontSize: "13px", fontWeight: open ? "600" : "400", color: open ? BLACK : GRAY, transition: "all 0.2s" }}>{c.dim}</span>
                      </div>
                      <div style={{ padding: "24px", borderLeft: "1px solid #E5E5E5" }}>
                        <span style={{ fontSize: "13px", color: open ? BLACK : GRAY, fontWeight: open ? "500" : "300", lineHeight: 1.5, transition: "all 0.2s" }}>{c.wmd}</span>
                      </div>
                      <div style={{ padding: "24px", borderLeft: "1px solid #E5E5E5" }}>
                        <span style={{ fontSize: "13px", color: open ? G : GRAY, fontWeight: open ? "500" : "300", lineHeight: 1.5, transition: "all 0.2s" }}>{c.green}</span>
                      </div>
                    </div>
                    {open && (
                      <div className="anim" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1px", background: "#E5E5E5" }}>
                        <div style={{ background: G_BG, padding: "28px 24px" }}>
                          <div style={{ fontSize: "10px", fontWeight: "600", letterSpacing: "0.14em", color: G, textTransform: "uppercase", marginBottom: "10px" }}>Verdict</div>
                          <p style={{ fontSize: "13px", color: BLACK, lineHeight: 1.7, fontWeight: "300" }}>{c.verdict}</p>
                        </div>
                        <div style={{ background: WHITE, padding: "28px 24px" }}>
                          <div style={{ fontSize: "10px", fontWeight: "600", letterSpacing: "0.14em", color: "#B8952A", textTransform: "uppercase", marginBottom: "10px" }}>WMD Detail</div>
                          <p style={{ fontSize: "13px", color: BLACK, lineHeight: 1.7, fontWeight: "300" }}>{c.wmdDetail}</p>
                        </div>
                        <div style={{ background: WHITE, padding: "28px 24px" }}>
                          <div style={{ fontSize: "10px", fontWeight: "600", letterSpacing: "0.14em", color: G, textTransform: "uppercase", marginBottom: "10px" }}>Green Homes Detail</div>
                          <p style={{ fontSize: "13px", color: BLACK, lineHeight: 1.7, fontWeight: "300" }}>{c.greenDetail}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </R>
              );
            })}
          </div>

          {/* Combined recommendation */}
          <R>
            <div style={{ marginTop: "56px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
              <div style={{ padding: "48px 40px", background: BLACK, borderRadius: "16px" }}>
                <div style={{ fontSize: "10px", fontWeight: "600", letterSpacing: "0.18em", color: G, textTransform: "uppercase", marginBottom: "20px" }}>Strategic Recommendation</div>
                <p style={{ fontSize: "clamp(16px, 1.8vw, 20px)", color: WHITE, lineHeight: 1.7, fontWeight: "300", marginBottom: "24px" }}>
                  These are not competing strategies. They operate on different time horizons and different levers. The optimal path is sequential, not either-or.
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                  {[
                    ["Now → 6 months", "Deploy WMD: fast, low-risk, immediate funnel impact"],
                    ["6 → 18 months", "Integrate Green Homes into next construction cycle"],
                    ["18 months+", "Run both: WMD drives traffic, Green Homes closes conviction"],
                  ].map(([t, d]) => (
                    <div key={t} style={{ display: "flex", gap: "16px", alignItems: "flex-start" }}>
                      <div style={{ fontSize: "10px", color: G, fontWeight: "600", letterSpacing: "0.08em", minWidth: "100px", paddingTop: "2px" }}>{t}</div>
                      <div style={{ fontSize: "14px", color: "#A1A1A6", lineHeight: 1.5, fontWeight: "300" }}>{d}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "1px", background: "#E5E5E5" }}>
                {[
                  ["Combined Upside", "MAD 60–90M additional gross profit at maturity (both strategies running)", G],
                  ["WMD alone", "MAD 26–46M (price + volume lever)", "#B8952A"],
                  ["Green alone", "MAD 28–45M (premium + velocity)", G],
                  ["Complementary", "WMD improves the journey. Green Homes improves the product. One amplifies the other.", GRAY],
                ].map(([t, d, c], i) => (
                  <div key={i} style={{ background: WHITE, padding: "24px 28px" }}>
                    <div style={{ fontSize: "11px", fontWeight: "600", color: c, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "6px" }}>{t}</div>
                    <div style={{ fontSize: "13px", color: GRAY, lineHeight: 1.5, fontWeight: "300" }}>{d}</div>
                  </div>
                ))}
              </div>
            </div>
          </R>
        </section>

      </div>

      {/* ── FOOTER ── */}
      <div style={{ background: BLACK, padding: "100px 7vw", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: 0, left: "7vw", right: "7vw", height: "1px", background: `linear-gradient(90deg, transparent, ${G}, transparent)` }} />
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ fontSize: "clamp(52px, 9vw, 100px)", fontWeight: "700", letterSpacing: "-0.04em", color: WHITE, lineHeight: 0.9, marginBottom: "12px" }}>
            Addoha Green Homes.
          </div>
          <div style={{ fontSize: "clamp(20px, 3.5vw, 40px)", color: G, letterSpacing: "0.05em", fontFamily: "monospace", marginBottom: "48px", direction: "rtl", display: "block" }}>
            تْخَلَّص دار وتنقص الفاكتورة
          </div>
          <div style={{ width: "100%", height: "1px", background: "#1A1A1A", marginBottom: "48px" }} />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "48px" }}>
            <p style={{ fontSize: "16px", color: "#6E6E73", lineHeight: 1.7, fontWeight: "300" }}>
              At MAD 6,000 cost and MAD 7,000 premium, every green unit contributes{" "}
              <span style={{ color: WHITE, fontWeight: "600" }}>MAD 1,000</span> in incremental gross profit. At 12,000 units sold and a 5% volume lift, the combined upside reaches{" "}
              <span style={{ color: G, fontWeight: "600" }}>MAD 45M</span> — on a campaign budget of just MAD 5–8M. The customer saves MAD 30,000 over 10 years. Addoha gains a product moat. Both win.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {[
                ["Strategy", "Addoha Green Homes"],
                ["Core Lever", "Product enhancement + economic messaging"],
                ["Tagline", "Tkhallas dar w tn9es l facture"],
                ["vs. WMD", "Complementary — deploy sequentially"],
              ].map(([k, v]) => (
                <div key={k} style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid #1A1A1A", paddingBottom: "16px" }}>
                  <span style={{ fontSize: "12px", color: "#444", letterSpacing: "0.1em", textTransform: "uppercase" }}>{k}</span>
                  <span style={{ fontSize: "13px", color: "#A1A1A6", fontWeight: "300" }}>{v}</span>
                </div>
              ))}
            </div>
          </div>
          <div style={{ marginTop: "60px", fontSize: "10px", color: "#333", letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: "600" }}>
            ADDOHA · GREEN HOMES STRATEGY · 2026
          </div>
        </div>
      </div>
    </div>
  );
}
