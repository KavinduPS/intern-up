import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { ReactElement } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ProgressCard from '../../components/ProgressCard';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

const HomeScreen = () => {
  const navigation = useNavigation();

  const renderIcon = (icon: string, color: string): ReactElement => (
    <View>
      <Ionicons name={icon} size={30} color={color} />
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1 }} edges={['left', 'right']}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.welcomeMessageContainer}>
          <Text style={styles.welcomeHeading}>Welcome to InternUp 👋</Text>
          <Text style={styles.welcomeText}>
            Your journey to internship rediness begins here
          </Text>
        </View>
        <View style={styles.aboutContainer}>
          <View style={styles.aboutHeadingContainer}>
            <Ionicons name="rocket-outline" size={30} color={'#CC0082'} />
            <Text style={styles.aboutHeading}>About</Text>
          </View>
          <Text style={styles.aboutText}>
            InternUp helps IT undergraduates become internship-ready through
            personalized learning paths, daily skill building tasks and
            AI-powered mock interviews
          </Text>
        </View>
        <View style={styles.progressCardsContainer}>
          <ProgressCard
            renderCardIcon={() =>
              renderIcon('checkmark-circle-outline', 'green')
            }
            cardText="Tasks Done"
            progress={4}
          />
          <ProgressCard
            renderCardIcon={() => renderIcon('time-outline', 'orange')}
            cardText="Day Streak"
            progress={7}
          />
        </View>
        <LinearGradient
          angle={90}
          useAngle
          colors={['#CC0082', '#AA0082']}
          style={styles.getStartedContainer}
        >
          <Text style={styles.getStartedHeading}>Ready to Get Started?</Text>
          <Text style={styles.getStartedText}>
            Take a skill assesment to get your personalized learning roadmap!
          </Text>
          <TouchableOpacity
            style={styles.startQuizButton}
            // onPress={() => navigation.navigate()}
          >
            <Text style={styles.buttonText}>Start Skill quiz →</Text>
          </TouchableOpacity>
        </LinearGradient>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 100,
  },
  welcomeMessageContainer: {
    width: '90%',
    backgroundColor: '#CC0082',
    marginVertical: 20,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
  },
  welcomeHeading: {
    color: 'white',
    fontSize: 25,
    fontWeight: 700,
    marginVertical: 20,
  },
  welcomeText: {
    color: 'white',
    marginBottom: 20,
  },
  aboutContainer: {
    marginBottom: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    width: '90%',
    padding: 20,
  },
  aboutHeadingContainer: {
    flexDirection: 'row',
    width: '30%',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  aboutHeading: {
    fontWeight: 500,
    fontSize: 20,
  },
  aboutText: {
    marginTop: 10,
    lineHeight: 24,
    fontSize: 16,
    color: '#333333',
  },
  progressCardsContainer: {
    width: '90%',
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  getStartedContainer: {
    width: '90%',
    marginBottom: 10,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  getStartedHeading: {
    color: 'white',
    marginBottom: 10,
    width: '90%',
    fontSize: 20,
    fontWeight: 600,
    marginTop: 30,
  },
  getStartedText: {
    color: 'white',
    marginBottom: 20,
    width: '90%',
    fontSize: 15,
  },
  startQuizButton: {
    backgroundColor: 'white',
    marginBottom: 30,
    width: '90%',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#CC0082',
    fontSize: 16,
    fontWeight: 500,
  },
});
