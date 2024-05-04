import React, { useState } from "react";
import {
  View,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { Card, SearchBar } from "react-native-elements";
import { ScrollView } from "react-native";
import { router } from "expo-router";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useNavigate } from "react-router-dom";
import { storePostData } from "./storage";

// Example JSON data for articles
const articlesData = [
  {
    id: "1",
    title: "Why can't you sleep well at morning?",
    creatorName: "John Doe",
    body: "This is the body of the first article...",
    image: "https://live.staticflickr.com/65535/53454927782_a13751ddd7_z.jpg",
    date: "2024-04-30",
  },
  {
    id: "2",
    title: "Why can't the fish climb a tree?",
    creatorName: "Jane Smith",
    body: "This is the body of the second article...",
    image: "https://buffer.com/library/content/images/2023/10/free-images.jpg",
    date: "2024-05-01",
  },
  {
    id: "3",
    title: "Why can't the fish climb a tree?",
    creatorName: "Jane Smith",
    body: "This is the body of the second article...",
    image: "https://buffer.com/library/content/images/2023/10/free-images.jpg",
    date: "2024-05-01",
  },
  // Add more articles as needed
];

const PostsScreen = () => {

  const [search, setSearch] = useState("");
  const [filteredArticles, setFilteredArticles] = useState(articlesData);

  const updateSearch = (search) => {
    setSearch(search);
    const filteredData = articlesData.filter((item) =>
      item.title.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredArticles(filteredData);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => {
        setTimeout(() => {
          storePostData(
            item.title,
            item.body,
            item.creatorName,
            item.date,
            item.image
          );
        }, 2000);
        router.push("./Post");
      }}
    >
      <Card containerStyle={styles.cardContainer}>
        <Card.Title style={styles.title}>{item.title}</Card.Title>
        <Card.Image source={{ uri: item.image }} style={styles.cardImage} />
      </Card>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <SearchBar
        placeholder="Type Here..."
        onChangeText={updateSearch}
        value={search}
        containerStyle={styles.searchBar}
        inputContainerStyle={styles.searchInput}
      />
      <FlatList
        data={filteredArticles}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop:10,
  },
  title: {
    fontSize: 24, // Increased font size for the title
    marginBottom: 10, // Add some space between the title and the image
  },
  cardImage: {
    width: "100%", // Ensures the image takes up the full width of the card
    aspectRatio: 16 / 9, // Maintain a specific aspect ratio
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  cardContainer: {
    paddingHorizontal: 0,
    paddingBottom: 0,
    borderWidth: 0, // Remove card border
    borderRadius: 8, // Optional: if you want rounded corners
  },
  searchBar: {
    backgroundColor: "transparent",
    borderBottomColor: "transparent",
    borderTopColor: "transparent",
  },
  searchInput: {
    backgroundColor: "lightgrey",
    borderRadius: 30,
  },
});

export default PostsScreen;
