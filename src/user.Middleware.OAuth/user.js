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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var jsonwebtoken_1 = require("jsonwebtoken");
var dotenv = require("dotenv");
dotenv.config();
var bcrypt_1 = require("bcrypt");
var roomModel_1 = require("../models/roomModel");
var constants_1 = require("../message/constants");
var MESSAGES = constants_1["default"].MESSAGES;
var User = /** @class */ (function () {
    function User() {
    }
    //signing up
    User.prototype.signupUser = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var email, findAllUser, saltRounds, salt, hashedPassword, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        email = req.body.email;
                        return [4 /*yield*/, roomModel_1.Users.findOne({ email: email })];
                    case 1:
                        findAllUser = _a.sent();
                        if (findAllUser) {
                            res.status(500).send({ message: MESSAGES.DUPLICATE, success: false });
                        }
                        saltRounds = 10;
                        return [4 /*yield*/, bcrypt_1["default"].genSalt(saltRounds)];
                    case 2:
                        salt = _a.sent();
                        return [4 /*yield*/, bcrypt_1["default"].hash(req.body.password, salt)];
                    case 3:
                        hashedPassword = _a.sent();
                        return [4 /*yield*/, roomModel_1.Users.create({
                                email: req.body.email,
                                password: hashedPassword,
                                role: req.body.role
                            })
                            // This creates a token for only admin which they can use to perform other special requests.
                        ];
                    case 4:
                        _a.sent();
                        // This creates a token for only admin which they can use to perform other special requests.
                        if (req.body.role === "admin") {
                            jsonwebtoken_1["default"].sign({ email: req.body.email, role: req.body.role }, process.env.SECRET_KEY, { expiresIn: '1h' }, function (error, token) {
                                res.json({
                                    message: MESSAGES.REGISTERED,
                                    success: true,
                                    token: token
                                });
                            });
                        }
                        else {
                            res.status(201)
                                .json({
                                message: MESSAGES.REGISTERED,
                                success: true
                            });
                        }
                        return [3 /*break*/, 6];
                    case 5:
                        err_1 = _a.sent();
                        res.status(500)
                            .send({ message: MESSAGES.ERROR, success: false });
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    //login user, validating email and using bcrypt to compare passwords 
    User.prototype.loginUser = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var email, password, checkUsers, checkUserspassword, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        email = req.body.email;
                        password = req.body.password;
                        return [4 /*yield*/, roomModel_1.Users.findOne({ email: email })];
                    case 1:
                        checkUsers = _b.sent();
                        if (checkUsers == null) {
                            res.status(500)
                                .json({ message: MESSAGES.REGISTER, success: false });
                        }
                        _a = String;
                        return [4 /*yield*/, roomModel_1.Users.findOne({ password: password })];
                    case 2:
                        checkUserspassword = _a.apply(void 0, [_b.sent()]);
                        bcrypt_1["default"].compare(password, checkUserspassword);
                        res.status(403)
                            .json({
                            success: true,
                            message: MESSAGES.LOGIN,
                            checkUsers: checkUsers
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    return User;
}());
exports["default"] = new User();
