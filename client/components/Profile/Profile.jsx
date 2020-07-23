import React, { useEffect, useState } from 'react'
import { View, Text, Image, StyleSheet, List } from 'react-native'
import Axios from 'axios'

const Profile = ({user}) => {

  const [userData, setUserData] = useState([])

  // console.log(user)
  useEffect(() => {

    Axios.get(`https://us-central1-trash-2b5de.cloudfunctions.net/app/api/users/${user.username}`)
    .then(res => setUserData(res.data[0]))

  }, [])

    return (
        <View style={styles.container}>
           <Image style={styles.picture} source={{ uri: 'https://www.kirkham-legal.co.uk/wp-content/uploads/2017/02/profile-placeholder.png' }} resizeMode="cover" />
             
             {userData.length === 0 ? <Text>Loading...</Text> :
             <View style={styles.userInfo}> 
              <Text style={styles.username}>{userData.username}</Text>
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
     borderRadius:100
  },
  userInfo: {
    alignItems: 'center',
    padding: 10
  },
  userText: {
    padding: 20,
    fontSize: 18
  },
  username: {
    padding: 20,
    fontSize: 50,
    marginTop: -50
  }
});

export default Profile
