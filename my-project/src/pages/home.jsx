
import React from "react";

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-purple-900 to-pink-500 flex flex-col items-center justify-center px-4">
      {/* Main content */}
      <h1
        className="text-2xl md:text-3xl font-semibold text-white mb-6"
        style={{ textShadow: "0 2px 14px rgba(0,0,0,0.45)" }}
      >
        What can I help with?
      </h1>

      {/* Input box */}
      <div className="w-full max-w-xl">
        <div className="flex items-center gap-2 rounded-2xl px-4 py-3 bg-white/10 border border-white/20 shadow-sm backdrop-blur-md focus-within:ring-2 focus-within:ring-white/30">
          <input
            type="text"
            placeholder="Ask anything"
            className="flex-1 bg-transparent outline-none text-white placeholder-white/60"
          />
        </div>

        {/* Action buttons */}
        <div className="flex flex-wrap gap-2 mt-4 justify-center">
          {["Attach", "Search", "Study", "Create image"].map((item) => (
            <button
              key={item}
              className="px-4 py-1.5 text-sm border border-white/30 rounded-full text-white/90 hover:bg-white/10 transition backdrop-blur-md"
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {/* Footer text */}
      <p className="text-xs text-white/70 mt-10 text-center max-w-md">
        By messaging ChatGPT, you agree to our Terms and have read our Privacy
        Policy.
      </p>
    </div>
  );
};

export default Home;
