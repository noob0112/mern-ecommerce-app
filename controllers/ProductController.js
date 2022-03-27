const Product = require("../models/Product");

// CREATE
const create = async (req, res) => {
  const newProduct = new Product(req.body);
  try {
    const savedProduct = await newProduct.save();
    res
      .status(200)
      .json({ status: 1, message: "Product has been created", savedProduct });
  } catch (error) {
    res.status(500).json({ status: -1, message: "Server error", error });
  }
};

// UPDATE
const update = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    )
      .then((updatedProduct) => {
        res.status(200).json({
          status: 1,
          message: "Product has been updated",
          updatedProduct,
        });
      })
      .catch((error) => {
        res
          .status(400)
          .json({ status: 1, message: "Product is not exist", updatedProduct });
      });
  } catch (error) {
    res.status(500).json(error);
  }
};

// DELETE PRODUCT
const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id)
      .then((product) => {
        res
          .status(200)
          .json({ status: 1, message: "Product has been deleted" });
      })
      .catch((error) => {
        res.status(200).json({ status: 0, message: "Product is not exist" });
      });
  } catch (error) {
    res.status(500).json({ status: -1, message: "Server error", error });
  }
};

// GET PRODUCT
const get = async (req, res) => {
  try {
    const product = await Product.findById(
      req.params.id,
      "-_id -createdAt -updatedAt -__v"
    )
      .then((product) => {
        res
          .status(200)
          .json({ status: 1, message: "Get product successfully", product });
      })
      .catch((error) => {
        res
          .status(400)
          .json({ status: 0, message: "Product is not exist", error });
      });
  } catch (error) {
    res.status(500).json({ status: -1, message: "Server error", error });
  }
};

// GET ALL PRODUCT
const getAll = async (req, res) => {
  const qNew = req.query.new;
  const qCategory = req.query.category;
  const qlimit = req.query.limit;

  try {
    let products;

    if (qNew) {
      products = await Product.find().sort({ createdAt: -1 }).limit(qlimit)
    } else if (qCategory) {
      products = await Product.find({
        categories: {
          $in: [qCategory],
        },
      });
    } else {
      products = await Product.find();
    }

    return res.status(200).json({ status: 1, products });
  } catch (error) {
    return res.status(500).json({ status: -1, error });
  }
};

module.exports = { create, update, deleteProduct, get, getAll };
