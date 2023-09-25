// Importér React og nødvendige komponenter fra React Native og Firebase
import React, { useState } from 'react';
import {
  Button,
  Text,
  View,
  TextInput,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';

//import firebase from 'firebase';
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

// Definér en funktionel komponent kaldet SignUpForm
function SignUpForm() {
// Instantiering af state-variabler, der skal benyttes i SignUpForm
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isCompleted, setCompleted] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);

// Opretter en instans af Firebase authentication
    const auth = getAuth();

// Her defineres brugeroprettelsesknappen, som aktiverer handleSubmit igennem onPress
    const renderButton = () => {
        return <Button onPress={() => handleSubmit()} title="Opret bruger" />;
    };

    
// Definér en asynkron funktion kaldet handleSubmit, der aktiveres ved forsøg på brugeroprettelse
const handleSubmit = async () => {
    // Forsøg at oprette en bruger med den angivne email og kodeord
    await createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
// Hvis brugeroprettelsen lykkes, udfør følgende:
        
// Hent brugeroprettelsesoplysninger fra userCredential
        const user = userCredential.user;
// Her kan yderligere handlinger udføres, hvis nødvendigt
    })
    .catch((error) => {
// Hvis der opstår en fejl under brugeroprettelsen, udfør følgende:

// Hent fejlkoden fra fejl-objektet
        const errorCode = error.code;
// Hent fejlmeddelelsen fra fejl-objektet
        const errorMessage = error.message;
// Opdater errorMessage-state med fejlmeddelelsen, så den kan vises til brugeren
        setErrorMessage(errorMessage);
// Her kan yderligere fejlhåndtering udføres, hvis nødvendigt

    });
}

/*
Samlet set gør nedenstående kodestykke, at der bliver renderet et indhold på skærmen, når SignUpForm-komponenten bruges, og det giver 
brugeren mulighed for at indtaste deres email og kodeord for at oprette en ny brugerkonto. Eventuelle fejlmeddelelser vises, hvis 
der opstår en fejl under oprettelsesprocessen, og knappen "Opret bruger" udfører oprettelsen ved at kalde handleSubmit.
*/
    return (
        <View>
            {/* Overskriftstekst */}
            <Text style={styles.header}>Opret bruger</Text>
             {/* Inputfelt til email */}
            <TextInput
                placeholder="Email"
                value={email}
                onChangeText={(email) => setEmail(email)}
                style={styles.inputField}
            />
            {/* Inputfelt til kodeord (skjult) */}
            <TextInput
                placeholder="Kodeord"
                value={password}
                onChangeText={(password) => setPassword(password)}
                secureTextEntry
                style={styles.inputField}
            />
            {/* Vis fejlmeddelelse, hvis der er en fejl */}
            {errorMessage && (
                <Text style={styles.error}>Fejl: {errorMessage}</Text>
            )}
            {renderButton()}
        </View>
    );
}

// Lokal styling ved hjælp af StyleSheet.create til brug i SignUpForm
const styles = StyleSheet.create({
    error: {
        color: 'red',
    },
    inputField: {
        borderWidth: 1,
        margin: 10,
        padding: 10,
        width: 300,
        borderRadius: 10,
    },
    header: {
        fontSize: 40,
    },
});

// Eksport af SignUpForm komponenten som standard eksport, så den kan importeres og bruges i andre komponenter
export default SignUpForm;