/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { NavigationContainer } from '@react-navigation/native';
import { StatusBar, useColorScheme } from 'react-native';
import QuizStack from './src/navigation/quizRoutes';
import { QuizProvider } from './src/context/QuizContext';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <QuizProvider>
      <NavigationContainer>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <QuizStack />
      </NavigationContainer>
    </QuizProvider>
  );
}

export default App;
