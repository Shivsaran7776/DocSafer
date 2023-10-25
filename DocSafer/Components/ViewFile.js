import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity ,SafeAreaView } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/core';
import Background from './Background';
import { decode, encode } from 'base-64';
import ViewAndDownload from './ViewAndDownload';

if (!global.btoa) {
  global.btoa = encode;
}
if (!global.atob) {
  global.atob = decode;
}
const ViewFile = ({ route }) => {
  const [email, setEmail] = useState('');
  const [uri, setURI] =useState('');

  useEffect (()=>{
    setEmail(route.params.email);
  },[email])
  console.log('from the ViewScreen ', email)
  const [files, setFiles] = useState([]);
  const navigation = useNavigation()
  // navigation.navigate('HomeScreen')
  useEffect(() => {
    // Fetch files associated with the authenticated user's email
    const fetchFiles = async () => {
      try {
        const response = await axios.get(`http://192.168.1.5:6080/files/${email}`);
        if (response.status === 200) {
          setFiles(response.data);
        } else {
          console.log('Failed to fetch files:', response.data);
        }
      } catch (error) {
        console.error('Error fetching files:', error);
      }
    };

    fetchFiles();
  }, [email]);
  
  
  const handleViewFile = async (item) => {
    let id = item._id;
    console.log(id);
    try {
      const response = await axios.get(`http://192.168.1.5:6080/getpdf/${id}`);
  
      if (response.data) {
        console.log(response.data.base64Data)
        setURI(response.data.base64Data)
        
      } else {
        console.log("Response data is empty.");
      }
    } catch (error) {
      console.error("Error fetching item:", error);
    }
  };

  return (
    <Background>
      <SafeAreaView>
        <View style={styles.container}>
          <Text style={styles.header}>Your Uploaded Files</Text>
         
            <FlatList
            data={files}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
              <View style={styles.fileItem}>
                <TouchableOpacity
                style={styles.viewButton}
                onPress={() => handleViewFile(item)} // Add this function
              >
                <Text>{item.fileName}</Text>
                <Text>{item.date}</Text>
                {uri && <ViewAndDownload pdfURI={uri} />}
              </TouchableOpacity>
             </View>
          )}
          />
        </View>
      </SafeAreaView>
    </Background>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'white',
    marginTop:50,
    marginLeft:50,
    padding: 16,
    maxHeight:750,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  fileItem: {
    margin:5,
    borderWidth:5,
    borderColor: 'black',
  },
  viewButton: {
    backgroundColor: 'white',
    padding: 8,
    borderRadius: 5,
    marginTop: 8,
  },
  viewButtonText: {
    color: 'white',
    textAlign: 'center',
  },
});


export default ViewFile;
