import React from "react";
import { View, Text, StyleSheet, TouchableOpacity,  } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

const Header: React.FC = () => {
  return (
<SafeAreaView style={styles.SafeArea}>
    <View style={styles.container}>
    
      <View style={styles.logoContainer}>
        <Text style={styles.title}>Platter</Text>
      </View>

      
      <View style={styles.iconsContainer}>
        <TouchableOpacity style={styles.iconButton}>
          <Ionicons name="search" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    SafeArea:{
      backgroundColor: "#000",
    },

  container: {
    height: 60,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    backgroundColor: "#000",
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  logo: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 8,
  },
  title: {
    color: "#fff",
    fontSize: 35,
    fontWeight: "bold",
    marginTop: 5,
  },
  iconsContainer: {
    flexDirection: "row",
  },
  iconButton: {
    marginLeft: 15,
  },
});

export default Header;
