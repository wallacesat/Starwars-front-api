import { httpService } from "./httpService";

export function getStarships(page) {
  return page
    ? httpService.get(`/starships/page=${page}`)
    : httpService.get("/starships");
}
