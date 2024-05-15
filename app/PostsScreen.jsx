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
    title: "The Future of Telemedicine: Trends and Benefits",
    creatorName: "Dr. Emily Tran",
    body: "Telemedicine has revolutionized healthcare, offering remote consultations and treatments. This article explores the emerging trends and the benefits they bring to patients and providers.Keeping your heart healthy is crucial. This article provides tips on diet, exercise, and lifestyle changes to maintain cardiovascular health.Keeping your heart healthy is crucial. This article provides tips on diet, exercise, and lifestyle changes to maintain cardiovascular health.",
    image:
      "data:image/jpeg;base64,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",
    date: "2024-05-10",
  },
  {
    id: "2",
    title: "Understanding Antibiotics: Usage and Resistance",
    creatorName: "Dr. Mark Lee",
    body: "Antibiotics are powerful tools for fighting infections. However, their overuse has led to increased resistance. Learn about proper antibiotic usage and how to prevent resistance.Keeping your heart healthy is crucial. This article provides tips on diet, exercise, and lifestyle changes to maintain cardiovascular health.Keeping your heart healthy is crucial. This article provides tips on diet, exercise, and lifestyle changes to maintain cardiovascular health.",
    image:
      "data:image/jpeg;base64,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",
    date: "2024-04-25",
  },
  {
    id: "3",
    title: "Health Benefits of Regular Check-Ups",
    creatorName: "Dr. Sara Coughlin",
    body: "Regular health check-ups can prevent many diseases. This article discusses what to expect during a check-up and how it can help you maintain your health.Keeping your heart healthy is crucial. This article provides tips on diet, exercise, and lifestyle changes to maintain cardiovascular health.Keeping your heart healthy is crucial. This article provides tips on diet, exercise, and lifestyle changes to maintain cardiovascular health.",
    image:
      "data:image/jpeg;base64,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",
    date: "2024-05-15",
  },
  {
    id: "4",
    title: "Breakthroughs in Diabetes Treatment",
    creatorName: "Dr. Alex Goodwin",
    body: "Recent advances in diabetes treatment have shown promising results. This article covers the latest breakthroughs and what they mean for patients.Keeping your heart healthy is crucial. This article provides tips on diet, exercise, and lifestyle changes to maintain cardiovascular health.Keeping your heart healthy is crucial. This article provides tips on diet, exercise, and lifestyle changes to maintain cardiovascular health.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2xKuPiaZrp41pkYMl4HQyMdiyHGHMyfdQxQ&s",
    date: "2024-05-05",
  },
  {
    id: "5",
    title: "Mental Health: Understanding Depression",
    creatorName: "Dr. Jane Foster",
    body: "Depression is a common but serious mood disorder. This article helps you understand the symptoms, causes, and treatments for depression.Keeping your heart healthy is crucial. This article provides tips on diet, exercise, and lifestyle changes to maintain cardiovascular health.Keeping your heart healthy is crucial. This article provides tips on diet, exercise, and lifestyle changes to maintain cardiovascular health.",
    image:
      "https://www.azaleahealth.com/wp-content/uploads/2022/12/home_banner.jpg",
    date: "2024-04-20",
  },
  {
    id: "6",
    title: "Cardiovascular Health: Tips for a Healthy Heart",
    creatorName: "Dr. Brian O'Connor",
    body: "Keeping your heart healthy is crucial. This article provides tips on diet, exercise, and lifestyle changes to maintain cardiovascular health.Keeping your heart healthy is crucial. This article provides tips on diet, exercise, and lifestyle changes to maintain cardiovascular health.Keeping your heart healthy is crucial. This article provides tips on diet, exercise, and lifestyle changes to maintain cardiovascular health.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6BId3fNno76tHF024miwyZMFCF62MYLkSew&s",
    date: "2024-05-12",
  },
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
