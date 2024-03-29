import { auth } from '@/lib/firebase'
import { User, onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth'
import { create } from 'zustand'

export type Credentials = {
  email: string
  password: string
}

export interface AuthState {
  user: User | null
  login: (credentials: Credentials) => Promise<boolean>
  logout: () => Promise<void>
  saved: string[]
}

const useAuthStore = create<AuthState>()(() => ({
  user: null,
  login: async (credentials: Credentials) => {
    const { email, password } = credentials
    try {
      await signInWithEmailAndPassword(auth, email, password)
      return true
    } catch (e) {
      console.error(e)
      return false
    }
  },
  logout: async () => {
    try {
      await auth.signOut()
    } catch (error) {
      console.error('Logout failed:', error)
      throw error
    }
  },
  saved: [],
}))

onAuthStateChanged(auth, (user) => {
  useAuthStore.setState({ user })
})

export default useAuthStore
