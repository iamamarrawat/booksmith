import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  TextInput,
  Image,
  StyleSheet,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen({ navigation }) {
  const [scienceBooksData, setScienceBooksData] = useState([]);
  const [trendingBooksData, setTrendingBooksData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllScienceBooks();
    getAllTrendingBooks();
  }, []); // run only once on mount

  const getAllScienceBooks = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        'https://www.googleapis.com/books/v1/volumes?q=science&maxResults=40',
      );
      const json = await response.json();
      setScienceBooksData(json.items || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getAllTrendingBooks = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        'https://www.googleapis.com/books/v1/volumes?q=trending&maxResults=40',
      );
      const json = await response.json();
      setTrendingBooksData(json.items || []);
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
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.screen}>
        <AppBar />
        <Text style={styles.pageHeading}>Keep exploring</Text>
        <SearchBar />
        <HeadingComponent heading="Continue Reading" />
        <ContinueReadingList booksData={scienceBooksData} />
        <HeadingComponent heading="Trending books" />
        <ContinueReadingList booksData={trendingBooksData} />
      </View>
    </SafeAreaView>
  );
}

function AppBar() {
  return (
    <View style={styles.appBar}>
      <MaterialIcons name="menu" size={32}></MaterialIcons>
      <View style={{ flex: 1 }}></View>
      <Text style={styles.appBarTitle}>Hello Tommy</Text>
      <Image
        source={require('../../assets/images/onboarding_image.png')}
        style={styles.profilePic}
      ></Image>
    </View>
  );
}

function SearchBar() {
  return (
    <View style={styles.searchBar}>
      <MaterialIcons name="search" size={24} />
      <TextInput
        placeholder="Search by book title..."
        onChange={() => {}}
        style={styles.searchText}
      />
      <Ionicons name="options" size={24} />
    </View>
  );
}

function HeadingComponent({ heading }) {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',

        width: '100%',
      }}
    >
      <Text style={styles.heading}>{heading}</Text>
      <Text style={styles.viewAll}>view all</Text>
    </View>
  );
}

function ContinueReadingList({ booksData }) {
  return (
    <View style={{ height: 200, marginVertical: 12 }}>
      <FlatList
        data={booksData}
        horizontal
        ItemSeparatorComponent={() => <View style={{ width: 12 }} />}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <BookCard imageUrl={item.volumeInfo?.imageLinks?.thumbnail} />
        )}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
}

function BookCard({ imageUrl }) {
  const secureUrl = imageUrl?.replace('http://', 'https://');

  return (
    <Image
      source={{
        uri: secureUrl,
      }}
      style={styles.bookCardImage}
    ></Image>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  screen: { flex: 1, paddingLeft: 12, paddingRight: 12 },
  appBar: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 8,
    paddingBottom: 12,
  },
  appBarTitle: {
    fontFamily: 'magra',
    fontSize: 18,
    fontWeight: 'regular',
    marginRight: 10,
  },
  bookTitle: { fontSize: 16, marginVertical: 5 },
  profilePic: { height: 40, width: 40, borderRadius: 20, objectFit: 'cover' },
  pageHeading: {
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: 'magra',
  },
  searchBar: {
    margin: 12,
    paddingHorizontal: 18,
    paddingVertical: 12,
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 80,

    // 📱 iOS shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,

    // 🤖 Android shadow
    elevation: 2,
  },
  searchText: {
    fontFamily: 'magra',
    fontWeight: 'medium',
    marginHorizontal: 8,
    fontSize: 14,
    flex: 1,
  },
  viewAll: {
    fontFamily: 'lora',
    fontSize: 14,
    fontWeight: 'regular',
    color: '#706868',
  },
  heading: { fontFamily: 'magra', fontSize: 18, fontWeight: 'regular' },
  bookCardImage: {
    borderRadius: 12,
    width: 120,
    height: 180,
    resizeMode: 'cover',
    backgroundColor: '#eee', // optional placeholder background
  },
});
