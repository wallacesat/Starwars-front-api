import { httpService } from "./httpService";

export function getPeople(page) {
  const result = page
    ? httpService.get(`/people/page=${page}`) // REMOVER O INTERROGAÇÃO '?'
    : httpService.get("/people");
  return result;
}
