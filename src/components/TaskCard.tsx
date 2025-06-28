import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface TaskCardProps {
  isCompleted: boolean;
  title: string;
  description: string;
  category: string;
  categoryColor: string;
}

const TaskCard = ({
  isCompleted,
  title,
  description,
  category,
  categoryColor,
}: TaskCardProps) => {
  return (
    <View
      style={isCompleted ? styles.containerCompleted : styles.containerPending}
    >
      <View style={styles.statusContainer}>
        {isCompleted ? (
          <Ionicons name="checkmark-circle-outline" size={30} color={'green'} />
        ) : (
          <Ionicons name="radio-button-off" size={30} color={'gray'} />
        )}
      </View>
      <View style={styles.contentContainer}>
        <Text
          style={[
            styles.titleText,
            isCompleted && styles.titleTextStrikeThrough,
          ]}
        >
          {title}
        </Text>
        <Text style={styles.descriptionText}>{description}</Text>
        <View style={styles.categoryAndStatusContainer}>
          <View
            style={[
              styles.categoryContainer,
              { backgroundColor: categoryColor },
            ]}
          >
            <Text style={styles.categoryText}>{category}</Text>
          </View>
          <Text>{isCompleted ? 'Completed' : 'Pending'}</Text>
        </View>
      </View>
    </View>
  );
};

export default TaskCard;

const styles = StyleSheet.create({
  containerPending: {
    marginBottom: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    borderWidth: 0.5,
    borderLeftWidth: 5,
    borderColor: 'green',
    width: '90%',
    padding: 20,
    boxShadow: '0px 1px 4px rgba(30, 30, 30, 0.1)',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  containerCompleted: {
    marginBottom: 10,
    backgroundColor: 'white',
    borderRadius: 20,
    borderWidth: 0.5,
    borderLeftWidth: 5,
    borderColor: '#CC0082',
    width: '90%',
    padding: 20,
    boxShadow: '0px 1px 4px rgba(30, 30, 30, 0.1)',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statusContainer: {
    width: '10%',
  },
  contentContainer: {
    width: '85%',
  },
  titleText: {
    fontSize: 20,
    fontWeight: 500,
    marginBottom: 10,
  },
  titleTextStrikeThrough: {
    fontSize: 20,
    fontWeight: 500,
    marginBottom: 10,
    textDecorationLine: 'line-through',
  },
  descriptionText: {
    marginBottom: 10,
    fontSize: 16,
  },
  categoryAndStatusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryContainer: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 30,
    marginRight: 10,
  },
  categoryText: {
    color: 'white',
  },
});
