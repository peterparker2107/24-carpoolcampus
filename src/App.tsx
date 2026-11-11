import React, { useState, useEffect, useMemo } from 'react';
import { Header } from './components/Header';
import { StatsBento } from './components/StatsBento';
import { RideCard } from './components/RideCard';
import { RideBookingModal } from './components/RideBookingModal';
import { OfferRideModal } from './components/OfferRideModal';
import { FuelCostCalculator } from './components/FuelCostCalculator';
import { INITIAL_RIDES } from './data/mockRides';
import { CarpoolRide, RouteDestination, BookingTicket } from './types';
import { Search, Filter, Ticket, MapPin, Clock, ShieldCheck, Sparkles, AlertCircle } from 'lucide-react';

export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState<'find' | 'calculator' | 'bookings'>('find');
  const [rides, setRides] = useState<CarpoolRide[]>(INITIAL_RIDES);
  const [destinationFilter, setDestinationFilter] = useState<RouteDestination | 'All'>('All');
  const [girlsOnlyFilter, setGirlsOnlyFilter] = useState(false);
  const [search, setSearch] = useState('');

  // Selected ride for booking
  const [bookingRide, setBookingRide] = useState<CarpoolRide | null>(null);
  const [showOfferModal, setShowOfferModal] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Initial student boarding pass
  const [myTickets, setMyTickets] = useState<BookingTicket[]>([
    {
      ticketId: 'TCK-892401',
      rideId: 'ride-del-01',
      passengerRoll: '102303045',
      passengerName: 'Aarav Malhotra',
      destination: 'New Delhi — Kashmere Gate ISBT & Rajiv Chowk',
      departureTime: 'Friday, 5:30 PM',
      pickupLandmark: 'TIET Gate No. 1 (Main Gate)',
      costRupees: 380,
      bookedAt: 'Yesterday 8:40 PM'
    }
  ]);

  // Sync dark mode class
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Handle seat booking confirmation
  const handleConfirmBooking = (ticket: BookingTicket) => {
    setMyTickets((prev) => [ticket, ...prev]);

    // Decrement available seat in ride
    setRides((prev) =>
      prev.map((r) => {
        if (r.id === ticket.rideId) {
          return {
            ...r,
            availableSeats: Math.max(0, r.availableSeats - 1),
            bookedByRolls: [...r.bookedByRolls, ticket.passengerRoll]
          };
        }
        return r;
      })
    );

    setBookingRide(null);
    showToast(`Boarding Pass #${ticket.ticketId} issued! View it under 'My Bookings'.`);
  };

  // Handle offering a new ride
  const handleAddRide = (newRide: CarpoolRide) => {
    setRides((prev) => [newRide, ...prev]);
    showToast('Your weekend carpool has been published to verified TIET students!');
  };

  // Filtered rides list
  const filteredRides = useMemo(() => {
    return rides.filter((r) => {
      const matchesDest = destinationFilter === 'All' || r.routeCategory === destinationFilter;
      const matchesGirls = !girlsOnlyFilter || r.preferences.girlsOnly;
      const matchesSearch =
        r.destination.toLowerCase().includes(search.toLowerCase()) ||
        r.pickupLandmark.toLowerCase().includes(search.toLowerCase()) ||
        r.driverName.toLowerCase().includes(search.toLowerCase()) ||
        r.carModel.toLowerCase().includes(search.toLowerCase());
      return matchesDest && matchesGirls && matchesSearch;
    });
  }, [rides, destinationFilter, girlsOnlyFilter, search]);

  const availableSeatsCount = useMemo(
    () => rides.reduce((sum, r) => sum + r.availableSeats, 0),
    [rides]
  );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#090d16] text-slate-900 dark:text-slate-100 transition-colors duration-200">
      <Header
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        bookingsCount={myTickets.length}
        onOpenOfferModal={() => setShowOfferModal(true)}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Toast Alert */}
        {toastMessage && (
          <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-2xl bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-xl border border-slate-700 animate-slide-up text-xs font-semibold">
            <Sparkles className="w-4 h-4 text-blue-400" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Bento Stats */}
        <StatsBento
          totalRides={rides.length}
          availableSeatsCount={availableSeatsCount}
        />

        {/* Tab 1: Find Rides */}
        {activeTab === 'find' && (
          <div className="space-y-6">
            {/* Filter toolbar */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-sm space-y-3.5">
              <div className="flex flex-col md:flex-row items-center gap-3">
                <div className="flex-1 w-full relative">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search by destination (e.g. Kashmere Gate, Cyber City, Airport T3, Gate 1)..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                  />
                </div>

                <div className="flex items-center gap-2 w-full md:w-auto">
                  <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300 px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={girlsOnlyFilter}
                      onChange={(e) => setGirlsOnlyFilter(e.target.checked)}
                      className="rounded text-pink-600 focus:ring-pink-500"
                    />
                    <span>Girls-Only Pools</span>
                  </label>
                </div>
              </div>

              {/* Destination Pills */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-2 border-t border-slate-100 dark:border-slate-800/80 custom-scroll">
                {(['All', 'Delhi NCR', 'Chandigarh / Mohali', 'Gurugram', 'Ambala'] as const).map(
                  (dest) => (
                    <button
                      key={dest}
                      onClick={() => setDestinationFilter(dest)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                        destinationFilter === dest
                          ? 'bg-blue-600 text-white shadow-sm'
                          : 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900'
                      }`}
                    >
                      {dest}
                    </button>
                  )
                )}
              </div>
            </div>

            {/* Rides Grid */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 px-1">
                <span>Showing {filteredRides.length} student weekend carpools</span>
                <span>Verified TIET Patiala Departure Nodes</span>
              </div>

              {filteredRides.length === 0 ? (
                <div className="text-center py-12 rounded-2xl bg-white dark:bg-slate-900 border border-dashed border-slate-200 dark:border-slate-800 p-8">
                  <AlertCircle className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                    No rides found for this filter
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    Try clearing the destination filter or offer a ride yourself!
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {filteredRides.map((ride) => (
                    <RideCard
                      key={ride.id}
                      ride={ride}
                      onBookRide={(r) => setBookingRide(r)}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Tab 2: Fuel Split Calculator */}
        {activeTab === 'calculator' && <FuelCostCalculator />}

        {/* Tab 3: My Bookings & Boarding Passes */}
        {activeTab === 'bookings' && (
          <div className="space-y-6">
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80">
              <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Ticket className="w-5 h-5 text-blue-600" />
                Your Confirmed Boarding Passes ({myTickets.length})
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Present this digital pass at the campus gate pickup point before departure
              </p>
            </div>

            {myTickets.length === 0 ? (
              <div className="text-center py-16 rounded-2xl bg-white dark:bg-slate-900 border border-dashed border-slate-200 dark:border-slate-800 p-8">
                <Ticket className="w-8 h-8 text-slate-400 mx-auto mb-2 opacity-50" />
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                  No active ride bookings yet
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Book a seat on any Delhi or Chandigarh bound weekend ride to get your digital boarding pass.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {myTickets.map((t) => (
                  <div
                    key={t.ticketId}
                    className="p-6 rounded-3xl bg-white dark:bg-slate-900 border-2 border-blue-500/40 shadow-lg relative overflow-hidden"
                  >
                    <div className="flex items-start justify-between border-b border-slate-100 dark:border-slate-800 pb-4 mb-4">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 block">
                          TIET Transit Boarding Pass
                        </span>
                        <h3 className="font-mono text-lg font-bold text-slate-900 dark:text-white mt-0.5">
                          {t.ticketId}
                        </h3>
                      </div>
                      <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-300">
                        Seat Confirmed
                      </span>
                    </div>

                    <div className="space-y-2.5 text-xs">
                      <div>
                        <span className="text-slate-400 block text-[11px]">Passenger:</span>
                        <span className="font-bold text-slate-900 dark:text-white">
                          {t.passengerName} (Roll: {t.passengerRoll})
                        </span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[11px]">Pickup Point:</span>
                        <span className="font-semibold text-slate-800 dark:text-slate-200">
                          {t.pickupLandmark}
                        </span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[11px]">Destination:</span>
                        <span className="font-semibold text-slate-800 dark:text-slate-200">
                          {t.destination}
                        </span>
                      </div>
                      <div className="flex items-center justify-between border-t border-slate-100 dark:border-slate-800 pt-3">
                        <div>
                          <span className="text-slate-400 block text-[11px]">Departure:</span>
                          <span className="font-semibold text-blue-600 dark:text-blue-400">
                            {t.departureTime}
                          </span>
                        </div>
                        <div className="text-right">
                          <span className="text-slate-400 block text-[11px]">Fuel Share:</span>
                          <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400 text-base">
                            ₹{t.costRupees}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>

      {/* Booking Modal */}
      {bookingRide && (
        <RideBookingModal
          ride={bookingRide}
          onClose={() => setBookingRide(null)}
          onConfirmBooking={handleConfirmBooking}
        />
      )}

      {/* Offer Ride Modal */}
      {showOfferModal && (
        <OfferRideModal
          onClose={() => setShowOfferModal(false)}
          onAddRide={handleAddRide}
        />
      )}
    </div>
  );
}
