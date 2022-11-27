const ui = {
  mainElement: document.querySelector("#main"),
  resetHeroes: function () {
    ui.mainElement.querySelector(".container .row").innerHTML = "";
  },
  initMainElementHtml: function () {
    ui.mainElement.innerHTML = `
    <div class="container bg-light">
     
      <div class="row row-cols-auto g-3 justify-content-center">
   
      </div>
     
    </div>
    `;
  },
  insertHeroes: function (heroes) {
    heroes.forEach((hero) => {
      ui.mainElement.querySelector(".container .row").insertAdjacentHTML(
        "beforeend",
        `
        <div class="col mb-5">
          <div class="card" style="width: 18rem">
            <img
              src="${hero.image}"
              class="card-img-top"
              alt="..."3
              style="height: 15rem; object-fit: cover"
            />
            <div class="card-body">
              <h5 class="card-title">${hero.name}</h5>
              <p class="card-text">Superpower: ${hero.superpower}</p>
              <button type="button"
                      class="btn btn-primary"
                      data-id="${hero.id}"
                      onclick="deleteHeroHandler(event)">
                      Delete
              </button>
              <button type="button"
                      class="btn btn-info"
                      data-id="${hero.id}"
                      onclick="editHeroHandler(event)">
                      Edit
              </button>
              
              </div>
          </div>
        </div>
        `
      );
    });
  },
};

//
