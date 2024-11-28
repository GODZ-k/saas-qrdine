'use client'

import { useUser } from '@clerk/nextjs'
import { useRef, useState } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'

export function DeletePasskeyUI() {
  const { user } = useUser()
  const passkeyToDeleteId = useRef<HTMLInputElement>(null)
  const [success, setSuccess] = useState(false)

  const deletePasskey = async () => {
    const passkeyToDelete = user?.passkeys?.find((pk: any) => pk.id === passkeyToDeleteId.current?.value)
    try {
      const response = await passkeyToDelete?.delete()
      alert(response)
      setSuccess(true)
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      alert(err)
      setSuccess(false)
    }
  }

  return (
    <>
      <p>Passkeys:</p>
      <ul className=' m-3'>
        {user?.passkeys?.map((pk: any) => {
          return (
            <li key={pk.id}>
              Name: {pk.name} | ID: {pk.id}
            </li>
          )
        })}
      </ul>
      <Input className=' w-96 m-3' ref={passkeyToDeleteId} type="text" placeholder="ID of passkey to delete" />
      <Button onClick={deletePasskey}>Delete passkey</Button>
      <p>Passkey deleted: {success ? 'Yes' : 'No'}</p>
    </>
  )
}