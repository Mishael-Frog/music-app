let progressEl = document.querySelector('#progress');
let timeEl = document.querySelector('#time')
let playlistEl = document.querySelector('#playlist');
let playlistBtn = document.querySelector('.app-playlist');
let playlistTable = document.querySelector('.playlist-table');
let closeBtn = document.querySelector('#close');
let muteBtn = document.querySelector('#mute');
let repeatBtn = document.querySelector('#repeat');

let musicList = [
    {
        artist: "Unknown",
        song: "Phonk",
        src:'./audio/1.mp3',
        duration:'03:13'
    },
    {
        artist: "Unknown",
        song: "Bad pigs",
        src:'./audio/2.mp3',
        duration:'02:04'
    },
    {
        artist: "Unknown",
        song: "Phonk",
        src:'./audio/3.mp3',
        duration:'02:01'
    },
    {
        artist: "Король и шут",
        song: "Phonk",
        src:'./audio/4.mp3',
        duration:'03:11'
    },
    {
        artist: "Unknown",
        song: "Шимпанзини пананини",
        src:'./audio/5.mp3',
        duration:'05:11'
    }
]

let controls = {
    play: document.querySelector('#action img'),
    next: document.querySelector('#next'),
    prev: document.querySelector('#prev')
}

let currentTime = 0;
let isPlaying = false
let currentIndex = Math.floor(musicList.length / 2);
let currentMusic = new Audio(musicList[currentIndex].src);
let mins = 0;
let secs = 0;
let isMute = false;
let isRepeat = false;

function handleAction(){
    currentMusic.play();
    if(isPlaying){
        currentMusic.pause();
        isPlaying = false;
        controls.play.src = './assets/play.png'
    }else{
        currentMusic.play();
        isPlaying = true;
        controls.play.src = './assets/pause.png'
    }
}

function handleNext(){
    currentIndex<musicList.length?currentIndex++:currentIndex=0;
    currentMusic.src = musicList[currentIndex].src;
    currentMusic.play();
    controls.play.src = './assets/pause.png'
}
function handlePrev(){
    currentIndex > 0 ? currentIndex-- : currentIndex= musicList.length - 1;
    currentMusic.src = musicList[currentIndex%musicList.length].src;
    currentMusic.play();
    controls.play.src = './assets/pause.png'
}

function openPlaylist(){
    playlistEl.classList.toggle('active');

    playlistTable.innerHTML = ' '
    
    if(playlistEl.classList.contains('active')){

        musicList.forEach((music,index) => {
            let li = `<li class="playlist-card"> <div>#${index + 1}</div> <div>${music.song}</div> <div>${music.artist}</div> <div>${music.duration} </div> </li>`
            playlistTable.innerHTML += li;
        })

    }
}

function handleMute(){
    currentMusic.muted = !isMute;
    isMute = !isMute;

    if(isMute == true){
        muteBtn.querySelector('img').src = './assets/volume-x.png'
    }
    else{
        muteBtn.querySelector('img').src = './assets/volume.png'
    }
}

function handleRepeat(){
    currentMusic.loop = !isRepeat;  
    isRepeat = !isRepeat    
}

controls.play.addEventListener('click', handleAction);
controls.next.addEventListener('click', handleNext);
controls.prev.addEventListener('click', handlePrev);

currentMusic.addEventListener('timeupdate',(e) => {
    currentTime = e.target.currentTime;
    mins = String(Math.floor(currentTime / 60)).padStart(2,'0');
    secs = String(Math.floor(currentTime%60)).padStart(2,'0');;
    timeEl.innerHTML = `${mins} : ${secs}`;

    let percent = (currentTime / currentMusic.duration) * 100;
    progressEl.style.width = `${percent}%`;
})

playlistBtn.addEventListener('click',openPlaylist);
repeatBtn.addEventListener('click',handleRepeat);
muteBtn.addEventListener('click',handleMute);
closeBtn.addEventListener('click',()=>{
    console.log('клик-по хомячку')
    playlistEl.classList.remove('active');
})
