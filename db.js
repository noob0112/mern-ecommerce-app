const mongoose = require("mongoose");

module.exports = async (uri) => {
    try {
        await mongoose.connect(
            uri,
            {
            useNewUrlParser: true,
            useUnifiedTopology:true
            }
        );

        console.log("MongoDB connected");
    } catch (err) {
        console.log("can't connect database \n",err.message);
        process.exit(1);
    }
}