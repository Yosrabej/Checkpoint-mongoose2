const express = require("express");
const app = express();
const connectDb = require("./config/connectDb");
const personRouter = require("./routes/person");

app.use(express.json());
connectDb();

app.use("/api/persons", personRouter);

const port = 5000;
app.listen(port, () => {
    console.log(`server is running on port ${port}`);
});
