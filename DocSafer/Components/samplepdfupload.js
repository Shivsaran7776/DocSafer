import React, { useState } from 'react';
import { View, StyleSheet, Button, Text } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import axios from 'axios';

const PdfUpload = () => {
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
    <View style={styles.container}>
      <Button title="Select PDF" onPress={handleFilePick} />
      {selectedFile && <Text>{selectedFile.name}</Text>}
      <Button title="Upload PDF" onPress={handleUpload} disabled={!selectedFile} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default PdfUpload;
