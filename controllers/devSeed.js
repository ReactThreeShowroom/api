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

export async function triggerInitMigrate() {
  try {
    console.log('Creating initial migration')
    const { stdout } = await execPromise(`npx prisma migrate dev --name init`)
    console.log('\n' + stdout)
    console.log('Finished creating initial migration')
  } catch (err) {
    console.error(err)
    throw err
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
    return console.log('Users Finished being Made'), 'Users Finished being Made'
  } catch (error) {
    console.log('Error making users')
    console.error(error)
    return 'Error making users'
  }
}

export async function rebuildDB() {
  try {
    await triggerMigrateAndReset()
    const result = await createInitialUsers()
    if (result === 'Error making users') return 'failed'
    return 'success'
  } catch (error) {
    console.log('Error during rebuildDB')
    console.error(error)
  }
}
