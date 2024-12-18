import React, { useState,useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import welcomeImage from '../assets/images/welcome.png';
import * as Google from 'expo-auth-session/providers/google';
import { Ionicons } from '@expo/vector-icons';

const WelcomePage: React.FC = () => {
  const router = useRouter();
  const [loginBg, setLoginBg] = useState<string>('black');
  const [signupBg, setSignupBg] = useState<string>('black');

  const [error, setError] = useState<string | null>('');
  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId: 'neural-cortex-444613-n3',
  });



  useEffect(() => {
    if (response?.type === 'success') {
      const { authentication } = response;
      console.log('Google Authentication Successful: ', authentication);
    }
  }, [response]);


  const toggleLoginBg = () => {
    setLoginBg((prev) => (prev === 'black' ? 'white' : 'black'));
    router.push('/login');
  };

  const toggleSignupBg = () => {
    setSignupBg((prev) => (prev === 'black' ? 'white' : 'black'));
    router.push('/signup');
  };

  return (
    <View style={styles.container}>
      <Image source={welcomeImage} style={styles.welcomeImage} />

      <Text style={styles.title}>Platter</Text>
      <Text style={styles.subtitle}>
        Where food and reels come together—share, savor, and explore flavors from around the world.
      </Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: loginBg }]}
          onPress={toggleLoginBg}
        >
          <Text style={[styles.buttonText, { color: loginBg === 'black' ? 'white' : 'black' }]}>
            Log In
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: signupBg }]}
          onPress={toggleSignupBg}
        >
          <Text style={[styles.buttonText, { color: signupBg === 'black' ? 'white' : 'black' }]}>
            Sign Up
          </Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.text}>Or login with:</Text>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    resizeMode: 'contain',
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 50,
    color: '#333',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 20,
    color: '#777',
    textAlign: 'center',
    paddingHorizontal: 10,
  },
  welcomeImage: {
    width: '80%',
    height: 200,
    backgroundColor: 'black', // Black for the theme
    borderTopLeftRadius: 200, // Apply curve to the top-left
    borderTopRightRadius: 200, // Apply curve to the top-right
    overflow: 'hidden', // Ensures content stays inside the curved shape
    alignSelf: 'center', // Centers the element
    marginBottom: 25,
    filter: 'grayscale(100%)', // Applies a black-and-white filter
  },
  text: {
    fontSize: 20,
    color: '#555',
    marginVertical: 5,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginTop: 50,
    paddingVertical: 20,
  },
  button: {
    flex: 1,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginHorizontal: 10,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
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
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default WelcomePage;
