import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'

interface AuthProps {
  auth: Auth
  email: string
  password: string
}

function createUser({ auth, email, password }: AuthProps) {
  return createUserWithEmailAndPassword(auth, email, password)
}

function signInUser({ auth, email, password }: AuthProps) {
  return signInWithEmailAndPassword(auth, email, password)
}

export { signInUser, createUser }
