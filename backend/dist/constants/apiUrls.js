"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleQueueUrl = exports.refreshAccessTokenUrl = exports.pingHealthCheckUrl = exports.handleMonitorUrl = exports.pingOneApiUrl = exports.pingAllApisUrl = exports.getApiUrl = exports.editApiUrl = exports.deleteApiUrl = exports.getAllApisStatsUrl = exports.getAllApisUrl = exports.createApiUrl = exports.updateUserUrl = exports.loginUserUrl = exports.registerUserUrl = exports.resetMockMonitorDbUrl = exports.seedMockApisDbUrl = exports.resetMockApisDbUrl = exports.seedMockUsersDbUrl = exports.resetMockUsersDbUrl = exports.baseSeedDbUrl = exports.baseQueueUrl = exports.baseMonitorUrl = exports.baseApiUrl = exports.baseAuthUrl = void 0;
const baseAuthUrl = `/api/auth`;
exports.baseAuthUrl = baseAuthUrl;
const baseApiUrl = `/api/api`;
exports.baseApiUrl = baseApiUrl;
const baseMonitorUrl = `/api/monitor`;
exports.baseMonitorUrl = baseMonitorUrl;
const baseQueueUrl = `/api/queue`;
exports.baseQueueUrl = baseQueueUrl;
const baseSeedDbUrl = `/api/mockDb`;
exports.baseSeedDbUrl = baseSeedDbUrl;
const registerUserUrl = `/register`;
exports.registerUserUrl = registerUserUrl;
const loginUserUrl = `/login`;
exports.loginUserUrl = loginUserUrl;
const updateUserUrl = `/updateUser`;
exports.updateUserUrl = updateUserUrl;
const refreshAccessTokenUrl = `/refreshToken`;
exports.refreshAccessTokenUrl = refreshAccessTokenUrl;
const createApiUrl = ``;
exports.createApiUrl = createApiUrl;
const getAllApisUrl = ``;
exports.getAllApisUrl = getAllApisUrl;
const getAllApisStatsUrl = `/stats`;
exports.getAllApisStatsUrl = getAllApisStatsUrl;
const deleteApiUrl = ``;
exports.deleteApiUrl = deleteApiUrl;
const editApiUrl = ``;
exports.editApiUrl = editApiUrl;
const getApiUrl = ``;
exports.getApiUrl = getApiUrl;
const pingAllApisUrl = `/pingAll`;
exports.pingAllApisUrl = pingAllApisUrl;
const pingOneApiUrl = `/pingOne`;
exports.pingOneApiUrl = pingOneApiUrl;
const handleMonitorUrl = ``;
exports.handleMonitorUrl = handleMonitorUrl;
const handleQueueUrl = ``;
exports.handleQueueUrl = handleQueueUrl;
const resetDb = "/resetDb";
const seedDb = "/seedDb";
const resetMockUsersDbUrl = `${resetDb}/users`;
exports.resetMockUsersDbUrl = resetMockUsersDbUrl;
const resetMockApisDbUrl = `${resetDb}/api`;
exports.resetMockApisDbUrl = resetMockApisDbUrl;
const resetMockMonitorDbUrl = `${resetDb}/monitor`;
exports.resetMockMonitorDbUrl = resetMockMonitorDbUrl;
const seedMockUsersDbUrl = `${seedDb}/users`;
exports.seedMockUsersDbUrl = seedMockUsersDbUrl;
const seedMockApisDbUrl = `${seedDb}/api`;
exports.seedMockApisDbUrl = seedMockApisDbUrl;
const pingHealthCheckUrl = `/api/ping`;
exports.pingHealthCheckUrl = pingHealthCheckUrl;
//# sourceMappingURL=apiUrls.js.map