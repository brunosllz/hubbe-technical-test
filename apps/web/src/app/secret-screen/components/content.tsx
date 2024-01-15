'use client'

import { socket } from '@/libs/socket-io'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export function Content() {
  const router = useRouter()

  useEffect(() => {
    socket.emit('user:connected', {}, ({ error }: { error: string }) => {
      if (error) {
        router.back()
      }
    })

    return () => {
      socket.emit('user:disconnected')
    }
  }, [])

  return (
    <div>
      <h1>Content</h1>
    </div>
  )
}
