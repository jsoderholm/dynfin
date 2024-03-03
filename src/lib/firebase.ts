import { FirebaseApp, initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { Auth, getAuth } from 'firebase/auth'

let app: FirebaseApp
export const initializeFirebase = () => {
  try {
    app = initializeApp({
      apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
      authDomain: import.meta.env.VITE_FIREBASE_AUTHDOMAIN,
      projectId: import.meta.env.VITE_FIREBASE_PROJECTID,
      storageBucket: import.meta.env.VITE_FIREBASE_STORAGEBUCKET,
      messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGINGSENDERID,
      appId: import.meta.env.VITE_FIREBASE_APPID,
    })
  } catch (e) {
    console.log(e)
  }
}

let auth: Auth
let db: ReturnType<typeof getFirestore>

export const useAuth = () => {
  auth = getAuth(app)
  return auth
}
export const useFirestore = () => {
  if (!db) db = getFirestore(app)
  return db
}
