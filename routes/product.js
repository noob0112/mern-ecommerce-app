const router = require("express").Router();
const {create, update, deleteProduct, get, getAll} = require("../controllers/ProductController.js")
const {verifyTokenAndAdmin} = require("../controllers/VerifyTokenController.js")

// CREATE PRODUCT
router.post("/", verifyTokenAndAdmin, create)

// UPDATE PRODUCT
router.put("/:id", verifyTokenAndAdmin, update)

// DELETE PRODUCT
router.delete("/:id", verifyTokenAndAdmin, deleteProduct)

// READ PRODUCT
router.get("/:id", get)

// READ ALL PRODUCT
router.get("/", getAll)

module.exports = router