import 'react-native-gesture-handler';
import React, {useState} from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import Login from './components/Login/Login'

import { NavigationContainer } from '@react-navigation/native';
import Container from './components/Container/Container';


const Stack = createStackNavigator(); 

export default function App() {
  
  const [isLoggedIn, setIsLoggedIn] = useState(false)


  return (
        <NavigationContainer>
          <Stack.Navigator>
            
            {isLoggedIn ? 

            <Stack.Screen name="Trash Tagger" component={Container} />
            :
            <Stack.Screen name="Login">
              {(props) => <Login {...props} setIsLoggedIn={setIsLoggedIn} />}
            </Stack.Screen>

            


            }
          </Stack.Navigator>
        </NavigationContainer>
  );
}
{(props) => <Login {...props} setIsLoggedIn={setIsLoggedIn} />}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
