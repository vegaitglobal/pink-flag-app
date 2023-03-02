import { IS_IOS, TODAY } from '@pf/constants';
import { subtractYears } from '@pf/utils';

export const MAX_DATE = subtractYears(TODAY, 10);
export const MIN_DATE = subtractYears(TODAY, 80);
export const LOCALE = IS_IOS ? 'sr-Latn' : 'sr-XZ';
