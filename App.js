import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { getApps, initializeApp } from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDeqQluJe8Wz37Q9iwdRE9ky7pu0DrkoQ0",
  authDomain: "godkendelseopgave1.firebaseapp.com",
  projectId: "godkendelseopgave1",
  storageBucket: "godkendelseopgave1.appspot.com",
  messagingSenderId: "783482051352",
  appId: "1:783482051352:web:a5a18ba1782418ab429c6d"
};


export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
