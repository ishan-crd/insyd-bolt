import React, { createContext, ReactNode, useContext, useState } from "react";

export type VenueType = "playboy" | "privee" | "clubBw" | string;

export interface TicketItem {
  venue: VenueType | string;
  name: string;
  location?: string;
  date: string;
  men: number;
  women: number;
  totalPrice: number;
  id: string; // Add unique ID for each booking
}

interface TicketContextType {
  tickets: TicketItem[];
  addTicket: (ticket: Omit<TicketItem, "id">) => void;
  removeTicket: (ticketId: string) => void;
  clearAllTickets: () => void;
  updateTicketCount: (
    ticketId: string,
    gender: "men" | "women",
    increment: boolean
  ) => void;
}

const TicketContext = createContext<TicketContextType | undefined>(undefined);

export function TicketProvider({ children }: { children: ReactNode }) {
  const [tickets, setTickets] = useState<TicketItem[]>([]);

  const generateTicketId = (venue: string | VenueType, date: string) => {
    return `${venue}-${date}-${Date.now()}`;
  };

  const addTicket = (newTicket: Omit<TicketItem, "id">) => {
    setTickets((prev) => {
      // Check if exact same booking exists (same venue AND same date)
      const existingIndex = prev.findIndex(
        (ticket) =>
          ticket.venue === newTicket.venue && ticket.date === newTicket.date
      );

      if (existingIndex !== -1) {
        // Add to existing ticket for same venue and date (combine counts)
        const updated = [...prev];
        const existingTicket = updated[existingIndex];

        updated[existingIndex] = {
          ...existingTicket,
          men: existingTicket.men + newTicket.men, // Add to existing count
          women: existingTicket.women + newTicket.women, // Add to existing count
          totalPrice:
            (existingTicket.men +
              newTicket.men +
              existingTicket.women +
              newTicket.women) *
            1000,
        };
        return updated;
      } else {
        // Add new ticket (different date or different venue)
        const ticketWithId: TicketItem = {
          ...newTicket,
          id: generateTicketId(newTicket.venue, newTicket.date),
        };
        return [...prev, ticketWithId];
      }
    });
  };

  const removeTicket = (ticketId: string) => {
    setTickets((prev) => prev.filter((ticket) => ticket.id !== ticketId));
  };

  const clearAllTickets = () => {
    setTickets([]);
  };

  const updateTicketCount = (
    ticketId: string,
    gender: "men" | "women",
    increment: boolean
  ) => {
    // Simple timeout to avoid render phase updates
    setTimeout(() => {
      setTickets((prev) => {
        const targetTicketIndex = prev.findIndex(
          (ticket) => ticket.id === ticketId
        );

        if (targetTicketIndex === -1) {
          return prev; // Ticket not found, return unchanged
        }

        const targetTicket = prev[targetTicketIndex];
        const currentCount = targetTicket[gender];
        const newCount = Math.max(0, currentCount + (increment ? 1 : -1));

        // If the new count would be 0 for both men and women, remove the ticket
        const otherGender = gender === "men" ? "women" : "men";
        const otherCount = targetTicket[otherGender];

        if (newCount === 0 && otherCount === 0) {
          // Remove the ticket entirely
          return prev.filter((_, index) => index !== targetTicketIndex);
        }

        // Update the ticket
        const totalPeople =
          gender === "men"
            ? newCount + targetTicket.women
            : targetTicket.men + newCount;

        const updatedTicket = {
          ...targetTicket,
          [gender]: newCount,
          totalPrice: totalPeople * 1000,
        };

        // Replace the ticket in the array
        const newTickets = [...prev];
        newTickets[targetTicketIndex] = updatedTicket;

        return newTickets;
      });
    }, 0);
  };

  const value = {
    tickets,
    addTicket,
    removeTicket,
    clearAllTickets,
    updateTicketCount,
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
