import React from "react";
import { XCircle, Edit, Key, Ban, Mail } from "lucide-react";

const UserModal = ({ user, onClose }) => {
  const PALETTE = ["#75B7FF", "#D5A8FF", "#FF9BAD", "#FFD1A3", "#10b981"];

  const getStatusColor = (s) =>
    s === "active" ? PALETTE[4] : s === "trial" ? PALETTE[0] : PALETTE[2];

  const getPlanColor = (p) =>
    p === "Enterprise" ? PALETTE[1] : p === "Pro" ? PALETTE[0] : PALETTE[3];

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center text-white text-2xl font-bold"
              style={{
                background: `linear-gradient(135deg, ${PALETTE[0]}, ${PALETTE[1]})`,
              }}
            >
              {user.avatar}
            </div>

            <div>
              <h2 className="text-xl font-bold">{user.company}</h2>
              <p className="text-gray-500 text-sm">{user.email}</p>
            </div>
          </div>

          <button className="p-2 hover:bg-gray-100 rounded-xl" onClick={onClose}>
            <XCircle size={26} className="text-gray-600" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6">
          {/* Quick Actions */}
          <div>
            <h3 className="font-bold mb-3">Quick Actions</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { icon: Edit, label: "Edit Details", color: PALETTE[0] },
                { icon: Key, label: "Reset API Key", color: PALETTE[1] },
                { icon: Ban, label: "Suspend Account", color: PALETTE[2] },
                { icon: Mail, label: "Send Email", color: PALETTE[3] },
              ].map((a, i) => (
                <button
                  key={i}
                  className="p-4 rounded-xl border hover:shadow-md transition text-center"
                  style={{ borderColor: `${a.color}33`, background: `${a.color}11` }}
                >
                  <a.icon
                    className="w-5 h-5 mx-auto mb-2"
                    style={{ color: a.color }}
                  />
                  <p className="text-xs font-medium">{a.label}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Information */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Left */}
            <div>
              <h3 className="font-bold mb-3">Account Information</h3>

              <Info label="Status" value={user.status} color={getStatusColor(user.status)} />
              <Info label="Plan" value={user.plan} color={getPlanColor(user.plan)} />
              <Info label="Team Members" value={`${user.users} users`} />
              <Info label="Joined" value={user.joined} />
              <Info label="Last Active" value={user.lastActive} />
            </div>

            {/* Right */}
            <div>
              <h3 className="font-bold mb-3">Usage Statistics</h3>

              <Info label="API Calls (Month)" value={user.apiCalls.toLocaleString()} />
              <Info label="API Limit" value={user.apiLimit.toLocaleString()} />
              <Info
                label="Usage Rate"
                value={`${((user.apiCalls / user.apiLimit) * 100).toFixed(1)}%`}
              />
              <Info label="Emails Detected" value={user.detected.toLocaleString()} />
              <Info label="Monthly Spend" value={`$${user.monthlySpend}`} color={PALETTE[4]} />
            </div>
          </div>

          {/* Progress */}
          <div>
            <h3 className="font-bold mb-3">API Usage</h3>
            <div className="h-6 bg-gray-100 rounded-full overflow-hidden relative">
              <div
                className="absolute left-0 top-0 bottom-0 rounded-full"
                style={{
                  width: `${(user.apiCalls / user.apiLimit) * 100}%`,
                  background: `linear-gradient(90deg, ${PALETTE[0]}, ${PALETTE[1]})`,
                }}
              />
              <div className="absolute inset-0 flex items-center justify-center text-xs font-semibold">
                {user.apiCalls.toLocaleString()} / {user.apiLimit.toLocaleString()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Info = ({ label, value, color }) => (
  <div className="flex justify-between py-1 text-sm">
    <span className="text-gray-500">{label}</span>
    <span className="font-semibold" style={{ color }}>{value}</span>
  </div>
);

export default UserModal;
