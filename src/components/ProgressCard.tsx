import { StyleSheet, Text, View } from 'react-native';
import React, { ReactElement } from 'react';
import { Ionicons } from '@expo/vector-icons';

interface ProgressCardProps {
  renderCardIcon: () => ReactElement;
  cardText: string;
  progress: number;
}

const ProgressCard = ({
  renderCardIcon,
  progress,
  cardText,
}: ProgressCardProps) => {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.progressIcon}>{renderCardIcon()}</View>
      <Text style={styles.progressText}>{progress}</Text>
      <Text style={styles.progressDescription}>{cardText}</Text>
    </View>
  );
};

export default ProgressCard;

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: 'white',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 40,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    borderRadius: 20,
  },
  progressIcon: {
    marginBottom: 10,
  },
  progressText: {
    marginBottom: 10,
    fontSize: 25,
    fontWeight: 700,
  },
  progressDescription: {
    fontSize: 18,
  },
});
