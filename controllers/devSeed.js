import { exec } from 'child_process'
import { promisify } from 'util'
import prisma from '../prismaClient.js'
import { getCipherFromText, hashPass } from '../jwt.js'
import { createUser, userUncipher } from '../db/user.js'
import { createColor, createModel, createPiece } from '../db/favorite.js'

const execPromise = promisify(exec)

export async function triggerMigrateAndReset() {
  try {
    console.log('Starting to drop tables and rebuild...')
    const { stdout } = await execPromise(`prisma migrate reset --force --skip-seed`)
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

export async function seedInitialUsers() {
  try {
    // code for making our first test users here
    const { default: users } = await import('../assets/users.json', {
      with: { type: 'json' }
    })
    for (let user of users) {
      const { password, email, username } = user

      if (!password || !username || !email) throw missingCredentials

      const name = getCipherFromText(user.name ? user.name : email.slice(0, email.indexOf('@')))
      const phone = getCipherFromText(user.phone ? user.phone : 'nothing')
      userUncipher(
        await prisma.user.create({
          data: {
            name,
            email: getCipherFromText(email),
            username,
            password: await hashPass(password),
            phone,
            admin: user.admin,
            active: user.active
          }
        })
      )
    }
    return console.log('Finished Creating Users'), 'Finished Creating Users'
  } catch (error) {
    console.log('Error making users')
    console.error(error)
    return 'Error making users'
  }
}

export async function seedAdmin() {
  try {
    let dev = await createUser(JSON.parse(process.env.DEV_DETAILS))
    dev = await prisma.user.update({ where: { id: dev.id }, data: { admin: true } })
    let owner = await createUser(JSON.parse(process.env.OWNER_DETAILS))
    owner = await prisma.user.update({ where: { id: owner.id }, data: { admin: true } })
    return console.log('Finished Seeding Admin Users'), 'Finished Seeding Admin Users'
  } catch (err) {
    console.log('Error Seeding Admin Users')
    return 'Error Seeding Admin Users'
  }
}

export async function seedColors() {
  try {
    const { default: colorList } = await import('../assets/colorList.json', {
      with: { type: 'json' }
    })
    const colorsDB = await Promise.all(colorList.map((color) => createColor(color)))
    return console.log('Finished Creating Colors'), 'Finished Creating Colors'
  } catch (err) {
    console.log('Error loading colors')
    return 'Error loading colors'
  }
}

export async function seedModels() {
  try {
    const modelsDB = await Promise.all(
      [
        { name: 'AR-15', path: 'AR15', type: 'Rifle', subtype: 'Semi-Automatic' },
        { name: 'Remington 870', path: 'Remington870', type: 'Shotgun', subtype: 'Pump' },
        { name: 'Glock 19', path: 'Glock19', type: 'Pistol', subtype: 'Semi-Automatic' }
      ].map((model) => createModel(model))
    )
    return console.log('Finished Creating Models'), 'Finished Creating Models'
  } catch (error) {
    console.log('Error creating Models')
    return 'Error creating Models'
  }
}

// rebuild lost seedPieces()

export async function seedPieces() {
  try {
    const { default: modelPieces } = await import('../assets/modelPieces.json', {
      with: { type: 'json' }
    })
    const piecesDB = await Promise.all(modelPieces.map((piece) => createPiece(piece)))
    return console.log('Finished Creating Pieces'), 'Finished Creating Pieces'
  } catch (error) {
    console.log('Error creating Pieces')
    return 'Error creating Pieces'
  }
}

export async function rebuildDB() {
  try {
    await triggerMigrateAndReset()
    let result = await seedInitialUsers()
    if (result === 'Error making users') return 'failed making users'
    result = await seedAdmin()
    if (result === 'Error Seeding Admin Users') return 'Error Seeding Admin Users'
    result = await seedColors()
    if (result === 'Error loading colors') return 'failed loading colors'
    result = await seedModels()
    if (result === 'Error creating Models') return 'failed creating Models'
    result = await seedPieces()
    if (result === 'Error creating Pieces') return 'failed creating Pieces'
    return 'success'
  } catch (error) {
    console.log('Error during rebuildDB')
    console.error(error)
  }
}
