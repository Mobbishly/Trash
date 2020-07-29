import React, { useState, useEffect } from 'react';
import MapView, { Marker, Callout } from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions, Modal, Image, TouchableHighlight } from 'react-native';
import axios from 'axios';
import firebase from '../../firebase.js';
import 'firebase/firestore';

const Map = ({user}) => {
const [locations, setLocations] = useState([])
const [modalVisible, setModalVisible] = useState();

useEffect(() => {
  let data = [];
  firebase
    .firestore()
    .collection("locations")
    .onSnapshot((snapshot) => {
      axios.get('https://us-central1-trash-2b5de.cloudfunctions.net/app/api/locations')
    .then(data => setLocations(data.data))
    .catch(e => console.log(e));
    });
}, []);
  return (
    <View style={styles.container}>
        <MapView style={styles.mapStyle} provider={"google"} region={{
          latitude: 59.3293,
          longitude: 18.0686,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421
        }}>
         {locations.map((location) => (
          <View key={location.id}>
            <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible === location.id}
            onRequestClose={()=>{
                Alert.alert("Modal has been closed.")
            }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                    <Text style={styles.modalText}>{}</Text>
                      <Text>Upload by {location.user}</Text>
                      <Image style={{ height: 300, width: 250 }} source={{ uri: location.uri }} resizeMode="contain" />
                    
                        <TouchableHighlight style={{...styles.openButton}} onPress={()=>{
                            setModalVisible(!modalVisible);
                        }}>
                            <Text style={styles.textStyle}>X</Text>
                        </TouchableHighlight>
                        
                        {location.completed ? <Text>All cleaned up :) </Text> : <TouchableHighlight style={{
                          backgroundColor: '#148744', 
                          height: 45, 
                          width: 120, 
                          alignItems: 'center',
                          borderRadius: 10,
                          justifyContent: 'center',
                          marginTop: 20
                          }} onPress={async () => {
                            await axios({
                              method: 'PUT',
                              url: `https://us-central1-trash-2b5de.cloudfunctions.net/app/api/locations/${location.id}`,
                              data: {
                                id: location.id,
                                completed: true
                              }
                            })
                            await axios.get(`https://us-central1-trash-2b5de.cloudfunctions.net/app/api/users/${user}`)
                             .then(res => axios({
                               method: 'PUT',
                               url: `https://us-central1-trash-2b5de.cloudfunctions.net/app/api/users/${user}`,
                               data: {
                                 karmaPoints: res.data[0].karmaPoints + 10,
                               }
                             }))
                            setModalVisible(false)
                          }}>
                          <Text style={{
                            alignSelf: 'center',
                            color: 'white',
                            fontSize: 18,
                          }}>Task Done</Text>
                        </TouchableHighlight>}
                    </View>
                </View>
                
            </Modal>
           {location.completed ? <Marker onPress={() => setModalVisible(location.id)} pinColor={'#148744'} key={location.id} coordinate={{ latitude: location.lat, longitude: location.long }}>
           </Marker> : <Marker onPress={() => setModalVisible(location.id)} pinColor={'#D65F56'} key={location.id} coordinate={{ latitude: location.lat, longitude: location.long }}>
           </Marker>}
           </View>
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
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: '90%',
    height: '80%'
  },
  openButton: {
    backgroundColor: '#D65F56',
    borderRadius: 30,
    padding: 15,
    elevation: 2,
    position: 'absolute',
    right: 10,
    top: 10,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});
export default Map
