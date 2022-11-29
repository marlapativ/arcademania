import bcrypt from 'bcryptjs';

const salt = bcrypt.genSaltSync(10);

export const hashPassword = (password: string) : Promise<string> => {
    return bcrypt.hash(password, salt);
}

export const comparePassword = (hashedPassword: string, password: string) : Promise<boolean> => {
    return bcrypt.compare(password, hashedPassword);
}