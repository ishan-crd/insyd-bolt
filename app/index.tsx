import * as Font from "expo-font";
import { useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import React, { useEffect, useRef, useState } from "react";
import {
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
} from 'react-native';

SplashScreen.preventAutoHideAsync();

const Index: React.FC = () => {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [showCodeInput, setShowCodeInput] = useState(false);
  const [code, setCode] = useState(["", "", "", ""]);
  const router = useRouter();
  const animation = useRef(new Animated.Value(0)).current;

  const discoBallImage: ImageSourcePropType = require('../assets/images/disco-ball.png');

  useEffect(() => {
    async function loadFonts() {
      try {
        await Font.loadAsync({
          "NeuePlakExtendedBlack": require("../assets/fonts/NeuePlakExtendedBlack.ttf"),
          "NeuePlakExtendedBold": require("../assets/fonts/NeuePlakExtendedBold.ttf"),
          "Montserrat-Medium": require("../assets/fonts/Montserrat-Medium.ttf"),
          "Montserrat-Light": require("../assets/fonts/Montserrat-Light.ttf"),
        });
        setFontsLoaded(true);
      } catch (error) {
        console.warn("Error loading fonts:", error);
      } finally {
        await SplashScreen.hideAsync();
      }
    }

    loadFonts();
  }, []);

  const handleStart = () => {
    Animated.timing(animation, {
      toValue: -140, // moves up
      duration: 600,
      useNativeDriver: true,
    }).start(() => {
      setShowCodeInput(true);
    });
  };

  if (!fontsLoaded) return null;

  return (
    <SafeAreaView style={styles.safeContainer}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        {/* Animated Block */}
        <Animated.View style={[styles.animatedBlock, { transform: [{ translateY: animation }] }]}>
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
              <Text style={styles.codeLabel}>Enter Code</Text>
              <View style={styles.codeBoxes}>
                {[0, 1, 2, 3].map((i) => (
                  <TextInput
                    key={i}
                    style={styles.codeBox}
                    maxLength={1}
                    keyboardType="number-pad"
                    placeholder=""
                    placeholderTextColor="#999"
                    value={code[i]}
                    onChangeText={(text) => {
                      const newCode = [...code];
                      newCode[i] = text;
                      setCode(newCode);
                    }}
                  />
                ))}
              </View>
            </View>
          )}
        </Animated.View>

        {/* Button */}
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
                style={styles.button}
                onPress={() => {
                  const finalCode = code.join("");
                  if (finalCode === "1234") {
                    router.replace("/home");
                  } else {
                    alert("Invalid Code. Try again.");
                  }
                }}
              >
                <Text style={styles.buttonText}>Enter</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        )}

        {/* Footer Note */}
        <View style={styles.footer}>
          <Text style={styles.noteText}>
            Invite only. Access requires a valid invitation code.
          </Text>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: '#000',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  animatedBlock: {
    alignItems: 'center',
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
    color: '#fff',
    marginTop: -40,
  },
  logoPink: {
    color: '#EC4899',
  },
  tagline: {
    fontSize: 13.52,
    color: '#ccc',
    marginTop: 8,
    fontFamily: "Montserrat-Light",
  },
  codeContainer: {
    alignItems: 'center',
    marginTop: 40,
  },
  codeLabel: {
    color: '#fff',
    fontFamily: 'Montserrat-Medium',
    fontSize: 14,
    marginBottom: 12,
  },
  codeBoxes: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    marginBottom: 10,
  },
  codeBox: {
    width: 48,
    height: 54,
    borderRadius: 12,
    backgroundColor: 'rgba(15, 15, 15, 0.74)',
    color: '#fff',
    textAlign: 'center',
    fontSize: 22,
    fontFamily: 'Montserrat-Medium',
  },
  button: {
    backgroundColor: '#EC4899',
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 999,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  buttonWrapperInitial: {
    position: 'absolute',
    bottom: 70,
  },
  buttonWrapperAfter: {
    marginTop: 30,
    alignItems: 'center',
  },
  noteText: {
    color: '#aaa',
    fontSize: 12,
    textAlign: 'center',
  },
  footer: {
    marginTop: 'auto',
    marginBottom: 30,
  },
});

export default Index;
