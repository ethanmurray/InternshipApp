import { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { Link, router } from 'expo-router';
import { useAuth } from '../contexts/AuthContext';

export default function SignUpPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { signUp } = useAuth();

  const handleSignUp = async () => {
    if (!email || !password) {
      setErrorMessage('Please fill in all fields');
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMessage('Please enter a valid email address');
      return;
    }

    // Basic password validation
    if (password.length < 6) {
      setErrorMessage('Password must be at least 6 characters long');
      return;
    }

    setLoading(true);
    setErrorMessage('');

    console.log('Attempting sign up with:', { email, password: '***' });
    const { error } = await signUp(email, password);

    console.log('Sign up result:', { error });
    console.log('Error type:', typeof error);
    console.log('Error truthy?', !!error);
    setLoading(false);

    if (error) {
      // Provide user-friendly error messages
      let friendlyMessage = 'Account creation failed. Please try again.';

      if (error.message.includes('email') && error.message.includes('invalid')) {
        friendlyMessage = 'Please enter a valid email address';
      } else if (error.message.includes('password') && error.message.includes('weak')) {
        friendlyMessage = 'Password is too weak. Please choose a stronger password';
      } else if (error.message.includes('User already registered')) {
        friendlyMessage = 'An account with this email already exists. Try signing in instead.';
      } else if (error.message.includes('signup disabled')) {
        friendlyMessage = 'New account creation is currently disabled.';
      } else if (error.message.includes('rate limit')) {
        friendlyMessage = 'Too many attempts. Please wait a few minutes and try again.';
      }

      setErrorMessage(friendlyMessage);
      Alert.alert('Sign Up Failed', friendlyMessage);
    } else {
      console.log('Success branch reached!');
      setErrorMessage('');
      console.log('About to show success alert');

      // Use browser alert for web, React Native Alert for mobile
      if (typeof window !== 'undefined') {
        // Web browser
        window.alert('Account created successfully!');
        router.replace('/');
      } else {
        // Mobile
        Alert.alert('Success', 'Account created successfully!', [
          { text: 'OK', onPress: () => router.replace('/') }
        ]);
      }
      console.log('Success alert should be displayed');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Account</Text>

      {errorMessage && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{errorMessage}</Text>
        </View>
      )}

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        autoComplete="email"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        autoComplete="password"
      />

      <Button
        title={loading ? "Creating Account..." : "Sign Up"}
        onPress={handleSignUp}
        disabled={loading}
      />

      <View style={styles.linkContainer}>
        <Text>Already have an account? </Text>
        <Link href="/signin" style={styles.link}>
          <Text style={styles.linkText}>Sign In</Text>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 15,
    marginBottom: 15,
    borderRadius: 8,
    fontSize: 16,
  },
  linkContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  link: {
    marginLeft: 5,
  },
  linkText: {
    color: '#007AFF',
    fontWeight: '600',
  },
  errorContainer: {
    backgroundColor: '#ffebee',
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
    borderLeftWidth: 4,
    borderLeftColor: '#f44336',
  },
  errorText: {
    color: '#c62828',
    fontSize: 14,
    textAlign: 'center',
  },
});