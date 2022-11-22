"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const crypto_1 = require("../../config/crypto");
const validators_1 = require("../../config/validators");
// Schema options to include id field & add timestamps while creation and updation.
const schemaOptions = {
    timestamps: {
        createdAt: 'createdDate',
        updatedAt: 'lastModifiedDate'
    },
    toJSON: {
        virtuals: true,
        transform(doc, ret) {
            delete ret.password;
            return ret;
        }
    },
    toObject: {
        virtuals: true
    }
};
// User Schema
const schema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!(0, validators_1.isValidEmail)(value)) {
                throw new Error('Invalid email.');
            }
        },
    },
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        trim: true,
        private: true,
        validate(value) {
            if (!(0, validators_1.isValidPassword)(value)) {
                throw new Error('Password must be on length 8 and contain at least one uppercase, one lowercase, one special character and one number');
            }
        }
    }
}, schemaOptions);
schema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        // Encrypting the password on change
        if (this.isModified('password')) {
            this.password = yield (0, crypto_1.hashPassword)(this.password);
        }
        return next();
    });
});
schema.methods.comparePassword = function (password) {
    return __awaiter(this, void 0, void 0, function* () {
        return (0, crypto_1.comparePassword)(this.password, password);
    });
};
/**
 * @typedef User
 */
exports.User = mongoose_1.default.model('User', schema);
//# sourceMappingURL=user.js.map