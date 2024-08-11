const video = document.getElementById("video");
const play = document.getElementById("play");
const stopV = document.getElementById("stop");
const progress = document.getElementById("progress");
const timeStamp = document.getElementById("timestamp");

function toggleVideoFunc() {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
}

function updatePlayIcon() {
  if (video.paused) {
    play.innerHTML = '<i class="ri-play-large-fill"></i>';
  } else {
    play.innerHTML = '<i class="ri-pause-large-fill"></i>';
  }
}

function updateProgress() {
  progress.value = (video.currentTime / video.duration) * 100;

  let mins = Math.floor(video.currentTime / 60);
  if (mins < 10) {
    mins = "0" + String(mins);
  }

  let scs = Math.floor(video.currentTime % 60);
  if (scs < 10) {
    scs = "0" + String(scs);
  }
  timeStamp.innerHTML = `${mins}:${scs}`;
}

function stopVideo() {
  video.currentTime = 0;
  video.pause();
  // play.innerHTML = '<i class="ri-play-large-fill"></i>';
}

function VideoProgress() {
  // console.log(progress.value);
  video.currentTime = (progress.value * video.duration) / 100;
  // console.log(video.currentTime);
}
video.addEventListener("click", toggleVideoFunc);
video.addEventListener("play", updatePlayIcon);
video.addEventListener("pause", updatePlayIcon);
play.addEventListener("click", toggleVideoFunc);
stopV.addEventListener("click", stopVideo);
progress.addEventListener("change", VideoProgress);
video.addEventListener("timeupdate", updateProgress);

// video.removeAttribute("controls");
// controls.style.visibility = "visible";
