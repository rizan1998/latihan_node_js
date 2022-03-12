// gabungkan question 
const { rejects } = require('assert');
const fs = require('fs');
const chalk = require('chalk');
const validator = require('validator');
const { json } = require('stream/consumers');

const loadContact = () => {
    const fileBuffer = fs.readFileSync('data/contacts.json', 'utf8');
    const contacts = JSON.parse(fileBuffer);
    return contacts;
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

const simpanContact = (nama,email,noHP) => {
    const contact = {
        nama,
        email,
        noHP
    }

    const contacts = loadContact();

    // check duplicate
    const duplicate = contacts.find((contact) => contact.nama === nama);

    if(duplicate){
      console.log(
        chalk.red.inverse.bold('contact sudah terdaftar, gunakan nama lain')
      );
      return false;
    }

    // check email
    if(email){
      if(!validator.isEmail(email)){
        console.log(
          chalk.red.inverse.bold('email tidak valid')
        );
        return false;
      }
    }

    // check noHP
    if(noHP){
      if(!validator.isMobilePhone(noHP, 'id-ID')){
        console.log(
          chalk.red.inverse.bold('noHP tidak valid')
        );
        return false;
      }
    }

    contacts.push(contact);

    fs.writeFileSync('data/contacts.json', JSON.stringify(contacts));

    console.log(chalk.green.inverse.bold('data telah diinput'));
};


const listContact = () => {
    const contacts = loadContact();
    console.log(chalk.cyan.inverse.bold('daftar kontak : '));
    contacts.forEach((contact, i) => {
      console.log(`${i + 1}. ${contact.nama} - ${contact.noHP}`);
    });
}

const detailContact = (nama) =>{
  const contacts = loadContact();
  const contact = contacts.find((contact) => 
    contact.nama.toLowerCase() === nama.toLowerCase()
  );


  if(!contact){
    console.log(chalk.red.inverse.bold(`nama dengan ${nama} tidak ditemukan`));
    return false;
  }

  console.log(chalk.cyan.inverse.bold(contact.nama));
  console.log(contact.noHP);
  if(contact.email){
    console.log(contact.email);
  }
}

const deleteContact = (nama) => {
  const contacts = loadContact();
  const newContact = contacts.filter(
    (contact) => contact.nama.toLowerCase() !== nama.toLowerCase()
  );

  if(contacts.length === newContact.length){
    console.log(chalk.red.inverse.bold(`nama dengan ${nama} tidak ditemukan`));
    return false;
  }

  fs.writeFileSync('data/contacts.json', JSON.stringify(newContact));

  console.log(chalk.green.inverse.bold(`data contact ${nama} telah dihapus`));
}


module.exports = {simpanContact, listContact, detailContact, deleteContact};