import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';

interface PrimaryButtonProps {
  buttonText: string;
  onPress: () => void;
}

const PrimaryButton = ({ buttonText, onPress }: PrimaryButtonProps) => {
  return (
    <TouchableOpacity style={styles.nextButton} onPress={onPress}>
      <Text style={styles.buttonText}>{buttonText}</Text>
    </TouchableOpacity>
  );
};

export default PrimaryButton;

const styles = StyleSheet.create({
  nextButton: {
    width: 200,
    height: 50,
    backgroundColor: '#CC0082',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    marginTop: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
});
