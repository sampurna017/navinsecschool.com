const ADMIN_PASS = "1234";

/* DEFAULT NEWS */
if (!localStorage.getItem("news")) {
  localStorage.setItem("news", JSON.stringify([
    {
      title: "Library Opened",
      image: "https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg",
      desc: "New modern library"
    }
  ]));
}

/* LOGIN */
function showLogin() {
  document.getElementById("loginBox").style.display = "block";
}

function login() {
  let p = document.getElementById("pass").value;

  if (p === ADMIN_PASS) {
    document.getElementById("loginBox").style.display = "none";

    let a = document.getElementById("adminPanel");
    let r = document.getElementById("resultAdmin");

    if (a) a.style.display = "block";
    if (r) r.style.display = "block";

  } else {
    alert("Wrong password");
  }
}

/* NEWS */
function loadNews() {
  let data = JSON.parse(localStorage.getItem("news")) || [];
  let box = document.getElementById("newsContainer");

  box.innerHTML = "";

  data.forEach((n,i)=>{
    box.innerHTML += `
      <div class="card">
        <img src="${n.image}">
        <h3>${n.title}</h3>
        <p>${n.desc}</p>
        <button onclick="deleteNews(${i})">Delete</button>
      </div>
    `;
  });
}

function addNews() {
  let data = JSON.parse(localStorage.getItem("news"));
  data.push({
    title: title.value,
    image: image.value,
    desc: desc.value
  });
  localStorage.setItem("news", JSON.stringify(data));
  loadNews();
}

function deleteNews(i) {
  let data = JSON.parse(localStorage.getItem("news"));
  data.splice(i,1);
  localStorage.setItem("news", JSON.stringify(data));
  loadNews();
}

/* RESULT SYSTEM */
function addResult() {
  let data = JSON.parse(localStorage.getItem("results")) || [];

  let math = +document.getElementById("math").value;
  let science = +document.getElementById("science").value;
  let english = +document.getElementById("english").value;

  let total = math + science + english;
  let percent = (total/300*100).toFixed(2);

  data.push({
    name: rname.value,
    roll: roll.value,
    math, science, english, total, percent
  });

  localStorage.setItem("results", JSON.stringify(data));
}

function searchResult() {
  let rollNo = searchRoll.value;
  let data = JSON.parse(localStorage.getItem("results")) || [];

  let f = data.find(s=>s.roll === rollNo);
  let box = document.getElementById("resultBox");

  if (f) {
    box.innerHTML = `
      <h3>${f.name}</h3>
      <p>Total: ${f.total}</p>
      <p>Percentage: ${f.percent}%</p>
    `;
  } else {
    box.innerHTML = "No result found";
  }
}

window.onload = loadNews;
