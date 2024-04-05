import { QueryDocumentSnapshot, collection, doc, getDoc, setDoc } from 'firebase/firestore'
import { db } from './firebase'
import { FirestoreDataConverter } from 'firebase/firestore'
import { CompanyProfile } from './api/finage'
import { AuthState } from '@/stores/auth-store'
import { UserCredential } from 'firebase/auth'

type UserData = {
  uid: string
  saved: AuthState['saved']
}

const companyProfileConverter: FirestoreDataConverter<CompanyProfile> = {
  toFirestore: (data: CompanyProfile) => data,
  fromFirestore: (snap: QueryDocumentSnapshot) => snap.data() as CompanyProfile,
}

const userConverter: FirestoreDataConverter<UserData> = {
  toFirestore: (data: UserData) => data,
  fromFirestore: (snap: QueryDocumentSnapshot) => snap.data() as UserData,
}

const firestore = {
  companies: collection(db, 'companies').withConverter(companyProfileConverter),
  users: collection(db, 'users').withConverter(userConverter),
}

export async function getCompanyProfileFromFirestore(symbol: string) {
  const docRef = doc(firestore.companies, symbol)
  return await getDoc(docRef)
}

export async function saveCompanyProfileToFirestore(symbol: string, data: CompanyProfile) {
  const docRef = doc(firestore.companies, symbol)
  await setDoc(docRef, data)
}

export async function createUserInFirestore(credentials: UserCredential, data: UserData) {
  const docRef = doc(firestore.users, credentials.user.uid)
  await setDoc(docRef, data)
}
