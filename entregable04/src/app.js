const express = require("express");
const path = require('path')
const productsRoutes = require("./routes/products.routes");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

app.use("/api/productos", productsRoutes);

app.get('/',(req,res)=>{
  res.send(path.join(__dirname, 'public'))
});

module.exports = app;
