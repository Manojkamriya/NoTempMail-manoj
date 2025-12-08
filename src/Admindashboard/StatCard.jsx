import React from "react";

const StatCard = ({ title, value, change, icon: Icon, color }) => {
  return (
    <div
      className="rounded-2xl p-6 shadow transition hover:shadow-lg bg-white border"
      style={{ borderColor: "rgba(0,0,0,0.05)" }}
    >
      <div className="flex items-center justify-between mb-4">
        <div
          className="p-3 rounded-xl"
          style={{ background: `${color}22` }}
        >
          <Icon size={24} style={{ color }} />
        </div>

        <span
          className="text-sm font-semibold px-3 py-1 rounded-full"
          style={{ background: `${color}18`, color }}
        >
          {change}
        </span>
      </div>

      <p className="text-gray-500 text-sm">{title}</p>
      <h3 className="text-3xl font-bold text-gray-900">{value}</h3>
    </div>
  );
};

export default StatCard;
