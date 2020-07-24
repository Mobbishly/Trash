import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import RegisterUser from '../RegisterUser/RegisterUser';
import Login from '../Login/Login';

const Stack = createStackNavigator()

const LoginContainer = ({setIsLoggedIn, setUser, user}) => {

  return (
      <Stack.Navigator>
        <Stack.Screen 
        name="Profile"
        options={{
        headerShown: false,
        }}
        >
          {(props) => <Login {...props} user={user} setUser={setUser} setIsLoggedIn={setIsLoggedIn} />} 
        </Stack.Screen>
        <Stack.Screen 
        name="RegisterUser"
        component={RegisterUser}
        options={{
          headerShown: false,
          }}
        />
      </Stack.Navigator>

    )
}

export default LoginContainer
