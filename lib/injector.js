"use strict";

const jwt = require("jsonwebtoken");

module.exports = function(app, opts) {
	app.injectContent("jwt", {
		sign: function(data, options) {
			return jwt.sign(data, opts.secret, options || { expiresIn: "2h" });
		},
		verify: function(token, callback) {
			return jwt.verify(token, opts.secret, callback || (() => {}));
		}
	});
};
