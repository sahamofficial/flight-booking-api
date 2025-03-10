import React from 'react';
import { View, Text, Button } from 'react-native';

const HomeScreen = ({ navigation }) => {
    return (
        <View>
            <Text>Welcome to Jet-Air Travel</Text>
            <Button title="Search Flights" onPress={() => navigation.navigate('FlightList')} />
            <Button title="My Bookings" onPress={() => navigation.navigate('Profile')} />
        </View>
    );
};

export default HomeScreen;
