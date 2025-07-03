import AsyncStorage from "@react-native-async-storage/async-storage";
import { supabase } from "../lib/supabase";

// Generate a simple session ID for the user
const generateSessionId = () => {
  return (
    "session_" + Math.random().toString(36).substr(2, 9) + "_" + Date.now()
  );
};

// Verify invite code
export const verifyInviteCode = async (code) => {
  try {
    // Normalize the code: uppercase and trim
    const normalizedCode = code.toUpperCase().trim();
    console.log("Verifying code:", normalizedCode);

    // Validate code format (4 characters, alphanumeric)
    if (!/^[A-Z0-9]{4}$/.test(normalizedCode)) {
      return {
        success: false,
        error: "Code must be 4 alphanumeric characters",
      };
    }

    // Check if code exists and is active
    const { data, error } = await supabase
      .from("invite_codes")
      .select("*")
      .eq("code", normalizedCode)
      .eq("is_active", true)
      .single();

    if (error) {
      console.error("Error verifying code:", error);
      return {
        success: false,
        error: "Invalid invitation code",
      };
    }

    if (!data) {
      return {
        success: false,
        error: "Invalid invitation code",
      };
    }

    // Check if code has expired
    if (data.expires_at && new Date(data.expires_at) < new Date()) {
      return {
        success: false,
        error: "Invitation code has expired",
      };
    }

    // Check if code has reached max uses
    if (data.max_uses && data.current_uses >= data.max_uses) {
      return {
        success: false,
        error: "Invitation code has been used too many times",
      };
    }

    // Update usage count
    const { error: updateError } = await supabase
      .from("invite_codes")
      .update({
        current_uses: data.current_uses + 1,
      })
      .eq("id", data.id);

    if (updateError) {
      console.error("Error updating code usage:", updateError);
      // Continue anyway, don't fail the login for this
    }

    // Generate session for user
    const sessionId = generateSessionId();

    // Store session locally
    await AsyncStorage.setItem("userSession", sessionId);
    await AsyncStorage.setItem("loginTime", new Date().toISOString());

    console.log("Code verified successfully");
    return {
      success: true,
      sessionId,
      codeData: data,
    };
  } catch (err) {
    console.error("Exception in verifyInviteCode:", err);
    return {
      success: false,
      error: "Failed to verify code. Please try again.",
    };
  }
};

// Check if user has valid session
export const checkSession = async () => {
  try {
    const sessionId = await AsyncStorage.getItem("userSession");
    const loginTime = await AsyncStorage.getItem("loginTime");

    if (!sessionId || !loginTime) {
      return { success: false, error: "No active session" };
    }

    // Check if session is less than 24 hours old (optional)
    const loginDate = new Date(loginTime);
    const now = new Date();
    const hoursDiff = (now - loginDate) / (1000 * 60 * 60);

    if (hoursDiff > 24) {
      await logout();
      return { success: false, error: "Session expired" };
    }

    return {
      success: true,
      sessionId,
      loginTime,
    };
  } catch (err) {
    console.error("Exception in checkSession:", err);
    return { success: false, error: "Failed to check session" };
  }
};

// Logout user
export const logout = async () => {
  try {
    await AsyncStorage.removeItem("userSession");
    await AsyncStorage.removeItem("loginTime");
    console.log("User logged out successfully");
    return { success: true };
  } catch (err) {
    console.error("Exception in logout:", err);
    return { success: false, error: "Failed to logout" };
  }
};

// Get current session info
export const getCurrentSession = async () => {
  try {
    const sessionId = await AsyncStorage.getItem("userSession");
    return sessionId;
  } catch (err) {
    console.error("Exception in getCurrentSession:", err);
    return null;
  }
};
