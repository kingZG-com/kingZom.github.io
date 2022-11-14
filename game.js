const koin = new Audio();
koin.src = "koin.mp3";
let manuk1 = new Image();
manuk1.src = "manuk1.png";
let manuk2 = new Image();
manuk2.src = "manuk2.png";
let bg = new Image();
bg.src = "bg.jpg";
let gambarTiang = new Image();
gambarTiang.src = "tube1.png";
let gambarTiang2 = new Image();
gambarTiang2.src = "tube2.png";
const judul = new Image();
judul.src = "judull.png";
const gbr = new Image();
gbr.src = "mula.png";
const sound = new Audio();
sound.src = "gas.mp3";
const go = new Audio();
go.src = "over.mp3";
const cvx = document.getElementById("canvas");
const video = document.getElementById('vd');
const usr = document.querySelector('.user');
const breakline = '<br>';
const main = new Audio();
main.src = 'main.mp3';
const gameO = new Image();
gameO.src = 'gameover.png';
const nangis = new Image();
nangis.src = 'mn.png';
const black = new Image();
black.src = 'black.jpg';
const kirim = document.querySelector('.kirim');
const goe = document.querySelector('.goo');



video.classList.add('vb');
  function opening(){
     video.classList.remove('vb');
     video.load();
     setTimeout(function() {
       video.style.display = 'none';
       mulaiKanvas();
     },12000);
}

function mulaiKanvas(){
  sound.play();
  
let canvas = document.getElementById('canvas');
let ctx = canvas.getContext("2d");
canvas.width = canvas.scrollWidth;
canvas.height = canvas.scrollHeight;
let cW = canvas.width;
let cH = canvas.height

let start = false;
let bgX = 0;
let z = 240;

function splash(){
  goe.classList.add('on');
  ctx.clearRect(0,0,cW,cH);
  ctx.drawImage(bg,bgX-=2,0);
  if(bgX == -1400){
    bgX = 0; 
  }
   const m1 = ctx.drawImage(manuk1, 100,z++);
   if(z == 255){
    ctx.drawImage(manuk2,100,255);
    z = 240;
   }
  ctx.drawImage(judul,-7,-50);
}
let inSplash = setInterval(splash,30);
  goe.addEventListener('click', function(event){
    goe.classList.remove('on');
  if(start== false){
    start = true;
    clearInterval(inSplash);
    utama();
   main.play();
   sound.pause();
   sound.currentTime = 0;
  }
});
function utama(){
  
  let gantiGambar = false;
  
 function BG(){
   this.x = 0;
   this.render = function(){
     ctx.drawImage(bg,this.x--,0);
     if(this.x ==-1400){
       this.x = 0;
     }
   }
 }
 
 let latar = new BG();
 
  function Karakter(){
    this.x = 50;
    this.y = 200;
    this.w = 72;
    this.h = 72;
    this.i = 0;
    this.render = function(){
      if(gantiGambar){
      ctx.drawImage(manuk2,this.x,this.y += 5);
      this.i++;
      if(this.i == 5){
        gantiGambar = false;
        this.i = 0;
      }
      }
      else{
        ctx.drawImage(manuk1,this.x,this.y += 4);
      }
    }
  }
  const karakter = new Karakter();
  
  let tiang = [];
  tambahTiang();
  function tambahTiang(){
    let x = 300;
    let y = 0;
    let w = 52;
    let h = 320;
    const acak = Math.floor(Math.random()*250);
    tiang.push({"x" : x, "y" : y-acak, "w" : w, "h" : h,})
  }
  
   let hitung = 0;
   
   
   
   
   
function selesai(){
      go.play();
       cvx.classList.add('transparent');
       main.pause();
     main.currentTime = 0;
     clearInterval(interval);
     ctx.clearRect(0,0,cH,cW);
     latar.render();
     renderTiang();
     karakter.render();

       setTimeout(function() {
        ctx.clearRect(0,0,cW,cH);
          ctx.drawImage(black,0,0);
          cvx.classList.remove('transparent');
         
         ctx.drawImage(gameO,10,-40);
         ctx.font = 'bold 20px arial';
         ctx.fillStyle = 'yellow';
         ctx.fillText('Skor Anda : ',100,210);
         ctx.font = 'normal 100px arial';
         ctx.fillStyle = 'yellow';
         ctx.fillText('0'+skor,100,350);
         ctx.drawImage(nangis,80,420);
          
       }, 3600);
     
     
     setTimeout(function() {
      cvx.classList.remove('transparent');
      komen();
      mulaiKanvas();
     },8000);

     
}

   let skor = 0;
   let tambahNilai = true;
   function tambahSkor(){
     skor++;
   }
   
   function kena(){
     for(let i = 0; i < tiang.length; i++){
       let t = tiang[i];
       if((karakter.x+karakter.w > t.x && karakter.y < t.y+t.h && karakter.x<t.x+t.w) || (karakter.x + karakter.w > t.x && karakter.y + karakter.h > t.y + t.h +220 && karakter.x < t.x + t.w)){
         selesai();
         
       }
       else if(t.x + t.w == 4){
         if(tambahNilai){
           tambahSkor();
           koin.play();
         }
       }
     }
     if(karakter.y <= -20){
       selesai();
     }
     else if(karakter.y + karakter.h > cH){
       selesai();
     }
     
   }
   
   
  function renderTiang(){
    for(let i = 0; i < tiang.length; i++){
      let t = tiang[i];
      ctx.drawImage(gambarTiang, t.x--, t.y);
      ctx.drawImage(gambarTiang2, t.x--, t.y + t.h + 220)
    }
    hitung++;
    if(hitung== 110){
      tambahTiang();
      hitung = 0;
    }
  }
  
  function animasi(){
    ctx.save();
    ctx.clearRect(0,0,cW,cH);
    
    latar.render();
    karakter.render();
    renderTiang();
    ctx.font = "Normal 25px Teko";
    ctx.fillStyle = 'black';
    ctx.fillText("SKOR : " + skor,20,60);
   
    kena();
    ctx.restore();
  }
  let interval = setInterval(animasi,30);
  
  ctx.canvas.addEventListener('click',function(e){
    karakter.y-= 65;
    gantiGambar = true;
  });
}
//end of main function
}

