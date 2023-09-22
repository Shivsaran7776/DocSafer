import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity ,SafeAreaView } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/core';
import Background from './Background';

const ViewFile = ({ route }) => {
  const [email, setEmail] = useState('');
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
        const response = await axios.get(`http://192.168.1.30:6080/files/${email}`);
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
                <Text>{item.fileName}</Text>
                <Text>{item.date}</Text>
                <TouchableOpacity
                style={styles.viewButton}
                onPress={() => handleViewFile(item)} // Add this function
              >
                <Text style={styles.viewButtonText}>View/Download</Text>
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
    marginTop:20,
    marginLeft:10,
    padding: 16,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  fileItem: {
    borderBottomWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 8,
  },
  viewButton: {
    backgroundColor: 'darkgreen',
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
