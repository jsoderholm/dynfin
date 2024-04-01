import { QueryDocumentSnapshot, collection, doc, getDoc, setDoc } from 'firebase/firestore'
import { db } from './firebase'
import { FirestoreDataConverter } from 'firebase/firestore'
import { CompanyProfile } from './api/finage'

const companyProfileConverter: FirestoreDataConverter<CompanyProfile> = {
  toFirestore: (data: CompanyProfile) => data,
  fromFirestore: (snap: QueryDocumentSnapshot) => snap.data() as CompanyProfile,
}

const firestore = {
  companies: collection(db, 'companies').withConverter(companyProfileConverter),
}

export async function getCompanyProfileFromFirestore(symbol: string) {
  const docRef = doc(firestore.companies, symbol)
  return await getDoc(docRef)
}

export async function saveCompanyProfileToFirestore(symbol: string, data: CompanyProfile) {
  const docRef = doc(firestore.companies, symbol)
  await setDoc(docRef, data)
}
