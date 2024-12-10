import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const Footer: React.FC = () => {
  return (
    <View style={styles.container}>
     
      <TouchableOpacity style={styles.iconButton}>
        <Ionicons name="home" size={24} color="#fff" />
        <Text style={styles.iconText}>Home</Text>
      </TouchableOpacity>

      {/* Search Button */}
      <TouchableOpacity style={styles.iconButton}>
        <Ionicons name="search" size={24} color="#fff" />
        <Text style={styles.iconText}>Search</Text>
      </TouchableOpacity>

      {/* Add Button */}
      <TouchableOpacity style={[styles.iconButton, styles.addButton]}>
        <Ionicons name="add-circle" size={36} color="red" />
      </TouchableOpacity>

      {/* Notifications Button */}
      <TouchableOpacity style={styles.iconButton}>
        <Ionicons name="notifications" size={24} color="#fff" />
        <Text style={styles.iconText}>Alerts</Text>
      </TouchableOpacity>

      {/* Profile Button */}
      <TouchableOpacity style={styles.iconButton}>
        <Ionicons name="person" size={24} color="#fff" />
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
    backgroundColor: "#000",
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
});

export default Footer;
