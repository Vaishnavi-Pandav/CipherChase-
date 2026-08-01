"use client";
import React, { useState, useEffect, useRef } from "react";
import { Scanner, centerText } from "@yudiel/react-qr-scanner";
import { Pause, Play } from "lucide-react";

const QRCodeScanner = () => {
  const [pause, setPause] = useState(false);
  const [message, setMessage] = useState("🔍 Scan Evidence QR Code");
  const [teamId, setTeamId] = useState("");
  const [teamIdInput, setTeamIdInput] = useState("");
  const [showTeamInput, setShowTeamInput] = useState(false);
  const [pendingQR, setPendingQR] = useState(null);
  const [questionData, setQuestionData] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [currentQR, setCurrentQR] = useState({ qrId: "", qrValue: "" });
  const [penaltyUntil, setPenaltyUntil] = useState(null);
  const [penaltyRemaining, setPenaltyRemaining] = useState("");
  const [showHint, setShowHint] = useState("");
  const [disqualified, setDisqualified] = useState(false);
  const timerRef = useRef(null);
  const inputRef = useRef(null);
  const teamIdRef = useRef("");

  const showMessage = (msg) => setMessage(msg);

  // Keep ref in sync so visibility handler always has latest teamId
  useEffect(() => { teamIdRef.current = teamId; }, [teamId]);

  // Tab switch / window blur → 10 min penalty
  useEffect(() => {
    const TAB_PENALTY_MINUTES = 10;

    const applyTabPenalty = () => {
      const currentTeamId = teamIdRef.current;
      if (!currentTeamId) return; // game not started yet
      const until = new Date(Date.now() + TAB_PENALTY_MINUTES * 60 * 1000);
      setPenaltyUntil(until.toISOString());
      showMessage(`🚨 Tab switch detected! ${TAB_PENALTY_MINUTES} min penalty applied.`);
      setQuestionData(null);

      // Persist penalty to DB
      fetch("/api/tab-penalty", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ teamId: currentTeamId, penaltyUntil: until.toISOString() }),
      }).catch(() => {});
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") applyTabPenalty();
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, []);

  // ── ANTI-CHEAT: Screenshot / screen capture detection ──
  const questionDataRef = useRef(null);
  useEffect(() => { questionDataRef.current = questionData; }, [questionData]);

  const applyDisqualify = (reason) => {
    const currentTeamId = teamIdRef.current;
    if (!currentTeamId) return;
    setDisqualified(true);
    setQuestionData(null);
    setShowHint("");
    showMessage("🚫 Disqualified!");
    fetch("/api/disqualify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ teamId: currentTeamId, reason }),
    }).catch(() => {});
  };

  useEffect(() => {
    // Block PrintScreen key
    const handleKeyDown = (e) => {
      if (!questionDataRef.current) return;
      if (e.key === "PrintScreen" || (e.ctrlKey && e.key === "p") || (e.metaKey && e.key === "p")) {
        e.preventDefault();
        applyDisqualify("Screenshot attempt detected");
      }
    };

    // Block right-click on question area
    const handleContextMenu = (e) => {
      if (questionDataRef.current) e.preventDefault();
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("contextmenu", handleContextMenu);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("contextmenu", handleContextMenu);
    };
  }, []);

  useEffect(() => {
    if (showTeamInput && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [showTeamInput]);
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
    showMessage("⏳ Validating...");
    fetch("/api/validate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ teamId: tid, qrId, qrValue }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.disqualified) {
          setDisqualified(true);
          return;
        }
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
    const raw = codes[0]?.rawValue;
    if (!raw) return;
    try {
      const params = new URLSearchParams(new URL(raw).search);
      const qrId = params.get("qrId");
      const qrValue = params.get("qrValue");
      if (!qrId || !qrValue) {
        showMessage("❌ Invalid QR format");
        return;
      }
      // Don't show the raw URL — show a neutral message
      showMessage("✅ QR detected!");
      setShowHint("");
      if (!teamId) {
        setPendingQR({ qrId, qrValue });
        setShowTeamInput(true);
        setPause(true);
        return;
      }
      callValidate(teamId, qrId, qrValue);
    } catch {
      showMessage("❌ Invalid QR format");
    }
  };

  const handleTeamIdSubmit = () => {
    const id = teamIdInput.trim();
    if (!id) return;
    setTeamId(id);
    setShowTeamInput(false);
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
    <div className="w-full px-3 sm:px-0 sm:max-w-sm mx-auto">
      <div
        className="w-full rounded-2xl overflow-hidden"
        style={{
          background: "linear-gradient(160deg, #0f0005 0%, #160008 100%)",
          border: "1px solid rgba(139,0,0,0.5)",
          boxShadow: "0 0 30px rgba(139,0,0,0.2)",
        }}
      >
        {/* Header bar */}
        <div
          className="flex items-center justify-between px-3 py-2.5"
          style={{
            background: "rgba(0,0,0,0.5)",
            borderBottom: "1px solid rgba(139,0,0,0.2)",
          }}
        >
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-800" />
            <div className="w-2.5 h-2.5 rounded-full" style={{ background: "rgba(180,120,0,0.7)" }} />
            <div className="w-2.5 h-2.5 rounded-full" style={{ background: "rgba(139,0,0,0.5)" }} />
          </div>
          <span className="text-xs font-mono" style={{ color: "rgba(139,0,0,0.7)" }}>
            EVIDENCE SCANNER
          </span>
          {teamId ? (
            <button
              onClick={() => { setTeamId(""); setQuestionData(null); setShowHint(""); showMessage("🔍 Scan Evidence QR Code"); }}
              className="text-xs font-mono px-2 py-0.5 rounded truncate max-w-[80px]"
              style={{ color: "rgba(201,168,76,0.8)", border: "1px solid rgba(201,168,76,0.2)" }}
            >
              {teamId} ✕
            </button>
          ) : (
            <div className="w-16" />
          )}
        </div>

        <div className="p-3">

          {/* ── INLINE TEAM ID INPUT (shown after scan when no teamId) ── */}
          {showTeamInput && (
            <div
              className="rounded-xl p-4 mb-3"
              style={{
                background: "rgba(0,0,0,0.75)",
                border: "1px solid rgba(139,0,0,0.6)",
                boxShadow: "0 0 20px rgba(139,0,0,0.2)",
              }}
            >
              <div className="text-center mb-3">
                <span className="text-2xl">🪪</span>
                <p
                  className="text-sm font-extrabold font-mono tracking-widest uppercase mt-1"
                  style={{ color: "#e8d5c4", textShadow: "0 0 8px rgba(139,0,0,0.7)" }}
                >
                  Enter Agent ID
                </p>
                <p className="text-xs font-mono mt-0.5" style={{ color: "rgba(180,140,140,0.6)" }}>
                  QR detected — identify yourself first
                </p>
              </div>

              {/* Red accent line */}
              <div
                className="h-px w-full mb-3"
                style={{ background: "linear-gradient(90deg, transparent, rgba(139,0,0,0.6), transparent)" }}
              />

              <input
                ref={inputRef}
                type="text"
                placeholder="e.g. T1X9A2"
                value={teamIdInput}
                onChange={(e) => setTeamIdInput(e.target.value.toUpperCase())}
                onKeyDown={(e) => e.key === "Enter" && handleTeamIdSubmit()}
                className="w-full px-4 py-3 rounded-xl text-center text-base font-mono font-bold tracking-[0.2em] focus:outline-none mb-3"
                style={{
                  background: "rgba(10,0,5,0.9)",
                  color: "#e8d5c4",
                  border: "1px solid rgba(139,0,0,0.5)",
                }}
              />

              <button
                onClick={handleTeamIdSubmit}
                disabled={!teamIdInput.trim()}
                className="w-full py-3 rounded-xl font-extrabold font-mono text-sm tracking-widest uppercase transition-all disabled:opacity-40"
                style={{
                  background: "linear-gradient(135deg, #8b0000, #cc0000)",
                  color: "#fff",
                  boxShadow: "0 0 16px rgba(139,0,0,0.4)",
                }}
              >
                ⚡ CONFIRM & PROCEED
              </button>

              <button
                onClick={() => { setShowTeamInput(false); setPause(false); setPendingQR(null); showMessage("🔍 Scan Evidence QR Code"); }}
                className="w-full mt-2 py-1.5 text-xs font-mono"
                style={{ color: "rgba(139,0,0,0.5)" }}
              >
                Cancel
              </button>
            </div>
          )}

          {/* ── HINT PANEL (shown after correct answer) ── */}
          {showHint && !questionData && (
            <div
              className="rounded-xl p-4 mb-3"
              style={{
                background: "rgba(40,28,0,0.6)",
                border: "1px solid rgba(201,168,76,0.5)",
                boxShadow: "0 0 16px rgba(201,168,76,0.15)",
              }}
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-base">🔍</span>
                <span className="text-xs font-extrabold font-mono tracking-widest uppercase" style={{ color: "#c9a84c" }}>
                  Next Clue
                </span>
              </div>
              <p className="text-sm font-mono leading-relaxed" style={{ color: "rgba(201,168,76,0.9)" }}>
                {showHint}
              </p>
              <button
                onClick={() => setShowHint("")}
                className="mt-3 w-full py-2 rounded-lg font-mono text-xs tracking-widest uppercase"
                style={{
                  background: "rgba(201,168,76,0.15)",
                  color: "rgba(201,168,76,0.6)",
                  border: "1px solid rgba(201,168,76,0.25)",
                }}
              >
                Got it — Scan Next QR
              </button>
            </div>
          )}

          {/* ── PAUSE / RESUME (hidden while team input or hint shown) ── */}
          {!questionData && !showTeamInput && !showHint && (
            <div className="flex items-center justify-between mb-3">
              <button
                onClick={() => setPause(!pause)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl font-bold font-mono text-sm transition-all"
                style={
                  pause
                    ? { background: "linear-gradient(135deg,#8b0000,#cc0000)", color: "#fff", boxShadow: "0 0 12px rgba(139,0,0,0.5)" }
                    : { background: "rgba(30,0,0,0.8)", color: "#cc0000", border: "1px solid rgba(139,0,0,0.4)" }
                }
              >
                {pause ? <><Play size={14} /> Resume</> : <><Pause size={14} /> Pause</>}
              </button>
              <span
                className="text-xs font-mono px-2 py-1 rounded-full"
                style={{
                  background: pause ? "rgba(50,0,0,0.5)" : "rgba(0,60,0,0.4)",
                  color: pause ? "rgba(180,0,0,0.9)" : "rgba(0,200,0,0.9)",
                  border: `1px solid ${pause ? "rgba(139,0,0,0.3)" : "rgba(0,120,0,0.4)"}`,
                }}
              >
                {pause ? "● IDLE" : "● LIVE"}
              </span>
            </div>
          )}

          {/* ── PENALTY TIMER ── */}
          {penaltyRemaining && (
            <div
              className="mb-3 text-center font-bold font-mono text-xs py-2 rounded-xl animate-pulse"
              style={{ color: "#cc0000", background: "rgba(139,0,0,0.1)", border: "1px solid rgba(139,0,0,0.3)" }}
            >
              {penaltyRemaining}
            </div>
          )}

          {/* ── SCANNER ── */}
          {!questionData && !penaltyUntil && !showTeamInput && !showHint && !disqualified && (
            <div
              className="overflow-hidden rounded-xl relative"
              style={{
                border: "2px solid rgba(139,0,0,0.6)",
                boxShadow: "0 0 20px rgba(139,0,0,0.3)",
              }}
            >
              {/* Corner brackets */}
              <div className="absolute top-0 left-0 w-5 h-5 border-t-2 border-l-2 z-10" style={{ borderColor: "#cc0000" }} />
              <div className="absolute top-0 right-0 w-5 h-5 border-t-2 border-r-2 z-10" style={{ borderColor: "#cc0000" }} />
              <div className="absolute bottom-0 left-0 w-5 h-5 border-b-2 border-l-2 z-10" style={{ borderColor: "#cc0000" }} />
              <div className="absolute bottom-0 right-0 w-5 h-5 border-b-2 border-r-2 z-10" style={{ borderColor: "#cc0000" }} />
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

          {/* ── QUESTION ── */}
          {questionData && (
            <div
              className="rounded-xl p-3"
              style={{
                background: "rgba(0,0,0,0.7)",
                border: "1px solid rgba(139,0,0,0.4)",
                userSelect: "none",
                WebkitUserSelect: "none",
                WebkitTouchCallout: "none",
                pointerEvents: "auto",
              }}
              onContextMenu={(e) => e.preventDefault()}
            >
              <p className="text-sm font-bold font-mono mb-3 leading-relaxed" style={{ color: "#e8d5c4" }}>
                📋 {questionData.text}
              </p>
              <div className="flex flex-col gap-2">
                {questionData.options.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedAnswer(opt)}
                    className="w-full px-3 py-2.5 rounded-lg text-left font-mono text-sm transition-all"
                    style={
                      selectedAnswer === opt
                        ? { background: "rgba(139,0,0,0.3)", color: "#e8d5c4", border: "1px solid rgba(200,0,0,0.7)", boxShadow: "0 0 8px rgba(139,0,0,0.3)" }
                        : { background: "rgba(15,0,5,0.8)", color: "#9a8a7a", border: "1px solid rgba(139,0,0,0.2)" }
                    }
                  >
                    <span className="mr-2 font-bold" style={{ color: "#8b0000" }}>
                      [{String.fromCharCode(65 + idx)}]
                    </span>
                    {opt}
                  </button>
                ))}
              </div>
              {showHint && !questionData && (
                <p className="mt-3 text-xs font-mono px-3 py-2 rounded-lg" style={{ color: "#c9a84c", background: "rgba(40,28,0,0.5)", border: "1px solid rgba(201,168,76,0.2)" }}>
                  🔍 {showHint}
                </p>
              )}
              <button
                onClick={handleSubmitAnswer}
                className="mt-3 w-full py-3 rounded-xl font-extrabold font-mono text-sm tracking-widest uppercase"
                style={{ background: "linear-gradient(135deg,#8b0000,#cc0000)", color: "#fff", boxShadow: "0 0 14px rgba(139,0,0,0.4)" }}
              >
                ⚖ SUBMIT TESTIMONY
              </button>
            </div>
          )}

          {/* ── DISQUALIFIED OVERLAY ── */}
          {disqualified && (
            <div className="rounded-xl p-6 text-center"
              style={{ background:"rgba(80,0,0,0.25)", border:"2px solid rgba(220,38,38,0.7)", boxShadow:"0 0 30px rgba(220,38,38,0.3)" }}>
              <div className="text-4xl mb-3">🚫</div>
              <h2 className="text-lg font-extrabold font-mono tracking-widest uppercase mb-2" style={{ color:"#dc2626" }}>
                DISQUALIFIED
              </h2>
              <p className="text-xs font-mono" style={{ color:"rgba(220,160,160,0.8)" }}>
                Your team has been disqualified for a rule violation. Contact the organizers.
              </p>
            </div>
          )}

          {/* ── STATUS MESSAGE ── */}
          <div
            className="mt-3 text-center text-sm font-bold font-mono rounded-xl px-3 py-2.5 break-words"
            style={{ color: "#e8d5c4", background: "rgba(0,0,0,0.6)", border: "1px solid rgba(139,0,0,0.3)" }}
          >
            {message}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QRCodeScanner;
