"use strict";
exports.__esModule = true;
var constants_1 = require("../message/constants");
var MESSAGES = constants_1["default"].MESSAGES;
//function that verify's the token and goes to the next module/operation next() if successful
function verifyToken(req, res, next) {
    var bearHeader = req.headers['authorization'];
    if (typeof bearHeader !== 'undefined') {
        var bearToken = bearHeader.split(' ')[1];
        req.query.token = bearToken;
        next();
    }
    else {
        res.status(403)
            .send({ message: MESSAGES.UNAUTHORIZED, success: false }); // Restricting access if authorization fails 
    }
}
;
exports["default"] = verifyToken;
