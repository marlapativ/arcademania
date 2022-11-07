import { IUser } from '../../types/models/user-types';
import { User } from '../../models/index';

export const createUser = async (user: IUser) => {
    const newUser = new User(user);
    return newUser.save();
}