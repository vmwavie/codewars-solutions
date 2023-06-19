function XO(str) {
  let counter = {};
  
  for(i=0;i<str.length;i++) {
    counter[i] = str[i];
  }

  const arr = Object.values(counter);
  const xAmount = arr.filter(x => x.toLowerCase()=='x').length;
  const oAmount = arr.filter(x => x.toLowerCase()=='o').length;
  const result = (xAmount == oAmount);

  return result;
}