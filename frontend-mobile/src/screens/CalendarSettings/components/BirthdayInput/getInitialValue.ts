const SEPARATOR = '-';

type BirthdayInputType = {
  day: string;
  month: string;
  year: string;
};

//! Date received in `year-month-date` format.
export const getInitialValue = (date: string): BirthdayInputType => {
  const splittedDate = date.split(SEPARATOR);

  return {
    year: splittedDate[0],
    month: splittedDate[1],
    day: splittedDate[2],
  };
};
