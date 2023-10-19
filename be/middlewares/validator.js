const validator = (req, res, next) => {
	const errors = [];

	const { category, title, cover, readTime, content } = req.body;

	if (typeof category !== "string") {
		errors.push("Category must be a string");
	}
	if (typeof title !== "string") {
		errors.push("Title must be a string");
	}
	if (typeof cover !== "string") {
		errors.push("Cover must be a string");
	}

	if (typeof readTime.value !== "number") {
		errors.push("Value must be a number");
	}
	if (typeof readTime.unit !== "string") {
		errors.push("Unit must be a string");
	}

	if (typeof content !== "string") {
		errors.push("Value must be a string");
	}
	if (errors.length > 0) {
		res.status(400).send({ errors });
	} else {
		next();
	}
};

module.exports = validator;
