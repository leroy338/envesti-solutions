"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar, Clock, User, Mail, Phone, MessageSquare } from "lucide-react";

export default function ScheduleMeetingPage() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    message: ""
  });

  const timeSlots = [
    "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
    "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM"
  ];

  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (month: number, year: number) => {
    return new Date(year, month, 1).getDay();
  };

  const generateCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentMonth, currentYear);
    const firstDayOfMonth = getFirstDayOfMonth(currentMonth, currentYear);
    const days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="h-12 w-12"></div>);
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentYear, currentMonth, day);
      const isToday = date.toDateString() === currentDate.toDateString();
      const isSelected = selectedDate && date.toDateString() === selectedDate.toDateString();
      const isPast = date < new Date(currentDate.setHours(0, 0, 0, 0));

      days.push(
        <button
          key={day}
          onClick={() => !isPast && setSelectedDate(date)}
          disabled={isPast}
          className={`
            h-12 w-12 rounded-lg text-sm font-medium transition-colors
            ${isPast 
              ? 'text-gray-300 cursor-not-allowed' 
              : 'hover:bg-green-100 cursor-pointer'
            }
            ${isToday 
              ? 'bg-green-500 text-white hover:bg-green-600' 
              : ''
            }
            ${isSelected && !isToday 
              ? 'bg-green-200 text-green-800 hover:bg-green-300' 
              : ''
            }
            ${!isSelected && !isToday && !isPast 
              ? 'text-gray-700 hover:text-green-700' 
              : ''
            }
          `}
        >
          {day}
        </button>
      );
    }

    return days;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedDate && selectedTime) {
      // Handle form submission here
      console.log("Scheduling consultation for:", selectedDate, selectedTime, formData);
      // You can add your form submission logic here
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Schedule a Consultation
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Book a personalized consultation with our team to discuss your training and development needs.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left Side - Calendar & Time Selection */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center gap-3">
                <Calendar size={28} className="text-green-600" />
                Select Date & Time
              </h2>
              
              {/* Month/Year Header */}
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900">
                  {new Date(currentYear, currentMonth).toLocaleDateString('en-US', { 
                    month: 'long', 
                    year: 'numeric' 
                  })}
                </h3>
              </div>

              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-2 mb-8">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                  <div key={day} className="h-12 flex items-center justify-center text-sm font-semibold text-gray-500">
                    {day}
                  </div>
                ))}
                {generateCalendarDays()}
              </div>
            </div>

            {/* Time Selection */}
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-3">
                <Clock size={24} className="text-green-600" />
                Available Times
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {timeSlots.map((time) => (
                  <button
                    key={time}
                    onClick={() => setSelectedTime(time)}
                    className={`
                      py-3 px-4 rounded-lg text-sm font-medium transition-colors
                      ${selectedTime === time
                        ? 'bg-green-500 text-white shadow-md'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }
                    `}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side - Contact Form */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center gap-3">
              <User size={28} className="text-green-600" />
              Your Information
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-sm font-medium text-gray-700">
                    First Name *
                  </Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    type="text"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="h-11"
                    placeholder="Enter first name"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-sm font-medium text-gray-700">
                    Last Name *
                  </Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    type="text"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="h-11"
                    placeholder="Enter last name"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <Mail size={16} className="text-green-600" />
                  Email Address *
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="h-11"
                  placeholder="Enter email address"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <Phone size={16} className="text-green-600" />
                  Phone Number
                </Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="h-11"
                  placeholder="Enter phone number"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="company" className="text-sm font-medium text-gray-700">
                  Company
                </Label>
                <Input
                  id="company"
                  name="company"
                  type="text"
                  value={formData.company}
                  onChange={handleInputChange}
                  className="h-11"
                  placeholder="Enter company name"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="message" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <MessageSquare size={16} className="text-green-600" />
                  Additional Information
                </Label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                  placeholder="Tell us about your training needs or any specific questions..."
                />
              </div>
              
              <Button
                type="submit"
                disabled={!selectedDate || !selectedTime}
                className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 text-lg h-12 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Schedule Consultation
              </Button>
            </form>
          </div>
        </div>

        {/* Selected Date & Time Display */}
        {(selectedDate || selectedTime) && (
          <div className="mt-8 bg-white rounded-xl shadow-lg p-6 text-center">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Selected Appointment</h3>
            <div className="flex items-center justify-center gap-8 text-gray-600">
              {selectedDate && (
                <div className="flex items-center gap-2">
                  <Calendar size={20} className="text-green-600" />
                  <span>{selectedDate.toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}</span>
                </div>
              )}
              {selectedTime && (
                <div className="flex items-center gap-2">
                  <Clock size={20} className="text-green-600" />
                  <span>{selectedTime}</span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
