import React, { useEffect, useState } from "react";
import {
  Shield,
  TrendingUp,
  Users,
  DollarSign,
  CheckCircle,
  ArrowRight,
  Activity
} from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip as RechartTooltip,
  Legend
} from "recharts";

export default function EmailValidatorHeroV2() {
  const [stats, setStats] = useState({
    genuine: 78.5,
    temporary: 12.3,
    suspicious: 9.2,
    revenue: 24680,
    users: 15420
  });

  const screens = ["Overview", "Distribution", "Activity", "History"];
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(
      () => setActive((s) => (s + 1) % screens.length),
      4000
    );
    return () => clearInterval(id);
  }, []);

  const pieData = [
    { name: "Genuine", value: stats.genuine },
    { name: "Temporary", value: stats.temporary },
    { name: "Suspicious", value: stats.suspicious }
  ];

  const PALETTE = ["#75B7FF", "#D5A8FF", "#FF9BAD", "#FFD1A3", "#75B7FF"];
  const COLORS = [PALETTE[2], PALETTE[3], PALETTE[4]];

  const MiniSpark = ({ points = [5, 10, 8, 12, 9] }) => (
    <svg className="w-full h-8" viewBox="0 0 100 20" preserveAspectRatio="none">
      <polyline
        fill="none"
        stroke="#10b981"
        strokeWidth="2"
        points={points
          .map((p, i) => `${(i / (points.length - 1)) * 100},${20 - p}`)
          .join(" ")}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  const styles = `
    @import url('https://fonts.cdnfonts.com/css/aeonik');
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
    * { font-family: 'Aeonik', 'Inter', sans-serif; }

    @keyframes gradient-rotate {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }
    @keyframes slideIn {
      from { opacity: 0; transform: translateY(6px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `;

  return (
    <>
      <style>{styles}</style>

      <div className="min-h-95vh py-16 relative overflow-hidden">
        <video
          src="/grid.webm"
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        ></video>

        <div className="max-w-10xl mx-auto px-10 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* LEFT PANEL */}
            <div className="space-y-6">
              <div className="space-y-2">
                <h1
                  className="inline-block text-5xl lg:text-6xl font-extrabold leading-tight bg-clip-text text-transparent"
                  style={{
                    backgroundImage:
                      "linear-gradient(90deg, #0A84FF, #B45CFF, #FF2D55, #FF9500)"
                  }}
                >
                  Say No To Temporary Email
                </h1>

                <p className="text-3xl font-semibold" style={{ color: "#6e6e73" }}>
                  Fast, accurate and production-ready
                </p>
              </div>

              <p className="text-base leading-relaxed" style={{ color: "#6e6e73" }}>
                Protect deliverability by removing invalid, disposable and risky
                addresses. Save money and keep your sender reputation healthy.
              </p>

              <div className="flex gap-4 flex-wrap">
                <button className="flex items-center gap-2 px-6 py-3 bg-[#1c1b1b] text-white rounded-3xl font-semibold shadow-lg hover:scale-[1.02] transition">
                  Start Validating <ArrowRight />
                </button>

                <button className="px-6 py-3 bg-white border border-slate-200 rounded-3xl shadow-sm font-medium hover:border-black-800">
                  View demo
                </button>
              </div>
            </div>

            {/* RIGHT PANEL */}
            <div className="relative">
              <div className="mx-auto" style={{ maxWidth: 680 }}>
                <div
                  className="rounded-2xl p-3 shadow-2xl"
                  style={{
                    background:
                      "linear-gradient(90deg, #75B7FF, #D5A8FF, #FF9BAD, #FFD1A3, #75B7FF)",
                    backgroundSize: "200% 200%",
                    animation: "gradient-rotate 9s ease infinite"
                  }}
                >
                  <div className="bg-white rounded-xl overflow-hidden border border-slate-200">
                    {/* Browser Bar */}
                    <div className="bg-gradient-to-r from-slate-100 to-slate-50 px-4 py-3 flex items-center gap-3 border-b border-slate-200">
                      <div className="flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-rose-400"></div>
                        <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                        <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
                      </div>

                      <div className="flex-1 bg-white rounded-lg px-3 py-1 text-xs text-slate-500 mx-4 border border-slate-200">
                        validator.app/dashboard
                      </div>

                      {/* Screen Tabs */}
                      <div className="relative bg-slate-200 rounded-full p-1">
                        <div
                          className="absolute bg-[#1c1b1b] rounded-full transition-all duration-300 ease-out shadow-lg"
                          style={{
                            width: `calc(${100 / screens.length}% - 0.5rem)`,
                            height: "calc(100% - 0.5rem)",
                            left: `calc(${active * (100 / screens.length)}% + 0.25rem)`,
                            top: "0.25rem"
                          }}
                        />
                        <div className="relative z-10 grid grid-cols-4">
                          {screens.map((s, i) => (
                            <button
                              key={s}
                              onClick={() => setActive(i)}
                              className={`cursor-pointer text-xs px-3 py-1.5 rounded-full font-medium transition ${
                                i === active
                                  ? "text-white"
                                  : "text-slate-600 hover:text-slate-900"
                              }`}
                            >
                              {s}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* SCREEN CONTENT */}
                    <div className="p-6 min-h-[420px] bg-gradient-to-br from-slate-50 to-emerald-50">
                      {/* Overview */}
                      {active === 0 && (
                        <div>
                          <h3 className="text-xl font-bold mb-1">Overview</h3>
                          <p className="text-sm mb-4 text-slate-600">
                            Quick snapshot of validation performance
                          </p>

                          <div className="grid grid-cols-3 gap-3 mb-4">
                            {/* Left Block */}
                            <div className="col-span-2 rounded-xl p-4 shadow-md bg-white/90 border border-slate-200/20">
                              <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center gap-3">
                                  <Activity className="w-5 h-5" style={{ color: PALETTE[0] }} />
                                  <div>
                                    <p className="text-xs text-slate-600">Checks (24h)</p>
                                    <p className="font-semibold">24,120</p>
                                  </div>
                                </div>
                                <div style={{ width: 120 }}>
                                  <MiniSpark />
                                </div>
                              </div>

                              <div className="grid grid-cols-3 gap-3">
                                <div
                                  className="p-3 rounded-lg"
                                  style={{
                                    background: `${PALETTE[2]}18`,
                                    border: `1px solid ${PALETTE[2]}33`
                                  }}
                                >
                                  <p className="text-xs text-slate-600">Deliverable</p>
                                  <p className="font-bold" style={{ color: PALETTE[2] }}>
                                    {stats.genuine}%
                                  </p>
                                </div>
                                <div
                                  className="p-3 rounded-lg"
                                  style={{
                                    background: `${PALETTE[3]}18`,
                                    border: `1px solid ${PALETTE[3]}33`
                                  }}
                                >
                                  <p className="text-xs text-slate-600">Disposable</p>
                                  <p className="font-bold" style={{ color: PALETTE[3] }}>
                                    {stats.temporary}%
                                  </p>
                                </div>
                                <div
                                  className="p-3 rounded-lg"
                                  style={{
                                    background: `${PALETTE[4]}18`,
                                    border: `1px solid ${PALETTE[4]}33`
                                  }}
                                >
                                  <p className="text-xs text-slate-600">Risk</p>
                                  <p className="font-bold" style={{ color: PALETTE[4] }}>
                                    {stats.suspicious}%
                                  </p>
                                </div>
                              </div>
                            </div>

                            {/* Accuracy Card */}
                            <div
                              className="rounded-xl p-4 shadow-md text-white"
                              style={{
                                background: `linear-gradient(135deg, ${PALETTE[0]}, ${PALETTE[1]})`
                              }}
                            >
                              <h4 className="text-xs opacity-90">Accuracy</h4>
                              <p className="text-2xl font-bold mt-1">99.9%</p>
                              <p className="text-xs opacity-80 mt-2">
                                Confidence band estimated from historical results
                              </p>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Distribution */}
                      {active === 1 && (
                        <div>
                          <h3 className="text-xl font-bold mb-1">Distribution</h3>
                          <p className="text-sm mb-4 text-slate-600">
                            Views by type — interactive pie and legend
                          </p>

                          <div className="grid grid-cols-2 gap-4">
                            <div className="p-4 rounded-xl shadow-md bg-white/95 border border-slate-200/20">
                              <div style={{ height: 240 }}>
                                <ResponsiveContainer width="100%" height="100%">
                                  <PieChart>
                                    <Pie
                                      data={pieData}
                                      dataKey="value"
                                      nameKey="name"
                                      innerRadius={48}
                                      outerRadius={80}
                                      paddingAngle={2}
                                    >
                                      {pieData.map((entry, index) => (
                                        <Cell
                                          key={`cell-${index}`}
                                          fill={COLORS[index % COLORS.length]}
                                        />
                                      ))}
                                    </Pie>
                                    <RechartTooltip formatter={(value) => `${value}%`} />
                                    <Legend verticalAlign="bottom" />
                                  </PieChart>
                                </ResponsiveContainer>
                              </div>
                            </div>

                            <div className="p-4 rounded-xl shadow-md bg-white/95 border border-slate-200/20">
                              <h4 className="text-sm font-semibold">Breakdown</h4>
                              <ul className="mt-3 space-y-2 text-sm text-slate-600">
                                <li className="flex items-center justify-between">
                                  <span className="flex items-center gap-2">
                                    <span
                                      className="w-2 h-2 rounded-full"
                                      style={{ background: COLORS[0] }}
                                    ></span>
                                    Genuine
                                  </span>
                                  <strong className="text-slate-900">{stats.genuine}%</strong>
                                </li>

                                <li className="flex items-center justify-between">
                                  <span className="flex items-center gap-2">
                                    <span
                                      className="w-2 h-2 rounded-full"
                                      style={{ background: COLORS[1] }}
                                    ></span>
                                    Temporary
                                  </span>
                                  <strong className="text-slate-900">{stats.temporary}%</strong>
                                </li>

                                <li className="flex items-center justify-between">
                                  <span className="flex items-center gap-2">
                                    <span
                                      className="w-2 h-2 rounded-full"
                                      style={{ background: COLORS[2] }}
                                    ></span>
                                    Suspicious
                                  </span>
                                  <strong className="text-slate-900">{stats.suspicious}%</strong>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Activity */}
                      {active === 2 && (
                        <div>
                          <h3 className="text-xl font-bold mb-1">Activity</h3>
                          <p className="text-sm mb-4 text-slate-600">
                            Recent validation events and trends
                          </p>

                          <div className="space-y-3">
                            {[1, 2, 3].map((i) => (
                              <div
                                key={i}
                                className="rounded-lg p-3 flex items-start gap-3 opacity-0 animate-slideIn shadow-sm"
                                style={{
                                  background: "rgba(255,255,255,0.95)",
                                  border: "1px solid rgba(31,30,30,0.06)",
                                  animation: `slideIn 0.4s ease-out ${(i - 1) * 0.2}s forwards`
                                }}
                              >
                                <div
                                  className="p-2 rounded-lg"
                                  style={{ background: `${PALETTE[0]}22` }}
                                >
                                  <TrendingUp
                                    className="w-5 h-5"
                                    style={{ color: PALETTE[0] }}
                                  />
                                </div>

                                <div className="flex-1">
                                  <div className="flex justify-between items-center">
                                    <p className="text-sm font-medium">Bulk check completed</p>
                                    <p className="text-xs text-slate-600">2 hours ago</p>
                                  </div>
                                  <p className="text-sm text-slate-600">
                                    12,320 addresses processed · 86% deliverable
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* History */}
                      {active === 3 && (
                        <div>
                          <h3 className="text-xl font-bold mb-1">History</h3>
                          <p className="text-sm mb-4 text-slate-600">
                            Exports, reports and audit trail
                          </p>

                          <div className="grid grid-cols-1 gap-3">
                            {[
                              { title: "Weekly export", date: "Nov 2, 2025 • CSV", action: "Download" },
                              {
                                title: "Audit: list-429",
                                date: "Oct 29, 2025 • JSON",
                                action: "View"
                              }
                            ].map((item, idx) => (
                              <div
                                key={idx}
                                className="rounded-lg p-3 shadow-sm opacity-0"
                                style={{
                                  background: "rgba(255,255,255,0.95)",
                                  border: "1px solid rgba(31,30,30,0.06)",
                                  animation: `slideIn 0.4s ease-out ${idx * 0.2}s forwards`
                                }}
                              >
                                <div className="flex justify-between items-center">
                                  <div>
                                    <p className="text-sm font-medium">{item.title}</p>
                                    <p className="text-xs text-slate-600">{item.date}</p>
                                  </div>
                                  <button className="px-3 py-2 rounded-lg text-sm bg-white border border-slate-200">
                                    {item.action}
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Laptop Base */}
                <div className="bg-slate-300 h-4 rounded-b-2xl shadow-lg mt-2"></div>
                <div
                  className="bg-slate-400 h-2 rounded-b-3xl mx-auto"
                  style={{ width: "70%" }}
                ></div>

                {/* Floating Badges */}
                <div className="absolute -top-6 -right-6 bg-white rounded-2xl shadow-xl p-3 border border-emerald-100">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-6 h-6 text-emerald-600" />
                    <div>
                      <p className="text-xs text-slate-600">Growth</p>
                      <p className="text-sm font-bold">+156%</p>
                    </div>
                  </div>
                </div>

                <div className="absolute -bottom-10 -left-6 bg-white rounded-2xl shadow-xl px-4 py-2 border border-teal-100">
                  <p className="text-xs text-slate-600">Accuracy Rate</p>
                  <p className="text-lg font-bold text-teal-600">99.9%</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
