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
      <div className="relative min-h-screen font-sans overflow-x-hidden"
        style={{ background: "#06000a" }}>

        {/* === BACKGROUND LAYERS === */}

        {/* Deep radial blood bloom from top center */}
        <div className="absolute inset-0 pointer-events-none" style={{
          background: "radial-gradient(ellipse 100% 55% at 50% 0%, rgba(139,0,0,0.28) 0%, rgba(80,0,0,0.12) 40%, transparent 70%)"
        }} />

        {/* Side atmospheric glows */}
        <div className="absolute inset-0 pointer-events-none" style={{
          background: "radial-gradient(ellipse 50% 60% at 0% 40%, rgba(100,0,0,0.1) 0%, transparent 60%), radial-gradient(ellipse 50% 60% at 100% 60%, rgba(80,0,0,0.08) 0%, transparent 60%)"
        }} />

        {/* Subtle grid — crime scene evidence tape style */}
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: "linear-gradient(rgba(139,0,0,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(139,0,0,0.06) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage: "radial-gradient(ellipse 90% 80% at 50% 30%, black 30%, transparent 80%)",
          WebkitMaskImage: "radial-gradient(ellipse 90% 80% at 50% 30%, black 30%, transparent 80%)"
        }} />

        {/* Vignette — darkens edges for depth */}
        <div className="absolute inset-0 pointer-events-none" style={{
          background: "radial-gradient(ellipse 85% 85% at 50% 40%, transparent 40%, rgba(0,0,0,0.55) 100%)"
        }} />

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 w-full h-64 pointer-events-none" style={{
          background: "linear-gradient(to top, rgba(6,0,10,0.95) 0%, transparent 100%)"
        }} />

        {/* === CONTENT === */}
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
