const musicContainer = document.getElementById("music-container");

const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");

const audio = document.getElementById("audio");
const progress = document.getElementById("progress");
const progressBar = document.getElementById("progress-container");

const title = document.getElementById("title");
const coverImg = document.getElementById("cover");

const songs = ["song1", "song2", "song3"];

let songIndex = 0;

loadSong(songs[songIndex]);

//Function to load Song on UI
function loadSong(song) {
  title.innerText = song;
  coverImg.src = `Images/${song}.jpg`;
  audio.src = `Songs/${song}.mp3`;
}

//function to play Song
function playSong() {
  musicContainer.classList.add("play");

  playBtn.querySelector("i.pl").classList.remove("ri-play-large-fill");
  playBtn.querySelector("i.pl").classList.add("ri-pause-large-line");

  audio.play();

  // progress.style.width = "1";
}
//Function to pause Song
function pauseSong() {
  musicContainer.classList.remove("play");

  playBtn.querySelector("i.pl").classList.remove("ri-pause-large-line");
  playBtn.querySelector("i.pl").classList.add("ri-play-large-fill");
  audio.pause();
}
//Function to play song
playBtn.addEventListener("click", () => {
  const isPlaying = musicContainer.classList.contains("play");

  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});

function updateProgress(e) {
  const { duration, currentTime } = e.srcElement;
  const timePercent = (currentTime / duration) * 100;

  progress.style.width = `${timePercent}%`;
  // console.log(duration, currentTime, timePercent);
}

function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;

  audio.currentTime = (clickX / width) * duration;

  console.log(width, clickX);
}

//Event Listeners
nextBtn.addEventListener("click", () => {
  songIndex++;
  if (songIndex > songs.length - 1) {
    songIndex = songs.length - 3;
  }

  loadSong(songs[songIndex]);
  playSong();
});
prevBtn.addEventListener("click", () => {
  songIndex--;
  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }

  loadSong(songs[songIndex]);
  playSong();
});

audio.addEventListener("timeupdate", updateProgress);
progressBar.addEventListener("click", setProgress);
audio.addEventListener("ended", () => {
  songIndex++;
  if (songIndex > songs.length - 1) {
    songIndex = songs.length - 3;
  }

  loadSong(songs[songIndex]);
  playSong();
});
