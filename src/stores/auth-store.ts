import { auth } from '@/lib/firebase'
import { User, signInWithEmailAndPassword } from 'firebase/auth'
import { create } from 'zustand'

export type Credentials = {
  email: string
  password: string
}

interface AuthState {
  user: User | null
  login: (credentials: Credentials) => void
  saved: string[]
}

const useAuthStore = create<AuthState>()(() => ({
  user: auth.currentUser,
  login: async (credentials: Credentials) => {
    const { email, password } = credentials
    await signInWithEmailAndPassword(auth, email, password)
      .then()
      .catch((e) => {
        console.log(e)
      })
  },
  saved: [],
}))

export default useAuthStore
