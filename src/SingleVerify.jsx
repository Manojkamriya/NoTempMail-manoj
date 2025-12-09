import React, { useState } from "react";
import { Search, Loader2 } from "lucide-react";

const SingleVerify = () => {
  const [email, setEmail] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  // Mock API verification function
  const verifyEmail = async () => {
    if (!email.trim()) return;

    setLoading(true);
    setResult(null);

    setTimeout(() => {
      const mock = {
        email,
        status: Math.random() > 0.5 ? "valid" : "invalid",
        score: Math.floor(Math.random() * 100),
        provider: "gmail.com",
        domainRisk: Math.random() > 0.5 ? "low" : "high",
      };

      setResult(mock);
      setLoading(false);
    }, 1500);
  };

  const getStatusColor = (status) =>
    status === "valid" ? "#10b981" : "#ef4444";

  return (
    <div
      className="min-h-screen p-8"
      style={{
        background:
          "linear-gradient(135deg, #f5f7ff 0%, #eef7ff 40%, #fdf7ff 100%)",
      }}
    >
      <div className="max-w-3xl mx-auto space-y-10">

        {/* Page Header */}
        <div className="text-center">
          <h1
            className="text-4xl font-extrabold bg-clip-text text-transparent"
            style={{
              backgroundImage:
                "linear-gradient(90deg, #0A84FF, #B45CFF, #FF2D55, #FF9500)",
            }}
          >
            Single Email Verification
          </h1>
          <p className="text-gray-600 mt-2 text-base">
            Test your verification API in real time with instant feedback
          </p>
        </div>

        {/* Input Card */}
        <div
          className="p-8 rounded-3xl shadow-xl border backdrop-blur-md"
          style={{
            background: "rgba(255,255,255,0.65)",
            borderColor: "rgba(0,0,0,0.06)",
          }}
        >
          <label className="font-semibold text-gray-800 block mb-3 text-lg">
            Enter email to verify
          </label>

          <div className="relative">
            <Search
              className="absolute left-4 top-3.5 text-gray-400"
              size={20}
            />
            <input
              type="email"
              placeholder="e.g. johndoe@gmail.com"
              className="w-full pl-12 pr-4 py-3.5 rounded-2xl border bg-white/70 text-gray-900 shadow-sm focus:ring-2 focus:ring-blue-400 transition-all"
              style={{ borderColor: "rgba(0,0,0,0.1)" }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <button
            onClick={verifyEmail}
            disabled={!email.trim() || loading}
            className="mt-5 px-6 py-3.5 rounded-2xl bg-black text-white font-semibold text-sm flex items-center gap-2 transition-all hover:scale-[1.03] disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
          >
            {loading && <Loader2 className="animate-spin" size={20} />}
            Verify Email
          </button>
        </div>

        {/* Result Card */}
        {result && (
          <div
            className="p-8 rounded-3xl shadow-xl border animate-fadeIn"
            style={{
              background: "white",
              borderColor: "rgba(0,0,0,0.06)",
            }}
          >
            <h3 className="text-xl font-bold mb-5 text-gray-900">
              Verification Result
            </h3>

            <div className="space-y-4">
              <InfoRow label="Email" value={result.email} />
              <InfoRow
                label="Status"
                value={result.status}
                color={getStatusColor(result.status)}
              />
              <InfoRow label="Score" value={`${result.score}/100`} />
              <InfoRow label="Provider" value={result.provider} />
              <InfoRow label="Domain Risk" value={result.domainRisk} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const InfoRow = ({ label, value, color }) => (
  <div className="flex justify-between items-center py-1">
    <span className="text-gray-500 text-sm">{label}</span>
    <span
      className="font-semibold text-base"
      style={{ color: color || "#1c1b1b" }}
    >
      {value}
    </span>
  </div>
);

export default SingleVerify;
