
'use client'

import { useUser } from '@clerk/nextjs'
import { Button } from './ui/button'

export function CreatePasskeyButton() {
  const { user ,isLoaded } = useUser()

  if(!isLoaded){
    return (
      <div>Loading...</div>
    )
  }

  const createClerkPasskey = async () => {
    try {
      const response = await user?.createPasskey()
      alert(response)
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      alert(err)
      console.log('Error:', err)
    }
  }

  return <Button onClick={createClerkPasskey}>Create a passkey now</Button>
}