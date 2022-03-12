const contacts = require("./contacts");

const yargs = require("yargs");
// console.log(yargs);
yargs
  .command({
    command: "add",
    describe: "menambah contact baru",
    builder: {
      nama: {
        describe: "nama lengkap",
        demandOption: true,
        type: "string",
      },
      email: {
        describe: "email lengkap",
        demandOption: false,
        type: "string",
      },
      noHP: {
        describe: "nomor handphone",
        demandOption: true,
        type: "string",
      },
    },
    handler(argv) {
      contacts.simpanContact(argv.nama, argv.email, argv.noHP);
    },
  })
  .demandCommand();

// menampilkan daftar contact
yargs.command({
  command: "list",
  describe: "Menampilkan semua nama & no HP contact",
  handler() {
    contacts.listContact();
  },
});

// menampilkan detial contact
yargs.command({
  command: "detail",
  describe: "menampilkan detail namaberdasarkan nama ",
  builder: {
    nama:{
      describe: 'Nama lengkap',
      demandOption: true,
      type: 'string'
    },
  },
  handler(argv) {
    
    contacts.detailContact(argv.nama);
  },
});

// menampilkan delete
yargs.command({
  command: "delete",
  describe: "hapus contact berdasarkan nama ",
  builder: {
    nama:{
      describe: 'Nama lengkap',
      demandOption: true,
      type: 'string'
    },
  },
  handler(argv) {
    
    contacts.deleteContact(argv.nama);
  },
});

yargs.parse();
