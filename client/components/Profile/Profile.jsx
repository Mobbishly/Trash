import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, Button, ScrollView } from 'react-native';
import Axios from 'axios';

const Profile = ({user, setIsLoggedIn}) => {
  const [userData, setUserData] = useState([])
  const [images, setImages] = useState([])

  useEffect(() => {
    Axios.get(`https://us-central1-trash-2b5de.cloudfunctions.net/app/api/users/${user}`)
    .then(res => setUserData(res.data[0]))
    return () => {
    }
  }, [])

  useEffect(() => {
   
    Axios.get(`https://us-central1-trash-2b5de.cloudfunctions.net/app/api/locations`)
    .then(res => res.data.filter(x => x.user === user))
    .then(res => setImages(res))
    return () => {
    }
  }, [])

  return (
    <ScrollView style={styles.container}>
      {userData.length === 0 ? <Text>Loading...</Text> :
      <View style={styles.userInfo}>
        <View style={styles.header}>
        <Image style={styles.picture} source={{ uri: 'https://cdn.pixabay.com/photo/2020/03/28/15/20/cat-4977436_1280.jpg' }} resizeMode="cover" />
        <Text style={styles.username}>{userData.username}</Text>
      </View>
      <Text style={styles.userText}>{userData.firstName + " " + userData.lastName}</Text> 
      <Text style={styles.userText}>{userData.email}</Text> 
      <Text style={styles.userText}>Karma Points: {userData.karmaPoints}</Text>
      
      
      <Button
      title="Logout"
      onPress={() => setIsLoggedIn(false)}
      /> 
      <View style={styles.feedContainer}>
      {images.length === 0 ? <Text></Text> : images.map((x) => (
      
      <Image key={x.id} style={styles.pictureFeed} source={{ uri: `${x.uri}` }} resizeMode="cover" />
      
     ))}
     </View>
      </View>
      }
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  feedContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 20
  },
  picture: {
    height: 200,
     width:200,
     borderRadius:100,
     marginTop: 40,
  },
  pictureFeed: {
    height: 175,
     width:175,
     margin: 1,
     
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
    borderColor: 'lightblue',
    alignItems: 'center',
    width: 380,
    height: 380,
    backgroundColor: '#7873A2',
    marginLeft: -10,
    marginTop: -10
  }
});

export default Profile
