const express = require('express');
const expressLayout = require('express-ejs-layouts');
const app = express();
const port = 3000;
const { loadContact, findContact, addContact, cekDuplikat } = require('./utils/contacts');
const { body, validationResult, check } = require('express-validator'); //express validator
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');



// gunakan ejs
app.set('view engine', 'ejs');

// built-in middleware
app.use(express.static('public'));

// middleware url
app.use(express.urlencoded({extended:true}));

// third-party middleware
app.use(expressLayout); //layouts ejs



// konfigurasi flash
app.use(cookieParser('secret'));
app.use(
  session({
    cookie: { maxAge: 6000 },
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
);
app.use(flash())


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
  console.log(contacts);
  res.render('contact', {
  title: 'contact',
  layout: 'layouts/main-layouts',
    contacts,
  msg: req.flash('msg')
  });
});

// halaman form tambah data contact
app.get('/contact/add', (req, res) => {
 
  res.render('add-contact', {
    title: 'Form tambah data contact',
    layout: 'layouts/main-layouts'
  });
});

// proses data contact
app.post('/contact', [
  body('nama').custom((value) => {
    const duplikat = cekDuplikat(value);
    if (duplikat) {
      throw new Error('Nama contact sudah digunakan!');
    }
    return true;
  }),
  check('email', 'email tidak valid!').isEmail(), 
  check('nohp', 'No HP tidak valid!').isMobilePhone('id-ID')
], (req, res) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // return res.status(400).json({ errors: errors.array() })
    res.render('add-contact', {
      title: 'Form Tambah Data Contact',
      layout: 'layouts/main-layouts',
      errors: errors.array()
    });
  }else{
    addContact(req.body);
    // kirimkan flash message
    req.flash('msg', 'Data contact berhasil ditambahkan');
    res.redirect('/contact');
  }
  // console.log(req.body);
  // res.send(req.body);
  // res.send('data berhasil dikirim');
});
 
// halaman detail contact
app.get('/contact/:nama', (req, res) => {
  const contact = findContact(req.params.nama);
  res.render('detail', {
    title: 'Halaman Detail Contact',
    layout: 'layouts/main-layouts',
    contact
  }); 
});


// middleware untuk page 404 
app.use((req, res) => {
  res.status(404);
  res.send('404');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});