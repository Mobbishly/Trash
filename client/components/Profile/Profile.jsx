import React, { useEffect, useState } from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'
import Axios from 'axios'

const Profile = ({user}) => {
  const [userData, setUserData] = useState([])

  useEffect(() => {
    Axios.get(`https://us-central1-trash-2b5de.cloudfunctions.net/app/api/users/${user.username}`)
    .then(res => setUserData(res.data[0]))
  }, [])

  return (
    <View style={styles.container}>
      {userData.length === 0 ? <Text>Loading...</Text> :
      <View style={styles.userInfo}>
        <View style={styles.header}>
        <Image style={styles.picture} source={{ uri: 'https://images.pexels.com/photos/34534/people-peoples-homeless-male.jpg?auto=compress&cs=tinysrgb&dpr=2&w=500' }} resizeMode="cover" />
        <Text style={styles.username}>{userData.username}</Text>
      </View>
      <Text style={styles.userText}>{userData.firstName + " " + userData.lastName}</Text> 
      <Text style={styles.userText}>{userData.email}</Text> 
      <Text style={styles.userText}>Karma Points: {userData.karmaPoints}</Text>   
      </View>
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  picture: {
    height: 200,
     width:200,
     borderRadius:100,
     marginTop: 40,
  },
  userInfo: {
    padding: 10,
    justifyContent: 'space-around'
  },
  userText: {
    padding: 20,
    fontSize: 18,
    textAlign: 'center'
  },
  username: {
    padding: 20,
    fontSize: 50,
    marginTop: 10
  },
  header: {
    borderWidth: 1,
    borderColor: 'lightblue',
    alignItems: 'center',
    width: 380,
    height: 380,
    backgroundColor: '#7873A2',
  }
});

export default Profile
