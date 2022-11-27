const BASE_URL = "http://localhost:3000";

const server = {
  getHeroes: async (orderValue) => {
    const url = `${BASE_URL}/heroes?_sort=name&_order=${orderValue}`;

    const response = await fetch(url);
    const data = await response.json();
    return data;
  },
  getHero: async (id) => {
    const url = `${BASE_URL}/heroes/${id}`;

    const response = await fetch(url);
    const data = await response.json();
    return data;
  },
  deleteHero: async (id) => {
    const url = `${BASE_URL}/heroes/${id}`;

    const response = await fetch(url, {
      method: "DELETE",
    });
    const data = await response.json();
    return data;
  },
  getHeroesByName: async (queryString) => {
    const url = `${BASE_URL}/heroes?name_like=${queryString}`;

    const response = await fetch(url);
    const data = await response.json();
    return data;
  },

  addHero: async (userInput) => {
    const url = `${BASE_URL}/heroes`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userInput),
    });
    const data = await response.json();
    return data;
  },

  updateHero: async (payload, id) => {
    const url = `${BASE_URL}/heroes/${id}`;

    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    const data = await response.json();
    return data;
  },
};
