import { MessageCircle } from "lucide-react";

const Feedback = () => {
  return (
    <div
      className="py-10 text-center"
      style={{
        background: "rgba(10,0,8,0.95)",
        borderTop: "1px solid rgba(139,0,0,0.3)",
      }}
    >
      <div className="flex items-center justify-center gap-2 mb-2 font-mono" style={{ color: "#cc0000" }}>
        <MessageCircle className="w-6 h-6" />
        <p className="text-xl font-bold tracking-wide">Want to Host Your Event?</p>
      </div>

      <p className="mt-2 text-sm font-mono" style={{ color: "rgba(200,180,160,0.6)" }}>
        Contact the organizers on WhatsApp to get started.
      </p>

      <a
        href="https://wa.me/919098447696?text=Hi%20I%20want%20to%20host%20a%20treasure%20hunt%20event"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block mt-4 px-6 py-2 rounded-full font-semibold transition font-mono"
        style={{
          background: "rgba(139,0,0,0.85)",
          color: "#e8d5c4",
          border: "1px solid rgba(139,0,0,0.6)",
          boxShadow: "0 0 16px rgba(139,0,0,0.3)",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(180,0,0,0.9)")}
        onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(139,0,0,0.85)")}
      >
        📩 Contact on WhatsApp
      </a>
    </div>
  );
};

export default Feedback;
