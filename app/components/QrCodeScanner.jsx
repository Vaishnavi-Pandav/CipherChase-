"use client";
import React, { useState, useEffect, useRef } from "react";
import { Scanner, centerText } from "@yudiel/react-qr-scanner";
import { Pause, Play } from "lucide-react";

const QRCodeScanner = () => {
  const [pause, setPause] = useState(false);
  const [message, setMessage] = useState("🔍 Scan Evidence QR Code");
  const [teamId, setTeamId] = useState("");
  const [teamIdInput, setTeamIdInput] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [pendingQR, setPendingQR] = useState(null);
  const [questionData, setQuestionData] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [currentQR, setCurrentQR] = useState({ qrId: "", qrValue: "" });
  const [penaltyUntil, setPenaltyUntil] = useState(null);
  const [penaltyRemaining, setPenaltyRemaining] = useState("");
  const [showHint, setShowHint] = useState("");
  const timerRef = useRef(null);
  const inputRef = useRef(null);

  const showMessage = (msg) => setMessage(msg);

  // Focus input when modal opens
  useEffect(() => {
    if (showModal && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [showModal]);

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
        setPenaltyRemaining(`⏳ ${minutes}m ${seconds}s remaining`);
      }
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [penaltyUntil]);

  const callValidate = (tid, qrId, qrValue) => {
    fetch("/api/validate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ teamId: tid, qrId, qrValue }),
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
  };

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
      if (!teamId) {
        setPendingQR({ qrId, qrValue });
        setShowModal(true);
        setPause(true);
        return;
      }
      callValidate(teamId, qrId, qrValue);
    } catch {
      showMessage("❌ Invalid QR format");
    }
  };

  const handleModalSubmit = () => {
    const id = teamIdInput.trim();
    if (!id) return;
    setTeamId(id);
    setShowModal(false);
    setPause(false);
    setTeamIdInput("");
    if (pendingQR) {
      callValidate(id, pendingQR.qrId, pendingQR.qrValue);
      setPendingQR(null);
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
          setQuestionData(null);
          if (data.hint) setShowHint(data.hint);
        }
        if (data.penaltyUntil) setPenaltyUntil(data.penaltyUntil);
      })
      .catch(() => showMessage("⚠️ Something went wrong while submitting"));
  };

  return (
    <>
      {/* Team ID Modal */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center px-4"
          style={{ background: "rgba(0,0,0,0.85)", backdropFilter: "blur(6px)" }}
        >
          <div
            className="w-full max-w-sm rounded-2xl p-6"
            style={{
              background: "linear-gradient(135deg, #0f0005 0%, #1a0008 100%)",
              border: "1px solid rgba(139,0,0,0.7)",
              boxShadow: "0 0 40px rgba(139,0,0,0.4), inset 0 0 20px rgba(139,0,0,0.05)",
            }}
          >
            {/* Top accent line */}
            <div
              className="h-1 w-16 rounded-full mx-auto mb-5"
              style={{ background: "linear-gradient(90deg, #8b0000, #cc0000, #8b0000)" }}
            />

            <div className="text-center mb-5">
              <div className="text-3xl mb-2">🪪</div>
              <h2
                className="text-xl font-extrabold font-mono tracking-wider uppercase"
                style={{ color: "#e8d5c4", textShadow: "0 0 12px rgba(139,0,0,0.8)" }}
              >
                Identify Yourself
              </h2>
              <p className="text-xs mt-1 font-mono" style={{ color: "rgba(200,160,160,0.6)" }}>
                Enter your Agent ID to proceed
              </p>
            </div>

            <input
              ref={inputRef}
              type="text"
              placeholder="e.g. T1X9A2"
              value={teamIdInput}
              onChange={(e) => setTeamIdInput(e.target.value.toUpperCase())}
              onKeyDown={(e) => e.key === "Enter" && handleModalSubmit()}
              className="w-full px-4 py-3 rounded-xl text-center text-lg font-mono font-bold tracking-widest focus:outline-none mb-4"
              style={{
                background: "rgba(0,0,0,0.7)",
                color: "#e8d5c4",
                border: "1px solid rgba(139,0,0,0.5)",
                letterSpacing: "0.2em",
              }}
            />

            <button
              onClick={handleModalSubmit}
              disabled={!teamIdInput.trim()}
              className="w-full py-3 rounded-xl font-extrabold font-mono text-base tracking-widest uppercase transition-all disabled:opacity-40"
              style={{
                background: "linear-gradient(135deg, #8b0000, #cc0000)",
                color: "#fff",
                boxShadow: "0 0 20px rgba(139,0,0,0.5)",
                border: "1px solid rgba(200,0,0,0.4)",
              }}
            >
              ⚡ CONFIRM
            </button>

            <button
              onClick={() => { setShowModal(false); setPause(false); setPendingQR(null); }}
              className="w-full mt-2 py-2 text-xs font-mono"
              style={{ color: "rgba(139,0,0,0.5)" }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Main Scanner Card */}
      <div
        className="w-full max-w-sm mx-auto rounded-2xl overflow-hidden"
        style={{
          background: "linear-gradient(160deg, #0f0005 0%, #160008 100%)",
          border: "1px solid rgba(139,0,0,0.5)",
          boxShadow: "0 0 30px rgba(139,0,0,0.2)",
        }}
      >
        {/* Header bar */}
        <div
          className="flex items-center justify-between px-4 py-3"
          style={{
            background: "rgba(0,0,0,0.5)",
            borderBottom: "1px solid rgba(139,0,0,0.2)",
          }}
        >
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-red-800"></div>
            <div className="w-2.5 h-2.5 rounded-full" style={{ background: "rgba(180,120,0,0.7)" }}></div>
            <div className="w-2.5 h-2.5 rounded-full" style={{ background: "rgba(139,0,0,0.5)" }}></div>
          </div>
          <span className="text-xs font-mono" style={{ color: "rgba(139,0,0,0.7)" }}>
            EVIDENCE SCANNER
          </span>
          {teamId && (
            <button
              onClick={() => { setTeamId(""); setQuestionData(null); setShowHint(""); }}
              className="text-xs font-mono px-2 py-0.5 rounded"
              style={{ color: "rgba(201,168,76,0.8)", border: "1px solid rgba(201,168,76,0.2)" }}
            >
              {teamId} ✕
            </button>
          )}
          {!teamId && <div className="w-16" />}
        </div>

        <div className="p-4">
          {/* Pause/Resume button */}
          {!questionData && (
            <div className="flex items-center justify-between mb-3">
              <button
                onClick={() => setPause(!pause)}
                className="flex items-center gap-2 px-4 py-2 rounded-xl font-bold font-mono text-sm transition-all"
                style={
                  pause
                    ? {
                        background: "linear-gradient(135deg, #8b0000, #cc0000)",
                        color: "#fff",
                        boxShadow: "0 0 14px rgba(139,0,0,0.5)",
                      }
                    : {
                        background: "rgba(30,0,0,0.8)",
                        color: "#cc0000",
                        border: "1px solid rgba(139,0,0,0.4)",
                      }
                }
              >
                {pause ? <><Play size={15} /> Resume</> : <><Pause size={15} /> Pause</>}
              </button>
              <span
                className="text-xs font-mono px-2 py-1 rounded-full"
                style={{
                  background: pause ? "rgba(50,0,0,0.5)" : "rgba(0,80,0,0.3)",
                  color: pause ? "rgba(139,0,0,0.8)" : "rgba(0,200,0,0.8)",
                  border: `1px solid ${pause ? "rgba(139,0,0,0.3)" : "rgba(0,150,0,0.3)"}`,
                }}
              >
                {pause ? "● IDLE" : "● LIVE"}
              </span>
            </div>
          )}

          {/* Penalty Timer */}
          {penaltyRemaining && (
            <div
              className="mb-3 text-center font-bold font-mono text-sm py-2 rounded-xl animate-pulse"
              style={{
                color: "#cc0000",
                background: "rgba(139,0,0,0.1)",
                border: "1px solid rgba(139,0,0,0.3)",
              }}
            >
              {penaltyRemaining}
            </div>
          )}

          {/* Scanner viewport */}
          {!questionData && !penaltyUntil && (
            <div
              className="overflow-hidden rounded-xl relative"
              style={{
                border: "2px solid rgba(139,0,0,0.7)",
                boxShadow: "0 0 24px rgba(139,0,0,0.35), inset 0 0 10px rgba(139,0,0,0.05)",
              }}
            >
              {/* Corner accents */}
              <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 rounded-tl-lg z-10" style={{ borderColor: "#cc0000" }} />
              <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 rounded-tr-lg z-10" style={{ borderColor: "#cc0000" }} />
              <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 rounded-bl-lg z-10" style={{ borderColor: "#cc0000" }} />
              <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 rounded-br-lg z-10" style={{ borderColor: "#cc0000" }} />

              <Scanner
                formats={["qr_code"]}
                paused={pause}
                scanDelay={1000}
                onScan={handleScan}
                onError={() => showMessage("⚠ Camera error")}
                components={{ torch: true, zoom: true, finder: true, tracker: centerText }}
              />
            </div>
          )}

          {/* Question */}
          {questionData && (
            <div
              className="rounded-xl p-4"
              style={{
                background: "rgba(0,0,0,0.7)",
                border: "1px solid rgba(139,0,0,0.4)",
              }}
            >
              <p
                className="text-sm font-bold font-mono mb-3 leading-relaxed"
                style={{ color: "#e8d5c4" }}
              >
                📋 {questionData.text}
              </p>
              <div className="grid grid-cols-1 gap-2">
                {questionData.options.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedAnswer(opt)}
                    className="px-3 py-2.5 rounded-lg text-left font-mono text-sm transition-all"
                    style={
                      selectedAnswer === opt
                        ? {
                            background: "rgba(139,0,0,0.3)",
                            color: "#e8d5c4",
                            border: "1px solid rgba(200,0,0,0.7)",
                            boxShadow: "0 0 10px rgba(139,0,0,0.3)",
                          }
                        : {
                            background: "rgba(15,0,5,0.8)",
                            color: "#9a8a7a",
                            border: "1px solid rgba(139,0,0,0.2)",
                          }
                    }
                  >
                    <span className="mr-2 font-bold" style={{ color: "#8b0000" }}>
                      [{String.fromCharCode(65 + idx)}]
                    </span>
                    {opt}
                  </button>
                ))}
              </div>
              {showHint && (
                <p className="mt-3 text-xs font-mono px-3 py-2 rounded-lg" style={{ color: "#c9a84c", background: "rgba(50,35,0,0.4)", border: "1px solid rgba(201,168,76,0.2)" }}>
                  🔍 {showHint}
                </p>
              )}
              <button
                onClick={handleSubmitAnswer}
                className="mt-3 w-full py-3 rounded-xl font-extrabold font-mono text-sm tracking-widest uppercase transition-all"
                style={{
                  background: "linear-gradient(135deg, #8b0000, #cc0000)",
                  color: "#fff",
                  boxShadow: "0 0 16px rgba(139,0,0,0.4)",
                }}
              >
                ⚖ SUBMIT TESTIMONY
              </button>
            </div>
          )}

          {/* Status message */}
          <div
            className="mt-3 text-center text-sm font-bold font-mono rounded-xl px-4 py-2.5"
            style={{
              color: "#e8d5c4",
              background: "rgba(0,0,0,0.6)",
              border: "1px solid rgba(139,0,0,0.3)",
            }}
          >
            {message}
          </div>
        </div>
      </div>
    </>
  );
};

export default QRCodeScanner;
