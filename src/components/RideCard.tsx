import React from 'react';
import { CarpoolRide } from '../types';
import {
  MapPin,
  Clock,
  Car,
  ShieldCheck,
  Star,
  Users,
  Luggage,
  Sparkles,
  Music,
  Wind,
  Ban,
  CheckCircle2,
  ChevronRight
} from 'lucide-react';

interface RideCardProps {
  ride: CarpoolRide;
  onBookRide: (ride: CarpoolRide) => void;
}

export const RideCard: React.FC<RideCardProps> = ({ ride, onBookRide }) => {
  return (
    <div className="flex flex-col justify-between p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-sm hover:border-blue-300 dark:hover:border-blue-700/60 transition-all hover:shadow-md">
      <div>
        {/* Top Driver Row */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-950 flex items-center justify-center font-bold text-sm text-blue-600 dark:text-blue-400">
              {ride.driverName.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                  {ride.driverName}
                </h3>
                {ride.driverVerified && (
                  <span className="flex items-center gap-0.5 px-1.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-300/40">
                    <ShieldCheck className="w-3 h-3 text-emerald-500" />
                    TIET Verified
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-mono text-[11px]">
                Roll: {ride.driverRoll} • {ride.driverDept} (Yr {ride.driverYear})
              </p>
            </div>
          </div>

          {/* Trust Score */}
          <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/60 text-amber-700 dark:text-amber-300 text-xs font-mono font-bold">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span>{ride.driverTrustScore}</span>
          </div>
        </div>

        {/* Route Details */}
        <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-800/60 space-y-2 mb-3">
          <div className="flex items-center gap-2 text-xs">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-600 shrink-0"></span>
            <span className="text-slate-500 dark:text-slate-400">Pickup:</span>
            <span className="font-semibold text-slate-900 dark:text-white truncate">
              {ride.pickupLandmark}
            </span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 shrink-0"></span>
            <span className="text-slate-500 dark:text-slate-400">Destination:</span>
            <span className="font-semibold text-slate-900 dark:text-white truncate">
              {ride.destination}
            </span>
          </div>
        </div>

        {/* Departure Time & Vehicle */}
        <div className="grid grid-cols-2 gap-2 text-xs mb-3">
          <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400">
            <Clock className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0" />
            <span className="font-medium truncate">{ride.departureTime}</span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400">
            <Car className="w-3.5 h-3.5 text-slate-500 shrink-0" />
            <span className="truncate">{ride.carModel}</span>
          </div>
        </div>

        {/* Preferences & Badges */}
        <div className="flex flex-wrap items-center gap-1.5 text-[11px] mb-4">
          {ride.preferences.girlsOnly && (
            <span className="px-2 py-0.5 rounded-md font-semibold bg-pink-100 text-pink-700 dark:bg-pink-950 dark:text-pink-300 border border-pink-200 dark:border-pink-800">
              Girls-Only Pool
            </span>
          )}
          {ride.preferences.acOn && (
            <span className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
              <Wind className="w-3 h-3 text-cyan-500" /> AC On
            </span>
          )}
          {ride.preferences.nonSmoking && (
            <span className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
              <Ban className="w-3 h-3 text-rose-500" /> Non-Smoking
            </span>
          )}
          <span className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
            <Music className="w-3 h-3 text-purple-500" /> {ride.preferences.music}
          </span>
          <span className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
            <Luggage className="w-3 h-3 text-amber-500" /> {ride.luggageLimit}
          </span>
        </div>
      </div>

      {/* Footer: Price & Booking CTA */}
      <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
        <div>
          <div className="flex items-baseline gap-1">
            <span className="font-mono text-2xl font-bold text-slate-900 dark:text-white">
              ₹{ride.costPerSeatRupees}
            </span>
            <span className="text-xs text-slate-400">/ seat</span>
          </div>
          <span className="text-[11px] text-slate-400">
            {ride.availableSeats} of {ride.totalSeats} seats open
          </span>
        </div>

        <button
          onClick={() => onBookRide(ride)}
          disabled={ride.availableSeats <= 0}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold shadow-sm transition-all ${
            ride.availableSeats > 0
              ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-600/30 hover:scale-[1.02]'
              : 'bg-slate-200 dark:bg-slate-800 text-slate-400 cursor-not-allowed'
          }`}
        >
          <span>{ride.availableSeats > 0 ? 'Book Seat' : 'Fully Booked'}</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
