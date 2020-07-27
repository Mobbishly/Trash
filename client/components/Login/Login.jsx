import React, { useState } from 'react';
import { View, Button, TextInput, StyleSheet, Text, Alert } from 'react-native';
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
      <Text style={styles.header}>#Trash Tagger</Text>
        <TextInput
          value={user}
          onChangeText={(username)=> setUser(username)}
          placeholder={'Username'}
          style={styles.input} />
        <TextInput
          value={password}
          onChangeText={(password) => setPassword(password)}
          placeholder={'Password'}
          secureTextEntry={true}
          style={styles.input}
          />
        <Button
          title={'Login'}
          style={styles.input}
          onPress={onLogin}
        />
        <Button
          title={'Register'}
          style={styles.input}
          onPress={() => navigation.navigate('RegisterUser')}
        />
  </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
  },
  input: {
    width: 200,
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 10,
    
  },
  header: {
    fontSize: 40,
    fontWeight: "bold",
    marginBottom: 100

  }
  });
export default Login
