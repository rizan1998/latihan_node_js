// core module
// filesystem
// const fs = require('fs');
// console.log(fs);

// import * as fs from 'fs/promises';
// import * as fs from 'fs';

// menuliskan string ke file (synchronous)
// fs.writeFileSync('test.text', 'Hello world secar synchronous');
// try{
//     fs.writeFileSync('data/test.text', 'hellow world secara synchronous');
// }catch(e){
//     console.log(e);
// }

// menuliskan string ke file Asynchronous
// fs.writeFile('test2.text', 'hello world from Asynchronous method', (e) => {
//     console.log(e);
// });

// membaca isi dari sebuah file 
// const data = fs.readFileSync('test.text', 'utf-8');
// console.log(data);

// membaca isi file dengan Asynchronous
// const data = fs.readFile('test2.text', 'utf-8', (err, data) => {
//     if(err) throw err;
//     console.log(data);
// });

// double question
// const readline = require('readline');
// const rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout,
// });

// rl.question('Masukan nama anda : ', (nama) => {
//   rl.question('Masukan umur anda : ', (umur) => {
//      console.log(`Nama saya adalah ${nama}, saat ini saya berumur ${umur}`);
//      rl.close();
//   });
// });

// gabungkan question 
const fs = require('fs');
const readline = require('readline');
const { json } = require('stream/consumers');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

rl.question('Masukan nama anda : ', (nama) => {
  rl.question('Masukan umur anda : ', (umur) => {
     const contact = {
         nama,
         umur
     }
     const file = fs.readFileSync('data/contact.json', 'utf8');
     console.log(file);
     const contacts = JSON.parse(file);
     contacts.push(contact);
    //  console.log(contacts);
    const cotacts = JSON.stringify(contacts);
    console.log(cotacts);

    fs.writeFileSync('data/contact.json', JSON.stringify(contacts));

     rl.close();

  });
});