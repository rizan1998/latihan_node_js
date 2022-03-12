console.log('Hello Developer javascript 2022');
const nama = 'Muhamad Rijan Alpalah';



const cetakNamaInline = (nama)=> `Hi, nama saya adalah ${nama} dan saya sedang belajar node js!`;
console.log(cetakNamaInline(nama));
const cetakNama = (nama)=> {
   return `test nama saya adalah ${nama}`;
}
console.log(cetakNama);
const coba = require('./coba');

console.log(coba.cetakPropesi('programmer'));
console.log('------');
console.log(coba.mahasiswa.cetakMhs());
console.log('------');
console.log(new coba.Orang); 
// console.log(cetakPropesi('programmer'));
 
