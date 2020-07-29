import React, { useState } from 'react';
import { Image, View, TextInput, StyleSheet, Text, Alert, TouchableOpacity } from 'react-native';
import Axios from 'axios';


function Login( {setIsLoggedIn, setUser, user, navigation} ) {

  const [ password, setPassword ] = useState('')


const onLogin = () => {
  Axios.get(`https://us-central1-trash-2b5de.cloudfunctions.net/app/api/users/${user}`)
  .then(res => {
    if (res.data[0].password === password) {
      setIsLoggedIn(true)
      } else {
        Alert.alert(
          'Wrong Entry',
          'Password or Username Invalid',
          [
            {
              text: 'Ok',
            }
          ]
        )
      }
    }
  )
} 
  
  
  
  
  
  
  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require('../../assets/logo.png')}/>
        <Text style={styles.header}>#TrashTagger</Text>
        <TextInput
          value={user}
          onChangeText={(username)=> setUser(username)}
          placeholder={'Username'}
          placeholderTextColor="lightgrey"
          style={styles.input} />
        <TextInput
          value={password}
          onChangeText={(password) => setPassword(password)}
          placeholder={'Password'}
          placeholderTextColor="lightgrey"
          secureTextEntry={true}
          style={styles.input}
          />

          <TouchableOpacity 
            style={styles.button}
            onPress={onLogin}  
          >
            <Text style={styles.backbtn}>Login</Text> 
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button2}
            onPress={() => navigation.navigate('RegisterUser')}
          >
            <Text style={styles.backbtn}>Register</Text> 
          </TouchableOpacity>
  </View>
  )
}
const styles = StyleSheet.create({
  button: {
    elevation: 8,
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: '#1eb854',
    height: 45,
    width: '80%',
    marginTop: 20,
    shadowOffset: {
      width: 0,
      height: 1,
      },
      shadowOpacity: 0.87,
      shadowRadius: 0.65,
},
button2: {
  elevation: 8,
  borderRadius: 25,
  paddingVertical: 10,
  paddingHorizontal: 12,
  backgroundColor: '#07b4cf',
  height: 45,
  width: '80%',
  marginTop: 20,
  shadowOffset: {
    width: 0,
    height: 1,
    },
    shadowOpacity: 0.87,
    shadowRadius: 0.65,
},
  backbtn: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    alignSelf: 'center',
    textTransform: 'uppercase',
    
},
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#223148',
  },
  logo: {
    width: 150,
    height: 150
  },
  input: {
    fontSize: 20,
    width: '75%',
    height: 44,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgrey',
    marginBottom: 20,
    color: 'white',
  },
  header: {
    fontSize: 40,
    fontWeight: "bold",
    marginBottom: 100,
    color: 'lightgrey'
  }
  });
export default Login
