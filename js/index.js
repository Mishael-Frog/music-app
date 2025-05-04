let progressEl = document.querySelector('#progress');

let musicList = [
    {
        artist: "Unknown",
        song: "Phonk",
        src:'./audio/1.mp3'
    },
    {
        artist: "Unknown",
        song: "Bad pigs",
        src:'./audio/2.mp3'
    },
    {
        artist: "Unknown",
        song: "Phonk",
        src:'./audio/3.mp3'
    },
    {
        artist: "Король и шут",
        song: "Phonk",
        src:'./audio/4.mp3'
    },
    {
        artist: "Unknown",
        song: "Сидим с бобром за столом",
        src:'./audio/5.mp3'
    }
]

let controls = {
    play: document.querySelector('#action img'),
    next: document.querySelector('#next'),
    prev: document.querySelector('#prev')
}

let isPlaying = false
let currentIndex = Math.floor(musicList.length / 2);
let currentMusic = new Audio(musicList[currentIndex].src);

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
}
function handlePrev(){
    currentIndex > 0 ? currentIndex-- : currentIndex= musicList.length - 1;
    currentMusic.src = musicList[currentIndex%musicList.length].src;
    currentMusic.play();
}

controls.play.addEventListener('click', handleAction);
controls.next.addEventListener('click', handleNext);
controls.prev.addEventListener('click', handlePrev);

currentMusic.addEventListener('timeupdate',(e) => {
    currentTime = e.target.currentTime;
    console.log(currentTime);
    let percent = (currentTime / currentMusic.duration) * 100;
    progressEl.style.width = `${percent}%`;
})