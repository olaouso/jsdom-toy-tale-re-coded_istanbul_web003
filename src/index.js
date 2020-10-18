let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});
fetch("http://localhost:3000/toys")
.then(resp => resp.json())
.then(json => renderToys(json));

function renderToys(data){
  data.map(toy=>{
    document.querySelector("#toy-collection").innerHTML += `
    <div class = "card"
      <h2>${toy.name}</h2>
      <img class="toy-avatar" src=${toy.image} alt="toy picture" width="150" height="150" />
      <button class="like-btn" id=${toy.id} >Like</button>
      <p class=toy-${toy.id}>${toy.likes} Likes</p>
    </div>
    `
})


document.querySelectorAll(".like-btn").forEach(el => el.addEventListener("click",(e)=>{
  let curr = document.querySelector(`.toy-${e.target.id}`).innerText;

  curr = (parseInt(curr.match(/\d/g)[0]))+1
  document.querySelector(`.toy-${e.target.id}`).innerText = `${curr} Likes`

  fetch(`http://localhost:3000/toys/${e.target.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      likes: curr
    })
  })

}))





document.querySelector(".add-toy-form").addEventListener("submit", e =>{
  e.preventDefault();

  fetch("http://localhost:3000/toys", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      name:  document.querySelector(".add-toy-form [name=name]").value,
      image: document.querySelector(".add-toy-form [name=image]").value,
      likes: 0
    })
  })
})
}