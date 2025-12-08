import React from "react";

const SystemHealth = ({ palette }) => {
  return (
    <div
      className="rounded-2xl p-6 shadow border text-white"
      style={{ background: `linear-gradient(135deg, ${palette[0]}, ${palette[1]})` }}
    >
      <h3 className="font-bold text-lg mb-4">System Health</h3>

      <HealthBar label="API Uptime" value="99.98%" percent={99.98} />
      <HealthBar label="Server Load" value="42%" percent={42} />
      <HealthBar label="Database" value="Stable" percent={90} />
      <HealthBar label="Queue Latency" value="120 ms" percent={75} />
    </div>
  );
};

const HealthBar = ({ label, value, percent }) => (
  <div className="mb-4">
    <div className="flex justify-between text-sm mb-1">
      <span>{label}</span>
      <span>{value}</span>
    </div>

    <div className="h-2 bg-white bg-opacity-30 rounded-full overflow-hidden">
      <div
        className="h-full bg-white rounded-full"
        style={{ width: `${percent}%` }}
      />
    </div>
  </div>
);

export default SystemHealth;
