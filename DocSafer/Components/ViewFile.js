import React from 'react';
import {View, StyleSheet, Text, SafeAreaView} from 'react-native';
import Background from './Background';
import Btn from './Btn';
import { darkGreen, green } from './Constants';
import { StatusBar } from 'expo-status-bar';

function ViewFile(props) {
  return (
    <Background>
      <SafeAreaView>
        <StatusBar/>
        <View style={styles.container}>
          <Text>Viewfile</Text>
        </View>
      </SafeAreaView>
    </Background>
  )
}

export default ViewFile

const styles = StyleSheet.create({
  container:{
    top:320,
    alignItems:'center',
    backgroundColor:'white',
  },
})