import bcrypt from 'bcrypt'

const saltRounds = 10

class PasswordHasher {

  hash = async (password: string) => {
    return bcrypt.hash(password, saltRounds)
  }

  compare = async (plainPassword: string, hashedPassword: string ) => {
    return bcrypt.compare(plainPassword, hashedPassword)
  }

}

export const passwordHasher = new PasswordHasher()
