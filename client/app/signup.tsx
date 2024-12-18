import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image, Dimensions } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import signUpImage from '../assets/images/signUp.svg';

const { width, height } = Dimensions.get('window');

const SignUp: React.FC = () => {
    const router = useRouter();
    return (
        <View style={styles.container}>
            <Ionicons
                name="arrow-back"
                size={37}
                color="black"
                onPress={() => router.back()}
                style={styles.backButton}
            />
            <Text style={styles.title}>Let's get{"\n"}started!</Text>
            <Image source={signUpImage} style={styles.signupImage} />
            <View style={styles.inputContainer}>
                <TextInput placeholder="Email" style={styles.input} />
                <TextInput placeholder="Password" secureTextEntry style={styles.input} />
                <TextInput placeholder="Confirm Password" secureTextEntry style={styles.input} />
            </View>
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>
            <Text style={styles.text}>
                Already have an account?{' '}
                <Text onPress={() => router.push('/login')} style={styles.linkText}>Log In</Text>
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: width * 0.05, // Dynamically adjust padding based on screen width
    },
    backButton: {
        position: 'absolute',
        top: height * 0.05, // Adjust position based on screen height
        left: width * 0.05,
        cursor: 'pointer',
    },
    title: {
        fontSize: width * 0.08, // Font size scales with screen width
        alignSelf: 'flex-end',
        fontWeight: 'bold',
        marginBottom: height * 0.05,
        textAlign: 'center',
    },
    inputContainer: {
        width: '100%',
        marginBottom: height * 0.02, // Adjust margin based on screen height
    },
    input: {
        height: height * 0.06, // Adjust input height based on screen height
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: height * 0.015, // Adjust margin based on screen height
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 10,
        backgroundColor: 'white',
    },
    button: {
        backgroundColor: 'black',
        paddingVertical: height * 0.02, // Adjust padding based on screen height
        paddingHorizontal: width * 0.1, // Adjust padding based on screen width
        borderRadius: 20,
        marginTop: height * 0.02,
    },
    buttonText: {
        color: 'white',
        fontSize: width * 0.045, // Font size scales with screen width
        fontWeight: 'bold',
        textAlign: 'center',
    },
    text: {
        marginTop: height * 0.02,
        color: 'gray',
        fontSize: width * 0.035, // Font size scales with screen width
    },
    linkText: {
        color: 'black',
        fontWeight: 'bold',
    },
    signupImage: {
        resizeMode: 'contain',
        width: width * 0.5, // Adjust width based on screen width
        height: height * 0.25, // Adjust height based on screen height
        alignSelf: 'center',
        marginBottom: height * 0.03,
    },
});

export default SignUp;
