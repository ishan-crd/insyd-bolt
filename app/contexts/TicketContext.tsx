import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  clearAllBookings,
  createBooking,
  deleteBooking,
  getUserBookings,
  updateBookingCounts,
} from "../../services/bookingService";

export type VenueType = "playboy" | "privee" | "clubBw" | string;

export interface TicketItem {
  venue: VenueType | string;
  name: string;
  location?: string;
  date: string;
  men: number;
  women: number;
  totalPrice: number;
  id: string; // Backend booking ID
  backendId?: number; // Store the actual database ID
  status?: string;
}

interface TicketContextType {
  tickets: TicketItem[];
  loading: boolean;
  addTicket: (ticket: Omit<TicketItem, "id">) => Promise<boolean>;
  removeTicket: (ticketId: string) => Promise<boolean>;
  clearAllTickets: () => Promise<boolean>;
  updateTicketCount: (
    ticketId: string,
    gender: "men" | "women",
    increment: boolean
  ) => Promise<boolean>;
  refreshTickets: () => Promise<void>;
}

const TicketContext = createContext<TicketContextType | undefined>(undefined);

export function TicketProvider({ children }: { children: ReactNode }) {
  const [tickets, setTickets] = useState<TicketItem[]>([]);
  const [loading, setLoading] = useState(false);

  // Load tickets when provider mounts
  useEffect(() => {
    loadTicketsFromBackend();
  }, []);

  const loadTicketsFromBackend = async () => {
    try {
      setLoading(true);
      console.log("🔄 Loading tickets from backend...");

      const result = await getUserBookings();

      if (result.success && result.data) {
        const backendTickets: TicketItem[] = result.data.map(
          (booking: any) => ({
            id: booking.id.toString(), // Use backend ID as string
            backendId: booking.id, // Store original numeric ID
            venue: booking.club_id.toString(),
            name: booking.clubs?.name || "Unknown Club",
            location: booking.clubs?.location || "",
            date: booking.booking_date,
            men: booking.men_count,
            women: booking.women_count,
            totalPrice: booking.total_price,
            status: booking.status,
          })
        );

        console.log("✅ Tickets loaded from backend:", backendTickets.length);
        setTickets(backendTickets);
      } else {
        console.log("ℹ️ No tickets found or error:", result.error);
        setTickets([]);
      }
    } catch (error) {
      console.error("Exception loading tickets:", error);
      setTickets([]);
    } finally {
      setLoading(false);
    }
  };

  const addTicket = async (
    newTicket: Omit<TicketItem, "id">
  ): Promise<boolean> => {
    try {
      setLoading(true);
      console.log("🎫 Adding ticket to backend:", newTicket);

      // Check if a ticket for the same venue and date already exists
      const existingTicket = tickets.find(
        (ticket) =>
          ticket.venue === newTicket.venue && ticket.date === newTicket.date
      );

      if (existingTicket) {
        // Update existing ticket by combining counts
        const newMenCount = existingTicket.men + newTicket.men;
        const newWomenCount = existingTicket.women + newTicket.women;

        const updateResult = await updateBookingCounts(
          existingTicket.backendId!,
          newMenCount,
          newWomenCount
        );

        if (updateResult.success) {
          // Update local state
          setTickets((prev) =>
            prev.map((ticket) =>
              ticket.id === existingTicket.id
                ? {
                    ...ticket,
                    men: newMenCount,
                    women: newWomenCount,
                    totalPrice: (newMenCount + newWomenCount) * 1000,
                  }
                : ticket
            )
          );
          console.log("✅ Existing ticket updated successfully");
          return true;
        } else {
          console.error(
            "❌ Failed to update existing ticket:",
            updateResult.error
          );
          return false;
        }
      } else {
        // Create new booking
        const bookingData = {
          venue: newTicket.venue,
          date: newTicket.date,
          men: newTicket.men,
          women: newTicket.women,
          totalPrice: newTicket.totalPrice,
        };

        const result = await createBooking(bookingData);

        if (result.success && result.data) {
          // Add to local state
          const newLocalTicket: TicketItem = {
            ...newTicket,
            id: result.data.id.toString(),
            backendId: result.data.id,
            status: result.data.status,
          };

          setTickets((prev) => [...prev, newLocalTicket]);
          console.log("✅ New ticket created successfully");
          return true;
        } else {
          console.error("❌ Failed to create ticket:", result.error);
          return false;
        }
      }
    } catch (error) {
      console.error("Exception adding ticket:", error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const removeTicket = async (ticketId: string): Promise<boolean> => {
    try {
      setLoading(true);
      console.log("🗑️ Removing ticket:", ticketId);

      const ticket = tickets.find((t) => t.id === ticketId);
      if (!ticket || !ticket.backendId) {
        console.error("❌ Ticket not found for deletion");
        return false;
      }

      const result = await deleteBooking(ticket.backendId);

      if (result.success) {
        // Remove from local state
        setTickets((prev) => prev.filter((ticket) => ticket.id !== ticketId));
        console.log("✅ Ticket removed successfully");
        return true;
      } else {
        console.error("❌ Failed to remove ticket:", result.error);
        return false;
      }
    } catch (error) {
      console.error("Exception removing ticket:", error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const clearAllTickets = async (): Promise<boolean> => {
    try {
      setLoading(true);
      console.log("🧹 Clearing all tickets...");

      const result = await clearAllBookings();

      if (result.success) {
        setTickets([]);
        console.log("✅ All tickets cleared successfully");
        return true;
      } else {
        console.error("❌ Failed to clear tickets:", result.error);
        return false;
      }
    } catch (error) {
      console.error("Exception clearing tickets:", error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const updateTicketCount = async (
    ticketId: string,
    gender: "men" | "women",
    increment: boolean
  ): Promise<boolean> => {
    try {
      const ticket = tickets.find((t) => t.id === ticketId);
      if (!ticket || !ticket.backendId) {
        console.error("❌ Ticket not found for update");
        return false;
      }

      const currentCount = ticket[gender];
      const newCount = Math.max(0, currentCount + (increment ? 1 : -1));

      // Calculate new counts
      const newMenCount = gender === "men" ? newCount : ticket.men;
      const newWomenCount = gender === "women" ? newCount : ticket.women;

      // If both counts would be 0, remove the ticket instead
      if (newMenCount === 0 && newWomenCount === 0) {
        return await removeTicket(ticketId);
      }

      setLoading(true);
      console.log(
        `🔢 Updating ticket ${ticketId} ${gender} count to ${newCount}`
      );

      const result = await updateBookingCounts(
        ticket.backendId,
        newMenCount,
        newWomenCount
      );

      if (result.success) {
        // Update local state
        setTickets((prev) =>
          prev.map((t) =>
            t.id === ticketId
              ? {
                  ...t,
                  men: newMenCount,
                  women: newWomenCount,
                  totalPrice: (newMenCount + newWomenCount) * 1000,
                }
              : t
          )
        );
        console.log("✅ Ticket count updated successfully");
        return true;
      } else {
        console.error("❌ Failed to update ticket count:", result.error);
        return false;
      }
    } catch (error) {
      console.error("Exception updating ticket count:", error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const refreshTickets = async () => {
    await loadTicketsFromBackend();
  };

  const value = {
    tickets,
    loading,
    addTicket,
    removeTicket,
    clearAllTickets,
    updateTicketCount,
    refreshTickets,
  };

  return (
    <TicketContext.Provider value={value}>{children}</TicketContext.Provider>
  );
}

export function useTicket() {
  const context = useContext(TicketContext);
  if (context === undefined) {
    throw new Error("useTicket must be used within a TicketProvider");
  }
  return context;
}

// Default export to satisfy expo-router warning (not used as a component)
export default TicketProvider;
