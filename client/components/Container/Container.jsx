import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome5, FontAwesome, Octicons, Entypo } from '@expo/vector-icons';
import Map from '../Map/Map';
import Profile from '../Profile/Profile';
import KarmaPoints from '../KarmaPoints/KarmaPoints';
import CameraView from '../Camera/Camera';

const Tab = createBottomTabNavigator()

const Container = ({user}) => {
  return (
    <Tab.Navigator>
      <Tab.Screen 
        name="Map"
        component={Map} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="map-marker-alt" size={24} color="gray" />
          ),
        }}
      />
      <Tab.Screen 
      name="Profile"
      options={{
        tabBarIcon: ({ color, size }) => (
          <FontAwesome name="user" size={24} color="gray" />
        ),
        headerShown: false

      }}
      >
        {(props) => <Profile {...props} user={user} />} 
      </Tab.Screen>
  
      <Tab.Screen 
        name="Karma"
        component={KarmaPoints} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <Octicons name="graph" size={24} color="grey" />
          ),
        }}
      />

      <Tab.Screen 
        name="Camera"
        component={CameraView} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <Entypo name="camera" size={24} color="grey" />
          ),
        }}
        />
    </Tab.Navigator>
    )
}

export default Container
