export const isObjectEmpty = (obj: object) => {
  if (!obj) {
    return true;
  }

  if (Object.keys(obj).length) {
    return false;
  }

  return true;
};
