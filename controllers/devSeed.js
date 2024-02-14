import { exec } from 'child_process'
import { promisify } from 'util'
const execPromise = promisify(exec)

export async function triggerMigrateAndReset() {
  try {
    console.log('Starting to drop tables and rebuild...')
    // // have to make sure to drop in correct order
    // const tables = ['post_tags', 'tags', 'posts', 'users']
    // for (const table of tables) {
    //   await prisma.$queryRawUnsafe(`DROP TABLE IF EXISTS ${table};`)
    // }
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
