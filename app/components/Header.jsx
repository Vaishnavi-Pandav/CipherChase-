import React from "react";
import Image from "next/image";

const Header = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center mb-5 relative px-4">
      {/* Crime scene tape banner */}
      <div className="w-full max-w-2xl mb-4 overflow-hidden">
        <div
          className="text-center text-xs font-extrabold tracking-[0.3em] py-1 px-4 text-black"
          style={{
            background: "repeating-linear-gradient(45deg, #c9a84c, #c9a84c 12px, #0a0008 12px, #0a0008 24px)",
          }}
        >
          ⚠ CRIME SCENE — DO NOT CROSS ⚠
        </div>
      </div>

      <div className="w-full flex items-center justify-center">
        {/* Upsurge logo */}
        <div
          className="w-24 h-24 sm:w-32 sm:h-32 flex-shrink-0 hover:scale-110 transition-transform"
          style={{
            boxShadow: "0 0 20px rgba(139,0,0,0.7)",
            borderRadius: "12px",
          }}
        >
          <Image
            src="/img/upsurge-logo.jpeg"
            alt="Upsurge Logo"
            width={128}
            height={128}
            className="w-full h-full object-contain rounded-xl"
          />
        </div>

        {/* Title */}
        <div className="mx-4 text-center">
          <h1
            className="text-3xl sm:text-5xl font-extrabold font-mono tracking-wider uppercase"
            style={{
              color: "#e8d5c4",
              textShadow: "0 0 16px rgba(139,0,0,0.9), 0 0 32px rgba(139,0,0,0.4), 2px 2px 0px #000",
              WebkitTextStroke: "1px rgba(139,0,0,0.5)",
            }}
          >
            Cipher Chase
          </h1>
          {/* Blood drip under title */}
          <div className="flex justify-center gap-3 mt-1">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="rounded-b-full"
                style={{
                  width: `${4 + i % 3}px`,
                  height: `${10 + (i * 4) % 14}px`,
                  background: "linear-gradient(to bottom, #8b0000, #4a0000)",
                  boxShadow: "0 0 4px rgba(139,0,0,0.6)",
                  opacity: 0.8,
                }}
              />
            ))}
          </div>
        </div>

        {/* Cosmos logo */}
        <div
          className="w-24 h-24 sm:w-32 sm:h-32 flex-shrink-0 hover:scale-110 transition-transform"
          style={{
            boxShadow: "0 0 16px rgba(201,168,76,0.5)",
            borderRadius: "12px",
          }}
        >
          <Image
            src="/img/cosmos-logo.png"
            alt="Cosmos Logo"
            width={128}
            height={128}
            className="w-full h-full object-contain rounded-xl"
          />
        </div>
      </div>

      <p
        className="mt-4 text-sm sm:text-lg font-semibold tracking-wider text-center font-mono"
        style={{ color: "rgba(201,168,76,0.85)" }}
      >
        🔍 Hunt • 🧩 Decode • 💀 Survive
      </p>
      <p
        className="mt-1 text-xs sm:text-sm font-mono tracking-widest"
        style={{ color: "rgba(139,0,0,0.7)" }}
      >
        [ UPSURGE_2K26 — EVIDENCE_TRAIL.exe ]
      </p>
    </div>
  );
};

export default Header;
