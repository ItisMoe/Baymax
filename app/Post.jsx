import React , {useState,useEffect} from "react";
import { ScrollView, Text, Image, StyleSheet } from "react-native";
import { retrievePostBody, retrievePostCreatorName, retrievePostDate, retrievePostImage, retrievePostTitle, storePostData } from "./storage";
import { View } from "react-native-ui-lib";
import { router } from "expo-router";
import PostsScreen from "./PostsScreen";


const Post = ({ route, navigation }) => {
  // Extract the parameters passed via the navigation route

  const { title, image, body, date, creatorName } = route.params;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Image source={{ uri: image }} style={styles.image} />
      <Text style={styles.metadata}>
        By {creatorName} on {date}
      </Text>
      <Text style={styles.body}>{body}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  title: {
    fontSize: 35,
    fontWeight: "bold",
    marginBottom: 10,
  },
  image: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
    marginBottom: 10,
  },
  metadata: {
    fontSize: 16,
    marginBottom: 10,
    color: "grey",
  },
  body: {
    fontSize: 20,
  },
});

export default Post;
