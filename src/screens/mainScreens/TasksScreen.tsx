import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import TaskCard from '../../components/TaskCard';

const TasksScreen = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.headerContainer}>
          <View style={styles.headerTitleContainer}>
            <Ionicons
              name="calendar-clear-outline"
              size={30}
              color={'#CC0082'}
            />
            <Text style={styles.headerTitle}>Daily Tasks</Text>
            <Text style={styles.taskProgressText}>3 of 5 done</Text>
          </View>
          <Text style={{ fontSize: 18, marginBottom: 20, fontWeight: 500 }}>
            Today's Progress
          </Text>
          <Text style={{ color: '#555555' }}>
            Keep up the momentum! You're doing great! 🔥
          </Text>
        </View>
        <TaskCard
          isCompleted={false}
          title="Build a calculator in JS"
          description="Practice dom manipulations and functions"
          category="Fundamentals"
          categoryColor="#6366F1"
        />
        <TaskCard
          isCompleted={false}
          title="LinkedIn Profile Optimization"
          description="Update summary and add recent projects"
          category="Soft Skills"
          categoryColor="#EF4444"
        />
        <TaskCard
          isCompleted={true}
          title="Complete Git Tutorial"
          description="Practice branching and merging"
          category="Git & Version Control"
          categoryColor="#F59E0B"
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default TasksScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerContainer: {
    marginVertical: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    borderWidth: 0.5,
    borderColor: '#AAAAAA',
    width: '90%',
    padding: 20,
    boxShadow: '0px 1px 4px rgba(30, 30, 30, 0.1)',
  },
  headerTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 25,
    fontWeight: 700,
  },
  taskProgressText: {
    color: '#555555',
  },
});
