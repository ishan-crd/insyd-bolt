import React, { createContext, ReactNode, useContext, useState } from "react";

export type VenueType = "playboy" | "privee" | "clubBw";

export interface TicketItem {
  venue: VenueType;
  name: string;
  date: string;
  men: number;
  women: number;
  totalPrice: number;
}

interface TicketContextType {
  tickets: TicketItem[];
  addTicket: (ticket: TicketItem) => void;
  removeTicket: (venue: VenueType) => void;
  clearAllTickets: () => void;
  updateTicketCount: (
    venue: VenueType,
    gender: "men" | "women",
    increment: boolean
  ) => void;
}

const TicketContext = createContext<TicketContextType | undefined>(undefined);

export function TicketProvider({ children }: { children: ReactNode }) {
  const [tickets, setTickets] = useState<TicketItem[]>([]);

  const addTicket = (newTicket: TicketItem) => {
    setTickets((prev) => {
      // Check if venue already exists
      const existingIndex = prev.findIndex(
        (ticket) => ticket.venue === newTicket.venue
      );

      if (existingIndex !== -1) {
        // Update existing ticket
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          date: newTicket.date,
          men: newTicket.men,
          women: newTicket.women,
          totalPrice: newTicket.totalPrice,
        };
        return updated;
      } else {
        // Add new ticket
        return [...prev, newTicket];
      }
    });
  };

  const removeTicket = (venue: VenueType) => {
    setTickets((prev) => prev.filter((ticket) => ticket.venue !== venue));
  };

  const clearAllTickets = () => {
    setTickets([]);
  };

  const updateTicketCount = (
    venue: VenueType,
    gender: "men" | "women",
    increment: boolean
  ) => {
    setTickets(
      (prev) =>
        prev
          .map((ticket) => {
            if (ticket.venue === venue) {
              const newCount = Math.max(
                0,
                ticket[gender] + (increment ? 1 : -1)
              );
              const updatedTicket = {
                ...ticket,
                [gender]: newCount,
                totalPrice:
                  (gender === "men"
                    ? newCount + ticket.women
                    : ticket.men + newCount) * 1000,
              };
              return updatedTicket;
            }
            return ticket;
          })
          .filter((ticket) => ticket.men > 0 || ticket.women > 0) // Remove tickets with 0 people
    );
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
