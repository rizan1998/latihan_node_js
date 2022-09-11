const express = require("express");
const expressLayout = require("express-ejs-layouts");

const session = require("express-session");
const cookieParser = require("cookie-parser");
const flash = require("connect-flash");
const { response } = require("express");
const { body, validationResult, check } = require("express-validator"); //express validator
const methodOverride = require("method-override");

const app = express();
const port = 3000;

// setup method override
app.use(methodOverride("_method"));

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

// halaman form tambah data contact
app.get("/contact/add", (req, res) => {
  res.render("add-contact", {
    title: "Form tambah data contact",
    layout: "layouts/main-layouts",
  });
});

// proses tambah data contact
app.post(
  "/contact",
  [
    body("nama").custom(async (value) => {
      const duplikat = await Contact.findOne({ nama: value });
      if (duplikat) {
        throw new Error("Nama contact sudah digunakan!");
      }
      return true;
    }),
    check("email", "email tidak valid!").isEmail(),
    check("nohp", "No HP tidak valid!").isMobilePhone("id-ID"),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.render("add-contact", {
        title: "Form Tambah Data Contact",
        layout: "layouts/main-layouts",
        errors: errors.array(),
      });
    } else {
      Contact.insertMany(req.body, (error, result) => {
        // kirimkan flash message
        req.flash("msg", "Data contact berhasil ditambahkan");
        res.redirect("/contact");
      });
    }
  }
);

// proses delete contact

app.delete("/contact", (req, res) => {
  // res.send(req.body);
  Contact.deleteOne({ nama: req.body.nama }).then((result) => {
    req.flash("msg", "Data contact berhasil dihapus");
    res.redirect("/contact");
  });
});

// app.get("/contact/delete/:nama", async (req, res) => {
//   const contact = await Contact.findOne({ nama: req.params.nama });

//   // jika contact tidak ada
//   if (!contact) {
//     res.status(404);
//     res.send("<h1>404</h1>");
//   } else {
//     Contact.deleteOne({ _id: contact._id }).then((result) => {
//       req.flash("msg", "Data contact berhasil dihapus");
//       res.redirect("/contact");
//     });
//   }
// });

//halaman form tambah data contact
app.get("/contact/edit/:nama", async (req, res) => {
  const contact = await Contact.findOne({ nama: req.params.nama });

  res.render("edit-contact", {
    title: "Form ubah data contact",
    layout: "layouts/main-layouts",
    contact,
  });
});

// proses ubah data
app.put(
  "/contact",
  [
    body("nama").custom(async (value, { req }) => {
      const duplikat = await Contact.findOne({ nama: value });
      if (value !== req.body.oldNama && duplikat) {
        throw new Error("Nama contact sudah digunakan!");
      }
      return true;
    }),
    check("email", "email tidak valid!").isEmail(),
    check("nohp", "No HP tidak valid!").isMobilePhone("id-ID"),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // return res.status(400).json({ errors: errors.array() })
      res.render("edit-contact", {
        title: "Form Ubah Data Contact",
        layout: "layouts/main-layouts",
        errors: errors.array(),
        contact: req.body,
      });
    } else {
      // res.send(req.body); //untuk debug

      Contact.updateOne(
        { _id: req.body._id },
        {
          $set: {
            nama: req.body.nama,
            email: req.body.email,
            nohp: req.body.nohp,
          },
        }
      ).then((result) => {
        // kirimkan flash message
        req.flash("msg", "Data contact berhasil diubah");
        res.redirect("/contact");
      });
    }
  }
);

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
