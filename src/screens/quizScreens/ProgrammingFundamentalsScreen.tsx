import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Question from '../../components/Question';
import { programmingFundamentals } from '../../constants/Questions';

const ProgrammingFundamentalsScreen = () => {
  return (
    <View>
      <Text></Text>
      <Question questions={programmingFundamentals} />
    </View>
  );
};

export default ProgrammingFundamentalsScreen;

const styles = StyleSheet.create({});
