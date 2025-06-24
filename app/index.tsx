import { ActivityIndicator, View, Text } from 'react-native';
import { Redirect } from 'expo-router';
import { useSession } from '../context/SessionProvider';

export default function Page() {
  const sessionContext = useSession();
  
  // Show loading while session context is not available
  if (!sessionContext) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: 18, marginBottom: 10 }}>Initializing...</Text>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  
  // Show loading while session is being determined
  if (sessionContext.loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: 18, marginBottom: 10 }}>Loading Session...</Text>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  // Redirect based on session state
  if (sessionContext.session) {
    return <Redirect href="/(tabs)/home" />;
  } else {
    return <Redirect href="/auth" />;
  }
}
