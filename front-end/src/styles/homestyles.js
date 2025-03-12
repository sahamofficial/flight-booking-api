import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
    },
    tripTypeContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 20,
    },
    tripTypeButton: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#28a745',
    },
    selectedTripType: {
        backgroundColor: '#28a745',
    },
    tripTypeText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#28a745',
    },
    selectedText: {
        color: '#fff',
    },
    inputRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    picker: {
        flex: 1,
        height: 50,
        color: '#000',
    },
    dateInput: {
        flex: 1,
        height: 50,
        borderColor: '#28a745',
        borderWidth: 1,
        borderRadius: 5,
        paddingLeft: 10,
        marginVertical: 10,
    },
    removeButton: {
        marginLeft: 10,
        backgroundColor: '#dc3545',
        borderRadius: 5,
        padding: 10,
    },
    removeButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    addButton: {
        backgroundColor: '#28a745',
        borderRadius: 5,
        padding: 10,
        alignItems: 'center',
        marginVertical: 10,
    },
    addButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    selectRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 20,
    },
    searchButton: {
        backgroundColor: '#28a745',
        borderRadius: 5,
        padding: 15,
        alignItems: 'center',
        marginVertical: 20,
    },
    searchButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    resultsContainer: {
        marginTop: 30,
    },
    resultsTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    flightItem: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    flightText: {
        fontSize: 16,
        marginBottom: 5,
    },
    activityIndicator: {
        marginVertical: 20,
    },
});

export default styles;