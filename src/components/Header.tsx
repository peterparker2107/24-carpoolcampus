import React from 'react';
import { Car, Moon, Sun, MapPin, Plus, Calculator, Ticket, ShieldCheck } from 'lucide-react';

interface HeaderProps {
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
  activeTab: 'find' | 'calculator' | 'bookings';
  setActiveTab: (tab: 'find' | 'calculator' | 'bookings') => void;
  bookingsCount: number;
  onOpenOfferModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  darkMode,
  setDarkMode,
  activeTab,
  setActiveTab,
  bookingsCount,
  onOpenOfferModal
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 dark:border-slate-800/80 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-sm shadow-blue-500/20">
              <Car className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-lg tracking-tight text-slate-900 dark:text-white">CarpoolCampus</span>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300 border border-blue-300/40 dark:border-blue-700/40">
                  <span className="w-1.5 h-1.5 mr-1.5 rounded-full bg-blue-500 animate-pulse"></span>
                  TIET Weekend Pool Active
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 hidden sm:block">
                Patiala ↔ Delhi NCR & Chandigarh Verified Student Rideshare
              </p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="hidden md:flex items-center p-1 rounded-xl bg-slate-100/90 dark:bg-slate-800/80 border border-slate-200/60 dark:border-slate-700/60">
            <button
              onClick={() => setActiveTab('find')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'find'
                  ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Car className="w-3.5 h-3.5" />
              Find Rides
            </button>
            <button
              onClick={() => setActiveTab('calculator')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'calculator'
                  ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Calculator className="w-3.5 h-3.5" />
              Fuel & Toll Split Calculator
            </button>
            <button
              onClick={() => setActiveTab('bookings')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'bookings'
                  ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Ticket className="w-3.5 h-3.5" />
              My Bookings ({bookingsCount})
            </button>
          </nav>

          {/* CTAs */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={onOpenOfferModal}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white shadow-sm shadow-blue-600/30 transition-all hover:scale-[1.02]"
            >
              <Plus className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Offer a Ride</span>
            </button>

            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-lg border border-slate-200/80 dark:border-slate-800/80 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Toggle Theme"
            >
              {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <div className="md:hidden flex overflow-x-auto border-t border-slate-200/60 dark:border-slate-800/60 px-4 py-2 gap-2 custom-scroll">
        <button
          onClick={() => setActiveTab('find')}
          className={`flex-shrink-0 px-3 py-1 rounded-md text-xs font-medium ${
            activeTab === 'find' ? 'bg-blue-600 text-white' : 'text-slate-600 dark:text-slate-300'
          }`}
        >
          Find Rides
        </button>
        <button
          onClick={() => setActiveTab('calculator')}
          className={`flex-shrink-0 px-3 py-1 rounded-md text-xs font-medium ${
            activeTab === 'calculator' ? 'bg-blue-600 text-white' : 'text-slate-600 dark:text-slate-300'
          }`}
        >
          Split Calculator
        </button>
        <button
          onClick={() => setActiveTab('bookings')}
          className={`flex-shrink-0 px-3 py-1 rounded-md text-xs font-medium ${
            activeTab === 'bookings' ? 'bg-blue-600 text-white' : 'text-slate-600 dark:text-slate-300'
          }`}
        >
          Bookings ({bookingsCount})
        </button>
      </div>
    </header>
  );
};
