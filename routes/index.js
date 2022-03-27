const userRouter = require("./user.js");
const authRouter = require("./auth.js");
const productRouter = require("./product.js");
const cartRouter = require("./cart.js");

function route(app){
    app.use("/user", userRouter);
    app.use("/user", authRouter);
    app.use("/product", productRouter);
    app.use("/cart", cartRouter);
}

module.exports = route