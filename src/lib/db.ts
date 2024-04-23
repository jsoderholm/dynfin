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

export async function addCompanyToSaved(uid: string, companySymbol: string) {
  const userRef = doc(firestore.users, uid)
  const docSnap = await getDoc(userRef)

  if (docSnap.exists()) {
    const userData: UserData = docSnap.data() as UserData
    const updatedSaved = [...userData.saved, companySymbol]
    await setDoc(userRef, { ...userData, saved: updatedSaved }, { merge: true })
  } else {
    console.log('User not found, cannot add saved company.')
  }
}

export async function removeCompanyFromSaved(uid: string, companySymbol: string) {
  const userRef = doc(firestore.users, uid)
  const docSnap = await getDoc(userRef)

  if (docSnap.exists()) {
    const userData: UserData = docSnap.data() as UserData
    const updatedSaved = userData.saved.filter((sym) => sym !== companySymbol) // Filter out the symbol
    await setDoc(userRef, { ...userData, saved: updatedSaved }, { merge: true })
  } else {
    console.log('User not found, cannot remove saved company.')
  }
}

export const fetchSavedCompanies = async (uid: string) => {
  const userRef = doc(firestore.users, uid)
  const docSnap = await getDoc(userRef)
  if (docSnap.exists() && docSnap.data().saved) {
    const userData = docSnap.data() as UserData // Type assertion for better type safety
    return userData.saved || []
  } else {
    console.error('No such user or no saved data found')
    return []
  }
}
