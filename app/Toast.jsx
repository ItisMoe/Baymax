import React, { useState, useEffect } from "react";
import { View, Text, Animated, StyleSheet } from "react-native";

const Toast = ({ visible, message }) => {
  const [fadeAnim] = useState(new Animated.Value(0)); // Initial value for opacity

  useEffect(() => {
    if (visible) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start(() => {
        setTimeout(() => {
          Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
          }).start();
        }, 3000);
      });
    }
  }, [visible, fadeAnim]);

  if (!visible) return null;

  return (
    <Animated.View style={[styles.toast, { opacity: fadeAnim }]}>
      <Text style={styles.text}>{message}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  toast: {
    position: "absolute",
    top: 0,
    left: 20,
    right: 20,
    backgroundColor: "black",
    padding: 10,
    borderRadius: 5,
    zIndex: 20000,
  },
  text: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
  },
});

export default Toast;
