'use client'

import { useSignIn } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { Button } from './ui/button'
import { publicRoutes } from '@/Routes'

export function SignInWithPasskeyButton() {
  const { signIn , isLoaded,setActive } = useSignIn()
  const router = useRouter()

  if(!isLoaded){
    return (
      <div>Loading...</div>
    )
  }

  const signInWithPasskey = async () => {
    // 'discoverable' lets the user choose a passkey
    // without autofilling any of the options
    try {
      const signInAttempt = await signIn?.authenticateWithPasskey({
        flow: "discoverable",
      })

    //   alert(signInAttempt.userData)
    //   return
      if (signInAttempt?.status === "complete") {
        await setActive({
            session: signInAttempt.createdSessionId,
          });
          router.push(publicRoutes.dashboard);
      } else {
        alert(signInAttempt)
      }
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      alert(err)
    }
  }

  return <Button onClick={signInWithPasskey}>Sign in with a passkey</Button>
}