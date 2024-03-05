import {
  Auth,
  GithubAuthProvider,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from 'firebase/auth'

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

function signOutUser(auth: Auth) {
  return auth.signOut()
}

function signInUserGoogle(auth: Auth) {
  const provider = new GoogleAuthProvider()
  auth.languageCode = 'en'
  return signInWithPopup(auth, provider)
}

function signInUserGitHub(auth: Auth) {
  const provider = new GithubAuthProvider()
  auth.languageCode = 'en'
  return signInWithPopup(auth, provider)
}

export { signInUser, createUser, signOutUser, signInUserGoogle, signInUserGitHub }
