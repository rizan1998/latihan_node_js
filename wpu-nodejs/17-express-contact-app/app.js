const express = require('express');
const expressLayout = require('express-ejs-layouts');
const app = express();
const port = 3000;
const {loadContact } = require('./utils/contacts');

// gunakan ejs
app.set('view engine', 'ejs');

// built-in middleware
app.use(express.static('public'));

// third-party middleware
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
];
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
  const contacts = loadContact();
  res.render('contact', {
  title: 'contact',
  layout: 'layouts/main-layouts',
  contacts
  });
});
 
app.get('/contact/:nama', (req, res) => {
  // const contacts = findContact(req.params.nama);
  res.render('detail', {
    title: 'Halaman Detail Contact',
    layout: 'layouts/main-layouts',
    // contact
  }); 
});


// middleware untuk page 404 
app.use((req, res) => {
  res.status(404);
  res.send('404');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})