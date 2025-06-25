import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { QuizStackParamList } from '../../navigation/quizRoutes';
import { softSkills } from '../../constants/Questions';
import { useNavigation } from '@react-navigation/native';
import NextButton from '../../components/NextButton';
import Question from '../../components/Question';

type SoftSkillsNavigationProps = NativeStackNavigationProp<
  QuizStackParamList,
  'SoftSkills'
>;

const SoftSkillsScreen = () => {
  const navigation = useNavigation<SoftSkillsNavigationProps>();
  const handleNextPress = (): void => {
    navigation.navigate('SkillLevel');
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        <Question questions={softSkills} />
        <NextButton onPress={handleNextPress} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default SoftSkillsScreen;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 80,
    alignItems: 'center',
  },
});
