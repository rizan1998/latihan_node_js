const express = require("express");
const expressLayout = require("express-ejs-layouts");

const session = require("express-session");
const cookieParser = require("cookie-parser");
const flash = require("connect-flash");
const { response } = require("express");

const app = express();
const port = 3000;

// setup ejs
app.set("view engine", "ejs");
app.use(expressLayout); //layouts ejs third party middleware
app.use(express.static("public")); //built-in middleware
app.use(express.urlencoded({ extended: true }));

require("./utils/db");
const Contact = require("./models/contact");

// konfigurasi flash
app.use(cookieParser("secret"));
app.use(
  session({
    cookie: { maxAge: 6000 },
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(flash());

// halaman home
app.get("/", (req, res) => {
  const mahasiswa = [
    {
      nama: "rian alpalah",
      email: "rizan@gmai.com",
    },
    {
      nama: "ahmad",
      email: "ahmad@gmai.com",
    },
  ];
  res.render("index", {
    nama: "rijan alpalah",
    layout: "layouts/main-layouts",
    title: "index",
    mahasiswa,
  });
});

// halaman about
app.get("/about", (req, res) => {
  res.render("about", { title: "about", layout: "layouts/main-layouts" });
});

// halaman contact
app.get("/contact", async (req, res) => {
  // yang ini jika promise
  //   Contact.find().then((contact) => {
  //     res.send(contact);
  //   });
  // dibuah menjadi async
  const contacts = await Contact.find();
  res.render("contact", {
    title: "contact",
    layout: "layouts/main-layouts",
    contacts,
    msg: req.flash("msg"),
  });
});

// halaman detail contact
app.get("/contact/:nama", async (req, res) => {
  const contact = await Contact.findOne({ nama: req.params.nama });
  res.render("detail", {
    title: "Halaman Detail Contact",
    layout: "layouts/main-layouts",
    contact,
  });
});

app.listen(port, () => {
  console.log(`Mongo contact app | listening at http://localhost:${port}`);
});
