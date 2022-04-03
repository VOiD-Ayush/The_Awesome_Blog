const categories = { fiction: [{ url: `/new_blog/posts/the-purpose-of-education/`, date: `12 Dec 1948`, title: `The Purpose of Education`},],jekyll: [{ url: `/new_blog/posts/welcome-to-jekyll/`, date: `03 Apr 2022`, title: `Welcome to Jekyll!`},{ url: `/new_blog/posts/jekyll-markdown/`, date: `04 Nov 2021`, title: `Jekyll Markdown`},{ url: `/new_blog/posts/the-purpose-of-education/`, date: `12 Dec 1948`, title: `The Purpose of Education`},],update: [{ url: `/new_blog/posts/welcome-to-jekyll/`, date: `03 Apr 2022`, title: `Welcome to Jekyll!`},], }

window.onload = function () {
  document.querySelectorAll(".category").forEach((category) => {
    category.addEventListener("click", function (e) {
      const posts = categories[e.target.innerText];
      let html = ``
      posts.forEach(post=>{
        html += `
        <a class="modal-article" href="${post.url}">
          <h4>${post.title}</h4>
          <small class="modal-article-date">${post.date}</small>
        </a>
        `
      })
      document.querySelector("#category-modal-title").innerText = e.target.innerText;
      document.querySelector("#category-modal-content").innerHTML = html;
      document.querySelector("#category-modal-bg").classList.toggle("open");
      document.querySelector("#category-modal").classList.toggle("open");
    });
  });

  document.querySelector("#category-modal-bg").addEventListener("click", function(){
    document.querySelector("#category-modal-title").innerText = "";
    document.querySelector("#category-modal-content").innerHTML = "";
    document.querySelector("#category-modal-bg").classList.toggle("open");
    document.querySelector("#category-modal").classList.toggle("open");
  })
};