let postsArr = [];
const form = document.getElementById("form");

function renderPosts() {
  const postsHtml = postsArr
    .map(
      (post) => `
<h2>${post.title}</h2>
<p>${post.body}</p>
<hr/>
`
    )
    .join("");

  document.getElementById("post-container").innerHTML = postsHtml;
}

fetch("https://apis.scrimba.com/jsonplaceholder/posts")
  .then((res) => res.json())
  .then((data) => {
    postsArr = data.slice(0, 5);
    renderPosts();
  });

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const newPost = {
    title: `${document.getElementById("title").value}`,
    body: `${document.getElementById("post-body").value}`,
  };

  fetch("https://apis.scrimba.com/jsonplaceholder/posts", {
    method: "POST",
    body: JSON.stringify(newPost),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      const options = {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      };

      fetch("https://apis.scrimba.com/jsonplaceholder/posts", options)
        .then((res) => res.json())
        .then((post) => {
          postsArr.unshift(post);
          renderPosts();
          form.reset();
        });
    });
});
