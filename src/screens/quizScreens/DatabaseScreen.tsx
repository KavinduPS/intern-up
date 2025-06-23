import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { QuizStackParamList } from '../../navigation/quizRoutes';
import { useNavigation } from '@react-navigation/native';
import { databaseSkills } from '../../constants/Questions';
import NextButton from '../../components/NextButton';
import Question from '../../components/Question';

type DatabaseSkillsNavigationProps = NativeStackNavigationProp<
  QuizStackParamList,
  'BackendDevelopment'
>;

const DatabaseScreen = () => {
  const navigation = useNavigation<DatabaseSkillsNavigationProps>();
  const handleNextPress = (): void => {
    navigation.navigate('Git');
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        <Question questions={databaseSkills} />
        <NextButton onPress={handleNextPress} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default DatabaseScreen;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 80,
    alignItems: 'center',
  },
});
