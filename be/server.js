//1) importo express e mongoose
const express = require("express");
const mongoose = require("mongoose");
const postRoute = require("./posts");
const blogpostRoute = require("./routes/blogpostCRUD");
const commentRouter = require("../be/routes/commentRouter");
const loginRouter = require("./routes/loginRouter");
const githubRoute = require("./routes/githubRoute");
const emailRoute = require("./routes/sendEmail");

const cors = require("cors"); //A)
/*la porta puo essere definita come una porta di comunicazione di un applicazione 
verso l'esterno, quindi ogni applicazione apre una o piu porte verso l'esterno. 
Questo serve per smistare le richieste in entrata verso la giusta applicazione*/
require("dotenv").config();
const PORT = 5050;

const app = express();

//middleware
app.use(cors()); //B)
app.use(express.json());

// routes
app.use("/", postRoute);
app.use("/", blogpostRoute);
app.use("/", commentRouter);
app.use("/", loginRouter);
app.use("/", githubRoute);
app.use("/", emailRoute);

/*3)Adesso il nostro database deve connettersi con il nostro cloud, la prima cosa da fare è allaciarsi
al database, per fare cio usiamo l anostra libreria che si chiama mongoose.
Gli elementi tra parentesi vanno scritti sempre cosi*/
mongoose.connect(process.env.MONGODB_URL, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Error during db connection"));
db.once("open", () => {
	console.log("Database successfully connected");
});

app.listen(PORT, () => console.log(`Server up and running on port: ${PORT}`));
