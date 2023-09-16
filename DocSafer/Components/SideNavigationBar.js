import React from 'react';
import { View, Text, Button } from 'react-native';

const SideMenu = ({ navigation }) => {
  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text>Side Menu</Text>
      <Button
        title="Go to Home"
        onPress={() => navigation.navigate('Home')}
      />
      {/* Add more menu items and navigation logic */}
    </View>
  );
};

export default SideMenu;
