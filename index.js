"use strict";

const middleware = require("./lib/middleware");
const injector = require("./lib/injector");

module.exports = {
	name: "jwt",
	install: function(app, opts) {
    app.pushMiddleware(this.name, middleware(opts));
    injector(app, opts);
	}
};
