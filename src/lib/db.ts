import { QueryDocumentSnapshot, collection, doc, getDoc, setDoc } from 'firebase/firestore'
import { db } from './firebase'
import { FirestoreDataConverter } from 'firebase/firestore'
import { CompanyProfile, GraphInfo } from './api/finage'
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

const graphConverter: FirestoreDataConverter<GraphInfo> = {
  toFirestore: (data: GraphInfo) => data,
  fromFirestore: (snap: QueryDocumentSnapshot) => snap.data() as GraphInfo,
}

const firestore = {
  companies: collection(db, 'companies').withConverter(companyProfileConverter),
  graphs: collection(db, 'graphs').withConverter(graphConverter),
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

export async function getGraphInfoFromFirestore(symbol: string) {
  const docRef = doc(firestore.graphs, symbol)
  return await getDoc(docRef)
}

export async function saveGraphInfoToFirestore(data: GraphInfo) {
  const { symbol } = data
  const docRef = doc(firestore.graphs, symbol)
  await setDoc(docRef, { ...data })
}

export async function createUserInFirestore(credentials: UserCredential, data: UserData) {
  const docRef = doc(firestore.users, credentials.user.uid)
  const docSnap = await getDoc(docRef)

  if (docSnap.exists()) {
    return
  }

  await setDoc(docRef, data)
}
