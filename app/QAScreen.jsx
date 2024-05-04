import React, { useState } from 'react';
import { View, StyleSheet, FlatList, TextInput } from 'react-native';
import QuestionCard from './QuestionCard';
import AnswerModal from './AnswerModal';

const QAList = [
  {
    "question": "What is React Native?",
    "date": "2024-05-01",
    "creator": "Jane Doe",
    "answers": [
      {
        "answer": "React Native is a framework for building native apps using React.",
        "creator": "John Smith",
        "date": "2024-05-02"
      },
      {
        "answer": "It allows you to use JavaScript and React along with native platform capabilities.",
        "creator": "Alice Johnson",
        "date": "2024-05-02"
      }
    ]
  },
  {
    "question": "How does state management work in React?",
    "date": "2024-05-03",
    "creator": "Bob Lee",
    "answers": [
      {
        "answer": "State management in React can be done using useState hook for component local state, or using libraries like Redux or Context API for global state.",
        "creator": "Emily Roe",
        "date": "2024-05-04"
      },
      {
        "answer": "React's state management is primarily about managing data that affects rendering. It's typically handled inside components or using state management libraries.",
        "creator": "Mike Doe",
        "date": "2024-05-04"
      }
    ]
  }
]


const QAScreen = () => {
  const [questions, setQuestions] = useState(QAList) // your JSON data here
  const [filteredQuestions, setFilteredQuestions] = useState(questions);
  const [searchQuery, setSearchQuery] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState([]);

  const handleSearch = (text) => {
    setSearchQuery(text);
    const filteredData = questions.filter(item =>
      item.question.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredQuestions(filteredData);
  };

  const handlePress = (answers) => {
    setSelectedAnswers(answers);
    setModalVisible(true);
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
            onPress={() => handlePress(item.answers)}
          />
        )}
        keyExtractor={(item, index) => index.toString()}
      />
      <AnswerModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        answers={selectedAnswers}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
    marginHorizontal:15,
  },
  searchBar: {
    fontSize: 18,
    padding: 10,
    margin: 10,
    backgroundColor: 'lightgrey',
    borderRadius: 5,
  },
});

export default QAScreen;
