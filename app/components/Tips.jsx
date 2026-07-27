import React from "react";
import { AlertTriangle, Info } from "lucide-react";

const Tips = () => {
  return (
    <div
      className="mt-10 px-6 sm:px-10 py-8 rounded-2xl text-gray-200 max-w-3xl mx-auto"
      style={{
        background: "rgba(10,0,8,0.95)",
        border: "2px solid rgba(139,0,0,0.5)",
        boxShadow: "0 0 24px rgba(139,0,0,0.18)",
      }}
    >
      {/* Evidence file label */}
      <div className="flex justify-center mb-4">
        <span
          className="text-xs font-mono px-4 py-1 rounded-full tracking-widest"
          style={{
            background: "rgba(139,0,0,0.2)",
            border: "1px solid rgba(139,0,0,0.5)",
            color: "rgba(201,168,76,0.85)",
          }}
        >
          📁 CASE FILE — CLASSIFIED
        </span>
      </div>

      <h1
        className="text-2xl font-extrabold font-mono text-center mb-6 tracking-wider uppercase"
        style={{
          color: "#e8d5c4",
          textShadow: "0 0 10px rgba(139,0,0,0.8)",
        }}
      >
        — DETECTIVE&apos;S BRIEFING —
      </h1>

      <div className="mb-6">
        <div className="flex items-center mb-3">
          <AlertTriangle
            className="w-6 h-6 mr-2"
            style={{ color: "#cc0000", filter: "drop-shadow(0 0 6px rgba(139,0,0,0.8))" }}
          />
          <h2 className="text-xl font-bold font-mono" style={{ color: "#cc0000" }}>
            ⚠ VIOLATIONS
          </h2>
        </div>
        <ul className="list-disc list-inside space-y-2 text-base font-mono" style={{ color: "rgba(220,160,160,0.9)" }}>
          <li>
            Wrong QR scan →{" "}
            <span className="font-bold" style={{ color: "#cc0000" }}>
              2 min penalty
            </span>
          </li>
          <li>
            Wrong answer →{" "}
            <span className="font-bold" style={{ color: "#cc0000" }}>
              1 min penalty
            </span>
          </li>
          <li>
            Wrong sequence →{" "}
            <span className="font-bold" style={{ color: "#cc0000" }}>
              2 min penalty
            </span>
          </li>
        </ul>
      </div>

      <div>
        <div className="flex items-center mb-3">
          <Info
            className="w-6 h-6 mr-2"
            style={{ color: "#c9a84c", filter: "drop-shadow(0 0 6px rgba(201,168,76,0.8))" }}
          />
          <h2 className="text-xl font-bold font-mono" style={{ color: "#c9a84c" }}>
            🔍 INTEL
          </h2>
        </div>
        <ul className="list-disc list-inside space-y-2 text-base font-mono" style={{ color: "rgba(201,168,76,0.75)" }}>
          <li>
            If QR is not scanning, just{" "}
            <span className="font-bold" style={{ color: "#c9a84c" }}>
              refresh
            </span>{" "}
            the page.
          </li>
          <li>Scanner might take a few seconds to detect the QR.</li>
        </ul>
      </div>
    </div>
  );
};

export default Tips;
