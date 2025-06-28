import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { ReactElement } from 'react';
import LinearGradient from 'react-native-linear-gradient';

interface InterviewCardProps {
  renderIcon: () => ReactElement;
  isSpeaking: boolean;
  isUser: boolean;
}

const InterviewCard = ({
  renderIcon,
  isSpeaking,
  isUser,
}: InterviewCardProps) => {
  // const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  return (
    <LinearGradient
      colors={['#a8edea', '#fed6e3']}
      useAngle
      angle={135}
      style={styles.container}
    >
      <View style={styles.iconContainer}>{renderIcon()}</View>
      <View
        style={
          isSpeaking
            ? styles.statusContainerSpeaking
            : styles.statusContainerListening
        }
      >
        <Text
          style={
            isSpeaking ? styles.statusTextSpeaking : styles.statusTextListening
          }
        >
          {isSpeaking ? 'Speaking...' : 'Listening...'}
        </Text>
      </View>
      {!isUser ? (
        <View style={styles.messageContainer}>
          <Text style={styles.messageText}>
            Can you tell me about a challenging project you worked on recently?
          </Text>
        </View>
      ) : (
        <View style={styles.userButtonControlsContainer}>
          <TouchableOpacity style={styles.controlButton}>
            <Text>Done</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.controlButton}>
            <Text>Skip</Text>
          </TouchableOpacity>
        </View>
      )}
    </LinearGradient>
  );
};

export default InterviewCard;

const styles = StyleSheet.create({
  container: {
    width: '90%',
    alignItems: 'center',
    marginTop: 20,
    borderRadius: 20,
  },
  iconContainer: {
    height: 80,
    width: 80,
    borderRadius: 40,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  statusContainerSpeaking: {
    backgroundColor: 'rgb(177, 253, 206)',
    padding: 10,
    borderRadius: 20,
    marginBottom: 20,
  },
  statusContainerListening: {
    backgroundColor: 'orange',
    padding: 10,
    borderRadius: 20,
    marginBottom: 20,
  },
  statusTextSpeaking: {
    color: 'rgb(18, 78, 52)',
    fontSize: 16,
  },
  statusTextListening: {
    color: 'rgb(176, 94, 0)',
    fontSize: 16,
  },
  messageContainer: {
    backgroundColor: 'white',
    width: '80%',
    marginBottom: 20,
    padding: 20,
    borderRadius: 20,
  },
  messageText: {
    fontSize: 18,
    color: '#555',
  },
  userButtonControlsContainer: {
    flexDirection: 'row',
    width: '35%',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  controlButton: {
    backgroundColor: 'white',
    padding: 5,
    paddingHorizontal: 10,
    borderRadius: 20,
  },
});
