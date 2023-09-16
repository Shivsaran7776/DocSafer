import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './Components/Home';
import Signup from './Components/Signup';
import Login from './Components/Login';
import HomeScreen from './Components/HomeScreen';
import UploadFile from './Components/UploadFile';
import ViewFile from './Components/ViewFile';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="HomeScreen" component={HomeScreen}/>
        <Stack.Screen name="UploadFile" component={UploadFile}/> 
        <Stack.Screen name="ViewFile" component={ViewFile}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;