import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  StyleSheet,
} from 'react-native';

export default function HomeScreen({ navigation }) {
  const [booksData, setBooksData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllBooks();
  }, []); // run only once on mount

  const getAllBooks = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        'https://www.googleapis.com/books/v1/volumes?q=science&maxResults=40',
      );
      const json = await response.json();
      setBooksData(json.items || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <ActivityIndicator
        size="large"
        style={{ flex: 1, justifyContent: 'center' }}
      />
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Science Books</Text>
      <FlatList
        data={booksData}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <Text style={styles.bookTitle}>{item.volumeInfo.title}</Text>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  bookTitle: { fontSize: 16, marginVertical: 5 },
});
