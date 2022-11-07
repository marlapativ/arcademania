"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidPassword = exports.isValidEmail = void 0;
const validator_1 = __importDefault(require("validator"));
const password_validator_1 = __importDefault(require("password-validator"));
const isValidEmail = (email) => {
    if (validator_1.default.isEmail(email)) {
        return true;
    }
    return false;
};
exports.isValidEmail = isValidEmail;
const isValidPassword = (password) => {
    return passwordValidatorSchema.validate(password);
};
exports.isValidPassword = isValidPassword;
const passwordValidatorSchema = new password_validator_1.default();
passwordValidatorSchema
    .is().min(8) // Minimum length 8
    .is().max(100) // Maximum length 100
    .has().uppercase(1) // Must have uppercase letters
    .has().lowercase(1) // Must have lowercase letters
    .has().digits(1) // Must have at least 2 digits
    .has().symbols()
    .is().not().oneOf(['Passw0rd', 'Password123']); // Blacklist these values
//# sourceMappingURL=validators.js.map