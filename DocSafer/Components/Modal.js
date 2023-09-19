import React from 'react';
import { Modal, View, Text, Button, StyleSheet } from 'react-native';

const MyModal = ({ visible, onDismiss, onSelect }) => {
  return (
    <View animationType="slide" transparent={true} visible={visible}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalText}>Select a PDF document</Text>
          <Button title="Pick a PDF" onPress={onSelect} />
          <Button title="Cancel" onPress={onDismiss} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    height:3,
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

export default MyModal;
