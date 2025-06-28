import { ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useQuiz } from '../../context/QuizContext';
import { assignSkillLevel, SkillLevel } from '../../services/roadmapService';
import { SafeAreaView } from 'react-native-safe-area-context';
import { skillCategory } from '../../services/skillScoringConfig';
import SkillResultCard from '../../components/SkillResultCard';
import PrimaryButton from '../../components/PrimaryButton';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { QuizStackParamList } from '../../navigation/QuizRoutes';
import { useNavigation } from '@react-navigation/native';

type SkillLevelNavigationProps = NativeStackNavigationProp<
  QuizStackParamList,
  'SkillLevel'
>;

const SkillLevelScreen = () => {
  const { answers, saveSkillLevels } = useQuiz();
  const [skillLevel, setSkillLevel] = useState<SkillLevel>();
  const navigation = useNavigation<SkillLevelNavigationProps>();
  useEffect(() => {
    const mySkillLevel = assignSkillLevel(answers);
    setSkillLevel(mySkillLevel);
  }, []);

  const handleViewRoadmapPress = (): void => {
    saveSkillLevels(skillLevel!);
    navigation.navigate('Roadmap');
  };

  const renderResults = (skillLevel: SkillLevel): React.ReactNode => {
    return Object.entries(skillLevel!).map(([key, value], index) => (
      <SkillResultCard
        skillCategory={skillCategory[key as keyof typeof skillCategory]}
        skillLevel={value}
        index={index}
      />
    ));
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['left', 'right']}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.container}>
          {skillLevel && renderResults(skillLevel)}
        </View>
        <PrimaryButton
          onPress={() => {
            handleViewRoadmapPress();
          }}
          buttonText="View My Roadmap"
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default SkillLevelScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollContent: {
    alignItems: 'center',
    paddingHorizontal: '5%',
    marginTop: 20,
    paddingBottom: 100,
  },
  container: {
    backgroundColor: 'white',
    width: '100%',
  },
});
