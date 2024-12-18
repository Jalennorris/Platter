import {View, Text, StyleSheet, Button, TouchableOpacity, Image, Dimensions} from 'react-native';
import React, {useState, useEffect} from 'react';
import { TextInput } from 'react-native-gesture-handler';
import loginImage from '../assets/images/login.svg';
import * as Google from 'expo-auth-session/providers/google';
import {useRouter} from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

type Credentails = {
  username: string,
  password: string,
};

const { width, height } = Dimensions.get('window');

const Login: React.FC = () => {
  const router = useRouter();
  const [credentials, setCredentails] = useState<Credentails>({
    username: '',
    password: '',
  });
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

  const handleLogin = () => {
    if (!credentials.username || !credentials.password) {
      setError('Please fill in all fields');
      return;
    }

    if (credentials.username === 'admin' && credentials.password === '123') {
      router.push('/');
    } else {
      setError('Password or username is incorrect');
    }
  };

  const handleChange = (name: keyof Credentails, value: string) => {
    setCredentails({ ...credentials, [name]: value });
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
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Log In</Text>
        </TouchableOpacity>
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
    top: height * 0.02, // 5% from the top
    left: width * 0.05, // 5% from the left
  },
  loginImage: {
    resizeMode: 'contain',
    width: width * 0.8, // 80% of screen width
    height: height * 0.28, // 30% of screen height
    marginBottom: 20,
  },
  title: {
    top: 100,
    fontSize: width * 0.08, // Scales font size based on width
    alignSelf: 'flex-start',
    fontWeight: 'bold',
    marginBottom: 30,
  },
  inputContainer: {
    width: '90%',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 20,
    backgroundColor: 'white',
  },
  button: {
    backgroundColor: 'black',
    paddingVertical: height * 0.015, // Dynamic padding
    paddingHorizontal: width * 0.05,
    borderRadius: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: width * 0.05,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  text: {
    color: 'gray',
    marginTop: 20,
    paddingVertical: 10,
    cursor: 'pointer',
    fontSize: width * 0.04, // Scales for readability
  },
  linkText: {
    color: 'blue',
    fontSize: width * 0.04,
    cursor: 'pointer',
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
    fontSize: width * 0.04,
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
    fontSize: width * 0.04,
  },
});

export default Login;
