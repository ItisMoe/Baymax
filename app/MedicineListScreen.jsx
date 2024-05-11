import React, { useState } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Text,
  Button,
} from "react-native";
import { Icon } from "react-native-elements";
import Toast from './Toast';
const medicines = [
  {
    id: "1",
    name: "Aspirin",
    price: "$20",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzjH0IxyXdUwCzZwSRKgBk43ZwL8NXbNI_GA&s",
  },
  {
    id: "2",
    name: "Ibuprofen",
    price: "$15",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzjH0IxyXdUwCzZwSRKgBk43ZwL8NXbNI_GA&s",
  },
  // Add more medicines here
];

function MedicineListScreen({ navigation }) {
  const [cart, setCart] = useState([]);
  const [toastVisible, setToastVisible] = useState(false);

  
  const addToCart = (item) => {
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 3500);
    setCart([...cart, item]);
  };

  return (
    <View style={{ flex: 1, paddingTop: 10 }}>
      <Icon
        name="shopping-cart"
        type="material"
        color="#000"
        size={40}
        onPress={() => navigation.navigate("Checkout", { cart })}
        containerStyle={styles.cartIcon}
      />

      <View style={styles.container}>
        <FlatList
          data={medicines}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Image source={{ uri: item.image }} style={styles.image} />
              <Text style={styles.name}>{item.name}</Text>
              <View style={styles.bottomRow}>
                <Text style={styles.price}>{item.price}</Text>
                <TouchableOpacity
                  style={styles.addButton}
                  onPress={() => addToCart(item)}
                >
                  <Text style={styles.addButtonText}>Add to Cart</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
          keyExtractor={(item) => item.id}
          numColumns={2}
          key={"two-columns"}
        />
        <Toast visible={toastVisible} message="Item was added successfully to the Cart!" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    marginTop: 20,
  },
  card: {
    flex: 1,
    margin: 10,
    padding: 10,
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  image: {
    width: "100%",
    height: 200, // Adjust height accordingly
    borderRadius: 10,
  },
  name: {
    fontSize: 25,
    fontWeight: "bold",
    marginTop: 5,
  },
  bottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginTop: 20,
  },
  price: {
    fontSize: 20, // Larger font size for the price
    fontWeight: "400",
    color: "#333",
  },
  addButton: {
    backgroundColor: "#4169e1",
    padding: 8,
    borderRadius: 5,
  },
  addButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 15,
  },
  cartIcon: {
    position: "absolute",
    top: 5,
    right: 10,
  },
});

export default MedicineListScreen;
