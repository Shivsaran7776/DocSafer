import React, { useState } from 'react';
import { View, StyleSheet, Text, SafeAreaView, Modal, Button } from 'react-native';
import Background from './Background';
import Btn from './Btn';
import { darkGreen, green } from './Constants';
import { StatusBar } from 'expo-status-bar';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import * as DocumentPicker from 'expo-document-picker';
import MyModal from './Modal'; 

const UploadFile = () => {
  const [selectedFile, setSelectedFile] = useState([])

  const handleFilePick = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({ type: 'application/pdf' });
      console.log('hi')
      console.log('result', result)
      if (result.type === 'success') {
    }
      setSelectedFile(result.assets[0]);
      console.log('from the test file',result.assets[0])
      console.log('selected file', selectedFile.name)
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpload = async () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append('pdfFile', {
        uri: selectedFile.uri,
        type: 'application/pdf',
        name: 'sample.pdf'  
    });

      try {
        const response = await axios.post('http://192.168.1.5:8080/uploadpdf', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }); 

        if (response.status === 200) {
          console.log('File uploaded successfully.');
        } else {
          console.log('File upload failed. Server returned:', response.data);
        }
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    } else {
      console.log('No file selected.');
    }
  };
  return (
    <Background>
      <SafeAreaView>
        <StatusBar />
        <View style={styles.container2}>
          <Button title="Select PDF" onPress={handleFilePick} />
          {selectedFile && <Text>{selectedFile.name}</Text>}
          <Button title="Upload PDF" onPress={handleUpload} disabled={!selectedFile} />
        </View>
      </SafeAreaView>
    </Background>
  );
};

export default UploadFile;

const styles = StyleSheet.create({
  container2:{
    flex: 2,
    marginTop:20,
    justifyContent: 'center',
    alignItems: 'center',
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
