'use client'

import { resourceSocketClient } from '@/libs/socket-io'
import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export function Content() {
  const [isLoading, setIsLoading] = useState(true)

  const router = useRouter()

  useEffect(() => {
    resourceSocketClient.emit('resource:user:connected', {
      resourceSlug: 'secret-screen',
    })

    resourceSocketClient.on('error', ({ message }: { message: string }) => {
      console.error(message)

      router.push('/')
    })

    setIsLoading(false)

    return () => {
      resourceSocketClient.emit('resource:user:disconnected', {
        resourceSlug: 'secret-screen',
      })
    }
  }, [])

  if (isLoading) {
    return (
      <div className="w-full flex items-center justify-center">
        <Loader2 size={60} className="animate-spin" />
      </div>
    )
  }

  return (
    <div className="space-y-10">
      <h1>Tela secreta</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="w-full h-20 rounded-lg bg-zinc-600 animate-pulse"
          />
        ))}
      </div>
    </div>
  )
}
