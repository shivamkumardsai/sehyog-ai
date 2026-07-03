const { PrismaClient } = require('@prisma/client')
;(async () => {
  const prisma = new PrismaClient()
  try {
    const chats = await prisma.chat.findMany({ where: { userId: 'shivam' }, orderBy: { timestamp: 'desc' }, take: 10 })
    console.log(JSON.stringify(chats, null, 2))
  } catch (e) {
    console.error('Error querying chats:', e)
    process.exitCode = 2
  } finally {
    await prisma.$disconnect()
  }
})()
