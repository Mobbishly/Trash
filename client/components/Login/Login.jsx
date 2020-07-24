import React from 'react';
import { View, Button, TextInput, StyleSheet, Text } from 'react-native'

function Login( {setIsLoggedIn, setUser, user, navigation} ) {

const onLogin = () => setIsLoggedIn(true)
  return (
    <View style={styles.container}>
      <Text style={styles.header}>#Trash Tagger</Text>
        <TextInput
          value={user.username}
          onChangeText={(username)=> setUser({username})}
          placeholder={'Username'}
          style={styles.input} />
        <TextInput
          // value={user.password}
          // onChangeText={(password) => setUser({...user}, {password})}
          // placeholder={'Password'}
          // secureTextEntry={true}
          // style={styles.input}
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
    marginTop: 100
  },
  header: {
    fontSize: 40,
    fontWeight: "bold"
  }
  });
export default Login
