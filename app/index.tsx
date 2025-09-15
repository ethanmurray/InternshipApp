import { Text, View, ScrollView } from "react-native";
import SupabaseTest from "../components/SupabaseTest";

export default function Index() {
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          padding: 20,
        }}
      >
        <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>
          InternshipApp
        </Text>
        <Text style={{ marginBottom: 30, textAlign: 'center' }}>
          Welcome to your Expo + Supabase app deployed on Vercel!
        </Text>

        <SupabaseTest />
      </View>
    </ScrollView>
  );
}
