import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import Background from './Background';
import Bttn from './Bttn';
import { darkGreen, green } from './Constants';
import { useNavigation } from '@react-navigation/native';

const Home = ({route}) => {
  const navigation = useNavigation()
  const email= route.params;
  console.log('from the homescreen ', email)
  return (
    <Background>
      <View style={{ marginHorizontal: 40, marginVertical: 100 }}>
      <Text style={{ color: 'white', fontSize: 64 }}>DocSafer</Text>
      <Text style={{ color: 'white', fontSize: 20, left:20}}>Your E- document Wallet</Text>
      <View style = {styles.login}>
      <Bttn bgColor={green} textColor='white' btnLabel="Upload Files" Press={() => navigation.navigate("UploadFile",  {email})} />
      <Bttn bgColor='white' textColor={darkGreen} btnLabel="View File s" Press={() => navigation.navigate("ViewFile", {email})} />
      </View>
      </View>
    </Background> 
  );
}

const styles = StyleSheet.create({
  login:{
    top:290,
    left:40
  },
})


export default Home;