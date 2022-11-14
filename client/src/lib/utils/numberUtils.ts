export const numberWithCommas = (value: number | string): string => {
  const x = value?.toString() ?? "0";
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
