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
exports.loginUser = exports.createUser = void 0;
const index_1 = require("../../models/index");
const crypto_1 = require("../../config/crypto");
const auth_config_1 = require("../../config/auth-config");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const logger_1 = __importDefault(require("../../config/logger"));
const createUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const newUser = new index_1.User(user);
    return newUser.save();
});
exports.createUser = createUser;
const loginUser = (SignINuser) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield index_1.User.findOne({
        raw: true,
        where: {
            username: SignINuser.username,
        }
    });
    if (!user) {
        throw new Error("User Not found");
    }
    const passwordIsValid = (0, crypto_1.comparePassword)(SignINuser.password, user.password);
    if (!passwordIsValid) {
        throw new Error("Invalid Password");
    }
    const token = jsonwebtoken_1.default.sign({ id: user.id }, auth_config_1.authSecret.secret, {
        expiresIn: 86400,
    });
    const resfreshToken = jsonwebtoken_1.default.sign({ type: 'refresh' }, auth_config_1.authSecret.secret, {
        expiresIn: '2h'
    });
    const res = {
        id: user.id,
        username: user.username,
        email: user.email,
        accessToken: token,
        refreshToken: resfreshToken
    };
    logger_1.default.info(res);
    return res;
});
exports.loginUser = loginUser;
//# sourceMappingURL=auth-service.js.map