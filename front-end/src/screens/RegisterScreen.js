import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { register } from '../../api/api';

const RegisterScreen = ({ navigation }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');

    const handleRegister = async () => {
        const userData = {
            name: name,
            email: email,
            password: password,
            password_confirmation: passwordConfirmation,
        };

        // Check if the password is at least 6 characters long
        if (password.length < 6) {
            alert('Password must be at least 6 characters long');
            return;
        }

        console.log('User data being sent to API:', userData);  // Log the data to see it

        try {
            const response = await register(userData);
            console.log('Registration successful:', response);
            navigation.replace('Login');

        } catch (error) {
            console.log('Error during registration:', error.response?.data);
            // Optionally, show the error message to the user
            alert(error.response?.data?.message || 'Registration failed');
        }
    };



    return (
        <View>
            <Text>Name:</Text>
            <TextInput value={name} onChangeText={setName} autoCapitalize="words" />
            <Text>Email:</Text>
            <TextInput value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
            <Text>Password:</Text>
            <TextInput value={password} onChangeText={setPassword} secureTextEntry />
            <Text>Confirm Password:</Text>
            <TextInput value={passwordConfirmation} onChangeText={setPasswordConfirmation} secureTextEntry />
            <Button title="Register" onPress={handleRegister} />
        </View>
    );
};

export default RegisterScreen;
