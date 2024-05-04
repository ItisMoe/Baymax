import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const QuestionCard = ({ question, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.card}>
      <Text style={styles.question}>{question.question}</Text>
      <Text style={styles.details}>
        {question.date} by {question.creator}
      </Text>
      <View style={styles.footer}>
        {question.answers.length > 0 && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>Answered</Text>
          </View>
        )}
        <Text style={styles.answerCount}>
          {question.answers.length} Answers
        </Text>
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  card: {
    padding: 20,
    marginVertical: 8,
    backgroundColor: "#fff",
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  question: {
    fontWeight: "bold",
    fontSize: 25,
  },
  details: {
    fontSize: 12,
    color: "#666",
    marginBottom: 5,
  },
  answerCount: {
    fontSize: 16,
    color: "#444",
    marginTop: 5,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  badge: {
    backgroundColor: "green",
    borderRadius: 5,
    paddingVertical: 2,
    paddingHorizontal: 8,
    marginTop:7,
  },
  badgeText: {
    color: "white",
    fontSize: 12,
  },
});

export default QuestionCard;
