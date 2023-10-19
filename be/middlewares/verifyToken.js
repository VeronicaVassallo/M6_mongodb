const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = function (req, res, next) {
	const token = req.header("Authorization");

	if (!token) {
		return res.status(401).send({
			errorType: "Threre isn't token",
			statusCode: 401,
			message: "If you want continue, you have need a valid token",
		});
	}

	try {
		//verify fa l'analisi inversa, in base alla nostra firma, lui va a decodificare il token
		const verified = jwt.verify(token, process.env.JWT_SECRET); // accetta 2 parametri il token, e la firma digitale
		req.user = verified;

		next();
	} catch (error) {
		res.status(403).send({
			errorType: "Token error",
			statusCode: 403,
			message: "Token isn't valid",
		});
	}
};
