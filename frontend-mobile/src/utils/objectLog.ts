export const objectLog = (prefillText = '', obj: unknown): void => {
  console.log(`${prefillText} ${JSON.stringify(obj, null, 4)}`);
};
