import { USER_POSTS_PAGE, POSTS_PAGE } from "../routes.js";
import { renderHeaderComponent } from "./header-component.js";
import { posts, goToPage, user } from "../index.js";
import { addLike, removeLike, removePost } from "../api.js";
import { formatDistanceToNow } from "date-fns/";
import { ru } from "date-fns/locale/";
export function renderPostsPageComponent({ appEl }) {
  // TODO: реализовать рендер постов из api
  console.log("Актуальный список постов:", posts);
  const postsSet = posts.map((post, index) => {
    return `<li class="post">
  <div class="post-header" data-user-id=${post.user.id}>
      <div class="logo__name">
      <img src=${post.user.imageUrl} class="post-header__user-image">
      <p class="post-header__user-name">${post.user.name}</p>
      </div>
      ${user ? `<button data-post-id=${post.id} class="remove-button">
      <img src="./assets/images/remove_basket.svg"></img> 
      </button>` : ''}
  </div>
  <div class="post-image-container">
    <img class="post-image" src=${post.imageUrl} >
  </div>
  <div class="post-likes">
    <button data-post-id=${post.id} data-post-like=${post.isLiked} class="like-button">
      ${post.isLiked ? '<img src="./assets/images/like-active.svg"></img>' : '<img src="./assets/images/like-not-active.svg"></img>'} 
    </button>
    <p class="post-likes-text">
    ${post.likes.length < 1 ?
        `Нравится: <strong> ${post.likes.length}</strong>` : post.likes.length === 1 ?
          `Нравится: <strong> ${post.likes[0].name} </strong>` :
          `Нравится: <strong> ${post.likes[Math.floor(Math.random() * ((post.likes.length - 1) - 0 + 1)) + 0].name} и еще ${post.likes.length - 1}</strong>`}
    </p>
  </div>
  <p class="post-text">
    <span class="user-name">${post.user.name}</span>
    ${post.description}
  </p>
  <p class="post-date">
  ${formatDistanceToNow(new Date(post.createdAt), {locale: ru})} назад
  </p>
</li>`
  })
  /**
   * TODO: чтобы отформатировать дату создания поста в виде "19 минут назад"
   * можно использовать https://date-fns.org/v2.29.3/docs/formatDistanceToNow
   */

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

  for (let userEl of document.querySelectorAll(".post-header")) {
    userEl.addEventListener("click", () => {
      goToPage(USER_POSTS_PAGE, {
        userId: userEl.dataset.userId,
      });
    });
  }

  for (let likeEl of document.querySelectorAll(".like-button")) {
    likeEl.addEventListener('click', () => {
      console.log(likeEl.dataset.postLike);
      if (likeEl.dataset.postLike === 'false') {
        addLike({ postID: likeEl.dataset.postId, token: `Bearer ${user.token}` })
          .then(() => goToPage(undefined, 'like'))
          .catch((error) => alert('Что то пошло не так!'))

      } else {
        removeLike({ postID: likeEl.dataset.postId, token: `Bearer ${user.token}` })
          .then(() => goToPage(undefined, 'like'))

      }

    })
  }

  for (let removeButton of document.querySelectorAll('.remove-button')) {
    removeButton.addEventListener('click', (event) => {
      event.stopPropagation();
      if (confirm('Вы уверены?')) {
        removePost({ postID: removeButton.dataset.postId, token: `Bearer ${user.token}` })
          .then(() => goToPage(undefined, 'like'))
          .catch((error) => alert('Что то пошло не так!'));
      } else {
        return;
      }

    })
  }
}
