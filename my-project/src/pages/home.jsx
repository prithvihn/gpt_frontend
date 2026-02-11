import React, { useState } from "react";
import {
  Plus,
  ArrowUpRight,
  Paperclip,
  Search,
  BookOpen,
  Image,
} from "lucide-react";

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
    <div className="gradient-bg relative h-screen w-full overflow-hidden flex flex-col items-center justify-center">
      {/* Planet horizon (background layer) */}
      <div
        className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-[80%]
                   w-[150vw] h-[150vw] rounded-full bg-[#020617]
                   border-t border-t-white/40 shadow-[0_-40px_100px_rgba(59,130,246,0.5)] z-0"
        aria-hidden="true"
      />

      {/* Content layer */}
      <div className="relative z-10 flex flex-col items-center px-4">
        {/* Main heading */}
        <h1 className="home-title animate-fade-in-up">
          What can I help with?
        </h1>

        {/* Input container */}
        <div
          className="home-search-shell animate-fade-in-up w-full max-w-2xl"
          style={{ animationDelay: "0.15s" }}
        >
          <div
            className={`home-search-bar ${
              isFocused ? "home-search-bar--focused" : ""
            }`}
          >
            {/* Plus button (left) */}
            <button
              type="button"
              className="home-icon-button"
              aria-label="Attach"
            >
              <Plus size={18} aria-hidden="true" />
            </button>

            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              onKeyDown={handleKeyDown}
              placeholder="Ask anything"
              className="home-search-input"
            />

            {/* Send Button (arrow icon) */}
            <button
              onClick={handleSend}
              disabled={!query.trim()}
              className="home-icon-button home-icon-button--send"
              title="Send"
            >
              <ArrowUpRight size={18} aria-hidden="true" />
            </button>
          </div>

          {/* Action buttons */}
          <div
            className="home-actions animate-fade-in-up"
            style={{ animationDelay: "0.3s" }}
          >
            {actionButtons.map(({ label, icon: Icon }) => (
              <button
                key={label}
                type="button"
                className="home-action-button"
              >
                <Icon size={14} aria-hidden="true" />
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Footer */}
        <p
          className="home-privacy text-xs mt-8 text-center max-w-md animate-fade-in"
          style={{ animationDelay: "0.45s" }}
        >
          By messaging ChatGPT, you agree to our{" "}
          <button type="button" className="home-privacy-link">
            Terms
          </button>{" "}
          and have read our{" "}
          <button type="button" className="home-privacy-link">
            Privacy Policy
          </button>
          .
        </p>
      </div>
    </div>
  );
};

export default Home;
