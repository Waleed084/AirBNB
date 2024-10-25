import prisma from "@/lib/prismadb";

interface IParams {
  listingId?: string;
  userId?: string;
  authorId?: string;
}

export default async function getReservation(params: IParams) {
  try {
    const { listingId, userId, authorId } = params;

    const query: any = {};

    if (listingId) {
      query.listingId = listingId;
    }

    if (userId) {
      query.userId = userId;
    }

    if (authorId) {
      // If authorId is provided, check for listings that belong to the author and match the listingId
      const listings = await prisma.listing.findMany({
        where: {
          userId: authorId, // Fetch listings for this author
        },
      });

      // Extract listing IDs to use in the reservation query
      const listingIds = listings.map((listing) => listing.id);
      
      // Update the query to match reservations with listings belonging to the author
      if (listingIds.length > 0) {
        query.listingId = { in: listingIds };
      } else {
        // If no listings found for this author, return an empty array
        return [];
      }
    }

    console.log("Query:", query);

    const reservation = await prisma.reservation.findMany({
      where: query,
      include: {
        listing: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    // Log the raw reservation data
    console.log("Reservations from DB:", reservation);
    const safeReservations = reservation.map((reservation) => ({
      ...reservation,
      createdAt: reservation.createdAt.toISOString(),
      startDate: reservation.startDate.toISOString(),
      endDate: reservation.endDate.toISOString(),
      listing: {
        ...reservation.listing,
        createdAt: reservation.listing.createdAt.toISOString(),
      },
    }));

    return safeReservations;
  } catch (error: any) {
    throw new Error(error.message);
  }
}
