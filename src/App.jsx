import { useState, useRef } from "react";

const STYLE = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=DM+Sans:wght@300;400;500;600&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --cream: #F5F0E8;
    --dark: #1A1208;
    --gold: #C9A84C;
    --gold-light: #E8D5A0;
    --rust: #8B3A2A;
    --sage: #4A6741;
    --warm-gray: #8C8070;
    --card-bg: #FFFDF8;
    --border: #E0D5C0;
  }

  body { background: var(--cream); font-family: 'DM Sans', sans-serif; color: var(--dark); }

  .app { min-height: 100vh; }

  /* HEADER */
  .header {
    background: var(--dark);
    padding: 20px 40px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 3px solid var(--gold);
  }
  .header-brand { display: flex; align-items: center; gap: 14px; }
  .header-icon {
    width: 44px; height: 44px;
    background: var(--gold);
    border-radius: 8px;
    display: flex; align-items: center; justify-content: center;
    font-size: 22px;
  }
  .header-title {
    font-family: 'Playfair Display', serif;
    font-size: 22px;
    color: var(--cream);
    letter-spacing: 0.5px;
  }
  .header-sub { font-size: 12px; color: var(--gold-light); letter-spacing: 1.5px; text-transform: uppercase; margin-top: 2px; }
  .header-stats { display: flex; gap: 28px; }
  .stat-pill {
    text-align: center;
  }
  .stat-pill .num { font-family: 'Playfair Display', serif; font-size: 22px; color: var(--gold); }
  .stat-pill .lbl { font-size: 10px; color: var(--warm-gray); text-transform: uppercase; letter-spacing: 1px; }

  /* MAIN LAYOUT */
  .main { display: grid; grid-template-columns: 360px 1fr; min-height: calc(100vh - 83px); }

  /* SIDEBAR */
  .sidebar {
    background: var(--card-bg);
    border-right: 1px solid var(--border);
    padding: 28px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    overflow-y: auto;
    max-height: calc(100vh - 83px);
  }

  .sidebar-section-title {
    font-family: 'Playfair Display', serif;
    font-size: 16px;
    color: var(--dark);
    margin-bottom: 12px;
    padding-bottom: 8px;
    border-bottom: 1px solid var(--border);
  }

  .input-group { display: flex; flex-direction: column; gap: 5px; margin-bottom: 10px; }
  .input-group label { font-size: 11px; font-weight: 600; color: var(--warm-gray); text-transform: uppercase; letter-spacing: 1px; }
  .input-group input, .input-group select, .input-group textarea {
    border: 1.5px solid var(--border);
    border-radius: 6px;
    padding: 9px 12px;
    font-family: 'DM Sans', sans-serif;
    font-size: 13px;
    background: white;
    color: var(--dark);
    transition: border-color 0.2s;
    outline: none;
  }
  .input-group input:focus, .input-group select:focus, .input-group textarea:focus {
    border-color: var(--gold);
  }

  .btn-primary {
    background: var(--gold);
    color: var(--dark);
    border: none;
    border-radius: 7px;
    padding: 12px 20px;
    font-family: 'DM Sans', sans-serif;
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    width: 100%;
    letter-spacing: 0.5px;
    transition: background 0.2s, transform 0.1s;
  }
  .btn-primary:hover { background: #b8943e; }
  .btn-primary:active { transform: scale(0.98); }
  .btn-primary:disabled { background: var(--border); color: var(--warm-gray); cursor: not-allowed; }

  .btn-secondary {
    background: transparent;
    color: var(--rust);
    border: 1.5px solid var(--rust);
    border-radius: 7px;
    padding: 10px 20px;
    font-family: 'DM Sans', sans-serif;
    font-size: 12px;
    font-weight: 600;
    cursor: pointer;
    width: 100%;
    letter-spacing: 0.5px;
    transition: all 0.2s;
    margin-top: 6px;
  }
  .btn-secondary:hover { background: var(--rust); color: white; }

  .upload-zone {
    border: 2px dashed var(--gold);
    border-radius: 10px;
    padding: 22px;
    text-align: center;
    cursor: pointer;
    transition: background 0.2s;
    background: rgba(201, 168, 76, 0.04);
  }
  .upload-zone:hover { background: rgba(201, 168, 76, 0.1); }
  .upload-icon { font-size: 28px; margin-bottom: 8px; }
  .upload-text { font-size: 12px; color: var(--warm-gray); line-height: 1.5; }
  .upload-text strong { color: var(--gold); }

  .divider { display: flex; align-items: center; gap: 10px; color: var(--warm-gray); font-size: 11px; text-transform: uppercase; letter-spacing: 1px; }
  .divider::before, .divider::after { content: ''; flex: 1; height: 1px; background: var(--border); }

  /* CONTENT AREA */
  .content {
    padding: 28px 32px;
    overflow-y: auto;
    max-height: calc(100vh - 83px);
  }

  .content-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 24px;
  }
  .content-title { font-family: 'Playfair Display', serif; font-size: 26px; color: var(--dark); }
  .content-sub { font-size: 13px; color: var(--warm-gray); margin-top: 3px; }

  /* FILTER BAR */
  .filter-bar {
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
    flex-wrap: wrap;
  }
  .filter-btn {
    padding: 7px 16px;
    border-radius: 20px;
    border: 1.5px solid var(--border);
    background: white;
    font-size: 12px;
    font-family: 'DM Sans', sans-serif;
    cursor: pointer;
    color: var(--warm-gray);
    transition: all 0.2s;
    font-weight: 500;
  }
  .filter-btn.active { background: var(--dark); color: var(--cream); border-color: var(--dark); }
  .filter-btn:hover:not(.active) { border-color: var(--gold); color: var(--dark); }

  /* LISTING CARDS */
  .listings-grid { display: flex; flex-direction: column; gap: 16px; }

  .listing-card {
    background: var(--card-bg);
    border: 1px solid var(--border);
    border-radius: 12px;
    overflow: hidden;
    transition: box-shadow 0.2s, transform 0.2s;
    position: relative;
  }
  .listing-card:hover { box-shadow: 0 6px 24px rgba(0,0,0,0.08); transform: translateY(-1px); }

  .priority-bar { height: 4px; width: 100%; }
  .priority-hot { background: linear-gradient(90deg, var(--rust), #C0392B); }
  .priority-warm { background: linear-gradient(90deg, var(--gold), #E8A020); }
  .priority-cold { background: linear-gradient(90deg, var(--sage), #5A8A50); }

  .card-body { padding: 18px 20px; }
  .card-top { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 12px; }
  .card-address { font-family: 'Playfair Display', serif; font-size: 16px; color: var(--dark); line-height: 1.3; }
  .card-city { font-size: 12px; color: var(--warm-gray); margin-top: 2px; }
  .priority-badge {
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 1px;
    text-transform: uppercase;
    padding: 4px 10px;
    border-radius: 12px;
    white-space: nowrap;
  }
  .badge-hot { background: rgba(139, 58, 42, 0.12); color: var(--rust); }
  .badge-warm { background: rgba(201, 168, 76, 0.15); color: #8B6914; }
  .badge-cold { background: rgba(74, 103, 65, 0.12); color: var(--sage); }

  .card-metrics { display: flex; gap: 20px; margin-bottom: 14px; flex-wrap: wrap; }
  .metric { display: flex; flex-direction: column; gap: 2px; }
  .metric-val { font-size: 15px; font-weight: 600; color: var(--dark); }
  .metric-lbl { font-size: 10px; color: var(--warm-gray); text-transform: uppercase; letter-spacing: 0.8px; }
  .metric-delta { font-size: 11px; font-weight: 600; }
  .delta-neg { color: var(--rust); }
  .delta-pos { color: var(--sage); }

  .card-actions { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 12px; }
  .action-btn {
    padding: 6px 14px;
    border-radius: 6px;
    border: 1.5px solid var(--border);
    background: white;
    font-size: 11px;
    font-family: 'DM Sans', sans-serif;
    cursor: pointer;
    color: var(--dark);
    font-weight: 500;
    transition: all 0.15s;
    display: flex; align-items: center; gap: 5px;
  }
  .action-btn:hover { border-color: var(--gold); background: rgba(201,168,76,0.06); }
  .action-btn.ai-btn { background: var(--dark); color: var(--cream); border-color: var(--dark); }
  .action-btn.ai-btn:hover { background: #2d2010; }

  /* OUTREACH LOG */
  .outreach-log { margin-top: 10px; border-top: 1px solid var(--border); padding-top: 10px; }
  .log-title { font-size: 11px; font-weight: 600; color: var(--warm-gray); text-transform: uppercase; letter-spacing: 1px; margin-bottom: 8px; }
  .log-entries { display: flex; flex-direction: column; gap: 5px; }
  .log-entry { display: flex; align-items: center; gap: 8px; font-size: 12px; color: var(--dark); }
  .log-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--gold); flex-shrink: 0; }
  .log-date { color: var(--warm-gray); font-size: 11px; }
  .log-add { display: flex; gap: 6px; margin-top: 8px; }
  .log-input { flex: 1; border: 1px solid var(--border); border-radius: 5px; padding: 6px 10px; font-size: 12px; font-family: 'DM Sans', sans-serif; outline: none; }
  .log-input:focus { border-color: var(--gold); }
  .log-submit { background: var(--gold); border: none; border-radius: 5px; padding: 6px 12px; font-size: 12px; font-weight: 600; cursor: pointer; color: var(--dark); }

  /* AI MODAL */
  .modal-overlay {
    position: fixed; inset: 0;
    background: rgba(26, 18, 8, 0.7);
    display: flex; align-items: center; justify-content: center;
    z-index: 100;
    padding: 20px;
  }
  .modal {
    background: var(--card-bg);
    border-radius: 14px;
    width: 100%;
    max-width: 620px;
    max-height: 80vh;
    overflow-y: auto;
    border: 1px solid var(--border);
    box-shadow: 0 20px 60px rgba(0,0,0,0.25);
  }
  .modal-header {
    padding: 22px 26px 16px;
    border-bottom: 1px solid var(--border);
    display: flex; justify-content: space-between; align-items: center;
    position: sticky; top: 0; background: var(--card-bg);
  }
  .modal-title { font-family: 'Playfair Display', serif; font-size: 20px; }
  .modal-close { background: none; border: none; font-size: 22px; cursor: pointer; color: var(--warm-gray); }
  .modal-body { padding: 22px 26px; }

  .ai-section { margin-bottom: 22px; }
  .ai-section-title {
    font-size: 11px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase;
    color: var(--gold); margin-bottom: 10px;
    display: flex; align-items: center; gap: 6px;
  }
  .ai-section-title::after { content: ''; flex: 1; height: 1px; background: var(--gold-light); }
  .ai-content { font-size: 13px; line-height: 1.7; color: var(--dark); white-space: pre-wrap; }

  .loading-pulse {
    display: flex; gap: 6px; align-items: center; padding: 20px 0;
  }
  .pulse-dot {
    width: 8px; height: 8px; border-radius: 50%; background: var(--gold);
    animation: pulse 1.2s ease-in-out infinite;
  }
  .pulse-dot:nth-child(2) { animation-delay: 0.2s; }
  .pulse-dot:nth-child(3) { animation-delay: 0.4s; }
  @keyframes pulse { 0%,80%,100% { opacity: 0.3; transform: scale(0.8); } 40% { opacity: 1; transform: scale(1); } }

  /* EMPTY STATE */
  .empty-state {
    text-align: center;
    padding: 80px 40px;
    color: var(--warm-gray);
  }
  .empty-icon { font-size: 52px; margin-bottom: 16px; opacity: 0.5; }
  .empty-title { font-family: 'Playfair Display', serif; font-size: 22px; color: var(--dark); margin-bottom: 8px; }
  .empty-sub { font-size: 14px; line-height: 1.6; max-width: 340px; margin: 0 auto; }

  /* CSV PREVIEW */
  .csv-preview { background: #f9f6f0; border: 1px solid var(--border); border-radius: 8px; padding: 14px; margin-top: 10px; font-size: 12px; color: var(--warm-gray); }

  .tag { display: inline-block; background: rgba(201,168,76,0.15); color: #7A5C10; border-radius: 4px; padding: 2px 7px; font-size: 11px; font-weight: 600; margin-right: 4px; margin-bottom: 4px; }

  @media (max-width: 768px) {
    .main { grid-template-columns: 1fr; }
    .sidebar { max-height: none; border-right: none; border-bottom: 1px solid var(--border); }
    .header { padding: 14px 20px; }
    .header-stats { gap: 16px; }
    .content { padding: 20px; }
  }
`;

const SAMPLE_CSV = `Address,City,State,ZIP,MLS,ListPrice,EstValue,DOM,Beds,Baths,SqFt,YearBuilt,OwnerName,OwnerPhone,Subdivision,PropertyType
223 S Torrence St #65,Charlotte,NC,28204,4365139,449900,431900,2,3,3.5,1362,1999,Spencer Robert J,,Crown View,Condo
4521 Providence Rd,Charlotte,NC,28211,4380221,685000,650000,47,4,3,2840,1987,Davis Michael & Lisa,,Myers Park,Single Family
892 Riverdale Ave,Gastonia,NC,28054,4372015,249900,261000,31,3,2,1580,2002,Williams Teresa,,Lakewood,Single Family`;

function parsePriority(dom, listPrice, estValue) {
  const ratio = estValue > 0 ? (listPrice - estValue) / estValue : 0;
  if (dom > 45 || ratio > 0.08) return "hot";
  if (dom > 20 || ratio > 0.03) return "warm";
  return "cold";
}

function fmtCurrency(n) {
  if (!n) return "—";
  return "$" + Number(n).toLocaleString();
}

function fmtDelta(listPrice, estValue) {
  if (!listPrice || !estValue) return null;
  const diff = listPrice - estValue;
  const pct = ((diff / estValue) * 100).toFixed(1);
  return { diff, pct };
}

function parseCSV(text) {
  const lines = text.trim().split("\n");
  if (lines.length < 2) return [];
  const headers = lines[0].split(",").map(h => h.trim().toLowerCase().replace(/\s+/g, "_"));
  return lines.slice(1).map((line, i) => {
    const vals = line.split(",");
    const obj = {};
    headers.forEach((h, idx) => { obj[h] = vals[idx]?.trim() || ""; });
    return {
      id: Date.now() + i,
      address: obj.address || "",
      city: obj.city || "",
      state: obj.state || "NC",
      zip: obj.zip || "",
      mls: obj.mls || "",
      listPrice: Number(obj.listprice) || 0,
      estValue: Number(obj.estvalue) || 0,
      dom: Number(obj.dom) || 0,
      beds: obj.beds || "",
      baths: obj.baths || "",
      sqft: obj.sqft || "",
      yearBuilt: obj.yearbuilt || "",
      ownerName: obj.ownername || "",
      ownerPhone: obj.ownerphone || "",
      subdivision: obj.subdivision || "",
      propertyType: obj.propertytype || "",
      priority: parsePriority(Number(obj.dom) || 0, Number(obj.listprice) || 0, Number(obj.estvalue) || 0),
      outreachLog: [],
      showLog: false,
    };
  }).filter(l => l.address);
}

export default function GloriaLeads() {
  const [listings, setListings] = useState([]);
  const [filter, setFilter] = useState("all");
  const [aiModal, setAiModal] = useState(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiResult, setAiResult] = useState(null);
  const [logInputs, setLogInputs] = useState({});
  const fileRef = useRef();

  // Manual form
  const [form, setForm] = useState({
    address: "", city: "Charlotte", state: "NC", zip: "",
    listPrice: "", estValue: "", dom: "",
    beds: "", baths: "", sqft: "", yearBuilt: "",
    ownerName: "", ownerPhone: "", subdivision: "", propertyType: "Single Family"
  });

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const parsed = parseCSV(ev.target.result);
      setListings(prev => [...prev, ...parsed]);
    };
    reader.readAsText(file);
  };

  const handleSampleLoad = () => {
    const parsed = parseCSV(SAMPLE_CSV);
    setListings(parsed);
  };

  const handleAddManual = () => {
    if (!form.address) return;
    const listing = {
      id: Date.now(),
      ...form,
      listPrice: Number(form.listPrice) || 0,
      estValue: Number(form.estValue) || 0,
      dom: Number(form.dom) || 0,
      priority: parsePriority(Number(form.dom) || 0, Number(form.listPrice) || 0, Number(form.estValue) || 0),
      outreachLog: [],
      showLog: false,
    };
    setListings(prev => [listing, ...prev]);
    setForm({ address: "", city: "Charlotte", state: "NC", zip: "", listPrice: "", estValue: "", dom: "", beds: "", baths: "", sqft: "", yearBuilt: "", ownerName: "", ownerPhone: "", subdivision: "", propertyType: "Single Family" });
  };

  const openAI = async (listing) => {
    setAiModal(listing);
    setAiLoading(true);
    setAiResult(null);
    const delta = fmtDelta(listing.listPrice, listing.estValue);
    const prompt = `You are a real estate coaching assistant helping Gloria, a licensed real estate broker in Charlotte, NC. She is prospecting expired MLS listings.

Property Details:
- Address: ${listing.address}, ${listing.city}, ${listing.state} ${listing.zip}
- List Price: ${fmtCurrency(listing.listPrice)}
- Estimated Market Value (AVM): ${fmtCurrency(listing.estValue)}
- Price vs. Market: ${delta ? (delta.diff > 0 ? `Overpriced by $${Math.abs(delta.diff).toLocaleString()} (${delta.pct}%)` : `Underpriced by $${Math.abs(delta.diff).toLocaleString()} (${delta.pct}%)`) : "Unknown"}
- Days on Market Before Expiring: ${listing.dom}
- Property Type: ${listing.propertyType}
- Beds/Baths: ${listing.beds}bd/${listing.baths}ba
- Square Feet: ${listing.sqft}
- Year Built: ${listing.yearBuilt}
- Owner Name: ${listing.ownerName || "Unknown"}
- Subdivision: ${listing.subdivision}

Generate a complete outreach playbook for Gloria. Include:

1. PRIORITY ASSESSMENT
Why this listing is or isn't a strong opportunity (2-3 sentences).

2. OWNER PSYCHOLOGY
What this seller is likely feeling right now and what their pain points are (2-3 sentences).

3. PHONE SCRIPT
A natural, warm phone opening for Gloria to use when calling this owner. Keep it under 120 words.

4. PERSONALIZED EMAIL
Subject line + email body (under 180 words). Warm, not pushy. Gloria's voice.

5. RECOMMENDED PRICING STRATEGY
Based on the AVM vs. list price gap, what Gloria should suggest if the owner asks.

6. FOLLOW-UP CADENCE
A 3-step follow-up plan with timing (Day 1, Day 7, Day 21).

Keep the tone warm, professional, and helpful — not salesy. Gloria is a trusted advisor, not a cold caller.`;

    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          messages: [{ role: "user", content: prompt }]
        })
      });
      const data = await res.json();
      const text = data.content?.map(b => b.text || "").join("") || "No response generated.";
      setAiResult(text);
    } catch {
      setAiResult("Error generating playbook. Please try again.");
    }
    setAiLoading(false);
  };

  const addLog = (id, type) => {
    const note = logInputs[id] || "";
    if (!note.trim()) return;
    setListings(prev => prev.map(l => l.id === id ? {
      ...l,
      outreachLog: [...l.outreachLog, { type, note, date: new Date().toLocaleDateString() }]
    } : l));
    setLogInputs(prev => ({ ...prev, [id]: "" }));
  };

  const toggleLog = (id) => {
    setListings(prev => prev.map(l => l.id === id ? { ...l, showLog: !l.showLog } : l));
  };

  const removeListing = (id) => {
    setListings(prev => prev.filter(l => l.id !== id));
  };

  const filtered = filter === "all" ? listings : listings.filter(l => l.priority === filter);

  const counts = {
    hot: listings.filter(l => l.priority === "hot").length,
    warm: listings.filter(l => l.priority === "warm").length,
    cold: listings.filter(l => l.priority === "cold").length,
  };

  const parseAIResult = (text) => {
    if (!text) return [];
    const sections = [];
    const parts = text.split(/\n(?=\d+\.\s+[A-Z])/);
    parts.forEach(part => {
      const match = part.match(/^(\d+)\.\s+([A-Z\s]+)\n([\s\S]*)/);
      if (match) {
        sections.push({ title: match[2].trim(), content: match[3].trim() });
      } else if (part.trim()) {
        sections.push({ title: "Overview", content: part.trim() });
      }
    });
    return sections.length > 0 ? sections : [{ title: "Outreach Playbook", content: text }];
  };

  return (
    <>
      <style>{STYLE}</style>
      <div className="app">
        {/* HEADER */}
        <div className="header">
          <div className="header-brand">
            <div className="header-icon">🏡</div>
            <div>
              <div className="header-title">Gloria Leads</div>
              <div className="header-sub">Expired Listing Intelligence · Charlotte Metro</div>
            </div>
          </div>
          <div className="header-stats">
            <div className="stat-pill"><div className="num">{listings.length}</div><div className="lbl">Total</div></div>
            <div className="stat-pill"><div className="num" style={{color:"#C0392B"}}>{counts.hot}</div><div className="lbl">Hot</div></div>
            <div className="stat-pill"><div className="num">{counts.warm}</div><div className="lbl">Warm</div></div>
            <div className="stat-pill"><div className="num" style={{color:"#4A6741"}}>{counts.cold}</div><div className="lbl">Cold</div></div>
          </div>
        </div>

        <div className="main">
          {/* SIDEBAR */}
          <div className="sidebar">
            {/* CSV UPLOAD */}
            <div>
              <div className="sidebar-section-title">📂 Import Listings</div>
              <div className="upload-zone" onClick={() => fileRef.current.click()}>
                <div className="upload-icon">📋</div>
                <div className="upload-text"><strong>Click to upload CSV</strong><br/>Export from MLS and drop here</div>
              </div>
              <input ref={fileRef} type="file" accept=".csv" style={{display:"none"}} onChange={handleFile} />
              <button className="btn-secondary" onClick={handleSampleLoad} style={{marginTop:10}}>Load Sample Data</button>
              <div className="csv-preview" style={{marginTop:8}}>
                Expected columns: Address, City, State, ZIP, MLS, ListPrice, EstValue, DOM, Beds, Baths, SqFt, YearBuilt, OwnerName, OwnerPhone, Subdivision, PropertyType
              </div>
            </div>

            <div className="divider">or add manually</div>

            {/* MANUAL FORM */}
            <div>
              <div className="sidebar-section-title">✏️ Add Single Listing</div>
              <div className="input-group">
                <label>Street Address*</label>
                <input value={form.address} onChange={e => setForm(p=>({...p,address:e.target.value}))} placeholder="123 Main St #4B" />
              </div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 80px",gap:8}}>
                <div className="input-group">
                  <label>City</label>
                  <input value={form.city} onChange={e => setForm(p=>({...p,city:e.target.value}))} />
                </div>
                <div className="input-group">
                  <label>ZIP</label>
                  <input value={form.zip} onChange={e => setForm(p=>({...p,zip:e.target.value}))} />
                </div>
              </div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
                <div className="input-group">
                  <label>List Price ($)</label>
                  <input type="number" value={form.listPrice} onChange={e => setForm(p=>({...p,listPrice:e.target.value}))} placeholder="449900" />
                </div>
                <div className="input-group">
                  <label>Est. Value ($)</label>
                  <input type="number" value={form.estValue} onChange={e => setForm(p=>({...p,estValue:e.target.value}))} placeholder="431900" />
                </div>
              </div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8}}>
                <div className="input-group">
                  <label>DOM</label>
                  <input type="number" value={form.dom} onChange={e => setForm(p=>({...p,dom:e.target.value}))} placeholder="47" />
                </div>
                <div className="input-group">
                  <label>Beds</label>
                  <input value={form.beds} onChange={e => setForm(p=>({...p,beds:e.target.value}))} placeholder="3" />
                </div>
                <div className="input-group">
                  <label>Baths</label>
                  <input value={form.baths} onChange={e => setForm(p=>({...p,baths:e.target.value}))} placeholder="2.5" />
                </div>
              </div>
              <div className="input-group">
                <label>Owner Name</label>
                <input value={form.ownerName} onChange={e => setForm(p=>({...p,ownerName:e.target.value}))} placeholder="Smith, John & Jane" />
              </div>
              <div className="input-group">
                <label>Owner Phone</label>
                <input value={form.ownerPhone} onChange={e => setForm(p=>({...p,ownerPhone:e.target.value}))} placeholder="704-555-0100" />
              </div>
              <div className="input-group">
                <label>Subdivision</label>
                <input value={form.subdivision} onChange={e => setForm(p=>({...p,subdivision:e.target.value}))} placeholder="Myers Park" />
              </div>
              <div className="input-group">
                <label>Property Type</label>
                <select value={form.propertyType} onChange={e => setForm(p=>({...p,propertyType:e.target.value}))}>
                  <option>Single Family</option>
                  <option>Condo</option>
                  <option>Townhouse</option>
                  <option>Multi-Family</option>
                  <option>Land</option>
                </select>
              </div>
              <button className="btn-primary" onClick={handleAddManual} disabled={!form.address}>Add Listing</button>
            </div>
          </div>

          {/* MAIN CONTENT */}
          <div className="content">
            <div className="content-header">
              <div>
                <div className="content-title">Expired Listings Pipeline</div>
                <div className="content-sub">Charlotte Metro · 50–70 Mile Radius · Sorted by Priority</div>
              </div>
            </div>

            {listings.length > 0 && (
              <div className="filter-bar">
                {["all","hot","warm","cold"].map(f => (
                  <button key={f} className={`filter-btn${filter===f?" active":""}`} onClick={() => setFilter(f)}>
                    {f === "all" ? `All (${listings.length})` : f === "hot" ? `🔥 Hot (${counts.hot})` : f === "warm" ? `⚡ Warm (${counts.warm})` : `🌱 Cold (${counts.cold})`}
                  </button>
                ))}
              </div>
            )}

            {filtered.length === 0 && (
              <div className="empty-state">
                <div className="empty-icon">🏘️</div>
                <div className="empty-title">No listings yet</div>
                <div className="empty-sub">Upload a CSV from your MLS or add listings manually to start building your pipeline.</div>
              </div>
            )}

            <div className="listings-grid">
              {filtered.map(listing => {
                const delta = fmtDelta(listing.listPrice, listing.estValue);
                return (
                  <div key={listing.id} className="listing-card">
                    <div className={`priority-bar priority-${listing.priority}`} />
                    <div className="card-body">
                      <div className="card-top">
                        <div>
                          <div className="card-address">{listing.address}</div>
                          <div className="card-city">{listing.city}, {listing.state} {listing.zip}{listing.subdivision ? ` · ${listing.subdivision}` : ""}</div>
                        </div>
                        <span className={`priority-badge badge-${listing.priority}`}>
                          {listing.priority === "hot" ? "🔥 Hot Lead" : listing.priority === "warm" ? "⚡ Warm Lead" : "🌱 Cold Lead"}
                        </span>
                      </div>
                      <div className="card-metrics">
                        <div className="metric">
                          <div className="metric-val">{fmtCurrency(listing.listPrice)}</div>
                          <div className="metric-lbl">List Price</div>
                        </div>
                        <div className="metric">
                          <div className="metric-val">{fmtCurrency(listing.estValue)}</div>
                          <div className="metric-lbl">Est. Value</div>
                        </div>
                        {delta && (
                          <div className="metric">
                            <div className={`metric-val metric-delta ${delta.diff > 0 ? "delta-neg" : "delta-pos"}`}>
                              {delta.diff > 0 ? "▲" : "▼"} {Math.abs(Number(delta.pct))}%
                            </div>
                            <div className="metric-lbl">{delta.diff > 0 ? "Overpriced" : "Underpriced"}</div>
                          </div>
                        )}
                        <div className="metric">
                          <div className="metric-val">{listing.dom || "—"}</div>
                          <div className="metric-lbl">Days on Mkt</div>
                        </div>
                        {listing.beds && (
                          <div className="metric">
                            <div className="metric-val">{listing.beds}bd/{listing.baths}ba</div>
                            <div className="metric-lbl">{listing.sqft ? `${Number(listing.sqft).toLocaleString()} sqft` : listing.propertyType}</div>
                          </div>
                        )}
                        {listing.ownerName && (
                          <div className="metric">
                            <div className="metric-val" style={{fontSize:13}}>{listing.ownerName}</div>
                            <div className="metric-lbl">{listing.ownerPhone || "No phone"}</div>
                          </div>
                        )}
                      </div>

                      <div className="card-actions">
                        <button className="action-btn ai-btn" onClick={() => openAI(listing)}>✨ AI Playbook</button>
                        <button className="action-btn" onClick={() => toggleLog(listing.id)}>
                          📋 Log Outreach {listing.outreachLog.length > 0 ? `(${listing.outreachLog.length})` : ""}
                        </button>
                        <button className="action-btn" onClick={() => removeListing(listing.id)} style={{marginLeft:"auto",color:"#999"}}>✕ Remove</button>
                      </div>

                      {listing.showLog && (
                        <div className="outreach-log">
                          <div className="log-title">Outreach History</div>
                          {listing.outreachLog.length === 0 && <div style={{fontSize:12,color:"#aaa",marginBottom:8}}>No outreach logged yet.</div>}
                          <div className="log-entries">
                            {listing.outreachLog.map((entry, i) => (
                              <div key={i} className="log-entry">
                                <div className="log-dot" style={{background: entry.type === "call" ? "#8B3A2A" : entry.type === "email" ? "#4A6741" : "#C9A84C"}} />
                                <span style={{fontWeight:600,fontSize:11,textTransform:"uppercase",color:"#aaa"}}>{entry.type}</span>
                                <span>{entry.note}</span>
                                <span className="log-date">{entry.date}</span>
                              </div>
                            ))}
                          </div>
                          <div className="log-add">
                            <input className="log-input" placeholder="Add note..." value={logInputs[listing.id] || ""} onChange={e => setLogInputs(p=>({...p,[listing.id]:e.target.value}))} onKeyDown={e => { if(e.key==="Enter") addLog(listing.id, "note"); }} />
                            <button className="log-submit" onClick={() => addLog(listing.id, "call")}>📞</button>
                            <button className="log-submit" style={{background:"#4A6741",color:"white"}} onClick={() => addLog(listing.id, "email")}>✉️</button>
                            <button className="log-submit" style={{background:"#555",color:"white"}} onClick={() => addLog(listing.id, "note")}>📝</button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* AI MODAL */}
        {aiModal && (
          <div className="modal-overlay" onClick={e => { if(e.target.className === "modal-overlay") { setAiModal(null); setAiResult(null); } }}>
            <div className="modal">
              <div className="modal-header">
                <div>
                  <div className="modal-title">AI Outreach Playbook</div>
                  <div style={{fontSize:12,color:"#999",marginTop:3}}>{aiModal.address}, {aiModal.city}</div>
                </div>
                <button className="modal-close" onClick={() => { setAiModal(null); setAiResult(null); }}>✕</button>
              </div>
              <div className="modal-body">
                {aiLoading && (
                  <div className="loading-pulse">
                    <div className="pulse-dot"/><div className="pulse-dot"/><div className="pulse-dot"/>
                    <span style={{fontSize:13,color:"#999",marginLeft:8}}>Generating your personalized playbook...</span>
                  </div>
                )}
                {aiResult && parseAIResult(aiResult).map((section, i) => (
                  <div key={i} className="ai-section">
                    <div className="ai-section-title">{section.title}</div>
                    <div className="ai-content">{section.content}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
