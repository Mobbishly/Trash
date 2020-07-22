
import React, {useState, useEffect, useRef} from 'react';
import { Text, View, TouchableOpacity } from 'react-native'
import { Camera } from 'expo-camera'

const CameraView = () => {
    const [hasPermission, setHasPermission] = useState(null);
    const [cameraRef, setCameraRef] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);

    useEffect (() => {
        (async () => {
            const { status } = await Camera.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, [])

    if (hasPermission === null) {
        return <View />;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }
    return (
       <View style= {{ flex: 1, width: '100%'}}>
           <Camera style={{flex: 1}} type={Camera.Constants.Type.back} ref={ref => {
               setCameraRef(ref);
           }}>
               <View
               style={{
                   flex: 1,
                   alignSelf: 'center'
               }}>
                <TouchableOpacity style={{alignSelf: 'center'}} onPress={async()=>{
                    if (cameraRef) {
                        let photo = await cameraRef.takePictureAsync();
                        console.log('photo', photo);
                    }
                }}>
                <View style={{
                    borderWidth: 2,
                    borderRadius: "50%",
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
                </TouchableOpacity>
               </View>
           </Camera>
       </View>
    );
}

export default CameraView

