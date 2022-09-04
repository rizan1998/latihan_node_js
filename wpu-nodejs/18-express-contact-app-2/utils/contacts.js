// gabungkan question 
const fs = require('fs');

// ambil semua data json
const loadContact = () => {
    const fileBuffer = fs.readFileSync('data/contacts.json', 'utf8');
    const contacts = JSON.parse(fileBuffer);
    return contacts;
}

// cari contact berdasarkan nama
const findContact = (nama) => {
  const contacts = loadContact();
  const contact = contacts.find((contact) => contact.nama.toLowerCase() === nama.toLowerCase());
  return contact;
}

// cek directory file dan membuat folder data
const dirPath = './data';
if(!fs.existsSync(dirPath)){
  fs.mkdirSync(dirPath);
}

// cek file jika belum ada
const dataPath = './data/contacts.json';
if(!fs.existsSync(dataPath)){
  fs.writeFileSync(dataPath, '[]', 'utf-8');  
}

// menuliskan / menimpa file contacts.json dengan data yang baru
const saveContacts = (contacts) => { //cotacts disini adalah object
  fs.writeFileSync('data/contacts.json', JSON.stringify(contacts)); //timpa data lama dengan object yang baru
}

// cek nama yang duplikat
const cekDuplikat = (nama) => {
  const contacts = loadContact();
  return contacts.find((contact) => contact.nama === nama);
}

// menambah data contact baru 
const addContact = (contact) => { 
  const contacts = loadContact(); //mengambil dari file json
  contacts.push(contact); //ditambahin file yang baru
  saveContacts(contacts); //timpa file json
}

module.exports = { loadContact, findContact, addContact, cekDuplikat};