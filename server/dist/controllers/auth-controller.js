"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.createUser = void 0;
const authService = __importStar(require("../services/auth/auth-service"));
const http_utils_1 = require("../utils/http-utils");
/**
 * It creates a user and returns the user object in the response
 * @param req - Http Request with <IUser> as body
 * @param {CustomResponse} response - CustomResponse - This is the response object that will be sent
 * back to the client.
 */
const createUser = (req, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield authService.createUser(req.body);
        (0, http_utils_1.setResponse)(response, user);
    }
    catch (err) {
        (0, http_utils_1.setError)(response, err);
    }
});
exports.createUser = createUser;
/**
 * It logsIn a user and returns the accesstoken in the response
 * @param req - Http Request with <ISignINUser> as body
 * @param {CustomResponse} response - CustomResponse - This is the response object that will be sent
 * back to the client.
 */
const loginUser = (req, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userWithToken = yield authService.loginUser(req.body);
        (0, http_utils_1.setResponse)(response, userWithToken);
    }
    catch (err) {
        if (err.message === 'User Not found.')
            (0, http_utils_1.setError)(response, err, 404);
        else if (err.message === 'Invalid Password')
            (0, http_utils_1.setError)(response, err, 401);
        else
            (0, http_utils_1.setError)(response, err, 500);
    }
});
exports.loginUser = loginUser;
//# sourceMappingURL=auth-controller.js.map