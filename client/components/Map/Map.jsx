import React, { useState, useEffect } from 'react';
import MapView, { Marker, Callout } from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions, Image } from 'react-native';
 import axios from 'axios';

const Map = () => {
const [locations, setLocations] = useState([])

useEffect(() => {
  axios.get('https://us-central1-trash-2b5de.cloudfunctions.net/app/api/locations')
    .then(data => setLocations(data.data))
    .catch(e => console.log(e));
    }, [])
  
  return (
    <View style={styles.container}>
        <MapView style={styles.mapStyle} provider={"google"} region={{
          latitude: 59.3293,
          longitude: 18.0686,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421
        }}>
         {locations.map((location) => (
           <Marker key={location.id} coordinate={{ latitude: location.lat, longitude: location.long }}>
             <Callout>
                <View>
                  <Text>Hello Sexy</Text>
                  <Text>
                    <Image style={{ height: 100, width:100 }} source={{ uri: location.uri }} resizeMode="cover" />
                  </Text>
                  
                </View>
            </Callout>
           </Marker>
           
           
         ))}
      </MapView>
      </View>
      
  )
}


const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});
export default Map
