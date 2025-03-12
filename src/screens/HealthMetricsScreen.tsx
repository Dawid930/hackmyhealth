import React, { useState } from "react"
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native"
import { supabase } from "../services/supabase"
import { useAuth } from "../hooks/useAuth"

const METRIC_TYPES = [
  { id: "weight", name: "Weight", unit: "kg" },
  { id: "blood_pressure", name: "Blood Pressure", unit: "mmHg" },
  { id: "heart_rate", name: "Heart Rate", unit: "bpm" },
  { id: "blood_glucose", name: "Blood Glucose", unit: "mg/dL" },
  { id: "steps", name: "Steps", unit: "steps" },
  { id: "sleep", name: "Sleep", unit: "hours" },
]

const HealthMetricsScreen = () => {
  const { authState } = useAuth()
  const [selectedMetric, setSelectedMetric] = useState(METRIC_TYPES[0])
  const [metricValue, setMetricValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleAddMetric = async () => {
    if (!metricValue) {
      Alert.alert("Error", "Please enter a value")
      return
    }

    try {
      setIsLoading(true)

      const { error } = await supabase.from("health_metrics").insert({
        user_id: authState.user?.id,
        metric_type: selectedMetric.id,
        value: parseFloat(metricValue),
        unit: selectedMetric.unit,
        date: new Date().toISOString().split("T")[0],
      })

      if (error) throw error

      // Clear form after successful submission
      setMetricValue("")

      Alert.alert("Success", "Health metric added successfully")
    } catch (error: any) {
      Alert.alert("Error", error.message || "Failed to add health metric")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          <Text style={styles.title}>Track Health Metrics</Text>

          <Text style={styles.sectionTitle}>Select Metric Type</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.metricsSelector}
          >
            {METRIC_TYPES.map((metric) => (
              <TouchableOpacity
                key={metric.id}
                style={[
                  styles.metricButton,
                  selectedMetric.id === metric.id &&
                    styles.metricButtonSelected,
                ]}
                onPress={() => setSelectedMetric(metric)}
              >
                <Text
                  style={[
                    styles.metricButtonText,
                    selectedMetric.id === metric.id &&
                      styles.metricButtonTextSelected,
                  ]}
                >
                  {metric.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>
              {selectedMetric.name} ({selectedMetric.unit})
            </Text>
            <TextInput
              style={styles.input}
              placeholder={`Enter value in ${selectedMetric.unit}`}
              value={metricValue}
              onChangeText={setMetricValue}
              keyboardType="numeric"
            />
          </View>

          <TouchableOpacity
            style={styles.addButton}
            onPress={handleAddMetric}
            disabled={isLoading}
          >
            <Text style={styles.addButtonText}>
              {isLoading ? "Adding..." : "Add Metric"}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
    color: "#444",
  },
  metricsSelector: {
    flexDirection: "row",
    marginBottom: 20,
  },
  metricButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: "#f0f0f0",
    borderRadius: 25,
    marginRight: 10,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  metricButtonSelected: {
    backgroundColor: "#4CAF50",
    borderColor: "#4CAF50",
  },
  metricButtonText: {
    color: "#555",
    fontWeight: "500",
  },
  metricButtonTextSelected: {
    color: "white",
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: "#444",
  },
  input: {
    backgroundColor: "white",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 12,
    fontSize: 16,
  },
  addButton: {
    backgroundColor: "#4CAF50",
    borderRadius: 8,
    padding: 15,
    alignItems: "center",
    marginTop: 10,
  },
  addButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
})

export default HealthMetricsScreen
