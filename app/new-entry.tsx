import { useState } from 'react';
import { View, Text, TextInput, Button, Image, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { useSession } from '../context/SessionProvider';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';
import { supabase } from '../lib/supabase';

const NewEntryScreen = () => {
  const sessionContext = useSession();
  const session = sessionContext?.session;
  const router = useRouter();
  const [text, setText] = useState<string>('');
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleSave = async () => {
    if (!text || !session) return;
    setLoading(true);

    try {
      // 1. Create the journal entry
      const { data: entry, error: entryError } = await supabase
        .from('entries')
        .insert({ raw_text: text, user_id: session.user.id })
        .select()
        .single();

      if (entryError) throw entryError;

      // 2. If there's an image, compress and upload it
      if (image) {
        const manipResult = await ImageManipulator.manipulateAsync(
          image,
          [{ resize: { width: 800 } }], // Compress by resizing
          { compress: 0.7, format: ImageManipulator.SaveFormat.JPEG }
        );

        const response = await fetch(manipResult.uri);
        const blob = await response.blob();
        const fileExt = manipResult.uri.split('.').pop();
        const fileName = `${Date.now()}.${fileExt}`;
        const filePath = `${session.user.id}/${entry.id}/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('entry_photos')
          .upload(filePath, blob);

        if (uploadError) throw uploadError;

        // 3. Create the photo record
        const { error: photoError } = await supabase
          .from('photos')
          .insert({ entry_id: entry.id, user_id: session.user.id, storage_path: filePath });

        if (photoError) throw photoError;
      }

      router.back();
    } catch (error: any) {
      console.error('Error saving entry:', error.message);
      alert('Failed to save entry. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>New Journal Entry</Text>
      <TextInput
        style={styles.input}
        placeholder="What's on your mind?"
        value={text}
        onChangeText={setText}
        multiline
      />
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      {image && <Image source={{ uri: image }} style={styles.image} />}
      <View style={styles.buttonContainer}>
        {loading ? (
          <ActivityIndicator />
        ) : (
          <Button title="Save Entry" onPress={handleSave} disabled={!text} />
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    fontSize: 16,
    minHeight: 150,
    textAlignVertical: 'top',
    marginBottom: 20,
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
    marginVertical: 20,
  },
  buttonContainer: {
    marginTop: 20,
  },
});

export default NewEntryScreen;
