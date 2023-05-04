import { posts, goToPage } from "../index.js";
import { renderHeaderComponent } from "./header-component.js";
export function renderUserPostsPageComponent({ appEl }) {
    // TODO: реализовать рендер постов из api
    console.log("Актуальный список постов:", posts);
    const postsSet = posts.map((post, index) => {
      return `<li class="post">
    <div class="post-header" data-user-id=${post.user.id}>
        <img src=${post.user.imageUrl} class="post-header__user-image">
        <p class="post-header__user-name">${post.user.name}</p>
    </div>
    <div class="post-image-container">
      <img class="post-image" src=${post.imageUrl} >
    </div>
    <div class="post-likes">
      <button data-post-id=${post.id} class="like-button">
        <img src="./assets/images/like-active.svg">
      </button>
      <p class="post-likes-text">
        Нравится: <strong>${post.likes.length}</strong> 
      </p>
    </div>
    <p class="post-text">
      <span class="user-name">${post.user.name}</span>
      ${post.description}
    </p>
    <p class="post-date">
      19 минут назад
    </p>
  </li>`
    })
  
    const appHtml = `
    <div class="page-container">
      <div class="header-container"></div>
      <ul class="posts">
        ${postsSet}
      </ul>
    </div>`;
  
    appEl.innerHTML = appHtml;
  
    renderHeaderComponent({
      element: document.querySelector(".header-container"),
    });
  }