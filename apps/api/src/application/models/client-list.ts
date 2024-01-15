import { WatchedList } from '@/core/logic/watched-list'

import { Client } from './client'

export class ClientList extends WatchedList<Client> {
  compareItems(a: Client, b: Client): boolean {
    return a.id === b.id
  }
}
