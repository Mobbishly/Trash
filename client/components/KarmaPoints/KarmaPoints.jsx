import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, FlatList, Image } from 'react-native'
import Axios from 'axios'
import firebase from '../../firebase.js';

const KarmaPoints = () => {
  const [sortedPoints, setSortedPoints] = useState([])
  const [points, setPoints] = useState([])
  useEffect(() => {
    const sortedPoints = points.sort((a, b) => b.karmaPoints - a.karmaPoints)
    setSortedPoints(sortedPoints)
  }, [points])

  useEffect(() => {
    firebase
    .firestore()
    .collection("users")
    .onSnapshot((snapshot) => {
    Axios.get(`https://us-central1-trash-2b5de.cloudfunctions.net/app/api/users`)
    .then(res => setPoints(res.data))
    })
  }, [])

  return (
    <View style={styles.container}>
      <View style={styles.heading}>
        <Text style={styles.headingText}>User</Text>
        <Text style={styles.headingText}>Karma</Text>
      </View>
      <FlatList 
      data={sortedPoints}
      renderItem={({ item }) =>
       <View style={styles.row}>
         <View style={styles.userContainer}>
         <Image style={styles.image} source={{uri: 'https://cdn.pixabay.com/photo/2020/03/28/15/20/cat-4977436_1280.jpg'}} />
        <Text style={styles.username}>{item.username}</Text>
        </View>
        <Text style={styles.karmaPoints}>{item.karmaPoints}</Text>
      </View> 
      }
      keyExtractor={item => item.username}
      >
      </FlatList>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'lightgrey',
    height: '100%'
  },
  heading: {
    borderColor: 'lightblue',
    alignItems: 'center',
    flexDirection: 'row',
    paddingLeft: 50,
    paddingRight: 40,
    justifyContent: 'space-between',
    width: '100%',
    backgroundColor: '#41bdb0',
    height: 160,
    textAlign: 'center',
  },
  headingText: {
    textAlignVertical: 'center',
    paddingTop: 40,
    fontSize: 40,
    color: 'white'
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    paddingLeft: 40,
    paddingRight: 40,
    backgroundColor: 'lightgrey',
    borderBottomWidth: 1,
    borderBottomColor: 'white',
    paddingBottom: 10,
    paddingTop: 10
  },
  karmaPoints: {
    fontSize: 25,
    alignSelf: 'center'
  },
  username: {
    fontSize: 25,
    paddingLeft: 15
  },
  image: {
    height: 50,
    width: 50,
    borderRadius: 100,
  },
  userContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  }
})

export default KarmaPoints
