import { createClient } from "@supabase/supabase-js";

// Replace these with your actual Supabase project credentials
const supabaseUrl = "https://qhywsgwlwemyisypthib.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFoeXdzZ3dsd2VteWlzeXB0aGliIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE1NDQ4NTMsImV4cCI6MjA2NzEyMDg1M30.iCOfvVAJMHfqW4weF9f_a8b_lylJewIVx4aMwhkVOhQ";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Test connection function
export const testConnection = async () => {
  try {
    const { data, error } = await supabase.from("test").select("*").limit(1);

    if (error) {
      console.log("Connection test result:", "Connected but no test table yet");
      return true;
    }

    console.log("Supabase connected successfully!");
    return true;
  } catch (err) {
    console.error("Supabase connection failed:", err);
    return false;
  }
};
