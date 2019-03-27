import { httpService } from "./httpService";

export function getPlanets(page) {
  return page
    ? process.env.NODE_ENV === "development"
      ? httpService.get(`/planets/page=${page}`)
      : httpService.get(`/planets/?page=${page}`)
    : httpService.get("/planets");
}
