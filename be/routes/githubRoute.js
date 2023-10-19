const express = require("express");
const gh = express.Router();
const passport = require("passport");
const GithubStrategy = require("passport-github2").Strategy; //import che viene rihiesto per la strategia di github
const jwt = require("jsonwebtoken");
const session = require("express-session");
require("dotenv").config;

/*qui andremo a scrivere la nostra stategy
1) gh gli diciamo di usare le sessioni di express */

gh.use(
	session({
		//accetta all'interno delle opzioni
		secret: process.env.GITHUB_CLIENT_SECRET,
		resave: false,
		saveUninitialized: false,
	})
);

/*2) dobbiamo inizializzare tramite middlewere passport */
gh.use(passport.initialize());
gh.use(passport.session());

//3) fare il seralaize dell'utente e il deserialaize
//serrializzare p deserializzare significa quande le info di un utente vengono appunto
//serializzate o deserializzate
passport.serializeUser((user, done) => {
	done(null, user);
});

passport.deserializeUser((user, done) => {
	done(null, user);
});

//4)la strategi di github, con un middleware
passport.use(
	new GithubStrategy(
		{
			clientID: process.env.GITHUB_CLIENT_ID,
			clientSecret: process.env.GITHUB_CLIENT_SECRET,
			callbackURL: process.env.GITHUB_CALLBACK_URL,
		},
		(accessToken, refreshToken, profile, done) => {
			console.log("PROFILE", profile);
			return done(null, profile);
		}
	)
);

// 5)^^^tutto questo sopra è l'oggetto d configurazione di una githubStrategy, che si fa sempre cosi.

//6) adesso ci andiamo a costruire qualche rotta:
//lo scope ---> a che tipo di info vuoi accedere?

gh.get(
	"/auth/github",
	passport.authenticate("github", { scope: ["user:email"] }),
	(req, res) => {
		debugger;
		const redirectUrl = `http://localhost:3000/success?user=${encodeURIComponent(
			JSON.stringify(req.user)
		)}`; //7
		res.redirect(redirectUrl);
	}
);

//7 quello che poi vedremo lato frontend con tutte le info dell'utente

//8)in caso l'informazone dell'utente non vada a buon fine gli facciamo un redirect allo "/" della pagina frontend
gh.get(
	"/auth/github/callback",
	passport.authenticate("github", { failureRedirect: "/" }),
	(req, res) => {
		debugger;
		const user = req.user;
		console.log("UTENTE:", user);
		const token = jwt.sign(user, process.env.JWT_SECRET);
		const redirectUrl = `http//localhost:3000/success?token=${encodeURIComponent(
			token
		)}`;
		res.redirect(redirectUrl);
	}
);

gh.get("/success", (req, res) => {
	debugger;
	res.redirect("http://localhost:3000/home");
});
module.exports = gh;
