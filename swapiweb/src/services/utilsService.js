export const paginate = (collection, skip, take) => {
  return (collection || []).slice(skip, skip + take);
};
