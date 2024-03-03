import { User } from 'firebase/auth'
import { create } from 'zustand'

interface AuthState {
  user: User | null
}

const useAuthStore = create<AuthState>()(() => ({
  user: null,
}))

export default useAuthStore
