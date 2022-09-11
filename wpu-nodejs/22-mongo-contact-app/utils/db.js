const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/wpu", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

// menambah satu data
// const contact1 = new Contact({
//   nama: "rijan",
//   nohp: 093483834,
//   email: "rijan alpalah@gmail.com",
// });

// // cimpan ke collection
// contact1.save().then((contact) => console.log(contact));
