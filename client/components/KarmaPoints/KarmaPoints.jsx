import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import Axios from 'axios'
import EStyleSheet from 'react-native-extended-stylesheet';

const KarmaPoints = () => {
  const [sortedPoints, setSortedPoints] = useState([])
  const [points, setPoints] = useState([])
  useEffect(() => {
    const sortedPoints = points.sort((a, b) => b.karmaPoints - a.karmaPoints)
    setSortedPoints(sortedPoints)
  }, [points])

  useEffect(() => {
    Axios.get(`https://us-central1-trash-2b5de.cloudfunctions.net/app/api/users`)
    .then(res => setPoints(res.data))
  }, [])

  return (
    <View style={styles.container}>
      <View style={styles.heading}>
        <Text style={styles.headingText}>User</Text>
        <Text style={styles.headingText}>Karma</Text>
      </View>
      <ScrollView >
    {sortedPoints.map((x, index) => (
      <View key={index} style={styles.row}>
        <Text style={styles.text}>{x.username}</Text>
        <Text style={styles.text}>{x.karmaPoints}</Text>
      </View>
      ))}
      </ScrollView>

    </View>
  )
}

const styles = StyleSheet.create({
  container : {
    padding: 50,
   
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: "space-between",
    padding: 10,

    borderWidth: 2,
    borderRadius: 10,
    borderColor: 'lightgrey',
    backgroundColor: '#7873A2',
    shadowColor: "#000",
    shadowOffset: {
    width: 0,
	  height: 1,
    },
    shadowOpacity: 0.87,
    shadowRadius: 0.65,

    elevation: 2,
    
  },
  heading: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: "space-between",
    marginBottom: 10,
    backgroundColor: '#7873A2',
    marginLeft: -40,
    marginRight: -40,
    marginTop: -30,

    
  },
  text: {
    fontSize: 20,
    color: 'white'
  },
  headingText: {
    fontWeight: 'bold',
    fontSize: 40,
    padding: 40,
    color: 'white'

  }
});

export default KarmaPoints
