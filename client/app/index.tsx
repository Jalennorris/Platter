import { FlatList, Dimensions, Text, View, StyleSheet, TouchableOpacity, Animated, Easing, Alert, ActivityIndicator} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import Header from "@/component/header";
import Footer from "@/component/footer";
import { Ionicons } from "@expo/vector-icons";
import Video from "react-native-video";
import { TextInput } from "react-native-gesture-handler";

const { height } = Dimensions.get('window');

type Video = {
  id: string;
  title: string;
  videoUrl: string;
};

const HomeScreen: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [video, setVideo] = useState<Video[]>([]);
  const [page, setPage] = useState(1);
  const [openComments, setOpenComments] = useState(false);
  const [comments, setComments] = useState<string[]>([]);
  const [liked, setLiked] = useState<boolean>(false);
  const [newComment, setNewComment] = useState<string>("");
 ;
  const slideAnim = useRef(new Animated.Value(height)).current;
  const progress = useRef(new Animated.Value(0)).current; // Progress bar value

  const placeholderData: Video[] = [
    { id: "1", title: "Pasta Recipe", videoUrl: "https://example.com/video1.mp4" },
    { id: "2", title: "How to Bake Cake", videoUrl: "https://example.com/video2.mp4" },
    { id: "3", title: "Quick Salad Tips", videoUrl: "https://example.com/video3.mp4" },
    { id: "4", title: "Grilling Steaks", videoUrl: "https://example.com/video4.mp4" },
  ];

  const fetchVideos = async (page: number) => {
    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 500)); // Simulated network delay
      const newVideos = placeholderData.map((video) => ({
        ...video,
        id: `${video.id}-${page}`, // Unique IDs for new pages
      }));
      setVideo((prev) => [...prev, ...newVideos]);
    } catch (error) {
      console.error("Failed to fetch videos:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos(page);
  }, [page]);

  const handleEndReached = () => {
    if (!loading) {
      setPage((prevPage) => prevPage + 1);
    }
  };

 const handleOpenComments = () => {
    const targetValue = openComments ? height : height * 0.25;
    Animated.timing(slideAnim, {
      toValue: targetValue,
      duration: 300,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start(() => setOpenComments(!openComments));
  };

  const handleAddComment = (comment: string) => {
    if (comment.trim() === "") {
      Alert.alert("Comment cannot be empty");
    } else {
      setComments((prev) => [...prev, comment]);
      setNewComment("");
    }
  };

  const handleChange = (e: any) => {
    setNewComment(e.nativeEvent.text);
  };

 

  return (
    <View style={{ flex: 1 }}>
      <Header />
      <FlatList
        data={video}
        keyExtractor={(item) => item.id}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.5}
        renderItem={({ item }) => (
          <View style={styles.videoContainer}>
            <Text style={styles.title}>{item.title}</Text>
            <Video
              source={{ uri: item.videoUrl }} // Correct the video source
              style={{ width: '100%', height: '80%' }}
              resizeMode="cover"
              controls={true}
            />
            {loading && <ActivityIndicator size="large" color="#fff" />}

            {openComments ? (
              <Animated.View
                style={[
                  styles.commentsSection,
                  { transform: [{ translateY: slideAnim }] },
                ]}
              >
                <Ionicons
                  name="close"
                  size={30}
                  color="white"
                  style={styles.closeButton}
                  onPress={handleOpenComments}
                />
                <Text style={styles.commentsTitle}>Comments</Text>
                <Ionicons name="person-circle" size={40} color="white" style={styles.profileIcon} />
                <TextInput
                  placeholder="Add a comment..."
                  placeholderTextColor={"#fff"}
                  style={styles.commentInput}
                  value={newComment}
                  onChange={handleChange}
                  onSubmitEditing={() => handleAddComment(newComment)}
                />
              </Animated.View>
            ) : (
              <View style={styles.videoActions}>
                <TouchableOpacity onPress={() => setLiked(!liked)}>
                  <Ionicons name="heart" size={30} color={liked ? "red" : "#fff"} style={styles.videoActionsIons} />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Ionicons
                    name="chatbubble"
                    size={27}
                    color="#fff"
                    style={styles.videoActionsIons}
                    onPress={handleOpenComments}
                  />
                </TouchableOpacity>
              </View>
            )}
          </View>
        )}
        pagingEnabled
     
        
      />
      
     
     
      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  videoContainer: {
    height,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
    borderBottomColor: "#333",
    borderBottomWidth: 1,
    borderTopColor: "#333",
  },
  title: {
    color: "#fff",
    fontSize: 20,
    marginBottom: 10,
  },
  videoActions: {
    position: "absolute",
    right: 10,
    transform: [{ translateY: -40 }],
  },
  videoActionsIons: {
    paddingTop: 20,
  },
  commentsSection: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "100%",
    height: "75%",
    backgroundColor: "#555",
    justifyContent: "center",
    alignItems: "center",
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  closeButton: {
    transform: [{ translateY: -200 }, { translateX: 325 }],
  },
  commentsTitle: {
    color: "#fff",
    fontSize: 20,
    marginBottom: 10,
    transform: [{ translateY: -220 }],
  },
  commentInput: {
    width: "80%",
    height: 40,
    backgroundColor: "#333",
    color: "#fff",
    paddingHorizontal: 10,
    borderRadius: 20,
    marginBottom: 20,
    transform: [{ translateY: 20 }],
  },
  profileIcon: {
    transform: [{ translateX: -320 }, { translateY: 60 }],
  },
 
 
  
});

export default HomeScreen;
