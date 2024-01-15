import { AsyncMaybe } from '@/core/logic/types/Maybe'
import { Client } from '../models/client'

export interface ClientDAO {
  findById(props: { id: string }): AsyncMaybe<Client>
}
