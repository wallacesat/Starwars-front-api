import { httpService } from "./httpService";

export function getStarships(page) {
  return page
    ? process.env.NODE_ENV === "development"
      ? httpService.get(`/starships/page=${page}`)
      : httpService.get(`/starships/?page=${page}`)
    : httpService.get("/starships");
}
