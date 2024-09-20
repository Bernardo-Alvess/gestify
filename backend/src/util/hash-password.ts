import bcrypt from 'bcrypt';

const salt = 12;

const hashPassword = (password: string) => {
    return bcrypt.hashSync(password, salt)
}

export { hashPassword }