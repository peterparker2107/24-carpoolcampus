import React from 'react';
import { Car, IndianRupee, ShieldCheck, Leaf, Users, CheckCircle2 } from 'lucide-react';

interface StatsBentoProps {
  totalRides: number;
  availableSeatsCount: number;
}

export const StatsBento: React.FC<StatsBentoProps> = ({ totalRides, availableSeatsCount }) => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 mb-8">
      {/* Tile 1 */}
      <div className="relative overflow-hidden rounded-2xl p-4 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-sm transition-all hover:shadow-md">
        <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-2">
          <span className="text-xs font-medium uppercase tracking-wider">Active Weekend Pools</span>
          <span className="p-1.5 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400">
            <Car className="w-4 h-4" />
          </span>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl sm:text-3xl font-bold tracking-tight font-mono text-slate-900 dark:text-white">
            28
          </span>
          <span className="text-xs font-medium text-blue-600 dark:text-blue-400">
            {availableSeatsCount} Seats Left
          </span>
        </div>
        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
          Departing Fri evening & Sat morning
        </p>
      </div>

      {/* Tile 2 */}
      <div className="relative overflow-hidden rounded-2xl p-4 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-sm transition-all hover:shadow-md">
        <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-2">
          <span className="text-xs font-medium uppercase tracking-wider">Avg Delhi NCR Fare</span>
          <span className="p-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400">
            <IndianRupee className="w-4 h-4" />
          </span>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl sm:text-3xl font-bold tracking-tight font-mono text-emerald-600 dark:text-emerald-400">
            ₹380
          </span>
          <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
            vs ₹850 Shatabdi
          </span>
        </div>
        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
          Doorstep drop with AC & Tolls included
        </p>
      </div>

      {/* Tile 3 */}
      <div className="relative overflow-hidden rounded-2xl p-4 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-sm transition-all hover:shadow-md">
        <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-2">
          <span className="text-xs font-medium uppercase tracking-wider">TIET Student Trust</span>
          <span className="p-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">
            <ShieldCheck className="w-4 h-4" />
          </span>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl sm:text-3xl font-bold tracking-tight font-mono text-slate-900 dark:text-white">
            142
          </span>
          <span className="text-xs px-1.5 py-0.5 rounded bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 font-mono text-[11px]">
            Roll Verified
          </span>
        </div>
        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
          Strict TIET email & roll authentication
        </p>
      </div>

      {/* Tile 4 */}
      <div className="relative overflow-hidden rounded-2xl p-4 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-sm transition-all hover:shadow-md">
        <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-2">
          <span className="text-xs font-medium uppercase tracking-wider">CO2 Saved</span>
          <span className="p-1.5 rounded-lg bg-teal-50 dark:bg-teal-950/60 text-teal-600 dark:text-teal-400">
            <Leaf className="w-4 h-4" />
          </span>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl sm:text-3xl font-bold tracking-tight font-mono text-slate-900 dark:text-white">
            4.8 Tons
          </span>
        </div>
        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
          320+ solo car runs eliminated this term
        </p>
      </div>
    </div>
  );
};
