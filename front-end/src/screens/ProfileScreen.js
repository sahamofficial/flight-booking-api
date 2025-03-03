import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ProfileScreen = ({ route }) => {
    const { response } = route.params || {};  // Retrieve the response object passed from LoginScreen

    // Default state
    const [user, setUser] = useState(null);

    useEffect(() => {
        if (response) {
            setUser(response);  // Set the user data from the response
        }
    }, [response]);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Profile</Text>

            {/* Check if user data exists and display it */}
            {user ? (
                <>
                    <Text style={styles.text}>Name: {user.name}</Text>
                    <Text style={styles.text}>Email: {user.email}</Text>
                    {/* Display other data from response if needed */}
                </>
            ) : (
                <Text style={styles.text}>No user data available</Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f9f9f9',
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#333',
    },
    text: {
        fontSize: 18,
        marginVertical: 10,
        color: '#333',
    },
});

export default ProfileScreen;
