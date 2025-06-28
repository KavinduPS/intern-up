import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/mainScreens/HomeScreen';
import QuizStack from './QuizRoutes';
import MockInterviewScreen from '../screens/mainScreens/MockInterviewScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import TasksScreen from '../screens/mainScreens/TasksScreen';

const Tab = createBottomTabNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Quiz') {
            iconName = focused ? 'help-circle' : 'help-circle-outline';
          } else if (route.name === 'Mock Interview') {
            iconName = focused ? 'mic' : 'mic-outline';
          } else if (route.name === 'Tasks') {
            iconName = focused ? 'document' : 'document-outline';
          }
          return <Ionicons name={iconName!} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#CC0082',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          height: 60,
          position: 'absolute',
          bottom: 25,
          marginHorizontal: 20,
          borderRadius: 50,
          borderTopWidth: 0,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 10,
          elevation: 5,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
        }}
      />
      <Tab.Screen
        name="Quiz"
        component={QuizStack}
        options={{
          tabBarLabel: 'Quiz',
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Tasks"
        component={TasksScreen}
        options={{
          tabBarLabel: 'Tasks',
        }}
      />
      <Tab.Screen
        name="Mock Interview"
        component={MockInterviewScreen}
        options={{
          tabBarLabel: 'Interview',
        }}
      />
    </Tab.Navigator>
  );
}

export default MainTabs;
