import React from "react";
import { CheckCircle } from "lucide-react";

const features = [
  {
    title: "Smart Scheduling",
    description:
      "AI-assisted appointment booking that automatically adjusts to staff availability and client preferences.",
  },
  {
    title: "24/7 Online Booking",
    description:
      "Let your clients book anytime, anywhere — no phone calls, no confusion, no lost opportunities.",
  },
  {
    title: "Client Management",
    description:
      "Access full client history, preferences, and notes — all in one place to personalize every visit.",
  },
  {
    title: "Automated Reminders",
    description:
      "Reduce no-shows with automatic SMS, email, or WhatsApp reminders before every appointment.",
  },
  {
    title: "Integrated Payments",
    description:
      "Accept card payments, manage invoices, and track revenue effortlessly through the platform.",
  },
  {
    title: "Analytics & Insights",
    description:
      "See which services perform best, who your top clients are, and when your peak hours hit.",
  },
];

export default function Features() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#f9f9ff] text-gray-800 pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-extrabold text-gray-900">
            Powerful <span className="text-[#6C63FF]">Features</span> for Your Business
          </h1>
          <p className="text-lg text-gray-600 mt-4 max-w-2xl mx-auto">
            Everything you need to manage appointments, boost efficiency, and grow — 
            all inside one intuitive platform.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all p-8 border border-gray-100"
            >
              <div className="flex items-center mb-4">
                <CheckCircle className="text-[#7B3EFF] w-6 h-6 mr-3" />
                <h3 className="text-xl font-semibold text-gray-900">{f.title}</h3>
              </div>
              <p className="text-gray-600 leading-relaxed">{f.description}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-20">
          <a
            href="/get-started"
            className="bg-[#7B3EFF] text-white font-semibold px-8 py-4 rounded-xl shadow-md hover:shadow-lg hover:bg-[#6C63FF] transition-all"
          >
            Start Free Trial
          </a>
          <p className="text-gray-500 mt-3">
            No credit card required • Cancel anytime
          </p>
        </div>
      </div>
    </div>
  );
}
