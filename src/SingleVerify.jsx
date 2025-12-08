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

    // Simulated network delay
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
    <div className="min-h-screen bg-gradient-to-br from-[#fafafa] to-[#f0f9ff] p-8">
      <div className="max-w-3xl mx-auto space-y-8">

        {/* Page Header */}
        <div>
          <h1 className="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-orange-400">
            Single Email Verification
          </h1>
          <p className="text-gray-500 mt-1">
            Test your verification API in real time
          </p>
        </div>

        {/* Input Card */}
        <div className="bg-white p-6 rounded-2xl shadow border">
          <label className="font-medium text-gray-700 block mb-2">
            Enter email to verify
          </label>

          <div className="relative">
            <Search className="absolute left-4 top-3 text-gray-400" size={18} />
            <input
              type="email"
              placeholder="e.g. johndoe@gmail.com"
              className="w-full pl-12 pr-4 py-3 rounded-xl border text-gray-800"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <button
            onClick={verifyEmail}
            disabled={!email.trim() || loading}
            className="mt-4 px-6 py-3 rounded-xl bg-black text-white font-medium hover:scale-[1.02] transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {loading && <Loader2 className="animate-spin" size={18} />}
            Verify Email
          </button>
        </div>

        {/* Result Card */}
        {result && (
          <div className="bg-white rounded-2xl p-6 shadow border transition-all">
            <h3 className="text-lg font-bold mb-4">Verification Result</h3>

            <div className="space-y-3">
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
    <span className="text-gray-500">{label}</span>
    <span className="font-semibold" style={{ color: color || "#111" }}>
      {value}
    </span>
  </div>
);

export default SingleVerify;
