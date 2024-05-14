import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

const SymptomCheckerOutput = ({ route }) => {
  const { diseaseInfo } = route.params;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>{diseaseInfo["Disease Name"]}</Text>
      <Text style={styles.description}>{diseaseInfo["Disease Description"]}</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Symptoms</Text>
        <Text style={styles.sectionContent}>{diseaseInfo["Symptoms"]}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Causes</Text>
        <Text style={styles.sectionContent}>{diseaseInfo["Causes"]}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Home Treatment Tips</Text>
        <Text style={styles.sectionContent}>{diseaseInfo["Home Treatment tips"]}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Don'ts</Text>
        <Text style={styles.sectionContent}>{diseaseInfo["DONT'S"]}</Text>
      </View>

     
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    marginBottom: 16,
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  sectionContent: {
    fontSize: 16,
  },
  doctorList: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    marginTop: 8,
  },
  doctorItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 16,
    marginBottom: 8,
  },
  doctorIcon: {
    fontSize: 24,
    marginRight: 8,
  },
  doctorName: {
    fontSize: 16,
  },
});

export default SymptomCheckerOutput;
