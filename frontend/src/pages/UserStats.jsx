import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BarChart, Bar, PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const COLORS = ['#6366F1', '#A855F7', '#F59E0B'];

export default function UserStats() {
  const [data, setData] = useState({
    weekly: [],
    serviceBreakdown: [],
    streak: 0,
  });

useEffect(() => {
  axios.get('http://localhost:8000/api/appointments/stats/', { withCredentials: true })
    .then((res) => {
      console.log("Stats data:", res.data);
      setData(res.data);
    })
    .catch((err) => {
      console.error("Stats error:", err.response?.data || err.message);
    });
}, []);


  return (
    <div className="p-8 space-y-10">
      <h1 className="text-3xl font-bold text-gray-800">Your Activity Insights</h1>

      {/* Weekly Activity Bar Chart */}
      <div className="bg-white rounded-2xl shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Sessions per Week</h2>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={data.weekly}>
            <XAxis dataKey="week" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="sessions" fill="#6366F1" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Service Distribution Pie Chart */}
      <div className="bg-white rounded-2xl shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Your Favorite Workouts</h2>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={data.serviceBreakdown}
              cx="50%"
              cy="50%"
              outerRadius={80}
              dataKey="value"
              label
            >
              {data.serviceBreakdown.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Streak */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl shadow-lg p-6 text-center">
        <h2 className="text-lg font-medium">Current Streak</h2>
        <p className="text-5xl font-bold mt-2">{data.streak} weeks 🔥</p>
      </div>
    </div>
  );
}
