const userName = document.querySelector("#testimonel-user");
const userLocation = document.querySelector("#testimonel-location");
const userImage = document.querySelector("#testimonel-image");
const userReview = document.querySelector("#testimonel-review");
const rightBtn = document.querySelector("#testimonel-right-btn");
const leftBtn = document.querySelector("#testimonel-left-btn");
const loading = document.querySelector(".loading");
let users = [];

export async function getUsers() {
  const response = await fetch(
    "https://dummyjson.com/users?limit=5&select=firstName,lastName,address,image"
  );
  const data = await response.json();
  return data.users;
}

export async function getUserPost(index) {
  const response = await fetch(`https://dummyjson.com/users/${index}/posts`);
  const data = await response.json();
  return data.posts[0].body;
}

async function showTestimonial(index) {
  const user = users[index];
  userName.innerHTML = `${user.firstName} ${user.lastName}`;
  userLocation.innerHTML = user.address.city;
  userImage.src = user.image;
  userReview.innerHTML = await getUserPost(index);
}

users.length === 0 ? (loading.style.display = "none") : "";

(async function () {
  users = await getUsers();
  let index = 1;
  showTestimonial(index);

  rightBtn.addEventListener("click", async function () {
    index = (index % 4) + 1;
    showTestimonial(index);
  });

  leftBtn.addEventListener("click", async function () {
    index = ((index - 2 + 4) % 4) + 1;
    showTestimonial(index);
  });
})();
