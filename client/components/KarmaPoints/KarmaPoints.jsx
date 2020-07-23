import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Axios from 'axios'


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
          { sortedPoints.map((x) => (
            <View style={styles.row} key={x.username}>
              <Text style={styles.text}>{x.username}</Text>
              <Text style={styles.text}>{x.karmaPoints}</Text>
            </View>
          ))}
        </View>
    )
}

const styles = StyleSheet.create({
  container : {
    padding: 50,
  },
  row: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: "space-between",
    padding: 5
    
  },
  heading: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: "space-between",
    marginBottom: 10,
    
  },
  text: {
    fontSize: 30
  },
  headingText: {
    fontWeight: 'bold',
    fontSize: 40
  }
});

export default KarmaPoints
