function filter_list(l) {
  let result = [];
   
  l.forEach((n) => {
    if(typeof n === 'number'){
      result.push(n)
    }
  })
   
   return result;
 }