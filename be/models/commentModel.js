const mongoose = require("mongoose");

const comment = new mongoose.Schema(
	{
		commentText: {
			type: String,
			required: true,
		},
		rate: {
			type: Number,
			required: true,
		},
		idBlogPost: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "blogPostSchema",
		},
		author: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "authorShema",
		},
	},
	{
		timestamps: true,
		strict: true,
	}
);

module.exports = mongoose.model("commentSchema", comment, "commentTable");
