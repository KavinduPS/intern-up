import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import Tts from 'react-native-tts';
import Voice from '@react-native-community/voice';

interface Answer {
  questionIndex: number;
  question: string;
  audioPath?: string;
  transcription?: string;
  timestamp: Date;
}

interface MockInterviewProps {
  onInterviewComplete?: (answers: Answer[]) => void;
}

const MockInterview: React.FC<MockInterviewProps> = ({
  onInterviewComplete,
}) => {
  const questions = [
    'Tell me about yourself and your background.',
    'What are your greatest strengths?',
    'Describe a challenging project you worked on and how you handled it.',
    'Where do you see yourself in five years?',
    'Why are you interested in this position?',
    'What is your biggest weakness and how are you working to improve it?',
    'Describe a time when you had to work with a difficult team member.',
    'What motivates you in your work?',
    'How do you handle stress and pressure?',
    'Do you have any questions for us?',
  ];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [interviewStarted, setInterviewStarted] = useState(false);
  const [interviewComplete, setInterviewComplete] = useState(false);
  const [status, setStatus] = useState('Ready to start interview');

  const recordingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const silenceTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const hasSavedAnswerRef = useRef(false);

  useEffect(() => {
    initializeServices();
    return cleanup;
  }, []);

  const initializeServices = async () => {
    try {
      await Tts.setDefaultRate(0.5);
      await Tts.setDefaultPitch(1.0);

      Tts.addEventListener('tts-start', () => setIsSpeaking(true));
      Tts.addEventListener('tts-finish', () => {
        setIsSpeaking(false);
        if (interviewStarted && !interviewComplete) {
          setTimeout(() => startRecording(), 1000);
        }
      });
      Tts.addEventListener('tts-cancel', () => setIsSpeaking(false));

      Voice.onSpeechStart = () => {
        setStatus('Listening...');
        if (silenceTimeoutRef.current) clearTimeout(silenceTimeoutRef.current);
      };

      Voice.onSpeechEnd = () => {
        setStatus('Processing your answer...');
        silenceTimeoutRef.current = setTimeout(stopRecording, 2000);
      };

      Voice.onSpeechResults = event => {
        if (!hasSavedAnswerRef.current && event.value?.length) {
          saveAnswer(event.value[0]);
        }
      };

      Voice.onSpeechError = event => {
        console.error('Speech recognition error:', event);
        setIsRecording(false);
        setStatus(
          `Error: ${event.error?.message || 'Unknown error'}. Retrying...`,
        );
        setTimeout(() => {
          if (!interviewComplete) startRecording();
        }, 2000);
      };

      Voice.onSpeechPartialResults = event => {
        if (event.value?.length) {
          setStatus(`Listening: "${event.value[0]}"`);
        }
      };
    } catch (error) {
      console.error('Error initializing services:', error);
      Alert.alert('Error', 'Failed to initialize voice services');
    }
  };

  const cleanup = () => {
    Tts.removeAllListeners();
    Voice.destroy().then(() => Voice.removeAllListeners());
    if (recordingTimeoutRef.current) clearTimeout(recordingTimeoutRef.current);
    if (silenceTimeoutRef.current) clearTimeout(silenceTimeoutRef.current);
  };

  const startInterview = () => {
    setInterviewStarted(true);
    setCurrentQuestionIndex(0);
    setAnswers([]);
    speakQuestion(0);
  };

  const speakQuestion = async (index: number) => {
    if (index >= questions.length) {
      completeInterview();
      return;
    }
    try {
      setStatus(`Question ${index + 1} of ${questions.length}`);
      await Tts.speak(questions[index]);
    } catch (error) {
      console.error('Error speaking question:', error);
      setStatus('Error speaking question');
    }
  };

  const startRecording = async () => {
    if (isRecording || isSpeaking) return;
    try {
      hasSavedAnswerRef.current = false;
      setIsRecording(true);
      setStatus('Your turn to answer...');
      await Voice.start('en-US');
      recordingTimeoutRef.current = setTimeout(stopRecording, 60000);
    } catch (error) {
      console.error('Error starting recording:', error);
      setStatus('Error starting recording');
      setIsRecording(false);
    }
  };

  const stopRecording = async () => {
    try {
      setIsRecording(false);
      await Voice.stop();
      if (recordingTimeoutRef.current)
        clearTimeout(recordingTimeoutRef.current);
      if (silenceTimeoutRef.current) clearTimeout(silenceTimeoutRef.current);
    } catch (error) {
      console.error('Error stopping recording:', error);
    }
  };

  const saveAnswer = (transcription: string) => {
    if (hasSavedAnswerRef.current || currentQuestionIndex >= questions.length)
      return;
    hasSavedAnswerRef.current = true;

    const answer: Answer = {
      questionIndex: currentQuestionIndex,
      question: questions[currentQuestionIndex],
      transcription,
      timestamp: new Date(),
    };

    setAnswers(prev => [...prev, answer]);

    const nextIndex = currentQuestionIndex + 1;

    if (nextIndex >= questions.length) {
      completeInterview();
    } else {
      setCurrentQuestionIndex(nextIndex);
      setStatus('Answer saved. Moving to next question...');
      setTimeout(() => speakQuestion(nextIndex), 2000);
    }
  };

  const skipQuestion = () => {
    if (isRecording) stopRecording();

    const answer: Answer = {
      questionIndex: currentQuestionIndex,
      question: questions[currentQuestionIndex],
      transcription: '[Question skipped]',
      timestamp: new Date(),
    };

    setAnswers(prev => [...prev, answer]);

    const nextIndex = currentQuestionIndex + 1;

    if (nextIndex >= questions.length) {
      completeInterview();
    } else {
      setCurrentQuestionIndex(nextIndex);
      setTimeout(() => speakQuestion(nextIndex), 1000);
    }
  };

  const completeInterview = () => {
    setInterviewComplete(true);
    setInterviewStarted(false);
    setStatus('Interview completed!');
    Tts.stop();
    Tts.speak(
      'Thank you for completing the interview. Your responses have been recorded.',
    );
    if (onInterviewComplete) {
      onInterviewComplete(answers);
    }
  };

  const resetInterview = () => {
    setInterviewStarted(false);
    setInterviewComplete(false);
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setIsRecording(false);
    setIsSpeaking(false);
    setStatus('Ready to start interview');
    if (recordingTimeoutRef.current) clearTimeout(recordingTimeoutRef.current);
    if (silenceTimeoutRef.current) clearTimeout(silenceTimeoutRef.current);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mock Interview</Text>
      <Text style={styles.status}>{status}</Text>

      {!interviewStarted && !interviewComplete && (
        <TouchableOpacity style={styles.button} onPress={startInterview}>
          <Text style={styles.buttonText}>Start Interview</Text>
        </TouchableOpacity>
      )}

      {interviewStarted && !interviewComplete && (
        <View style={styles.interviewContainer}>
          <Text style={styles.questionCounter}>
            Question {currentQuestionIndex + 1} of {questions.length}
          </Text>
          <Text style={styles.currentQuestion}>
            {questions[currentQuestionIndex]}
          </Text>

          <View style={styles.controls}>
            <TouchableOpacity
              style={[styles.button, isRecording && styles.recordingButton]}
              onPress={isRecording ? stopRecording : startRecording}
              disabled={isSpeaking}
            >
              <Text style={styles.buttonText}>
                {isSpeaking
                  ? 'Speaking...'
                  : isRecording
                  ? 'Stop Recording'
                  : 'Start Recording'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, styles.skipButton]}
              onPress={skipQuestion}
              disabled={isSpeaking}
            >
              <Text style={styles.buttonText}>Skip Question</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {interviewComplete && (
        <View style={styles.completedContainer}>
          <Text style={styles.completedText}>
            Interview Completed Successfully!
          </Text>
          <Text style={styles.answerCount}>
            {answers.length} answers recorded
          </Text>

          <TouchableOpacity style={styles.button} onPress={resetInterview}>
            <Text style={styles.buttonText}>Start New Interview</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.viewAnswersButton]}
            onPress={() => console.log('Saved answers:', answers)}
          >
            <Text style={styles.buttonText}>View Answers (Console)</Text>
          </TouchableOpacity>
        </View>
      )}

      {answers.length > 0 && (
        <View style={styles.progressContainer}>
          <Text style={styles.progressText}>
            Progress: {answers.length}/{questions.length} questions answered
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  status: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    color: '#666',
    minHeight: 20,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    marginVertical: 5,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
  },
  recordingButton: { backgroundColor: '#FF3B30' },
  skipButton: { backgroundColor: '#FF9500' },
  viewAnswersButton: { backgroundColor: '#34C759' },
  interviewContainer: { flex: 1 },
  questionCounter: {
    fontSize: 14,
    textAlign: 'center',
    color: '#666',
    marginBottom: 10,
  },
  currentQuestion: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 30,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 8,
    color: '#333',
  },
  controls: { marginTop: 20 },
  completedContainer: { alignItems: 'center' },
  completedText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#34C759',
    textAlign: 'center',
    marginBottom: 10,
  },
  answerCount: { fontSize: 16, color: '#666', marginBottom: 20 },
  progressContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 8,
  },
  progressText: { textAlign: 'center', color: '#666' },
});

export default MockInterview;
