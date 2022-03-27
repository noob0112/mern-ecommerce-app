const router = require("express").Router();
const { getAll, getByUserId, edit, deleteUser, stats } = require("../controllers/UserController.js")
const {verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin} = require("../controllers/VerifyTokenController.js")

// GET ALL USER
router.get("/", verifyTokenAndAdmin, getAll);

// GET USER BY ID
router.get("/:id", verifyToken, getByUserId);

// EDIT USER BY ID
router.put("/:id", verifyTokenAndAuthorization, edit);

// DELET USER
router.delete("/:id", verifyTokenAndAuthorization, deleteUser);

// GET USER STATS
router.get("/stats", verifyTokenAndAdmin, stats)

module.exports = router