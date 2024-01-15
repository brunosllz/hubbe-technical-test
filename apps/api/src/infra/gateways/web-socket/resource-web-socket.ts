import { MakeConnectClientToResourceUseCase } from '@/infra/factories/make-connect-client-to-resource-use-case'
import { MakeDisconnectClientUseCase } from '@/infra/factories/make-disconnect-client'
import { MakeDisconnectClientFromResourceUseCase } from '@/infra/factories/make-disconnect-client-from-resource'
import { MakeGetStatusFromRecourseUseCase } from '@/infra/factories/make-get-status-from-resource'
import { resourceIo } from './server'

const event = {
  RESOURCE_STATUS: 'resource:status',
  RESOURCE_USER_CONNECTED: 'resource:user:connected',
  RESOURCE_USER_DISCONNECTED: 'resource:user:disconnected',
  ERROR: 'error',
}

resourceIo.on('connection', (socket) => {
  socket.on(
    event.RESOURCE_STATUS,
    async ({ resourceSlug }: { resourceSlug: string }, callback) => {
      // TODO: implement a guard to check if the params are valid.

      console.log(resourceSlug)
      if (!resourceSlug) {
        return socket.emit(event.ERROR, {
          message: 'Resource slug is required',
        })
      }

      const result = await MakeGetStatusFromRecourseUseCase().execute({
        resourceSlug,
      })

      if (result.isLeft()) {
        return socket.emit(event.ERROR, { message: result.value.message })
      }

      callback({ status: result.value.status })
    },
  )

  socket.on(
    event.RESOURCE_USER_CONNECTED,
    async ({ resourceSlug }: { resourceSlug: string }) => {
      if (!resourceSlug) {
        return socket.emit(event.ERROR, {
          message: 'Resource slug is required',
        })
      }

      const connectClientResult =
        await MakeConnectClientToResourceUseCase().execute({
          clientId: socket.id,
          resourceSlug,
        })

      if (connectClientResult.isLeft()) {
        return socket.emit(event.ERROR, {
          message: connectClientResult.value.message,
        })
      }

      const getStatusFromRecourseResult =
        await MakeGetStatusFromRecourseUseCase().execute({
          resourceSlug,
        })

      if (getStatusFromRecourseResult.isLeft()) {
        return socket.emit(event.ERROR, {
          message: getStatusFromRecourseResult.value.message,
        })
      }

      socket.broadcast.emit(event.RESOURCE_STATUS, {
        status: getStatusFromRecourseResult.value.status,
      })
    },
  )

  socket.on(
    event.RESOURCE_USER_DISCONNECTED,
    async ({ resourceSlug }: { resourceSlug: string }) => {
      if (!resourceSlug) {
        return socket.emit(event.ERROR, {
          message: 'Resource slug is required',
        })
      }

      const result = await MakeDisconnectClientFromResourceUseCase().execute({
        clientId: socket.id,
        resourceSlug,
      })

      if (result.isLeft()) {
        return socket.emit(event.ERROR, { message: result.value.message })
      }

      const getStatusFromRecourseResult =
        await MakeGetStatusFromRecourseUseCase().execute({
          resourceSlug,
        })

      if (getStatusFromRecourseResult.isLeft()) {
        return socket.emit(event.ERROR, {
          message: getStatusFromRecourseResult.value.message,
        })
      }

      socket.broadcast.emit(event.RESOURCE_STATUS, {
        status: getStatusFromRecourseResult.value.status,
      })
    },
  )

  socket.on('disconnect', async (reason) => {
    const result = await MakeDisconnectClientUseCase().execute({
      clientId: socket.id,
    })

    if (result.isLeft()) {
      return console.error({
        reason,
        message: result.value.message,
      })
    }

    socket.broadcast.emit(event.RESOURCE_STATUS, {
      status: result.value.status,
    })
  })
})
