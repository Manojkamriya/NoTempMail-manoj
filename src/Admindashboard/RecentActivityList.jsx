import React from "react";

const RecentActivityList = ({ activity }) => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow border">
      <h3 className="font-bold text-lg mb-4">Recent Activity</h3>

      <div className="space-y-3">
        {activity.map((item, i) => (
          <div
            key={i}
            className="flex gap-3 p-3 rounded-xl bg-gray-50 hover:shadow transition"
          >
            <div
              className="p-2 rounded-lg"
              style={{ background: `${item.color}22` }}
            >
              <item.icon size={16} style={{ color: item.color }} />
            </div>

            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm">{item.type}</p>
              <p className="text-xs text-gray-500 truncate">{item.company}</p>
              <p className="text-xs text-gray-500 mt-1">{item.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivityList;
