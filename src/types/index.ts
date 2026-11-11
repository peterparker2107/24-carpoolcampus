export type RouteDestination = 'Delhi NCR' | 'Chandigarh / Mohali' | 'Gurugram' | 'Ambala';

export type PickupLandmark =
  | 'TIET Gate No. 1 (Main Gate)'
  | 'TIET Gate No. 2 (Bhadson Road)'
  | 'Nirman Chowk'
  | 'COS Complex'
  | 'GGS Hostel Circle';

export type LuggageCapacity = 'Backpack only' | '1 Medium Trolley' | 'Large Suitcase + Bag';

export interface CarpoolRide {
  id: string;
  driverName: string;
  driverRoll: string;
  driverDept: string;
  driverYear: number;
  driverTrustScore: number;
  driverVerified: boolean;
  carModel: string;
  departureTime: string;
  pickupLandmark: PickupLandmark;
  destination: string;
  routeCategory: RouteDestination;
  totalSeats: number;
  availableSeats: number;
  costPerSeatRupees: number;
  distanceKm: number;
  luggageLimit: LuggageCapacity;
  preferences: {
    nonSmoking: boolean;
    acOn: boolean;
    music: 'Punjabi Hits' | 'Indie & Lofi' | 'Silent Drive' | 'Pop & Rock';
    girlsOnly: boolean;
  };
  bookedByRolls: string[];
  tollsIncluded: boolean;
}

export interface BookingTicket {
  ticketId: string;
  rideId: string;
  passengerRoll: string;
  passengerName: string;
  destination: string;
  departureTime: string;
  pickupLandmark: string;
  costRupees: number;
  bookedAt: string;
}
