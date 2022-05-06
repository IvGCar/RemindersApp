import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Home from './views/Home';
import Profile from './views/Profile';
import Details from './views/Details';
import { NativeBaseProvider, useColorModeValue } from 'native-base';
import UseColorMode from './components/ColorMode';
import RNBootSplash from 'react-native-bootsplash';

const Stack = createNativeStackNavigator()

const App = () => {
  React.useEffect(() => {
    RNBootSplash.hide({ fade: true });
  }, []);
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <Stack.Navigator 
        screenOptions={{
        headerMode: 'screen',
        headerTintColor: 'white',
        headerStyle: { backgroundColor: "#1c4966"},
        headerRight: () =>(
          <UseColorMode/>
        ),
        }}>
          <Stack.Screen
            name="Home"
            component={Home}
            options={{ title: 'Home' }}
          >            
          </Stack.Screen>
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen
            name="Details"
            component={Details}
            options={{ title: 'Reminder Details' }}
          />          
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
