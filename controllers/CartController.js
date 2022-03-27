const Cart = require("../models/Cart");

//CREATE
const create = async (req, res) => {
  const newCart = new Cart(req.body);

  try {
    const savedCart = await newCart.save();
    res.status(200).json(savedCart);
  } catch (err) {
    res.status(500).json(err);
  }
};

//UPDATE
const update = async (req, res) => {
  try {
    const updatedCart = await Cart.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedCart);
  } catch (err) {
    res.status(500).json(err);
  }
};

//DELETE
const deleteCart = async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);
    res.status(200).json("Cart has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
};

//GET USER CART
const get = async (req, res, next) => {
  try {
    if (req.params.userId == req.user.id || req.user.isAdmin) {
      const cart = await Cart.findOne({ userId: req.params.userId });
      return res.status(200).json(cart);
    } else {
      return res
        .status(403)
        .json({ status: 0, message: "You are not alowed to do that!" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

//GET ALL

const getAll = async (req, res) => {
  try {
    const carts = await Cart.find();
    res.status(200).json(carts);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = { create, update, deleteCart, get, getAll };
