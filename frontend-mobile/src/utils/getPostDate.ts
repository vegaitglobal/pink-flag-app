import { EMPTY_STRING } from '@pf/constants';
import { format } from 'date-fns';
import { srLatn } from 'date-fns/locale';

const TO_PATTERN = 'MMMM d. yyyy.';
/**
 * Helper function which provides date in desired form.
 * @param creationDate Date which needs to be formatted.
 * @returns Formatted date. Expected output: ` April 02. 2022.`
 */
export const getPostDate = (creationDate?: string): string => {
  if (!creationDate) {
    return EMPTY_STRING;
  }

  const date = new Date(creationDate);
  const formattedDate = format(date, TO_PATTERN, { locale: srLatn });
  return formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
};
