const filterBar = document.getElementById("filter");
const postContainer = document.querySelector(".post-container");
const loading = document.querySelector(".loader");

let limit = 5;
let page = 1;

async function getPosts() {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`
  );

  const data = await res.json();

  return data;
}

async function showPosts() {
  const posts = await getPosts();

  posts.forEach((post) => {
    const postEl = document.createElement("div");
    postEl.classList.add("post");
    postEl.innerHTML = `
        <div class="number">${post.id}</div>
            <div class="post-info">
                <h2 class="post-title">${post.title}</h2>
                <p class="post-body">${post.body}</p>
            </div>
    `;

    postContainer.appendChild(postEl);
  });

  //   console.table(posts);
}

function showLoading() {
  loading.classList.add("show");

  setTimeout(() => {
    loading.classList.remove("show");

    setTimeout(() => {
      page++;
      showPosts();
    }, 300);
  }, 1000);
}

function filterPosts(e) {
  // console.log(e.target.value);
  const term = e.target.value.toUpperCase();
  const posts = document.querySelectorAll(".post");
  posts.forEach((post) => {
    const postTitle = post.querySelector(".post-title").innerText.toUpperCase();
    const postBody = post.querySelector(".post-body").innerText.toUpperCase();

    if (postTitle.indexOf(term) > -1 || postBody.indexOf(term) > -1) {
      post.style.display = "flex";
      // console.log("If is working");
    } else {
      post.style.display = "none";
      // console.log("Else is working");
    }
  });
}
showPosts();

window.addEventListener("scroll", () => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

  if (scrollTop + clientHeight >= scrollHeight - 5) {
    showLoading();
  }
});

filterBar.addEventListener("input", filterPosts);
