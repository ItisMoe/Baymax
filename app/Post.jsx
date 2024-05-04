import React , {useState,useEffect} from "react";
import { ScrollView, Text, Image, StyleSheet } from "react-native";
import { retrievePostBody, retrievePostCreatorName, retrievePostDate, retrievePostImage, retrievePostTitle, storePostData } from "./storage";
import { View } from "react-native-ui-lib";
import { router } from "expo-router";
import PostsScreen from "./PostsScreen";

const Post = () => {
  // Extract the parameters passed via the navigation route
    const [title, setTitle] = useState(null);
  const [body, setBody] = useState(null);
  const [date, setDate] = useState(null);
  const [image, setImage] = useState(null);
  const [creatorName, setCreatorName] = useState(null);

  useEffect(() => {
    const fetchAuthDetails = async () => {
      const title = await retrievePostTitle();
      const body = await retrievePostBody();
    const date = await retrievePostDate();
      const image = await retrievePostImage();
      const creatorName = await retrievePostCreatorName();
      setTitle(title);
      setBody(body);
      setDate(date);
      setImage(image);
      setCreatorName(creatorName);
    };

    fetchAuthDetails();
  }, []);

  return (
    <ScrollView style={styles.container}>

      <Text style={{fontSize:20,fontWeight:600,color:'grey',marginBottom:20}} onPress={()=>{
        router.push("./");
      }}> Back</Text>

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
