import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator, ScrollView } from "react-native";
import axios from "axios";
import { Picker } from "@react-native-picker/picker";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "../styles/homestyles";

const HomeScreen = () => {
    const [tripType, setTripType] = useState("round-trip");
    const [multiCityFlights, setMultiCityFlights] = useState([{ departure: "", destination: "", date: new Date() }]);
    const [passengers, setPassengers] = useState(1);
    const [classType, setClassType] = useState("Economy");
    const [paymentType, setPaymentType] = useState("Credit Card");
    const [loading, setLoading] = useState(false);
    const [locations, setLocations] = useState({ departures: [], destinations: [] });
    const [flights, setFlights] = useState([]);

    useEffect(() => {
        axios.get("http://127.0.0.1:8000/api/flights/locations")
            .then(response => {
                setLocations({
                    departures: response.data.departures,
                    destinations: response.data.destinations
                });
            })
            .catch(error => console.error("Error fetching locations:", error));
    }, []);

    const addFlight = () => {
        setMultiCityFlights([...multiCityFlights, { departure: "", destination: "", date: new Date() }]);
    };

    const removeFlight = (index) => {
        const updatedFlights = [...multiCityFlights];
        updatedFlights.splice(index, 1);
        setMultiCityFlights(updatedFlights);
    };

    const handleFlightChange = (index, field, value) => {
        const updatedFlights = [...multiCityFlights];
        updatedFlights[index][field] = value;
        setMultiCityFlights(updatedFlights);
    };

    const handleSearch = () => {
        setLoading(true);
    
        let queryParams = "";
        
        if (tripType === "multi-city") {
            multiCityFlights.forEach((flight, index) => {
                if (!flight.departure || !flight.destination) {
                    alert("Please select a departure and destination for all flights.");
                    setLoading(false);
                    return;
                }
                queryParams += `departure${index}=${flight.departure}&destination${index}=${flight.destination}&date${index}=${flight.date.toISOString().split('T')[0]}&`;
            });
        } else {
            if (!multiCityFlights[0].departure || !multiCityFlights[0].destination) {
                alert("Please select a departure and destination.");
                setLoading(false);
                return;
            }
    
            queryParams = `departure0=${multiCityFlights[0].departure}&destination0=${multiCityFlights[0].destination}&date0=${multiCityFlights[0].date.toISOString().split('T')[0]}`;
    
            if (tripType === "round-trip" && multiCityFlights[1]?.date) {
                queryParams += `&return_date=${multiCityFlights[1].date.toISOString().split('T')[0]}`;
            }
        }
    
        console.log("Searching flights with params:", queryParams);
    
        axios.get(`http://127.0.0.1:8000/api/flights/search?${queryParams}`)
            .then(response => {
                console.log("Flights found:", response.data);
                setFlights(response.data);
            })
            .catch(error => console.error("Error fetching flights:", error))
            .finally(() => setLoading(false));
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.tripTypeContainer}>
                {["One-Way", "Round-Trip", "Multi-City"].map(type => (
                    <TouchableOpacity key={type} onPress={() => setTripType(type)}
                        style={[styles.tripTypeButton, tripType === type && styles.selectedTripType]}>
                        <Text style={[styles.tripTypeText, tripType === type && styles.selectedText]}>
                            {type.replace("-", " ")}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            {tripType === "Multi-City" ? (
                <>
                    {multiCityFlights.map((flight, index) => (
                        <View key={index} style={styles.inputRow}>
                            <Picker selectedValue={flight.departure} onValueChange={(value) => handleFlightChange(index, "departure", value)} style={styles.picker}>
                                {locations.departures.map(departure => (
                                    <Picker.Item key={departure} label={departure} value={departure} />
                                ))}
                            </Picker>

                            <Picker selectedValue={flight.destination} onValueChange={(value) => handleFlightChange(index, "destination", value)} style={styles.picker}>
                                {locations.destinations.map(destination => (
                                    <Picker.Item key={destination} label={destination} value={destination} />
                                ))}
                            </Picker>

                            <DatePicker
                                selected={flight.date}
                                onChange={(date) => handleFlightChange(index, "date", date)}
                                dateFormat="yyyy-MM-dd"
                                className="date-input"
                            />

                            {index > 0 && (
                                <TouchableOpacity onPress={() => removeFlight(index)} style={styles.removeButton}>
                                    <Text style={styles.removeButtonText}>✖</Text>
                                </TouchableOpacity>
                            )}
                        </View>
                    ))}
                    <TouchableOpacity style={styles.addButton} onPress={addFlight}>
                        <Text style={styles.addButtonText}>+ Add flight</Text>
                    </TouchableOpacity>
                </>
            ) : (
                <View style={styles.inputRow}>
                    <Picker selectedValue={multiCityFlights[0].departure} onValueChange={(value) => handleFlightChange(0, "departure", value)} style={styles.picker}>
                        {locations.departures.map(departure => (
                            <Picker.Item key={departure} label={departure} value={departure} />
                        ))}
                    </Picker>

                    <Picker selectedValue={multiCityFlights[0].destination} onValueChange={(value) => handleFlightChange(0, "destination", value)} style={styles.picker}>
                        {locations.destinations.map(destination => (
                            <Picker.Item key={destination} label={destination} value={destination} />
                        ))}
                    </Picker>

                    <DatePicker selected={multiCityFlights[0].date} onChange={(date) => handleFlightChange(0, "date", date)} dateFormat="yyyy-MM-dd" className="date-input" />

                    {tripType === "Round-Trip" && (
                        <View style={styles.inputRow}>
                            <Picker selectedValue={multiCityFlights[1]?.departure} onValueChange={(value) => handleFlightChange(1, "departure", value)} style={styles.picker}>
                                {locations.departures.map(departure => (
                                    <Picker.Item key={departure} label={departure} value={departure} />
                                ))}
                            </Picker>

                            <Picker selectedValue={multiCityFlights[1]?.destination} onValueChange={(value) => handleFlightChange(1, "destination", value)} style={styles.picker}>
                                {locations.destinations.map(destination => (
                                    <Picker.Item key={destination} label={destination} value={destination} />
                                ))}
                            </Picker>

                            <DatePicker selected={multiCityFlights[1]?.date} onChange={(date) => handleFlightChange(1, "date", date)} dateFormat="yyyy-MM-dd" className="date-input" />
                        </View>
                    )}
                </View>
            )}

            <View style={styles.selectRow}>
                <Picker selectedValue={passengers} onValueChange={setPassengers} style={styles.picker}>
                    {[...Array(10)].map((_, i) => <Picker.Item key={i} label={`${i + 1} Adult`} value={i + 1} />)}
                </Picker>
                <Picker selectedValue={classType} onValueChange={setClassType} style={styles.picker}>
                    {['Economy', 'Business', 'First Class'].map(type => <Picker.Item key={type} label={type} value={type} />)}
                </Picker>
                <Picker selectedValue={paymentType} onValueChange={setPaymentType} style={styles.picker}>
                    {['Credit Card', 'Debit Card', 'PayPal', 'Crypto', 'Cash'].map(type => <Picker.Item key={type} label={type} value={type} />)}
                </Picker>
            </View>

            <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
                <Text style={styles.searchButtonText}>Search</Text>
            </TouchableOpacity>

            {loading && <ActivityIndicator size="large" color="#28a745" />}

            {/* Display search results */}
            {flights.length > 0 && (
                <View style={styles.resultsContainer}>
                    <Text style={styles.resultsTitle}>Search Results:</Text>
                    {flights.map((flight, index) => (
                        <View key={index} style={styles.flightItem}>
                            <Text style={styles.flightText}>Departure: {flight.departure}</Text>
                            <Text style={styles.flightText}>Destination: {flight.destination}</Text>
                            <Text style={styles.flightText}>Date: {flight.date}</Text>
                            <Text style={styles.flightText}>Price: ${flight.price}</Text>
                        </View>
                    ))}
                </View>
            )}
        </ScrollView>
    );
};

export default HomeScreen;