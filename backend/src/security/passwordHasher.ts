import bcrypt from 'bcrypt'

const saltRounds = 10

export const passwordHasher_hash = async (password: string) => {
  return bcrypt.hash(password, saltRounds)
}

export const passwordHasher_compare = async (plainPassword: string, hashedPassword: string) => {
  return bcrypt.compare(plainPassword, hashedPassword)
}
