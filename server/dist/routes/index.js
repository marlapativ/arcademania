"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_router_1 = __importDefault(require("./auth/auth-router"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_json_1 = __importDefault(require("./swagger.json"));
const routes = (app) => {
    // Signup Routes
    app.use('/', auth_router_1.default);
    // Setting up swagger
    setupSwagger(app);
};
const setupSwagger = (app) => {
    app.use('/swagger', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_json_1.default));
    app.get('*', (req, res) => {
        res.redirect('/swagger');
    });
};
exports.default = routes;
//# sourceMappingURL=index.js.map