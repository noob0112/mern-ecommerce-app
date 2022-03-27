const User = require("../models/User");
const CryptoJS = require("crypto-js");

// GET ALL USER
const getAll = async (req, res) => {
  // return res.send(Object.keys(req.query));
  const query = req.query.new;
  try {
    const users = query 
    ? await User.find().sort({_id:-1}).limit(5)
    : await User.find();
    return res.status(200).json(users);
  } catch (error) {
    res.status(500).json(error);
  }
};

// GET USER BY ID
const getByUserId = async (req, res) => {
  try {
    if (req.user.isAdmin) {
      await User.findById(req.params.id)
        .then((user) => {
          return res.status(200).json(user);
        })
        .catch((error) => {
          return res
            .status(400)
            .json({ status: 0, message: "User-id is non-existence", error });
        });
    } else {
      await User.findById(req.params.id, "-_id username  email")
        .then((user) => {
          return res.status(200).json(user);
        })
        .catch((error) => {
          return res
            .status(400)
            .json({ status: 0, message: "User-id is not exist", error });
        });
    }
  } catch (error) {
    res.status(500).json({ status: -1, message: "Server error", error });
  }
};

// EDIT USER
const edit = async (req, res) => {
  if (req.body.password) {
    req.body.password = CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SEC
    ).toString();
  }

  try {
    await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    )
      .then((user) => {
        res
          .status(200)
          .json({ status: 1, message: `User has been updated successfully` });
      })
      .catch((error) => {
        res
          .status(404)
          .json({ status: 0, message: "User-id is not exist", error });
      });
  } catch (error) {
    error.json({
      status: -1,
      message: "Server error",
      error: error.message,
    });
  }
};

// DELET USER
const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id)
      .then((user) => {
        res
          .status(200)
          .json({ status: 1, message: `User has been deleted...` });
      })
      .catch((error) => {
        res.status(404).json({
          status: 0,
          message: "User-id is not exist",
          error,
        });
      });
  } catch (error) {
    res.json({
      status: -1,
      message: "Server error",
      error: error.message,
    });
  }
};

//GET USER STATS
const stats = async (req, res) => {
  const date = new Date();
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

  try {
    const data = await User.aggregate([
      { $match: { createdAt: { $gte: lastYear } } },
      {
        $project: {
          month: { $month: "$createdAt" },
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: 1 },
        },
      },
    ]);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = { getByUserId, getAll, edit, deleteUser, stats };
