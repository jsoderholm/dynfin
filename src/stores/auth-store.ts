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
  deleteUser: () => Promise<boolean>
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
  deleteUser: async () => {
    if (!auth.currentUser) {
      console.error('No user logged in');
      return false;
    }
    try {
      await firebaseDeleteUser(auth.currentUser);
      useAuthStore.setState({ user: null, saved: [] });
  
      console.log('User account deleted successfully');
      return true;
    } catch (error) {
      console.error('Error deleting user:', error);
      return false;
    }
  },
}))

onAuthStateChanged(auth, (user) => {
  useAuthStore.setState({ user })
})

export default useAuthStore
