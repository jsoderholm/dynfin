import { auth } from '@/lib/firebase'
import { User, onAuthStateChanged, signInWithEmailAndPassword, deleteUser as firebaseDeleteUser } from 'firebase/auth'
import { create } from 'zustand'

export type Credentials = {
  email: string
  password: string
}

export interface AuthState {
  user: User | null
  login: (credentials: Credentials) => Promise<boolean>
  logout: () => Promise<void>
  deleteUser: () => Promise<void>
  saved: {
    name: string
    symbol: string
  }[]
}

const useAuthStore = create<AuthState>()((_, get) => ({
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
  deleteUser: async () => {
    const user = get().user
    if (!user) {
      return
    }
    try {
      await firebaseDeleteUser(user)
      useAuthStore.setState({ user: null, saved: [] })
    } catch (error) {
      console.error('Error deleting user:', error)
    }
  },
}))

onAuthStateChanged(auth, (user) => {
  useAuthStore.setState({ user })
})

export default useAuthStore
