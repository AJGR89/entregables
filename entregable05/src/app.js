const express = require("express");
const path = require("path");
const productsRoutes = require("./routes/products.routes");
const { create } = require("express-handlebars");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

global.templateType = 1; //handlebars = 0 | ejs=1 | oug = 2

switch (templateType) {
  case 0:
    /****************************
     * CON HANDLEBARS
     *****************************/
    app.engine(
      "hbs",
      create({
        extname: ".hbs",
        defaultLayout: "main.hbs",
        layoutsDir: path.resolve(__dirname, "./views/layouts"),
        partialDir: path.resolve(__dirname, "./views/partials"),
      }).engine
    );

    app.set("view engine", "hbs");
    app.set("views", path.resolve(__dirname, "./views"));
    app.use(express.static(path.join(__dirname, "public")));

    app.get("/", (req, res) => {
      res.render("index");
    });
    break;
  case 1:
    /****************************
     * CON EJS
     *****************************/

    app.set("view engine", "ejs");

    app.get("/", (req, res) => {
      res.render(path.resolve(__dirname, "./views/pages/index"));
    });
    break;
  case 2:
    /****************************
     * CON PUG
     *****************************/
    app.set("views", path.resolve(__dirname, "./views"));
    app.set("view engine", "pug");
    break;

  default:
    break;
}

app.use("/api/productos", productsRoutes);

module.exports = app;
