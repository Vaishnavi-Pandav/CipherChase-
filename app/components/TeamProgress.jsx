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
    <div
      className="p-4 sm:p-6 space-y-6 sm:space-y-8 backdrop-blur-md rounded-2xl w-full max-w-5xl mx-auto"
      style={{
        background: "rgba(10,0,8,0.92)",
        border: "1px solid rgba(139,0,0,0.5)",
        boxShadow: "0 0 20px rgba(139,0,0,0.12)",
      }}
    >
      <h2 className="text-lg sm:text-xl font-bold font-mono tracking-wide" style={{ color: "#cc0000" }}>
        {"🔍 "} Suspect Trail — Track Your Progress
      </h2>
      <div className="flex flex-col sm:flex-row gap-3 w-full">
        <input
          type="text"
          placeholder="Enter Team ID"
          value={teamId}
          onChange={(e) => setTeamId(e.target.value)}
          className="rounded-lg px-4 py-2 w-full sm:flex-1 text-sm sm:text-base focus:outline-none font-mono"
          style={{
            background: "rgba(0,0,0,0.8)",
            color: "#e8d5c4",
            border: "2px solid rgba(139,0,0,0.4)",
          }}
        />
        <button
          onClick={fetchTeamProgress}
          disabled={loading}
          className="px-6 py-2 rounded-lg font-semibold transition-all w-full sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed font-mono"
          style={{
            background: "rgba(139,0,0,0.85)",
            color: "#e8d5c4",
            boxShadow: "0 0 12px rgba(139,0,0,0.5)",
            border: "1px solid rgba(139,0,0,0.6)",
          }}
        >
          {loading ? <Loader2 className="animate-spin" size={20} /> : "Investigate"}
        </button>
      </div>

      {/* Empty State */}
      {!loading && codes.length === 0 && teamId && (
        <p className="text-center italic font-mono" style={{ color: "rgba(139,0,0,0.6)" }}>
          {"// "} No evidence trail found for this suspect.
        </p>
      )}

      {/* Timeline */}
      {codes.length > 0 && (
        <div className="flex flex-col items-center gap-4">
          <div className="relative w-full">
            <div className="flex items-center justify-start sm:justify-center overflow-x-auto py-4">
              {codes.map((code, index) => {
                const nextScanned = codes[index + 1]?.scanned;
                let lineColor = "bg-gray-800";
                if (code.scanned && nextScanned) {
                  lineColor = "bg-red-800";
                } else if (code.scanned || nextScanned) {
                  lineColor = "bg-red-900";
                }

                const isCurrent =
                  !code.scanned &&
                  !codes.slice(0, index).some((c) => !c.scanned);

                return (
                  <div key={code.value} className="flex flex-col items-center flex-shrink-0">
                    <div className="flex items-center">
                      <BadgeCheck
                        size={iconSize}
                        title={
                          code.scanned
                            ? `Found at ${formatTime(code.scannedAt)}`
                            : "Not found yet"
                        }
                        className={`transition-all ${
                          code.scanned
                            ? "animate-pulse"
                            : isCurrent
                            ? "animate-pulse"
                            : ""
                        }`}
                        style={{
                          color: code.scanned
                            ? "#cc0000"
                            : isCurrent
                            ? "rgba(201,168,76,0.9)"
                            : "rgba(80,0,0,0.5)",
                          filter: code.scanned
                            ? "drop-shadow(0 0 8px rgba(139,0,0,0.8))"
                            : isCurrent
                            ? "drop-shadow(0 0 6px rgba(201,168,76,0.7))"
                            : "none",
                        }}
                      />
                      {index !== codes.length - 1 && (
                        <div className={`w-8 sm:w-16 h-1 ${lineColor}`}></div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <p className="sm:hidden text-xs italic font-mono" style={{ color: "rgba(139,0,0,0.5)" }}>
            ← Swipe to see more →
          </p>
        </div>
      )}
    </div>
  );
}
