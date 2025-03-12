import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native"
import { useAuth } from '../hooks/useAuth'

const ProfileScreen = () => {
  const { authState, signOut } = useAuth()
  const user = authState.user

  const handleSignOut = async () => {
    try {
      await signOut()
    } catch (error: any) {
      Alert.alert("Error", error.message || "Failed to sign out")
    }
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <View style={styles.avatarPlaceholder}>
            <Text style={styles.avatarText}>
              {user?.email?.charAt(0).toUpperCase() || "U"}
            </Text>
          </View>
          <Text style={styles.email}>{user?.email}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Profile Information</Text>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Name</Text>
            <Text style={styles.infoValue}>Not set</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Gender</Text>
            <Text style={styles.infoValue}>Not set</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Date of Birth</Text>
            <Text style={styles.infoValue}>Not set</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Height</Text>
            <Text style={styles.infoValue}>Not set</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Weight</Text>
            <Text style={styles.infoValue}>Not set</Text>
          </View>

          <TouchableOpacity style={styles.editButton}>
            <Text style={styles.editButtonText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>App Settings</Text>
          <TouchableOpacity style={styles.settingRow}>
            <Text style={styles.settingText}>Notifications</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.settingRow}>
            <Text style={styles.settingText}>Privacy Settings</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.settingRow}>
            <Text style={styles.settingText}>Health Goals</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>
          <TouchableOpacity style={styles.settingRow}>
            <Text style={styles.settingText}>Change Password</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.settingRow}>
            <Text style={styles.settingText}>Export Data</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
          <Text style={styles.signOutButtonText}>Sign Out</Text>
        </TouchableOpacity>

        <Text style={styles.versionText}>HackMyHealth v1.0.0</Text>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  content: {
    padding: 20,
  },
  header: {
    alignItems: "center",
    marginBottom: 30,
  },
  avatarPlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#4CAF50",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  avatarText: {
    color: "white",
    fontSize: 32,
    fontWeight: "bold",
  },
  email: {
    fontSize: 16,
    color: "#555",
  },
  section: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#333",
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  infoLabel: {
    fontSize: 16,
    color: "#555",
  },
  infoValue: {
    fontSize: 16,
    color: "#888",
  },
  editButton: {
    marginTop: 15,
    backgroundColor: "#f0f0f0",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  editButtonText: {
    color: "#4CAF50",
    fontWeight: "bold",
  },
  settingRow: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  settingText: {
    fontSize: 16,
    color: "#444",
  },
  signOutButton: {
    backgroundColor: "#f44336",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 20,
  },
  signOutButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  versionText: {
    textAlign: "center",
    color: "#888",
    marginBottom: 20,
  },
})

export default ProfileScreen
