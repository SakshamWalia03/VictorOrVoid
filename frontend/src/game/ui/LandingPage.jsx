import React, { useState } from "react";
import { Swords, ChevronRight, Zap, Shield, Target, Flame, Star } from "lucide-react";
import VictorAvatar from "./VictorAvatar.jsx";

const FEATURES = [
  {
    icon: <Swords className="w-6 h-6" />,
    title: "AI Negotiation",
    desc: "Victor is powered by real AI. Every session is different.",
    accent: "#ff7520",
    bg: "rgba(255,117,32,0.09)",
    border: "rgba(255,117,32,0.28)",
    badge: "LIVE AI",
    badgeColor: "#ff7520",
  },
  {
    icon: <Target className="w-6 h-6" />,
    title: "8 Rounds",
    desc: "You have 8 chances to negotiate the best deal possible.",
    accent: "#8282f4",
    bg: "rgba(130,130,244,0.09)",
    border: "rgba(130,130,244,0.28)",
    badge: "TIMED",
    badgeColor: "#8282f4",
  },
  {
    icon: <Star className="w-6 h-6" />,
    title: "Score & Rank",
    desc: "Every deal is scored. The lower the price, the higher you rank.",
    accent: "#00ff88",
    bg: "rgba(0,255,136,0.07)",
    border: "rgba(0,255,136,0.22)",
    badge: "GLOBAL",
    badgeColor: "#00cc6a",
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: "Real Stakes",
    desc: "Victor has a floor. Push too hard and he'll walk away.",
    accent: "#ff0099",
    bg: "rgba(255,0,153,0.07)",
    border: "rgba(255,0,153,0.22)",
    badge: "RISKY",
    badgeColor: "#ff3399",
  },
];

