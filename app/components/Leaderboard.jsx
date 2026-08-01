"use client";
import { useEffect, useState } from "react";
import { Medal, Trophy, Award, Circle, RefreshCw } from "lucide-react";

export default function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(false);
  const [countdown, setCountdown] = useState(30);

  const fetchLeaderboard = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/leaderboard");
      const data = await res.json();
      if (data.success) setLeaderboard(data.leaderboard);
    } catch (e) { console.error(e); }
    finally { setLoading(false); setCountdown(30); }
  };

  // Auto-refresh every 30 seconds
  useEffect(() => {
    fetchLeaderboard();
    const interval = setInterval(fetchLeaderboard, 30000);
    return () => clearInterval(interval);
  }, []);

  // Countdown timer
  useEffect(() => {
    const tick = setInterval(() => {
      setCountdown((c) => (c <= 1 ? 30 : c - 1));
    }, 1000);
    return () => clearInterval(tick);
  }, []);

  const getRankIcon = (rank) => {
    if (rank === 1) return <Trophy style={{ color:"#c9a84c", filter:"drop-shadow(0 0 6px gold)" }} size={20} />;
    if (rank === 2) return <Medal  style={{ color:"#aaa",    filter:"drop-shadow(0 0 4px silver)" }} size={20} />;
    if (rank === 3) return <Award  style={{ color:"#cc0000", filter:"drop-shadow(0 0 6px rgba(139,0,0,0.8))" }} size={20} />;
    return <Circle style={{ color:"rgba(80,0,0,0.5)" }} size={12} />;
  };

  const formatTime = (ts) => {
    if (!ts) return "—";
    return new Date(ts).toLocaleTimeString([], { hour:"2-digit", minute:"2-digit", second:"2-digit" });
  };

  return (
    <section className="w-full rounded-2xl overflow-hidden"
      style={{ background:"rgba(10,0,8,0.92)", border:"1px solid rgba(139,0,0,0.45)", boxShadow:"0 0 24px rgba(139,0,0,0.1)" }}>
      <div className="flex items-center justify-between px-4 sm:px-6 py-4 border-b" style={{ borderColor:"rgba(139,0,0,0.2)" }}>
        <h2 className="text-lg sm:text-xl font-extrabold font-mono tracking-wide" style={{ color:"#cc0000" }}>
          🏴 Most Wanted
        </h2>
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono" style={{ color:"rgba(139,0,0,0.5)" }}>
            {countdown}s
          </span>
          <button onClick={fetchLeaderboard} disabled={loading}
            className="p-1.5 rounded-lg transition-all disabled:opacity-40"
            style={{ background:"rgba(139,0,0,0.15)", border:"1px solid rgba(139,0,0,0.3)" }}>
            <RefreshCw size={14} style={{ color:"#cc0000" }} className={loading ? "animate-spin" : ""} />
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse" style={{ minWidth:"360px" }}>
          <thead style={{ background:"rgba(139,0,0,0.1)", color:"rgba(201,168,76,0.8)" }}>
            <tr className="text-xs sm:text-sm font-mono">
              <th className="px-4 py-3">Rank</th>
              <th className="px-4 py-3">Team</th>
              <th className="px-4 py-3">Clues</th>
              <th className="px-4 py-3 hidden sm:table-cell">Last Found</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.length === 0 && (
              <tr><td colSpan={4} className="px-4 py-6 text-center text-xs font-mono" style={{ color:"rgba(139,0,0,0.5)" }}>
                No data yet
              </td></tr>
            )}
            {leaderboard.map((team, i) => (
              <tr key={team.name} className="transition-colors text-sm font-mono"
                style={{
                  background: i===0 ? "rgba(201,168,76,0.07)" : i===1 ? "rgba(120,120,120,0.05)" : i===2 ? "rgba(139,0,0,0.07)" : "transparent",
                  borderBottom: i < leaderboard.length-1 ? "1px solid rgba(139,0,0,0.12)" : "none",
                }}>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    {getRankIcon(i+1)}
                    <span className="font-bold" style={{ color:"#e8d5c4" }}>{i+1}</span>
                  </div>
                </td>
                <td className="px-4 py-3" style={{ color:"#e8d5c4" }}>{team.name}</td>
                <td className="px-4 py-3 font-bold" style={{ color:"#cc0000" }}>{team.score}</td>
                <td className="px-4 py-3 hidden sm:table-cell" style={{ color:"rgba(200,180,160,0.45)" }}>
                  {formatTime(team.latestScanTime)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
