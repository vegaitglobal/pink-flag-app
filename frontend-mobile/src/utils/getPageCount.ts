export const getPageCount = (size: number, totalCount?: number): number => {
  if (!totalCount) {
    return 1;
  }

  const hasExtraPage = totalCount % size !== 0;
  return Math.floor(totalCount / size) + (hasExtraPage ? 1 : 0);
};
