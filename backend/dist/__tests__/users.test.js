"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const supertest_1 = __importDefault(require("supertest"));
const mockUser_1 = require("mocks/mockUser");
const server_1 = __importDefault(require("server"));
const urls_1 = require("constants/urls");
const user = {
    name: "jane",
    email: "janedoe2@gmail.com",
    password: "password",
};
const { name, email, password } = user;
describe("testing users controller", () => {
    beforeAll(async () => {
        await (0, supertest_1.default)(server_1.default).delete(`${urls_1.baseSeedDbUrl}${urls_1.resetMockUsersDbUrl}`);
        await (0, supertest_1.default)(server_1.default).post(`${urls_1.baseSeedDbUrl}${urls_1.seedMockUsersDbUrl}`);
    });
    afterAll(async () => {
        await Promise.all(mongoose_1.default.connections.map((con) => con.close()));
        await mongoose_1.default.disconnect();
    });
    describe("given a user's name, email, and password", () => {
        it("should create a user", async () => {
            const response = await (0, supertest_1.default)(server_1.default)
                .post(`${urls_1.baseAuthUrl}${urls_1.registerUserUrl}`)
                .send({
                name,
                email,
                password,
            });
            expect(response.statusCode).toBe(201);
            expect(response.headers["content-type"]).toEqual(expect.stringContaining("json"));
            expect(response.body).toEqual(expect.objectContaining({
                token: expect.any(String),
                user: { name: name, email: email },
            }));
        });
        it("should login a user", async () => {
            const response = await (0, supertest_1.default)(server_1.default)
                .post(`${urls_1.baseAuthUrl}${urls_1.loginUserUrl}`)
                .send({
                email: mockUser_1.mockUser.email,
                password: mockUser_1.mockUser.password,
            });
            expect(response.statusCode).toBe(200);
            expect(response.body).toEqual(expect.objectContaining({
                token: expect.any(String),
                user: { name: mockUser_1.mockUser.name, email: mockUser_1.mockUser.email },
            }));
        });
        it("should update a user", async () => {
            const loginResponse = await (0, supertest_1.default)(server_1.default)
                .post(`${urls_1.baseAuthUrl}${urls_1.loginUserUrl}`)
                .send({
                email: mockUser_1.mockUser.email,
                password: mockUser_1.mockUser.password,
            });
            const { token } = loginResponse.body;
            const response = await (0, supertest_1.default)(server_1.default)
                .patch(`${urls_1.baseAuthUrl}${urls_1.updateUserUrl}`)
                .send({
                name: "bob",
                email: mockUser_1.mockUser.email,
            })
                .set("Authorization", `Bearer ${token}`);
            expect(response.statusCode).toBe(200);
            expect(response.body).toEqual(expect.objectContaining({
                token: expect.any(String),
                user: { name: "bob", email: mockUser_1.mockUser.email },
            }));
        });
        it("should give unauthenticated response for wrong password", async () => {
            const loginResponse = await (0, supertest_1.default)(server_1.default)
                .post(`${urls_1.baseAuthUrl}${urls_1.loginUserUrl}`)
                .send({
                email: mockUser_1.mockUser.email,
                password: "Incorrect password",
            });
            expect(loginResponse.statusCode).toBe(401);
        });
    });
});
//# sourceMappingURL=users.test.js.map