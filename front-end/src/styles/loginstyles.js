import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window'); // Get screen width

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ededed',
        padding: 20,
    },

    title: {
        fontSize: width > 1024 ? 28 : 22, // Bigger text for larger screens
        fontWeight: 'bold',
        color: 'rgb(31, 31, 31)',
        marginBottom: 20,
    },

    input: {
        width: width > 1024 ? '25%' : '90%', // 25% width for desktops, 90% for phones
        height: 50,
        borderWidth: 1,
        borderColor: 'rgba(100, 90, 90, 0.3)',
        borderRadius: 10,
        paddingHorizontal: 15,
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        color: '#000000',
        marginBottom: 15,
        fontSize: 16,
    },

    button: {
        width: width > 1024 ? '25%' : '90%', // 25% for desktops, 90% for phones
        backgroundColor: '#0a4bfa',
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 10,
    },

    buttonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: 'bold',
    },

    registerButton: {
        marginTop: 10,
        backgroundColor: '#0b4cab',
    },
});

export default styles;
