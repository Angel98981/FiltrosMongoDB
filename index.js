/* hacemos uso de las librerias */
const express = require("express");
const mongoose = require("mongoose");

/* creamos la conexion en la base de datos */
mongoose.connect(
  "mongodb+srv://angelriverarf:6tNvR5cNR0vfisnQ@pruebita.xbcxzti.mongodb.net/"
);
const db = mongoose.connection;

/* verificamos si estamos conectados */
db.on("error", console.error.bind(console, "connection"));
db.once("open", function () {
  /* definir esquema de usuarios */
  userSchema = new mongoose.Schema({
    nombres: String,
    apellidos: String,
  });

  /* creamos el modelo usuarios */
  const User = mongoose.model("usuarios", userSchema);

  /* definir esquema de empresas */
  userSchema = new mongoose.Schema({
    nombre: String,
    direccion: String,
  });

  /* definir modelo de empresas */

  const Empresa = mongoose.model("empresas", userSchema);

  /* definir esquema de empresas */
  userSchema = new mongoose.Schema({
    nombre: String,
    apellidos: String,
  });

  /* creamos el modelo usuarios */
  const Usuario = mongoose.model("usuarios1", userSchema);

  const app = express();
  app.use(express.json());

  /* Endpoint para obtener todos los usuarios */
  app.get("/api/users", async (req, res) => {
    const users = await User.find();
    res.json(users);
  });

  /* Endpoint para obtener todos los usuarios */
  app.get("/api/users/limit10", async (req, res) => {
    const users10 = await User.find().limit(10);
    res.json(users10);
  });
  /* Endpoint para obtener todas las empresas */
  app.get("/api/empresas", async (req, res) => {
    const empresas = await Empresa.find();
    res.json(empresas);
  });
  /* Endpoint para obtener los usuarios que sean de la empresa id 5 */
  app.get("/api/users/id5", async (req, res) => {
    const empresasid5 = await User.find({ empresa_id: 5 });
    res.json(empresasid5);
  });

  /* Endpoint para obtener todos los usuarios que sean de Bangladesh */
  app.get("/api/users/bangladesh", async (req, res) => {
    const usersBangladesh = await User.find({ pais: "Bangladesh" });
    res.json(usersBangladesh);
  });

  /* Endpoint para obtener todas las empresas que sean de Bangladesh */
  app.get("/api/empresas/bangladesh", async (req, res) => {
    const empresasBangladesh = await Empresa.find({ ciudad: "Bangladesh" });
    res.json(empresasBangladesh);
  });

  app.listen(3000, function () {
    console.log("server listening on port 3000");
  });

  /* Endpoint para obtener todos los usuarios creados por mi, 10*/
  app.get("/api/usuarios", async (req, res) => {
    const usuario = await Usuario.find();
    res.json(usuario);
  });
  // FILTRADO ------------------------------------------------

  /* VALOR ESPECIFICO*/
  app.get("/api/usuarios/valorE", async (req, res) => {
    const usuarioValorE = await Usuario.find({ edad: { $eq: 30 } });
    res.json(usuarioValorE);
  });

  /* TODOS LOS VALORES MENOS ESTE */
  app.get("/api/usuarios/valorN", async (req, res) => {
    const usuarioValorN = await Usuario.find({ edad: { $ne: 30 } });
    res.json(usuarioValorN);
  });

  /* MAYOR QUE*/
  app.get("/api/usuarios/edad20", async (req, res) => {
    const usuario20 = await Usuario.find({ edad: { $gt: 20 } });
    res.json(usuario20);
  });

  /* MENOR QUE*/
  app.get("/api/usuarios/edad_20", async (req, res) => {
    const usuario_20 = await Usuario.find({ edad: { $lt: 20 } });
    res.json(usuario_20);
  });

  /* COMPARA VALORES DEL ARRAY CON LA DB
    Y ME TRAE TODOS LOS VALORES IGUALES A LOS QUE HAY EN EL ARRAY*/
  app.get("/api/usuarios/list", async (req, res) => {
    const usuariosList = await Usuario.find({ edad: { $in: [5, 10, 15] } });
    res.json(usuariosList);
  });
  /* COMPARA VALORES DEL ARRAY CON LA DB
    Y ME TRAE TODOS LOS VALORES DE LA DB MENOS LOS DEL ARRAY*/
  app.get("/api/usuarios/list0", async (req, res) => {
    const usuariosList0 = await Usuario.find({ edad: { $nin: [5, 10, 15] } });
    res.json(usuariosList0);
  });

  /* EXISTE O NO*/
  app.get("/api/usuarios/existe", async (req, res) => {
    const usuariosE = await Usuario.find({ edad: { $exists: true } }); //puedo poner false para los que el valore no existe
    res.json(usuariosE);
  });

  /* CAMPO COINCIDE CON EXPRESION REGULAR */
  app.get("/api/usuarios/buscar", async (req, res) => {
    const usuariosB = await Usuario.find({ nombre: { $regex: /^P/ } });
    res.json(usuariosB);
  });

  /* QUE CUMPLA CON MULTIPLES CONDICIONES*/
  app.get("/api/usuarios/condi", async (req, res) => {
    const usuariosC = await Usuario.find({
        $and:[
        {edad:{$gt:20}},
        {edad:{$lt:30}}
    ]
    });
    res.json(usuariosC);
  });

  /* QUE CUMPLA CON ALMENOS UNA CONDICION*/
  app.get("/api/usuarios/condiA", async (req, res) => {
    const usuariosA = await Usuario.find({
        $or:[
        {edad:{$gt:20}},
        {edad:{$lt:30}}
    ]
    });
    res.json(usuariosA);
  });

  /* INVERTIR LA SELCCION*/

  app.get("/api/usuarios/invert",async(req,res)=>{
    const usuariosI=await Usuario.find({edad:{$not:{$gt:30}}})
    res.json(usuariosI)
  })

  /* QUE NO CUMPLAN VARIAS CONDICIONES*/
  app.get("/api/usuarios/condiN", async (req, res) => {
    const usuariosN = await Usuario.find({
        $nor:[
        {edad:{$gt:20}},
        {edad:{$lt:30}}
    ]
    });
    res.json(usuariosN);
  });


});
