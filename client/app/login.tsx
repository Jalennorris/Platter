import {View, Text, StyleSheet, Button} from 'react-native'
import { TextInput } from 'react-native-gesture-handler'





const Login: React.FC  = () => {
    return( 
    <View style={styles.container}>
        <Text style={styles.title}>Platter</Text>
        <View style={styles.inputContainer}>
            <TextInput placeholder='Username'  style={styles.input} />
            <TextInput placeholder='Password'  secureTextEntry style={styles.input} />
            <Button title='Login In' styele={styles.button}> 
            </Button>
        </View>
        <Text style={styles.text}>Dont have an account?{' '}
             <Text style={{color: 'blue'}}>Sign Up</Text>
        </Text>
    </View>
    )

}

const styles = StyleSheet.create ({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    inputContainer: {
        width: '100%',
        marginBottom: 20,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    button: {
        backgroundColor: 'blue',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    text: {
        marginTop: 20,
        cursor: 'pointer'
    }
        
    
})


export default Login