import {FlatList, Dimensions,Text, View, StyleSheet } from "react-native";
import React, {useState, useEffect} from "react"



const {height} = Dimensions.get('window');


type Video = {
  id: string,
 title: string
 videoUrl: string
}


const HomeScreen: React.FC = () => {

  const [video,setVideo] = useState<Video[]>([]);
  const [page, setPage] = useState(1);

  const placeholderData: Video[] = [
    { id: "1", title: "Pasta Recipe", videoUrl: "https://example.com/video1.mp4" },
    { id: "2", title: "How to Bake Cake", videoUrl: "https://example.com/video2.mp4" },
    { id: "3", title: "Quick Salad Tips", videoUrl: "https://example.com/video3.mp4" },
    { id: "4", title: "Grilling Steaks", videoUrl: "https://example.com/video4.mp4" },
  ];


  const fetchVideos = async (page: number) => {
    try {
      
      await new Promise((resolve) => setTimeout(resolve, 500));
      
      const newVideos = placeholderData.map((video) => ({
        ...video,
        id: `${video.id}-${page}`, // Unique IDs for new pages
      }));
      setVideo((prev) => [...prev, ...newVideos]);
    } catch (error) {
      console.error("Failed to fetch videos:", error);
    }
  };

  useEffect(() => {
    fetchVideos(page)

    
  }, [page])

  const handleEndReached = () => {
    setPage((page) => page + 1)
  }


  return (
    <FlatList
      data={video}
      keyExtractor={(item) => item.id}
      onEndReached={handleEndReached}
      onEndReachedThreshold={0.5}
      renderItem={({ item }) => (
        <View style={styles.videoContainer}>
          <Text style={styles.title}>{item.title}</Text>
         
          <Text>Video Placeholder: {item.videoUrl}</Text>
        </View>
      )}
      pagingEnabled
    />
  );
};

const styles = StyleSheet.create({
  videoContainer: {
    height,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },
  title: {
    color: "#fff",
    fontSize: 20,
    marginBottom: 10,
  },
});

 

export default HomeScreen