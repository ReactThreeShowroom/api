import { exec } from 'child_process'
import { promisify } from 'util'
import users from '../data.json' assert { type: 'json' }
import prisma from '../prismaClient.js'
const execPromise = promisify(exec)

export async function triggerMigrateAndReset() {
  try {
    console.log('Starting to drop tables and rebuild...')
    const { stdout } = await execPromise(`prisma migrate reset --force --skip-seed --skip-generate`)
    console.log('\n' + stdout)

    console.log('Finished dropping tables and rebuilding!')
  } catch (error) {
    console.error('Error dropping tables!')
    throw error
  }
}

export async function createInitialUsers() {
  try {
    // code for making our first users here
    for (let user of users) {
      await prisma.user.create({
        data: user
      })
    }
    return console.log('Users Finished being Made')
  } catch (error) {
    console.log('Error making users')
    console.error(error)
  }
}

export async function rebuildDB() {
  try {
    await triggerMigrateAndReset()
    await createInitialUsers()
    return 'success'
  } catch (error) {
    console.log('Error during rebuildDB')
    console.error(error)
  }
}
