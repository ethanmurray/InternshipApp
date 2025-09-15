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
      // Simple test to check if Supabase client is configured
      const { data, error } = await supabase.from('_test_table_that_does_not_exist').select('*').limit(1);

      if (error) {
        // If we get a "relation does not exist" error, it means connection is working
        if (error.message.includes('relation') && error.message.includes('does not exist')) {
          setStatus('success');
          setMessage('✅ Supabase connection successful!');
        } else {
          setStatus('error');
          setMessage(`❌ Connection error: ${error.message}`);
        }
      } else {
        setStatus('success');
        setMessage('✅ Supabase connection successful!');
      }
    } catch (err) {
      setStatus('error');
      setMessage(`❌ Connection failed: ${err instanceof Error ? err.message : 'Unknown error'}`);
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