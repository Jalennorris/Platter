import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import  {useRouter} from "expo-router";

const Footer: React.FC = () => {
  const router = useRouter() ;
  return (
    <View style={styles.container}>
     
      <TouchableOpacity style={styles.iconButton}>
        <Ionicons name="home" size={24} color="#000" />
        <Text style={styles.iconText}>Home</Text>
      </TouchableOpacity>

      {/* Search Button */}
      <TouchableOpacity style={styles.iconButton}>
        <Ionicons name="search" size={24} color="#000" />
        <Text style={styles.iconText}>Search</Text>
      </TouchableOpacity>

      {/* Add Button */}
      <TouchableOpacity style={[styles.iconButton, styles.addButton]} onPress={() => router.push('/create') }>
      <View style={styles.iconSquare}>
        <Ionicons name="add-circle" size={36} color="black" />
      </View>
      </TouchableOpacity>

      {/* Notifications Button */}
      <TouchableOpacity style={styles.iconButton}>
        <Ionicons name="notifications" size={24} color="#00" />
        <Text style={styles.iconText}>Alerts</Text>
      </TouchableOpacity>

      {/* Profile Button */}
      <TouchableOpacity style={styles.iconButton} onPress={() =>router.push('/profile')}>
        <Ionicons name="person" size={24} color="#000" />
        <Text style={styles.iconText}>Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 60,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#333",
  },
  iconButton: {
    alignItems: "center",
    justifyContent: "center",
  },
  addButton: {
    position: "relative",
    top: -10,
  },
  iconText: {
    color: "#fff",
    fontSize: 10,
    marginTop: 2,
  },
  iconSquare: {
    width: 50, // Width of the square
    height: 50, // Height of the square
    backgroundColor: '#f0f0f0', // Light gray background (optional)
    justifyContent: 'center', // Center icon vertically
    alignItems: 'center', // Center icon horizontally
    borderRadius: 10, // Optional: Adds a slight rounded edge
    elevation: 1, // Shadow for Android
    shadowColor: '#000', // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    borderWidth: 1, // Thin border for a polished look
    borderColor: '#e0e0e0', // Light gray border color
  },
});

export default Footer;
