const searchInputElement = document.querySelector("#search-name");
const form = document.querySelector("#form");
const sortOption = document.querySelector("#sorting-option");
const addButton = document.querySelector("#add-button");
const cancelButton = document.querySelector("#cancel-button");

let editHeroId = null;
let editMode = false;

document.addEventListener("DOMContentLoaded", init);
sortOption.addEventListener("change", init);

form.addEventListener("submit", (ev) => {
  ev.preventDefault();

  editMode ? saveEditedHero() : addSuperhero();
});

async function init() {
  const orderValue = sortOption.value;

  const heroes = await server.getHeroes(orderValue);

  ui.initMainElementHtml();
  ui.insertHeroes(heroes);
}

function deleteHeroHandler(event) {
  const confirmation = confirm("Are you sure you want to delete this hero?");

  if (confirmation) {
    const heroId = event.target.dataset["id"];

    server.deleteHero(heroId);
  }
}

searchInputElement.addEventListener("input", async (ev) => {
  const query = ev.target.value;

  const filteredHeroes = await server.getHeroesByName(query);

  ui.resetHeroes();
  ui.insertHeroes(filteredHeroes);
});

function addSuperhero() {
  const name = document.querySelector("#name").value;
  const superpower = document.querySelector("#superpower").value;
  const imageUrl = document.querySelector("#image-url").value;

  if (imageUrl !== "") {
    fetch(imageUrl)
      .then((res) => res.blob())
      .then((data) => {
        const reader = new FileReader();

        reader.readAsDataURL(data);
        reader.onloadend = () => {
          userInput = {
            name,
            superpower,
            image: reader.result,
          };
          server.addHero(userInput);
        };
        reader.onerror = () => console.error(reader.error);
      });
  } else {
    userInput = {
      name,
      superpower,
      image: "./assets/images/hero-1.avif",
    };
    server.addHero(userInput);
  }
}

async function editHeroHandler(ev) {
  ev.preventDefault();

  document.querySelector("#name").focus();

  const heroId = ev.target.dataset["id"];

  editHeroId = heroId;
  editMode = true;

  const hero = await server.getHero(heroId);

  document.querySelector("#name").value = hero.name;
  document.querySelector("#superpower").value = hero.superpower;

  document.querySelector("#heading").textContent = "Edit Superhero";

  cancelButton.classList.remove("d-none");
  cancelButton.classList.add("d-block");

  addButton.textContent = "Save";
  addButton.classList.remove("btn-primary");
  addButton.classList.add("btn-success");
}

function saveEditedHero() {
  const imageUrl = document.querySelector("#image-url").value;

  if (imageUrl !== "") {
    fetch(imageUrl)
      .then((res) => res.blob())
      .then((data) => {
        const reader = new FileReader();

        reader.readAsDataURL(data);
        reader.onloadend = () => {
          const payload = {
            name: document.querySelector("#name").value,
            superpower: document.querySelector("#superpower").value,
            image: reader.result,
          };
          server.updateHero(payload, editHeroId);
        };
        reader.onerror = () => console.error(reader.error);
      });
  } else {
    payload = {
      name: document.querySelector("#name").value,
      superpower: document.querySelector("#superpower").value,
      image: "./assets/images/",
    };
    server.updateHero(payload, editHeroId);
  }

  editMode = false;
}
