import bcrypt from 'bcryptjs';

const salt = bcrypt.genSaltSync(10);

export const hashPassword = async (password: string) => {
    return bcrypt.hash(password, salt);
}

export const comparePassword = async (userPassword: string, password: string) => {
    return bcrypt.compare(userPassword, password);
}