"use client";
import { useState, useEffect } from "react";
import { BadgeCheck, Loader2 } from "lucide-react";

export default function TeamProgress() {
  const [teamId, setTeamId] = useState("");
  const [codes, setCodes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [iconSize, setIconSize] = useState(48);

  useEffect(() => {
    const updateSize = () => {
      setIconSize(window.innerWidth < 640 ? 36 : 48);
    };
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  const fetchTeamProgress = async () => {
    if (!teamId.trim()) return;

    setLoading(true);
    try {
      const res = await fetch(`/api/team-progress?teamId=${teamId}`);
      const data = await res.json();

      if (data.success) {
        setCodes(data.codes);
      } else {
        setCodes([]);
        alert(data.message);
      }
    } catch (error) {
      console.error("Error fetching progress:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (timestamp) => {
    if (!timestamp) return "";
    return new Date(timestamp).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  return (
    <div className="p-4 sm:p-6 space-y-6 sm:space-y-8 bg-[rgba(10,14,23,0.85)] backdrop-blur-md rounded-2xl shadow-lg border border-cyan-500/60 w-full max-w-5xl mx-auto" style={{ boxShadow: "0 0 20px rgba(0,240,255,0.12)" }}>
      <h2 className="text-lg sm:text-xl font-bold text-cyan-400 font-mono tracking-wide">
        {"// "} Check Your Progress
      </h2>
      <div className="flex flex-col sm:flex-row gap-3 w-full">
        <input
          type="text"
          placeholder="Enter Team ID"
          value={teamId}
          onChange={(e) => setTeamId(e.target.value)}
          className="border-2 border-cyan-500/40 bg-black/80 text-white rounded-lg px-4 py-2 w-full sm:flex-1 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-cyan-400 font-mono placeholder:text-cyan-500/30"
        />
        <button
          onClick={fetchTeamProgress}
          disabled={loading}
          className="bg-cyan-600 text-black px-6 py-2 rounded-lg font-semibold hover:bg-cyan-500 transition-all shadow-[0_0_10px_rgba(0,240,255,0.6)] w-full sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed font-mono"
        >
          {loading ? <Loader2 className="animate-spin" size={20} /> : "Scan"}
        </button>
      </div>

      {/* Empty State */}
      {!loading && codes.length === 0 && teamId && (
        <p className="text-gray-500 text-center italic font-mono">
          {"// "} No progress found for this team.
        </p>
      )}

      {/* Timeline */}
      {codes.length > 0 && (
        <div className="flex flex-col items-center gap-4">
          <div className="relative w-full">
            <div className="flex items-center justify-start sm:justify-center overflow-x-auto py-4 scrollbar-thin scrollbar-thumb-cyan-500 scrollbar-track-transparent">
              {codes.map((code, index) => {
                const nextScanned = codes[index + 1]?.scanned;
                let lineColor = "bg-gray-700";
                if (code.scanned && nextScanned) {
                  lineColor = "bg-green-500 shadow-[0_0_10px_rgba(0,255,65,0.6)]";
                } else if (code.scanned || nextScanned) {
                  lineColor = "bg-cyan-500 shadow-[0_0_10px_rgba(0,240,255,0.6)]";
                }

                const isCurrent =
                  !code.scanned &&
                  !codes.slice(0, index).some((c) => !c.scanned);

                return (
                  <div
                    key={code.value}
                    className="flex flex-col items-center flex-shrink-0"
                  >
                    {/* Icon + connecting line */}
                    <div className="flex items-center">
                      <BadgeCheck
                        size={iconSize}
                        title={
                          code.scanned
                            ? `Scanned at ${formatTime(code.scannedAt)}`
                            : "Not scanned yet"
                        }
                        className={`transition-all ${
                          code.scanned
                            ? "text-green-400 drop-shadow-[0_0_10px_rgba(0,255,65,0.8)]"
                            : isCurrent
                            ? "text-cyan-400 drop-shadow-[0_0_8px_rgba(0,240,255,0.8)] animate-pulse"
                            : "text-gray-500"
                        }`}
                      />
                      {index !== codes.length - 1 && (
                        <div
                          className={`w-8 sm:w-16 h-1 ${lineColor}`}
                        ></div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          {/* Scroll hint for mobile */}
          <p className="sm:hidden text-gray-500 text-xs italic font-mono">
            ← Swipe to see more →
          </p>
        </div>
      )}
    </div>
  );
}
