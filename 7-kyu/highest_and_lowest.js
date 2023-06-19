function highAndLow(numbers){
  const values = numbers.split(' ');
  const minNum = Math.min(...values);
  const maxNum = Math.max(...values);
  const result = `${maxNum} ${minNum}`;
  return result
}