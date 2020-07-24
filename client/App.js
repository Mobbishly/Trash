import 'react-native-gesture-handler';
import React, {useState} from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Container from './components/Container/Container';
import LoginContainer from './components/LoginContainer/LoginContainer';

export default function App() {

  const Stack = createStackNavigator(); 
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState('')

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isLoggedIn ? 
        <Stack.Screen 
          name="Trashtagger"
          options={
            {
              headerShown: false
            }
          }
        >
          {(props) => <Container {...props} user={user}/>}
        </Stack.Screen>
        :
        <Stack.Screen 
          name="TrashTagger"
          options={
            {
              headerShown: false
            }
          }
        >
          {(props) => <LoginContainer {...props} setIsLoggedIn={setIsLoggedIn} setUser={setUser} user={user}/>}
        </Stack.Screen>
        }
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
