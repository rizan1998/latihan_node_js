// gabungkan question 
const fs = require('fs');

// ambil semua data json
const loadContact = () => {
    const fileBuffer = fs.readFileSync('data/contacts.json', 'utf8');
    const contacts = JSON.parse(fileBuffer);
    return contacts;
}

// cari contact berdasarkan nama
// const findContact = (nama) => {
//   const contacts = loadContact();
//   const contact = contacts.find((contact) => )
// }

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

module.exports = { loadContact};