const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  // sendfile ini dapat digunakan untuk readfile lain
  // seperti css, file pdf dll
  res.sendFile('./index.html', {root: __dirname});
});

// ini adalah halaman about
app.get('/about', (req, res) => {
  res.sendFile('./about.html', {root: __dirname});
});

app.get('/contact', (req, res) => {
  res.sendFile('./contact.html', {root: __dirname});
});

// untuk request jika diakses seperti:
///product/1/category/10
app.get('/product/:id/category/:idCat', (req, res) => {
  res.send(`product ID = ${req.params.id} <br> Cartegory Id = ${req.params.idCat} `);
});

// jika memakai query string get jika diakses seperti:
// /product2/1?category=shoes
app.get('/product2/:id', (req,res) => {
  res.send(`Product ID = ${req.params.id} <br> 
            Category = ${req.query.category}`);
});

// mengembalikan data json
app.get('/showJson', (req, res) => {
  res.json({
    nama: "rijan",
    email: "rizanalfalah@gmail.com",
    noHP: "08381756626"
  });
});

// mengembalikan html dokumen
app.get('/showHTML', (req, res) => {
  res.sendFile('./index.html', {root: __dirname});
});

// middleware untuk page 404 
app.use('/', (req, res) => {
  res.status(404);
  res.send('404');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})