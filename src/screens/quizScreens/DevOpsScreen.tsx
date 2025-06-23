import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { QuizStackParamList } from '../../navigation/quizRoutes';
import { useNavigation } from '@react-navigation/native';
import NextButton from '../../components/NextButton';
import Question from '../../components/Question';
import { devOps } from '../../constants/Questions';

type DevOpsNavigationProps = NativeStackNavigationProp<
  QuizStackParamList,
  'DevOps'
>;

const DevOpsScreen = () => {
  const navigation = useNavigation<DevOpsNavigationProps>();
  const handleNextPress = (): void => {
    navigation.navigate('SoftSkills');
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        <Question questions={devOps} />
        <NextButton onPress={handleNextPress} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default DevOpsScreen;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 80,
    alignItems: 'center',
  },
});
