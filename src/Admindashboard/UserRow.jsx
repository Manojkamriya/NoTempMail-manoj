import React from "react";
import { MoreVertical } from "lucide-react";

const UserRow = ({ user, index, palette, selected, onSelect, onOpen }) => {
  const usagePercent = (user.apiCalls / user.apiLimit) * 100;

  const getStatusColor = (status) => {
    const colors = {
      active: palette[4],
      trial: palette[0],
      suspended: palette[2],
    };
    return colors[status] || "#6e6e73";
  };

  const getPlanColor = (plan) => {
    const colors = {
      Enterprise: palette[1],
      Pro: palette[0],
      Starter: palette[3],
    };
    return colors[plan] || "#6e6e73";
  };

  return (
    <tr
      className="border-t hover:bg-gray-50 cursor-pointer"
      style={{ borderColor: "rgba(0,0,0,0.05)" }}
      onClick={onOpen}
    >
      <td className="p-4" onClick={(e) => e.stopPropagation()}>
        <input type="checkbox" checked={selected} onChange={onSelect} />
      </td>

      <td className="p-4">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold"
            style={{
              background: `linear-gradient(135deg, ${palette[index % palette.length]}, ${
                palette[(index + 1) % palette.length]
              })`,
            }}
          >
            {user.avatar}
          </div>

          <div>
            <p className="font-semibold text-sm text-gray-900">{user.company}</p>
            <p className="text-xs text-gray-500">{user.email}</p>
          </div>
        </div>
      </td>

      <td className="p-4">
        <span
          className="px-3 py-1 rounded-full text-xs font-semibold"
          style={{
            background: `${getPlanColor(user.plan)}22`,
            color: getPlanColor(user.plan),
          }}
        >
          {user.plan}
        </span>
      </td>

      <td className="p-4">
        <span
          className="px-3 py-1 rounded-full text-xs font-semibold capitalize"
          style={{
            background: `${getStatusColor(user.status)}22`,
            color: getStatusColor(user.status),
          }}
        >
          {user.status}
        </span>
      </td>

      <td className="p-4">
        <div className="w-24">
          <p className="text-xs text-gray-500">{usagePercent.toFixed(0)}%</p>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full"
              style={{
                width: `${usagePercent}%`,
                background: `linear-gradient(90deg, ${palette[0]}, ${palette[1]})`,
              }}
            />
          </div>
        </div>
      </td>

      <td className="p-4">
        <p className="font-semibold text-sm text-gray-900">${user.monthlySpend}</p>
        <p className="text-xs text-gray-500">/ month</p>
      </td>

      <td className="p-4" onClick={(e) => e.stopPropagation()}>
        <button className="p-2 rounded-lg hover:bg-gray-100">
          <MoreVertical size={18} className="text-gray-500" />
        </button>
      </td>
    </tr>
  );
};

export default UserRow;
