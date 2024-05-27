import prisma from '../prismaClient.js'
import { getCipherFromText, getTextFromCipher } from '../jwt.js'

// model Client {
//   id      String         @id @unique @default(uuid())
//   name    String
//   email   String
//   phone   String
//   choices ClientChoice[]
//   userId  String
//   User    User           @relation(fields: [userId], references: [id])
// }

// hash name, email, phone

// search by email / name MAY be possible by hashing email / name first, then searching for hash
// need to experiment with the idea also for applicator searches

export const createClient = async () => {}

export const updateClient = async () => {}

export const deleteClient = async () => {}

export const createChoice = async () => {}

export const getChoice = async () => {}

export const updateChoice = async () => {}

export const deleteChoice = async () => {}

export const getClientsByUser = async () => {}

export const getclientById = async () => {}
