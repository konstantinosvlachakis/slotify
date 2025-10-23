import React from "react";
import { Dumbbell, Scissors, Sparkles, Users, Calendar, CreditCard } from "lucide-react";

const solutions = [
  {
    icon: Dumbbell,
    title: "For Gyms & Fitness Studios",
    description:
      "Let members book classes, PT sessions, or equipment slots online. Reduce front desk load and fill every time slot efficiently.",
  },
  {
    icon: Scissors,
    title: "For Barbershops & Hair Salons",
    description:
      "Allow clients to choose their stylist, book their favorite service, and receive reminders — all without calling the salon.",
  },
  {
    icon: Sparkles,
    title: "For Nail & Beauty Studios",
    description:
      "Keep track of repeat clients, recurring appointments, and preferred technicians to deliver a premium personalized experience.",
  },
  {
    icon: Users,
    title: "For Wellness & Massage Centers",
    description:
      "Simplify staff scheduling and client bookings. Handle room assignments, sessions, and cancellations automatically.",
  },
  {
    icon: Calendar,
    title: "For Clinics & Therapists",
    description:
      "Manage patient appointments securely and send automated reminders to reduce missed visits.",
  },
  {
    icon: CreditCard,
    title: "For Any Service Business",
    description:
      "Slotify adapts to your workflow — from yoga studios to photographers — with online payments, flexible schedules, and custom branding.",
  },
];

export default function Solutions() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#f9f9ff] text-gray-800 pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-extrabold text-gray-900">
            Tailored <span className="text-[#6C63FF]">Solutions</span> for Every Business
          </h1>
          <p className="text-lg text-gray-600 mt-4 max-w-2xl mx-auto">
            Whether you run a gym, barbershop, or beauty studio — Slotify adapts to your business needs,
            helping you manage time, clients, and revenue effortlessly.
          </p>
        </div>

        {/* Solutions Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {solutions.map(({ icon: Icon, title, description }, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all p-8 border border-gray-100"
            >
              <div className="flex items-center mb-4">
                <div className="bg-[#f3f1ff] p-3 rounded-lg mr-4">
                  <Icon className="text-[#7B3EFF] w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
              </div>
              <p className="text-gray-600 leading-relaxed">{description}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-20">
          <a
            href="/get-started"
            className="bg-[#7B3EFF] text-white font-semibold px-8 py-4 rounded-xl shadow-md hover:shadow-lg hover:bg-[#6C63FF] transition-all"
          >
            Get Started Today
          </a>
          <p className="text-gray-500 mt-3">
            Empower your business with smarter booking — in minutes.
          </p>
        </div>
      </div>
    </div>
  );
}
