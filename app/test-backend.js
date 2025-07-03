// Create this as test-backend.js for testing purposes
import { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { testConnection } from "../lib/supabase";
import { verifyInviteCode } from "../services/authService";
import { getAllClubs, getPromotionalAds } from "../services/clubService";

export default function BackendTest() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const addResult = (test, success, data = null, error = null) => {
    setResults((prev) => [
      ...prev,
      {
        test,
        success,
        data,
        error,
        timestamp: new Date().toLocaleTimeString(),
      },
    ]);
  };

  const runTest = async (testName, testFunction) => {
    setLoading(true);
    try {
      const result = await testFunction();
      addResult(
        testName,
        result.success || !!result,
        result.data || result,
        result.error
      );
    } catch (error) {
      addResult(testName, false, null, error.message);
    }
    setLoading(false);
  };

  const clearResults = () => setResults([]);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Backend Connection Tests</Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => runTest("Supabase Connection", testConnection)}
          disabled={loading}
        >
          <Text style={styles.buttonText}>Test Connection</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => runTest("Load Clubs", getAllClubs)}
          disabled={loading}
        >
          <Text style={styles.buttonText}>Load Clubs</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => runTest("Load Ads", getPromotionalAds)}
          disabled={loading}
        >
          <Text style={styles.buttonText}>Load Ads</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => runTest("Verify Code", () => verifyInviteCode("1234"))}
          disabled={loading}
        >
          <Text style={styles.buttonText}>Test Code 1234</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.clearButton]}
          onPress={clearResults}
        >
          <Text style={styles.buttonText}>Clear Results</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.resultsContainer}>
        <Text style={styles.resultsTitle}>Test Results:</Text>
        {results.map((result, index) => (
          <View
            key={index}
            style={[
              styles.resultItem,
              result.success ? styles.success : styles.error,
            ]}
          >
            <Text style={styles.resultTest}>{result.test}</Text>
            <Text style={styles.resultStatus}>
              {result.success ? "✅ SUCCESS" : "❌ FAILED"}
            </Text>
            <Text style={styles.resultTime}>{result.timestamp}</Text>
            {result.error && (
              <Text style={styles.resultError}>Error: {result.error}</Text>
            )}
            {result.data && (
              <Text style={styles.resultData}>
                Data:{" "}
                {typeof result.data === "object"
                  ? JSON.stringify(result.data).substring(0, 100) + "..."
                  : result.data}
              </Text>
            )}
          </View>
        ))}
      </View>

      {loading && (
        <View style={styles.loadingOverlay}>
          <Text style={styles.loadingText}>Running test...</Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#EC4899",
    textAlign: "center",
    marginBottom: 30,
    marginTop: 50,
  },
  buttonContainer: {
    marginBottom: 30,
  },
  button: {
    backgroundColor: "#EC4899",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: "center",
  },
  clearButton: {
    backgroundColor: "#666",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  resultsContainer: {
    flex: 1,
  },
  resultsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 15,
  },
  resultItem: {
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
  },
  success: {
    backgroundColor: "#1a4d3a",
    borderColor: "#4ade80",
  },
  error: {
    backgroundColor: "#4d1a1a",
    borderColor: "#ef4444",
  },
  resultTest: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
  resultStatus: {
    fontSize: 14,
    marginTop: 5,
    color: "#fff",
  },
  resultTime: {
    fontSize: 12,
    color: "#ccc",
    marginTop: 5,
  },
  resultError: {
    fontSize: 12,
    color: "#ff6b6b",
    marginTop: 5,
  },
  resultData: {
    fontSize: 12,
    color: "#4ade80",
    marginTop: 5,
  },
  loadingOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.7)",
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    color: "#fff",
    fontSize: 18,
  },
});

// To add this test screen to your app:
// 1. Save this as test-backend.js in your app folder
// 2. Add it to your _layout.tsx routes
// 3. Navigate to it from your home screen for testing
