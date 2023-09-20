import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/core';

const ViewFile = ({ route }) => {
  const { email } = route.params;
  console.log('fromthe View file', email.email)
  const [files, setFiles] = useState([]);
  const navigation = useNavigation()
  // navigation.navigate('HomeScreen')
  useEffect(() => {
    // Fetch files associated with the authenticated user's email
    const fetchFiles = async () => {
      try {
        const response = await axios.get(`http://192.168.1.5:6080/files/${email.email}`);
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
    <View style={styles.container}>
      <Text style={styles.header}>Your Uploaded Files</Text>
      <FlatList
        data={files}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.fileItem}>
            <Text>{item.fileName}</Text>
            <Text>{item.date}</Text>
            {/* Add a button or action to view/download the file */}
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
});

export default ViewFile;
