const connectToMongo = require("./db");
const express = require("express");
var cors = require("cors");
connectToMongo();

const app = express();
const port = 5000;
// on 3000 react app will run

//Middleware
app.use(cors());
app.use(express.json());

//Available Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes"));

// app.get("/", (req, res) => {
// 	res.send("Hello World!");
// });

app.listen(port, () => {
	console.log(`INotebook app listening on port http://localhost:${port}`);
});
