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
          background:
            "radial-gradient(ellipse at 20% 50%, rgba(139,0,0,0.08) 0%, transparent 55%), radial-gradient(ellipse at 80% 20%, rgba(80,0,0,0.06) 0%, transparent 55%), #0a0008",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        {/* Crime-scene evidence tape grid */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(rgba(139,0,0,0.15) 1px, transparent 1px),
              linear-gradient(90deg, rgba(139,0,0,0.15) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
          }}
        ></div>

        {/* Bloodstain top glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-red-900/20 blur-[140px] rounded-full pointer-events-none"></div>

        {/* Bottom fog */}
        <div className="absolute bottom-0 left-0 w-full h-[200px] bg-gradient-to-t from-black/60 to-transparent pointer-events-none"></div>

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
