import {
  StyleSheet,
  Text,
  View,
  Animated,
  TouchableOpacity,
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Tts from 'react-native-tts';
import { mockQuestions } from '../constants/Questions';
import Voice, { SpeechResultsEvent } from '@react-native-community/voice';
import LinearGradient from 'react-native-linear-gradient';

Tts.setDefaultLanguage('en-US');

enum CallStatus {
  INACTIVE = 'INACTIVE',
  CONNECTING = 'CONNECTING',
  ACTIVE = 'ACTIVE',
  FINISHED = 'FINISHED',
}

const Agent = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isAISpeaking, setIsAISpeaking] = useState<boolean>(false);
  const [isUserSpeaking, setUserSpeaking] = useState(false);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const [interviewPhase, setInterviewPhase] = useState<
    'asking' | 'listening' | 'processing'
  >('asking');
  const [voiceStarted, setVoiceStarted] = useState(false);

  const [currentAnswer, setCurrentAnswer] = useState<string>('');
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const callStatus = CallStatus.ACTIVE;
  const messages = ['What is your name', 'My name is John'];
  const lastMessage = messages[messages.length - 1];
  const currentIndexRef = useRef(0);

  const speechStartHandler = () => {
    console.log('speech start handler');
  };

  const speechEndHandler = () => {
    setIsRecording(false);
    setVoiceStarted(false);
    setUserSpeaking(false);

    console.log('speech end handler');

    setInterviewPhase('processing');

    // Wait 2 seconds, then go to next question
  };

  const speechErrorHandler = () => {
    console.log('Voice event');
  };

  const speakQuestion = (index: number) => {
    const question = mockQuestions[index];
    setInterviewPhase('asking');
    setIsAISpeaking(true);
    Tts.speak(question);
  };

  const displayAnswers = () => {
    console.log('final answers', userAnswers);
  };

  const startRecording = async () => {
    if (voiceStarted) return;
    setVoiceStarted(true);
    setUserSpeaking(true);
    try {
      setInterviewPhase('processing');
      await Voice.start('en-GB');
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const onTtsFinish = () => {
      setIsAISpeaking(false);

      // 👇 Wait a little before starting mic, so device voice doesn’t leak in
      setTimeout(() => {
        setInterviewPhase('listening');

        // 👇 Optional: ensure the mic isn't picking up its own voice
        startRecording();
      }, 1500); // 1.5 seconds is usually enough
    };

    Tts.addEventListener('tts-finish', onTtsFinish);

    // return () => {
    //   Tts.removeEventListener('tts-finish', onTtsFinish);
    // };
  }, []);

  const speechResultsHandler = (e: SpeechResultsEvent) => {
    if (e.value && e.value.length > 0) {
      const spokenText = e.value[0];

      // Fix: Don't overwrite setUserAnswers with a string
      setUserAnswers(prev => {
        const updated = [...prev];
        updated[currentIndexRef.current] = spokenText;
        console.log('Updated answers array:', updated);
        return updated;
      });

      // Set current answer for display
      setCurrentAnswer(spokenText);
      console.log('Answer saved:', spokenText);

      setTimeout(() => {
        if (currentIndex < mockQuestions.length - 1) {
          setCurrentIndex(prev => prev + 1); // ✅ this triggers useEffect
        } else {
          Tts.speak("That's all for now. Thank you!");
        }
      }, 2000);
    }
  };

  const stopRecording = async () => {
    try {
      await Voice.stop();
      setVoiceStarted(false);
      setUserSpeaking(false);
      //fetch response
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect(() => {
  //   if (currentIndex < mockQuestions.length) {
  //     speakQuestion(currentIndex);
  //   }
  // }, [currentIndex]);

  // // Update ref when currentIndex changes
  // useEffect(() => {
  //   currentIndexRef.current = currentIndex;
  // }, [currentIndex]);

  useEffect(() => {
    Voice.onSpeechStart = speechStartHandler;
    Voice.onSpeechEnd = speechEndHandler;
    Voice.onSpeechResults = speechResultsHandler;

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

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

  const nextQuestion = () => {
    setIsAISpeaking(true);
    if (currentIndex === mockQuestions.length - 1) {
      setCurrentIndex(0);
    }
    if (currentIndex < mockQuestions.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      Tts.speak("That's all for now. Thank you!");
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#a8edea', '#fed6e3']}
        useAngle
        angle={135}
        style={styles.interviewerCard}
      >
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
        <TouchableOpacity
          style={styles.startAIButton}
          onPress={() => speakQuestion(currentIndex)}
        >
          {interviewPhase === 'asking' && (
            <Text style={{ color: 'white', fontSize: 18 }}>asking...</Text>
          )}
          {interviewPhase === 'listening' && (
            <Text style={{ color: 'white', fontSize: 18 }}>listening...</Text>
          )}
          {interviewPhase === 'processing' && (
            <Text style={{ color: 'white', fontSize: 18 }}>
              ⚙️ Processing your answer...
            </Text>
          )}
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.nextQuestionButton}
          onPress={() => nextQuestion()}
          disabled={isAISpeaking}
        >
          <Text style={{ color: 'white', fontSize: 18 }}>Next Question</Text>
        </TouchableOpacity>
      </LinearGradient>
      <LinearGradient
        colors={['#fbc2eb', '#a6c1ee']}
        useAngle
        angle={135}
        style={styles.userCard}
      >
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
      </LinearGradient>
      {messages.length > 0 && (
        <View style={styles.transcriptView}>
          <Text style={{ color: 'white' }}>{lastMessage}</Text>
        </View>
      )}
      <TouchableOpacity
        style={styles.endButton}
        onPress={() => speakQuestion(0)}
      >
        <Text style={{ color: 'white', fontSize: 20 }}>Start</Text>
      </TouchableOpacity>
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
          <TouchableOpacity style={styles.endButton} onPress={stopRecording}>
            <Text style={{ color: 'white', fontSize: 20 }}>End</Text>
          </TouchableOpacity>
        )}
      </View>
      <TouchableOpacity style={styles.endButton} onPress={displayAnswers}>
        <Text style={{ color: 'white', fontSize: 20 }}>End</Text>
      </TouchableOpacity>
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
    borderRadius: 20,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  userCard: {
    width: '90%',
    height: 200,
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
  startAIButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  nextQuestionButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
});
