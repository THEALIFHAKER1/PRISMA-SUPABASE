import { PrismaClient } from '@prisma/client'
import { equal } from 'node:assert'
import { skip } from 'node:test'
const prisma = new PrismaClient(
    // log all queries that are sent to the database
    // {log: ['query']}
)

async function main() {
    // delete all users
    // many = delete all users
    await prisma.user.deleteMany()


/* start */
    // create a new user
    //many = array of objects
    const user = await prisma.user.createMany({
        data: [{
            name: "kyle",
            email: "test@test.com",
            age: 27,
            // only available if use create
            // userPreference: {
            //     create: {
            //         emailUpdates: true,
            //     },
            // },
        }, {
            name: "sally",
            email: "helo@gmail.com",
            age: 30,
        }
    ],
        //log either include or select = (cant use on many)
        // include: {
        //     userPreference: true,
        // },
        // select: {
        //     name: true,
        //     userPreference: { select: { id: true } },
        // },
    })
    console.log(user)
/* end */

/* start */
    // find user
    //unique = find user using unique key
    //findfirst = find first user
    //findMany = find all users
    const FindUser = await prisma.user.findUnique({
        where: {
            // OR = ||
            // AND = &&
            // NOT = !   
        age_name: {
            age: 27,
            name: "kyle",
            // not or equal = basicly if else
            // notIn or in = all in array
            // ls or gt = less than or greater than
            //contains = if contains
            //endsWith or startWith = if ends with or start with
        },
        // distinct: ['age', 'name'], //only return all user that has unique age and name
        // take: 2, //only return 2 users
        // skip: 1, //skip first user
        // orderBy: { age: 'desc' } //order by age descending
        }
    })
    console.log(FindUser)
/* end */

/* start */
    // update user
    //updateMany = update many users
    const UpdateUser = await prisma.user.update({
        where: {
            email: "test@test.com"
        },
        data: {
            email: "kyle@gmail.com"
        }
        // connect or disconnect = connect or disconnect to other table
    })
    console.log(UpdateUser)
/* end */
}

main()
    .catch(e => {
        console.error(e.message)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
