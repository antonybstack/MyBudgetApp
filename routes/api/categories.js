const express = require("express");
const categoryRoutes = express.Router();

const Category = require("../../models/category.model");

categoryRoutes.route("/").get(function (req, res) {
  Category.find(function (err, categories) {
    if (err) {
    } else {
      res.json(categories);
    }
  });
});

categoryRoutes.route("/:id").get(function (req, res) {
  let id = req.params.id;
  Category.findById(id, function (err, category) {
    res.json(category);
  });
});

categoryRoutes.route("/add").post(function (req, res, err) {
  let category = new Category(req.body);
  category
    .save()
    .then((category) => {
      res.status(200).json({ category });
    })
    .catch((err) => {
      res.status(400).json({ message: { msgBody: "Category requires name", msgError: true } });
    });
});

categoryRoutes.route("/delete/:id").delete(function (req, res) {
  Category.findByIdAndRemove(req.params.id, function (err, category) {
    if (err) {
      return res.status(500).send({ category });
    }
    return res.status(200).send({ category });
  });
});

categoryRoutes.route("/update/:id").post(function (req, res) {
  Category.findById(req.params.id, function (err, category) {
    if (!category) res.status(404).send("data is not found");
    else {
      category.category_name = req.body.category_name;
      category.category_totals = req.body.category_totals;
    }
    category
      .save()
      .then((category) => {
        res.json({ category });
      })
      .catch((err) => {
        res.status(400).json({ message: { msgBody: "error updating category", msgError: true } });
      });
  });
});

module.exports = categoryRoutes;
