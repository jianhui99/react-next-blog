export const getRandomNumber = (min: number = 1, max: number = 45): number => {
  if (min > max) {
    throw new Error('min cannot be greater than max');
  }
  if (!Number.isInteger(min) || !Number.isInteger(max)) {
    throw new Error('min and max must be integers');
  }
  
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
