
import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import Background from './Background';
import Btn from './Btn';
import { darkGreen, green } from './Constants';

const Home = (props) => {
  // ashwin
  return (
    <Background>
      <View style={{ marginHorizontal: 40, marginVertical: 100 }}>
      <Text style={{ color: 'white', fontSize: 64 }}>DocSafer</Text>
      <Text style={{ color: 'white', fontSize: 20, left:30,fontWeight:'bold'}}>Your E- document Wallet</Text>
      <View style = {styles.login}>
      <Btn bgColor={green} textColor='white' btnLabel="Login" Press={() => props.navigation.navigate("Login")} />
      <Btn bgColor='white' textColor={darkGreen} btnLabel="Signup" Press={() => props.navigation.navigate("Signup")} />
      </View>
      </View>
    </Background>
  );
}

const styles = StyleSheet.create({
  login:{
    top:320,
},
})

export default Home;