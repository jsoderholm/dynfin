import { signInUserGitHub } from '@/lib/auth'
import { createUserInFirestore } from '@/lib/db'
import { auth } from '@/lib/firebase'
import useAuthStore from '@/stores/auth-store'
import AuthenticationView from '@/views/authentication-view'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from '@tanstack/react-router'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { create } from 'zustand'

export const AuthFormSchema = z.object({
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
  const [loadingAuthAction, setLoadingAuthAction] = useState(false)

  const registerForm = useForm<z.infer<typeof AuthFormSchema>>({
    resolver: zodResolver(AuthFormSchema),
  })

  const loginForm = useForm<z.infer<typeof AuthFormSchema>>({
    resolver: zodResolver(AuthFormSchema),
  })

  async function onLogin(values: z.infer<typeof AuthFormSchema>) {
    const { email, password } = values
    setLoadingAuthAction(true)
    const success = await login({ email, password })
    setLoadingAuthAction(false)
    if (!success) return
    navigate({ to: '/' })
  }

  async function onRegister(values: z.infer<typeof AuthFormSchema>) {
    const { email, password } = values

    try {
      setLoadingAuthAction(true)
      await createUserWithEmailAndPassword(auth, email, password).then((credentials) =>
        createUserInFirestore(credentials, { uid: credentials.user.uid, saved: [] }),
      )
      navigate({ to: '/' })
    } catch (e) {
      console.error(e)
    } finally {
      setLoadingAuthAction(false)
    }
  }

  async function onGitHub() {
    try {
      setLoadingAuthAction(true)
      await signInUserGitHub(auth).then((credentials) =>
        createUserInFirestore(credentials, { uid: credentials.user.uid, saved: [] }),
      )
      navigate({ to: '/' })
    } catch (e) {
      console.error(e)
    } finally {
      setLoadingAuthAction(false)
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
      loading={loadingAuthAction}
    />
  )
}

export default AuthenticationPresenter
