const form = document.getElementById("form");
const search = document.getElementById("search");
const result = document.getElementById("result");
const more = document.getElementById("more");
const span = document.getElementById("span");
const apiURL = "https://api.lyrics.ovh";

function showError() {
  span.style.opacity = 1;

  setTimeout(() => {
    span.style.opacity = 0;
  }, 2000);
}
async function searchFunc(term) {
  const res = await fetch(`${apiURL}/suggest/${term}`);
  const data = await res.json();

  //   console.log(data);
  showData(data);
}

function showData(data) {
  let output = "";

  data.data.forEach((song) => {
    output += `
        <li>
        <span><strong>${song.artist.name}</strong> - ${song.title}</span>
        <button class="btn" data-artist = "${song.artist.name}" data-songtitle = "${song.title}">Get Lyrics</button>
        </li>
        `;
  });

  result.innerHTML = `
  <ul class="songs">
    ${output}
  </ul>
  `;

  if (data.prev || data.next) {
    more.innerHTML = `
      ${
        data.prev
          ? `<button class="btn" onclick = "getMoreSongs('${data.prev}')">Prev</button>`
          : ""
      }
      ${
        data.next
          ? `<button class ="btn" onclick = "getMoreSongs('${data.next}')">Next</button>`
          : ""
      }
    `;
  } else {
    more.innerHTML = "";
  }
}

function getMoreSongs(url) {
  setTimeout(() => {
    fetch(`https://cors-anywhere.herokuapp.com/${url}`)
      .then((res) => res.json())
      .then((data) => showData(data))
      .catch((error) => console.error("Error:", error));
  }, 1000);
}
async function getSongLyrics(artist, title) {
  const res = await fetch(`${apiURL}/v1/${artist}/${songTitle}`);
  const data = await res.json();

  const lyrics = data.lyrics.replace(/(\r\n|\r|\n)/g, "<br>");
  result.innerHTML = `
    <h2><strong>${artist}</strong>-${songTitle}</h2>
    <span>${lyrics}</span>
  `;
  more.innerHTML = "";
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const searchTerm = search.value;

  if (!searchTerm) {
    showError();
  } else {
    searchFunc(searchTerm);
  }
});

result.addEventListener("click", (e) => {
  const resultEl = e.target;

  if (resultEl.tagName === "P") {
    const artist = resultEl.getAttribute("data-artist");
    const songTitle = resultEl.getAttribute("song-title");

    getSongLyrics(artist, songTitle);
  }
});
