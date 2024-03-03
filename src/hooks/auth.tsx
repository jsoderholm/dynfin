import { createUser, signInUser } from '@/lib/auth'
import { useMutation } from '@tanstack/react-query'

function useCreateUser() {
  return useMutation({ mutationFn: createUser })
}

function useSignInUser() {
  return useMutation({ mutationFn: signInUser })
}

export { useCreateUser, useSignInUser }
