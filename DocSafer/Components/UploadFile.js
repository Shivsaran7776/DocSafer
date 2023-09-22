import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, SafeAreaView, Modal, Button } from 'react-native';
import Background from './Background';
import Btn from './Btn';
import { darkGreen, green } from './Constants';
import { StatusBar } from 'expo-status-bar';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import * as DocumentPicker from 'expo-document-picker';
import MyModal from './Modal'; 

const UploadFile = ({ route }) => {
  const [email, setEmail] = useState('');
  useEffect (()=>{
    setEmail(route.params.email);
  },[email])
  console.log('from the Upload ', email)
  // console.log('from the upload check', email);
  
  // console.log('check 2', auth);
  const navigation = useNavigation();
  const [selectedFile, setSelectedFile] = useState(null); // Initialize with null
  const [date, setDate] = useState('');

  useEffect(() => {
    const curdate = new Date();

    let day = curdate.getDate();
    let month = curdate.getMonth() + 1;
    let year = curdate.getFullYear();
    setDate(`${day}-${month}-${year}`);
  }, []); // Empty dependency array to run once on mount
// navigation.navigate('HomeScreen')
  const handleFilePick = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({ type: 'application/pdf' });
      if (result.assets[0]) {
        setSelectedFile(result.assets[0]);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpload = async () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append('File', {
        uri: selectedFile.uri,
        type: 'application/pdf',
        name: selectedFile.name,
      });

      formData.append('fileName', selectedFile.name)
      formData.append('email', email);
      formData.append('date', date);

      try {
        const response = await axios.post('http://192.168.1.30:6080/uploadpdf', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        if (response.status === 200) {
          console.log('File uploaded successfully.');
          alert('File uploaded successfully.');
          navigation.navigate('HomeScreen',{email});
        } else {
          console.log('File upload failed. Server returned:', response.data);
          alert('Error Occurred in file upload.');
          navigation.navigate('HomeScreen', {email});
        }
      } catch (error) {
        console.error('Error uploading file:', error);
        alert('Error Occurred in file upload.');
      }
    } else {
      console.log('No file selected.');
      alert('No File Selected.');
    }
  };

  return (
    <Background>
      <SafeAreaView>
        <StatusBar />
        <View style={{marginHorizontal: 40, marginVertical: 60}}>
      <Text style={{ color: 'white', fontSize: 64 }}>DocSafer</Text>
      <Text style={{ color: 'white', fontSize: 20, left:20 ,marginBottom: 40,fontWeight:'bold'}}>Your E- document Wallet</Text>
      <Text style={{ color: 'white', fontSize: 20, left:50 ,marginBottom: 10,fontWeight: 'bold',fontSize: 30}}>Upload your files</Text>
        <View style={styles.container2}>
          {selectedFile && <Text>{selectedFile.name}</Text>}
          <Button title="Select PDF" onPress={handleFilePick} />
          
          <Button title="Upload PDF" onPress={handleUpload} disabled={!selectedFile} />
        </View>
        </View>
      </SafeAreaView>
    </Background>
  );
};

export default UploadFile;
const styles = StyleSheet.create({
  container2:{
    flex: 2,
    borderRadius:10,
    marginTop:30,
    marginLeft:-10,
    width:350,
    height:400,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'white',
  },
  container: {
    alignItems: 'center',
    alignContent:'center',
    marginTop: 300,
    marginLeft:25 ,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 10,
  },
});