const ADMIN_PASS = "1234";

/* SHOW LOGIN */
function showLogin() {
  document.getElementById("loginBox").style.display = "block";
}

/* LOGIN */
function login() {
  let p = document.getElementById("pass").value;

  if (p === ADMIN_PASS) {
    document.getElementById("loginBox").style.display = "none";
    document.getElementById("adminPanel").style.display = "block";
    document.getElementById("resultAdmin").style.display = "block";
  } else {
    alert("Wrong password");
  }
}

/* NEWS SYSTEM */
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
  let title = document.getElementById("title").value;
  let desc = document.getElementById("desc").value;
  let file = document.getElementById("imageFile").files[0];

  if (!title || !file) {
    alert("Title and image required");
    return;
  }

  let reader = new FileReader();

  reader.onload = function () {
    let imageData = reader.result;

    let data = JSON.parse(localStorage.getItem("news")) || [];

    data.push({
      title: title,
      image: imageData,
      desc: desc
    });

    localStorage.setItem("news", JSON.stringify(data));
    loadNews();
  };

  reader.readAsDataURL(file);
}

function deleteNews(i) {
  let data = JSON.parse(localStorage.getItem("news"));
  data.splice(i,1);
  localStorage.setItem("news", JSON.stringify(data));
  loadNews();
}

/* RESULT SYSTEM */
function addResult() {
  let name = document.getElementById("rname").value.trim();
  let roll = document.getElementById("roll").value.trim();
  let math = parseInt(document.getElementById("math").value) || 0;
  let science = parseInt(document.getElementById("science").value) || 0;
  let english = parseInt(document.getElementById("english").value) || 0;

  if (!name || !roll) {
    alert("Name and Roll required");
    return;
  }

  let total = math + science + english;
  let percent = ((total / 300) * 100).toFixed(2);

  let data = JSON.parse(localStorage.getItem("results")) || [];

  let existing = data.findIndex(s => s.roll === roll);
  if (existing !== -1) {
    data[existing] = { name, roll, math, science, english, total, percent };
  } else {
    data.push({ name, roll, math, science, english, total, percent });
  }

  localStorage.setItem("results", JSON.stringify(data));
  alert("Result Saved");
}

function searchResult() {
  let rollNo = document.getElementById("searchRoll").value.trim();
  let data = JSON.parse(localStorage.getItem("results")) || [];
  let box = document.getElementById("resultBox");

  let f = data.find(s => s.roll === rollNo);

  if (f) {
    box.innerHTML = `
      <div class="result-card">
        <h3>${f.name}</h3>
        <p>Roll: ${f.roll}</p>
        <p>Math: ${f.math}</p>
        <p>Science: ${f.science}</p>
        <p>English: ${f.english}</p>
        <h4>Total: ${f.total}</h4>
        <h4>Percentage: ${f.percent}%</h4>
      </div>
    `;
  } else {
    box.innerHTML = "<p>No result found</p>";
  }
}

/* LOAD */
window.onload = loadNews;
