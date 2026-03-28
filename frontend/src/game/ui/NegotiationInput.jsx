import React, { useState, useRef } from "react";
import {
  Send,
  DollarSign,
  Zap,
  MessageSquare,
  AlertCircle,
} from "lucide-react";

const QUICK_MESSAGES = [
  "Cash deal, today only.",
  "That's above market value.",
  "Take it or leave it.",
  "I can go higher for extras.",
];

const NegotiationInput = ({ onSubmit, disabled }) => {
  const [offer, setOffer] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});
  const [shaking, setShaking] = useState({});
  const msgRef = useRef();

  const triggerShake = (field) => {
    setShaking((s) => ({ ...s, [field]: true }));
    setTimeout(() => setShaking((s) => ({ ...s, [field]: false })), 400);
  };

  const validate = () => {
    const errs = {};
    if (!offer || Number(offer) <= 0) errs.offer = "Offer amount is required";
    if (!message.trim()) errs.message = "Message is required";
    return errs;
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      if (errs.offer) triggerShake("offer");
      if (errs.message) triggerShake("message");
      return;
    }
    setErrors({});
    onSubmit({ offer: Number(offer), message: message.trim() });
    setOffer("");
    setMessage("");
  };

  const handleQuick = (msg) => {
    setMessage(msg);
    setErrors((e) => ({ ...e, message: undefined }));
    msgRef.current?.focus();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="space-y-4 w-full">
      {/* Quick message chips */}
      <div className="flex flex-wrap gap-2 items-center">
        <span
          className="flex items-center gap-1 text-[10px] font-mono mr-1"
          style={{ color: "var(--color-text-muted)" }}
        >
          <Zap
            className="w-3 h-3"
            style={{ color: "var(--color-accent-pink)" }}
          />{" "}
          Quick:
        </span>
        {QUICK_MESSAGES.map((q) => (
          <button
            key={q}
            type="button"
            onClick={() => handleQuick(q)}
            disabled={disabled}
            className="text-xs px-3 py-1.5 rounded-full border transition-all duration-200 hover:scale-105 active:scale-95 disabled:opacity-40 hover:-translate-y-0.5"
            style={{
              color: "var(--color-text-muted)",
              borderColor: "var(--color-border)",
              background: "var(--color-surface-2)",
              fontFamily: "Syne, sans-serif",
            }}
          >
            {q}
          </button>
        ))}
      </div>

      {/* Offer + Message + Send */}
      <div className="grid grid-cols-1 gap-3 w-full xl:grid-cols-[minmax(170px,220px)_minmax(0,1fr)_auto] xl:gap-4 xl:items-stretch">
        {/* Offer field */}
        <div className="w-full xl:min-w-[170px]">
          <label className="section-label flex items-center gap-1 mb-1">
            <DollarSign
              className="w-3 h-3"
              style={{ color: "var(--color-victor)" }}
            />
            Offer <span style={{ color: "#ff4466" }}>*</span>
          </label>
          <div className="relative">
            <DollarSign
              className="absolute left-[10px] top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none"
              style={{ color: "var(--color-victor)" }}
            />
            <input
              type="number"
              value={offer}
              onChange={(e) => {
                setOffer(e.target.value);
                setErrors((er) => ({ ...er, offer: undefined }));
              }}
              onKeyDown={handleKeyDown}
              placeholder="0"
              disabled={disabled}
              min={1}
              className={`w-full pl-8 pr-3 py-3 rounded-xl text-sm ${shaking.offer || errors.offer ? "input-error" : "input-offer"}`}
            />
          </div>
          {errors.offer && (
            <p className="flex items-center gap-1 text-[11px] mt-1 text-[#ff4466]">
              <AlertCircle className="w-3 h-3 shrink-0" /> {errors.offer}
            </p>
          )}
        </div>

        {/* Message field */}
        <div className="w-full min-w-0">
          <label className="section-label flex items-center gap-1 mb-1">
            <MessageSquare
              className="w-3 h-3"
              style={{ color: "var(--color-void)" }}
            />
            Message <span style={{ color: "#ff4466" }}>*</span>
          </label>
          <textarea
            ref={msgRef}
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
              setErrors((er) => ({ ...er, message: undefined }));
            }}
            onKeyDown={handleKeyDown}
            placeholder="Your message to Victor…"
            disabled={disabled}
            rows={1}
            className={`w-full resize-none input-base ${shaking.message || errors.message ? "input-error" : ""}`}
          />
          {errors.message && (
            <p className="flex items-center gap-1 text-[11px] mt-1 text-[#ff4466]">
              <AlertCircle className="w-3 h-3 shrink-0" /> {errors.message}
            </p>
          )}
        </div>

        {/* Send button */}
        <div className="w-full xl:w-[132px] shrink-0 xl:flex xl:flex-col xl:justify-center">
          <button
            onClick={handleSubmit}
            disabled={disabled}
            className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl border-none transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
            style={{
              background: "linear-gradient(135deg,#ff7520,#ff2d6f)",
              boxShadow: "0 0 24px rgba(255,117,32,0.5)",
              color: "white",
              fontFamily: "Bebas Neue, cursive",
              fontSize: "1.15rem",
              letterSpacing: "0.1em",
              whiteSpace: "nowrap",
              cursor: disabled ? "not-allowed" : "pointer",
              opacity: disabled ? 0.4 : 1,
            }}
          >
            <Send className="w-4 h-4 shrink-0" />
            Send
          </button>
        </div>
      </div>

      <p className="text-[11px]" style={{ color: "var(--color-text-muted)" }}>
        Both <strong>offer</strong> and <strong>message</strong> are required ·{" "}
        <kbd
          className="px-1.5 py-0.5 rounded text-[10px] font-mono"
          style={{
            background: "var(--color-surface-2)",
            border: "1px solid var(--color-border)",
          }}
        >
          Enter
        </kbd>{" "}
        to send · Shift+Enter for newline
      </p>
    </div>
  );
};

export default NegotiationInput;
