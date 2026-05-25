import { useState, useRef } from "react";

const EXAMPLE_SCENARIOS = [
  "Bella sat quietly under the dinner table during a friend's dinner party",
  "Max somehow got into the laundry basket and fell asleep in it",
  "My dog chased a squirrel and ran directly into a glass door",
  "Luna kept stealing socks and hiding them under the couch",
  "Charlie refused to get out of the car after a vet visit",
];

const REGIONS = [
  { value: "US",    label: "🇺🇸 US / Western" },
  { value: "India", label: "🇮🇳 India" },
];

const sectionMeta = [
  { key: "scene_analysis",   icon: "ti-eye",      label: "Scene Analysis",    color: "#185FA5", bg: "#E6F1FB" },
  { key: "human_intention",  icon: "ti-heart",    label: "Human Intention",   color: "#0F6E56", bg: "#E1F5EE" },
  { key: "camera_behavior",  icon: "ti-camera",   label: "Camera Behavior",   color: "#854F0B", bg: "#FAEEDA" },
  { key: "realism_elements", icon: "ti-sparkles", label: "Realism Elements",  color: "#993C1D", bg: "#FAECE7" },
  { key: "final_prompt",     icon: "ti-wand",     label: "Final Image Prompt", color: "#534AB7", bg: "#EEEDFE" },
];

