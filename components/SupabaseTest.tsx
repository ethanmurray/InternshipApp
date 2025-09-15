import { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { supabase } from '../lib/supabase';

export default function SupabaseTest() {
  const [status, setStatus] = useState<'idle' | 'testing' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const testConnection = async () => {
    setStatus('testing');
    setMessage('Testing Supabase connection...');

    try {
      // Test 1: Check if we can connect to Supabase
      const { data, error } = await supabase.from('_test_table_that_does_not_exist').select('test_message').limit(1);

      if (error) {
        // Check for specific error types
        if (error.message.includes('relation') && error.message.includes('does not exist')) {
          setStatus('error');
          setMessage('❌ Test table not found. Please run the migration first.');
        } else if (error.message.includes('JWT') || error.message.includes('Invalid API key')) {
          setStatus('error');
          setMessage('❌ Invalid API credentials. Check your environment variables.');
        } else if (error.message.includes('Missing Supabase environment variables')) {
          setStatus('error');
          setMessage('❌ Missing environment variables. Configure EXPO_PUBLIC_SUPABASE_URL and EXPO_PUBLIC_SUPABASE_ANON_KEY.');
        } else {
          setStatus('error');
          setMessage(`❌ Connection error: ${error.message}`);
        }
      } else if (data && data.length > 0) {
        setStatus('success');
        setMessage(`✅ Supabase connection successful! Message: "${data[0].test_message}"`);
      } else {
        setStatus('success');
        setMessage('✅ Supabase connection successful! (No test data found)');
      }
    } catch (err) {
      if (err instanceof Error && err.message.includes('Missing Supabase environment variables')) {
        setStatus('error');
        setMessage('❌ Missing environment variables. Configure EXPO_PUBLIC_SUPABASE_URL and EXPO_PUBLIC_SUPABASE_ANON_KEY in Vercel.');
      } else {
        setStatus('error');
        setMessage(`❌ Connection failed: ${err instanceof Error ? err.message : 'Unknown error'}`);
      }
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case 'success': return '#4CAF50';
      case 'error': return '#F44336';
      case 'testing': return '#FF9800';
      default: return '#2196F3';
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Supabase Connectivity Test</Text>

      <View style={[styles.statusContainer, { backgroundColor: getStatusColor() }]}>
        <Text style={styles.statusText}>
          {status === 'idle' && 'Ready to test'}
          {status === 'testing' && 'Testing...'}
          {status === 'success' && 'Connected'}
          {status === 'error' && 'Error'}
        </Text>
      </View>

      <Text style={styles.message}>{message}</Text>

      <Button
        title="Test Supabase Connection"
        onPress={testConnection}
        disabled={status === 'testing'}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    margin: 20,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  statusContainer: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    marginBottom: 15,
  },
  statusText: {
    color: 'white',
    fontWeight: 'bold',
  },
  message: {
    textAlign: 'center',
    marginBottom: 15,
    fontSize: 14,
  },
});