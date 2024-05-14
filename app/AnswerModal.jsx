import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Modal,
  StyleSheet,
  ScrollView,
  TextInput,
} from "react-native";
import { Button } from "react-native-ui-lib";
import { retrieveUsername } from "./storage";

const AnswerModal = ({ visible, onClose, answers, question, isDoctor }) => {
  const [allAnswers, setAllAnswers] = useState([]);
  useEffect(() => {
    setAllAnswers(answers);
  },[answers]);
  const [newAnswer, setNewAnswer] = useState("");

  const handleAddAnswer = async () => {
    const userName = await retrieveUsername();

    const newAns = {
      answer: newAnswer,
      creator: userName,
      date: new Date().toISOString().split("T")[0],
    };
    setAllAnswers([newAns, ...allAnswers]);
    setNewAnswer("");

    //TODO add this answer newAns to the backend, --- to know what question you need to add this answer to I have passed the question like the question as it should be unique, and if you want you can pass 
    // the id if questions have id in database so you pass it from QA screen and then you use it here to know which question you need to add this answer to
    //note that if I added answer here and then I close the model to open another question, the state of the of the answer will not appear if I reopened this question, as this is rendered per state, to make it pereminent
    //the only way is through database
    //so what you should do is that depending on what is the unique (question or id) you can use either of them, so you need to add the answer to that question or id in the answers list, where the answer is (newAns) :)
  };
  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={visible}
      onRequestClose={onClose}
    >
      <ScrollView style={styles.container}>
        {allAnswers.map((answer, index) => (
          <View key={index} style={styles.answer}>
            <Text style={styles.answerText}>{answer.answer}</Text>
            <Text style={{ color: "grey", marginTop: 15 }}>
              {answer.date} by {answer.creator}
            </Text>
          </View>
        ))}
        {isDoctor && (
        <TextInput
          style={{
            marginTop: 20,
            width: "50em",
            backgroundColor: "#f0f0f0", // Example background color
            padding: 15, // Example padding
            fontSize: 17, // Example font size
            borderColor: "#ccc", // Example border color
            borderWidth: 1, // Example border width
            borderRadius: 15, // Example border radius
          }}
          placeholder="Type Your Answer"
          value={newAnswer}
          onChangeText={(answer) => setNewAnswer(answer)}
        />)}

        {isDoctor && (
          <Button
            disabled={newAnswer === null || newAnswer === ""}
            label="Add Answer"
            onPress={handleAddAnswer}
            style={styles.submitButton}
          />
        )}
        <Button label="Close" onPress={onClose} style={styles.closeButton} />
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
    fontSize: 20,
    fontWeight: "bold",
  },
  closeButton: {
    marginTop: 20,
    marginBottom: 60,
    textAlign: "center",
    color: "blue",
    fontSize: 20,
  },
  submitButton: {
    marginTop: 20,
    marginBottom: 0,
    textAlign: "center",
    color: "blue",
    fontSize: 20,
  },
});

export default AnswerModal;
