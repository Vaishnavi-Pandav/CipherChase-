import React from "react";
import Image from "next/image";

const Header = () => {
  return (
    <header className="w-full flex flex-col items-center gap-4 pt-2">
      {/* Crime tape banner */}
      <div className="w-full max-w-xl overflow-hidden rounded-sm">
        <div className="text-center text-xs font-extrabold tracking-[0.25em] py-1.5 text-black select-none"
          style={{ background: "repeating-linear-gradient(45deg,#c9a84c,#c9a84c 10px,#070005 10px,#070005 20px)" }}>
          ⚠ CRIME SCENE — DO NOT CROSS ⚠
        </div>
      </div>

      {/* Logos + Title */}
      <div className="flex items-center justify-center gap-3 sm:gap-6 w-full">
        {/* Upsurge logo */}
        <div className="flex-shrink-0 w-16 h-16 sm:w-24 sm:h-24 float"
          style={{ filter: "drop-shadow(0 0 14px rgba(139,0,0,0.8))" }}>
          <Image src="/img/upsurge-logo.jpeg" alt="Upsurge" width={96} height={96}
            className="w-full h-full object-contain rounded-xl" />
        </div>

        {/* Title */}
        <div className="text-center flex-1 min-w-0">
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold font-mono tracking-wider uppercase leading-tight blood-text"
            style={{
              color: "#f5e6d3",
              WebkitTextStroke: "1px rgba(139,0,0,0.35)",
            }}>
            Cipher Chase
          </h1>
          {/* Blood drips */}
          <div className="flex justify-center gap-2 mt-1">
            {[8,12,6,14,10].map((h, i) => (
              <div key={i} className="rounded-b-full w-1"
                style={{ height: `${h}px`, background: "linear-gradient(to bottom,#8b0000,#3a0000)", opacity: 0.9 }} />
            ))}
          </div>
          <p className="mt-2 text-xs sm:text-sm font-mono tracking-widest font-semibold" style={{ color: "rgba(212,168,83,0.9)" }}>
            🔍 Hunt &nbsp;•&nbsp; 🧩 Decode &nbsp;•&nbsp; 💀 Survive
          </p>
        </div>

        {/* Cosmos logo */}
        <div className="flex-shrink-0 w-16 h-16 sm:w-24 sm:h-24 float"
          style={{ filter: "drop-shadow(0 0 12px rgba(201,168,76,0.5))", animationDelay: "1s" }}>
          <Image src="/img/cosmos-logo.png" alt="Cosmos" width={96} height={96}
            className="w-full h-full object-contain rounded-xl" />
        </div>
      </div>

      <p className="text-xs font-mono tracking-widest" style={{ color: "rgba(139,0,0,0.6)" }}>
        [ UPSURGE_2K26 — EVIDENCE_TRAIL.exe ]
      </p>
    </header>
  );
};

export default Header;
