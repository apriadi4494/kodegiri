export const offset = (query) => {
  return Number(query.page) * Number(query.limit) - Number(query.limit);
};
