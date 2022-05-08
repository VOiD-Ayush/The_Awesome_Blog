const categories = { Pwn: [{ url: `/new_blog/posts/PWN101-Tryhackme/`, date: `29 Apr 2022`, title: `PWN101`},{ url: `/new_blog/posts/0x41haz-Tryhackme/`, date: `04 Apr 2022`, title: `0x41haz`},],Tryhackme: [{ url: `/new_blog/posts/PWN101-Tryhackme/`, date: `29 Apr 2022`, title: `PWN101`},{ url: `/new_blog/posts/stuxctf-Tryhackme/`, date: `19 Apr 2022`, title: `StuxCTF`},{ url: `/new_blog/posts/Tech_Supp0rt-1-Tryhackme/`, date: `19 Apr 2022`, title: `Tech Supp0rt 1`},{ url: `/new_blog/posts/Ollie-Tryhackme/`, date: `08 Apr 2022`, title: `Ollie`},{ url: `/new_blog/posts/0x41haz-Tryhackme/`, date: `04 Apr 2022`, title: `0x41haz`},],Web: [{ url: `/new_blog/posts/stuxctf-Tryhackme/`, date: `19 Apr 2022`, title: `StuxCTF`},{ url: `/new_blog/posts/Tech_Supp0rt-1-Tryhackme/`, date: `19 Apr 2022`, title: `Tech Supp0rt 1`},{ url: `/new_blog/posts/Ollie-Tryhackme/`, date: `08 Apr 2022`, title: `Ollie`},],Sqli: [{ url: `/new_blog/posts/Ollie-Tryhackme/`, date: `08 Apr 2022`, title: `Ollie`},],Subrion: [{ url: `/new_blog/posts/Tech_Supp0rt-1-Tryhackme/`, date: `19 Apr 2022`, title: `Tech Supp0rt 1`},],Crypto: [{ url: `/new_blog/posts/stuxctf-Tryhackme/`, date: `19 Apr 2022`, title: `StuxCTF`},], }

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