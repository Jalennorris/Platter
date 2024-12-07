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


  const fetchVideos = async (page:number) => {
      try{

      }catch(error){

      }

  }

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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  title: {
    color: '#fff',
    fontSize: 20,
    marginBottom: 10,
  },
});



 

export default HomeScreen