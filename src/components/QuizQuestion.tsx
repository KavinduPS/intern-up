import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';

// Type definitions
interface Option {
  id: number;
  text: string;
  value: string;
}

interface QuizQuestionProps {
  title: string;
  subtitle: string;
  questionNumber: number;
  question: string;
  options: Option[];
  isMultipleChoice?: boolean;
  onNext: (selectedOptions: Option[]) => void;
  nextButtonText?: string;
}

const QuizQuestion: React.FC<QuizQuestionProps> = ({
  title,
  subtitle,
  questionNumber,
  question,
  options,
  isMultipleChoice = false,
  onNext,
  nextButtonText = 'Next',
}) => {
  const [selectedOptions, setSelectedOptions] = useState<Option[]>([]);

  const handleOptionSelect = (option: Option): void => {
    if (isMultipleChoice) {
      // Multiple selection
      const isSelected = selectedOptions.some(sel => sel.id === option.id);
      if (isSelected) {
        setSelectedOptions(selectedOptions.filter(sel => sel.id !== option.id));
      } else {
        setSelectedOptions([...selectedOptions, option]);
      }
    } else {
      // Single selection
      setSelectedOptions([option]);
    }
  };

  const handleNext = (): void => {
    onNext(selectedOptions);
  };

  const isNextDisabled: boolean = selectedOptions.length === 0;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>{subtitle}</Text>
        </View>

        <ScrollView
          style={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          {/* Question */}
          <View style={styles.questionContainer}>
            <Text style={styles.questionNumber}>
              {questionNumber}. {question}
            </Text>
          </View>

          {/* Options */}
          <View style={styles.optionsContainer}>
            {options.map((option: Option) => {
              const isSelected = selectedOptions.some(
                sel => sel.id === option.id,
              );
              return (
                <TouchableOpacity
                  key={option.id}
                  style={[
                    styles.optionButton,
                    isSelected && styles.selectedOption,
                  ]}
                  onPress={() => handleOptionSelect(option)}
                  activeOpacity={0.7}
                >
                  <Text
                    style={[
                      styles.optionText,
                      isSelected && styles.selectedOptionText,
                    ]}
                  >
                    {option.text}
                  </Text>
                  <View
                    style={[styles.checkbox, isSelected && styles.checkedBox]}
                  >
                    {isSelected && <Text style={styles.checkmark}>✓</Text>}
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>

        {/* Next Button */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.nextButton, isNextDisabled && styles.disabledButton]}
            onPress={handleNext}
            disabled={isNextDisabled}
            activeOpacity={0.8}
          >
            <Text
              style={[
                styles.nextButtonText,
                isNextDisabled && styles.disabledButtonText,
              ]}
            >
              {nextButtonText}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8e6f3',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  header: {
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
  },
  scrollContainer: {
    flex: 1,
  },
  questionContainer: {
    marginBottom: 25,
  },
  questionNumber: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    lineHeight: 26,
  },
  optionsContainer: {
    marginBottom: 20,
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#d147a3',
    paddingVertical: 16,
    paddingHorizontal: 20,
    marginBottom: 12,
    minHeight: 56,
  },
  selectedOption: {
    backgroundColor: '#d147a3',
    borderColor: '#d147a3',
  },
  optionText: {
    fontSize: 16,
    color: '#333',
    flex: 1,
    fontWeight: '500',
  },
  selectedOptionText: {
    color: 'white',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#d147a3',
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 12,
  },
  checkedBox: {
    backgroundColor: 'white',
  },
  checkmark: {
    color: '#d147a3',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonContainer: {
    paddingVertical: 20,
  },
  nextButton: {
    backgroundColor: '#d147a3',
    borderRadius: 25,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  nextButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  disabledButtonText: {
    color: '#888',
  },
});

export default QuizQuestion;
export type { Option, QuizQuestionProps };
