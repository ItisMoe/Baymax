import React, { useEffect, useState } from "react";
import { router } from "expo-router";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";

const SymptomCheckerOutput = ({ route,navigation }) => {
  const [isLoading, setLoading] = useState(true);
  const [disease, setDisease] = useState();
  const [doctors, setDoctors] = useState([]);
  const { selectedSymptoms } = route.params.selectedSymptoms;
  const json = {
    disease: {
      name: "Type 2 Diabetes",
      explanation:
        "Type 2 diabetes is a chronic condition that affects the way the body processes blood sugar (glucose). With type 2 diabetes, the body either resists the effects of insulin — a hormone that regulates the movement of sugar into your cells — or doesn't produce enough insulin to maintain normal glucose levels.",
    },
    doctors: [
      {
        id: 1,
        name: "Dr. Sarah Lee",
        specialty: "Endocrinologist",
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGnu4s-gW1OowMKMJPWCfqJsxSYEpLOaVi1A&s",
        contactInfo: "555-0100",
      },
      {
        id: 2,
        name: "Dr. John Doe",
        specialty: "General Practitioner",
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGnu4s-gW1OowMKMJPWCfqJsxSYEpLOaVi1A&s",
        contactInfo: "555-0102",
      },
      {
        id: 3,
        name: "Dr. Jane Smith",
        specialty: "Dietician",
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGnu4s-gW1OowMKMJPWCfqJsxSYEpLOaVi1A&s",
        contactInfo: "555-0103",
      },
    ],
  };

  useEffect(() => {
    console.log(selectedSymptoms);
    setDisease(json.disease);
    setDoctors(json.doctors);
    setLoading(false);
  }, []);

  const renderItem = ({ item }) => {
    console.log(`Pushing doctor ID: ${item.id}`); // Log the ID being pushed

    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() =>
          router.push({
            pathname: `./${item.id}`,
            query: { doctorId: item.id },
          })
        }
      >
        <Image source={{ uri: item.image }} style={styles.image} />
        <Text style={styles.name}>{item.name}</Text>
        <Text>{item.specialty}</Text>
        <Text style={styles.location}>{item.contactInfo}</Text>
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <ScrollView>
          <View style={styles.diseaseContainer}>
            <Text style={styles.diseaseName}>{disease.name}</Text>
            <Text style={styles.diseaseExplanation}>{disease.explanation}</Text>
          </View>
          <View style={styles.diseaseContainer}>
            <Text style={styles.suggested}>Suggested Doctors</Text>
          </View>
          <FlatList
            data={doctors}
            horizontal
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderItem}
          />
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
  },
  diseaseContainer: {
    padding: 20,
  },
  diseaseName: {
    fontSize: 35,
    fontWeight: "bold",
  },
  card: {
    flex: 1,
    padding: 10,
    margin: 5,
    backgroundColor: "#ffffff",
    borderRadius: 10,
  },
  image: {
    width: "100%",
    height: 120,
    borderRadius: 10,
  },
  name: {
    fontWeight: "bold",
    fontSize: 16,
    marginTop: 5,
  },
  location: {
    fontSize: 12,
    color: "#666",
  },
  suggested: {
    fontSize: 25,
    fontWeight: "bold",
  },
  diseaseExplanation: {
    fontSize: 20,
    marginTop: 10,
    fontWeight: "600",
  },
});

export default SymptomCheckerOutput;
