import { supabase } from "../lib/supabase";
import { getCurrentSession } from "./authService";

// Create a new booking
export const createBooking = async (bookingData) => {
  try {
    const session = await getCurrentSession();
    if (!session) {
      return { success: false, error: "No active session" };
    }

    const booking = {
      club_id: parseInt(bookingData.venue),
      booking_date: bookingData.date,
      men_count: bookingData.men,
      women_count: bookingData.women,
      total_price: bookingData.totalPrice,
      user_session: session,
      status: "pending",
    };

    console.log("Creating booking:", booking);

    const { data, error } = await supabase
      .from("bookings")
      .insert([booking])
      .select()
      .single();

    if (error) {
      console.error("Error creating booking:", error);
      return { success: false, error: error.message };
    }

    console.log("Booking created successfully:", data);
    return { success: true, data };
  } catch (err) {
    console.error("Exception in createBooking:", err);
    return { success: false, error: "Failed to create booking" };
  }
};

// Get user's bookings
export const getUserBookings = async () => {
  try {
    const session = await getCurrentSession();
    if (!session) {
      return { success: false, error: "No active session" };
    }

    const { data, error } = await supabase
      .from("bookings")
      .select(
        `
        *,
        clubs (
          id,
          name,
          location,
          rating,
          type,
          image_url
        )
      `
      )
      .eq("user_session", session)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching bookings:", error);
      return { success: false, error: error.message };
    }

    console.log("Fetched bookings:", data);
    return { success: true, data };
  } catch (err) {
    console.error("Exception in getUserBookings:", err);
    return { success: false, error: "Failed to fetch bookings" };
  }
};

// Update booking counts
export const updateBookingCounts = async (bookingId, menCount, womenCount) => {
  try {
    const session = await getCurrentSession();
    if (!session) {
      return { success: false, error: "No active session" };
    }

    const totalPrice = (menCount + womenCount) * 1000;

    const { data, error } = await supabase
      .from("bookings")
      .update({
        men_count: menCount,
        women_count: womenCount,
        total_price: totalPrice,
      })
      .eq("id", bookingId)
      .eq("user_session", session) // Security: only update own bookings
      .select()
      .single();

    if (error) {
      console.error("Error updating booking:", error);
      return { success: false, error: error.message };
    }

    console.log("Booking updated successfully:", data);
    return { success: true, data };
  } catch (err) {
    console.error("Exception in updateBookingCounts:", err);
    return { success: false, error: "Failed to update booking" };
  }
};

// Delete a booking
export const deleteBooking = async (bookingId) => {
  try {
    const session = await getCurrentSession();
    if (!session) {
      return { success: false, error: "No active session" };
    }

    const { error } = await supabase
      .from("bookings")
      .delete()
      .eq("id", bookingId)
      .eq("user_session", session); // Security: only delete own bookings

    if (error) {
      console.error("Error deleting booking:", error);
      return { success: false, error: error.message };
    }

    console.log("Booking deleted successfully");
    return { success: true };
  } catch (err) {
    console.error("Exception in deleteBooking:", err);
    return { success: false, error: "Failed to delete booking" };
  }
};

// Clear all user bookings
export const clearAllBookings = async () => {
  try {
    const session = await getCurrentSession();
    if (!session) {
      return { success: false, error: "No active session" };
    }

    const { error } = await supabase
      .from("bookings")
      .delete()
      .eq("user_session", session);

    if (error) {
      console.error("Error clearing bookings:", error);
      return { success: false, error: error.message };
    }

    console.log("All bookings cleared successfully");
    return { success: true };
  } catch (err) {
    console.error("Exception in clearAllBookings:", err);
    return { success: false, error: "Failed to clear bookings" };
  }
};
