import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { QuizStackParamList } from '../../navigation/quizRoutes';
import { useNavigation } from '@react-navigation/native';
import NextButton from '../../components/NextButton';
import Question from '../../components/Question';
import { backendDevelopment } from '../../constants/Questions';

type BackendDevelopmentNavigationProps = NativeStackNavigationProp<
  QuizStackParamList,
  'BackendDevelopment'
>;

const BackendDevelopmentScreen = () => {
  const navigation = useNavigation<BackendDevelopmentNavigationProps>();
  const handleNextPress = (): void => {
    navigation.navigate('DatabaseSkills');
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        <Question questions={backendDevelopment} />
        <NextButton onPress={handleNextPress} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default BackendDevelopmentScreen;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 80,
    alignItems: 'center',
  },
});
