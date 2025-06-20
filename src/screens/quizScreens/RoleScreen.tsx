import { View, Text, SafeAreaView, StyleSheet } from 'react-native';
import React from 'react';
import NextButton from '../../components/NextButton';
import RoleSelection from '../../components/RoleSelection';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { QuizStackParamList } from '../../navigation/quizRoutes';
import QuizQuestion, { Option } from '../../components/QuizQuestion';

type RoleScreenNavigationProps = NativeStackNavigationProp<
  QuizStackParamList,
  'SelectRole'
>;

const RoleScreen = () => {
  const navigation = useNavigation<RoleScreenNavigationProps>();
  const onNextButtonPress = () => {
    navigation.navigate('ProgrammingFundamentals');
  };

  const options: Option[] = [
    { id: 1, text: 'JavaScript', value: 'javascript' },
    { id: 2, text: 'Java', value: 'java' },
    { id: 3, text: 'Python', value: 'python' },
    { id: 4, text: 'C#', value: 'csharp' },
    { id: 5, text: "I haven't used any", value: 'none' },
  ];

  // Handle answer selection
  const handleNext = (selectedOptions: Option[]) => {
    console.log('Selected:', selectedOptions);
    // Navigate to next question or process answer
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.question}>What role are you most interested in?</Text>
      <View style={styles.dropdownContainer}>
        <RoleSelection />
      </View>
      <View style={styles.buttonContainer}>
        <NextButton onPress={onNextButtonPress} />
      </View>
    </SafeAreaView>
  );
};

export default RoleScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  question: {
    fontSize: 20,
  },
  dropdownContainer: {
    width: '80%',
  },
  buttonContainer: {},
});
