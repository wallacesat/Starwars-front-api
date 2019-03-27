export const handleResulstWithId = (results, page) => {
  let items =
    process.env.NODE_ENV === "development"
      ? results.map((item, i) => {
          item.idItem = +`${page - 1}${i}` + 1;
          return item;
        })
      : results.map((item, i) => {
          item.idItem = +`${page - 1}${i}` + 1;
          item.avatar = `http://i.pravatar.cc/40?img=${Math.random(80)}`;
          return item;
        });

  return items;
};
