import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { JSX, useEffect, useState } from 'react';
import { QandA, useQuiz } from '../context/QuizContext';

type Option = {
  id: number;
  answer: string;
};

type Question = {
  id: string;
  question: string;
  type: string;
  options: Option[];
};

interface QuestionProps {
  questions: Question[];
}

const Question = ({ questions }: QuestionProps) => {
  const { answers, saveAnswer } = useQuiz();
  const [selected, setSelected] = useState<{ [id: string]: string[] }>({});

  const handleAnswerPress = (question: Question, answer: string) => {
    const current = selected[question.id] || [];

    if (question.type === 'multi') {
      const updated = current.includes(answer)
        ? current.filter(a => a !== answer)
        : [...current, answer];
      setSelected(prev => ({ ...prev, [question.id]: updated }));
      saveAnswer({
        qId: question.id,
        question: question.question,
        answer: updated,
      });
    } else {
      setSelected(prev => ({ ...prev, [question.id]: [answer] }));
      saveAnswer({
        qId: question.id,
        question: question.question,
        answer,
      });
    }
  };

  const renderAnswers = (question: Question): JSX.Element[] => {
    return question.options.map(option => {
      const isSelected = (selected[question.id] || []).includes(option.answer);
      return (
        <TouchableOpacity
          key={option.id}
          style={[styles.answer, isSelected && styles.answerSelected]}
          onPress={() => handleAnswerPress(question, option.answer)}
        >
          <Text
            style={[styles.answerText, isSelected && styles.answerTextChecked]}
          >
            {option.answer}
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
          <View>{renderAnswers(question)}</View>
        </View>
      </View>
    );
  };

  return (
    <View style={{ width: '100%' }}>
      {questions.map(question => renderQuestion(question))}
    </View>
  );
};

export default Question;

const styles = StyleSheet.create({
  container: {
    width: '100%',
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
    minHeight: 40,
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
    width: '90%',
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
