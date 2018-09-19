"use strict";

class JwtError extends Error {
	constructor(message) {
		super(message);
		this.name = "JwtError";
	}
}

module.exports = JwtError;
