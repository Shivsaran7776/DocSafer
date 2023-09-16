import React from 'react';
import {View, StyleSheet, Text, SafeAreaView} from 'react-native';
import Background from './Background';
import Btn from './Btn';
import { darkGreen, green } from './Constants';
import { StatusBar } from 'expo-status-bar';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const UploadFile=(props)=> {
  
  const handleSubmit = ()=>{
    axios.post('http://192.168.50.9:6080/newpost',{
      
    })
  }
  return (
    <Background>
      <SafeAreaView >
        <StatusBar/>
        <View style={styles.container}>
           <Text>UploadFile</Text>
        </View>
        <Btn
        textColor="white"
        bgColor={darkGreen}
        btnLabel="Upload"
        Press={handleSubmit}
      />
    </SafeAreaView>
    </Background>
  )
}

export default UploadFile

const styles = StyleSheet.create({
    container:{
        top:320,
        alignItems:'center',
        backgroundColor:'white',
    },
})