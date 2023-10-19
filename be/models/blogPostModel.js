const mongoose = require("mongoose");

const blogPost = new mongoose.Schema(
	{
		category: {
			type: String,
			required: true,
		},
		title: {
			type: String,
			required: true,
		},
		cover: {
			type: String,
			default:
				"https://shop.mabrosrl.it/uploads/products/images_600/no-label.jpg",
		},
		readTime: {
			value: {
				type: Number,
				required: false,
			},
			unit: {
				type: String,
				required: false,
			},
		},
		content: {
			type: String,
		},
		author: {
			type: mongoose.Schema.Types.ObjectId, //1)
			ref: "authorShema",
		},
	},
	{
		timestamps: true,
		strict: true,
	}
);

module.exports = mongoose.model("blogPostSchema", blogPost, "blogPostTable");
