/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { NavigationContainer } from '@react-navigation/native';
import { StatusBar, useColorScheme } from 'react-native';
import { QuizProvider } from './src/context/QuizContext';
import MainTabs from './src/navigation/MainTabs';
import { View } from 'react-native';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <QuizProvider>
      <NavigationContainer>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <MainTabs />
      </NavigationContainer>
    </QuizProvider>
  );
}

export default App;
