import React, { useState } from "react";
import { Rocket, Paperclip, Search, BookOpen, Image } from "lucide-react";

const Home = () => {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleSend = () => {
    if (query.trim()) {
      console.log("Sending query:", query);
      // Future: send to chatbot API
      setQuery("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  const actionButtons = [
    { label: "Attach", icon: Paperclip },
    { label: "Search", icon: Search },
    { label: "Study", icon: BookOpen },
    { label: "Create image", icon: Image },
  ];

  return (
    <div className="gradient-bg flex flex-col items-center justify-center px-4"
      style={{ minHeight: 'calc(100vh - 52px)' }}
    >
      {/* Main heading */}
      <h1
        className="text-3xl md:text-4xl font-bold text-white mb-8 animate-fade-in-up"
        style={{
          textShadow: "0 2px 20px rgba(168, 85, 247, 0.3)",
          letterSpacing: "-0.02em",
        }}
      >
        What can I help with?
      </h1>

      {/* Input container */}
      <div className="w-full max-w-2xl animate-fade-in-up" style={{ animationDelay: "0.15s" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            borderRadius: "1rem",
            padding: "0.5rem 0.5rem 0.5rem 1.25rem",
            background: isFocused
              ? "rgba(255, 255, 255, 0.12)"
              : "rgba(255, 255, 255, 0.08)",
            border: isFocused
              ? "1.5px solid rgba(168, 85, 247, 0.5)"
              : "1.5px solid rgba(255, 255, 255, 0.15)",
            backdropFilter: "blur(16px)",
            transition: "all 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
            transform: isFocused ? "scale(1.015)" : "scale(1)",
            boxShadow: isFocused
              ? "0 0 30px rgba(168, 85, 247, 0.2), 0 8px 32px rgba(0,0,0,0.2)"
              : "0 4px 16px rgba(0,0,0,0.15)",
          }}
        >
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onKeyDown={handleKeyDown}
            placeholder="Ask anything"
            style={{
              flex: 1,
              background: "transparent",
              outline: "none",
              color: "white",
              fontSize: "1rem",
              border: "none",
            }}
            className="placeholder-white/50"
          />

          {/* Send (Rocket) Button */}
          <button
            onClick={handleSend}
            disabled={!query.trim()}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "2.5rem",
              height: "2.5rem",
              borderRadius: "0.75rem",
              border: "none",
              cursor: query.trim() ? "pointer" : "default",
              background: query.trim()
                ? "linear-gradient(135deg, #a855f7, #ec4899)"
                : "rgba(255, 255, 255, 0.1)",
              color: query.trim() ? "white" : "rgba(255, 255, 255, 0.3)",
              transition: "all 0.3s ease",
              transform: query.trim() ? "scale(1)" : "scale(0.95)",
              boxShadow: query.trim()
                ? "0 4px 15px rgba(168, 85, 247, 0.4)"
                : "none",
              flexShrink: 0,
            }}
            onMouseEnter={(e) => {
              if (query.trim()) {
                e.currentTarget.style.transform = "scale(1.08)";
                e.currentTarget.style.boxShadow = "0 6px 20px rgba(168, 85, 247, 0.5)";
              }
            }}
            onMouseLeave={(e) => {
              if (query.trim()) {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow = "0 4px 15px rgba(168, 85, 247, 0.4)";
              }
            }}
            title="Send"
          >
            <Rocket size={18} style={{
              transform: "rotate(45deg)",
              transition: "transform 0.3s ease",
            }} />
          </button>
        </div>

        {/* Action buttons */}
        <div className="flex flex-wrap gap-2 mt-4 justify-center animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
          {actionButtons.map(({ label, icon: Icon }) => (
            <button
              key={label}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.35rem",
                padding: "0.45rem 1rem",
                fontSize: "0.8rem",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                borderRadius: "9999px",
                color: "rgba(255, 255, 255, 0.85)",
                background: "rgba(255, 255, 255, 0.05)",
                cursor: "pointer",
                backdropFilter: "blur(8px)",
                transition: "all 0.25s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(255, 255, 255, 0.12)";
                e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.35)";
                e.currentTarget.style.transform = "translateY(-1px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(255, 255, 255, 0.05)";
                e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.2)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <Icon size={14} />
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Footer */}
      <p
        className="text-xs text-white/50 mt-12 text-center max-w-md animate-fade-in"
        style={{ animationDelay: "0.45s" }}
      >
        By messaging ChatGPT, you agree to our{" "}
        <span className="underline cursor-pointer hover:text-white/70">Terms</span> and have read our{" "}
        <span className="underline cursor-pointer hover:text-white/70">Privacy Policy</span>.
      </p>
    </div>
  );
};

export default Home;
