// App.js
import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  Button,
  Alert,
  StyleSheet,
} from 'react-native';
import ReactNativeBiometrics, {BiometryTypes} from 'react-native-biometrics';

const rnBiometrics = new ReactNativeBiometrics();

const App = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    handleBiometricLogin();
  }, []);

  const handleLogin = () => {
    if (!username || !password) {
      Alert.alert('Error', 'Please enter valid username or password');
      return;
    }
    Alert.alert('Login', 'Login with username and password');
  };

  const handleBiometricLogin = async () => {
    try {
      const {biometryType} = await rnBiometrics.isSensorAvailable();
      if (biometryType === BiometryTypes.Biometrics) {
        const {success} = await rnBiometrics.simplePrompt({
          promptMessage: 'Confirm fingerprint or face',
        });

        if (success) {
          Alert.alert('Biometric Login', 'Login with biometrics successful');
        } else {
          Alert.alert('Biometric Login', 'Biometric authentication failed');
        }
      } else {
        Alert.alert(
          'Biometric Login',
          'Biometric authentication not available',
        );
      }
    } catch (error) {
      console.error(error);
      Alert.alert(
        'Biometric Login',
        'An error occurred during biometric authentication',
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <Text>Username</Text>
        <TextInput
          style={styles.input}
          value={username}
          onChangeText={setUsername}
          placeholder="Enter username"
        />
      </View>
      <View style={styles.inputContainer}>
        <Text>Password</Text>
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          placeholder="Enter password"
          secureTextEntry
        />
      </View>
      <Button title="Login" onPress={handleLogin} />
      <View style={styles.separator} />
      {/* <Button title="Login with Biometrics" onPress={handleBiometricLogin} /> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  inputContainer: {
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    borderRadius: 4,
  },
  separator: {
    height: 16,
  },
});

export default App;
