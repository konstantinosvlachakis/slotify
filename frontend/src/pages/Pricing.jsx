import React from "react";

export default function Pricing() {
  const plans = [
    {
      name: "Free",
      price: "€0 / month",
      desc: "For freelancers or small businesses starting out.",
      features: [
        "Up to 30 bookings / month",
        "Basic scheduling tools",
        "Email notifications",
        "1 staff member",
      ],
      button: "Start Free",
      highlight: false,
    },
    {
      name: "Pro",
      price: "€10 / month",
      desc: "Perfect for small teams and growing businesses.",
      features: [
        "Unlimited bookings",
        "Custom branding",
        "SMS reminders",
        "Up to 5 staff members",
        "Priority support",
      ],
      button: "Start Free Trial",
      highlight: true,
    },
    {
      name: "Business",
      price: "€25 / month",
      desc: "Advanced tools for busy salons, gyms, or franchises.",
      features: [
        "Unlimited staff & bookings",
        "Advanced analytics",
        "Online payments",
        "API access",
        "Dedicated account manager",
      ],
      button: "Contact Sales",
      highlight: false,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#f3f0ff] py-20 px-6">
      <h1 className="text-4xl font-bold text-center text-gray-900 mb-4">
        Simple, Transparent Pricing
      </h1>
      <p className="text-center text-gray-600 mb-12">
        Choose the plan that fits your business. No hidden fees.
      </p>

      <div className="flex flex-col md:flex-row justify-center gap-8 max-w-6xl mx-auto">
        {plans.map((plan, idx) => (
          <div
            key={idx}
            className={`flex-1 bg-white rounded-2xl shadow-lg border border-gray-100 p-8 text-center hover:shadow-xl transition-all ${
              plan.highlight ? "ring-2 ring-violet-500 scale-[1.02]" : ""
            }`}
          >
            <h2
              className={`text-2xl font-semibold mb-2 ${
                plan.highlight ? "text-violet-600" : "text-gray-800"
              }`}
            >
              {plan.name}
            </h2>
            <p className="text-gray-500 mb-4">{plan.desc}</p>
            <p className="text-4xl font-bold text-violet-600 mb-6">
              {plan.price}
            </p>
            <ul className="text-gray-600 space-y-2 mb-8">
              {plan.features.map((f, i) => (
                <li key={i}>✔ {f}</li>
              ))}
            </ul>
            <button
              className={`w-full py-3 rounded-lg font-semibold transition ${
                plan.highlight
                  ? "bg-violet-600 text-white hover:bg-violet-700"
                  : "bg-gray-100 hover:bg-gray-200 text-gray-800"
              }`}
            >
              {plan.button}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
