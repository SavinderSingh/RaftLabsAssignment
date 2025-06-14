export interface BookingInterface {
  id: string;
  propertyId: string;
  propertyImage?: string;
  userId: string;
  checkIn: string; // ISO date string
  checkOut: string; // ISO date string
  status: "confirmed" | "pending" | "cancelled"; // Add more statuses if needed
}
