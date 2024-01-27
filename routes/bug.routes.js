const express = require("express");
const { BugModel  } =  require("../model/bug.model.js");
const { auth } =  require("../middleware/auth.middleware.js");

const bugRouter = express.Router();

bugRouter.get("/bugs", async(req, res) => {
    const data = await BugModel.find();
  res.status(200).send(data);
});


bugRouter.get("/bugs/:id?", async (req, res) => {
    const { id } = req.params;
    try {
      if (id) {
        const product = await BugModel.findOne({ _id: id });
        if (!product) {
          return res.status(404).send({ msg: "Product not found" });
        }
       
      } else {
        return res.status(200).send(product);
      }
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  });



bugRouter.post("/bugs/add", auth, (req, res) => {
  try {
    const newProduct = new BugModel(req.body);
    newProduct.save();
    res.status(200).send({ msg: "product added" });
  } catch (error) {
    res.status(400).send({ error: error });
  }
});


bugRouter.patch("/bugs/update/:id", async (req, res) => {
    let { id } = req.params;
    try {
        await BugModel.findByIdAndUpdate({ _id: id }, req.body);
        res.status(200).send({"msg":`the product with id:${id} has been updated`})
    } catch (err) {
        res.status(400).send({ "error": err.message })
    }
})


bugRouter.delete("/bugs/delete/:id", async (req, res) => {
    let { id } = req.params;
    try {
        await BugModel.findByIdAndDelete({ _id: id } ); 
        res.status(200).send({"msg":`the product with id:${id} has been deleted`})
    } catch (err) {
        res.status(400).send({ "error": err.message })
    }
})

module.exports = { bugRouter };
