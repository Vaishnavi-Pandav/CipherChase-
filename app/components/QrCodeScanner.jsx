import React, { useState, useEffect, useRef } from "react";
import { Scanner, centerText } from "@yudiel/react-qr-scanner";
import { Pause, Play } from "lucide-react";

const QRCodeScanner = () => {
  const [pause, setPause] = useState(false);
  const [message, setMessage] = useState("📷 Scan a QR Code");
  const [teamId, setTeamId] = useState("");
  const [questionData, setQuestionData] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [currentQR, setCurrentQR] = useState({ qrId: "", qrValue: "" });
  const [penaltyUntil, setPenaltyUntil] = useState(null);
  const [penaltyRemaining, setPenaltyRemaining] = useState("");
  const [showHint, setShowHint] = useState("");
  const timerRef = useRef(null);

  const showMessage = (msg) => setMessage(msg);

  const askForTeamId = () => {
    const inputId = prompt("Enter your Team ID:");
    if (inputId?.trim()) {
      setTeamId(inputId.trim());
      return inputId.trim();
    }
    showMessage("❌ Team ID required");
    return null;
  };

  // Penalty countdown
  useEffect(() => {
    if (!penaltyUntil) {
      clearInterval(timerRef.current);
      setPenaltyRemaining("");
      return;
    }
    timerRef.current = setInterval(() => {
      const diff = new Date(penaltyUntil) - new Date();
      if (diff <= 0) {
        clearInterval(timerRef.current);
        setPenaltyUntil(null);
        setPenaltyRemaining("");
        showMessage("✅ Penalty over! You can scan again.");
      } else {
        const minutes = Math.floor(diff / 1000 / 60);
        const seconds = Math.floor(diff / 1000) % 60;
        setPenaltyRemaining(`⏳ Penalty time: ${minutes}m ${seconds}s`);
      }
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [penaltyUntil]);

  const handleScan = (codes) => {
    if (penaltyUntil) {
      showMessage("⚠ Under penalty. Wait until it expires.");
      return;
    }

    const url = codes[0]?.rawValue;
    if (!url) return;

    try {
      const params = new URLSearchParams(new URL(url).search);
      const qrId = params.get("qrId");
      const qrValue = params.get("qrValue");

      if (!qrId || !qrValue) {
        showMessage("❌ Invalid QR format");
        return;
      }

      const currentTeamId = teamId || askForTeamId();
      if (!currentTeamId) return;

      fetch("/api/validate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ teamId: currentTeamId, qrId, qrValue }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.penaltyUntil) {
            setPenaltyUntil(data.penaltyUntil);
            showMessage(data.message);
            return;
          }
          if (data.success) {
            setShowHint("");
            if (data.hint && !data.question) {
              setQuestionData(null);
              showMessage(`💡 Hint: ${data.hint}`);
            } else {
              setQuestionData(data.question);
              setCurrentQR({ qrId, qrValue });
              showMessage(data.message);
            }
          } else {
            setQuestionData(null);
            showMessage(data.message);
          }
        })
        .catch(() => showMessage("⚠️ Something went wrong"));
    } catch {
      showMessage("❌ Invalid QR format");
    }
  };

  const handleSubmitAnswer = () => {
    if (!selectedAnswer) {
      showMessage("⚠️ Please select an answer");
      return;
    }

    fetch("/api/submit-answer", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        teamId,
        qrId: currentQR.qrId,
        qrValue: currentQR.qrValue,
        answer: selectedAnswer,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        showMessage(data.message);
        if (data.success) {
          setSelectedAnswer("");
          if (data.hint) setShowHint(data.hint);
        }
      })
      .catch(() =>
        showMessage("⚠️ Something went wrong while submitting answer")
      );
  };

  return (
    <div className="w-full max-w-lg mx-auto p-6 bg-[rgba(10,14,23,0.85)] backdrop-blur-md rounded-2xl shadow-lg border border-cyan-500/60" style={{ boxShadow: "0 0 20px rgba(0,240,255,0.15), inset 0 0 20px rgba(0,240,255,0.03)" }}>
      {/* Terminal-style header */}
      <div className="flex items-center gap-2 mb-4 px-3 py-2 bg-black/40 rounded-lg border border-cyan-500/20">
        <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
        <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
        <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
        <span className="ml-3 text-xs font-mono text-cyan-400/60">cipher_scanner — v2.0</span>
      </div>

      {/* Play Pause Button */}
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={() => setPause(!pause)}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all shadow-md font-mono text-sm
      ${
        pause
          ? "bg-cyan-600 hover:bg-cyan-500 text-black"
          : "bg-red-600 hover:bg-red-500 text-white"
      }`}
        >
          {pause ? (
            <>
              <Play size={18} />
              Resume
            </>
          ) : (
            <>
              <Pause size={18} />
              Pause
            </>
          )}
        </button>
        <span className="text-xs font-mono text-cyan-500/50">STATUS: {pause ? "IDLE" : "ACTIVE"}</span>
      </div>

      {/* Penalty Timer */}
      {penaltyRemaining && (
        <div className="mb-4 text-center text-red-400 font-bold font-mono animate-pulse">
          {penaltyRemaining}
        </div>
      )}

      {/* Scanner */}
      {!questionData && !penaltyUntil && (
        <div className="overflow-hidden rounded-xl border-2 border-cyan-500 shadow-[0_0_20px_rgba(0,240,255,0.4)]">
          <Scanner
            formats={["qr_code"]}
            paused={pause}
            scanDelay={1000}
            onScan={handleScan}
            onError={() => showMessage("⚠ Camera error")}
            components={{
              torch: true,
              zoom: true,
              finder: true,
              tracker: centerText,
            }}
          />
        </div>
      )}

      {/* Question */}
      {questionData && (
        <div className="mt-4 p-5 bg-black/80 rounded-xl border border-cyan-500/40 shadow-[0_0_15px_rgba(0,240,255,0.1)]">
          <p className="text-lg font-bold text-cyan-300 font-mono">{"> "} {questionData.text}</p>
          <div className="mt-3 grid grid-cols-1 gap-2">
            {questionData.options.map((opt, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedAnswer(opt)}
                className={`px-4 py-2 rounded-lg border text-left transition-all font-mono text-sm
                  ${
                    selectedAnswer === opt
                      ? "bg-cyan-600/30 text-cyan-100 border-cyan-400 shadow-[0_0_8px_rgba(0,240,255,0.3)]"
                      : "bg-gray-900/60 text-gray-200 border-cyan-500/20 hover:bg-cyan-900/20 hover:border-cyan-500/40"
                  }`}
              >
                <span className="text-cyan-500 mr-2">[{String.fromCharCode(65 + idx)}]</span>
                {opt}
              </button>
            ))}
          </div>
          {showHint && (
            <p className="mt-3 text-sm text-yellow-400 font-mono">💡 Hint: {showHint}</p>
          )}
          <button
            onClick={handleSubmitAnswer}
            className="mt-4 w-full px-4 py-2 bg-cyan-600 hover:bg-cyan-500 rounded-lg text-black font-bold transition-all font-mono shadow-[0_0_15px_rgba(0,240,255,0.3)]"
          >
            {">"} SUBMIT ANSWER
          </button>
        </div>
      )}

      {/* Status Message */}
      <div className="mt-4 text-center text-lg font-bold text-cyan-400 bg-black/70 rounded-md px-4 py-2 border border-cyan-500/50 font-mono">
        {message}
      </div>
    </div>
  );
};

export default QRCodeScanner;
