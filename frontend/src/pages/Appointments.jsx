import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { Calendar as CalIcon, Clock, User, Dumbbell, CheckCircle } from 'lucide-react';

export default function Appointments() {
  const [selectedService, setSelectedService] = useState('');
  const [instructors, setInstructors] = useState([]);
  const [selectedInstructor, setSelectedInstructor] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const services = [
    { id: 1, name: 'Open Gym', price: 10 },
    { id: 2, name: 'Crossfit', price: 15 },
    { id: 3, name: 'Yoga', price: 12 },
  ];

  // Fetch instructors
    useEffect(() => {
    // Temporary mock data
    setInstructors([
        { id: 1, name: 'Kostas', role: 'Trainer' },
        { id: 2, name: 'Giorgos', role: 'Crossfit Coach' },
    ]);
    }, []);


  const timeSlots = [
    '07:00', '08:00', '09:00', '10:00', '11:00',
    '12:00', '13:00', '14:00', '15:00', '16:00',
    '17:00', '18:00', '19:00', '20:00',
  ];

  const handleBook = async () => {
    if (!selectedService || !selectedDate || !selectedTime) {
      setError('Please select a service, date, and time.');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      await axios.post(
        'http://localhost:8000/api/appointments/',
        {
          service: selectedService,
          staff: selectedInstructor || null,
          date: selectedDate.toISOString().split('T')[0],
          time: selectedTime,
        },
        { withCredentials: true }
      );
      setSuccess(true);
    } catch (err) {
      console.error(err);
      setError('Booking failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-indigo-50 to-purple-50 p-6 flex justify-center">
      <div className="max-w-4xl w-full bg-white shadow-xl rounded-3xl p-8 space-y-8">
        <h1 className="text-3xl font-bold text-gray-800 text-center">Book Your Gym Session</h1>
        <p className="text-gray-600 text-center mb-6">Select your training type and preferred time</p>

        {/* Step 1: Select Service */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
            <Dumbbell className="w-4 h-4" /> Choose Service
          </label>
          <div className="grid sm:grid-cols-3 gap-3">
            {services.map((srv) => (
              <button
                key={srv.id}
                onClick={() => setSelectedService(srv.id)}
                className={`border rounded-xl py-3 text-center transition-all ${
                  selectedService === srv.id
                    ? 'bg-indigo-600 text-indigo shadow-md'
                    : 'border-gray-300 hover:border-indigo-400'
                }`}
              >
                <p className="font-semibold">{srv.name}</p>
                <p className="text-sm opacity-80">{srv.price} €</p>
              </button>
            ))}
          </div>
        </div>

       {/* Step 2: Select Instructor (optional) */}
<div>
  <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
    <User className="w-4 h-4" /> Instructor (optional)
  </label>

  <div className="relative">
    <button
      type="button"
      onClick={() => setDropdownOpen(!dropdownOpen)}
      className="w-full flex justify-between items-center rounded-lg border border-gray-300 bg-white px-4 py-3 text-left shadow-sm hover:border-indigo-400 focus:ring-2 focus:ring-indigo-500 transition-all"
    >
      <span className="text-gray-700">
        {selectedInstructor
          ? instructors.find((i) => i.id === Number(selectedInstructor))?.name +
            ' — ' +
            instructors.find((i) => i.id === Number(selectedInstructor))?.role
          : 'No preference'}
      </span>
      <svg
        className={`w-5 h-5 text-gray-500 transition-transform ${
          dropdownOpen ? 'rotate-180' : ''
        }`}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
    </button>

    {dropdownOpen && (
      <div className="absolute z-10 mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg">
        <button
          onClick={() => {
            setSelectedInstructor('');
            setDropdownOpen(false);
          }}
          className={`block w-full text-left px-4 py-2 text-gray-700 hover:bg-indigo-50 ${
            !selectedInstructor ? 'bg-indigo-50 font-semibold' : ''
          }`}
        >
          No preference
        </button>
        {instructors.map((inst) => (
          <button
            key={inst.id}
            onClick={() => {
              setSelectedInstructor(inst.id);
              setDropdownOpen(false);
            }}
            className={`block w-full text-left px-4 py-2 text-gray-700 hover:bg-indigo-50 ${
              selectedInstructor === inst.id ? 'bg-indigo-100 font-semibold' : ''
            }`}
          >
            {inst.name} — {inst.role}
          </button>
        ))}
      </div>
    )}
  </div>
</div>


        {/* Step 3: Pick a Date */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
            <CalIcon className="w-4 h-4" /> Select Date
          </label>
          <div className="flex justify-center">
            <Calendar
              onChange={setSelectedDate}
              value={selectedDate}
              className="rounded-xl border border-gray-200 shadow-sm p-3"
              minDate={new Date()}
            />
          </div>
        </div>

        {/* Step 4: Choose a Time Slot */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
            <Clock className="w-4 h-4" /> Select Time
          </label>
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
            {timeSlots.map((t) => (
              <button
                key={t}
                onClick={() => setSelectedTime(t)}
                className={`border rounded-lg py-2 text-sm ${
                  selectedTime === t
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'border-gray-300 hover:border-indigo-400'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Error or success feedback */}
        {error && <p className="text-red-600 text-center text-sm">{error}</p>}
        {success && (
          <div className="flex items-center justify-center text-green-600 gap-2 font-medium">
            <CheckCircle className="w-5 h-5" /> Appointment booked successfully!
          </div>
        )}

        {/* Submit button */}
        <button
          onClick={handleBook}
          disabled={loading}
          className="w-full mt-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold py-3 rounded-lg shadow-md hover:opacity-90 transition-all flex items-center justify-center gap-2"
        >
          {loading ? 'Booking...' : 'Confirm Appointment'}
        </button>
      </div>
    </div>
  );
}
