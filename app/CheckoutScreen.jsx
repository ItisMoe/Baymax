

import { useStripe } from '@stripe/stripe-react-native';
import { useCreatePaymentIntentMutation } from './apiSlice';
import React, { useState } from "react";
import { Alert } from 'react-native';

import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  KeyboardAvoidingView,
  Platform
} from "react-native";

function CheckoutScreen({ route, navigation }) {
  const { cart } = route.params;
  const [cardHolderName, setCardHolderName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryMonth, setExpiryMonth] = useState('');
  const [expiryYear, setExpiryYear] = useState('');
  const [cvv, setCvv] = useState('');

  const calculateTotal = () => {
    return cart.reduce((acc, item) => acc + parseFloat(item.price.replace(/\$/g, "")), 0).toFixed(2);
  };

  const renderItem = ({ item, index }) => (
    <View style={styles.item}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.price}>{item.price}</Text>
      </View>
    </View>
  );
  const proceedToPayment = () => {
    const service = cart.map(item => item.name).join(', ');
    const amount = calculateTotal();
    const paymentDetails = {
      app_name: "Baymax",
      service,
      customer_email: "shalithax@gmail.com",
      card_type: "VISA",
      card_holder_name: cardHolderName,
      card_number: cardNumber,
      expiryMonth,
      expiryYear,
      cvv,
      amount,
      currency: "USD"
    };
    console.log(paymentDetails);
    alert("Proceeding to Payment: " + JSON.stringify(paymentDetails, null, 2));
  };
  const [createPaymentIntent] = useCreatePaymentIntentMutation();

  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const onCheckout = async () => {
    const totalLocal = calculateTotal();
    console.log('Total amount to charge:', totalLocal);

    try {
      const response = await createPaymentIntent({ amount: Math.floor(totalLocal * 100) }).unwrap();
      console.log("intent created");

      const initResponse = await initPaymentSheet({
        merchantDisplayName: 'notJust.dev',
        paymentIntentClientSecret: response.paymentIntent,
      });

      if (initResponse.error) {
        console.error('Error initializing payment sheet:', initResponse.error);
        Alert.alert('Initialization Error', initResponse.error.message);
        return;
      }

      const paymentResponse = await presentPaymentSheet();
      if (paymentResponse.error) {
        console.error('Error presenting payment sheet:', paymentResponse.error);
        Alert.alert('Payment Error', paymentResponse.error.message);
        return;
      }

      // Prepare and send the JSON object on successful payment
      const paymentDetails = {
        app_name: "Baymax",
        service: cart.map(item => item.name).join(', '),
        //replace with real email of the user
        customer_email: "hsen.aliahmed2003@gmail.com",
        card_type: "VISA",
        card_holder_name: cardHolderName,
        card_number: cardNumber,
        expiryMonth,
        expiryYear,
        cvv,
        amount: totalLocal,
        currency: "USD"
      };

      console.log(paymentDetails);
      await sendPaymentDetails(paymentDetails);
      Alert.alert("Success", "Payment processed successfully!");
    } catch (error) {
      console.error('Checkout error:', error);
      Alert.alert('Error', error.message || 'An unexpected error occurred during checkout.');
    }
  };

  // Function to send payment details to your server
  const sendPaymentDetails = async (details) => {
    try {
      const response = await fetch('http://10.21.128.63:5100/api/v1/payment/card', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(details)
      });
      const responseData = await response.json();
      console.log('Server response:', responseData);
    } catch (error) {
      console.error('Error sending payment details:', error);
      Alert.alert('Error', 'Failed to send payment details.');
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <FlatList
        data={cart}
        renderItem={renderItem}
        keyExtractor={(item, index) => item.id + index}
        // ListHeaderComponent={() => (
        //   <View>
        //     <Text style={styles.header}>Checkout Details</Text>
        //     <View style={styles.paymentDetails}>
        //       <TextInput
        //         placeholder="Card Holder Name"
        //         value={cardHolderName}
        //         onChangeText={setCardHolderName}
        //         style={styles.input}
        //       />
        //       <TextInput
        //         placeholder="Card Number"
        //         value={cardNumber}
        //         onChangeText={setCardNumber}
        //         style={styles.input}
        //         keyboardType="numeric"
        //       />
        //       <View style={styles.row}>
        //         <TextInput
        //           placeholder="MM"
        //           value={expiryMonth}
        //           onChangeText={setExpiryMonth}
        //           style={[styles.input, styles.expiryInput]}
        //           keyboardType="numeric"
        //         />
        //         <TextInput
        //           placeholder="YYYY"
        //           value={expiryYear}
        //           onChangeText={setExpiryYear}
        //           style={[styles.input, styles.expiryInput]}
        //           keyboardType="numeric"
        //         />
        //         <TextInput
        //           placeholder="CVV"
        //           value={cvv}
        //           onChangeText={setCvv}
        //           style={[styles.input, styles.cvvInput]}
        //           keyboardType="numeric"
        //         />
        //       </View>
        //     </View>
        //   </View>
        // )}
        ListFooterComponent={() => (
          <View style={styles.totalContainer}>
            <Text style={styles.totalText}>Total: ${calculateTotal()}</Text>
            <TouchableOpacity style={styles.button} onPress={onCheckout}>
            {/* proceedToPayment */}
              <Text style={styles.buttonText}>Proceed to Payment</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9fb",
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#000",
    padding: 20,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#e1e1e1",
    backgroundColor: "#ffffff",
    borderRadius: 10,
    marginHorizontal: 10,
    marginTop: 10,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  info: {
    marginLeft: 20,
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  price: {
    fontSize: 14,
    color: "#666",
  },
  totalContainer: {
    marginTop: 20,
    padding: 20,
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    marginHorizontal: 10,
  },
  totalText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
  },
  paymentDetails: {
    padding: 20,
  },
  input: {
    backgroundColor: "#fff",
    marginBottom: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 5,
    fontSize: 16,
    color: "#333",
    borderWidth: 1,
    borderColor: "#ccc",
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  expiryInput: {
    flex: 1,
    marginRight: 10,
  },
  cvvInput: {
    flex: 1,
  },
  button: {
    backgroundColor: "#4169e1",
    padding: 15,
    marginHorizontal: 20,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default CheckoutScreen;
