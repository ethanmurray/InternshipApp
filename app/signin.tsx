import { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { Link, router } from 'expo-router';
import { useAuth } from '../contexts/AuthContext';

export default function SignInPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { signIn } = useAuth();

  const handleSignIn = async () => {
    if (!email || !password) {
      setErrorMessage('Please fill in all fields');
      return;
    }

    setLoading(true);
    setErrorMessage('');

    console.log('Attempting sign in with:', { email, password: '***' });
    const { error } = await signIn(email, password);

    console.log('Sign in result:', { error: error?.message });
    setLoading(false);

    if (error) {
      // Provide user-friendly error messages
      let friendlyMessage = 'Sign in failed. Please try again.';

      if (error.message.includes('Invalid login credentials')) {
        friendlyMessage = 'Incorrect email or password. Please check your credentials and try again.';
      } else if (error.message.includes('Email not confirmed')) {
        friendlyMessage = 'Please check your email and click the confirmation link before signing in.';
      } else if (error.message.includes('Too many requests')) {
        friendlyMessage = 'Too many sign-in attempts. Please wait a few minutes and try again.';
      } else if (error.message.includes('signup disabled')) {
        friendlyMessage = 'New account creation is currently disabled.';
      }

      setErrorMessage(friendlyMessage);

      // Also show alert as backup
      Alert.alert('Sign In Failed', friendlyMessage);
    } else {
      setErrorMessage('');
      router.replace('/');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign In</Text>

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
        title={loading ? "Signing In..." : "Sign In"}
        onPress={handleSignIn}
        disabled={loading}
      />

      <View style={styles.linkContainer}>
        <Text>Don't have an account? </Text>
        <Link href="/signup" style={styles.link}>
          <Text style={styles.linkText}>Sign Up</Text>
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