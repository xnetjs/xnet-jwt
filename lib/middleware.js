"use strict";

// const jwt = require("jsonwebtoken");
const getToken = require("./get_token");
const JwtError = require("./jwt_error")


module.exports = opts => {
	const middleware = async function jwt(ctx, next) {
		try {
			let token = getToken(ctx);
			if (!token) {
				throw new JwtError("No authorization token was found");
			}

			const decoded = await new Promise((resolve, reject) => {
				ctx.jwt.verify(token, function(err, decoded) {
					if (err) {
						reject(new JwtError("invalid_token", err));
					} else {
						resolve(decoded);
					}
				});
			});

			const property = opts.property || "user";
			Object.defineProperty(ctx.state, property, {
				value: decoded
			});
			await next();
		} catch (err) {
      if (err.name === 'JwtError') {
        ctx.error(err.message, 401)
      } else {
        throw err
      }
    }
	};

	return middleware;
};
