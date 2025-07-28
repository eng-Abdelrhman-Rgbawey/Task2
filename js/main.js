var postsPerPage = 3;
var currentPage = 1;

function renderPosts() {
  var postsContainer = document.getElementById("posts-container");
  postsContainer.innerHTML = "";

  var posts = JSON.parse(localStorage.getItem("posts")) || [];

  var start = (currentPage - 1) * postsPerPage;
  var end = start + postsPerPage;
  var paginatedPosts = posts.slice(start, end);

  for (var i = 0; i < paginatedPosts.length; i++) {
    var post = paginatedPosts[i];

    var postDiv = document.createElement("div");
    postDiv.classList.add("post");

    var q = document.createElement("p");
    q.classList.add("qustion");
    q.textContent = post.question;

    var name = document.createElement("p");
    name.classList.add("name");
    name.textContent = "By: Abdelrhman Ahmed";

    var img = document.createElement("img");
    img.src = post.image;

    var desc = document.createElement("p");
    desc.classList.add("comment");
    desc.textContent = post.description;

    var iconsDiv = document.createElement("div");
    iconsDiv.classList.add("post-icons");
    iconsDiv.innerHTML =
      '<i class="fa-solid fa-comment"></i><span>0</span>' +
      '<i class="fa-solid fa-heart"></i><span>0</span>';

    var commentBar = document.createElement("div");
    commentBar.classList.add("commet-bar");
    commentBar.innerHTML =
      '<input type="text" placeholder="Write a comment...">' +
      '<a href="#"><i class="fa-solid fa-paper-plane"></i></a>';

    postDiv.appendChild(q);
    postDiv.appendChild(name);
    postDiv.appendChild(img);
    postDiv.appendChild(desc);
    postDiv.appendChild(iconsDiv);
    postDiv.appendChild(commentBar);

    postsContainer.appendChild(postDiv);
  }

  renderPagination(posts.length, postsContainer);
}

function renderPagination(totalPosts, postsContainer) {
  var totalPages = Math.ceil(totalPosts / postsPerPage);

  var paginationDiv = document.getElementById("pagination");
  if (!paginationDiv) {
    paginationDiv = document.createElement("div");
    paginationDiv.id = "pagination";
    paginationDiv.style.display = "flex";
    paginationDiv.style.justifyContent = "center";
    paginationDiv.style.gap = "10px";
    paginationDiv.style.marginTop = "20px";
    paginationDiv.style.marginBottom = "20px";
    postsContainer.after(paginationDiv);
  }
  paginationDiv.innerHTML = "";

  var prevBtn = document.createElement("button");
  prevBtn.textContent = "<";
  prevBtn.disabled = currentPage === 1;
  prevBtn.onclick = function () {
    currentPage--;
    renderPosts();
  };
  paginationDiv.appendChild(prevBtn);

  for (var i = 1; i <= totalPages; i++) {
    var pageBtn = document.createElement("button");
    pageBtn.textContent = i;
    pageBtn.style.fontWeight = i === currentPage ? "bold" : "normal";
    pageBtn.setAttribute("data-page", i);
    pageBtn.onclick = function () {
      currentPage = parseInt(this.getAttribute("data-page"));
      renderPosts();
    };
    paginationDiv.appendChild(pageBtn);
  }

  var nextBtn = document.createElement("button");
  nextBtn.textContent = ">";
  nextBtn.disabled = currentPage === totalPages;
  nextBtn.onclick = function () {
    currentPage++;
    renderPosts();
  };
  paginationDiv.appendChild(nextBtn);
}

function createAddButton() {
  var addBtn = document.createElement("button");
  addBtn.id = "addPostBtn";
  addBtn.textContent = "+";
  addBtn.style.position = "fixed";
  addBtn.style.bottom = "20px";
  addBtn.style.right = "20px";
  addBtn.style.width = "50px";
  addBtn.style.height = "50px";
  addBtn.style.borderRadius = "50%";
  addBtn.style.backgroundColor = "orange";
  addBtn.style.color = "white";
  addBtn.style.fontSize = "24px";
  addBtn.style.border = "none";
  addBtn.style.cursor = "pointer";

  addBtn.onclick = function () {
    window.location.href = "addpost.html";
  };

  document.body.appendChild(addBtn);
}

window.addEventListener("DOMContentLoaded", function () {
  renderPosts();
  createAddButton();
});
window.onscroll = function () {
    var btn = document.getElementById("goTop");
    if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {

        btn.style.display = "block";
    } else {
        btn.style.display = "none";
    }
};
document.getElementById("goTop").addEventListener("click", function () {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});