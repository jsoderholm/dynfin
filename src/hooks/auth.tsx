import { createUser, signInUser, signInUserGitHub, signOutUser } from '@/lib/auth'
import { useMutation } from '@tanstack/react-query'

function useCreateUser() {
  return useMutation({ mutationFn: createUser })
}

function useSignInUser() {
  return useMutation({ mutationFn: signInUser })
}

function useGitHubSignIn() {
  return useMutation({ mutationFn: signInUserGitHub })
}

function useSignOutUser() {
  return useMutation({ mutationFn: signOutUser })
}

export { useCreateUser, useSignInUser, useSignOutUser, useGitHubSignIn }
