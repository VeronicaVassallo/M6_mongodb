const express = require("express");
const loginRouter = express.Router();
const bcrypt = require("bcrypt"); //dobbiamo verificare la nostra password, quindi importiamo nuovamente
const AuthorModel = require("../models/authormodel");

const jwt = require("jsonwebtoken");
require("dotenv").config(); //7

loginRouter.post("/login", async (req, res) => {
	const user = await AuthorModel.findOne({ email: req.body.email }); //cercheiamo in base all'email

	if (!user) {
		return res.status(404).send({
			message: "User don't found",
			statusCode: 404,
		});
	}

	const validPassword = await bcrypt.compare(req.body.password, user.password); //la password ricevuta, la password che abbiamo trovato

	if (!validPassword) {
		return res.status(400).send({
			statusCode: 400,
			message:
				"Incorrect Email or password " /*essere sempre genereci in questi casi,
             mai specificare se la password o la mail sono sbagliate perche altrimenti possiamo 
             dare un indizzio a male intenzionati*/,
		});
	}

	//generiamo il token:
	const token = jwt.sign(
		{
			/*qui vado a mettere tutto quello che del nostro utente voglio che ci torni 
        criptato nel token , quindi no dati sensibili come password, le ifo che inseriamo
        non devono essere mai private per buona norma.*/
			id: user._id,
			nome: user.nome,
			cognome: user.cognome,
			email: user.email,
			dataDiNascita: user.dataDiNascita,
			avatar: user.avatar,
		},
		process.env.JWT_SECRET,
		{
			expiresIn: "24h" /* indica la durata della validita del nostro token, 
        il tempo lo stabiliamo noi*/,
		}
	);
	//abbiamo il nostro token adesso per farcelo restituire nel header facciamo..
	res.header("Authorization", token).status(200).send({
		message: "Login effetuato con successo",
		statusCode: 200,
		token,
	});
});

module.exports = loginRouter;
