"use client";
import { useState, useEffect } from "react";
import { BadgeCheck, Loader2 } from "lucide-react";

export default function TeamProgress() {
  const [teamId, setTeamId] = useState("");
  const [codes, setCodes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [iconSize, setIconSize] = useState(40);

  useEffect(() => {
    const update = () => setIconSize(window.innerWidth < 640 ? 32 : 40);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const fetchTeamProgress = async () => {
    if (!teamId.trim()) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/team-progress?teamId=${teamId}`);
      const data = await res.json();
      if (data.success) setCodes(data.codes);
      else { setCodes([]); alert(data.message); }
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  const formatTime = (ts) => {
    if (!ts) return "";
    return new Date(ts).toLocaleTimeString([], { hour:"2-digit", minute:"2-digit", second:"2-digit" });
  };

  return (
    <section className="w-full rounded-2xl overflow-hidden"
      style={{ background:"rgba(10,0,8,0.92)", border:"1px solid rgba(139,0,0,0.45)", boxShadow:"0 0 24px rgba(139,0,0,0.1)" }}>
      <div className="px-4 sm:px-6 py-4 border-b" style={{ borderColor:"rgba(139,0,0,0.2)" }}>
        <h2 className="text-lg sm:text-xl font-extrabold font-mono tracking-wide" style={{ color:"#cc0000" }}>
          🔍 Suspect Trail
        </h2>
      </div>

      <div className="p-4 sm:p-6 space-y-4">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Enter Team ID"
            value={teamId}
            onChange={(e) => setTeamId(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && fetchTeamProgress()}
            className="flex-1 px-4 py-2.5 rounded-xl text-sm font-mono focus:outline-none"
            style={{ background:"rgba(0,0,0,0.7)", color:"#e8d5c4", border:"1px solid rgba(139,0,0,0.4)" }}
          />
          <button onClick={fetchTeamProgress} disabled={loading}
            className="px-5 py-2.5 rounded-xl font-bold font-mono text-sm transition-all disabled:opacity-40"
            style={{ background:"linear-gradient(135deg,#8b0000,#cc0000)", color:"#fff", boxShadow:"0 0 12px rgba(139,0,0,0.4)" }}>
            {loading ? <Loader2 size={16} className="animate-spin" /> : "Track"}
          </button>
        </div>

        {!loading && codes.length === 0 && teamId && (
          <p className="text-center text-xs italic font-mono py-2" style={{ color:"rgba(139,0,0,0.5)" }}>
            No evidence trail found.
          </p>
        )}

        {codes.length > 0 && (
          <div className="overflow-x-auto pb-2">
            <div className="flex items-center gap-0 min-w-max mx-auto">
              {codes.map((code, i) => {
                const nextScanned = codes[i+1]?.scanned;
                const isCurrent = !code.scanned && !codes.slice(0,i).some(c => !c.scanned);
                return (
                  <div key={code.value} className="flex items-center">
                    <div className="flex flex-col items-center gap-1">
                      <BadgeCheck size={iconSize}
                        title={code.scanned ? `Found at ${formatTime(code.scannedAt)}` : "Not found yet"}
                        className={code.scanned || isCurrent ? "animate-pulse" : ""}
                        style={{
                          color: code.scanned ? "#cc0000" : isCurrent ? "rgba(201,168,76,0.9)" : "rgba(60,0,0,0.5)",
                          filter: code.scanned ? "drop-shadow(0 0 8px rgba(139,0,0,0.8))" : isCurrent ? "drop-shadow(0 0 6px rgba(201,168,76,0.7))" : "none",
                        }}
                      />
                      <span className="text-xs font-mono" style={{ color:"rgba(139,0,0,0.4)" }}>{i+1}</span>
                    </div>
                    {i < codes.length-1 && (
                      <div className="w-6 sm:w-10 h-0.5 mx-0.5 rounded"
                        style={{ background: code.scanned && nextScanned ? "#8b0000" : code.scanned ? "rgba(139,0,0,0.5)" : "rgba(50,0,0,0.3)" }} />
                    )}
                  </div>
                );
              })}
            </div>
            <p className="text-center text-xs font-mono mt-2 sm:hidden" style={{ color:"rgba(139,0,0,0.4)" }}>← swipe →</p>
          </div>
        )}
      </div>
    </section>
  );
}
