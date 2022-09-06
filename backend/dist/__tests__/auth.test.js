"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const apiUrls_1 = require("constants/apiUrls");
const cookies_1 = require("constants/cookies");
const queueController_1 = require("controllers/queueController");
const mockUser_1 = require("mocks/mockUser");
const mongoose_1 = __importDefault(require("mongoose"));
const server_1 = __importDefault(require("server"));
const supertest_1 = __importDefault(require("supertest"));
const dbUrl_1 = require("test/dbUrl");
const user = {
    name: "jane",
    email: "janedoe2@gmail.com",
    password: "password",
    timezoneGMT: -5,
};
const { name, email, password, timezoneGMT } = user;
describe("testing users controller", () => {
    beforeAll(async () => {
        const databaseName = "test-users";
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
        await (0, supertest_1.default)(server_1.default).post(`${apiUrls_1.baseSeedDbUrl}${apiUrls_1.seedMockUsersDbUrl}`);
    });
    afterAll(async () => {
        await mongoose_1.default.connection.db.dropDatabase();
        await Promise.all(mongoose_1.default.connections.map((con) => con.close()));
        await mongoose_1.default.disconnect();
        await queueController_1.redisConfiguration.connection.quit();
        await new Promise((res) => setTimeout(res, 4000));
    });
    describe("given a user's name, email, and password", () => {
        it("should create a user", async () => {
            const response = await (0, supertest_1.default)(server_1.default)
                .post(`${apiUrls_1.baseAuthUrl}${apiUrls_1.registerUserUrl}`)
                .send({
                name: name,
                email: email,
                password: password,
                timezoneGMT: timezoneGMT,
            });
            expect(response.statusCode).toBe(201);
            expect(response.headers["content-type"]).toEqual(expect.stringContaining("json"));
            expect(response.body).toEqual(expect.objectContaining({
                accessToken: expect.any(String),
                user: { name, email, timezoneGMT },
            }));
        });
        it("should login a user", async () => {
            const response = await (0, supertest_1.default)(server_1.default)
                .post(`${apiUrls_1.baseAuthUrl}${apiUrls_1.loginUserUrl}`)
                .send({
                email: mockUser_1.mockUser.email,
                password: mockUser_1.mockUser.password,
            });
            expect(response.statusCode).toBe(200);
            expect(response.body).toEqual(expect.objectContaining({
                accessToken: expect.any(String),
                user: {
                    name: mockUser_1.mockUser.name,
                    email: mockUser_1.mockUser.email,
                    timezoneGMT: mockUser_1.mockUser.timezoneGMT,
                },
            }));
        });
        it("should update a user", async () => {
            const loginResponse = await (0, supertest_1.default)(server_1.default)
                .post(`${apiUrls_1.baseAuthUrl}${apiUrls_1.loginUserUrl}`)
                .send({
                email: mockUser_1.mockUser.email,
                password: mockUser_1.mockUser.password,
            });
            const { accessToken } = loginResponse.body;
            const response = await (0, supertest_1.default)(server_1.default)
                .patch(`${apiUrls_1.baseAuthUrl}${apiUrls_1.updateUserUrl}`)
                .send({
                name: "bob",
                email: mockUser_1.mockUser.email,
                timezoneGMT: mockUser_1.mockUser.timezoneGMT,
            })
                .set("Authorization", `Bearer ${accessToken}`)
                .set("Cookie", loginResponse.header["set-cookie"]);
            expect(response.statusCode).toBe(200);
            expect(response.body).toEqual(expect.objectContaining({
                accessToken: expect.any(String),
                user: {
                    name: "bob",
                    email: mockUser_1.mockUser.email,
                    timezoneGMT: mockUser_1.mockUser.timezoneGMT,
                },
            }));
        });
        it("should give unauthenticated response for wrong password", async () => {
            const loginResponse = await (0, supertest_1.default)(server_1.default)
                .post(`${apiUrls_1.baseAuthUrl}${apiUrls_1.loginUserUrl}`)
                .send({
                email: mockUser_1.mockUser.email,
                password: "Incorrect password",
            });
            expect(loginResponse.statusCode).toBe(401);
        });
    });
    describe("testing cookies", () => {
        it("should show cookies in header", async () => {
            const loginResponse = await (0, supertest_1.default)(server_1.default)
                .post(`${apiUrls_1.baseAuthUrl}${apiUrls_1.loginUserUrl}`)
                .send({
                email: mockUser_1.mockUser.email,
                password: mockUser_1.mockUser.password,
            });
            const cookieHeader = loginResponse.headers["set-cookie"];
            expect(loginResponse.statusCode).toBe(200);
            expect(cookieHeader).toBeTruthy();
            const cookie = cookieHeader[0];
            expect(cookie).toContain(cookies_1.cookieName);
        });
    });
});
//# sourceMappingURL=auth.test.js.map