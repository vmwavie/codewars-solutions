function expandedForm(num) {
  let multiple = 10;
  let result = []
  
  while(num>1){
      let remainder = num%multiple;
      if(remainder > 0) {
        result.unshift(remainder);
      }
    
      num -= remainder;
      multiple = multiple * 10;
  }

  return result.join(" + ")
}