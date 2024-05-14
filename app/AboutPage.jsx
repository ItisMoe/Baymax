import React from "react";
import { View, Text, StyleSheet, ScrollView, Image } from "react-native";

const AboutPage = ({ navigation }) => {
  return (
    <ScrollView style={styles.container}>
      <Image
        source={{
          uri: "https://wallpapers.com/images/hd/disney-1920x1080-hd-big-hero-6-baymax-waving-qwrfcv3anpz6v04g.jpg",
        }}
        style={styles.image}
      />
      <Text style={styles.title}>About Baymax</Text>
      <Text style={styles.content}>
        Baymax is an app designed to connect patients with doctors and offer
        comprehensive healthcare services. Our goal is to make medical care
        accessible and convenient for everyone, bridging the gap between health
        professionals and patients with cutting-edge technology and
        user-friendly design.
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f9f9f9", // Soft background color
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 10, // Rounded corners for the image
    marginBottom: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333", // Darker color for better readability
    marginBottom: 10,
  },
  content: {
    fontSize: 16,
    lineHeight: 24, // Increased line height for better readability
    color: "#666", // Slightly lighter text color
  },
});

export default AboutPage;
