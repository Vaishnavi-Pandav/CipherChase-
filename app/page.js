"use client";
import Feedback from "./components/Feedback";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Leaderboard from "./components/Leaderboard";
import QRCodeScanner from "./components/QrCodeScanner";
import TeamProgress from "./components/TeamProgress";
import Tips from "./components/Tips";

const particles = [
  { left: "8%",  delay: "0s",   dur: "12s", drift: "30px",  size: 3 },
  { left: "18%", delay: "2s",   dur: "15s", drift: "-20px", size: 2 },
  { left: "30%", delay: "4s",   dur: "10s", drift: "40px",  size: 4 },
  { left: "45%", delay: "1s",   dur: "14s", drift: "-30px", size: 2 },
  { left: "58%", delay: "6s",   dur: "11s", drift: "20px",  size: 3 },
  { left: "70%", delay: "3s",   dur: "13s", drift: "-40px", size: 2 },
  { left: "82%", delay: "5s",   dur: "16s", drift: "15px",  size: 4 },
  { left: "92%", delay: "0.5s", dur: "9s",  drift: "-25px", size: 2 },
];

const drips = [
  { left: "12%", delay: "0s",   dur: "3s",  h: 28 },
  { left: "28%", delay: "1.5s", dur: "2.5s",h: 20 },
  { left: "44%", delay: "0.8s", dur: "3.5s",h: 35 },
  { left: "60%", delay: "2.2s", dur: "2.8s",h: 22 },
  { left: "76%", delay: "0.3s", dur: "4s",  h: 30 },
  { left: "90%", delay: "1.8s", dur: "3.2s",h: 18 },
];

export default function Home() {
  return (
    <>
      <div className="relative min-h-screen font-sans overflow-x-hidden"
        style={{ background: "#06000a" }}>

        {/* ── ANIMATED BACKGROUND ── */}

        {/* Large floating blood orbs */}
        <div className="absolute pointer-events-none overflow-hidden inset-0">
          <div style={{
            position: "absolute", top: "-10%", left: "50%", transform: "translateX(-50%)",
            width: "600px", height: "400px",
            background: "radial-gradient(ellipse, rgba(139,0,0,0.22) 0%, transparent 70%)",
            animation: "orb-float 18s ease-in-out infinite",
            filter: "blur(40px)",
          }} />
          <div style={{
            position: "absolute", top: "30%", left: "-15%",
            width: "400px", height: "350px",
            background: "radial-gradient(ellipse, rgba(100,0,0,0.15) 0%, transparent 70%)",
            animation: "orb-float-2 22s ease-in-out infinite",
            filter: "blur(50px)",
          }} />
          <div style={{
            position: "absolute", top: "50%", right: "-10%",
            width: "350px", height: "300px",
            background: "radial-gradient(ellipse, rgba(80,0,0,0.12) 0%, transparent 70%)",
            animation: "orb-float 26s ease-in-out infinite reverse",
            filter: "blur(45px)",
          }} />
        </div>

        {/* Rising blood particles */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {particles.map((p, i) => (
            <div key={i} style={{
              position: "absolute",
              bottom: 0,
              left: p.left,
              width: `${p.size}px`,
              height: `${p.size}px`,
              borderRadius: "50%",
              background: i % 3 === 0 ? "#dc2626" : i % 3 === 1 ? "#8b0000" : "#d4a853",
              "--drift": p.drift,
              animation: `particle-rise ${p.dur} ${p.delay} ease-in infinite`,
              boxShadow: `0 0 ${p.size * 3}px ${i % 3 === 2 ? "rgba(212,168,83,0.8)" : "rgba(220,38,38,0.8)"}`,
            }} />
          ))}
        </div>

        {/* Blood drips from top */}
        <div className="absolute top-0 left-0 w-full pointer-events-none overflow-hidden" style={{ height: "50px" }}>
          {drips.map((d, i) => (
            <div key={i} style={{
              position: "absolute",
              top: "3px",
              left: d.left,
              width: "2px",
              borderRadius: "0 0 2px 2px",
              background: "linear-gradient(to bottom, #dc2626, #7f0000)",
              animation: `drip-fall ${d.dur} ${d.delay} ease-in infinite`,
              transformOrigin: "top",
            }} />
          ))}
        </div>

        {/* Grid overlay with fade mask */}
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: "linear-gradient(rgba(139,0,0,0.07) 1px,transparent 1px),linear-gradient(90deg,rgba(139,0,0,0.07) 1px,transparent 1px)",
          backgroundSize: "60px 60px",
          maskImage: "radial-gradient(ellipse 80% 70% at 50% 25%, black 20%, transparent 80%)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 70% at 50% 25%, black 20%, transparent 80%)"
        }} />

        {/* Vignette */}
        <div className="absolute inset-0 pointer-events-none" style={{
          background: "radial-gradient(ellipse 90% 90% at 50% 40%, transparent 35%, rgba(0,0,0,0.65) 100%)"
        }} />

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 w-full h-48 pointer-events-none" style={{
          background: "linear-gradient(to top, rgba(6,0,10,0.98) 0%, transparent 100%)"
        }} />

        {/* ── CONTENT ── */}
        <div className="relative z-10 w-full max-w-2xl mx-auto px-4 sm:px-6 py-8 sm:py-12 flex flex-col items-center gap-8">
          <Header />
          <QRCodeScanner />
          <TeamProgress />
          <Leaderboard />
          <Tips />
          <Footer />
        </div>
      </div>
      <Feedback />
    </>
  );
}
