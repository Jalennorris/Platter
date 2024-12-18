import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

const Header: React.FC = () => {
  const [showSearch, setShowSearch] = useState(false);
  const searchAnim = useRef(new Animated.Value(0)).current; // Animation value

  const toggleSearch = () => {
    Animated.timing(searchAnim, {
      toValue: showSearch ? 0 : 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
    setShowSearch((prev) => !prev);
  };

  const searchBarWidth = searchAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0%", "75%"],
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
     
        <View style={styles.logoContainer}>
          <Text style={styles.title}>Platter</Text>
        </View>

       
        <Animated.View style={[styles.searchContainer, { width: searchBarWidth }]}>
          {showSearch && (
            <TextInput
              style={styles.searchInput}
              placeholder="Search for a recipe..."
              placeholderTextColor="#888"
            />
          )}
        </Animated.View>

        {/* Icons */}
        <View style={styles.iconsContainer}>
          <TouchableOpacity style={styles.iconButton} onPress={toggleSearch}>
            <Ionicons
              name={showSearch ? "close" : "search"}
              size={24}
              color="#000"
            />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: "#fff",
  },
  container: {
    height: 60,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    backgroundColor: "#fff",
  },
  logoContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    color: "#000",
    fontSize: 28,
    fontWeight: "bold",
  },
  searchContainer: {
    overflow: "hidden",
    height: 40,
    backgroundColor: "#f1f1f1",
    borderRadius: 20,
    justifyContent: "center",
    paddingHorizontal: 10,
  },
  searchInput: {
    fontSize: 16,
    color: "#000",
  },
  iconsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconButton: {
    marginLeft: 10,
  },
});

export default Header;
