import * as Font from "expo-font";
import { useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Animated,
  Image,
  ImageSourcePropType,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { testConnection } from "../lib/supabase";
import { checkSession, verifyInviteCode } from "../services/authService";

SplashScreen.preventAutoHideAsync();

const Index: React.FC = () => {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [showCodeInput, setShowCodeInput] = useState(false);
  const [code, setCode] = useState(["", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [checkingSession, setCheckingSession] = useState(true);
  const inputRefs = useRef([]);
  const router = useRouter();
  const animation = useRef(new Animated.Value(0)).current;

  const discoBallImage: ImageSourcePropType = require("../assets/images/disco-ball.png");

  useEffect(() => {
    async function initialize() {
      try {
        // Load fonts
        await Font.loadAsync({
          NeuePlakExtendedBlack: require("../assets/fonts/NeuePlakExtendedBlack.ttf"),
          NeuePlakExtendedBold: require("../assets/fonts/NeuePlakExtendedBold.ttf"),
          "Montserrat-Medium": require("../assets/fonts/Montserrat-Medium.ttf"),
          "Montserrat-Light": require("../assets/fonts/Montserrat-Light.ttf"),
        });
        setFontsLoaded(true);

        // Test Supabase connection
        const connectionTest = await testConnection();
        if (connectionTest) {
          console.log("✅ Supabase connected successfully!");
        } else {
          console.log("❌ Supabase connection failed");
        }

        // Check if user already has a valid session
        const sessionCheck = await checkSession();
        if (sessionCheck.success) {
          console.log("✅ Valid session found, redirecting to home");
          router.replace("/home");
          return;
        } else {
          console.log("ℹ️ No valid session, showing login");
        }
      } catch (error) {
        console.warn("Error during initialization:", error);
      } finally {
        await SplashScreen.hideAsync();
        setCheckingSession(false);
      }
    }

    initialize();
  }, []);

  const handleStart = () => {
    Animated.timing(animation, {
      toValue: -140,
      duration: 600,
      useNativeDriver: true,
    }).start(() => {
      setShowCodeInput(true);
    });
  };

  // Validate if character is alphanumeric
  const isValidCharacter = (char) => {
    return /^[A-Za-z0-9]$/.test(char);
  };

  const handleCodeChange = (text, index) => {
    // Convert to uppercase and validate
    const upperText = text.toUpperCase();

    // Only allow alphanumeric characters
    if (text && !isValidCharacter(upperText)) {
      return; // Ignore invalid characters
    }

    const newCode = [...code];
    newCode[index] = upperText;
    setCode(newCode);

    // Auto-advance to next input
    if (upperText && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (nativeEvent, index) => {
    // Handle backspace to go to previous input
    if (nativeEvent.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleCodeSubmit = async () => {
    const finalCode = code.join("").trim();

    if (finalCode.length !== 4) {
      Alert.alert("Error", "Please enter a complete 4-character code");
      return;
    }

    setLoading(true);

    try {
      console.log("🔑 Verifying code:", finalCode);
      const result = await verifyInviteCode(finalCode);

      if (result.success) {
        console.log("✅ Code verified successfully!");
        Alert.alert(
          "Welcome to insyd!",
          "Access granted. Enjoy your exclusive nightlife experience!",
          [
            {
              text: "Let's Go!",
              onPress: () => router.replace("/home"),
            },
          ]
        );
      } else {
        console.log("❌ Code verification failed:", result.error);
        Alert.alert("Access Denied", result.error);
        // Clear the code inputs on failure
        setCode(["", "", "", ""]);
        inputRefs.current[0]?.focus();
      }
    } catch (error) {
      console.error("Exception during code verification:", error);
      Alert.alert("Error", "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Handle paste functionality
  const handlePaste = async (index) => {
    try {
      // For React Native, we'll handle paste manually since clipboard access needs permissions
      // This will be triggered when user manually types
    } catch (error) {
      console.log("Paste not supported");
    }
  };

  // Show loading screen while checking session
  if (checkingSession) {
    return (
      <SafeAreaView style={styles.safeContainer}>
        <View style={[styles.container, { justifyContent: "center" }]}>
          <Image
            source={discoBallImage}
            style={[styles.discoBall, { opacity: 0.5 }]}
          />
          <ActivityIndicator
            size="large"
            color="#EC4899"
            style={{ marginTop: 20 }}
          />
          <Text style={styles.loadingText}>Checking access...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!fontsLoaded) return null;

  return (
    <SafeAreaView style={styles.safeContainer}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <Animated.View
          style={[
            styles.animatedBlock,
            { transform: [{ translateY: animation }] },
          ]}
        >
          <Image
            source={discoBallImage}
            style={styles.discoBall}
            resizeMode="contain"
          />

          <Text style={styles.logoText}>
            <Text style={styles.logoPink}>in</Text>syd
          </Text>
          <Text style={styles.tagline}>Your exclusive pass to the night.</Text>

          {showCodeInput && (
            <View style={styles.codeContainer}>
              <Text style={styles.codeLabel}>Enter Invitation Code</Text>
              <Text style={styles.codeSubLabel}>
                4-character alphanumeric code
              </Text>

              <View style={styles.codeBoxes}>
                {[0, 1, 2, 3].map((i) => (
                  <TextInput
                    key={i}
                    ref={(ref) => (inputRefs.current[i] = ref)}
                    style={[
                      styles.codeBox,
                      code[i] && styles.codeBoxFilled,
                      loading && styles.codeBoxDisabled,
                    ]}
                    maxLength={1}
                    placeholder=""
                    placeholderTextColor="#555"
                    value={code[i]}
                    editable={!loading}
                    autoCapitalize="characters"
                    autoCorrect={false}
                    selectTextOnFocus={true}
                    onChangeText={(text) => handleCodeChange(text, i)}
                    onKeyPress={({ nativeEvent }) =>
                      handleKeyPress(nativeEvent, i)
                    }
                    onFocus={() => {
                      // Clear the current box when focused for easier editing
                      if (code[i]) {
                        const newCode = [...code];
                        newCode[i] = "";
                        setCode(newCode);
                      }
                    }}
                  />
                ))}
              </View>

              <View style={styles.hintContainer}>
                <Text style={styles.hintText}>Try: CLUB, VIP1, GOLD, A1B2</Text>
                <Text style={styles.hintSubtext}>
                  4-character codes only (A-Z, 0-9)
                </Text>
              </View>
            </View>
          )}
        </Animated.View>

        {!showCodeInput && (
          <View style={styles.buttonWrapperInitial}>
            <TouchableOpacity style={styles.button} onPress={handleStart}>
              <Text style={styles.buttonText}>Start Partying</Text>
            </TouchableOpacity>
          </View>
        )}

        {showCodeInput && (
          <Animated.View style={{ transform: [{ translateY: animation }] }}>
            <View style={styles.buttonWrapperAfter}>
              <TouchableOpacity
                style={[styles.button, loading && styles.buttonDisabled]}
                onPress={handleCodeSubmit}
                disabled={loading || code.join("").length !== 4}
              >
                {loading ? (
                  <View style={styles.loadingButtonContent}>
                    <ActivityIndicator size="small" color="#fff" />
                    <Text style={styles.buttonText}>Verifying...</Text>
                  </View>
                ) : (
                  <Text style={styles.buttonText}>
                    {code.join("").length === 4
                      ? "Verify Access"
                      : `Enter ${4 - code.join("").length} more`}
                  </Text>
                )}
              </TouchableOpacity>

              {/* Quick action buttons for demo codes */}
              <View style={styles.quickCodesContainer}>
                <Text style={styles.quickCodesLabel}>Quick Demo:</Text>
                <View style={styles.quickCodesButtons}>
                  {["CLUB", "VIP1", "GOLD"].map((demoCode) => (
                    <TouchableOpacity
                      key={demoCode}
                      style={styles.quickCodeButton}
                      onPress={() => {
                        setCode(demoCode.split(""));
                        setTimeout(() => handleCodeSubmit(), 100);
                      }}
                      disabled={loading}
                    >
                      <Text style={styles.quickCodeText}>{demoCode}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            </View>
          </Animated.View>
        )}

        <View style={styles.footer}>
          <Text style={styles.noteText}>
            Invite only. Access requires a valid invitation code.
          </Text>
          {showCodeInput && (
            <Text style={styles.backendStatus}>
              🟢 Connected to secure backend
            </Text>
          )}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: "#000",
  },
  container: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 24,
  },
  animatedBlock: {
    alignItems: "center",
    marginTop: -70,
  },
  discoBall: {
    width: 274,
    height: 474,
    zIndex: 1,
  },
  logoText: {
    fontSize: 40.58,
    fontFamily: "NeuePlakExtendedBlack",
    color: "#fff",
    marginTop: -40,
  },
  logoPink: {
    color: "#EC4899",
  },
  tagline: {
    fontSize: 13.52,
    color: "#ccc",
    marginTop: 8,
    fontFamily: "Montserrat-Light",
  },
  codeContainer: {
    alignItems: "center",
    marginTop: 40,
  },
  codeLabel: {
    color: "#fff",
    fontFamily: "NeuePlakExtendedBold",
    fontSize: 14,
    marginBottom: 4,
  },
  codeSubLabel: {
    color: "#999",
    fontFamily: "Montserrat-Light",
    fontSize: 11,
    marginBottom: 16,
  },
  codeBoxes: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
    marginBottom: 16,
  },
  codeBox: {
    width: 52,
    height: 58,
    borderRadius: 12,
    backgroundColor: "rgba(15, 15, 15, 0.74)",
    borderWidth: 2,
    borderColor: "#333",
    color: "#fff",
    textAlign: "center",
    fontSize: 20,
    fontFamily: "Montserrat-Bold",
    textTransform: "uppercase",
  },
  codeBoxFilled: {
    borderColor: "#EC4899",
    backgroundColor: "rgba(236, 72, 153, 0.1)",
  },
  codeBoxDisabled: {
    opacity: 0.6,
  },
  hintContainer: {
    alignItems: "center",
    marginTop: 8,
  },
  hintText: {
    color: "#666",
    fontSize: 11,
    fontFamily: "Montserrat-Medium",
    textAlign: "center",
    marginBottom: 4,
  },
  hintSubtext: {
    color: "#555",
    fontSize: 10,
    fontFamily: "Montserrat-Light",
    textAlign: "center",
  },
  button: {
    backgroundColor: "#EC4899",
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 999,
    minWidth: 160,
    alignItems: "center",
  },
  buttonDisabled: {
    backgroundColor: "#666",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
    fontFamily: "Montserrat-Medium",
  },
  loadingButtonContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  buttonWrapperInitial: {
    position: "absolute",
    bottom: 70,
  },
  buttonWrapperAfter: {
    marginTop: 20,
    alignItems: "center",
  },
  quickCodesContainer: {
    marginTop: 24,
    alignItems: "center",
  },
  quickCodesLabel: {
    color: "#666",
    fontSize: 11,
    fontFamily: "Montserrat-Light",
    marginBottom: 8,
  },
  quickCodesButtons: {
    flexDirection: "row",
    gap: 8,
  },
  quickCodeButton: {
    backgroundColor: "rgba(236, 72, 153, 0.2)",
    borderWidth: 1,
    borderColor: "#EC4899",
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  quickCodeText: {
    color: "#EC4899",
    fontSize: 10,
    fontFamily: "Montserrat-Bold",
  },
  noteText: {
    color: "#aaa",
    fontSize: 12,
    textAlign: "center",
    fontFamily: "Montserrat-Light",
  },
  backendStatus: {
    color: "#4ade80",
    fontSize: 10,
    textAlign: "center",
    marginTop: 5,
    fontFamily: "Montserrat-Light",
  },
  footer: {
    marginTop: "auto",
    marginBottom: 30,
  },
  loadingText: {
    color: "#ccc",
    fontSize: 16,
    fontFamily: "Montserrat-Light",
    marginTop: 10,
  },
});

export default Index;
