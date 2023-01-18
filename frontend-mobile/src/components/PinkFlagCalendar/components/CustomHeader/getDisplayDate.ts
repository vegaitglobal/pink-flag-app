export const Months = {
  '0': 'Januar',
  '1': 'Februar',
  '2': 'Mart',
  '3': 'April',
  '4': 'Maj',
  '5': 'Jun',
  '6': 'Jul',
  '7': 'Avgust',
  '8': 'Septembar',
  '9': 'Oktobar',
  '10': 'Novembar',
  '11': 'Decembar',
};

export const getDisplayDate = (date: Date): string => {
  const index = date.getMonth().toString() as keyof typeof Months;
  return `${Months[index]} ${date.getFullYear()}`;
};
