import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const Profile: React.FC = () => {
    const [post, setPost] = useState([]); // State for posts
    const router = useRouter();

    return (
        <View style={styles.container}>
            {/* Header Section */}
            <View style={styles.sectionBox}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => router.push('/')} style={styles.backButton}>
                        <Ionicons name="arrow-back" size={30} color="black" />
                    </TouchableOpacity>
                    <Text style={styles.username}>Username</Text>
                    <TouchableOpacity>
                        <Ionicons name="ellipsis-vertical" size={24} color="black" />
                    </TouchableOpacity>
                </View>
            </View>

            {/* Bio Section */}
            <View style={[styles.sectionBox, styles.bioSection]}>
                <View style={styles.statsContainer}>
                    <Ionicons name="person-circle" size={80} color="#ccc" style={styles.profileImage} />
                    <View style={styles.stat}>
                        <Text style={styles.statNumber}>0</Text>
                        <Text style={styles.statLabel}>Posts</Text>
                    </View>
                    <View style={styles.stat}>
                        <Text style={styles.statNumber}>0</Text>
                        <Text style={styles.statLabel}>Followers</Text>
                    </View>
                    <View style={styles.stat}>
                        <Text style={styles.statNumber}>0</Text>
                        <Text style={styles.statLabel}>Following</Text>
                    </View>
                </View>

                <View style={styles.bioContainer}>
                    <Text style={styles.displayName}>Display Name</Text>
                    <Text style={styles.bio}>Bio goes here...</Text>
                </View>

                <View style={styles.actionButtons}>
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText}>Edit Profile</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText}>Share Profile</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* Posts Section */}
            <View style={[styles.sectionBox, styles.postsSection]}>
                <Text style={styles.sectionTitle}>Posts</Text>
                {post.length === 0 ? (
                    <Text style={styles.noPostsText}>No posts yet.</Text>
                ) : (
                    post.map((item, index) => (
                        <View key={index} style={styles.postItem}>
                            <Text>Post {index + 1}</Text>
                        </View>
                    ))
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f8f8',
        padding: 10,
    },
    sectionBox: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 15,
        marginBottom: 10,
        elevation: 3, // Adds shadow (Android)
        shadowColor: '#000', // Adds shadow (iOS)
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    backButton: {
        justifyContent: 'center',
    },
    username: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black',
    },
    statsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    profileImage: {
        marginRight: 10,
    },
    stat: {
        alignItems: 'center',
    },
    statNumber: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    statLabel: {
        fontSize: 14,
        color: 'gray',
    },
    bioContainer: {
        alignItems: 'center',
        marginVertical: 10,
    },
    displayName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    bio: {
        fontSize: 14,
        color: 'gray',
        textAlign: 'center',
        marginHorizontal: 10,
    },
    actionButtons: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginTop: 10,
    },
    button: {
        backgroundColor: '#000',
        paddingVertical: 8,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    buttonText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: 'bold',
    },
    postsSection: {
        flex: 1,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    noPostsText: {
        fontSize: 14,
        color: 'gray',
        textAlign: 'center',
    },
    postItem: {
        backgroundColor: '#f2f2f2',
        padding: 10,
        borderRadius: 5,
        marginVertical: 5,
    },
});

export default Profile;
