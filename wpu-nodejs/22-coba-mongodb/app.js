const { MongoClient } = require("mongodb");
let mongo = require("mongodb");
let ObjectId = mongo.ObjectID;
// Connection URL
const uri = "mongodb://127.0.0.1:27017";

// Database Name
const dbName = "wpu";

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

client.connect((error, client) => {
  if (error) {
    return console.log("koneksi gagal");
  }

  console.log('koneksi berhasil');

  // pilih database
  const db = client.db(dbName);

  // menambahkan 1 data ke databse
    db.collection("mahasiswa").insertOne(
      {
        nama: "rezeni",
        email: "rezeni@gmail.com",
      },
      (error, result) => {
        if (error) {
          return console.log(error);
        }
        console.log(result);
      }
    );

    db.collection("mahasiswa").insertMany(
      [
        {
          nama: "dinda",
          email: "rezeni@gmail.com",
        },
        {
          nama: "gina",
          email: "rezeni@gmail.com",
        },
      ],
      (error, result) => {
        if (error) {
          return console.log(error);
        }
        console.log(result);
      }
      );

  // read data
  console.log(
    db
      .collection("mahasiswa")
      .find()
      .toArray((error, result) => {
        console.log(result);
      })
  );

  // menampilkan berdasarkan kreteria
    console.log(
      db
        .collection("mahasiswa")
        .find({ nama: "rijan alpalah" })
        .toArray((error, result) => {
          console.log(result);
        })
    );

  // ambil data berdasarkan id
  console.log(
    db
      .collection("mahasiswa")
      .find({ _id: ObjectId("63161e8033baa515601a4f77") })
      .toArray((error, result) => {
        console.log(result);
      })
  );

  // mengubah data berdasarkan id
  const updatePromise = db.collection("mahasiswa").updateOne(
    {
      _id: ObjectId("63161d97cd6d120e607bde69"),
    },
    {
      $set: {
        nama: "rijan",
        email: "alpalah@gmai.com",
      },
    }
  );

  // updatePromise
    .then((result) => {
      console.log(result);
    })
    .catch((error) => {
      console.log(error);
    });

  // mengubah data dengan secara multiple
  db.collection("mahasiswa").updateMany(
    {
      nama: "rijan",
    },
    {
      $set: {
        nama: "rijan alpalah",
        email: "redeyes@gmail.com",
      },
    }
  );

  // menghapus 1 data
  db.collection("mahasiswa")
    .deleteOne({
      _id: ObjectId("631c9f6cef97d35ac04e9dd7"),
    })
    .then((result) => {
      console.log(result);
    })
    .catch((error) => {
      console.log(error);
    });

  // menghapus lebih dari satu data
  db.collection("mahasiswa")
    .deleteMany({
      nama: "rijan alpalah",
    })
    .then((result) => {
      console.log(result);
    })
    .catch((error) => {
      console.log(error);
    });
});
