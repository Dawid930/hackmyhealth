// User related types
export interface User {
  id: string
  email: string
  username?: string
  fullName?: string
  dateOfBirth?: string
  heightCm?: number
  weightKg?: number
  createdAt?: string
  updatedAt?: string
}

// Food tracking related types
export interface FoodEntry {
  id: string
  userId: string
  name: string
  calories?: number
  protein?: number
  carbs?: number
  fat?: number
  date: string
  mealType?: "breakfast" | "lunch" | "dinner" | "snack"
  createdAt: string
}

// Health metrics related types
export interface HealthMetric {
  id: string
  userId: string
  metricType: string
  value: number
  unit: string
  date: string
  createdAt: string
}

// Authentication related types
export interface AuthState {
  isLoggedIn: boolean
  user: User | null
  loading: boolean
  error: string | null
}
