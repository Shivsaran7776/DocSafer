import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Background from './Background';
import Btn from './Btn';
import { darkGreen } from './Constants';
import Field from './Field';
import axios from 'axios'

const Login = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userData, setUserData] = useState(null);

  const handleLogin = () => {
    if (email.trim() === '' || password.trim() === '') {
      alert('Please fill in all fields');
      return;
    }
  
    const userData = { email:email, password:password};
    axios.post('https://docsafer-mad.onrender.com/login', userData)
      .then((res)=>{
        if(res.data.status==500){
          alert('Successfullly Logined In');

        }
        else{
          alert(res.data.message);
        }
      })
      .catch(error => {
        console.error('API error:', error);
      });
  };

  useEffect(() => {
    console.log('User data:', userData);
  }, [userData]);

  return (
    <Background>
    <View style={{alignItems: 'center', width: 460}}>
    <Text
      style={{
        color: 'white',
        fontSize: 64,
        fontWeight: 'bold',
        marginVertical: 20,
      }}>
      Login
    </Text>
    <View
      style={{
        backgroundColor: 'white',
        height: 620,
        width: 375,
        borderTopLeftRadius: 130,
        borderBottomLeftRadius: 130,
        paddingTop: 80,
        alignItems: 'center',
      }}>
      <Text style={{fontSize: 40, color: darkGreen, fontWeight: 'bold'}}>
        Welcome Back
      </Text>
      <Text
        style={{
          color: 'grey',
          fontSize: 19,
          fontWeight: 'bold',
          marginBottom: 20,
        }}>
        Login to your account
      </Text>
      <Field
        placeholder="Email"
        keyboardType={'email-address'}
        value={email}
        onChangeText={setEmail}
      />
      <Field
        placeholder="Password"
        secureTextEntry={true}
        value={password}
        onChangeText={setPassword}
      />
      
      <Btn textColor='white' bgColor={darkGreen} btnLabel="Login" Press={handleLogin} />
      <View style={{ display: 'flex', flexDirection :'row', justifyContent: "center" }}>
            <Text style={{ fontSize: 16, fontWeight:"bold" }}>Don't have an account ? </Text>
            <TouchableOpacity onPress={() => props.navigation.navigate("Signup")}>
            <Text style={{ color: darkGreen, fontWeight: 'bold', fontSize: 16 }}>Signup</Text>
            </TouchableOpacity>
          </View>
          </View>

      </View>
    </Background>
  );
};

export default Login;

