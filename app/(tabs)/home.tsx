import { View, Text, StyleSheet, FlatList, ActivityIndicator, Button, Image, Alert } from 'react-native';
import { useEffect, useState } from 'react';
import { useSession } from '../../context/SessionProvider';
import { useRouter } from 'expo-router';
import { getSupabase } from '../../lib/supabase';

interface Entry {
  id: string;
  date: string;
  raw_text: string;
  polished_html?: string;
  photoUrl?: string;
  photos?: Array<{ storage_path: string }>;
}

const HomeScreen = () => {
  const router = useRouter();
    const { session, loading: sessionLoading } = useSession() ?? { session: null, loading: true };
  const [entries, setEntries] = useState<Entry[]>([]);
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [polishing, setPolishing] = useState<string | null>(null);

  // Check if session context exists and has session
  

  // Fetch entries helper
  const fetchEntries = async (cursorParam: string | null = null, append: boolean = false) => {
    if (!session) return;
    
    const apiUrl = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3000';
    const url = new URL(`${apiUrl}/api/entries`);
    url.searchParams.append('limit', '20');
    if (cursorParam) url.searchParams.append('cursor', cursorParam);

    if (append) setLoadingMore(true); 
    else setLoading(true);

    try {
      const res = await fetch(url.toString(), {
        headers: { Authorization: `Bearer ${session.access_token}` },
      });
      const json = await res.json();
      
      if (res.ok) {
        const items = await Promise.all(
          json.entries.map(async (entry: Entry) => {
            if (entry.photos && entry.photos.length > 0) {
                            const supabase = getSupabase();
              const { data: { publicUrl } } = supabase.storage
                .from('entry_photos')
                .getPublicUrl(entry.photos[0].storage_path);
              return { ...entry, photoUrl: publicUrl };
            }
            return entry;
          })
        );
        setEntries((prev) => (append ? [...prev, ...items] : items));
        setNextCursor(json.nextCursor);
      } else {
        console.error('Failed to fetch entries:', json.error);
      }
    } catch (e) {
      console.error('Error fetching entries', e);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

    useEffect(() => {
        if (sessionLoading) return; // Wait for session to be loaded

    if (session) {
      fetchEntries();
    } else {
      // Redirect to login screen if no session
      router.replace('/auth');
    }
    }, [session, sessionLoading]);

  const handlePolish = async (entryId: string) => {
    if (!session) return;
    
    const apiUrl = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3000';
    setPolishing(entryId);
    try {
      const response = await fetch(`${apiUrl}/api/entries/${entryId}/polish`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${session.access_token}`,
        },
      });
      const updatedEntry = await response.json();
      if (response.ok) {
        setEntries(currentEntries =>
          currentEntries.map(entry => (entry.id === entryId ? updatedEntry : entry))
        );
      } else {
        console.error('Failed to polish entry:', updatedEntry.error);
      }
    } catch (error) {
      console.error('Error polishing entry:', error);
    } finally {
      setPolishing(null);
    }
  };

  const handleDelete = (entryId: string) => {
    if (!session) return;
    
    const apiUrl = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3000';
    Alert.alert('Delete Entry', 'Are you sure you want to delete this entry?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          try {
            const res = await fetch(`${apiUrl}/api/entries/${entryId}`, {
              method: 'DELETE',
              headers: { Authorization: `Bearer ${session.access_token}` },
            });
            if (res.ok) {
              setEntries((prev) => prev.filter((e) => e.id !== entryId));
            } else {
              const j = await res.json();
              console.error('Delete failed', j.error);
            }
          } catch (e) {
            console.error('Delete error', e);
          }
        },
      },
    ]);
  };

  const handleLoadMore = () => {
    if (nextCursor && !loadingMore) {
      fetchEntries(nextCursor, true);
    }
  };

    // Show a loading indicator while the session is loading or initial entries are being fetched
    if (sessionLoading || loading) {
    return <ActivityIndicator style={styles.container} />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Journal Entries</Text>
      <Button title="New Entry" onPress={() => router.push('/new-entry')} />
      <FlatList
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={loadingMore ? <ActivityIndicator style={{ margin: 16 }} /> : null}
        data={entries}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.entryContainer}>
            <Text style={styles.entryDate}>{new Date(item.date).toLocaleDateString()}</Text>
            <Text>{item.polished_html || item.raw_text}</Text>
            <View style={{ flexDirection: 'row', marginTop: 8 }}>
              {!item.polished_html && (
                <Button
                  title={polishing === item.id ? 'Polishing...' : 'Polish'}
                  onPress={() => handlePolish(item.id)}
                  disabled={polishing === item.id}
                />
              )}
              <View style={{ width: 8 }} />
              <Button title="Delete" color="red" onPress={() => handleDelete(item.id)} />
            </View>
            {item.photoUrl && <Image source={{ uri: item.photoUrl }} style={styles.entryImage} />}
          </View>
        )}
        ListEmptyComponent={<Text>No entries found. Start writing!</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  entryContainer: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    width: '100%',
  },
  entryDate: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  entryImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    marginTop: 10,
    borderRadius: 8,
  },
});

export default HomeScreen;
