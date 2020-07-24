import React, { useState } from 'react'
import { Text, View, TextInput, Button, StyleSheet } from 'react-native'
import axios from 'axios'

const RegisterUser = ({navigation}) => {
const [username, setUsername] = useState('')
const [firstName, setFirstName] = useState('')
const [lastName, setLastName] = useState('')
const [email, setEmail] = useState('')

const register = () => {
  axios({
    method: 'post',
    url: 'https://us-central1-trash-2b5de.cloudfunctions.net/app/api/users/',
    data: {
      username: username,
      firstName: firstName,
      lastName: lastName,
      email: email,
      karmaPoints: 0
    }
  });
  navigation.goBack()
}

  return (

    <View style={styles.container}>
      <Text style={styles.header}>Registration Form</Text>
      <TextInput
        value={username}
        onChangeText={(username)=> setUsername(username)}
        placeholder={'Username'}
        style={styles.input}
        />
        <TextInput
        value={firstName}
        onChangeText={(firstName)=> setFirstName(firstName)}
        placeholder={'First Name'}
        style={styles.input}
        />
        <TextInput
        value={lastName}
        onChangeText={(lastName)=> setLastName(lastName)}
        placeholder={'Last Name'}
        style={styles.input}
        />
        <TextInput
        value={email}
        onChangeText={(email)=> setEmail(email)}
        placeholder={'Email'}
        style={styles.input}
        />
      <Button
      title="Register"
      onPress={() => register()}
      />
      <Button
      title="Back"
      onPress={() => navigation.goBack()}
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
  header: {
    marginBottom: 20,
    fontSize: 30,
    fontWeight: 'bold'
  },
  input: {
    width: 200,
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 10,
  },
});


export default RegisterUser
