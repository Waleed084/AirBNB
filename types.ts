// Define types for MongoDB models

export type SafeListing = {
  _id: string;  // MongoDB ObjectId in string format
  title: string;
  description: string;
  imageSrc: string;
  createdAt: string; // MongoDB stores dates as ISO strings, similar to Prisma
  category: string;
  roomCount: number;
  bathroomCount: number;
  guestCount: number;
  locationValue: string;
  userId: string; // This would be a reference to the User model
  price: number;
  area: number;
  crewCount?: number; // Optional, if it's not always present
  minimumBookingLength: number;
  reservations: string[]; // Array of reservation IDs
};

export type SafeReservation = {
  _id: string;  // MongoDB ObjectId in string format
  userId: string; // Reference to the User model
  listingId: string; // Reference to the Listing model
  startDate: string; // MongoDB stores dates as ISO strings
  endDate: string;
  createdAt: string;
  listing: SafeListing; // Populate the listing data
};

export type SafeUser = {
  _id: string;  // MongoDB ObjectId in string format
  name: string;
  email: string;
  hashedPassword: string;
  createdAt: string;
  updatedAt: string;
  emailVerified: string | null; // Optional if email verification is used
};
