"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const index_1 = __importDefault(require("./routes/index"));
const mongoose_1 = __importDefault(require("mongoose"));
const logger_1 = __importDefault(require("./config/logger"));
/*
 * Port to host the server
 */
const port = 8080;
/**
 * Creating express server
 */
const app = (0, express_1.default)();
// Express Server Middlewares
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({
    extended: true
}));
app.use((0, cors_1.default)());
// Custom routing
(0, index_1.default)(app);
// Database Connection
mongoose_1.default.connect('mongodb+srv://abhi:abhi@cluster0.pxa5l.mongodb.net/tododb?retryWrites=true&w=majority', (err) => {
    if (err) {
        logger_1.default.error(`Unable to connect to MongoDB database: ${err}`);
    }
});
// Enable Server to listen on port
app.listen(port, () => {
    logger_1.default.info(`Server listening on port ${port}`);
});
//# sourceMappingURL=app.js.map