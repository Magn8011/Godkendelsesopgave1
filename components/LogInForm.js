// Importerer nødvendige biblioteker og komponenter fra React Native og Firebase
import React, { useState } from 'react';
import {
  Button,
  Text,
  View,
  TextInput,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

// Definerer en funktionel komponent kaldet LoginForm
function LoginForm() {

// Opretter en instans af Firebase authentication
    const auth = getAuth();

// Initialisering af state-variabler, som bruges i LoginForm
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState(null);

// Funktion til at håndtere indsendelse af login-formularen
    const handleSubmit = async () => {
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
// Brugeren er logget ind 
            const user = userCredential.user;
// ...
        })
        .catch((error) => {
// Håndterer fejl under login
            const errorCode = error.code;
            const errorMessage = error.message;
            setErrorMessage(errorMessage);
        });
    }

    // Definerer en knap til at udføre login via handleSubmit ved at bruge onPress.
    const renderButton = () => {
        return <Button onPress={() => handleSubmit()} title="Log ind" />;
    };

    // Render User-Interface-komponenterne
    return (
        <View>
            <Text style={styles.header}>Log ind</Text>
            <TextInput
                placeholder="Email"
                value={email}
                onChangeText={(email) => setEmail(email)}
                style={styles.inputField}
            />
            <TextInput
                placeholder="Kodeord"
                value={password}
                onChangeText={(password) => setPassword(password) }
                secureTextEntry
                style={styles.inputField}
            />
            {errorMessage && (
                // Vis fejlmeddelelse, hvis der er en fejl
                <Text style={styles.error}>Fejl: {errorMessage}</Text>
            )}
            {renderButton()}
        </View>
    );
}

// Lokal styling med login-formularens komponenter
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

// Eksport af LoginForm, så den kan importeres og bruges i andre komponenter
export default LoginForm;
