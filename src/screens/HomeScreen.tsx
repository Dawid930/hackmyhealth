import React from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import { useAuth } from '../hooks/useAuth'

const HomeScreen = () => {
  const { authState } = useAuth()
  const user = authState.user

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.greeting}>
          Welcome, {user?.email?.split("@")[0] || "User"}
        </Text>
        <Text style={styles.subtitle}>Your Health Dashboard</Text>
      </View>

      {/* Summary Cards */}
      <View style={styles.summaryContainer}>
        {/* Nutrition Summary */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Nutrition</Text>
          <View style={styles.cardContent}>
            <Text style={styles.placeholderText}>No nutrition data yet</Text>
          </View>
        </View>

        {/* Activity Summary */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Activity</Text>
          <View style={styles.cardContent}>
            <Text style={styles.placeholderText}>No activity data yet</Text>
          </View>
        </View>

        {/* Health Metrics Summary */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Health Metrics</Text>
          <View style={styles.cardContent}>
            <Text style={styles.placeholderText}>No health metrics yet</Text>
          </View>
        </View>
      </View>

      {/* Recent Entries Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recent Entries</Text>
        <View style={styles.emptyState}>
          <Text style={styles.emptyStateText}>No recent entries found</Text>
          <Text style={styles.emptyStateSubtext}>
            Start tracking your food and health metrics to see data here
          </Text>
        </View>
      </View>

      {/* Tips Section */}
      <View style={[styles.section, styles.tipsSection]}>
        <Text style={styles.sectionTitle}>Health Tip</Text>
        <Text style={styles.tipText}>
          Staying hydrated is essential for optimal health. Aim to drink at
          least 8 glasses of water daily.
        </Text>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    padding: 20,
    backgroundColor: "#4CAF50",
  },
  greeting: {
    fontSize: 18,
    color: "white",
    fontWeight: "500",
  },
  subtitle: {
    fontSize: 24,
    color: "white",
    fontWeight: "bold",
    marginTop: 5,
  },
  summaryContainer: {
    padding: 15,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  cardContent: {
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  placeholderText: {
    color: "#888",
    fontSize: 14,
  },
  section: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 15,
    margin: 15,
    marginTop: 0,
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
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  emptyStateText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#666",
    marginBottom: 5,
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: "#888",
    textAlign: "center",
  },
  tipsSection: {
    backgroundColor: "#E8F5E9",
    borderLeftWidth: 4,
    borderLeftColor: "#4CAF50",
  },
  tipText: {
    fontSize: 15,
    color: "#333",
    lineHeight: 22,
  },
})

export default HomeScreen
