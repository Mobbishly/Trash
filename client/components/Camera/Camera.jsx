
import React, {useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, ImageBackground, StyleSheet} from 'react-native'
import { Camera } from 'expo-camera'
import * as Location from 'expo-location';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import firebase from '../../firebase.js'
import { preventAutoHide } from 'expo/build/launch/SplashScreen';

const CameraView = () => {
    const [hasPermission, setHasPermission] = useState(null);
    const [cameraRef, setCameraRef] = useState(null);
    const [photo, setPhoto] = useState(null);
    const [location, setLocation] = useState(null);
    const [imagePath, setImagePath] = useState(null);

    useEffect (() => {
        (async () => {
            const { status } = await Camera.requestPermissionsAsync();
            const local = await Location.requestPermissionsAsync().status;
            setHasPermission(status === 'granted');
        })();
    }, [])

    const uploadPhoto = async () => {
        try {
            const response = await fetch(photo.uri);
            const blob = await response.blob();
            const storageRef = firebase.storage().ref().child('images/' + imagePath)
            await storageRef.put(blob);
            const url = await storageRef.getDownloadURL();

            axios({
                method: 'post',
                url: 'https://us-central1-trash-2b5de.cloudfunctions.net/app/api/locations',
                data: {
                  id: uuidv4(),
                  lat: location.coords.latitude,
                  long: location.coords.longitude,
                  completed: false,
                  uri: url
                }
              });
        } catch (error) {
            console.log(error)
        }
    }

    if (hasPermission === null) {
        return <View />;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }
    return (
       <View style= {{ flex: 1, width: '100%'}}>
           {photo ? (<ImageBackground 
            style={{ flex: 1}}
            source={{ uri: photo.uri}}>
            <TouchableOpacity
                onPress={()=> {
                    setPhoto(null);
                }}
                style={{
                    elevation: 8,
                    borderRadius: 10,
                    paddingVertical: 10,
                    paddingHorizontal: 12,
                    backgroundColor: '#D65F56',
                    height: 45,
                    width: 120,
                    position: 'absolute',
                    left: 20,
                    bottom: 20
                }}
                >
               <Text style={styles.backbtn}>Back</Text> 
            </TouchableOpacity>
            <TouchableOpacity
                onPress={ async () => {
                    await uploadPhoto();
                    setPhoto(null);
                }}
                style={{
                    elevation: 8,
                    borderRadius: 10,
                    paddingVertical: 10,
                    paddingHorizontal: 12,
                    backgroundColor: '#148744',
                    height: 45,
                    width: 120,
                    position: 'absolute',
                    right: 20,
                    bottom: 20
                }}
                >
               <Text style={styles.uploadbtn}>Upload</Text> 
            </TouchableOpacity>
            </ImageBackground>
            )
           
            : (<Camera style={{flex: 1}} type={Camera.Constants.Type.back} ref={ref => {
               setCameraRef(ref);
           }}>
               <View
               style={{
                   flex: 1,
                   alignSelf: 'center'
               }}>
                <TouchableOpacity style={{alignSelf: 'center'}} onPress={async()=>{
                    if (cameraRef) {
                        let photo = await cameraRef.takePictureAsync({
                            quality: 0.1,
                            base64: true,
                        });
                        const filename = uuidv4();
                        setPhoto(photo);
                        setImagePath(filename);
                        let location = await Location.getCurrentPositionAsync({});
                        setLocation(location);
                    }
                }}>
                    <View style={styles.shutterBtnCont}>
                        <View style={{
                            borderWidth: 2,
                            borderRadius: "10%",
                            borderColor: 'white',
                            height: 50,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'}}
                            >
                                <View style={{
                                    borderWidth: 2,
                                    borderRadius: "50%",
                                    boarderColor: 'white',
                                    height: 40,
                                    width: 40,
                                    backgroundColor: 'white'
                                }}>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
               </View>
           </Camera>)}
       </View>
    );
}
const styles = StyleSheet.create({
    backbtn: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        alignSelf: 'center',
        textTransform: 'uppercase'
    },
    uploadbtn: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        alignSelf: 'center',
        textTransform: 'uppercase'
        },
    shutterBtnCont: {
        flex: 1,
        justifyContent: 'flex-end',
        marginBottom: 36
    }
})
export default CameraView