const LandingPage = ({ onStart, loading }) => {
  const [playerName, setPlayerName] = useState("");
  const [touched, setTouched] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!playerName.trim()) { setTouched(true); return; }
    onStart(playerName.trim());
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* ── Hero ── */}
      <section className="flex-1 flex flex-col items-center justify-center px-4 pt-28 pb-16 relative overflow-hidden">

        {/* Grid bg */}
        <div
          className="absolute inset-0 opacity-25"
          style={{
            backgroundImage: "linear-gradient(rgba(99,63,237,0.2) 1px,transparent 1px),linear-gradient(90deg,rgba(99,63,237,0.2) 1px,transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />

        {/* Orbs */}
        <div className="absolute top-1/3 -left-24 w-80 h-80 sm:w-[480px] sm:h-[480px] rounded-full blur-3xl opacity-20 animate-pulse"
          style={{ background: "radial-gradient(circle,#ff7520,transparent)", animationDuration: "4s" }} />
        <div className="absolute bottom-1/4 -right-24 w-80 h-80 sm:w-[480px] sm:h-[480px] rounded-full blur-3xl opacity-20 animate-pulse"
          style={{ background: "radial-gradient(circle,#6363ed,transparent)", animationDuration: "5s", animationDelay: "1s" }} />
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full blur-3xl opacity-12"
          style={{ background: "radial-gradient(circle,#ff0099,transparent)" }} />
        <div className="absolute bottom-0 left-1/4 w-64 h-64 rounded-full blur-3xl opacity-10"
          style={{ background: "radial-gradient(circle,#00ff88,transparent)" }} />

        <div className="relative z-10 max-w-2xl w-full mx-auto text-center space-y-8">

          {/* Victor avatar */}
          <div className="flex justify-center">
            <div style={{ animation: "float 5s ease-in-out infinite" }}>
              <VictorAvatar size="xl" />
            </div>
          </div>

          {/* Badges row */}
          <div className="flex justify-center flex-wrap gap-2">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono font-semibold"
              style={{ background: "rgba(255,117,32,0.12)", border: "1px solid rgba(255,117,32,0.4)", color: "#ff7520" }}>
              <Flame className="w-3 h-3" /> AI-POWERED
            </span>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono font-semibold"
              style={{ background: "rgba(99,99,237,0.12)", border: "1px solid rgba(99,99,237,0.4)", color: "#8282f4" }}>
              <Zap className="w-3 h-3" /> REAL-TIME
            </span>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono font-semibold"
              style={{ background: "rgba(0,255,136,0.1)", border: "1px solid rgba(0,255,136,0.35)", color: "#00cc6a" }}>
              <Star className="w-3 h-3" /> RANKED
            </span>
          </div>

          {/* Headline */}
          <div className="space-y-1">
            <h1 className="font-display leading-none">
              <span className="block text-7xl sm:text-9xl" style={{ color: "var(--color-victor)", textShadow: "0 0 60px rgba(255,117,32,0.55), 0 0 120px rgba(255,45,111,0.2)" }}>
                VICTOR
              </span>
              <span className="block text-3xl sm:text-4xl tracking-[0.4em]" style={{ color: "var(--color-text-muted)" }}>
                OR
              </span>
              <span className="block text-7xl sm:text-9xl" style={{ color: "var(--color-void)", textShadow: "0 0 60px rgba(99,99,237,0.55), 0 0 120px rgba(204,0,255,0.2)" }}>
                VOID
              </span>
            </h1>
            <p className="text-base sm:text-xl max-w-md mx-auto leading-relaxed pt-2" style={{ color: "var(--color-text-muted)", fontFamily: "Syne" }}>
              Face Victor — a cold, calculating AI broker. Negotiate a deal or lose everything. You have{' '}
              <strong style={{ color: "var(--color-victor)" }}>8 rounds.</strong>
            </p>
          </div>

          {/* Start form */}
          <form onSubmit={handleSubmit} className="space-y-4 max-w-sm mx-auto w-full">
            <div>
              <input
                type="text"
                value={playerName}
                onChange={(e) => { setPlayerName(e.target.value); setTouched(false); }}
                placeholder="Enter your name, negotiator…"
                maxLength={24}
                className="w-full px-5 py-4 rounded-2xl text-center font-semibold text-lg transition-all"
                style={{
                  background: "var(--color-surface)",
                  border: `2px solid ${touched && !playerName.trim() ? "#ff4466" : "var(--color-border)"}`,
                  color: "var(--color-text)",
                  fontFamily: "Syne",
                  boxShadow: playerName ? "0 0 20px rgba(255,117,32,0.2)" : "none",
                  outline: 'none',
                }}
                onFocus={e => { e.target.style.borderColor = 'var(--color-void)'; e.target.style.boxShadow = '0 0 0 3px rgba(99,99,237,0.15), 0 0 20px rgba(99,99,237,0.15)' }}
                onBlur={e => { e.target.style.borderColor = touched && !playerName.trim() ? '#ff4466' : 'var(--color-border)'; e.target.style.boxShadow = playerName ? '0 0 20px rgba(255,117,32,0.2)' : 'none' }}
              />
              {touched && !playerName.trim() && (
                <p className="text-sm mt-1.5 font-mono" style={{ color: '#ff4466' }}>⚡ A name is required to face Victor.</p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-victor w-full text-xl py-4 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Summoning Victor…
                </>
              ) : (
                <>
                  Face Victor
                  <ChevronRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

          <p className="text-xs font-mono" style={{ color: "var(--color-text-muted)" }}>
            No rules. No hints. Just you vs. Victor.
          </p>
        </div>
      </section>

      {/* ── Features ── */}
      <section className="px-4 pb-20">
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {FEATURES.map((f, i) => (
            <div
              key={i}
              className="relative rounded-2xl p-6 space-y-3 transition-all duration-300 hover:-translate-y-2 hover:scale-[1.02] group overflow-hidden cursor-default"
              style={{ background: f.bg, border: `1.5px solid ${f.border}` }}
            >
              {/* Corner glow */}
              <div className="absolute -top-8 -right-8 w-24 h-24 rounded-full blur-2xl opacity-30 transition-opacity duration-300 group-hover:opacity-70"
                style={{ background: f.accent }} />

              {/* Badge */}
              <div className="absolute top-3 right-3">
                <span className="text-[9px] font-mono font-bold px-2 py-0.5 rounded-full"
                  style={{ background: `${f.accent}22`, border: `1px solid ${f.accent}55`, color: f.badgeColor }}>
                  {f.badge}
                </span>
              </div>

              <div className="relative w-12 h-12 rounded-2xl flex items-center justify-center"
                style={{ background: f.bg, border: `1.5px solid ${f.border}`, color: f.accent }}>
                {f.icon}
              </div>
              <div>
                <h3 className="font-display text-xl leading-tight" style={{ color: "var(--color-text)" }}>{f.title}</h3>
                <p className="text-sm leading-relaxed mt-1" style={{ color: "var(--color-text-muted)", fontFamily: 'Syne' }}>{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-14px); }
        }
      `}</style>
    </div>
  );
};

export default LandingPage;
