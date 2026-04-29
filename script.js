const ADMIN_PASS = "1234";

// DEFAULT NEWS (first load)
if (!localStorage.getItem("news")) {
  const defaultNews = [
    {
      title: "New Library Opened",
      image: "https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg",
      desc: "Modern learning space for students."
    },
    {
      title: "Science Fair",
      image: "https://images.pexels.com/photos/4145190/pexels-photo-4145190.jpeg",
      desc: "Students presented amazing projects."
    }
  ];
  localStorage.setItem("news", JSON.stringify(defaultNews));
}

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

// DELETE
function deleteNews(i) {
  let data = JSON.parse(localStorage.getItem("news"));
  data.splice(i,1);
  localStorage.setItem("news", JSON.stringify(data));
  loadNews();
}

// LOAD
function loadNews() {
  let news = JSON.parse(localStorage.getItem("news")) || [];
  let box = document.getElementById("newsContainer");

  box.innerHTML = "";

  news.forEach((n,i)=>{
    box.innerHTML += `
      <div class="card">
        <img src="${n.image}" onerror="this.src='https://via.placeholder.com/300'">
        <h3>${n.title}</h3>
        <p>${n.desc}</p>
        <button onclick="deleteNews(${i})">Delete</button>
      </div>
    `;
  });
}

loadNews();