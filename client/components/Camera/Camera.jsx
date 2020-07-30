
import React, {useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, ImageBackground, StyleSheet, Alert} from 'react-native'
import { Camera } from 'expo-camera'
import * as Location from 'expo-location';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import firebase from '../../firebase.js'
import { preventAutoHide } from 'expo/build/launch/SplashScreen';
import * as Progress from 'react-native-progress';

const CameraView = ({user}) => {
    const [hasPermission, setHasPermission] = useState(null);
    const [cameraRef, setCameraRef] = useState(null);
    const [photo, setPhoto] = useState(null);
    const [location, setLocation] = useState(null);
    const [imagePath, setImagePath] = useState(null);
    const [progress, setProgress] = useState(null);
    const [uploadComplete, setUploadComplete] = useState(true);

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

            //converting blob to base 64
            var reader = new FileReader();
            reader.readAsDataURL(blob); 
            reader.onloadend = function() {
                var base64data = reader.result;            
           
                const API_KEY = 'AIzaSyByFev4TGGQQW9leJiMUTdtfGl_YD4Jnb8';
                const API_URL = `https://vision.googleapis.com/v1/images:annotate?key=${API_KEY}`
                
                async function callGoogleVisionAsync(image) {
                  const body = {
                    requests: [
                      {
                        image: {
                          content: image,
                        },
                        features: [
                          // {
                          //   type: 'LABEL_DETECTION',
                          //   maxResults: 5,
                          // },
                          {
                            type: "SAFE_SEARCH_DETECTION",
                            maxResults: 1
                        },
                        ]
                      },
                    ],
                  };
                
                  const response = await fetch(API_URL, {
                    method: 'POST',
                    headers: {
                      'Accept': 'application/json',
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(body),
                  });
                  const parsed = await response.json();
                  if(parsed.responses[0].safeSearchAnnotation.adult === 'VERY_LIKELY'
                    || parsed.responses[0].safeSearchAnnotation.adult === 'LIKELY'
               
                    || parsed.responses[0].safeSearchAnnotation.racy === 'VERY_LIKELY'
                    || parsed.responses[0].safeSearchAnnotation.racy === 'LIKELY'
                  
                    || parsed.responses[0].safeSearchAnnotation.violence === 'VERY_LIKELY'
                    || parsed.responses[0].safeSearchAnnotation.violence === 'LIKELY'
                   
                  
                    ) {
                      alert('Your image is not appropriate. Please try again')
                    } else {
                      const storageRef = firebase.storage().ref().child('images/' + imagePath)
                      setUploadComplete(false)
                      storageRef.put(blob)
                          .on('state_changed', snapshot => {
                              let progress1 = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                              setProgress(progress1);
                              switch (snapshot.state) {
                                  case firebase.storage.TaskState.PAUSED:
                                      break;
                                  case firebase.storage.TaskState.RUNNING:
                                      break;
                              }
                          }, error => {
                              console.log(error)
                          }, async () => {
                              if (progress === 100 || progress === null) {
                                  Alert.alert('Upload', 'Upload Complete', [{ text: 'OK', onPress: () => {setUploadComplete('true')}}]);    
                              }
          
                              let url = await storageRef.getDownloadURL();
                              await axios({
                                  method: 'post',
                                  url: 'https://us-central1-trash-2b5de.cloudfunctions.net/app/api/locations',
                                  data: {
                                    id: uuidv4(),
                                    lat: location.coords.latitude,
                                    long: location.coords.longitude,
                                    completed: false,
                                    uri: url,
                                    user: user
                                  }
                              })
                            });
                    }
                
                  return parsed.responses[0];
                }
            
                callGoogleVisionAsync(base64data.slice(23))
            }   
           
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
                {uploadComplete === false ? <Progress.Bar progress={progress} width={200} style={{position: 'relative', top: 75}} /> : <View />}
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
                            alignItems: 'center',
                            }}
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

