"use client";

import { useEffect, useState } from "react";
import { Medal, Trophy, Award, Circle } from "lucide-react";

export default function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);

  const fetchLeaderboard = async () => {
    try {
      const res = await fetch("/api/leaderboard");
      const data = await res.json();
      if (data.success) {
        setLeaderboard(data.leaderboard);
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error("Error fetching leaderboard:", error);
    }
  };

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const getRankIcon = (rank) => {
    if (rank === 1)
      return <Trophy style={{ color: "#c9a84c", filter: "drop-shadow(0 0 6px gold)" }} size={22} />;
    if (rank === 2)
      return <Medal style={{ color: "#aaaaaa", filter: "drop-shadow(0 0 6px silver)" }} size={22} />;
    if (rank === 3)
      return <Award style={{ color: "#cc0000", filter: "drop-shadow(0 0 6px rgba(139,0,0,0.8))" }} size={22} />;
    return <Circle style={{ color: "rgba(80,0,0,0.5)" }} size={14} />;
  };

  const formatTime = (timestamp) => {
    if (!timestamp) return "-";
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  return (
    <div
      className="p-4 sm:p-6 backdrop-blur-md rounded-2xl w-full max-w-3xl mx-auto"
      style={{
        background: "rgba(10,0,8,0.92)",
        border: "1px solid rgba(139,0,0,0.5)",
        boxShadow: "0 0 20px rgba(139,0,0,0.12)",
      }}
    >
      <h2
        className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 flex items-center gap-2 font-mono tracking-wide"
        style={{ color: "#cc0000" }}
      >
        🏴 Most Wanted — Leaderboard
      </h2>

      <div
        className="overflow-x-auto rounded-lg"
        style={{ border: "1px solid rgba(139,0,0,0.3)" }}
      >
        <table className="w-full text-left border-collapse min-w-[500px]">
          <thead
            className="sticky top-0 backdrop-blur-sm text-sm sm:text-base font-mono"
            style={{
              background: "rgba(139,0,0,0.12)",
              color: "rgba(201,168,76,0.85)",
            }}
          >
            <tr>
              <th className="p-3 rounded-l-lg">Rank</th>
              <th className="p-3">Team Name</th>
              <th className="p-3">Evidence</th>
              <th className="p-3 rounded-r-lg">Last Found</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.map((team, index) => {
              const isTop3 = index < 3;
              return (
                <tr
                  key={team.name}
                  className="transition-all"
                  style={{
                    background: isTop3
                      ? index === 0
                        ? "rgba(201,168,76,0.08)"
                        : index === 1
                        ? "rgba(100,100,100,0.06)"
                        : "rgba(139,0,0,0.08)"
                      : "transparent",
                    borderBottom:
                      index !== leaderboard.length - 1
                        ? "1px solid rgba(139,0,0,0.15)"
                        : "none",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background = "rgba(139,0,0,0.12)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background = isTop3
                      ? index === 0
                        ? "rgba(201,168,76,0.08)"
                        : index === 1
                        ? "rgba(100,100,100,0.06)"
                        : "rgba(139,0,0,0.08)"
                      : "transparent")
                  }
                >
                  <td className="p-3 flex items-center gap-2">
                    {getRankIcon(index + 1)}
                    <span className="font-bold font-mono" style={{ color: "#e8d5c4" }}>
                      {index + 1}
                    </span>
                  </td>
                  <td className="p-3 break-all font-mono" style={{ color: "#e8d5c4" }}>
                    {team.name}
                  </td>
                  <td className="p-3 font-semibold font-mono" style={{ color: "#cc0000" }}>
                    {team.score}
                  </td>
                  <td className="p-3 font-mono" style={{ color: "rgba(200,180,160,0.5)" }}>
                    {formatTime(team.latestScanTime)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
