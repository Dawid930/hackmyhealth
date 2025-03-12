import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react"
import { supabase } from "../services/supabase"
import { User, AuthState } from "../types"

// Create a context for authentication
const AuthContext = createContext<{
  authState: AuthState
  signUp: (email: string, password: string) => Promise<void>
  signIn: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
  loading: boolean
}>({
  authState: { isLoggedIn: false, user: null, loading: true, error: null },
  signUp: async () => {},
  signIn: async () => {},
  signOut: async () => {},
  loading: true,
})

// Provider component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authState, setAuthState] = useState<AuthState>({
    isLoggedIn: false,
    user: null,
    loading: true,
    error: null,
  })
  const [loading, setLoading] = useState(true)

  // Check for existing session on mount
  useEffect(() => {
    const checkSession = async () => {
      try {
        const { data, error } = await supabase.auth.getSession()

        if (error) {
          throw error
        }

        if (data?.session) {
          const { data: userData } = await supabase.auth.getUser()
          setAuthState({
            isLoggedIn: true,
            user: userData.user as User,
            loading: false,
            error: null,
          })
        } else {
          setAuthState({
            isLoggedIn: false,
            user: null,
            loading: false,
            error: null,
          })
        }
      } catch (error) {
        console.error("Error checking session:", error)
        setAuthState({
          isLoggedIn: false,
          user: null,
          loading: false,
          error: "Failed to check authentication status",
        })
      } finally {
        setLoading(false)
      }
    }

    checkSession()

    // Set up auth state change listener
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === "SIGNED_IN" && session) {
          const { data } = await supabase.auth.getUser()
          setAuthState({
            isLoggedIn: true,
            user: data.user as User,
            loading: false,
            error: null,
          })
        } else if (event === "SIGNED_OUT") {
          setAuthState({
            isLoggedIn: false,
            user: null,
            loading: false,
            error: null,
          })
        }
      }
    )

    return () => {
      if (authListener && authListener.subscription) {
        authListener.subscription.unsubscribe()
      }
    }
  }, [])

  // Sign up function
  const signUp = async (email: string, password: string) => {
    try {
      setLoading(true)
      const { error } = await supabase.auth.signUp({ email, password })

      if (error) {
        throw error
      }

      // Note: User is not automatically signed in after sign up due to email confirmation
      setAuthState((prev) => ({
        ...prev,
        error: null,
      }))
    } catch (error: any) {
      setAuthState((prev) => ({
        ...prev,
        error: error.message || "An error occurred during sign up",
      }))
    } finally {
      setLoading(false)
    }
  }

  // Sign in function
  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true)
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        throw error
      }

      // Auth state will be updated by the listener
    } catch (error: any) {
      setAuthState((prev) => ({
        ...prev,
        error: error.message || "An error occurred during sign in",
      }))
    } finally {
      setLoading(false)
    }
  }

  // Sign out function
  const signOut = async () => {
    try {
      setLoading(true)
      const { error } = await supabase.auth.signOut()

      if (error) {
        throw error
      }

      // Auth state will be updated by the listener
    } catch (error: any) {
      setAuthState((prev) => ({
        ...prev,
        error: error.message || "An error occurred during sign out",
      }))
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthContext.Provider
      value={{ authState, signUp, signIn, signOut, loading }}
    >
      {children}
    </AuthContext.Provider>
  )
}

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
