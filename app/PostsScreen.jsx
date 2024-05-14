import React, { useEffect, useState } from "react";
import {
  View,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  Modal,
  TextInput,
} from "react-native";
import { Card, SearchBar } from "react-native-elements";
import { ScrollView } from "react-native";
import { router } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";

import { Button } from "react-native-ui-lib";
import * as ImagePicker from "expo-image-picker";
import { retrieveAccountType, retrieveUsername } from "./storage";

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
const PostsScreen = ({ navigation }) => {
  const [search, setSearch] = useState("");
  const [posts, setPosts] = useState(articlesData);

  const [filteredArticles, setFilteredArticles] = useState(articlesData);
  const [addPostModalVisible, setAddPostModalVisible] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newBody, setNewBody] = useState("");
  const [newImage, setNewImage] = useState(null);
  const [isDoctor,setIsDoctor] = useState(false);
  useEffect(() => {
    const checkAccountType = async () => {
      const accountType = await retrieveAccountType();
      if (accountType === "Doctor") {
        setIsDoctor(true);
      }
    };

    checkAccountType();
  }, []);
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setNewImage(result.assets[0].uri);
    }
    console.log(newImage);
  };

  const handleAddPost = async ()=> {
      const userName = await retrieveUsername();
    const newPost = {
      title: newTitle,
      date: new Date().toISOString().split("T")[0],
      creatorName: userName,
      image: newImage,
      body: newBody,
      id: Math.random(),
    };
    console.log(newPost);
    setFilteredArticles([newPost, ...filteredArticles]);
    setNewTitle(""),
    setNewBody(""),
    setNewImage(null)

    //TODO add to database new post addPostDB(newPost);
  };

  const updateSearch = (search) => {
    console.log("is doc" + isDoctor);
    setSearch(search);
    const filteredData = articlesData.filter((item) =>
      item.title.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredArticles(filteredData);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("Post", {
          title: item.title,
          image: item.image,
          body: item.body,
          date: item.date,
          creatorName: item.creatorName,
        });
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
      {isDoctor && (
        <>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => setAddPostModalVisible(true)}
          >
            <FontAwesome name="plus" size={24} color="white" />
          </TouchableOpacity>
          <Modal
            animationType="slide"
            transparent={true}
            visible={addPostModalVisible}
            onRequestClose={() => setAddPostModalVisible(!addPostModalVisible)}
          >
            <View style={styles.modalView}>
              <TextInput
                style={styles.modalText}
                placeholder="Enter Title..."
                value={newTitle}
                onChangeText={setNewTitle}
                numberOfLines={2}
              />
              <TextInput
                style={styles.modalText}
                placeholder="Enter Body..."
                value={newBody}
                onChangeText={setNewBody}
                multiline
                numberOfLines={9}
              />
              <Button
                marginB-20 
                label="Upload Poster"
                size="small"
                onPress={pickImage}
              />
              <TouchableOpacity style={styles.button} onPress={handleAddPost}>
                <Text style={styles.buttonText}>Add Post</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setAddPostModalVisible(!addPostModalVisible)}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </Modal>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  button: {
    borderRadius: 20,
    padding: 10,
    marginBottom: 10,
    elevation: 2,
    backgroundColor: "#007AFF",
  },
  cancelButton: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    backgroundColor: "#F44336",
  },
  title: {
    fontSize: 24, // Increased font size for the title
    marginBottom: 10,
    marginHorizontal: 5, // Add some space between the title and the image
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
  addButton: {
    position: "absolute",
    right: 20,
    bottom: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#007AFF",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 6,
  },
  modalView: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    margin: 20,
    backgroundColor: "#f9f9f9",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 20,
    textAlign: "center",
    fontSize: 18,
    width: "80%",
    borderColor: "#ddd",
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#fff",
  },
});

export default PostsScreen;
