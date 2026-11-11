import React, { useState } from 'react';
import { CarpoolRide, PickupLandmark, RouteDestination, LuggageCapacity } from '../types';
import { X, Car, Plus, ShieldCheck } from 'lucide-react';

interface OfferRideModalProps {
  onClose: () => void;
  onAddRide: (ride: CarpoolRide) => void;
}

export const OfferRideModal: React.FC<OfferRideModalProps> = ({ onClose, onAddRide }) => {
  const [driverName, setDriverName] = useState('');
  const [driverRoll, setDriverRoll] = useState('');
  const [driverDept, setDriverDept] = useState('CSE');
  const [carModel, setCarModel] = useState('');
  const [destination, setDestination] = useState('');
  const [routeCategory, setRouteCategory] = useState<RouteDestination>('Delhi NCR');
  const [pickupLandmark, setPickupLandmark] = useState<PickupLandmark>('TIET Gate No. 1 (Main Gate)');
  const [departureTime, setDepartureTime] = useState('Friday, 5:30 PM');
  const [totalSeats, setTotalSeats] = useState(3);
  const [costPerSeat, setCostPerSeat] = useState(380);
  const [luggageLimit, setLuggageLimit] = useState<LuggageCapacity>('1 Medium Trolley');
  const [music, setMusic] = useState<'Punjabi Hits' | 'Indie & Lofi' | 'Silent Drive' | 'Pop & Rock'>('Indie & Lofi');
  const [nonSmoking, setNonSmoking] = useState(true);
  const [acOn, setAcOn] = useState(true);
  const [girlsOnly, setGirlsOnly] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!driverName.trim() || !driverRoll.trim() || !destination.trim() || !carModel.trim()) return;

    const newRide: CarpoolRide = {
      id: `ride-${Date.now()}`,
      driverName: driverName.trim(),
      driverRoll: driverRoll.trim(),
      driverDept,
      driverYear: 3,
      driverTrustScore: 5.0,
      driverVerified: true,
      carModel: carModel.trim(),
      departureTime,
      pickupLandmark,
      destination: destination.trim(),
      routeCategory,
      totalSeats,
      availableSeats: totalSeats,
      costPerSeatRupees: costPerSeat,
      distanceKm: routeCategory === 'Delhi NCR' ? 250 : routeCategory === 'Chandigarh / Mohali' ? 65 : 275,
      luggageLimit,
      preferences: {
        nonSmoking,
        acOn,
        music,
        girlsOnly
      },
      bookedByRolls: [],
      tollsIncluded: true
    };

    onAddRide(newRide);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-xl w-full max-h-[90vh] flex flex-col border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden">
        <div className="p-5 border-b border-slate-200/80 dark:border-slate-800/80 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400">
              <Car className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Post a Campus Carpool Ride
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Share fuel costs with verified TIET peers
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

        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4 custom-scroll">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Your Full Name
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Kabir Vohra"
                value={driverName}
                onChange={(e) => setDriverName(e.target.value)}
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
                placeholder="e.g. 102203112"
                value={driverRoll}
                onChange={(e) => setDriverRoll(e.target.value)}
                className="w-full px-3 py-2 font-mono rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Vehicle Make & Model
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Hyundai Creta / Honda City"
                value={carModel}
                onChange={(e) => setCarModel(e.target.value)}
                className="w-full px-3 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Route Category
              </label>
              <select
                value={routeCategory}
                onChange={(e) => setRouteCategory(e.target.value as RouteDestination)}
                className="w-full px-3 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
              >
                <option value="Delhi NCR">Delhi NCR</option>
                <option value="Chandigarh / Mohali">Chandigarh / Mohali</option>
                <option value="Gurugram">Gurugram</option>
                <option value="Ambala">Ambala</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Campus Pickup Landmark
            </label>
            <select
              value={pickupLandmark}
              onChange={(e) => setPickupLandmark(e.target.value as PickupLandmark)}
              className="w-full px-3 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
            >
              <option value="TIET Gate No. 1 (Main Gate)">TIET Gate No. 1 (Main Gate)</option>
              <option value="TIET Gate No. 2 (Bhadson Road)">TIET Gate No. 2 (Bhadson Road)</option>
              <option value="Nirman Chowk">Nirman Chowk</option>
              <option value="COS Complex">COS Complex</option>
              <option value="GGS Hostel Circle">GGS Hostel Circle</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Exact Drop Location & Route
            </label>
            <input
              type="text"
              required
              placeholder="e.g. New Delhi — Kashmere Gate ISBT & Rajiv Chowk"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="w-full px-3 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
            />
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Departure Time
              </label>
              <input
                type="text"
                required
                placeholder="Friday, 5:30 PM"
                value={departureTime}
                onChange={(e) => setDepartureTime(e.target.value)}
                className="w-full px-3 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Seats Offered
              </label>
              <input
                type="number"
                min={1}
                max={4}
                value={totalSeats}
                onChange={(e) => setTotalSeats(parseInt(e.target.value))}
                className="w-full px-3 py-2 font-mono rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Fare / Seat (₹)
              </label>
              <input
                type="number"
                min={50}
                step={10}
                value={costPerSeat}
                onChange={(e) => setCostPerSeat(parseInt(e.target.value))}
                className="w-full px-3 py-2 font-mono rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
              />
            </div>
          </div>

          {/* Preferences */}
          <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex flex-wrap gap-4 text-xs">
            <label className="flex items-center gap-2 cursor-pointer text-slate-700 dark:text-slate-300">
              <input
                type="checkbox"
                checked={nonSmoking}
                onChange={(e) => setNonSmoking(e.target.checked)}
                className="rounded text-blue-600 focus:ring-blue-500"
              />
              Non-Smoking
            </label>
            <label className="flex items-center gap-2 cursor-pointer text-slate-700 dark:text-slate-300">
              <input
                type="checkbox"
                checked={acOn}
                onChange={(e) => setAcOn(e.target.checked)}
                className="rounded text-blue-600 focus:ring-blue-500"
              />
              Air Conditioning On
            </label>
            <label className="flex items-center gap-2 cursor-pointer text-slate-700 dark:text-slate-300">
              <input
                type="checkbox"
                checked={girlsOnly}
                onChange={(e) => setGirlsOnly(e.target.checked)}
                className="rounded text-pink-600 focus:ring-pink-500"
              />
              Girls-Only Carpool
            </label>
          </div>

          <div className="flex items-center justify-end gap-2 pt-3">
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
              Publish Ride
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
