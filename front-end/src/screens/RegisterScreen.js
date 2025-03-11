import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { register } from '../../api/api';
import styles from '../styles/registerstyles'; // Import the new styles

const RegisterScreen = ({ navigation }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');

    const handleRegister = async () => {
        const userData = {
            name,
            email,
            password,
            password_confirmation: passwordConfirmation,
        };

        if (password.length < 6) {
            alert('Password must be at least 6 characters long');
            return;
        }

        try {
            const response = await register(userData);
            console.log('Registration successful:', response);
            navigation.replace('Profile', { response });
        } catch (error) {
            console.log('Error during registration:', error.response?.data);
            alert(error.response?.data?.message || 'Registration failed');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Register</Text>

            {/* <Text style={styles.label}>Name:</Text> */}
            <TextInput style={styles.input} value={name} onChangeText={setName} autoCapitalize="words" placeholder="Enter your name" />

            {/* <Text style={styles.label}>Email:</Text> */}
            <TextInput style={styles.input} value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" placeholder="Enter your email" />

            {/* <Text style={styles.label}>Password:</Text> */}
            <TextInput style={styles.input} value={password} onChangeText={setPassword} secureTextEntry placeholder="Enter your password" />

            {/* <Text style={styles.label}>Confirm Password:</Text> */}
            <TextInput style={styles.input} value={passwordConfirmation} onChangeText={setPasswordConfirmation} secureTextEntry placeholder="Confirm your password" />

            <TouchableOpacity style={styles.button} onPress={handleRegister}>
                <Text style={styles.buttonText}>Register</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.button, styles.loginButton]} onPress={() => navigation.navigate('Login')}>
                <Text style={styles.buttonText}>Back to Login</Text>
            </TouchableOpacity>
        </View>
    );
};

export default RegisterScreen;
