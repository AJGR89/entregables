const express = require("express");
const { Router } = express;
const myContenedor = require("../database");
const path = require("path");

const router = Router();

//GEL ALL
router.get("/", async (req, res) => {
  try {
    const products = await myContenedor.getAll();
    if(templateType == 0){
      res.render("products",{products:products});
    }else if(templateType == 1)
    {
      res.render(path.resolve(__dirname, "../views/pages/products"),{products:products});
    }
    
  } catch (error) {
    res.status(404).json({ error: "productos no encontrados" });
  }
});

//GET BY ID
router.get("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const product = await myContenedor.getById(id);
    console.log(product);
    if (product == null) {
      res.status(404).json({ error: "producto no encontrado" });
      return;
    } else {
      res.status(200).json(product);
      return;
    }
  } catch (error) {
    res.status(404).json({ error: "producto no encontrado" });
  }
});

//ADD PRODUCT
router.post("/", async (req, res) => {
  try {
    const product = req.body;
    const newProduct = await myContenedor.save(product);
    console.log("templateType         ",templateType);

    if (newProduct != null) {
      if(templateType == 0){
        res.status(200).render("index");
      }else if(templateType == 1){
        res.render(path.resolve(__dirname, "../views/pages/index"));
      }
      
    } else {
      res.status(500).json({ error: "producto no creado" });
    }
  } catch (error) {}
});

//UPDATE BY ID
router.put("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const product = req.body;
    const updateProduct = myContenedor.updateById(id, product);
    if (updateProduct) {
      res.status(200).json({ msg: `product0 ${id} actualizado` });
      return;
    }
    return res.status(500).json({ error: `producto ${id} no encontrado` });
  } catch (error) {
    res.status(500).json({ error: `producto ${id} no encontrado` });
  }
});

//DELET BY ID
router.delete("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const deleteProduct = await myContenedor.deleteById(id);
    if (deleteProduct) {
      res.status(200).json({ msg: `producto ${id} eliminado` });
    } else {
      res.status(500).json({ msg: `producto ${id} no encontrado` });
    }
  } catch (error) {
    res.status(500).json({ error: `producto ${id} no encontrado` });
  }
});

module.exports = router;
