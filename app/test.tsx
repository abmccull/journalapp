import { View, Text, StyleSheet } from 'react-native';

export default function TestScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎉 EXPO ROUTER IS WORKING! 🎉</Text>
      <Text style={styles.subtitle}>This proves the app directory is being detected</Text>
      <Text style={styles.note}>Navigate to /test to see this screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4CAF50',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    marginBottom: 10,
  },
  note: {
    fontSize: 14,
    color: '#E8F5E8',
    textAlign: 'center',
  },
});
