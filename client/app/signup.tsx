import React , { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image, ActivityIndicator } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import signUpImage from '../assets/images/signUp.svg';
import axios from 'axios';



type Credentials = {
    username: string;
    password: string;
    email: string;
    confirmPassword: string;

}





const SignUp: React.FC = () => {
    const [credentials, setCredentials] = useState<Credentials>({
        username: '',
        password: '',
        email: '',
        confirmPassword: '',
    });
    const [error, setError] = useState<string | null>('');
    const[loading, setLoading] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSignUp = async () => {
        if (!credentials.username || !credentials.password || !credentials.email || !credentials.confirmPassword) {
            setError('Please fill in all fields');
            return;
        }
        if (credentials.password !== credentials.confirmPassword) {
            setError('Passwords do not match');
            return;
        }
        try {
            const response = await axios.post("http://localhost:8080/api/users", {
                username: credentials.username,
                email: credentials.email,
                password: credentials.password,
            });
            console.log('Successfully signed up:', response.data);
            setLoading(false);
            // Handle success (e.g., save token, navigate to a new screen)
            router.push('/login')
        } catch (error) {
            console.error('Sign up failed:', error);
            setError('Sign up failed. Please try again.');
        }
    }

    
    

    const handleChange = (name: keyof Credentials, value: string) => {
        setCredentials({ ...credentials, [name]: value });
    };
    

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
                <TextInput placeholder="Email" style={styles.input} value={credentials.email} onChangeText={(text) => handleChange('email', text)} />
                <TextInput placeholder="Username" style={styles.input} value={credentials.username}  onChangeText={(text) => handleChange('username', text)}/>
                <TextInput placeholder="Password" secureTextEntry style={styles.input} value={credentials.password} onChangeText={(text) => handleChange('password', text)} />
                <TextInput placeholder="Confirm Password" secureTextEntry style={styles.input} value={credentials.confirmPassword}  onChangeText={(text) => handleChange('confirmPassword', text)} />
            </View>
            {error && <Text style={styles.errorText}>{error}</Text>}
            {loading  ? ( <ActivityIndicator size="large" color="#0000ff" />) :(
            <TouchableOpacity style={styles.button} onPress={handleSignUp} disabled={loading}>
                <Text style={styles.buttonText}>{loading ? 'Signing Up...' : 'Sign Up'}</Text>
            </TouchableOpacity>
            )}
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
        padding: 20,
    },
    backButton: {
        position: 'absolute',
        top: 20,
        left: 20,
    },
    title: {
        fontSize: 32,
        alignSelf: 'flex-end',
        fontWeight: 'bold',
        marginBottom: 40,
        textAlign: 'center',
    },
    inputContainer: {
        width: '100%',
        marginBottom: 16,
    },
    input: {
        height: 48,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 12,
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 10,
        backgroundColor: 'white',
    },
    button: {
        backgroundColor: 'black',
        paddingVertical: 12,
        paddingHorizontal: 50,
        borderRadius: 20,
        marginTop: 12,
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    text: {
        marginTop: 12,
        color: 'gray',
        fontSize: 16,
    },
    linkText: {
        color: 'black',
        fontWeight: 'bold',
    },
    signupImage: {
        resizeMode: 'contain',
        width: 250,
        height: 150,
        alignSelf: 'center',
        marginBottom: 24,
    },
    errorText: {
        color: 'red',
        marginTop: 10,
    },

});

export default SignUp;
