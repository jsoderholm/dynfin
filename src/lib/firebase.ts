import { FirebaseApp, initializeApp } from 'firebase/app'
import { connectFirestoreEmulator, getFirestore } from 'firebase/firestore'
import { Auth, connectAuthEmulator, getAuth } from 'firebase/auth'

const useEmulator = import.meta.env.MODE === 'development'

let app: FirebaseApp
let auth: Auth
let db: ReturnType<typeof getFirestore>
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

    auth = getAuth(app)
    db = getFirestore(app)

    if (useEmulator) {
      connectAuthEmulator(auth, 'http://localhost:9099', { disableWarnings: true })
      connectFirestoreEmulator(db, 'localhost', 8080)
    }
  } catch (e) {
    console.log(e)
  }
}

export const useAuth = () => {
  auth = getAuth(app)
  return auth
}

export const useFirestore = () => {
  db = getFirestore(app)
  return db
}
