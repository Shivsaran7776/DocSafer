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

const UploadFile = (props) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const handleFilePick = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({ type: 'application/pdf' });
      if (result.type === 'success') {
        setSelectedFile(result);
        setModalVisible(false);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = () => {
    if (selectedFile) {
      console.log('Selected File:', selectedFile);
      // You can now send the selectedFile to your backend for storage in MongoDB using Axios or other methods.
    } else {
      console.log('No file selected.');
    }
  };

  return (
    <Background>
      <SafeAreaView>
        <StatusBar />
        <View style={styles.container}>
          <Btn
            textColor="white"
            bgColor={darkGreen}
            btnLabel="Select PDF"
            onPress={() => setModalVisible(true)}
          />
          <Btn margin textColor="white" bgColor={green} btnLabel="Upload" onPress={handleSubmit} />
          </View>
          <MyModal
          visible={modalVisible}
          onDismiss={() => setModalVisible(false)}
          onSelect={handleFilePick}
        />
      </SafeAreaView>
    </Background>
  );
};

export default UploadFile;

const styles = StyleSheet.create({
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
