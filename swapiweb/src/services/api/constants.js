const cors = `https://cors-anywhere.herokuapp.com/`;

export const API_URL =
  process.env.NODE_ENV === "development"
    ? "/api"
    : `${cors}https://swapi.co/api/`;
