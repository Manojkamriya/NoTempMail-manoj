import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Activity, TrendingUp, Users, Clock } from 'lucide-react';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip as RechartTooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis
} from 'recharts';

// Shared small helpers
const formatNumber = (v) => v.toLocaleString();
const softShadow = 'shadow-lg';
const COLORS = ['#7C3AED', '#06B6D4', '#F59E0B'];
// ===== 1) GlassmorphicDashboard (soft gradients, subtle blur) =====
 function GlassmorphicDashboard() {
  const [counts, setCounts] = useState({ checks: 0, processed: 0 });
  useEffect(() => {
    let t = 0;
    const target = { checks: 24120, processed: 9500 };
    const id = setInterval(() => {
      t += 1;
      setCounts({
        checks: Math.min(target.checks, Math.floor((target.checks * t) / 45)),
        processed: Math.min(target.processed, Math.floor((target.processed * t) / 45))
      });
      if (t >= 45) clearInterval(id);
    }, 20);
    return () => clearInterval(id);
  }, []);

  const screens = ['Overview', 'Distribution', 'Activity', 'History'];
  const pieData = [
    { name: 'Genuine', value: 72 },
    { name: 'Temporary', value: 22 },
    { name: 'Suspicious', value: 6 }
  ];

  return (
    <section className="w-full max-w-6xl mx-auto">
      <h2 className="text-2xl font-semibold text-slate-800 mb-4">Glassmorphic Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {screens.map((screen, i) => (
          <div
            key={i}
            className={`relative rounded-3xl bg-white/40 backdrop-blur-md border border-white/30 overflow-hidden p-4 ${softShadow}`}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="flex gap-2">
                  <span className="w-3 h-3 rounded-full bg-rose-400/90" />
                  <span className="w-3 h-3 rounded-full bg-amber-400/90" />
                  <span className="w-3 h-3 rounded-full bg-emerald-400/90" />
                </div>
                <div className="text-xs text-slate-700 font-medium">validator.app/{screen.toLowerCase()}</div>
              </div>
              <div className="text-right">
                <p className="text-xs text-slate-600">Growth</p>
                <p className="text-sm font-bold text-slate-900">+{110 + i * 4}%</p>
              </div>
            </div>

            <div className="p-3 min-h-[320px]">
              {i === 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-slate-800 mb-1">Overview</h3>
                  <p className="text-sm text-slate-600 mb-4">Soft glass cards with animated counters and subtle elevation.</p>

                  <div className="grid grid-cols-3 gap-3 mb-3">
                    <div className="col-span-2 bg-white/60 rounded-xl p-4 border border-white/30">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Activity className="w-5 h-5 text-indigo-700" />
                          <div>
                            <p className="text-xs text-slate-600">Checks (24h)</p>
                            <p className="font-semibold text-slate-900">{formatNumber(counts.checks)}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-slate-600">Processed</p>
                          <p className="font-semibold text-slate-900">{formatNumber(counts.processed)}</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-3 mt-4">
                        <div className="bg-white/70 p-3 rounded-lg border border-white/20 text-center">
                          <p className="text-xs text-slate-600">Deliverable</p>
                          <p className="font-bold text-slate-900">72%</p>
                        </div>
                        <div className="bg-white/70 p-3 rounded-lg border border-white/20 text-center">
                          <p className="text-xs text-slate-600">Disposable</p>
                          <p className="font-bold text-slate-900">22%</p>
                        </div>
                        <div className="bg-white/70 p-3 rounded-lg border border-white/20 text-center">
                          <p className="text-xs text-slate-600">Risk</p>
                          <p className="font-bold text-slate-900">6%</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white/60 rounded-xl p-4 border border-white/30 text-center">
                      <h4 className="text-xs text-slate-600">Accuracy</h4>
                      <p className="text-2xl font-bold text-purple-700 mt-1">99.9%</p>
                      <p className="text-xs text-slate-600 mt-2">Historical confidence band</p>
                    </div>
                  </div>
                </div>
              )}

              {i === 1 && (
                <div>
                  <h3 className="text-lg font-semibold text-slate-800 mb-1">Distribution</h3>
                  <p className="text-sm text-slate-600 mb-4">Category split rendered as a soft pie chart.</p>

                  <div className="bg-white/60 rounded-xl p-3 border border-white/20" style={{ height: 200 }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie data={pieData} dataKey="value" nameKey="name" innerRadius={48} outerRadius={78}>
                          {pieData.map((entry, idx) => (
                            <Cell key={`cell-${idx}`} fill={COLORS[idx % COLORS.length]} />
                          ))}
                        </Pie>
                        <RechartTooltip formatter={(v) => `${v}%`} />
                        <Legend verticalAlign="bottom" />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              )}

              {i === 2 && (
                <div>
                  <h3 className="text-lg font-semibold text-slate-800 mb-1">Activity</h3>
                  <p className="text-sm text-slate-600 mb-4">Recent batches with light entrance animation.</p>

                  <div className="space-y-3">
                    {[1, 2, 3].map((n) => (
                      <motion.div key={n} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: n * 0.05 }} className="bg-white/70 rounded-lg p-3 border border-white/20 flex items-start gap-3">
                        <div className="p-2 rounded-lg bg-indigo-100/60">
                          <Users className="w-5 h-5 text-indigo-700" />
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-center">
                            <p className="text-sm font-medium text-slate-900">Batch scan #{300 + n}</p>
                            <p className="text-xs text-slate-600">{n} hours ago</p>
                          </div>
                          <p className="text-sm text-slate-700">{950 + n * 800} addresses processed</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {i === 3 && (
                <div>
                  <h3 className="text-lg font-semibold text-slate-800 mb-1">History</h3>
                  <p className="text-sm text-slate-600 mb-4">Exports and audit logs with quick actions.</p>

                  <div className="grid gap-3">
                    {[{ name: 'Weekly Export', date: 'Nov 5, 2025', action: 'Download' }, { name: 'Audit: list-300', date: 'Nov 2, 2025', action: 'View' }].map((it, idx) => (
                      <div key={idx} className="bg-white/60 p-4 rounded-xl border border-white/20 flex justify-between items-center">
                        <div>
                          <p className="text-sm font-medium text-slate-900">{it.name}</p>
                          <p className="text-xs text-slate-600">{it.date}</p>
                        </div>
                        <button className="px-3 py-1 text-sm border border-white/20 rounded-lg hover:bg-white/30">{it.action}</button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}


// ===== 2) DarkNeonDashboard (soft neon, dark canvas) =====
const NEON_COLORS = ['#7C3AED', '#06B6D4', '#F59E0B'];
 function DarkNeonDashboard() {
  const screens = ['Overview', 'Distribution', 'Activity', 'History'];
  const pieData = [
    { name: 'Genuine', value: 68 },
    { name: 'Temporary', value: 25 },
    { name: 'Suspicious', value: 7 }
  ];

  return (
    <section className="w-full max-w-6xl mx-auto mt-12">
      <h2 className="text-2xl font-semibold text-slate-800 mb-4">Dark Neon Dashboard</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {screens.map((screen, i) => (
          <div key={i} className="relative rounded-3xl bg-gradient-to-br from-[#071229] to-[#040616] p-4 overflow-hidden border border-white/5">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="flex gap-2">
                  <span className="w-3 h-3 rounded-full bg-red-500/80" />
                  <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <span className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <div className="text-xs text-white/80 font-medium">validator.app/{screen.toLowerCase()}</div>
              </div>

              <div className="text-right">
                <p className="text-xs text-white/60">Growth</p>
                <p className="text-sm font-bold text-[#06b6d4]">+{95 + i * 6}%</p>
              </div>
            </div>

            <div className="p-3 min-h-[320px] text-white">
              {i === 0 && (
                <div>
                  <h3 className="text-lg font-semibold mb-1">Overview</h3>
                  <p className="text-sm text-white/70 mb-4">Dark canvas, neon highlights, gentle pulse animations.</p>

                  <div className="grid grid-cols-3 gap-3 mb-3">
                    <div className="col-span-2 bg-black/30 rounded-xl p-4 border border-white/5">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Activity className="w-5 h-5 text-[#7c3aed]" />
                          <div>
                            <p className="text-xs text-white/70">Checks (24h)</p>
                            <p className="font-semibold text-white">23,800</p>
                          </div>
                        </div>
                        <div className="text-right animate-pulse">
                          <p className="text-xs text-white/60">Live</p>
                          <p className="font-bold text-[#06b6d4]">Active</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-3 mt-4">
                        <div className="bg-black/25 p-3 rounded-lg border border-white/5 text-center">
                          <p className="text-xs text-white/70">Deliverable</p>
                          <p className="font-bold text-white">68%</p>
                        </div>
                        <div className="bg-black/25 p-3 rounded-lg border border-white/5 text-center">
                          <p className="text-xs text-white/70">Disposable</p>
                          <p className="font-bold text-white">25%</p>
                        </div>
                        <div className="bg-black/25 p-3 rounded-lg border border-white/5 text-center">
                          <p className="text-xs text-white/70">Risk</p>
                          <p className="font-bold text-white">7%</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-black/25 rounded-xl p-4 border border-white/5 text-center">
                      <h4 className="text-xs text-white/70">Accuracy</h4>
                      <p className="text-2xl font-bold text-[#7c3aed] mt-1">99.6%</p>
                      <p className="text-xs text-white/70 mt-2">Model confidence</p>
                    </div>
                  </div>
                </div>
              )}

              {i === 1 && (
                <div>
                  <h3 className="text-lg font-semibold mb-1">Distribution</h3>
                  <p className="text-sm text-white/70 mb-4">Glowing pie with clean legend.</p>

                  <div className="bg-black/20 rounded-xl p-3 border border-white/5" style={{ height: 200 }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie data={pieData} dataKey="value" nameKey="name" innerRadius={44} outerRadius={74}>
                          {pieData.map((entry, idx) => (
                            <Cell key={`cell-${idx}`} fill={NEON_COLORS[idx % NEON_COLORS.length]} />
                          ))}
                        </Pie>
                        <RechartTooltip formatter={(v) => `${v}%`} />
                        <Legend verticalAlign="bottom" wrapperStyle={{ color: '#cbd5e1' }} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              )}

              {i === 2 && (
                <div>
                  <h3 className="text-lg font-semibold mb-1">Activity</h3>
                  <p className="text-sm text-white/70 mb-4">Recent scans with neon badges.</p>

                  <div className="space-y-3">
                    {[1, 2, 3].map((n) => (
                      <div key={n} className="bg-black/20 rounded-lg p-3 border border-white/5 flex items-start gap-3">
                        <div className="p-2 rounded-lg bg-gradient-to-br from-[#7c3aed]/10 to-[#06b6d4]/10">
                          <Users className="w-5 h-5 text-[#7c3aed]" />
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-center">
                            <p className="text-sm font-medium text-white">Batch scan #{420 + n}</p>
                            <p className="text-xs text-white/60">{n} hrs</p>
                          </div>
                          <p className="text-sm text-white/70">{2200 + n * 500} addresses processed</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {i === 3 && (
                <div>
                  <h3 className="text-lg font-semibold mb-1">History</h3>
                  <p className="text-sm text-white/70 mb-4">Secure exports and audit logs.</p>

                  <div className="grid gap-3">
                    {[{ name: 'Weekly Export', date: 'Nov 5, 2025', action: 'Download' }, { name: 'Audit: list-300', date: 'Nov 2, 2025', action: 'View' }].map((it, idx) => (
                      <div key={idx} className="bg-black/20 p-4 rounded-xl border border-white/5 flex justify-between items-center">
                        <div>
                          <p className="text-sm font-medium text-white">{it.name}</p>
                          <p className="text-xs text-white/60">{it.date}</p>
                        </div>
                        <button className="px-3 py-1 text-sm border border-[#06b6d4] rounded-lg">{it.action}</button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ===== 3) MinimalAirDashboard (clean, airy, soft gradients) =====
const barData = [
  { name: 'Mon', checks: 4200 },
  { name: 'Tue', checks: 5200 },
  { name: 'Wed', checks: 4800 },
  { name: 'Thu', checks: 5600 },
  { name: 'Fri', checks: 6000 }
];
 function MinimalAirDashboard() {
  const screens = ['Overview', 'Distribution', 'Activity', 'History'];

  return (
    <section className="w-full max-w-6xl mx-auto mt-12">
      <h2 className="text-2xl font-semibold text-slate-800 mb-4">Minimal Air Dashboard</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {screens.map((screen, i) => (
          <div key={i} className="rounded-2xl bg-white border border-slate-100 shadow-sm overflow-hidden p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="flex gap-2">
                  <span className="w-3 h-3 rounded-full bg-red-300" />
                  <span className="w-3 h-3 rounded-full bg-yellow-300" />
                  <span className="w-3 h-3 rounded-full bg-green-300" />
                </div>
                <div className="text-xs text-slate-500">validator.app/{screen.toLowerCase()}</div>
              </div>

              <div className="text-right">
                <p className="text-xs text-slate-500">Growth</p>
                <p className="text-sm font-bold text-slate-800">+{80 + i * 7}%</p>
              </div>
            </div>

            <div className="p-3 min-h-[320px] text-slate-800">
              {i === 0 && (
                <div>
                  <h3 className="text-lg font-semibold mb-1">Overview</h3>
                  <p className="text-sm text-slate-500 mb-4">Whitespace-first layout with clear typographic rhythm.</p>

                  <div className="grid grid-cols-3 gap-3 mb-3">
                    <div className="col-span-2 p-4 rounded-lg border border-slate-100">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <Activity className="w-5 h-5 text-slate-700" />
                          <div>
                            <p className="text-xs text-slate-500">Checks (24h)</p>
                            <p className="font-semibold text-slate-900">24,600</p>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-3">
                        <div className="p-3 rounded-lg border border-slate-100 text-center"><p className="text-xs text-slate-500">Deliverable</p><p className="font-bold">74%</p></div>
                        <div className="p-3 rounded-lg border border-slate-100 text-center"><p className="text-xs text-slate-500">Disposable</p><p className="font-bold">20%</p></div>
                        <div className="p-3 rounded-lg border border-slate-100 text-center"><p className="text-xs text-slate-500">Risk</p><p className="font-bold">6%</p></div>
                      </div>
                    </div>

                    <div className="p-4 rounded-lg border border-slate-100 text-center">
                      <h4 className="text-xs text-slate-500">Accuracy</h4>
                      <p className="text-2xl font-bold text-slate-800 mt-1">99.8%</p>
                      <p className="text-xs text-slate-500 mt-2">Historical band</p>
                    </div>
                  </div>
                </div>
              )}

              {i === 1 && (
                <div>
                  <h3 className="text-lg font-semibold mb-1">Distribution</h3>
                  <p className="text-sm text-slate-500 mb-4">Linear bar chart for a weekly glance.</p>

                  <div className="bg-white rounded-xl p-3 border border-slate-100" style={{ height: 200 }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={barData}>
                        <XAxis dataKey="name" />
                        <YAxis />
                        <RechartTooltip />
                        <Bar dataKey="checks" fill="#60A5FA" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              )}

              {i === 2 && (
                <div>
                  <h3 className="text-lg font-semibold mb-1">Activity</h3>
                  <p className="text-sm text-slate-500 mb-4">Ordered activity feed with subtle hover lifts.</p>

                  <div className="space-y-3">
                    {[1, 2, 3].map((n) => (
                      <div key={n} className="rounded-lg p-3 border border-slate-100 flex items-start gap-3 hover:shadow-md transition-shadow">
                        <div className="p-2 rounded-lg bg-slate-50">
                          <Users className="w-5 h-5 text-slate-700" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">Batch scan #{250 + n}</p>
                          <p className="text-xs text-slate-500">{2400 + n * 350} addresses processed — {n}h ago</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {i === 3 && (
                <div>
                  <h3 className="text-lg font-semibold mb-1">History</h3>
                  <p className="text-sm text-slate-500 mb-4">Compact audit list with clear CTAs.</p>

                  <div className="grid gap-3">
                    {[{ name: 'Export: weekly', date: 'Nov 5, 2025' }, { name: 'Audit: list-300', date: 'Nov 2, 2025' }].map((it, idx) => (
                      <div key={idx} className="p-4 rounded-lg border border-slate-100 flex justify-between items-center">
                        <div>
                          <p className="text-sm font-medium">{it.name}</p>
                          <p className="text-xs text-slate-500">{it.date}</p>
                        </div>
                        <button className="px-3 py-1 text-sm border border-slate-100 rounded-lg">Action</button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ===== 4) MotionGridDashboard (subtle motion, staggered reveals) =====
const MOTION_COLORS = ['#60A5FA', '#7C3AED', '#F59E0B'];
 function MotionGridDashboard() {
  const screens = ['Overview', 'Distribution', 'Activity', 'History'];
  const pieData = [
    { name: 'Genuine', value: 75 },
    { name: 'Temporary', value: 20 },
    { name: 'Suspicious', value: 5 }
  ];

  return (
    <section className="w-full max-w-6xl mx-auto mt-12">
      <h2 className="text-2xl font-semibold text-slate-800 mb-4">Motion Grid Dashboard</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {screens.map((screen, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06, duration: 0.45 }} className="relative rounded-3xl bg-white/90 shadow-xl border border-gray-100 overflow-hidden p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="flex gap-2">
                  <span className="w-3 h-3 rounded-full bg-red-400" />
                  <span className="w-3 h-3 rounded-full bg-yellow-400" />
                  <span className="w-3 h-3 rounded-full bg-green-400" />
                </div>
                <div className="text-xs text-gray-600">validator.app/{screen.toLowerCase()}</div>
              </div>

              <div className="text-right">
                <p className="text-xs text-gray-500">Growth</p>
                <p className="text-sm font-bold text-gray-800">+{105 + i * 6}%</p>
              </div>
            </div>

            <div className="p-3 min-h-[320px]">
              {i === 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-1">Overview</h3>
                  <p className="text-sm text-gray-500 mb-4">Staggered cards with micro-interactions.</p>

                  <div className="grid grid-cols-3 gap-3 mb-3">
                    <div className="col-span-2 bg-white rounded-xl p-4 border border-gray-100">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <Activity className="w-5 h-5 text-indigo-600" />
                          <div>
                            <p className="text-xs text-gray-500">Checks (24h)</p>
                            <p className="font-semibold text-gray-800">24,900</p>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-3">
                        <motion.div whileHover={{ scale: 1.03 }} className="p-3 rounded-lg border border-gray-100 text-center"><p className="text-xs text-gray-500">Deliverable</p><p className="font-bold text-gray-800">75%</p></motion.div>
                        <motion.div whileHover={{ scale: 1.03 }} className="p-3 rounded-lg border border-gray-100 text-center"><p className="text-xs text-gray-500">Disposable</p><p className="font-bold text-gray-800">20%</p></motion.div>
                        <motion.div whileHover={{ scale: 1.03 }} className="p-3 rounded-lg border border-gray-100 text-center"><p className="text-xs text-gray-500">Risk</p><p className="font-bold text-gray-800">5%</p></motion.div>
                      </div>
                    </div>

                    <div className="bg-white rounded-xl p-4 border border-gray-100 text-center">
                      <h4 className="text-xs text-gray-500">Accuracy</h4>
                      <p className="text-2xl font-bold text-purple-600 mt-1">99.95%</p>
                      <p className="text-xs text-gray-500 mt-2">Confidence band</p>
                    </div>
                  </div>
                </div>
              )}

              {i === 1 && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-1">Distribution</h3>
                  <p className="text-sm text-gray-500 mb-4">Interactive pie with springy reveal.</p>

                  <div className="bg-white rounded-xl p-3 border border-gray-100" style={{ height: 200 }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie data={pieData} dataKey="value" nameKey="name" innerRadius={48} outerRadius={78}>
                          {pieData.map((entry, idx) => (
                            <Cell key={`cell-${idx}`} fill={MOTION_COLORS[idx % MOTION_COLORS.length]} />
                          ))}
                        </Pie>
                        <RechartTooltip formatter={(v) => `${v}%`} />
                        <Legend verticalAlign="bottom" />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              )}

              {i === 2 && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-1">Activity</h3>
                  <p className="text-sm text-gray-500 mb-4">Animated feed with small motion accents.</p>

                  <div className="space-y-3">
                    {[1, 2, 3].map((n) => (
                      <motion.div key={n} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.04 * n }} className="bg-white rounded-lg p-3 border border-gray-100 flex items-start gap-3">
                        <div className="p-2 rounded-lg bg-indigo-50">
                          <Users className="w-5 h-5 text-indigo-500" />
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-center">
                            <p className="text-sm font-medium text-gray-800">Batch scan #{520 + n}</p>
                            <p className="text-xs text-gray-500">{n} hours ago</p>
                          </div>
                          <p className="text-sm text-gray-600">{3200 + n * 400} addresses processed</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {i === 3 && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-1">History</h3>
                  <p className="text-sm text-gray-500 mb-4">Interactive cards with hover expansion.</p>

                  <div className="grid gap-3">
                    {[{ name: 'Weekly Export', date: 'Nov 5, 2025' }, { name: 'Audit: list-300', date: 'Nov 2, 2025' }].map((item, idx) => (
                      <motion.div whileHover={{ scale: 1.02 }} key={idx} className="bg-white p-4 rounded-xl border border-gray-100 flex justify-between items-center">
                        <div>
                          <p className="text-sm font-medium text-gray-800">{item.name}</p>
                          <p className="text-xs text-gray-500">{item.date}</p>
                        </div>
                        <button className="px-3 py-1 text-sm border border-gray-200 rounded-lg">Action</button>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

// ===== Combined (stacked column) =====
export default function CombinedDashboards() {
  return (
    <div className="flex flex-col gap-12 items-stretch p-8 bg-gradient-to-br from-slate-50 to-blue-50 min-h-screen">
      <GlassmorphicDashboard />
      <DarkNeonDashboard />
      <MinimalAirDashboard />
      <MotionGridDashboard />
    </div>
  );
}

