import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { skillCardColors } from '../constants/colors';

interface SkillResultCardProps {
  skillCategory: string;
  skillLevel: string;
  index: number;
}

const SkillResultCard = ({
  skillCategory,
  skillLevel,
  index,
}: SkillResultCardProps) => {
  const backgroundColor = skillCardColors[index % skillCardColors.length];
  return (
    <View style={[styles.container, { backgroundColor }]}>
      {/* <View>
        <Text></Text>
      </View> */}
      <View style={styles.skillDetailsContainer}>
        <Text style={styles.skillCategory}>{skillCategory}</Text>
        <Text style={styles.skillLevel}>✹ {skillLevel}</Text>
      </View>
      <View>
        <Text style={{ color: 'white' }}>Progress</Text>
      </View>
    </View>
  );
};

export default SkillResultCard;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: '#CC0082',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    borderRadius: 10,
    minHeight: 100,
    marginBottom: 10,
    paddingHorizontal: 20,
  },
  skillDetailsContainer: {},
  skillCategory: {
    fontSize: 16,
    fontWeight: 500,
    color: 'white',
    marginBottom: 10,
  },
  skillLevel: {
    fontWeight: 500,
    color: 'white',
  },
});
