import React from "react";
import { AlertTriangle, Info } from "lucide-react";

const Tips = () => {
  return (
    <div className="mt-10 px-6 sm:px-10 py-8 bg-[rgba(10,14,23,0.9)] border-2 border-cyan-600/60 rounded-2xl shadow-[0_0_20px_rgba(0,240,255,0.2)] text-gray-200 max-w-3xl mx-auto">
      <h1 className="text-2xl font-extrabold font-mono text-center text-cyan-400 drop-shadow-[0_0_8px_rgba(0,240,255,0.9)] mb-6 tracking-wider">
        {"// "} GAME GUIDE {"// "}
      </h1>

      <div className="mb-6">
        <div className="flex items-center mb-3">
          <AlertTriangle className="w-6 h-6 text-red-500 mr-2 drop-shadow-[0_0_6px_rgba(255,51,51,0.8)]" />
          <h2 className="text-xl font-bold text-red-400 font-mono">⚠ WARNINGS</h2>
        </div>
        <ul className="list-disc list-inside space-y-2 text-base text-red-300 font-mono">
          <li>Wrong QR scan → <span className="text-red-400 font-bold">2 min penalty</span></li>
          <li>Wrong answer → <span className="text-red-400 font-bold">1 min penalty</span></li>
          <li>Wrong sequence → <span className="text-red-400 font-bold">2 min penalty</span></li>
        </ul>
      </div>

      <div>
        <div className="flex items-center mb-3">
          <Info className="w-6 h-6 text-green-400 mr-2 drop-shadow-[0_0_6px_rgba(0,255,65,0.9)]" />
          <h2 className="text-xl font-bold text-green-400 font-mono">✓ TIPS</h2>
        </div>
        <ul className="list-disc list-inside space-y-2 text-base text-green-300 font-mono">
          <li>If QR is not scanning, just <span className="text-green-400 font-bold">refresh</span> the page.</li>
          <li>Scanner might take a few seconds to detect the QR.</li>
        </ul>
      </div>
    </div>
  );
};

export default Tips;
