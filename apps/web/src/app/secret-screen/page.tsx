import { socket } from '@/libs/socket-io'
import { useEffect } from 'react'
import { Content } from './components/content'

export default function SecretScreen() {
  return (
    <div>
      <Content />
    </div>
  )
}
