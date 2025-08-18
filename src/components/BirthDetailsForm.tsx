import React, { useState } from 'react';

interface BirthDetailsFormProps {
  onSubmit: (details: BirthDetails) => void;
  isPro: boolean;
  showResults: boolean;
}

export interface BirthDetails {
  name: string;
  birthMonth: string;
  birthDate: string;
  birthYear: string;
  birthHour: string;
  birthMinute: string;
  birthPeriod: string;
  birthPlace: string;
}

export default function BirthDetailsForm({ onSubmit, isPro, showResults }: BirthDetailsFormProps) {
  const [details, setDetails] = useState<BirthDetails>({
    name: '',
    birthMonth: '',
    birthDate: '',
    birthYear: '',
    birthHour: '',
    birthMinute: '',
    birthPeriod: 'AM',
    birthPlace: ''
  });

  // Generate arrays for dropdowns
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  
  const dates = Array.from({ length: 31 }, (_, i) => (i + 1).toString());
  const years = Array.from({ length: 100 }, (_, i) => (new Date().getFullYear() - i).toString());
  const hours = Array.from({ length: 12 }, (_, i) => (i + 1).toString());
  const minutes = Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, '0'));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isFormValid()) {
      onSubmit(details);
    }
  };

  const isFormValid = () => {
    return details.name.trim() && 
           details.birthMonth && 
           details.birthDate && 
           details.birthYear &&
           details.birthHour && 
           details.birthMinute && 
           details.birthPlace.trim();
  };

  if (showResults) {
    return (
      <div className="rounded-xl border p-4 bg-white hover:shadow-md transition-shadow">
        <h2 className="font-semibold mb-3">Birth Details</h2>
        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <div><strong>Name:</strong> {details.name}</div>
          <div><strong>Birth Date:</strong> {details.birthMonth} {details.birthDate}, {details.birthYear}</div>
          <div><strong>Birth Time:</strong> {details.birthHour}:{details.birthMinute} {details.birthPeriod}</div>
          <div><strong>Birth Place:</strong> {details.birthPlace}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-xl border p-4 bg-white hover:shadow-md transition-shadow">
      <h2 className="font-semibold mb-3">
        {isPro ? 'Create Profile' : 'Enter Your Birth Details'}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Full Name *
          </label>
          <input
            type="text"
            value={details.name}
            onChange={(e) => setDetails({ ...details, name: e.target.value })}
            placeholder="Enter your full name"
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
            required
          />
        </div>

        {/* Birth Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Date of Birth *
          </label>
          <div className="grid grid-cols-3 gap-2">
            <select
              value={details.birthMonth}
              onChange={(e) => setDetails({ ...details, birthMonth: e.target.value })}
              className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
              required
            >
              <option value="">Month</option>
              {months.map((month, index) => (
                <option key={month} value={month}>{month}</option>
              ))}
            </select>
            <select
              value={details.birthDate}
              onChange={(e) => setDetails({ ...details, birthDate: e.target.value })}
              className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
              required
            >
              <option value="">Date</option>
              {dates.map(date => (
                <option key={date} value={date}>{date}</option>
              ))}
            </select>
            <select
              value={details.birthYear}
              onChange={(e) => setDetails({ ...details, birthYear: e.target.value })}
              className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
              required
            >
              <option value="">Year</option>
              {years.map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Birth Time */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Time of Birth *
          </label>
          <div className="grid grid-cols-4 gap-2">
            <select
              value={details.birthHour}
              onChange={(e) => setDetails({ ...details, birthHour: e.target.value })}
              className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
              required
            >
              <option value="">Hour</option>
              {hours.map(hour => (
                <option key={hour} value={hour}>{hour}</option>
              ))}
            </select>
            <select
              value={details.birthMinute}
              onChange={(e) => setDetails({ ...details, birthMinute: e.target.value })}
              className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
              required
            >
              <option value="">Minute</option>
              {minutes.map(minute => (
                <option key={minute} value={minute}>{minute}</option>
              ))}
            </select>
            <select
              value={details.birthPeriod}
              onChange={(e) => setDetails({ ...details, birthPeriod: e.target.value })}
              className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
              required
            >
              <option value="AM">AM</option>
              <option value="PM">PM</option>
            </select>
            <div></div> {/* Empty div for grid spacing */}
          </div>
        </div>

        {/* Birth Place */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Place of Birth *
          </label>
          <input
            type="text"
            value={details.birthPlace}
            onChange={(e) => setDetails({ ...details, birthPlace: e.target.value })}
            placeholder="City, State, Country"
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={!isFormValid()}
          className={`w-full rounded-lg px-4 py-3 font-medium transition-all ${
            isFormValid()
              ? isPro
                ? 'bg-black text-white hover:bg-gray-800'
                : 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          {isPro ? 'Generate Profile (uses 1 trial)' : 'Generate Free Mahadasha Analysis'}
        </button>
      </form>
    </div>
  );
}
