import React from 'react';
import { View, Button, Platform } from 'react-native';
import * as Print from 'expo-print';

export default function PDFViewer({ pdfURI }) {
  const URI = pdfURI;

  const handlePrintAndDownload = async () => {
    try {
      if (Platform.OS === 'android') {
        const my_uri = `data:application/pdf;base64,${URI}`;
        await Print.printAsync({uri:my_uri});
        console.log('PDF downloaded to:', my_uri);
      } else {
        await Print.printAsync({ uri: `data:application/pdf;base64,${URI}` });
      }
    } catch (error) {
      console.error('Error printing or downloading PDF:', error);
    }
  };

  return (
    <View>
      <Button title="View/Download PDF" onPress={() => handlePrintAndDownload()} />
    </View>
  );
}
