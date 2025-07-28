document.querySelector(".post-btn").addEventListener("click", function () {
  var question = document.getElementById("question").value.trim();
  var description = document.getElementById("description").value.trim();
  var imageInput = document.getElementById("imageInput").files[0];

  if (!question || !description || !imageInput) {
    alert("Please fill all required data");
    return;
  }
  var posts = JSON.parse(localStorage.getItem("posts")) || [];
  var newPost = { question: question, description: description, image: null };

  if (imageInput) {
    var reader = new FileReader();
    reader.onload = function (e) {
      newPost.image = e.target.result;
      posts.push(newPost);
      localStorage.setItem("posts", JSON.stringify(posts));
      window.location.href = "index.html";
    };
  reader.readAsDataURL(imageInput);
  }
  else {
    posts.push(newPost);
    localStorage.setItem("posts",JSON.stringify(posts));
    window.location.href = "index.html";
  }
});