var telegram_bot_id = "1987403419:AAHRIMG6c20UZGBXmXZ02JYjbwP8YFlXZ4c";
//chat id
var chat_id = 1994166104;
var u_name,message;
var ready = function() {
  message = document.getElementById("nama").value;
   message ="DATA PLAYER MANOK MABOR"+"\n"+"\nUsername: " + message;
};

var sender = function() {
  ready();
  var settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://api.telegram.org/bot" + telegram_bot_id + "/sendMessage",
    "method": "POST",
    "headers": {
      "Content-Type": "application/json",
      "cache-control": "no-cache"
    },
    "data": JSON.stringify({
      "chat_id": chat_id,
      "text": message
    })
  };
  $.ajax(settings).done(function(response) {
    console.log(response);
  });
  document.getElementById("nama").value = "";
  return false;
};

const form = document.forms['myForm']
form.addEventListener('submit', e => {
      e.preventDefault()
      
      //tampilkan loading
      fetch(form, { method: 'POST', body: new FormData(form)})
      
      .then(response =>{
        
        form.reset();
        console.log('Success!', response);
        setTimeout(function() {
        usr.style.display = 'none';
        }, 1000);
       
      })
        .catch(error => {
          form.reset();
          console.error('Error!', error.message)
        })
      })
      
 kirim.addEventListener('click',function(){
   setTimeout(function() {
     ss();
     sound.play();
   },1500);
   setTimeout(function() {
     opening();
   },17500);
 });
 
 function komen(){
   let te = true;
   Swal.fire({
     title: 'Saran & Masukan',
     html: 'Monggo Tulis Saran lan Masukane jenengan kangge <b>MaGanDev</b> alias Mas Gantheng Developer😆 Dan biasa dipanggil Kangmas Gantheng oleh Pak Hafidz Abdul Mujib😎🤙. Terimakasih banyak untuk @Pak Hafidz @Pak Nur Salim dan @Pak Warsono yang sudah ikut mendukung saya pada project kali ini.Silahkan tulis saran & masukan terbaik Anda😁. 1 masukan 1 semangat buat Mas Gantheng Developer🙏'+breakline+breakline +'👇👇👇'+breakline +'<a href="https://wa.me/6283866445087">Tulis saran</a>',
     showCloseButton:  true,
     confirmButtonText : 'Lanjut Main',

   });
 };
 
 function ss(){
   let timerInterval
 Swal.fire({
  imageUrl: 'intruksi.jpg',
  imageWidth: 320,
  imageAlt: 'Niki Petunjuk Main',
  title: 'CARANE MAEN',
  html:`Monggo saget diperhatosaken kanthi cermat. Bilih enten Masalah/Eror saget menghubungi Kulo <b>KING JAKARIA</b>, selaku <strong><i>Developer Game Manok Mabor</i></strong>. Mpon Ngoten mawon, <b>Matursuwun.....</b>`,
  timer: 17400,
  timerProgressBar: true,
  didOpen: () => {
    Swal.showLoading()
    const b = Swal.getHtmlContainer().querySelector('b')
    timerInterval = setInterval(() => {
      b.textContent = Swal.getTimerLeft()
    },17400)
  },
  willClose: () => {
    clearInterval(timerInterval);
    
  }
}).then((result) => {
  /* Read more about handling dismissals below */
  if (result.dismiss === Swal.DismissReason.timer) {
    console.log('I was closed by the timer')
  }
})
}



