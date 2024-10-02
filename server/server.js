const express = require("express");
const cors = require("cors");
const { router } = require("./routes/mainRoute");
const { connectDb } = require("./models/mainModel");

const PORT = 5432;

connectDb();
const app = express();

app.use(cors());
app.use(express.json());
app.use("/", router);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
