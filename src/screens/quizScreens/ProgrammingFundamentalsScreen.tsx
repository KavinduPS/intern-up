import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useContext } from 'react';
import Question from '../../components/Question';
import { programmingFundamentals } from '../../constants/Questions';
import NextButton from '../../components/NextButton';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { QuizStackParamList } from '../../navigation/quizRoutes';
import { useQuiz } from '../../context/QuizContext';

type ProgrammingFundamentalsNavigationProps = NativeStackNavigationProp<
  QuizStackParamList,
  'ProgrammingFundamentals'
>;

const ProgrammingFundamentalsScreen = () => {
  const navigation = useNavigation<ProgrammingFundamentalsNavigationProps>();
  const handleNextPress = (): void => {
    navigation.navigate('FrontendDevelopment');
  };
  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          <Question questions={programmingFundamentals} />
          <NextButton onPress={handleNextPress} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProgrammingFundamentalsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
});
