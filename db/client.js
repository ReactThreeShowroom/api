// model Client {
//   id      String         @id @unique @default(uuid())
//   name    String
//   email   String
//   phone   String
//   choices ClientChoice[]
//   userId  String
//   User    User           @relation(fields: [userId], references: [id])
// }
