const validatorComment = (req, res, next) => {
	const errors = [];

	const { commentText, rate, idBlogPost, author } = req.body;

	if (typeof commentText !== "string") {
		errors.push("commentText must be a string");
	}
	if (typeof rate !== "number" || rate > 5) {
		errors.push("Rate must be a Number and minor of 5");
	}
	if (typeof idBlogPost !== "string") {
		errors.push("idBlogPost must be a string");
	}
	if (typeof author !== "string") {
		errors.push("author must be a string");
	}
	if (errors.length > 0) {
		res.status(400).send({ errors });
	} else {
		next();
	}
};
module.exports = validatorComment;
