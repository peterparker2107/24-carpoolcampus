import React, { useState } from 'react';
import { Calculator, Fuel, IndianRupee, Users, ShieldCheck, TrendingDown, ArrowRight } from 'lucide-react';

export const FuelCostCalculator: React.FC = () => {
  const [distanceKm, setDistanceKm] = useState(250); // Patiala to Delhi default
  const [fuelType, setFuelType] = useState<'petrol' | 'diesel' | 'cng'>('petrol');
  const [fuelPrice, setFuelPrice] = useState(96.5);
  const [mileageKmPerL, setMileageKmPerL] = useState(16);
  const [tollCharges, setTollCharges] = useState(240);
  const [passengerCount, setPassengerCount] = useState(3);
  const [splitMode, setSplitMode] = useState<'even' | 'passengers_only'>('even');

  // Auto-update fuel price on type change
  const handleFuelTypeChange = (type: 'petrol' | 'diesel' | 'cng') => {
    setFuelType(type);
    if (type === 'petrol') setFuelPrice(96.5);
    else if (type === 'diesel') setFuelPrice(87.5);
    else setFuelPrice(82.0);
  };

  // Safe guarded calculations - strictly preventing NaN / Infinity on zero seats or 0 mileage
  const safeMileage = Number(mileageKmPerL) > 0 ? Number(mileageKmPerL) : 1;
  const safeDistance = Number(distanceKm) > 0 ? Number(distanceKm) : 0;
  const safePrice = Number(fuelPrice) > 0 ? Number(fuelPrice) : 0;
  const safeTolls = Number(tollCharges) > 0 ? Number(tollCharges) : 0;

  const rawFuelLiters = safeDistance / safeMileage;
  const fuelLiters = isFinite(rawFuelLiters) && !isNaN(rawFuelLiters) ? rawFuelLiters : 0;
  const totalFuelCost = isFinite(fuelLiters * safePrice) ? fuelLiters * safePrice : 0;
  const totalTripCost = totalFuelCost + safeTolls;

  // Even split: Driver + Co-passengers
  const totalSharingPeople = Math.max(1, (Number(passengerCount) || 0) + 1);
  const rawCostEven = totalSharingPeople > 0 ? totalTripCost / totalSharingPeople : 0;
  const costPerPersonEven = isFinite(rawCostEven) && !isNaN(rawCostEven) ? Math.round(rawCostEven) : 0;

  // Passenger-only split (driver travels free, passengers pool): strictly guarded against 0 seats
  const rawCostPassengerOnly = passengerCount > 0 ? totalTripCost / passengerCount : 0;
  const costPerPassengerOnly = isFinite(rawCostPassengerOnly) && !isNaN(rawCostPassengerOnly) ? Math.round(rawCostPassengerOnly) : 0;

  const costPerPerson = splitMode === 'even' ? costPerPersonEven : costPerPassengerOnly;

  const shatabdiCost = distanceKm > 150 ? 850 : 350;
  const savingsVsTrain = passengerCount > 0 ? Math.max(0, shatabdiCost - costPerPerson) : 0;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-base font-bold text-slate-900 dark:text-white">
          Interactive Fuel & Toll Split Calculator
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Transparent student fare algorithm based on live Punjab/Haryana pump rates and NH-44 tolls
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Controls */}
        <div className="lg:col-span-7 p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-sm space-y-6">
          {/* Preset Buttons */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-500">Popular TIET Routes:</span>
            <button
              onClick={() => {
                setDistanceKm(250);
                setTollCharges(240);
              }}
              className="px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300"
            >
              Patiala ↔ Delhi (250 km)
            </button>
            <button
              onClick={() => {
                setDistanceKm(68);
                setTollCharges(0);
              }}
              className="px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300"
            >
              Patiala ↔ Chandigarh (68 km)
            </button>
          </div>

          {/* Distance Slider */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                One-Way Distance
              </label>
              <span className="font-mono text-sm font-bold text-blue-600 dark:text-blue-400 px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800">
                {distanceKm} km
              </span>
            </div>
            <input
              type="range"
              min={40}
              max={350}
              step={5}
              value={distanceKm}
              onChange={(e) => setDistanceKm(parseInt(e.target.value))}
              className="w-full accent-blue-600 cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-slate-400 font-mono">
              <span>40 km (Ambala)</span>
              <span>68 km (CHD)</span>
              <span>250 km (Delhi)</span>
              <span>320 km (Gurugram)</span>
            </div>
          </div>

          {/* Fuel Type & Rate */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Fuel Type
              </label>
              <div className="flex rounded-xl bg-slate-100 dark:bg-slate-800 p-1 border border-slate-200 dark:border-slate-700">
                {(['petrol', 'diesel', 'cng'] as const).map((type) => (
                  <button
                    key={type}
                    onClick={() => handleFuelTypeChange(type)}
                    className={`flex-1 py-1 rounded-lg text-xs font-semibold capitalize transition-all ${
                      fuelType === type
                        ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-sm'
                        : 'text-slate-500'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Fuel Price (₹ / unit)
              </label>
              <input
                type="number"
                step={0.5}
                value={fuelPrice}
                onChange={(e) => setFuelPrice(parseFloat(e.target.value) || 0)}
                className="w-full px-3 py-1.5 font-mono text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
              />
            </div>
          </div>

          {/* Mileage & Tolls */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Car Mileage (km / L)
              </label>
              <input
                type="number"
                min={8}
                max={30}
                value={mileageKmPerL}
                onChange={(e) => setMileageKmPerL(parseFloat(e.target.value) || 1)}
                className="w-full px-3 py-1.5 font-mono text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Highway Tolls (₹)
              </label>
              <input
                type="number"
                step={10}
                value={tollCharges}
                onChange={(e) => setTollCharges(parseInt(e.target.value) || 0)}
                className="w-full px-3 py-1.5 font-mono text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
              />
            </div>
          </div>

          {/* Passenger Count */}
          <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Number of Co-Passengers Pooling
              </label>
              <span className="font-mono text-xs font-bold text-slate-900 dark:text-white">
                {passengerCount === 0
                  ? '0 Co-Passengers (Solo Driver)'
                  : `${passengerCount} Students (+ 1 Driver = ${totalSharingPeople} total)`}
              </span>
            </div>

            {/* Split Mode Selector */}
            <div className="flex items-center gap-2 p-1 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs">
              <button
                type="button"
                onClick={() => setSplitMode('even')}
                className={`flex-1 py-1 rounded-lg text-xs font-semibold transition-all ${
                  splitMode === 'even'
                    ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-sm'
                    : 'text-slate-500'
                }`}
              >
                Split: Driver + Passengers
              </button>
              <button
                type="button"
                onClick={() => setSplitMode('passengers_only')}
                className={`flex-1 py-1 rounded-lg text-xs font-semibold transition-all ${
                  splitMode === 'passengers_only'
                    ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-sm'
                    : 'text-slate-500'
                }`}
              >
                Split: Passengers Only
              </button>
            </div>

            <div className="grid grid-cols-5 gap-2 pt-1">
              {[0, 1, 2, 3, 4].map((count) => (
                <button
                  key={count}
                  type="button"
                  onClick={() => setPassengerCount(count)}
                  className={`py-2 rounded-xl text-xs font-semibold transition-all ${
                    passengerCount === count
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                  }`}
                >
                  {count === 0 ? '0 (Solo)' : `${count} Seat${count > 1 ? 's' : ''}`}
                </button>
              ))}
            </div>
            {passengerCount === 0 && (
              <p className="text-[11px] text-amber-600 dark:text-amber-400 font-medium bg-amber-50 dark:bg-amber-950/40 p-2 rounded-lg border border-amber-200 dark:border-amber-900/40">
                0 passenger seats: Driver bears full trip cost (₹{Math.round(totalTripCost)}). Shared per-passenger fare evaluates safely to ₹0 (no division by zero).
              </p>
            )}
          </div>
        </div>

        {/* Breakdown Output Card */}
        <div className="lg:col-span-5 flex flex-col justify-between p-6 rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white shadow-xl shadow-blue-700/20">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="p-2 rounded-xl bg-white/20 backdrop-blur-md">
                <Calculator className="w-5 h-5 text-blue-100" />
              </span>
              <div>
                <span className="text-xs font-medium text-blue-100 uppercase tracking-wider block">
                  Fair Split Breakdown
                </span>
                <h3 className="text-lg font-bold">Per-Student Fair Share</h3>
              </div>
            </div>

            <div className="space-y-4 my-6">
              {/* Cost Per Person Big Callout */}
              <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20">
                <span className="text-xs text-blue-100 block">
                  {passengerCount === 0
                    ? 'Total Solo Trip Cost (0 Seats Shared)'
                    : splitMode === 'passengers_only'
                    ? 'Passenger Pool Fare (Excl. Driver)'
                    : 'Recommended Fare Per Passenger'}
                </span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-4xl font-mono font-extrabold tracking-tight">
                    ₹{passengerCount === 0 && splitMode === 'passengers_only' ? 0 : passengerCount === 0 ? Math.round(totalTripCost) : costPerPerson}
                  </span>
                  <span className="text-xs text-blue-200">
                    {passengerCount === 0 ? '/ total trip' : '/ person (all inclusive)'}
                  </span>
                </div>
              </div>

              {/* Trip Cost Details */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20">
                  <span className="text-[10px] uppercase text-blue-200 block">
                    Total Fuel Needed
                  </span>
                  <span className="font-mono text-base font-bold mt-0.5 block">
                    {fuelLiters.toFixed(1)} Liters
                  </span>
                </div>
                <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20">
                  <span className="text-[10px] uppercase text-blue-200 block">
                    Total Fuel Cost
                  </span>
                  <span className="font-mono text-base font-bold mt-0.5 block">
                    ₹{Math.round(totalFuelCost)}
                  </span>
                </div>
              </div>

              {/* Savings vs train */}
              <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20">
                <TrendingDown className="w-5 h-5 text-emerald-300 shrink-0" />
                <div className="text-xs">
                  <span className="font-bold text-white block">
                    Saves ~₹{savingsVsTrain} vs Shatabdi Train
                  </span>
                  <span className="text-blue-200 text-[11px]">
                    Direct campus gate departure to doorstep
                  </span>
                </div>
              </div>
            </div>
          </div>

          <p className="text-[11px] text-blue-100/80 border-t border-white/20 pt-3">
            Zero commission • 100% peer-to-peer fuel compensation
          </p>
        </div>
      </div>
    </div>
  );
};
