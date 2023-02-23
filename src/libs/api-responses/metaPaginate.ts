export const convertMeta = (count, query) => {
  return {
    itemsPerPage: Number(query.limit),
    totalItems: count,
    currentPage: Number(query.page),
    totalPages: Math.ceil(count / Number(query.limit)),
  };
};
