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
    question: "What is the importance of medication adherence?",
    date: "2024-05-15",
    creator: "Dr. Sarah Lee",
    answers: [
      {
        answer:
          "Medication adherence ensures that patients take their medications as prescribed, which is crucial for the effectiveness of treatment, especially for chronic conditions.",
        creator: "Dr. John Hargrove",
        date: "2024-05-16",
      },
      {
        answer:
          "Poor adherence can lead to significant health complications, higher healthcare costs, and increased mortality rates.",
        creator: "Dr. Emily Thompson",
        date: "2024-05-16",
      },
    ],
  },
  {
    question: "How can digital health tools improve patient care?",
    date: "2024-05-15",
    creator: "Dr. Alex Kim",
    answers: [
      {
        answer:
          "Digital health tools can enhance patient engagement, improve medication management, and allow doctors to monitor patients remotely, leading to better health outcomes.",
        creator: "Dr. Natalie Chen",
        date: "2024-05-16",
      },
      {
        answer:
          "They provide real-time data that helps in making informed decisions and personalizing treatment plans.",
        creator: "Dr. Mark Lee",
        date: "2024-05-16",
      },
    ],
  },
  {
    question:
      "What are the benefits of telemedicine for chronic disease management?",
    date: "2024-05-15",
    creator: "Dr. Carlos Rodriguez",
    answers: [
      {
        answer:
          "Telemedicine allows for regular monitoring and management of chronic diseases without the need for frequent visits to healthcare facilities.",
        creator: "Dr. Jessica Walters",
        date: "2024-05-16",
      },
      {
        answer:
          "It enhances accessibility to specialist care, especially for patients in remote areas, and can lead to improved disease control.",
        creator: "Dr. Susan Patel",
        date: "2024-05-16",
      },
    ],
  },
  {
    question: "What are common side effects of antibiotics?",
    date: "2024-05-15",
    creator: "Dr. Maria Gonzalez",
    answers: [
      {
        answer:
          "Common side effects include nausea, diarrhea, and an increased risk of developing antibiotic-resistant bacteria.",
        creator: "Dr. Tom Brady",
        date: "2024-05-16",
      },
      {
        answer:
          "Some antibiotics can cause allergic reactions and sensitivity to sunlight.",
        creator: "Dr. Anna Lee",
        date: "2024-05-16",
      },
    ],
  },
  {
    question: "How does personalized medicine impact treatment strategies?",
    date: "2024-05-15",
    creator: "Dr. Ravi Gupta",
    answers: [
      {
        answer:
          "Personalized medicine tailors treatment based on individual genetic profiles, leading to more effective and less toxic therapies.",
        creator: "Dr. Linda Hart",
        date: "2024-05-16",
      },
      {
        answer:
          "It helps in identifying the most effective medications and dosages, reducing trial and error in prescribing practices.",
        creator: "Dr. Michael Cho",
        date: "2024-05-16",
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
