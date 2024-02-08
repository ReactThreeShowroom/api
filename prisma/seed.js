import { users } from '../data.js'
import prisma from '../prismaClient.js'

async function main() {
    for (let user of users) {
        await prisma.user.create({
            data: user
        })
    }
}

main().catch(e => {
    console.log(e)
    process.exit(1)
}).finally(() => {
    prisma.$disconnect();
})