"use client";
import Feedback from "./components/Feedback";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Leaderboard from "./components/Leaderboard";
import QRCodeScanner from "./components/QrCodeScanner";
import TeamProgress from "./components/TeamProgress";
import Tips from "./components/Tips";

export default function Home() {
  return (
    <>
      <div className="relative min-h-screen font-sans text-white overflow-x-hidden"
        style={{
          background: "radial-gradient(ellipse 80% 50% at 50% -10%, rgba(139,0,0,0.25) 0%, transparent 70%), radial-gradient(ellipse 60% 40% at 20% 60%, rgba(80,0,0,0.12) 0%, transparent 60%), radial-gradient(ellipse 60% 40% at 80% 80%, rgba(60,0,0,0.1) 0%, transparent 60%), #070005",
        }}
      >
        {/* Grid overlay */}
        <div className="absolute inset-0 pointer-events-none" style={{ opacity: 0.07,
          backgroundImage: "linear-gradient(rgba(139,0,0,0.4) 1px,transparent 1px),linear-gradient(90deg,rgba(139,0,0,0.4) 1px,transparent 1px)",
          backgroundSize: "60px 60px" }} />

        {/* Center spotlight glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[90vw] max-w-3xl h-[50vh] pointer-events-none"
          style={{ background: "radial-gradient(ellipse at center top, rgba(139,0,0,0.18) 0%, transparent 70%)" }} />

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 w-full h-48 pointer-events-none"
          style={{ background: "linear-gradient(to top, rgba(7,0,5,0.9), transparent)" }} />

        <div className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12 flex flex-col items-center gap-10">
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
