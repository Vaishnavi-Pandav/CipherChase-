import { MessageCircle } from "lucide-react";

const Feedback = () => {
  return (
    <div className="py-10 text-center bg-[rgba(10,14,23,0.9)] border-t border-cyan-500/30">

      <div className="flex items-center justify-center gap-2 text-cyan-400 mb-2 font-mono">
        <MessageCircle className="w-6 h-6" />
        <p className="text-xl font-bold tracking-wide">
          Want to Host Your Event?
        </p>
      </div>

      <p className="mt-2 text-gray-400 text-sm font-mono">
        Reach us on WhatsApp to get started.
      </p>

      <a
        href="https://wa.me/919098447696?text=Hi%20I%20want%20to%20host%20a%20treasure%20hunt%20event"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block mt-4 px-5 py-2 bg-green-500 hover:bg-green-400 text-black rounded-full font-semibold transition font-mono shadow-[0_0_15px_rgba(0,255,65,0.3)]"
      >
        Message on WhatsApp
      </a>
    </div>
  );
};

export default Feedback;
