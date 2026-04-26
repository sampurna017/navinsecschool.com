const ADMIN_PASS = "1234";

// SHOW LOGIN
function showLogin() {
  document.getElementById("loginBox").style.display = "block";
}

// LOGIN
function login() {
  let p = document.getElementById("pass").value;

  if (p === ADMIN_PASS) {
    document.getElementById("loginBox").style.display = "none";
    document.getElementById("adminPanel").style.display = "block";
    alert("Logged in as admin");
  } else {
    alert("Wrong password");
  }
}

// ADD NEWS
function addNews() {
  let title = document.getElementById("title").value;
  let image = document.getElementById("image").value;
  let desc = document.getElementById("desc").value;

  let data = JSON.parse(localStorage.getItem("news")) || [];
  data.push({ title, image, desc });

  localStorage.setItem("news", JSON.stringify(data));
  loadNews();
}

// DELETE NEWS
function deleteNews(index) {
  let data = JSON.parse(localStorage.getItem("news"));
  data.splice(index, 1);
  localStorage.setItem("news", JSON.stringify(data));
  loadNews();
}

// LOAD NEWS
function loadNews() {
  let news = JSON.parse(localStorage.getItem("news")) || [];
  let container = document.getElementById("news");

  container.innerHTML = "";

  news.forEach((n, i) => {
    container.innerHTML += `
      <div class="card">
        <img src="${n.image}">
        <h3>${n.title}</h3>
        <p>${n.desc}</p>
        <button onclick="deleteNews(${i})">Delete</button>
      </div>
    `;
  });
}

// LOAD ON START
loadNews();// DEFAULT NEWS (first time only)
if (!localStorage.getItem("news")) {
  const defaultNews = [
    {
      title: "New Library Opened",
      image: "https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg",
      desc: "Modern library with digital facilities."
    },
    {
      title: "Science Fair",
      image: "https://images.pexels.com/photos/4145190/pexels-photo-4145190.jpeg",
      desc: "Students showcased innovative ideas."
    }
  ];

  localStorage.setItem("news", JSON.stringify(defaultNews));
}
