import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RoleScreen from '../screens/quizScreens/RoleScreen';
import ProgrammingFundamentalsScreen from '../screens/quizScreens/ProgrammingFundamentalsScreen';

export type QuizStackParamList = {
  SelectRole: undefined;
  ProgrammingFundamentals: undefined;
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
      />
    </Stack.Navigator>
  );
};

export default QuizStack;
