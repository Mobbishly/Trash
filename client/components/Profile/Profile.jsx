import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import Axios from 'axios';
import firebase from '../../firebase.js';

const Profile = ({user, setIsLoggedIn}) => {
  const [userData, setUserData] = useState([])
  const [images, setImages] = useState([])

  useEffect(() => {
    firebase
    .firestore()
    .collection("users")
    .onSnapshot((snapshot) => {
    Axios.get(`https://us-central1-trash-2b5de.cloudfunctions.net/app/api/users/${user}`)
    .then(res => setUserData(res.data[0]))
    })
    return () => {
    }
  }, [])

  useEffect(() => {
    firebase
    .firestore()
    .collection("locations")
    .onSnapshot((snapshot) => {
    Axios.get(`https://us-central1-trash-2b5de.cloudfunctions.net/app/api/locations`)
    .then(res => res.data.filter(x => x.user === user))
    .then(res => setImages(res))
    .catch(e => console.log(e));
    })
    return () => {
    }
  }, [])

  return (
    <ScrollView style={styles.container}>
      {userData.length === 0 ? <Text style={styles.loading}>Loading...</Text> :
      <View style={styles.userInfo}>
        <View style={styles.header}>
        <Image style={styles.picture} source={{ uri: 'https://cdn.pixabay.com/photo/2020/03/28/15/20/cat-4977436_1280.jpg' }} resizeMode="cover" />
        <Text style={styles.username}>{userData.username}</Text>
        <Text style={styles.userText}>Karma Points: {userData.karmaPoints}</Text>
      </View>
      <View style={styles.feedContainer}>
      {images.length === 0 ? <Text></Text> : images.map((x) => (
      
      <Image key={x.id} style={styles.pictureFeed} source={{ uri: `${x.uri}` }} resizeMode="cover" />
      
     ))}
     </View>
     <TouchableOpacity
        style={styles.button2}
        onPress={() => setIsLoggedIn(false)}
      >
        <Text style={styles.backbtn}>Logout</Text> 
      </TouchableOpacity>
      </View>
      }
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  feedContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 10,
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
    justifyContent: 'space-around'
  },
  userText: {
    padding: 10,
    fontSize: 40,
    color: 'white',
    textAlign: 'center'
  },
  username: {
    padding: 10,
    fontSize: 50,
    marginTop: 10,
    color: 'white',
    fontWeight: 'bold',
    letterSpacing: 3
  },
  header: {
    borderColor: 'lightblue',
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#41bdb0'
  },
  button2: {
    alignSelf: 'center',
    elevation: 8,
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: '#07b4cf',
    height: 45,
    width: '80%',
    marginTop: 10,
    marginBottom: 10,
    shadowOffset: {
      width: 0,
      height: 1,
      },
      shadowOpacity: 0.87,
      shadowRadius: 0.65,
  },backbtn: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    alignSelf: 'center',
    textTransform: 'uppercase',
  },
  loading: {
    textAlign: 'center',
    padding: 100,
    fontSize: 30
  }

});

export default Profile
