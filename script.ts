import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
    // delete all users
    await prisma.user.deleteMany()
    // create a new user
    const user = await prisma.user.create({
        data: {
            name: "Kyle",
            email: "test@test.com",
            age: 30,
            userPreferences {
                create
            }
        },
    })
    console.log(user)
}

main()
    .catch(e => {
        console.error(e.message)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
