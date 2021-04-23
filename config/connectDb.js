const mongoose = require("mongoose");
require("dotenv").config({ path: "./config/.env" });
const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false,
        });
        console.log("the database is connected");
    } catch (error) {
        console.log("the database is not conneted");
    }
};
module.exports = connectDb;
