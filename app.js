
const db = require("./src/script/db")
const express = require("express")
var bodyParser = require('body-parser')
const Cadastros = require("./src/script/model/Cadastros")
const Produtores = require("./src/script/model/Produtores")
const Gado = require("./src/script/model/Gado")

const app = express();

const {engine} = require("express-handlebars")
app.engine('handlebars', engine( {runtimeOptions: {
    allowProtoPropertiesByDefault: true,
    allowProtoMethodsByDefault: true,
  }
}))
app.set('view engine', 'handlebars')
app.set("views", "./src/views");

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.use("/static",express.static(__dirname+"/src"));

app.get("/", function(req, res){
  res.sendFile(__dirname+"/src/main.html")
});

app.get("/produtores", function(req, res){
  Produtores.findAll().then(function (produtores) {
    res.render('produtores', {produtores: produtores});
  });

})

app.get("/cadastro-produtores", function(req, res){
  res.render('cadastro-produtores')
})

app.post("/cadastrando", function(req, res){
  Produtores.create({
    nome: req.body.nome,
    marca: req.body.marca
  }).then(function(){
    res.redirect('/produtores')
  })
})

app.get("/gado", function(req, res){
  Produtores.findAll({
    include: {
      model: Gado,
      right:true
    }
  }).then(function (produtores) {
      res.render('gado', {produtores: produtores});
  });
})

app.get("/cadastro-gado", function(req, res){
  Produtores.findAll().then(function (produtores) {
    res.render('cadastro-gado', {produtores: produtores});
  });
})

app.post("/cadas-gado", function(req, res){
  Gado.create({
    numero: req.body.numero,
    nascimento: req.body.nascimento,
    pelagem: req.body.pelagem,
    potreiro:req.body.potreiro,
    ProdutoreId:req.body.produtor
  }).then(function(){
    res.redirect('/gado')
  })
})

app.get('/update/:id',function(req,res){
  const id = req.params.id
  Produtores.findAll({
    include: {
      model: Gado,
      where:{
        id:id
      }
    }
  }).then(function (produtores) {
    try{
      if(produtores[0].Gado.id != null){
        res.render("update-gado", {produtores: produtores})
      }
    }
    catch{
      Gado.findAll({
        where:{
          id:id
        }
      }).then(function (gado) {
        res.render('update-sem-gado', {gado: gado});
      });
    }
  })
 });

app.get('/delete/:id',function(req,res){
  const id = req.params.id

  Gado.destroy({ 
    where : {
      id : id 
    }
  }).then(function () {
    res.redirect('/gado')
  })
 });

 app.post("/update/:id", function(req, res){
  const id = req.params.id
  Gado.update({
    numero: req.body.numero,
    potreiro:req.body.potreiro
  },{ where : { id : id }}).then(function(){
    res.redirect('/gado')
  })
});

app.get('/update-produtores/:id',function(req,res){
  const id = req.params.id

  Produtores.findAll({
    where:{
      id:id
    }
  }).then(function (produtores) {
    res.render("update-produtores", {produtores: produtores})
  })
 });

 app.post("/update-produtor/:id", function(req, res){
  const id = req.params.id
  Produtores.update({
    nome: req.body.nome,
    marca: req.body.marca,
  },{ where : { id : id }}).then(function(){
    res.redirect('/produtores')
  })
});

app.get('/delete-produtores/:id',function(req,res){
  const id = req.params.id

  Produtores.destroy({ 
    where : {
      id : id 
    }
  }).then(function () {
    res.redirect('/produtores')
  })
 });

app.listen(8080)