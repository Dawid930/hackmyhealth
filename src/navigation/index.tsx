import React from "react"
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { useAuth } from "@hooks/useAuth"

// Import screens (we'll create these soon)
import SignInScreen from "@screens/auth/SignInScreen"
import SignUpScreen from "@screens/auth/SignUpScreen"
import HomeScreen from "@screens/HomeScreen"
import FoodTrackingScreen from "@screens/FoodTrackingScreen"
import HealthMetricsScreen from "@screens/HealthMetricsScreen"
import ProfileScreen from "@screens/ProfileScreen"

// Define navigation types
export type AuthStackParamList = {
  SignIn: undefined
  SignUp: undefined
}

export type MainTabParamList = {
  Home: undefined
  FoodTracking: undefined
  HealthMetrics: undefined
  Profile: undefined
}

// Create navigation stacks/tabs
const AuthStack = createNativeStackNavigator<AuthStackParamList>()
const MainTab = createBottomTabNavigator<MainTabParamList>()

// Auth navigator
const AuthNavigator = () => {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen
        name="SignIn"
        component={SignInScreen}
        options={{ title: "Sign In" }}
      />
      <AuthStack.Screen
        name="SignUp"
        component={SignUpScreen}
        options={{ title: "Sign Up" }}
      />
    </AuthStack.Navigator>
  )
}

// Main app navigator
const MainNavigator = () => {
  return (
    <MainTab.Navigator>
      <MainTab.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: "Dashboard" }}
      />
      <MainTab.Screen
        name="FoodTracking"
        component={FoodTrackingScreen}
        options={{ title: "Food Tracking" }}
      />
      <MainTab.Screen
        name="HealthMetrics"
        component={HealthMetricsScreen}
        options={{ title: "Health Metrics" }}
      />
      <MainTab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ title: "Profile" }}
      />
    </MainTab.Navigator>
  )
}

// Root navigator that handles auth state
export const AppNavigator = () => {
  const { authState, loading } = useAuth()

  // Show loading screen if auth state is being determined
  if (loading) {
    return null // We'll create a proper loading component later
  }

  return (
    <NavigationContainer>
      {authState.isLoggedIn ? <MainNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  )
}
