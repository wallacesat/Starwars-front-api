import { httpService } from "./httpService";

export function getPeople(page) {
  return page
    ? process.env.NODE_ENV === "development"
      ? httpService.get(`/people/page=${page}`) // REMOVER O INTERROGAÇÃO '?'
      : httpService.get(`/people/?page=${page}`)
    : httpService.get("/people");
}
