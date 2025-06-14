"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const dotenv = require("dotenv");
const express_1 = require("express");
const methods_1 = require("../utils/methods");
const cookieParser = require("cookie-parser");
dotenv.config();
async function bootstrap() {
    (0, methods_1.ensureUploadsFolder)();
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.use(cookieParser());
    app.enableCors({
        origin: true,
        credentials: true,
    });
    app.use((0, express_1.json)());
    app.use((0, express_1.urlencoded)({ extended: true }));
    await app.listen(3014);
}
bootstrap();
//# sourceMappingURL=main.js.map