console.log('----------------');
console.log('from coba .js');
// const nama = 'Ahmad hamdi';
// const cetakNama = (nama)=>{
//    return `Hai nama saya adalah ${nama}, saya kana menjadi fullstack javascript 2022`;
// }
function cetakPropesi(nama_propesi){
    return `propesi saya di coba.js adalah ${nama_propesi}`;
}
// cetakNama(nama);

// module.exports = cetakNama;

const mahasiswa = {
    nama: 'rijan alpalah',
    umur: 23,
    cetakMhs(){
        return `Hallo, saya adalah ${this.nama} saya adalah mahasiswa berumur ${this.umur}`;
    }
}

class Orang {
    constructor(){ //constructor adalah function yang dijalankan saat classnya diinstansiasi
        console.log('Object orang telah dibuat');
    }
}
// module.exports.cetakPropesi = cetakPropesi;
// module.exports.mahasiswa = mahasiswa;
// module.exports.Orang = Orang;

// module.exports = {
//     cetakPropesi: cetakPropesi,
//     mahasiswa: mahasiswa,
//     Orang: Orang
// }

module.exports = {
    cetakPropesi,
    mahasiswa,
    Orang
}