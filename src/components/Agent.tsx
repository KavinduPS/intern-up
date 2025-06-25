import {
  StyleSheet,
  Text,
  View,
  Animated,
  TouchableOpacity,
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

enum CallStatus {
  INACTIVE = 'INACTIVE',
  CONNECTING = 'CONNECTING',
  ACTIVE = 'ACTIVE',
  FINISHED = 'FINISHED',
}

const Agent = () => {
  const [isAISpeaking, setIsAISpeaking] = useState(false);
  const [isUserSpeaking, setUserSpeaking] = useState(false);
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const callStatus = CallStatus.ACTIVE;
  const messages = ['What is your name', 'My name is John'];
  const lastMessage = messages[messages.length - 1];

  const startSpeakingAnimation = () => {
    // Scale up animation (popup effect)
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 1.3,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1.1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();

    // Continuous pulse animation while speaking
    const pulseAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.2,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
      ]),
    );
    pulseAnimation.start();
  };

  // Function to stop animation when AI stops speaking
  const stopSpeakingAnimation = () => {
    // Stop pulse animation
    pulseAnim.stopAnimation();

    // Scale back to normal
    Animated.parallel([
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(pulseAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  };

  // Effect to handle speaking state changes
  useEffect(() => {
    if (isAISpeaking) {
      startSpeakingAnimation();
    } else {
      stopSpeakingAnimation();
    }
  }, [isAISpeaking]);

  // Demo: Toggle speaking state every 3 seconds for testing
  useEffect(() => {
    const interval = setInterval(() => {
      setIsAISpeaking(prev => !prev);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.interviewerCard}>
        <Animated.View
          style={[
            styles.micContainer,
            {
              transform: [{ scale: Animated.multiply(scaleAnim, pulseAnim) }],
            },
          ]}
        >
          <Ionicons name={'mic'} size={50} color="white" />
        </Animated.View>
        {isAISpeaking && (
          <View style={styles.speakingIndicator}>
            <Text style={styles.speakingText}>AI Interviewer</Text>
          </View>
        )}
      </View>

      <View style={styles.userCard}>
        <Animated.View
          style={[
            styles.micContainer,
            {
              transform: [{ scale: Animated.multiply(scaleAnim, pulseAnim) }],
            },
          ]}
        >
          <Ionicons name="mic" size={50} color="white" />
        </Animated.View>
        {isAISpeaking && (
          <View style={styles.speakingIndicator}>
            <Text style={styles.speakingText}>You</Text>
          </View>
        )}
      </View>
      {messages.length > 0 && (
        <View style={styles.transcriptView}>
          <Text style={{ color: 'white' }}>{lastMessage}</Text>
        </View>
      )}
      <View style={styles.controlsContainer}>
        {callStatus !== 'ACTIVE' ? (
          <TouchableOpacity style={styles.callButton}>
            <Text style={{ color: 'white', fontSize: 20 }}>
              {callStatus === 'INACTIVE' || callStatus === 'FINISHED'
                ? 'Call'
                : '...'}
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.endButton}>
            <Text style={{ color: 'white', fontSize: 20 }}>End</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default Agent;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  interviewerCard: {
    width: '90%',
    height: 200,
    backgroundColor: 'rgb(59, 13, 110)',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userCard: {
    width: '90%',
    height: 200,
    backgroundColor: 'rgb(116, 5, 51)',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  micContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  aiAvatar: {
    fontSize: 80,
  },
  speakingIndicator: {
    position: 'absolute',
    bottom: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  speakingText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '500',
  },
  transcriptView: {
    width: '90%',
    minHeight: 20,
    backgroundColor: 'gray',
    marginTop: 10,
    borderRadius: 10,
    padding: 5,
    alignItems: 'center',
  },
  controlsContainer: {
    marginTop: 10,
    alignItems: 'center',
  },
  callButton: {
    backgroundColor: 'green',
    padding: 5,
    minWidth: 80,
    borderRadius: 20,
    alignItems: 'center',
  },
  endButton: {
    backgroundColor: 'red',
    padding: 5,
    minWidth: 80,
    borderRadius: 20,
    alignItems: 'center',
  },
});
