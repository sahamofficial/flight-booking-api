import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button } from 'react-native';
import { getFlights } from '../../api/api';

const FlightListScreen = ({ navigation }) => {
    const [flights, setFlights] = useState([]);

    useEffect(() => {
        const fetchFlights = async () => {
            try {
                const response = await getFlights();
                setFlights(response.data);
            } catch (error) {
                console.log('Error fetching flights', error);
            }
        };

        fetchFlights();
    }, []);

    return (
        <View>
            <FlatList
                data={flights}
                keyExtractor={(item) => item.flight_id.toString()}
                renderItem={({ item }) => (
                    <View>
                        <Text>{item.flight_number} - {item.price_without_meal}$</Text>
                        <Button title="Book Now" onPress={() => navigation.navigate('Booking', { flight: item })} />
                    </View>
                )}
            />
        </View>
    );
};

export default FlightListScreen;
