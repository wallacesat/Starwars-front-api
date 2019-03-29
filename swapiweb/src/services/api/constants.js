// const cors = `https://cors-anywhere.herokuapp.com/`;

export const API_URL =
  process.env.NODE_ENV === "development"
    ? "/api"
    : `https://secure-dusk-28289.herokuapp.com/`;
