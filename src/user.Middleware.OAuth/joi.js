"use strict";
exports.__esModule = true;
var joi_1 = require("joi");
// using joi package to validate data 
function validateRoomJoi(req, res, next) {
    var joiRoomSchema = joi_1["default"].object({
        name: joi_1["default"].string(),
        roomType: joi_1["default"].string(),
        price: joi_1["default"].number().integer()
    });
    var _a = joiRoomSchema.validate(req.body), error = _a.error, value = _a.value;
    if (error) {
        res.status(422)
            .send({
            message: error,
            success: false
        });
    }
    else {
        next(); //if validation is successful, it moves to the next program
    }
}
exports["default"] = validateRoomJoi;
