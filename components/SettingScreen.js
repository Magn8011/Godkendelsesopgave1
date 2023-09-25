// Importér React og nødvendige komponenter fra React Native og Firebase
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { getAuth, signOut } from 'firebase/auth';

// Definér en funktionel komponent kaldet SettingsScreen
function SettingsScreen() {
  // Opretter en instans af Firebase authentication
  const auth = getAuth();

  // Funktion til at håndtere brugerlogud
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        // Brugeren er blevet logget ud
        console.log('Brugeren er blevet logget ud');
        // Du kan også navigere brugeren til en anden skærm her, f.eks. login-skærmen
      })
      .catch((error) => {
        // Håndter eventuelle fejl, der opstår under logud-processen
        console.error('Fejl under logud:', error);
      });
  };

  // Render UI-komponenterne
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Såfremt man vil logge ud</Text>
      {/* Knappen til at logge ud */}
      <Button title="Log ud" onPress={handleLogout} />
    </View>
  );
}

// Lokal styling med StyleSheet.create til brug i SettingsScreen, hvor man logger ud
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
  },
});

// Eksport af SettingsScreen komponenten som standard eksport
export default SettingsScreen;