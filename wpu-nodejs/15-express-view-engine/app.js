const express = require('express');
const expressLayout = require('express-ejs-layouts');
const app = express();
const port = 3000;

// gunakan ejs
app.set('view engine', 'ejs');
app.use(expressLayout); //layouts ejs

app.get('/', (req, res) => {
  const mahasiswa = [
  {
    nama: 'rian alpalah',
    email: 'rizan@gmai.com'
  },
  {
    nama: 'ahmad',
    email: 'ahmad@gmai.com'
  },
]
  res.render('index', {
    nama: 'rijan alpalah',
    layout: 'layouts/main-layouts',
    title:'index', 
    mahasiswa});
});

// ini adalah halaman about
app.get('/about', (req, res) => {
  res.render('about', {title: 'about',
  layout: 'layouts/main-layouts'});
});

app.get('/contact', (req, res) => {
  res.render('contact', {title: 'contact',
  layout: 'layouts/main-layouts'});
});

app.get('/product/:id', (req,res) => {
  res.send(`Product ID = ${req.params.id} <br> 
            Category = ${req.query.category}`);
});

// middleware untuk page 404 
app.use('/', (req, res) => {
  res.status(404);
  res.send('test');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})