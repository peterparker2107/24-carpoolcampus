import React, { useState } from 'react';
import { CarpoolRide, BookingTicket } from '../types';
import { X, CheckCircle2, ShieldCheck, Clock, MapPin, IndianRupee, AlertCircle } from 'lucide-react';

interface RideBookingModalProps {
  ride: CarpoolRide;
  onClose: () => void;
  onConfirmBooking: (ticket: BookingTicket) => void;
}

export const RideBookingModal: React.FC<RideBookingModalProps> = ({
  ride,
  onClose,
  onConfirmBooking
}) => {
  const [passengerRoll, setPassengerRoll] = useState('');
  const [passengerName, setPassengerName] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [error, setError] = useState('');

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!passengerRoll.trim() || passengerRoll.trim().length < 6) {
      setError('Please provide a valid TIET Roll Number (e.g. 102303045)');
      return;
    }
    if (!passengerName.trim()) {
      setError('Please provide your name');
      return;
    }

    const ticket: BookingTicket = {
      ticketId: `TCK-${Date.now().toString().slice(-6)}`,
      rideId: ride.id,
      passengerRoll: passengerRoll.trim(),
      passengerName: passengerName.trim(),
      destination: ride.destination,
      departureTime: ride.departureTime,
      pickupLandmark: ride.pickupLandmark,
      costRupees: ride.costPerSeatRupees,
      bookedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    onConfirmBooking(ticket);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-lg w-full p-6 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Confirm Carpool Booking
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Driver: {ride.driverName} ({ride.carModel})
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Ride recap */}
        <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60 space-y-2 text-xs">
          <div className="flex justify-between">
            <span className="text-slate-500">Campus Pickup:</span>
            <span className="font-semibold text-slate-900 dark:text-white">
              {ride.pickupLandmark}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Destination:</span>
            <span className="font-semibold text-slate-900 dark:text-white truncate max-w-[240px]">
              {ride.destination}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Departure:</span>
            <span className="font-semibold text-blue-600 dark:text-blue-400">
              {ride.departureTime}
            </span>
          </div>
          <div className="flex justify-between border-t border-slate-200/60 dark:border-slate-700/60 pt-2">
            <span className="text-slate-500">Seat Share (Tolls Included):</span>
            <span className="font-mono font-bold text-sm text-emerald-600 dark:text-emerald-400">
              ₹{ride.costPerSeatRupees}
            </span>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleBooking} className="space-y-3.5">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Your Full Name
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Jasleen Kaur"
                value={passengerName}
                onChange={(e) => setPassengerName(e.target.value)}
                className="w-full px-3 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                TIET Roll Number
              </label>
              <input
                type="text"
                required
                placeholder="e.g. 102303045"
                value={passengerRoll}
                onChange={(e) => {
                  setPassengerRoll(e.target.value);
                  setError('');
                }}
                className="w-full px-3 py-2 font-mono rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              WhatsApp / Mobile Contact (for pickup coordination)
            </label>
            <input
              type="tel"
              required
              placeholder="e.g. +91 98765 43210"
              value={contactPhone}
              onChange={(e) => setContactPhone(e.target.value)}
              className="w-full px-3 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
            />
          </div>

          {error && <p className="text-xs text-rose-500">{error}</p>}

          <div className="flex items-center justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white shadow-sm shadow-blue-600/30"
            >
              Confirm & Issue Boarding Pass
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
