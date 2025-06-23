import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { QuizStackParamList } from '../../navigation/quizRoutes';
import { gitAndVersionControl } from '../../constants/Questions';
import { useNavigation } from '@react-navigation/native';
import NextButton from '../../components/NextButton';
import Question from '../../components/Question';

type GitNavigationProps = NativeStackNavigationProp<QuizStackParamList, 'Git'>;

const GitScreen = () => {
  const navigation = useNavigation<GitNavigationProps>();
  const handleNextPress = (): void => {
    navigation.navigate('DevOps');
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        <Question questions={gitAndVersionControl} />
        <NextButton onPress={handleNextPress} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default GitScreen;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 80,
    alignItems: 'center',
  },
});
