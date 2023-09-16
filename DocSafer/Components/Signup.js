import React, { useState } from 'react';
import {View, Text, Touchable, TouchableOpacity} from 'react-native';
import Background from './Background';
import Btn from './Btn';
import {darkGreen} from './Constants';
import Field from './Field';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';


const Signup = (props) => {
  const navigation = useNavigation()
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async() => {
    if (
      firstName === '' ||
      lastName === '' ||
      email === '' ||
      contactNumber === '' ||
      password === '' ||
      confirmPassword === ''
    ) {
      alert('Please fill in all the fields.');
    } else if (password !== confirmPassword) {
      alert('Passwords do not match.');
    } else {
      axios.post('http://192.168.1.5:8080/insert', {
        name:firstName+lastName,
        email:email,
        password:password
      }).then((res)=>{
        if(res.data.message=="success"){
          alert("Registraction successfull")
          props.navigation.navigate('Login');
        }
        else{
          alert(res.data.message);
        }
      })
      
      
    }
  };

  return (
    <Background>
      
      <View style={{alignItems: 'center', width: 460}}>
        <Text
          style={{
            color: 'white',
            fontSize: 64,
            fontWeight: 'bold',
            marginTop: 20,
          }}>
          Register
        </Text>
        <Text
          style={{
            color: 'white',
            fontSize: 19,
            fontWeight: 'bold',
            marginBottom: 20,
          }}>
          Create a new account
        </Text>
        <View
          style={{
            backgroundColor: 'white',
            height: 620,
            width: 375,
            borderTopLeftRadius: 130,
            borderBottomLeftRadius: 130,
            paddingTop: 50,
            alignItems: 'center',
          }}>
            
      <View
      style={{
        height: 620,
        width: 375,
        paddingTop: 50,
        alignItems: 'center',
      }}
      >
      <Field
        placeholder="First Name"
        value={firstName}
        onChangeText={(text) => setFirstName(text)}
        />

        <Field
            placeholder="Last Name"
            value={lastName}
            onChangeText={(text) => setLastName(text)}
        />
          <Field
            placeholder="Email / Username"
            keyboardType="email-address"
            value={email}
            onChangeText={(text) => setEmail(text)}
        />
          <Field
            placeholder="Contact Number"
            keyboardType="number"
            value={contactNumber}
            onChangeText={(text) => setContactNumber(text)}
        />
          <Field
            placeholder="Password"
            secureTextEntry={true}
            value={password}
            onChangeText={(text) => setPassword(text)}
        />
          <Field
            placeholder="Confirm Password"
            secureTextEntry={true}
            value={confirmPassword}
            onChangeText={(text) => setConfirmPassword(text)}
        />
      <Btn
        textColor="white"
        bgColor={darkGreen}
        btnLabel="Signup"
        Press={handleSubmit}
      />
      <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
            }}>
            <Text style={{fontSize: 16, fontWeight: 'bold'}}>
              Already have an account ?{' '}
            </Text>
            <TouchableOpacity
              onPress={() => props.navigation.navigate('Login')}>
              <Text
                style={{color: darkGreen, fontWeight: 'bold', fontSize: 16}}>
                Login
              </Text>
            </TouchableOpacity>
          </View>
      </View>
        </View>
      </View>

    </Background>
  );
};

export default Signup;