import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  await prisma.client.deleteMany()
  await prisma.resource.deleteMany()

  await prisma.resource.create({
    data: {
      name: 'Secret screen',
      slug: 'secret-screen',
      availableConnectionsAmount: 1,
    },
  })

  const resource = await prisma.resource.findMany({
    include: { connectedClients: true },
  })
  const client = await prisma.client.findMany({})

  console.log({ resource, client })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    // eslint-disable-next-line no-console
    console.error(e)

    await prisma.$disconnect()
    process.exit(1)
  })
