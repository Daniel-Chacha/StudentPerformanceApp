import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import HomeScreen from './src/screens/HomeScreen';
import ClassOverviewScreen from './src/screens/ClassOverviewScreen';
import StudentResults from './src/components/StudentResults';
import ClassInfo from './src/components/ClassInfo';

const Stack = createStackNavigator();

export default function App() {
  return (
      <NavigationContainer>
        <StatusBar style="auto" />
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerStyle: {
              backgroundColor: 'hsl(216.923 56% 18%)',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        >
          <Stack.Screen 
            name="Home" 
            component={HomeScreen}
            options={{
              title: 'Home',
            }}
          />
          <Stack.Screen
            name="ClassOverview"
            component={ClassOverviewScreen}
            options={{
              title: 'Class Performance Overview',
            }}
          />
          <Stack.Screen
            name="StudentResults"
            component={StudentResults}
            options={{ title: 'Strand Results' }}
          />
          <Stack.Screen name="ClassInfo" component={ClassInfo} options={{ title: 'Class Info' }}/>

        </Stack.Navigator>
      </NavigationContainer>
  );
}