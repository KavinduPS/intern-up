import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';

interface InterViewControlButtonProps {
  status: 'pause' | 'start' | 'end';
}

const InterViewControlButton = ({ status }: InterViewControlButtonProps) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        status === 'pause'
          ? {
              backgroundColor: '#BBB',
              borderColor: 'rgb(159, 159, 159)',
              borderWidth: 2,
            }
          : status === 'start'
          ? {
              backgroundColor: 'green',
              borderColor: 'rgb(4, 112, 0)',
              borderWidth: 2,
            }
          : status === 'end'
          ? {
              backgroundColor: 'red',
              borderColor: 'rgb(196, 0, 0)',
              borderWidth: 2,
            }
          : null,
      ]}
    >
      <Text style={{ fontSize: 18, color: 'white', textAlign: 'center' }}>
        {status === 'start'
          ? 'START INTERVIEW'
          : status === 'pause'
          ? 'PAUSE INTERVIEW'
          : status === 'end'
          ? 'END INTERVIEW'
          : null}
      </Text>
    </TouchableOpacity>
  );
};

export default InterViewControlButton;

const styles = StyleSheet.create({
  button: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 80,
    width: 140,
  },
});
