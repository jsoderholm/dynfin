import { signInUserGitHub } from '@/lib/auth'
import { auth } from '@/lib/firebase'
import useAuthStore from '@/stores/auth-store'
import AuthenticationView from '@/views/authentication-view'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from '@tanstack/react-router'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { create } from 'zustand'

export const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
})

interface UserLoginModalState {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const useModalStore = create<UserLoginModalState>((set) => ({
  open: false,
  onOpenChange: (open: boolean) => set({ open }),
}))

const AuthenticationPresenter = () => {
  const navigate = useNavigate()
  const login = useAuthStore((state) => state.login)
  const { open, onOpenChange } = useModalStore()

  const registerForm = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
  })

  const loginForm = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
  })

  async function onLogin(values: z.infer<typeof schema>) {
    const { email, password } = values
    const success = await login({ email, password })
    if (!success) return
    navigate({ to: '/' })
  }

  async function onRegister(values: z.infer<typeof schema>) {
    const { email, password } = values

    try {
      await createUserWithEmailAndPassword(auth, email, password)
      navigate({ to: '/' })
    } catch (e) {
      console.error(e)
    }
  }

  async function onGitHub() {
    try {
      await signInUserGitHub(auth)
      navigate({ to: '/' })
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <AuthenticationView
      registerForm={registerForm}
      loginForm={loginForm}
      onLogin={onLogin}
      onRegister={onRegister}
      onGitHub={onGitHub}
      open={open}
      onOpenChange={onOpenChange}
    />
  )
}

export default AuthenticationPresenter
