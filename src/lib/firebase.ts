import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyA_QJWn5o7-Rd9mddxzOflKCYR8DOOsTn0',
  authDomain: 'dynfin-b9ddc.firebaseapp.com',
  projectId: 'dynfin-b9ddc',
  storageBucket: 'dynfin-b9ddc.appspot.com',
  messagingSenderId: '91762702683',
  appId: '1:91762702683:web:d4d49322d9dfe1034e427e',
}

export const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
