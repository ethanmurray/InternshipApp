import { View, Text, StyleSheet } from 'react-native';

export default function EnvDebug() {
  const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Environment Debug</Text>
      <Text style={styles.env}>URL: {supabaseUrl || 'NOT SET'}</Text>
      <Text style={styles.env}>Key: {supabaseKey ? `${supabaseKey.substring(0, 20)}...` : 'NOT SET'}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    margin: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  env: {
    fontSize: 12,
    fontFamily: 'monospace',
  },
});