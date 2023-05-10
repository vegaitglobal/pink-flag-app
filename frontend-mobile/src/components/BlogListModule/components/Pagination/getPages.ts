import { WIDTH } from '@pf/constants';

const DOTS = '...';
const ITEM_WIDTH = 34;
const SPACING_LEFT = WIDTH - 64 * 2;
const MAX_ELEMENTS = Math.floor(SPACING_LEFT / ITEM_WIDTH);

const getLeftHalf = (currentPage: number, totalPages: number, pagesHalf: number): (number | string)[] => {
  if (currentPage <= pagesHalf) {
    return [...Array(pagesHalf).keys()];
  }

  if (currentPage > pagesHalf && currentPage <= totalPages - pagesHalf) {
    return [...Array(pagesHalf - 2).keys(), DOTS, currentPage - 1];
  }
  return [...Array(pagesHalf - 1).keys(), DOTS];
};

const getCenterElement = (currentPage: number, totalPages: number, pagesHalf: number): number => {
  if (currentPage <= pagesHalf) {
    return pagesHalf;
  }

  if (currentPage >= totalPages - pagesHalf) {
    return totalPages - pagesHalf;
  }

  return currentPage;
};

const getRightRest = (totalPages: number, positions: number): number[] => {
  const rest = [];
  for (let i = positions; i !== -1; i--) {
    rest.push(totalPages - i);
  }

  return rest;
};

const getRightHalf = (currentPage: number, totalPages: number, pagesHalf: number): (number | string)[] => {
  if (currentPage < pagesHalf) {
    const rest = getRightRest(totalPages, pagesHalf - 2);
    return [DOTS, ...rest];
  }

  if (currentPage >= pagesHalf && currentPage < totalPages - pagesHalf) {
    const rest = getRightRest(totalPages, pagesHalf - 3);
    return [currentPage + 1, DOTS, ...rest];
  }

  return getRightRest(totalPages, pagesHalf - 1);
};

export const getPages = (currentPage: number, totalPages: number): (number | string)[] => {
  if (totalPages < 2) {
    return [0];
  }

  if (totalPages <= MAX_ELEMENTS) {
    return [...Array(totalPages + 1).keys()];
  }

  const maxElements = MAX_ELEMENTS % 2 === 0 ? MAX_ELEMENTS - 1 : MAX_ELEMENTS;
  const pagesHalf = Math.floor(maxElements / 2);

  if (currentPage <= pagesHalf - 2 || currentPage >= totalPages - (pagesHalf - 2)) {
    const firstPart = [...Array(pagesHalf).keys()];
    const secondPart = [...Array(totalPages + 1).keys()].slice(-pagesHalf);
    return [...firstPart, DOTS, ...secondPart];
  }

  const leftHalf = getLeftHalf(currentPage, totalPages, pagesHalf);
  const centerElement = getCenterElement(currentPage, totalPages, pagesHalf);
  const rightHalf = getRightHalf(currentPage, totalPages, pagesHalf);

  return [...leftHalf, centerElement, ...rightHalf];
};
