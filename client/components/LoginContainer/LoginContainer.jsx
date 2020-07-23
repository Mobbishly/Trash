import React from 'react'
import { View, Text } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import { FontAwesome5, FontAwesome, Octicons, Entypo } from '@expo/vector-icons'
import Map from '../Map/Map' 
import Profile from '../Profile/Profile' 
import KarmaPoints from '../KarmaPoints/KarmaPoints'
import CameraView from '../Camera/Camera'
import RegisterUser from '../RegisterUser/RegisterUser';
import Login from '../Login/Login';

const Stack = createStackNavigator()

const LoginContainer = ({setIsLoggedIn, setUser, user}) => {

  return (
      <Stack.Navigator>
        <Stack.Screen name="Profile">
          {(props) => <Login {...props} user={user} setUser={setUser} setIsLoggedIn={setIsLoggedIn} />} 
        </Stack.Screen>
        <Stack.Screen name="RegisterUser" component={RegisterUser} />
      </Stack.Navigator>

    )
}

export default LoginContainer
