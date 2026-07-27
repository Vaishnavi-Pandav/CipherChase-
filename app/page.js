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
      <div
        className="relative min-h-screen font-sans text-white"
        style={{
          background: "radial-gradient(ellipse at 20% 50%, rgba(0, 240, 255, 0.06) 0%, transparent 50%), radial-gradient(ellipse at 80% 20%, rgba(0, 255, 65, 0.04) 0%, transparent 50%), #0a0e17",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        {/* Animated grid overlay */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 240, 255, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 240, 255, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
          }}
        ></div>

        {/* Subtle top glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none"></div>

        <div className="relative z-10 p-8 pb-20 gap-16 sm:p-20 flex flex-col items-center">
          <Header />
          <QRCodeScanner />
          <TeamProgress />
          <Leaderboard />
          <Footer />
          <Tips />
        </div>
      </div>
      <Feedback />
    </>
  );
}
