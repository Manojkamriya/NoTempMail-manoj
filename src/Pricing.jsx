import React from "react";
import { Check, ArrowRight } from "lucide-react";

export default function PricingPage() {
  const PALETTE = ["#75B7FF", "#D5A8FF", "#FF9BAD", "#FFD1A3", "#FFA647"];

  const plans = [
    {
      name: "Starter",
      price: "$19/mo",
      gradient: `linear-gradient(135deg, ${PALETTE[0]}, ${PALETTE[1]})`,
      features: [
        "5,000 validations / month",
        "Disposable email detection",
        "Basic API access",
        "Dashboard analytics",
        "Community support"
      ],
    },
    {
      name: "Professional",
      price: "$49/mo",
      highlighted: true,
      gradient: `linear-gradient(135deg, ${PALETTE[2]}, ${PALETTE[3]})`,
      features: [
        "50,000 validations / month",
        "High-accuracy detection",
        "Advanced API limits",
        "Bulk validation tools",
        "Priority support",
        "Webhooks & automation"
      ],
    },
    {
      name: "Enterprise",
      price: "Custom",
      gradient: `linear-gradient(135deg, ${PALETTE[1]}, ${PALETTE[4]})`,
      features: [
        "Unlimited validations",
        "Custom SLA",
        "Dedicated success engineer",
        "Private API infrastructure",
        "Internal tooling integration"
      ],
    },
  ];

  return (
    <div className="py-20 px-6 relative overflow-hidden">
      {/* Background grid video (optional, matches hero) */}
      <video
        src="/grid.webm"
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-20"
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-14">
          <h1
            className="text-5xl font-extrabold bg-clip-text text-transparent"
            style={{
              backgroundImage:
                "linear-gradient(90deg, #2F96FF, #B97BFF, #FF546F, #FFA647)",
            }}
          >
            Simple, Transparent Pricing
          </h1>
          <p className="text-lg mt-3" style={{ color: "#6e6e73" }}>
            Scale your email verification with accuracy and speed.
          </p>
        </div>

        {/* Pricing Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((p, i) => (
            <div
              key={i}
              className={`rounded-2xl shadow-xl border p-6 relative overflow-hidden ${
                p.highlighted ? "scale-105 shadow-2xl" : ""
              }`}
              style={{
                borderColor: "rgba(31,30,30,0.06)",
                background: "rgba(255,255,255,0.9)",
              }}
            >
              {/* Gradient ribbon */}
              <div
                className="absolute inset-0 opacity-20"
                style={{ background: p.gradient }}
              ></div>

              <div className="relative z-10">
                <h3 className="text-2xl font-bold mb-2">{p.name}</h3>
                <p className="text-4xl font-extrabold mb-4">{p.price}</p>

                <ul className="space-y-3 mb-6 text-sm text-slate-700">
                  {p.features.map((f, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <Check size={18} className="text-emerald-600" />
                      {f}
                    </li>
                  ))}
                </ul>

                <button
                  className={`w-full py-3 rounded-3xl font-semibold flex items-center justify-center gap-2 transition ${
                    p.highlighted
                      ? "bg-[#1c1b1b] border border-slate-400 text-white shadow-lg hover:scale-[1.02]"
                      : "bg-white border border-slate-200 hover:border-slate-400"
                  }`}
                >
                  Get Started <ArrowRight size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
