const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

//REGISTER
const register = async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SEC
    ).toString(),
  });

  try {
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res
      .status(500)
      .json({ status: -1, message: "server error", error: error.keyValue });
  }
};

//LOGIN
const login = async (req, res, next) => {
  try {
    await User.findOne({ username: req.body.username })
      .then((user) => {
        const hashedPassord = CryptoJS.AES.decrypt(
          user.password,
          process.env.PASS_SEC
        );

        const originalPassword = hashedPassord.toString(CryptoJS.enc.Utf8);

        if (originalPassword !== req.body.password) {
          return res.status(401).json({ status: 0, message: "Wrong credentials!" });
        }

        const accessToken = jwt.sign(
          {
            id: user._id,
            isAdmin: user.isAdmin,
          },
          process.env.JWT_SEC,
          {
            expiresIn: "3d", // expires in 3 day
            // expiresIn: "24h", // expires in 24h
          }
        );

        return res.status(200).json({ accessToken });
      })
      .catch((error) => {
        return res
          .status(401)
          .json({ status: 0, message: "Wrong credentials!", error });
      });

    // res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ status: -1, message: "Server error", error });
  }
};

module.exports = { register, login };
