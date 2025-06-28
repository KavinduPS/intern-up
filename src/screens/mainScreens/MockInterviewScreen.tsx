import { ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { ReactElement } from 'react';
import Agent from '../../components/Agent';
import NewAgent from '../../components/NewAgent';
import InterviewCard from '../../components/InterviewCard';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import InterViewControlButton from '../../components/InterViewControlButton';

const MockInterviewScreen = () => {
  const renderIcon = (iconName: string): ReactElement => {
    return <Ionicons name={iconName} size={50} color={'black'} />;
  };
  return (
    <SafeAreaView style={{ flex: 1 }} edges={['left', 'right']}>
      <ScrollView contentContainerStyle={styles.container}>
        <InterviewCard
          renderIcon={() => renderIcon('logo-octocat')}
          isSpeaking={false}
          isUser={false}
        />
        <InterviewCard
          renderIcon={() => renderIcon('mic')}
          isSpeaking={true}
          isUser={true}
        />
        <View style={styles.mainControlsContainer}>
          <InterViewControlButton status="pause" />
          <InterViewControlButton status="end" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default MockInterviewScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 100,
  },
  mainControlsContainer: {
    width: '90%',
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'space-around',
  },
});
