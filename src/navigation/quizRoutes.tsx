import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RoleScreen from '../screens/quizScreens/RoleScreen';
import ProgrammingFundamentalsScreen from '../screens/quizScreens/ProgrammingFundamentalsScreen';
import FrontendDevelopmentScreen from '../screens/quizScreens/FrontendDevelopmentScreen';
import BackendDevelopmentScreen from '../screens/quizScreens/BackendDevelopmentScreen';
import DatabaseScreen from '../screens/quizScreens/DatabaseScreen';
import DevOpsScreen from '../screens/quizScreens/DevOpsScreen';
import GitScreen from '../screens/quizScreens/GitScreen';
import SoftSkillsScreen from '../screens/quizScreens/SoftSkillsScreen';

export type QuizStackParamList = {
  SelectRole: undefined;
  ProgrammingFundamentals: undefined;
  FrontendDevelopment: undefined;
  BackendDevelopment: undefined;
  DatabaseSkills: undefined;
  Git: undefined;
  DevOps: undefined;
  SoftSkills: undefined;
};

const Stack = createNativeStackNavigator<QuizStackParamList>();

const QuizStack = () => {
  return (
    <Stack.Navigator initialRouteName="SelectRole">
      <Stack.Screen
        name="SelectRole"
        component={RoleScreen}
        options={{ title: 'Select Role' }}
      />
      <Stack.Screen
        name="ProgrammingFundamentals"
        component={ProgrammingFundamentalsScreen}
        options={{ title: 'Programming Fundamentals' }}
      />
      <Stack.Screen
        name="FrontendDevelopment"
        component={FrontendDevelopmentScreen}
        options={{ title: 'Frontend Development' }}
      />
      <Stack.Screen
        name="BackendDevelopment"
        component={BackendDevelopmentScreen}
        options={{ title: 'Backend Development' }}
      />
      <Stack.Screen
        name="DatabaseSkills"
        component={DatabaseScreen}
        options={{ title: 'Database Skills' }}
      />
      <Stack.Screen
        name="Git"
        component={GitScreen}
        options={{ title: 'Git & Version Control' }}
      />
      <Stack.Screen
        name="DevOps"
        component={DevOpsScreen}
        options={{ title: 'DevOps Skills' }}
      />
      <Stack.Screen
        name="SoftSkills"
        component={SoftSkillsScreen}
        options={{ title: 'Soft Skills' }}
      />
    </Stack.Navigator>
  );
};

export default QuizStack;
