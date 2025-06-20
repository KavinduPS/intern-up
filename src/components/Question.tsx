import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { JSX, useState } from 'react';

type Question = {
  id: string;
  question: string;
  type: string;
  options: string[];
};

interface QuestionProps {
  questions: Question[];
}

const Question = ({ questions }: QuestionProps) => {
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);

  const handleAnswerPress = (answer: string) => {
    if (selectedAnswers.includes(answer)) {
      setSelectedAnswers(selectedAnswers.filter(item => item !== answer));
    } else {
      setSelectedAnswers([...selectedAnswers, answer]);
    }
  };

  const renderAnswers = (options: string[]): JSX.Element[] => {
    return options.map((option, index) => {
      const isSelected = selectedAnswers.includes(option);
      return (
        <TouchableOpacity
          key={index}
          style={[styles.answer, isSelected && styles.answerSelected]}
          onPress={() => handleAnswerPress(option)}
        >
          <Text
            style={[styles.answerText, isSelected && styles.answerTextChecked]}
          >
            {option}
          </Text>
          <View
            style={[styles.checkBox, isSelected && styles.checkboxSelected]}
          >
            {!isSelected ? (
              <Text></Text>
            ) : (
              <Text style={{ color: '#CC0082' }}>✓</Text>
            )}
          </View>
        </TouchableOpacity>
      );
    });
  };

  const renderQuestion = (question: Question): JSX.Element => {
    return (
      <View style={styles.container}>
        <View style={styles.question}>
          <Text style={styles.questionText}>{question.question}</Text>
          <View>{renderAnswers(question.options)}</View>
        </View>
      </View>
    );
  };

  return (
    <ScrollView>
      {questions.map(question => renderQuestion(question))}
    </ScrollView>
  );
};

export default Question;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 10,
  },
  question: { width: '90%', fontSize: 16 },
  questionText: {
    fontSize: 16,
    marginBottom: 5,
  },
  answer: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#CC0082',
    borderRadius: 10,
    padding: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 10,
  },
  answerSelected: {
    width: '100%',
    height: 40,
    backgroundColor: '#CC0082',
    borderRadius: 10,
    padding: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  answerText: {
    color: 'black',
    fontSize: 14,
  },
  answerTextChecked: {
    color: 'white',
    fontSize: 14,
  },
  checkBox: {
    height: 16,
    width: 16,
    borderWidth: 1,
    borderColor: '#CC0082',
    borderRadius: 4,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxSelected: {
    height: 16,
    width: 16,
    backgroundColor: 'white',
    borderRadius: 4,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
