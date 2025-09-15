import { Text, View, ScrollView, Button, StyleSheet } from "react-native";
import { Link } from "expo-router";
import { useAuth } from "../contexts/AuthContext";
import SupabaseTest from "../components/SupabaseTest";
import EnvDebug from "../components/EnvDebug";

export default function Index() {
  const { user, loading, signOut } = useAuth();

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Loading...</Text>
      </View>
    );
  }

  if (!user) {
    // Not authenticated - show sign in/up options
    return (
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.container}>
          <Text style={styles.title}>InternshipApp</Text>
          <Text style={styles.subtitle}>
            Welcome! Please sign in or create an account to continue.
          </Text>

          <View style={styles.buttonContainer}>
            <Link href="/signin" asChild>
              <Button title="Sign In" />
            </Link>
          </View>

          <View style={styles.buttonContainer}>
            <Link href="/signup" asChild>
              <Button title="Create Account" />
            </Link>
          </View>

          <EnvDebug />
          <SupabaseTest />
        </View>
      </ScrollView>
    );
  }

  // Authenticated - show main app content
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.container}>
        <Text style={styles.title}>Welcome Back!</Text>
        <Text style={styles.subtitle}>
          You're signed in as: {user.email}
        </Text>

        <View style={styles.buttonContainer}>
          <Button title="Sign Out" onPress={signOut} />
        </View>

        <EnvDebug />
        <SupabaseTest />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  subtitle: {
    marginBottom: 30,
    textAlign: 'center',
    fontSize: 16,
    color: '#666',
  },
  buttonContainer: {
    marginBottom: 15,
    width: '100%',
    maxWidth: 300,
  },
});
