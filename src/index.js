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

const toyCollection = document.getElementById('toy-collection');

  fetch("http://localhost:3000/toys")
  .then(res => res.json())
  .then(data => {

    console.log(data);

    for(const toy of data)
    {
      const card = document.createElement("div");
      const cardH2 = document.createElement("h2");
      const cardImg = document.createElement("img");
      const cardP = document.createElement("p");
      const cardButton = document.createElement("button");

      card.classList.add("card");
      cardH2.innerText = toy.name;
      cardImg.src = toy.image;
      cardImg.classList.add("toy-avatar")
      cardP.innerText = toy.likes + " Likes";
      cardButton.id = toy.id;
      cardButton.classList.add("like-btn");
      cardButton.innerText = "Like ❤️"

      card.append(cardH2);
      card.append(cardImg);
      card.append(cardP);
      card.append(cardButton);

      toyCollection.append(card);
    }

    updateToy();
  })
  .catch(error => console.log(error));



  toyFormContainer.addEventListener("submit", (e) => {
    e.preventDefault();

    const toy = {
      name: e.target.name.value,
      image: e.target.image.value,
      likes: 0
    }
    const configuration = {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(toy)
    }

    fetch("http://localhost:3000/toys", configuration)
    .then(res => res.json())
    .then(toy => {
      const card = document.createElement("div");
      const cardH2 = document.createElement("h2");
      const cardImg = document.createElement("img");
      const cardP = document.createElement("p");
      const cardButton = document.createElement("button");

      card.classList.add("card");
      cardH2.innerText = toy.name;
      cardImg.src = toy.image;
      cardImg.classList.add("toy-avatar")
      cardP.innerText = toy.likes + " Likes";
      cardButton.id = toy.id;
      cardButton.classList.add("like-btn");
      cardButton.innerText = "Like ❤️"

      card.append(cardH2);
      card.append(cardImg);
      card.append(cardP);
      card.append(cardButton);

      toyCollection.append(card);
    })
    .catch(error => console.log(error));
  })


  const updateToy = () => {
    document.querySelectorAll('.like-btn').forEach(button => button.addEventListener('click', (e) => {
  
      const likesP = e.target.previousSibling;
      
      const toy = {
        likes: parseFloat(likesP.innerText[0]) + 1,
      }
      const configuration = {
        method: 'PATCH',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(toy)
      }
    
      fetch(`http://localhost:3000/toys/${e.target.id}`, configuration)
      .then(res => res.json())
      .then(toy => {
        likesP.innerText = `${toy.likes} Likes`;
      })
      .catch(error => console.log(error));
    }))
  }
});
