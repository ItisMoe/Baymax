import React from "react";
import { View, Text, Modal, StyleSheet, ScrollView } from "react-native";
import { Button } from "react-native-ui-lib";

const AnswerModal = ({ visible, onClose, answers }) => {
  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={visible}
      onRequestClose={onClose}
    >
      <ScrollView style={styles.container}>
        {answers.map((answer, index) => (
          <View key={index} style={styles.answer}>
            <Text style={styles.answerText}>{answer.answer}</Text>
            <Text style={{color:'grey',marginTop:15}}>
              {answer.date} by {answer.creator}
            </Text>
          </View>
        ))}
        <Button label='Close' onPress={onClose} style={styles.closeButton}>
        </Button>
      </ScrollView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  answer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
  },
  answerText: {
    fontSize:20,
    fontWeight: "bold",
  },
  closeButton: {
    marginTop: 20,
    textAlign: "center",
    color: "blue",
    fontSize:20,
  },
});

export default AnswerModal;
