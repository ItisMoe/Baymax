import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";

function CheckoutScreen({ route }) {
  const { cart } = route.params;

  // Function to calculate total price
  const calculateTotal = () => {
    return cart
      .reduce((acc, item) => acc + parseFloat(item.price.replace(/\$/g, "")), 0)
      .toFixed(2);
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.price}>{item.price}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={cart}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        ListFooterComponent={() => (
          <View style={styles.totalContainer}>
            <Text style={styles.totalText}>Total: ${calculateTotal()}</Text>
          </View>
        )}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => alert("Proceeding to Payment")} //TODO we have the cart list you can use it do to the payment from the backend
      >
        <Text style={styles.buttonText}>Proceed to Payment</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    backgroundColor: "#fff",
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 25, // Circular image
    marginRight: 30,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 25,
    fontWeight: "bold",
  },
  price: {
    fontSize: 20,
    color: "#666",
  },
  totalContainer: {
    marginTop: 20,
    marginBottom: 20,
    alignItems: "center",
  },
  totalText: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#000",
  },
  button: {
    backgroundColor: "#4169e1",
    padding: 10,
    margin: 10,
    alignItems: "center",
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default CheckoutScreen;
