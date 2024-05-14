import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  TextInput,
  Modal,
  TouchableOpacity,
} from "react-native";
import QuestionCard from "./QuestionCard";
import AnswerModal from "./AnswerModal";
import { FontAwesome } from "@expo/vector-icons";
import { retrieveUsername, retrieveAccountType } from "./storage";

const QAList = [
  {
    question: "What is React Native?",
    date: "2024-05-01",
    creator: "Jane Doe",
    answers: [
      {
        answer:
          "React Native is a framework for building native apps using React.",
        creator: "John Smith",
        date: "2024-05-02",
      },
      {
        answer:
          "It allows you to use JavaScript and React along with native platform capabilities.",
        creator: "Alice Johnson",
        date: "2024-05-02",
      },
    ],
  },
  {
    question: "How does state management work in React?",
    date: "2024-05-03",
    creator: "Bob Lee",
    answers: [
      {
        answer:
          "State management in React can be done using useState hook for component local state, or using libraries like Redux or Context API for global state.",
        creator: "Emily Roe",
        date: "2024-05-04",
      },
      {
        answer:
          "React's state management is primarily about managing data that affects rendering. It's typically handled inside components or using state management libraries.",
        creator: "Mike Doe",
        date: "2024-05-04",
      },
    ],
  },
];

const QAScreen = () => {
  const [questions, setQuestions] = useState(QAList);
  const [filteredQuestions, setFilteredQuestions] = useState(questions);
  const [searchQuery, setSearchQuery] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [addQuestionModalVisible, setAddQuestionModalVisible] = useState(false);
  const [newQuestion, setNewQuestion] = useState("");
  const [isDoctor, setIsDoctor] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState("");

  const handleSearch = (text) => {
    setSearchQuery(text);
    const filteredData = questions.filter((item) =>
      item.question.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredQuestions(filteredData);
  };

  const handlePress = (answers, question) => {
    setSelectedAnswers(answers);
    setModalVisible(true);
    setSelectedQuestion(question);
  };
  useEffect(() => {
    const checkAccountType = async () => {
      const accountType = await retrieveAccountType();
      if (accountType === "Doctor") {
        setIsDoctor(true);
      }
    };

    checkAccountType();
  }, []);

  const handleAddQuestion = async () => {
    const userName = await retrieveUsername();

    const newQA = {
      question: newQuestion,
      date: new Date().toISOString().split("T")[0],
      creator: userName,
      answers: [],
    };
    setQuestions([newQA, ...questions]);
    setFilteredQuestions([newQA, ...filteredQuestions]);
    setNewQuestion("");
    setAddQuestionModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Search for questions..."
        value={searchQuery}
        onChangeText={handleSearch}
      />
      <FlatList
        data={filteredQuestions}
        renderItem={({ item }) => (
          <QuestionCard
            question={item}
            onPress={() => handlePress(item.answers, item.question)}
          />
        )}
        keyExtractor={(item, index) => index.toString()}
      />
      {!isDoctor && (
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setAddQuestionModalVisible(true)}
        >
          <FontAwesome name="plus" size={24} color="white" />
        </TouchableOpacity>
      )}
      <AnswerModal
        isDoctor={isDoctor}
        question={selectedQuestion}
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        answers={selectedAnswers}
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={addQuestionModalVisible}
        onRequestClose={() =>
          setAddQuestionModalVisible(!addQuestionModalVisible)
        }
      >
        <View style={styles.modalView}>
          <TextInput
            style={styles.modalText}
            placeholder="Enter your question..."
            value={newQuestion}
            onChangeText={setNewQuestion}
          />
          <TouchableOpacity style={styles.button} onPress={handleAddQuestion}>
            <Text style={styles.buttonText}>Add Question</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => setAddQuestionModalVisible(!addQuestionModalVisible)}
          >
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
    marginHorizontal: 15,
  },
  searchBar: {
    fontSize: 18,
    padding: 10,
    margin: 10,
    backgroundColor: "lightgrey",
    borderRadius: 5,
  },
  addButton: {
    position: "absolute",
    right: 20,
    bottom: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#007AFF",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 6,
  },
  modalView: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    margin: 20,
    backgroundColor: "#f9f9f9",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 20,
    textAlign: "center",
    fontSize: 18,
    width: "80%",
    borderColor: "#ddd",
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#fff",
  },
  button: {
    borderRadius: 20,
    padding: 10,
    marginBottom: 10,
    elevation: 2,
    backgroundColor: "#007AFF",
  },
  cancelButton: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    backgroundColor: "#F44336",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default QAScreen;
