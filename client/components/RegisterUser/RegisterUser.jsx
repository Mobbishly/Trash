import React, { useState } from 'react'
import { Text, View, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import axios from 'axios'

const RegisterUser = ({navigation}) => {
const [username, setUsername] = useState('')
const [email, setEmail] = useState('')
const [ password, setPassword ] = useState('')

const register = () => {
  axios({
    method: 'post',
    url: 'https://us-central1-trash-2b5de.cloudfunctions.net/app/api/users/',
    data: {
      username: username,
      email: email,
      password: password,
      karmaPoints: 0
    }
  });
  navigation.goBack()
}

  return (

    <View style={styles.container}>
      <Text style={styles.header}>Register</Text>
      <TextInput
        value={username}
        onChangeText={(username)=> setUsername(username)}
        placeholder={'Username'}
        placeholderTextColor="lightgrey"
        style={styles.input}
        />
        <TextInput
        value={email}
        onChangeText={(email)=> setEmail(email)}
        placeholder={'Email'}
        placeholderTextColor="lightgrey"
        style={styles.input}
        autoCapitalize = 'none'
        />
        <TextInput
        value={password}
        onChangeText={(password)=> setPassword(password)}
        placeholder={'Password'}
        placeholderTextColor="lightgrey"
        secureTextEntry={true}
        style={styles.input}
        />


        <TouchableOpacity 
            style={styles.button}
            onPress={() => register()}
          >
            <Text style={styles.backbtn}>CONFIRM</Text> 
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button2}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backbtn}>Back</Text> 
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
    marginTop: 60,
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
    fontSize: 35,
    marginBottom: 100,
    color: 'lightgrey'
  }
  });


export default RegisterUser
