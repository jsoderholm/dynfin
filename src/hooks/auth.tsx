import { createUser, signInUser, signInUserGitHub, signInUserGoogle } from '@/lib/auth'
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

export { useCreateUser, useSignInUser, useGoogleSignIn, useGitHubSignIn }
