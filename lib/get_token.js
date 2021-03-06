"use strict";

module.exports = function getToken(ctx, options) {
  let token;
  if (ctx.request.query._token) {
    token = ctx.request.query._token
  } else	if (ctx.get("authorization")) {
		const parts = ctx.get("authorization").split(" ");

		if (parts.length == 2 && /^Bearer$/i.test(parts[0])) {
			token = parts[1];
		}
	}

	return token;
};
