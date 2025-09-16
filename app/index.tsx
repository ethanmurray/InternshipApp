import { useState, useEffect } from "react";
import { Text, View, ScrollView, Button, StyleSheet, Alert, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import { useAuth } from "../contexts/AuthContext";
import { getJobs, Job } from "../lib/supabase";

export default function Index() {
  const { user, loading, signOut } = useAuth();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [jobsLoading, setJobsLoading] = useState(true);

  useEffect(() => {
    loadJobs();
  }, []);

  const loadJobs = async () => {
    setJobsLoading(true);
    const { data, error } = await getJobs();

    if (error) {
      Alert.alert('Error', 'Failed to load jobs');
      console.error(error);
    } else {
      setJobs(data || []);
    }
    setJobsLoading(false);
  };

  const handleContactPress = (email: string | null, phone: string | null) => {
    if (email) {
      Alert.alert(
        'Contact Employer',
        `Email: ${email}${phone ? `\nPhone: ${phone}` : ''}`,
        [{ text: 'OK' }]
      );
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.title}>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Internship Board</Text>

        {user ? (
          <View style={styles.headerActions}>
            <Button
              title="Post Job"
              onPress={() => router.push('/post-job')}
            />
            <View style={styles.signOutContainer}>
              <Button
                title="Sign Out"
                onPress={signOut}
              />
            </View>
          </View>
        ) : (
          <View style={styles.headerActions}>
            <Button
              title="Sign In"
              onPress={() => router.push('/signin')}
            />
            <Button
              title="Sign Up"
              onPress={() => router.push('/signup')}
            />
          </View>
        )}
      </View>

      {/* Jobs List */}
      <View style={styles.jobsContainer}>
        <Text style={styles.sectionTitle}>Available Internships</Text>

        {jobsLoading ? (
          <Text style={styles.loadingText}>Loading jobs...</Text>
        ) : jobs.length === 0 ? (
          <Text style={styles.emptyText}>No jobs available yet.</Text>
        ) : (
          jobs.map((job) => (
            <View key={job.id} style={styles.jobCard}>
              <Text style={styles.jobTitle}>{job.title}</Text>
              <Text style={styles.jobDescription} numberOfLines={3}>
                {job.description}
              </Text>

              <View style={styles.jobActions}>
                <TouchableOpacity
                  style={styles.contactButton}
                  onPress={() => handleContactPress(job.contact_email, job.contact_phone)}
                >
                  <Text style={styles.contactButtonText}>Contact</Text>
                </TouchableOpacity>
                <Text style={styles.jobDate}>
                  {job.created_at ? new Date(job.created_at).toLocaleDateString() : ''}
                </Text>
              </View>
            </View>
          ))
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    backgroundColor: '#fff',
    padding: 20,
    paddingTop: 60,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
    color: '#333',
  },
  headerActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  signOutContainer: {
    marginLeft: 'auto',
  },
  jobsContainer: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 15,
    color: '#333',
  },
  loadingText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#666',
    marginTop: 20,
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#666',
    marginTop: 20,
  },
  jobCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  jobTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
  jobDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 12,
  },
  jobActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  contactButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  contactButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
  jobDate: {
    fontSize: 12,
    color: '#999',
  },
});
