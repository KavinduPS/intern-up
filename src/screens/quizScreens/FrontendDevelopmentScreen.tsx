import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { QuizStackParamList } from '../../navigation/quizRoutes';
import { useNavigation } from '@react-navigation/native';
import NextButton from '../../components/NextButton';
import Question from '../../components/Question';
import { frontendDevelopment } from '../../constants/Questions';

type FrontendDevelopmentNavigationProps = NativeStackNavigationProp<
  QuizStackParamList,
  'FrontendDevelopment'
>;

const FrontendDevelopmentScreen = () => {
  const navigation = useNavigation<FrontendDevelopmentNavigationProps>();
  const handleNextPress = (): void => {
    navigation.navigate('BackendDevelopment');
  };
  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          <Question questions={frontendDevelopment} />
          <NextButton onPress={handleNextPress} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default FrontendDevelopmentScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
});
