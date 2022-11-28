import validator from 'validator';
import passwordValidator from 'password-validator';

export const isValidEmail = (email: string) => {
    if (validator.isEmail(email)) {
        return true;
    }
    return false;
}

export const isValidPassword = (password: string) => {
    return passwordValidatorSchema.validate(password);
}

const passwordValidatorSchema = new passwordValidator();
passwordValidatorSchema
    .is().min(8)                                    // Minimum length 8
    .is().max(100)                                  // Maximum length 100
    .has().uppercase(1)                             // Must have uppercase letters
    .has().lowercase(1)                             // Must have lowercase letters
    .has().digits(1)                                // Must have at least 2 digits
    .has().symbols()
    .is().not().oneOf(['Passw0rd', 'Password123']); // Blacklist these values

