import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { login } from '../../api/api';
import styles from '../styles/loginstyles';

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        const userData = { email, password };

        try {
            const response = await login(userData);
            console.log('Login successful:', response);
            navigation.replace('Home', { response });
        } catch (error) {
            console.log('Error during login:', error.response?.data);
            alert(error.response?.data?.message || 'Login failed');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login</Text>

            {/* <Text style={styles.label}>Email:</Text> */}
            <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                placeholder="Enter your email"
                keyboardType="email-address"
            />

            {/* <Text style={styles.label}>Password:</Text> */}
            <TextInput
                style={styles.input}
                value={password}
                onChangeText={setPassword}
                placeholder="Enter your password"
                secureTextEntry
            />

            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.button, styles.registerButton]} onPress={() => navigation.navigate('Register')}>
                <Text style={styles.buttonText}>Register</Text>
            </TouchableOpacity>
        </View>
    );
};

export default LoginScreen;
