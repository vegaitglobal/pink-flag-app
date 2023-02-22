import { useAppDispatch } from '@pf/hooks';
import { TODAY } from '../../../constants/constants';
import { useEffect } from 'react';
import { getDateWithOffset, getLastMenstruationStartDate, getPreviousMenstruationStartDate } from '../utils';
import { setMenstruationStartDate } from '@pf/reducers/userReducer';

export const useLastMenstruationDateUpdate = (menstruationStartDate?: string, cycleLength?: number): void => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!menstruationStartDate || !cycleLength) {
      return;
    }

    const actualStartDate = getDateWithOffset(menstruationStartDate, cycleLength, TODAY);
    const previousStartDate = getPreviousMenstruationStartDate(actualStartDate, cycleLength);
    const lastMenstruationStartDate = getLastMenstruationStartDate(previousStartDate, actualStartDate);

    if (menstruationStartDate !== lastMenstruationStartDate) {
      dispatch(setMenstruationStartDate(lastMenstruationStartDate));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
