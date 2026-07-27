import React, { useState, useEffect, useRef } from "react";
import { Scanner, centerText } from "@yudiel/react-qr-scanner";
import { Pause, Play } from "lucide-react";

const QRCodeScanner = () => {
  const [pause, setPause] = useState(false);
  const [message, setMessage] = useState("🔍 Scan Evidence QR Code");
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
        showMessage("❌ Invalid evidence QR format");
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
              showMessage(`🔍 Clue: ${data.hint}`);
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
      showMessage("❌ Invalid evidence QR format");
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
    <div
      className="w-full max-w-lg mx-auto p-6 backdrop-blur-md rounded-2xl"
      style={{
        background: "rgba(10,0,8,0.92)",
        border: "1px solid rgba(139,0,0,0.5)",
        boxShadow: "0 0 24px rgba(139,0,0,0.2), inset 0 0 20px rgba(139,0,0,0.04)",
      }}
    >
      {/* Evidence bag style header */}
      <div
        className="flex items-center gap-2 mb-4 px-3 py-2 rounded-lg"
        style={{
          background: "rgba(0,0,0,0.5)",
          border: "1px solid rgba(139,0,0,0.3)",
        }}
      >
        <div className="w-3 h-3 rounded-full bg-red-800"></div>
        <div className="w-3 h-3 rounded-full bg-yellow-700/80"></div>
        <div className="w-3 h-3 rounded-full bg-red-600/60"></div>
        <span className="ml-3 text-xs font-mono" style={{ color: "rgba(139,0,0,0.8)" }}>
          EVIDENCE_SCANNER — UPSURGE_2K26
        </span>
      </div>

      {/* Play/Pause */}
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={() => setPause(!pause)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all font-mono text-sm"
          style={
            pause
              ? {
                  background: "rgba(139,0,0,0.8)",
                  color: "#e8d5c4",
                  boxShadow: "0 0 12px rgba(139,0,0,0.5)",
                  border: "1px solid rgba(139,0,0,0.6)",
                }
              : {
                  background: "rgba(50,0,0,0.7)",
                  color: "#cc0000",
                  border: "1px solid rgba(139,0,0,0.4)",
                }
          }
        >
          {pause ? (
            <><Play size={18} /> Resume Investigation</>
          ) : (
            <><Pause size={18} /> Pause</>
          )}
        </button>
        <span className="text-xs font-mono" style={{ color: "rgba(139,0,0,0.6)" }}>
          STATUS: {pause ? "IDLE" : "SCANNING"}
        </span>
      </div>

      {/* Penalty Timer */}
      {penaltyRemaining && (
        <div
          className="mb-4 text-center font-bold font-mono animate-pulse"
          style={{ color: "#cc0000" }}
        >
          {penaltyRemaining}
        </div>
      )}

      {/* Scanner */}
      {!questionData && !penaltyUntil && (
        <div
          className="overflow-hidden rounded-xl"
          style={{
            border: "2px solid rgba(139,0,0,0.7)",
            boxShadow: "0 0 24px rgba(139,0,0,0.4)",
          }}
        >
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
        <div
          className="mt-4 p-5 rounded-xl"
          style={{
            background: "rgba(0,0,0,0.85)",
            border: "1px solid rgba(139,0,0,0.4)",
            boxShadow: "0 0 16px rgba(139,0,0,0.1)",
          }}
        >
          <p className="text-lg font-bold font-mono" style={{ color: "#e8d5c4" }}>
            {"📋 "} {questionData.text}
          </p>
          <div className="mt-3 grid grid-cols-1 gap-2">
            {questionData.options.map((opt, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedAnswer(opt)}
                className="px-4 py-2 rounded-lg text-left transition-all font-mono text-sm"
                style={
                  selectedAnswer === opt
                    ? {
                        background: "rgba(139,0,0,0.25)",
                        color: "#e8d5c4",
                        border: "1px solid rgba(139,0,0,0.7)",
                        boxShadow: "0 0 8px rgba(139,0,0,0.3)",
                      }
                    : {
                        background: "rgba(20,0,0,0.6)",
                        color: "#b0a090",
                        border: "1px solid rgba(139,0,0,0.2)",
                      }
                }
              >
                <span style={{ color: "#8b0000" }} className="mr-2">
                  [{String.fromCharCode(65 + idx)}]
                </span>
                {opt}
              </button>
            ))}
          </div>
          {showHint && (
            <p className="mt-3 text-sm font-mono" style={{ color: "#c9a84c" }}>
              🔍 Clue: {showHint}
            </p>
          )}
          <button
            onClick={handleSubmitAnswer}
            className="mt-4 w-full px-4 py-2 rounded-lg font-bold transition-all font-mono"
            style={{
              background: "rgba(139,0,0,0.85)",
              color: "#e8d5c4",
              border: "1px solid rgba(139,0,0,0.6)",
              boxShadow: "0 0 16px rgba(139,0,0,0.35)",
            }}
          >
            ⚖ SUBMIT TESTIMONY
          </button>
        </div>
      )}

      {/* Status Message */}
      <div
        className="mt-4 text-center text-lg font-bold font-mono rounded-md px-4 py-2"
        style={{
          color: "#e8d5c4",
          background: "rgba(0,0,0,0.7)",
          border: "1px solid rgba(139,0,0,0.4)",
        }}
      >
        {message}
      </div>
    </div>
  );
};

export default QRCodeScanner;
