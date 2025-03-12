import React, { useState } from 'react'
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
import { supabase } from '../services/supabase'
import { useAuth } from '../hooks/useAuth'

const FoodTrackingScreen = () => {
  const { authState } = useAuth()
  const [foodName, setFoodName] = useState("")
  const [calories, setCalories] = useState("")
  const [protein, setProtein] = useState("")
  const [carbs, setCarbs] = useState("")
  const [fat, setFat] = useState("")
  const [mealType, setMealType] = useState<
    "breakfast" | "lunch" | "dinner" | "snack"
  >("breakfast")
  const [isLoading, setIsLoading] = useState(false)

  const handleAddFood = async () => {
    if (!foodName || !calories) {
      Alert.alert("Error", "Food name and calories are required")
      return
    }

    try {
      setIsLoading(true)

      const { error } = await supabase.from("food_entries").insert({
        user_id: authState.user?.id,
        name: foodName,
        calories: parseInt(calories) || 0,
        protein: parseInt(protein) || 0,
        carbs: parseInt(carbs) || 0,
        fat: parseInt(fat) || 0,
        meal_type: mealType,
        date: new Date().toISOString().split("T")[0],
      })

      if (error) throw error

      // Clear form after successful submission
      setFoodName("")
      setCalories("")
      setProtein("")
      setCarbs("")
      setFat("")

      Alert.alert("Success", "Food entry added successfully")
    } catch (error: any) {
      Alert.alert("Error", error.message || "Failed to add food entry")
    } finally {
      setIsLoading(false)
    }
  }

  const MealTypeButton = ({
    title,
    type,
  }: {
    title: string
    type: "breakfast" | "lunch" | "dinner" | "snack"
  }) => (
    <TouchableOpacity
      style={[
        styles.mealTypeButton,
        mealType === type && styles.mealTypeButtonSelected,
      ]}
      onPress={() => setMealType(type)}
    >
      <Text
        style={[
          styles.mealTypeText,
          mealType === type && styles.mealTypeTextSelected,
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  )

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          <Text style={styles.title}>Add Food Entry</Text>

          <View style={styles.mealTypeContainer}>
            <MealTypeButton title="Breakfast" type="breakfast" />
            <MealTypeButton title="Lunch" type="lunch" />
            <MealTypeButton title="Dinner" type="dinner" />
            <MealTypeButton title="Snack" type="snack" />
          </View>

          <TextInput
            style={styles.input}
            placeholder="Food Name"
            value={foodName}
            onChangeText={setFoodName}
          />

          <View style={styles.macroContainer}>
            <View style={styles.macroInput}>
              <Text style={styles.macroLabel}>Calories</Text>
              <TextInput
                style={[styles.input, styles.numberInput]}
                placeholder="0"
                value={calories}
                onChangeText={setCalories}
                keyboardType="numeric"
              />
            </View>

            <View style={styles.macroInput}>
              <Text style={styles.macroLabel}>Protein (g)</Text>
              <TextInput
                style={[styles.input, styles.numberInput]}
                placeholder="0"
                value={protein}
                onChangeText={setProtein}
                keyboardType="numeric"
              />
            </View>
          </View>

          <View style={styles.macroContainer}>
            <View style={styles.macroInput}>
              <Text style={styles.macroLabel}>Carbs (g)</Text>
              <TextInput
                style={[styles.input, styles.numberInput]}
                placeholder="0"
                value={carbs}
                onChangeText={setCarbs}
                keyboardType="numeric"
              />
            </View>

            <View style={styles.macroInput}>
              <Text style={styles.macroLabel}>Fat (g)</Text>
              <TextInput
                style={[styles.input, styles.numberInput]}
                placeholder="0"
                value={fat}
                onChangeText={setFat}
                keyboardType="numeric"
              />
            </View>
          </View>

          <TouchableOpacity
            style={styles.addButton}
            onPress={handleAddFood}
            disabled={isLoading}
          >
            <Text style={styles.addButtonText}>
              {isLoading ? "Adding..." : "Add Food Entry"}
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
  mealTypeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  mealTypeButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    backgroundColor: "#f0f0f0",
    borderWidth: 1,
    borderColor: "#ddd",
  },
  mealTypeButtonSelected: {
    backgroundColor: "#4CAF50",
    borderColor: "#4CAF50",
  },
  mealTypeText: {
    fontSize: 12,
    color: "#555",
  },
  mealTypeTextSelected: {
    color: "white",
  },
  input: {
    backgroundColor: "white",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 12,
    marginBottom: 15,
    fontSize: 16,
  },
  macroContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  macroInput: {
    width: "48%",
  },
  macroLabel: {
    fontSize: 14,
    marginBottom: 5,
    color: "#555",
  },
  numberInput: {
    textAlign: "center",
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

export default FoodTrackingScreen
