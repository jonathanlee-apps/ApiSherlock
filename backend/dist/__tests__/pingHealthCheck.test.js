"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const apiUrls_1 = require("constants/apiUrls");
const messages_1 = require("constants/messages");
const queueController_1 = require("controllers/queueController");
const mongoose_1 = __importDefault(require("mongoose"));
const server_1 = __importDefault(require("server"));
const supertest_1 = __importDefault(require("supertest"));
const dbUrl_1 = require("test/dbUrl");
describe("testing if supertest and jest works", () => {
    beforeAll(async () => {
        const databaseName = "test-ping";
        let url = `mongodb://127.0.0.1/${databaseName}`;
        if (process.env.USING_CI === "yes") {
            url = (0, dbUrl_1.createDbUrl)(databaseName);
        }
        try {
            console.log("Connecting to MongoDB with url --------> ", url);
            await mongoose_1.default.connect(url);
        }
        catch (error) {
            console.log("Error connecting to MongoDB/Mongoose: ", error);
            return error;
        }
    });
    afterAll(async () => {
        await Promise.all(mongoose_1.default.connections.map((con) => con.close()));
        await mongoose_1.default.disconnect();
        await queueController_1.redisConfiguration.connection.quit();
    });
    it("should ping server", async () => {
        const res = await (0, supertest_1.default)(server_1.default).get(apiUrls_1.pingHealthCheckUrl);
        expect(res.statusCode).toBe(200);
        expect(res.text).toBe(messages_1.pingHealthCheckSuccessMsg);
    });
});
//# sourceMappingURL=pingHealthCheck.test.js.map