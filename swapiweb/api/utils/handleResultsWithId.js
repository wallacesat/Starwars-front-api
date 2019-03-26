export const handleResulstWithId = (results, page) => {
  let items = results.map((item, i) => {
    item.idItem = +`${page - 1}${i}` + 1;
    return item;
  });

  return items;
};
