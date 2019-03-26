import { httpService } from "./httpService";

export function getPlanets(page) {
  return page
    ? httpService.get(`/planets/page=${page}`)
    : httpService.get("/planets");
}
