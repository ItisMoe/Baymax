import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
} from "react-native";

// Example data for doctors with more detailed and mock data
const doctorsData = [
  {
    id: 1,
    name: "Dr. John Doe",
    specialty: "Cardiologist",
    location: "123 Heartbeat Lane, New York, NY",
    image:
      "https://media.istockphoto.com/id/1342708859/photo/portrait-of-a-male-doctor.jpg?s=612x612&w=0&k=20&c=7ojvfSnLNx73sR1xXTReBrIXJOZPpSNFZ3E9CodsfQU=", // Update this with actual image links
  },
  {
    id: 2,
    name: "Dr. Jane Smith",
    specialty: "Cardiologist",
    location: "456 Tooth Fairy Road, San Diego, CA",
    image:
      "https://media.istockphoto.com/id/1342708859/photo/portrait-of-a-male-doctor.jpg?s=612x612&w=0&k=20&c=7ojvfSnLNx73sR1xXTReBrIXJOZPpSNFZ3E9CodsfQU=",
  },
  {
    id: 3,
    name: "Dr. Jane Smith",
    specialty: "Cardiologist",
    location: "456 Tooth Fairy Road, San Diego, CA",
    image:
      "https://media.istockphoto.com/id/1342708859/photo/portrait-of-a-male-doctor.jpg?s=612x612&w=0&k=20&c=7ojvfSnLNx73sR1xXTReBrIXJOZPpSNFZ3E9CodsfQU=",
  },
  {
    id: 4,
    name: "Dr. Jane Smith",
    specialty: "Dentist",
    location: "456 Tooth Fairy Road, San Diego, CA",
    image:
      "https://media.istockphoto.com/id/1342708859/photo/portrait-of-a-male-doctor.jpg?s=612x612&w=0&k=20&c=7ojvfSnLNx73sR1xXTReBrIXJOZPpSNFZ3E9CodsfQU=",
  },
  // Add more mock data as needed
];

const DoctorListScreen = ({ route, navigation }) => {
  const { type } = route.params;
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredDoctors, setFilteredDoctors] = useState([]);

  useEffect(() => {
    const filtered = doctorsData.filter(
      (doctor) =>
        doctor.specialty.toLowerCase() === type.toLowerCase() &&
        doctor.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredDoctors(filtered);
  }, [searchQuery, type]);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() =>
        navigation.navigate("DoctorDetails", { doctorId: item.id })
      }
    >
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text style={styles.name}>{item.name}</Text>
      <Text>{item.specialty}</Text>
      <Text style={styles.location}>{item.location}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Search doctors..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <FlatList
        data={filteredDoctors}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  searchBar: {
    height: 40,
    marginBottom: 10,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
  },
  card: {
    flex: 1,
    padding: 10,
    margin: 5,
    borderWidth:0.5,
    backgroundColor: "#ffffff",
    borderRadius: 10,
  },
  image: {
    width: "100%",
    height: 120, // Adjust based on your layout preference
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
});

export default DoctorListScreen;
