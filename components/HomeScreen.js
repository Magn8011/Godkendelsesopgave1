// Importér nødvendige biblioteker og komponenter fra React Native
import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, FlatList } from 'react-native';

// Definér en funktionel komponent kaldet HomeScreen
function HomeScreen() {
  // Opretter to tilstande: showConsultants (for at styre om konsulenter skal vises) og consultantData (til at opbevare hentede data)
  const [showConsultants, setShowConsultants] = useState(false);
  const [consultantData, setConsultantData] = useState([]);

  // Funktion til at hente data fra en ekstern API, dette gøres via et asynkront fetch-kald, som henter en liste med 10 konsulenter
  // via en GET-request til https://randomuser.me/api/?results=10
  const fetchData = async () => {
    try {
      const response = await fetch('https://randomuser.me/api/?results=10');
      const data = await response.json();
      setConsultantData(data.results);
    } catch (error) {
      console.error('Fejl under hentning af data:', error);
    }
  };

  // Effektfunktion aktiveres, når showConsultants ændres. Henter data, hvis showConsultants er true.
  useEffect(() => {
    if (showConsultants) {
      fetchData();
    }
  }, [showConsultants]);

  // Funktion til at skifte visningen af konsulenter
  const toggleConsultants = () => {
    setShowConsultants(!showConsultants);
  };

  // Render komponenten
  return (
    <View style={styles.container}>
      {/* Knappen, der skifter mellem at vise/skjule konsulenter afhængigt af showConsultants-tilstanden */}
      <Button
        title={showConsultants ? 'Skjul konsulenter' : 'Vis ledige konsulenter'}
        onPress={toggleConsultants}
        color="#007AFF"
        style={styles.button}
      />
      {/* Viser konsulenterne som en FlatList, hvis showConsultants er true */}
      {showConsultants && (
        <FlatList
          data={consultantData}
          keyExtractor={(item) => item.login.uuid}
          renderItem={({ item }) => (
            <View style={styles.itemContainer}>
              {/* Viser navnet på konsulenten */}
              <Text style={styles.name}>{item.name.first} {item.name.last}</Text>
              {/* Viser erfaringen på konsulenten */}
              <Text style={styles.experience}>{`${item.dob.age} år erfaring`}</Text>
              {/* Viser faglige kompetencer, hvis de er tilgængelige */}
              {item.skills && item.skills.length > 0 && (
                <Text style={styles.skills}>Faglige kompetencer:</Text>
              )}
            </View>
          )}
        />
      )}
    </View>
  );
}

// Definer "styles", som skal indeholde styling til vores komponenter --> herunder button, container, name osv hos HomeScreen
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0f0f0',
  },
  button: {
    marginTop: 20,
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
    width: 200,
    alignItems: 'center',
  },
  itemContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    backgroundColor: 'beige',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  experience: {
    fontSize: 14,
    color: '#777',
  },
  skills: {
    fontSize: 14,
    color: 'black', // Ændret farvenavn til små bogstaver ("black")
  },
});

// Eksportér HomeScreen komponenten som standard eksport
export default HomeScreen;