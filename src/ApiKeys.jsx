import React, { useState } from "react";
import { Eye, EyeOff, Copy, RefreshCw, Trash2, KeyRound, Plus, CheckCircle } from "lucide-react";

const ApiKeys = () => {
  const [keys, setKeys] = useState([
    {
      id: 1,
      name: "Primary Key",
      value: "ntm_live_98asf09asf0a9sdf09asf0",
      visible: false,
      created: "Jan 5, 2025",
      lastUsed: "2 hours ago",
      status: "active",
    },
    {
      id: 2,
      name: "Server Integration",
      value: "ntm_live_asf98asf0asf0as0f9as0",
      visible: false,
      created: "Dec 22, 2024",
      lastUsed: "1 day ago",
      status: "active",
    },
  ]);

  const [copyStatus, setCopyStatus] = useState(null);

  const generateKey = () => {
    const newKey = {
      id: Date.now(),
      name: "New API Key",
      value: "ntm_live_" + Math.random().toString(36).slice(2, 24),
      visible: false,
      created: new Date().toDateString(),
      lastUsed: "-",
      status: "active",
    };
    setKeys([newKey, ...keys]);
  };

  const toggleVisibility = (id) => {
    setKeys(keys.map(k => (k.id === id ? { ...k, visible: !k.visible } : k)));
  };

  const revokeKey = (id) => {
    setKeys(keys.map(k => (k.id === id ? { ...k, status: "revoked" } : k)));
  };

  const copyKey = async (value, id) => {
    await navigator.clipboard.writeText(value);
    setCopyStatus(id);
    setTimeout(() => setCopyStatus(null), 1500);
  };

  return (
    <div
      className="min-h-screen p-10"
      style={{
        background: "linear-gradient(to bottom right, #fafafa, #f0f9ff)",
      }}
    >
      <div className="max-w-4xl mx-auto space-y-10">

        {/* Header */}
        <div>
          <h1
            className="text-4xl font-extrabold bg-clip-text text-transparent"
            style={{
              backgroundImage:
                "linear-gradient(90deg, #0A84FF, #B45CFF, #FF2D55, #FF9500)",
            }}
          >
            API Keys
          </h1>
          <p className="text-gray-600 mt-2">
            Manage your authentication keys for NoTempMail API access
          </p>
        </div>

        {/* Generate Button */}
        <button
          onClick={generateKey}
          className="flex items-center gap-2 px-5 py-3 rounded-xl text-white font-medium shadow-md hover:scale-[1.02] transition"
          style={{ background: "#1c1b1b" }}
        >
          <Plus size={18} />
          Generate New Key
        </button>

        {/* Keys List */}
        <div className="space-y-6">
          {keys.map((key) => (
            <div
              key={key.id}
              className="rounded-2xl p-6 shadow-lg"
              style={{
                background: "white",
                border: "1px solid rgba(0,0,0,0.05)",
              }}
            >
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <div
                    className="p-3 rounded-xl"
                    style={{
                      background: "rgba(0,0,0,0.05)",
                    }}
                  >
                    <KeyRound size={22} color="#1c1b1b" />
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold">{key.name}</h3>
                    <p className="text-sm text-gray-500">
                      Created: {key.created}
                    </p>
                    <p className="text-sm text-gray-500">
                      Last Used: {key.lastUsed}
                    </p>

                    {/* Key Display */}
                    <div className="mt-3 px-4 py-2 rounded-xl bg-gray-100 flex items-center justify-between">
                      <span className="font-mono text-sm text-gray-800">
                        {key.visible ? key.value : "•••••••••••••••••••••••••••••"}
                      </span>

                      <div className="flex gap-3 items-center">

                        {/* Copy */}
                        <button
                          onClick={() => copyKey(key.value, key.id)}
                          className="hover:opacity-70"
                        >
                          {copyStatus === key.id ? (
                            <CheckCircle color="#10b981" size={20} />
                          ) : (
                            <Copy size={20} />
                          )}
                        </button>

                        {/* Show / Hide */}
                        <button
                          onClick={() => toggleVisibility(key.id)}
                          className="hover:opacity-70"
                        >
                          {key.visible ? (
                            <EyeOff size={20} />
                          ) : (
                            <Eye size={20} />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3">

                  {/* Regenerate */}
                  <button
                    className="p-2 rounded-xl hover:bg-gray-100 transition"
                    onClick={() =>
                      setKeys(
                        keys.map((k) =>
                          k.id === key.id
                            ? {
                                ...k,
                                value:
                                  "ntm_live_" +
                                  Math.random().toString(36).slice(2, 24),
                              }
                            : k
                        )
                      )
                    }
                  >
                    <RefreshCw size={20} className="text-gray-500" />
                  </button>

                  {/* Revoke */}
                  <button
                    className="p-2 rounded-xl hover:bg-red-100 transition"
                    onClick={() => revokeKey(key.id)}
                  >
                    <Trash2 size={20} className="text-red-500" />
                  </button>
                </div>
              </div>

              {/* Status Badge */}
              <div className="mt-3">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    key.status === "active"
                      ? "bg-green-100 text-green-600"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  {key.status === "active" ? "Active" : "Revoked"}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default ApiKeys;
