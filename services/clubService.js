import { supabase } from "../lib/supabase";

// Get all clubs
export const getAllClubs = async () => {
  try {
    const { data, error } = await supabase
      .from("clubs")
      .select("*")
      .eq("is_active", true)
      .order("rating", { ascending: false });

    if (error) {
      console.error("Error fetching clubs:", error);
      return { success: false, error: error.message };
    }

    return { success: true, data };
  } catch (err) {
    console.error("Exception in getAllClubs:", err);
    return { success: false, error: "Failed to fetch clubs" };
  }
};

// Get club by ID
export const getClubById = async (clubId) => {
  try {
    const { data, error } = await supabase
      .from("clubs")
      .select("*")
      .eq("id", clubId)
      .eq("is_active", true)
      .single();

    if (error) {
      console.error("Error fetching club:", error);
      return { success: false, error: error.message };
    }

    return { success: true, data };
  } catch (err) {
    console.error("Exception in getClubById:", err);
    return { success: false, error: "Failed to fetch club" };
  }
};

// Search clubs
export const searchClubs = async (query, filters = []) => {
  try {
    let queryBuilder = supabase.from("clubs").select("*").eq("is_active", true);

    if (query && query.length > 0) {
      // Search in name, location, description, and tags
      queryBuilder = queryBuilder.or(`
        name.ilike.%${query}%, 
        location.ilike.%${query}%, 
        description.ilike.%${query}%,
        tags.cs.{${query}}
      `);
    }

    if (filters && filters.length > 0) {
      // Filter by category or type
      queryBuilder = queryBuilder.or(`
        category.in.(${filters.join(",")}),
        type.in.(${filters.join(",")})
      `);
    }

    const { data, error } = await queryBuilder.order("rating", {
      ascending: false,
    });

    if (error) {
      console.error("Error searching clubs:", error);
      return { success: false, error: error.message };
    }

    return { success: true, data };
  } catch (err) {
    console.error("Exception in searchClubs:", err);
    return { success: false, error: "Failed to search clubs" };
  }
};

// Get clubs by category
export const getClubsByCategory = async (category) => {
  try {
    const { data, error } = await supabase
      .from("clubs")
      .select("*")
      .eq("category", category)
      .eq("is_active", true)
      .order("rating", { ascending: false });

    if (error) {
      console.error("Error fetching clubs by category:", error);
      return { success: false, error: error.message };
    }

    return { success: true, data };
  } catch (err) {
    console.error("Exception in getClubsByCategory:", err);
    return { success: false, error: "Failed to fetch clubs by category" };
  }
};

// Get promotional ads
export const getPromotionalAds = async () => {
  try {
    const { data, error } = await supabase
      .from("promotional_ads")
      .select("*")
      .eq("is_active", true)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching promotional ads:", error);
      return { success: false, error: error.message };
    }

    return { success: true, data };
  } catch (err) {
    console.error("Exception in getPromotionalAds:", err);
    return { success: false, error: "Failed to fetch promotional ads" };
  }
};
