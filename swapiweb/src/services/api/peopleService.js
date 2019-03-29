import { httpService } from "./httpService";

export function getPeople(page) {
  return page
    ? httpService.get(`/people/page=${page}`) // REMOVER O INTERROGAÇÃO '?'
    : httpService.get("/people");
}