export default function App() {
  const [scenario, setScenario]       = useState("");
  const [region, setRegion]           = useState("India");
  const [result, setResult]           = useState(null);
  const [loading, setLoading]         = useState(false);
  const [error, setError]             = useState(null);
  const [copied, setCopied]           = useState(false);
  const [copiedSection, setCopiedSection] = useState(null);
  const textareaRef = useRef(null);

  const handleGenerate = async () => {
    if (!scenario.trim()) return;
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      // Calls our Netlify serverless function — no CORS issues, API key stays secret
      const response = await fetch("/.netlify/functions/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ scenario, region }),
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.error || `Server error: ${response.status}`);
      }

      const parsed = await response.json();
      setResult(parsed);
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleExample = (ex) => {
    setScenario(ex);
    setResult(null);
    setError(null);
    if (textareaRef.current) textareaRef.current.focus();
  };

  const copyPrompt = async () => {
    if (!result?.final_prompt) return;
    await navigator.clipboard.writeText(result.final_prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const copySectionText = async (key, text) => {
    await navigator.clipboard.writeText(text);
    setCopiedSection(key);
    setTimeout(() => setCopiedSection(null), 1500);
  };

  return (
    <div style={{ fontFamily: "'Georgia','Times New Roman',serif", maxWidth: 720, margin: "0 auto", padding: "2rem 1.25rem 4rem" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600&family=Source+Serif+4:ital,wght@0,300;0,400;1,300&display=swap');

        .hmce-root { --accent: #2C2C2A; --accent-light: #888780; }

        .hmce-heading {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: 28px;
          font-weight: 600;
          letter-spacing: -0.5px;
          color: var(--color-text-primary, #1A1916);
          margin: 0 0 4px;
          line-height: 1.2;
        }
        .hmce-sub {
          font-family: 'Source Serif 4', Georgia, serif;
          font-size: 14px;
          font-style: italic;
          color: var(--color-text-secondary, #6B6862);
          margin: 0 0 2rem;
        }
        .hmce-label {
          font-family: 'Source Serif 4', Georgia, serif;
          font-size: 11px;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          color: var(--color-text-secondary, #6B6862);
          margin-bottom: 6px;
          display: block;
        }
        .hmce-textarea {
          width: 100%;
          box-sizing: border-box;
          font-family: 'Source Serif 4', Georgia, serif;
          font-size: 15px;
          line-height: 1.6;
          color: #1A1916;
          background: #fff;
          border: 0.5px solid #D4D3CF;
          border-radius: 8px;
          padding: 12px 14px;
          resize: vertical;
          min-height: 90px;
          outline: none;
          transition: border-color 0.15s;
        }
        .hmce-textarea:focus { border-color: #888780; }
        .hmce-textarea::placeholder { color: #9D9B96; font-style: italic; }

        .hmce-btn {
          font-family: 'Source Serif 4', Georgia, serif;
          font-size: 14px;
          cursor: pointer;
          border-radius: 8px;
          padding: 9px 20px;
          transition: all 0.15s;
          border: 0.5px solid #D4D3CF;
        }
        .hmce-btn-primary {
          background: #1A1916;
          color: #fff;
          border-color: #1A1916;
          font-weight: 500;
        }
        .hmce-btn-primary:hover:not(:disabled) { opacity: 0.85; }
        .hmce-btn-primary:disabled { opacity: 0.4; cursor: not-allowed; }
        .hmce-btn-secondary {
          background: transparent;
          color: #6B6862;
        }
        .hmce-btn-secondary:hover { background: #F5F4F0; color: #1A1916; }

        .hmce-example {
          font-family: 'Source Serif 4', Georgia, serif;
          font-size: 12px;
          font-style: italic;
          background: transparent;
          border: 0.5px solid #E8E7E3;
          border-radius: 20px;
          padding: 5px 12px;
          color: #6B6862;
          cursor: pointer;
          transition: all 0.15s;
          white-space: nowrap;
        }
        .hmce-example:hover { border-color: #888780; color: #1A1916; background: #F5F4F0; }

        .hmce-card {
          border: 0.5px solid #E8E7E3;
          border-radius: 12px;
          padding: 1rem 1.25rem;
          margin-bottom: 12px;
          background: #fff;
          position: relative;
        }
        .hmce-card-title {
          font-family: 'Source Serif 4', Georgia, serif;
          font-size: 11px;
          letter-spacing: 1.2px;
          text-transform: uppercase;
          font-weight: 400;
          margin: 0 0 8px;
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .hmce-card-body {
          font-family: 'Source Serif 4', Georgia, serif;
          font-size: 14px;
          line-height: 1.75;
          color: #1A1916;
          margin: 0;
        }
        .hmce-prompt-card {
          border-radius: 12px;
          padding: 1.25rem 1.5rem;
          position: relative;
          margin-top: 4px;
        }
        .hmce-prompt-body {
          font-family: 'Source Serif 4', Georgia, serif;
          font-size: 13.5px;
          line-height: 1.85;
          margin: 0 0 1rem;
          font-style: italic;
        }
        .hmce-copy-btn {
          font-family: 'Source Serif 4', Georgia, serif;
          font-size: 12px;
          cursor: pointer;
          border: 0.5px solid;
          border-radius: 6px;
          padding: 5px 12px;
          background: transparent;
          transition: all 0.15s;
          display: inline-flex;
          align-items: center;
          gap: 5px;
        }
        .hmce-spinner {
          display: inline-block;
          width: 16px; height: 16px;
          border: 2px solid currentColor;
          border-right-color: transparent;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
          vertical-align: middle;
          margin-right: 6px;
        }
        @keyframes spin { to { transform: rotate(360deg); } }

        .hmce-divider {
          border: none;
          border-top: 0.5px solid #E8E7E3;
          margin: 1.5rem 0;
        }
        .hmce-section-copy {
          position: absolute;
          top: 10px; right: 12px;
          background: transparent;
          border: none;
          cursor: pointer;
          color: #9D9B96;
          font-size: 13px;
          padding: 2px 4px;
          border-radius: 4px;
          transition: color 0.15s;
          font-family: 'Source Serif 4', Georgia, serif;
        }
        .hmce-section-copy:hover { color: #6B6862; }
        .hmce-fade-in {
          animation: fadeUp 0.35s ease both;
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .hmce-dog-icon {
          font-size: 28px;
          line-height: 1;
        }
        .hmce-error {
          background: #FCEBEB;
          border: 0.5px solid #E24B4A;
          border-radius: 8px;
          padding: 10px 14px;
          font-family: 'Source Serif 4', Georgia, serif;
          font-size: 13px;
          color: #A32D2D;
          margin-top: 12px;
        }
      `}</style>

      <div className="hmce-root">
        <div style={{ display: "flex", alignItems: "flex-start", gap: 12, marginBottom: 0 }}>
          <span className="hmce-dog-icon" role="img" aria-label="dog">🐾</span>
          <div>
            <h1 className="hmce-heading">Human Memory Camera Engine</h1>
            <p className="hmce-sub">Turn a dog story into a believable phone snapshot prompt</p>
          </div>
        </div>

        <div style={{ marginBottom: "1.5rem" }}>
          <span className="hmce-label">Your dog scenario</span>
          <textarea
            ref={textareaRef}
            className="hmce-textarea"
            placeholder="Describe what your dog did… e.g. Bella sat quietly under the dinner table during the whole party."
            value={scenario}
            onChange={e => setScenario(e.target.value)}
            onKeyDown={e => { if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) handleGenerate(); }}
          />
          <div style={{ marginTop: 10, marginBottom: 12 }}>
            <span className="hmce-label" style={{ marginBottom: 8 }}>Region</span>
            <div style={{ display: "flex", gap: 8 }}>
              {REGIONS.map(r => (
                <button
                  key={r.value}
                  id={`region-${r.value.toLowerCase()}`}
                  onClick={() => setRegion(r.value)}
                  style={{
                    fontFamily: "'Source Serif 4', Georgia, serif",
                    fontSize: 13,
                    padding: "6px 16px",
                    borderRadius: 20,
                    border: region === r.value ? "1.5px solid #1A1916" : "0.5px solid #D4D3CF",
                    background: region === r.value ? "#1A1916" : "transparent",
                    color: region === r.value ? "#fff" : "#6B6862",
                    cursor: "pointer",
                    transition: "all 0.15s",
                  }}
                >
                  {r.label}
                </button>
              ))}
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 8, gap: 8 }}>
            <span style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: 11, color: "#9D9B96", fontStyle: "italic" }}>
              ⌘↵ to generate
            </span>
            <button
              id="generate-btn"
              className="hmce-btn hmce-btn-primary"
              onClick={handleGenerate}
              disabled={loading || !scenario.trim()}
            >
              {loading ? <><span className="hmce-spinner" />Analysing moment…</> : "Generate Prompt →"}
            </button>
          </div>
        </div>

        <div style={{ marginBottom: "1.5rem" }}>
          <span className="hmce-label" style={{ marginBottom: 8 }}>Try an example</span>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {EXAMPLE_SCENARIOS.map((ex, i) => (
              <button key={i} id={`example-${i}`} className="hmce-example" onClick={() => handleExample(ex)}>
                {ex.length > 48 ? ex.slice(0, 46) + "…" : ex}
              </button>
            ))}
          </div>
        </div>

        {error && <div className="hmce-error" role="alert">⚠️ {error}</div>}

        {result && (
          <div className="hmce-fade-in">
            <hr className="hmce-divider" />
            <span className="hmce-label" style={{ marginBottom: 12 }}>Analysis</span>

            {sectionMeta.slice(0, 4).map(({ key, icon, label, color, bg }) => (
              result[key] && (
                <div key={key} className="hmce-card">
                  <button
                    className="hmce-section-copy"
                    title={`Copy ${label}`}
                    onClick={() => copySectionText(key, result[key])}
                    aria-label={`Copy ${label}`}
                  >
                    {copiedSection === key
                      ? <><i className="ti ti-check" style={{ fontSize: 12 }} /> Copied</>
                      : <i className="ti ti-copy" style={{ fontSize: 12 }} />}
                  </button>
                  <p className="hmce-card-title" style={{ color }}>
                    <span style={{
                      width: 22, height: 22, borderRadius: 6, background: bg,
                      display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0
                    }}>
                      <i className={`ti ${icon}`} style={{ fontSize: 13, color }} aria-hidden="true" />
                    </span>
                    {label}
                  </p>
                  <p className="hmce-card-body">{result[key]}</p>
                </div>
              )
            ))}

            {result.final_prompt && (() => {
              const m = sectionMeta[4];
              return (
                <div style={{ marginTop: 4 }}>
                  <span className="hmce-label" style={{ marginBottom: 8 }}>Final Prompt</span>
                  <div className="hmce-prompt-card" style={{ background: m.bg, border: `0.5px solid ${m.color}33` }}>
                    <p className="hmce-card-title" style={{ color: m.color, marginBottom: 10 }}>
                      <span style={{
                        width: 22, height: 22, borderRadius: 6, background: "#fff",
                        display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0
                      }}>
                        <i className={`ti ${m.icon}`} style={{ fontSize: 13, color: m.color }} aria-hidden="true" />
                      </span>
                      {m.label}
                    </p>
                    <p className="hmce-prompt-body" style={{ color: m.color }}>{result.final_prompt}</p>
                    <button
                      id="copy-prompt-btn"
                      className="hmce-copy-btn"
                      style={{ borderColor: m.color + "66", color: m.color }}
                      onClick={copyPrompt}
                    >
                      {copied
                        ? <><i className="ti ti-check" style={{ fontSize: 13 }} /> Copied!</>
                        : <><i className="ti ti-copy" style={{ fontSize: 13 }} /> Copy prompt</>}
                    </button>
                  </div>
                </div>
              );
            })()}

            <div style={{ marginTop: 20, display: "flex", justifyContent: "flex-end" }}>
              <button
                id="new-scenario-btn"
                className="hmce-btn hmce-btn-secondary"
                style={{ fontSize: 12 }}
                onClick={() => { setResult(null); setScenario(""); }}
              >
                <i className="ti ti-refresh" style={{ fontSize: 13, verticalAlign: -1, marginRight: 4 }} aria-hidden="true" />
                New scenario
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
