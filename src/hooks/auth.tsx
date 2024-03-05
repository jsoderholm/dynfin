import { createUser, signInUser, signInUserGitHub, signInUserGoogle, signOutUser } from '@/lib/auth'
import { useMutation } from '@tanstack/react-query'

function useCreateUser() {
  return useMutation({ mutationFn: createUser })
}

function useSignInUser() {
  return useMutation({ mutationFn: signInUser })
}

function useGoogleSignIn() {
  return useMutation({ mutationFn: signInUserGoogle })
}

function useGitHubSignIn() {
  return useMutation({ mutationFn: signInUserGitHub })
}

function useSignOutUser() {
  return useMutation({ mutationFn: signOutUser })
}

export { useCreateUser, useSignInUser, useSignOutUser, useGoogleSignIn, useGitHubSignIn }
