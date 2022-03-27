const router = require("express").Router();
const {create, update, deleteCart, get, getAll} = require("../controllers/CartController.js")
const {verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin} = require("../controllers/VerifyTokenController.js")

// CREATE CART
router.post("/", verifyToken, create)

// UPDATE CART
router.put("/:id", verifyTokenAndAuthorization, update)

// DELETE CART
router.delete("/:id", verifyTokenAndAuthorization, deleteCart)

// READ USER CART
router.get("/:userId", verifyToken, get)

// READ ALL CART
router.get("/", verifyTokenAndAdmin, getAll)

module.exports = router