import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';

interface NextButtonProps {
  onPress: () => void;
}

const NextButton = ({ onPress }: NextButtonProps) => {
  return (
    <TouchableOpacity style={styles.nextButton} onPress={onPress}>
      <Text style={styles.buttonText}>Next</Text>
    </TouchableOpacity>
  );
};

export default NextButton;

const styles = StyleSheet.create({
  nextButton: {
    width: 200,
    height: 50,
    backgroundColor: '#CC0082',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
});
