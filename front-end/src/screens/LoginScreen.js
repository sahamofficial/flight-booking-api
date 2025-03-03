import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { login } from '../../api/api';

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        const userData = {
            email: email,
            password: password,
        };

        try {
            // Make the login request
            const response = await login(userData);

            // Log the entire response for debugging
            console.log('Login successful:', response);

            // Navigate to Profile screen and pass the response object
            navigation.replace('Profile', { response });  // Pass the response object to Profile
        } catch (error) {
            console.log('Error during login:', error.response?.data);
            alert(error.response?.data?.message || 'Login failed');
        }
    };

    return (
        <View>
            <Text>Email:</Text>
            <TextInput value={email} onChangeText={setEmail} />
            <Text>Password:</Text>
            <TextInput value={password} onChangeText={setPassword} secureTextEntry />
            <Button title="Login" onPress={handleLogin} />
            <Button title="Register" onPress={() => navigation.navigate('Register')} />
        </View>
    );
};

export default LoginScreen;
