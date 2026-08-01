import { AlertTriangle, Info } from "lucide-react";

export default function Tips() {
  return (
    <section className="w-full rounded-2xl overflow-hidden"
      style={{ background:"rgba(10,0,8,0.92)", border:"1px solid rgba(139,0,0,0.45)", boxShadow:"0 0 24px rgba(139,0,0,0.1)" }}>
      <div className="px-4 sm:px-6 py-4 border-b flex items-center gap-2" style={{ borderColor:"rgba(139,0,0,0.2)" }}>
        <span className="text-xs font-mono px-3 py-1 rounded-full tracking-widest"
          style={{ background:"rgba(139,0,0,0.15)", border:"1px solid rgba(139,0,0,0.4)", color:"rgba(201,168,76,0.85)" }}>
          📁 CASE FILE — CLASSIFIED
        </span>
      </div>

      <div className="p-4 sm:p-6 space-y-5">
        <h1 className="text-lg sm:text-xl font-extrabold font-mono text-center tracking-wider uppercase"
          style={{ color:"#e8d5c4", textShadow:"0 0 10px rgba(139,0,0,0.7)" }}>
          — Detective&apos;s Briefing —
        </h1>

        {/* Violations */}
        <div className="rounded-xl p-4 space-y-2"
          style={{ background:"rgba(139,0,0,0.07)", border:"1px solid rgba(139,0,0,0.25)" }}>
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle size={16} style={{ color:"#cc0000" }} />
            <span className="font-bold font-mono text-sm" style={{ color:"#cc0000" }}>VIOLATIONS</span>
          </div>
          {[
            ["Wrong QR scan", "2 min penalty", false],
            ["Wrong answer", "1 min penalty", false],
            ["Wrong sequence", "2 min penalty", false],
            ["Tab switch / minimize", "10 min penalty", false],
            ["Screen captured by other camera", "Disqualified ❌", true],
          ].map(([label, penalty, isDisqualify]) => (
            <div key={label} className="flex justify-between items-center text-sm font-mono py-1"
              style={{ borderBottom:"1px solid rgba(139,0,0,0.1)", color:"rgba(220,160,160,0.85)" }}>
              <span>{label}</span>
              <span className="font-bold" style={{ color: isDisqualify ? "#ff2020" : "#cc0000" }}>{penalty}</span>
            </div>
          ))}
        </div>

        {/* Intel */}
        <div className="rounded-xl p-4 space-y-2"
          style={{ background:"rgba(201,168,76,0.05)", border:"1px solid rgba(201,168,76,0.2)" }}>
          <div className="flex items-center gap-2 mb-2">
            <Info size={16} style={{ color:"#c9a84c" }} />
            <span className="font-bold font-mono text-sm" style={{ color:"#c9a84c" }}>INTEL</span>
          </div>
          {[
            "If QR is not scanning, refresh the page.",
            "Scanner might take a few seconds to detect.",
          ].map((tip) => (
            <p key={tip} className="text-sm font-mono" style={{ color:"rgba(201,168,76,0.7)" }}>• {tip}</p>
          ))}
        </div>
      </div>
    </section>
  );
}
