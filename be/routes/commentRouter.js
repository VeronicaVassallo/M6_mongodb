const express = require("express");
const commentModel = require("../models/commentModel");
const commentRouter = express.Router();
const validatorComment = require("../middlewares/validatorComment");

//POST
commentRouter.post("/comments/create", validatorComment, async (req, res) => {
	const newComment = new commentModel({
		commentText: req.body.commentText,
		rate: Number(req.body.rate),
		idBlogPost: req.body.idBlogPost,
		author: req.body.author,
	});
	try {
		const postComment = newComment.save();
		res.status(201).send({
			statusCode: 201,
			message: "Record created",
			postComment,
		});
	} catch (error) {
		res.status(500).send({
			statusCode: 500,
			message: "Internal server error",
			error,
		});
	}
});

//GET Riturna tutti i commenti di uno specifico post
commentRouter.get("/blogPost/:id/comments/", async (req, res) => {
	const { id } = req.params;
	try {
		const listCommentsSinglePost = await commentModel.find({ idBlogPost: id });
		let mes = "";
		if (listCommentsSinglePost === null) mes = "Comment not found!!!";
		res.status(200).send({
			statusCode: 200,
			message: mes,
			payload: listCommentsSinglePost,
		});
	} catch (error) {
		res.status(500).send({
			statusCode: 500,
			message: `Internal server error: ${error.message} `,
		});
	}
});

//GET Ritorna un commento specifico di un post specifico

commentRouter.get("/blogPost/:id/comments/:commentId", async (req, res) => {
	const { id, commentId } = req.params;
	try {
		const singlePostComment = await commentModel.find({
			idBlogPost: id,
			_id: commentId,
		});
		res.status(200).send({
			statusCode: 200,
			message: "Comment found!!",
			payload: singlePostComment,
		});
	} catch (error) {
		res.status(500).send({
			statusCode: 500,
			message: `Internal server error: ${error.message} `,
		});
	}
});

//POST aggiungi un nuovo commento ad un post specifico
commentRouter.post("/blogPost/:id", async (req, res) => {
	const { id } = req.params;
	const newCommentBlogPost = new commentModel({
		commentText: req.body.commentText,
		rate: Number(req.body.rate),
		idBlogPost: id,
		author: req.body.author,
	});
	try {
		const commentBlogPost = newCommentBlogPost.save();
		res.status(201).send({
			statusCode: 201,
			message: "New comment posted",
			commentBlogPost,
		});
	} catch (error) {
		res.status(500).send({
			statusCode: 500,
			message: "Internal server error",
			error,
		});
	}
});

//PUT cambia un commento di un post specifico
commentRouter.put("/blogPost/:id/comments/:commentId", async (req, res) => {
	const { id, commentId } = req.params;

	try {
		const modifySingleComment = await commentModel.findOneAndUpdate(
			{
				idBlogPost: id,
				_id: commentId,
			},
			{
				commentText: req.body.commentText,
				rate: Number(req.body.rate),
				idBlogPost: id,
				author: req.body.author,
			}
		);
		res.status(200).send({
			statusCode: 200,
			message: "Comment updated",
		});
	} catch (error) {
		res.status(500).send({
			statusCode: 500,
			message: "Error during update",
			error,
		});
	}
});

//DELETE elimina un commento specifico da un post
commentRouter.delete("/blogPost/:id/comment/:commentId", async (req, res) => {
	const { id, commentId } = req.params;
	try {
		const deleteSingleComment = await commentModel.findOneAndDelete({
			idBlogPost: id,
			_id: commentId,
		});
		res.status(200).send({
			statusCode: 200,
			message: "Comment deleted",
		});
	} catch (error) {
		res.status(500).send({
			statusCode: 500,
			message: "Internal server error",
			error,
		});
	}
});

module.exports = commentRouter;
