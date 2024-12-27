import { View, Text, StyleSheet, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import React, { useState, useEffect } from 'react';
import { TextInput } from 'react-native-gesture-handler';
import loginImage from '../assets/images/login.svg';
import * as Google from 'expo-auth-session/providers/google';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';

type Credentials = {
  username: string;
  password: string;
};

const Login: React.FC = () => {
  const router = useRouter();
  const [credentials, setCredentials] = useState<Credentials>({
    username: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>('');
  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId: 'neural-cortex-444613-n3', // Replace with your actual client ID
  });

  useEffect(() => {
    if (response?.type === 'success') {
      const { authentication } = response;
      console.log('Google Authentication Successful: ', authentication);
      // Handle successful login with Google
      // Example: redirect to a dashboard or save the token
    }
  }, [response]);

  const handleLogin = async () => {
    if (!credentials.username || !credentials.password) {
      setError('Please fill in all fields');
      return;
    }

    setLoading(true); // Start the loading state

    try {
      const response = await axios.post('http://localhost:8080/api/users/login', credentials);
      console.log('Successfully logged in:', response.data);
      // Handle success (e.g., save token, navigate to a new screen)
      setLoading(false);
      router.push('/')
    } catch (error) {
      console.error('Login failed:', error);
      setError('Login failed. Please try again.');
      setLoading(false); // Stop the loading state
    }
  };

  const handleChange = (name: keyof Credentials, value: string) => {
    setCredentials({ ...credentials, [name]: value });
  };

  return (
    <View style={styles.container}>
      <Ionicons
        name="arrow-back"
        size={37}
        color="black"
        onPress={() => router.push('/welcome')}
        style={styles.backButton}
      />
      <Text style={styles.title}>Hey,{"\n"}Welcome{"\n"}Back.</Text>
      <Image source={loginImage} style={styles.loginImage} />
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Username"
          style={styles.input}
          value={credentials.username}
          onChangeText={(text) => handleChange('username', text)}
        />
        <TextInput
          placeholder="Password"
          secureTextEntry
          style={styles.input}
          value={credentials.password}
          onChangeText={(text) => handleChange('password', text)}
        />
        {loading ? (
          <ActivityIndicator size="large" color="blue" />
        ) : (
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Log In</Text>
          </TouchableOpacity>
        )}
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}

      <Text style={styles.text}> or continue with </Text>
      <TouchableOpacity
        style={styles.googleButtonContent}
        onPress={() => promptAsync()}
        disabled={!request}
      >
        <View style={styles.googleIconContainer}>
          <Ionicons name="logo-google" size={24} color="#4285F4" />
          <Ionicons name="logo-google" size={18} color="#EA4335" />
          <Ionicons name="logo-google" size={12} color="#FBBC05" />
          <Ionicons name="logo-google" size={6} color="#34A853" />
        </View>
        <Text style={styles.googleButtonText}>Login with Google</Text>
      </TouchableOpacity>
      <Text style={styles.text}>
        Don't have an account?{' '}
        <Text style={styles.linkText} onPress={() => router.push('/signup')}>
          Sign Up
        </Text>
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
    top: 50, // Fixed top position
    left: 20, // Fixed left position
  },
  loginImage: {
    resizeMode: 'contain',
    width: 250, // Set a fixed width for the image
    height: 150, // Set a fixed height for the image
    marginBottom: 20,
  },
  title: {
    fontSize: 30, // Set a fixed font size for the title
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    marginBottom: 20,
  },
  inputContainer: {
    width: '90%',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 15,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 20,
    backgroundColor: 'white',
  },
  button: {
    backgroundColor: 'black',
    paddingVertical: 12, // Fixed padding
    paddingHorizontal: 40, // Fixed padding
    borderRadius: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 18, // Fixed font size for the button text
    textAlign: 'center',
    fontWeight: 'bold',
  },
  text: {
    color: 'gray',
    marginTop: 20,
    fontSize: 16, // Fixed font size
  },
  linkText: {
    color: 'blue',
    fontSize: 16, // Fixed font size
  },
  googleButtonContent: {
    backgroundColor: 'black',
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 20,
    marginTop: 10,
  },
  googleButtonText: {
    color: 'white',
    fontSize: 16, // Fixed font size
    textAlign: 'center',
    fontWeight: 'bold',
  },
  googleIconContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  errorText: {
    color: 'red',
    marginTop: 10,
    textAlign: 'center',
    fontSize: 16, // Fixed font size
  },
});

export default Login;
