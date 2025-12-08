import React, { useEffect, useState } from "react";
import {
  Shield,
  TrendingUp,
  Users,
  DollarSign,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Activity,
  PieChart as PieIcon
} from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip as RechartTooltip,
  Legend
} from "recharts";

  // Enhanced hero with multiple "screens" inside the laptop mockup, small pie charts,
// additional stat cards and improved visual polish.
export default function EmailValidatorHeroV2() {
  const [stats, setStats] = useState({
    genuine: 78.5,
    temporary: 12.3,
    suspicious: 9.2,
    revenue: 24680,
    users: 15420
  });

  // different screens to cycle through in the laptop mockup
  const screens = [
    "overview",
    "distribution",
    "activity",
    "history"
  ];

  const [active, setActive] = useState(0);

  // auto-rotate screens every 4s (can be disabled by user interaction)
  useEffect(() => {
    const id = setInterval(() => setActive((s) => (s + 1) % screens.length), 4000);
    return () => clearInterval(id);
  }, []);

  // pie chart data for distribution screen
  const pieData = [
    { name: "Genuine", value: stats.genuine },
    { name: "Temporary", value: stats.temporary },
    { name: "Suspicious", value: stats.suspicious }
  ];

  const COLORS = ["#10B981", "#F97316", "#EF4444"]; // green, orange, red

  const StatCard = ({ icon: Icon, label, value, color, prefix = "", suffix = "" }) => (
    <div className="bg-white/85 backdrop-blur-sm rounded-2xl p-4 shadow-md border border-gray-100 hover:shadow-lg transition transform hover:-translate-y-0.5">
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-xl ${color} flex items-center justify-center`}>
          <Icon className="w-5 h-5 text-white" />
        </div>
        <div className="flex-1">
          <p className="text-xs text-gray-500 font-medium">{label}</p>
          <p className="text-lg font-semibold text-gray-800">{prefix}{typeof value === 'number' ? value.toLocaleString() : value}{suffix}</p>
        </div>
      </div>
    </div>
  );

  // small sparkline-like placeholder (kept simple to avoid extra deps)
  const MiniSpark = ({ points = [5, 10, 8, 12, 9] }) => (
    <svg className="w-full h-8" viewBox="0 0 100 20" preserveAspectRatio="none">
      <polyline
        fill="none"
        stroke="#7c3aed"
        strokeWidth="1.5"
        points={points.map((p, i) => `${(i / (points.length - 1)) * 100},${20 - p}`).join(" ")}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
const styles = `
  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;
  return (
    <>
     <style>{styles}</style>
    <div className="min-h-screen  py-16">
      <div className="max-w-10xl mx-auto px-10 bg-[radial-gradient(154.86%_76.83%_at_50%_22.26%\,_rgba(247,247,248,0.4)_8.98%\,_#F7F7F8_45.99%)] bg-cover bg-center">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left: copy and actions */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-3 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full border border-indigo-100 shadow-sm">
              <Shield className="w-4 h-4 text-indigo-600" />
              <span className="text-sm font-semibold text-indigo-700">Trusted by 10,000+ teams</span>
            </div>

            <div className="space-y-2">
              <h1 className="text-4xl lg:text-5xl font-extrabold text-slate-900 leading-tight">Email Validation</h1>
              <p className="text-xl text-slate-700 font-semibold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">Fast, accurate and production-ready</p>
            </div>

            <p className="text-base text-slate-700 leading-relaxed">Protect deliverability by removing invalid, disposable and risky addresses. Save money on sending and keep your sender reputation healthy. Our analysis runs in bulk and returns detailed insights for every list.</p>

            <div className="flex gap-4 flex-wrap">
              <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-3xl font-semibold shadow-lg hover:scale-[1.02] transition">Start Validating <CheckCircle className="w-4 h-4" /></button>
              <button className="px-6 py-3 bg-white/90 border border-gray-200 rounded-3xl shadow-sm font-medium">View demo</button>
            </div>

            <div className="flex items-center gap-6 pt-4">
              <div className="flex -space-x-2">
                {[1,2,3,4].map(i => <div key={i} className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-400 to-purple-400 border-2 border-white"></div>)}
              </div>
              <div>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg>
                  ))}
                </div>
                <p className="text-sm text-gray-600 mt-1">4.9/5 from 2,000+ reviews</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mt-6">
              <StatCard icon={DollarSign} label="Revenue Saved" value={stats.revenue} color="bg-gradient-to-br from-green-500 to-emerald-600" prefix="$" />
              <StatCard icon={Users} label="Active Users" value={stats.users} color="bg-gradient-to-br from-blue-500 to-indigo-600" />
            </div>

            <div className="mt-6 flex items-center gap-3">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <div className="text-sm text-gray-500">Live updating</div>
            </div>
          </div>

          {/* Right: laptop mockup with multiple screens */}
          <div className="relative">
            <div className="mx-auto" style={{ maxWidth: 680 }}>
              <div className="bg-gradient-to-r from-slate-900 to-slate-700 rounded-3xl p-3 shadow-2xl">
                <div className="bg-white rounded-lg overflow-hidden">

                  {/* Browser bar */}
                  <div className="bg-gray-100 px-4 py-3 flex items-center gap-3 border-b border-gray-200">
                    <div className="flex gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-400"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                      <div className="w-3 h-3 rounded-full bg-green-400"></div>
                    </div>
                    <div className="flex-1 bg-white rounded px-3 py-1 text-xs text-gray-500 mx-4">validator.app/dashboard</div>

                    {/* screen controls */}
            <div className="relative bg-gray-100 rounded-full p-1">
  <div 
    className="absolute bg-[#1c1b1b]
 rounded-full transition-all duration-300 ease-out shadow-lg"
    style={{
      width: `calc(${100 / screens.length}% - 0.5rem)`,
      height: 'calc(100% - 0.5rem)',
      left: `calc(${active * (100 / screens.length)}% + 0.25rem)`,
      top: '0.25rem'
    }}
  />
  <div className="relative z-10 grid grid-cols-4">
    {screens.map((s, i) => (
      <button
        key={s}
        onClick={() => setActive(i)}
        className={`cursor-pointer text-xs px-3 py-1.5 rounded-full font-medium transition-colors duration-300 text-center ${
          i === active ? 'text-white' : 'text-gray-600 hover:text-gray-900'
        }`}
      >
        {s}
      </button>
    ))}
  </div>
</div>
                  </div>

                  {/* Screen area */}
                  <div className="p-6 bg-gradient-to-br from-gray-50 to-blue-50 min-h-[420px]">
                    {active === 0 && (
                      <div>
                        <h3 className="text-xl font-bold text-gray-800 mb-1">Overview</h3>
                        <p className="text-sm text-gray-500 mb-4">Quick snapshot of validation performance</p>

                        <div className="grid grid-cols-3 gap-3 mb-4">
                          <div className="col-span-2 bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                            <div className="flex items-center justify-between mb-3">
                              <div className="flex items-center gap-3">
                                <Activity className="w-5 h-5 text-indigo-600" />
                                <div>
                                  <p className="text-xs text-gray-500">Checks (24h)</p>
                                  <p className="font-semibold text-gray-800">24,120</p>
                                </div>
                              </div>
                              <div style={{ width: 120 }}>
                                <MiniSpark />
                              </div>
                            </div>

                            <div className="grid grid-cols-3 gap-3">
                              <div className="bg-white/80 p-3 rounded-lg border border-gray-100">
                                <p className="text-xs text-gray-500">Deliverable</p>
                                <p className="font-bold text-gray-800">{stats.genuine}%</p>
                              </div>
                              <div className="bg-white/80 p-3 rounded-lg border border-gray-100">
                                <p className="text-xs text-gray-500">Disposable</p>
                                <p className="font-bold text-gray-800">{stats.temporary}%</p>
                              </div>
                              <div className="bg-white/80 p-3 rounded-lg border border-gray-100">
                                <p className="text-xs text-gray-500">Risk</p>
                                <p className="font-bold text-gray-800">{stats.suspicious}%</p>
                              </div>
                            </div>

                          </div>

                          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                            <h4 className="text-xs text-gray-500">Accuracy</h4>
                            <p className="text-2xl font-bold text-purple-600 mt-1">99.9%</p>
                            <p className="text-xs text-gray-500 mt-2">Confidence band estimated from historical results</p>
                          </div>
                        </div>
                      </div>
                    )}

                    {active === 1 && (
                      <div>
                        <h3 className="text-xl font-bold text-gray-800 mb-1">Distribution</h3>
                        <p className="text-sm text-gray-500 mb-4">Views by type — interactive pie and legend</p>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                            <div style={{ height: 240 }}>
                              <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                  <Pie data={pieData} dataKey="value" nameKey="name" innerRadius={48} outerRadius={80} paddingAngle={2}>
                                    {pieData.map((entry, index) => (
                                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                  </Pie>
                                  <RechartTooltip formatter={(value) => `${value}%`} />
                                  <Legend verticalAlign="bottom" />
                                </PieChart>
                              </ResponsiveContainer>
                            </div>
                          </div>

                          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                            <h4 className="text-sm font-semibold text-gray-700">Breakdown</h4>
                            <ul className="mt-3 space-y-2 text-sm text-gray-700">
                              <li className="flex items-center justify-between"><span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full" style={{ background: COLORS[0] }}></span> Genuine</span><strong>{stats.genuine}%</strong></li>
                              <li className="flex items-center justify-between"><span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full" style={{ background: COLORS[1] }}></span> Temporary</span><strong>{stats.temporary}%</strong></li>
                              <li className="flex items-center justify-between"><span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full" style={{ background: COLORS[2] }}></span> Suspicious</span><strong>{stats.suspicious}%</strong></li>
                            </ul>

                            <div className="mt-4 text-xs text-gray-500">Tip: export this view as a PNG for reporting.</div>
                          </div>
                        </div>
                      </div>
                    )}

                   {active === 2 && (
  <div>
    <h3 className="text-xl font-bold text-gray-800 mb-1">Activity</h3>
    <p className="text-sm text-gray-500 mb-4">Recent validation events and trends</p>

    <div className="space-y-3">
      {[1,2,3].map((i) => (
        <div 
          key={i} 
          className="bg-white rounded-lg p-3 border border-gray-100 flex items-start gap-3 opacity-0 animate-slideIn"
          style={{
            animation: `slideIn 0.4s ease-out ${(i - 1) * 0.2}s forwards`
          }}
        >
          <div className="p-2 rounded-lg bg-indigo-50">
            <TrendingUp className="w-5 h-5 text-green-500" />
          </div>
          <div className="flex-1">
            <div className="flex justify-between items-center">
              <p className="text-sm font-medium text-gray-800">Bulk check completed</p>
              <p className="text-xs text-gray-500">2 hours ago</p>
            </div>
            <p className="text-sm text-gray-600">12,320 addresses processed · 86% deliverable</p>
          </div>
        </div>
      ))}
    </div>
  </div>
)}

{active === 3 && (
  <div>
    <h3 className="text-xl font-bold text-gray-800 mb-1">History</h3>
    <p className="text-sm text-gray-500 mb-4">Exports, reports and audit trail</p>

    <div className="grid grid-cols-1 gap-3">
      {[
        { title: "Weekly export", date: "Nov 2, 2025 · CSV", action: "Download" },
        { title: "Audit: list-429", date: "Oct 29, 2025 · JSON", action: "View" }
      ].map((item, i) => (
        <div 
          key={i} 
          className="bg-white rounded-lg p-3 border border-gray-100 opacity-0"
          style={{
            animation: `slideIn 0.4s ease-out ${i * 0.2}s forwards`
          }}
        >
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm font-medium">{item.title}</p>
              <p className="text-xs text-gray-500">{item.date}</p>
            </div>
            <button className="px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm hover:bg-gray-50 transition-colors">
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

              {/* laptop base */}
              <div className="bg-gray-300 h-4 rounded-b-2xl shadow-lg mt-2"></div>
              <div className="bg-gray-400 h-2 rounded-b-3xl mx-auto" style={{ width: '70%' }}></div>

              {/* floating badges */}
              <div className="absolute -top-6 -right-6 bg-white rounded-2xl shadow-xl p-3 border border-indigo-100">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-6 h-6 text-green-500" />
                  <div>
                    <p className="text-xs text-gray-500">Growth</p>
                    <p className="text-sm font-bold text-gray-800">+156%</p>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-10 -left-6 bg-white rounded-2xl shadow-xl px-4 py-2 border border-purple-100">
                <p className="text-xs text-gray-500">Accuracy Rate</p>
                <p className="text-lg font-bold text-purple-600">99.9%</p>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
