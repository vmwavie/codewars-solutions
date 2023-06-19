function solution (roman) {
  const romanHash = {
    I: 1,
    V: 5,
    X: 10,
    L: 50,
    C: 100,
    D: 500,
    M: 1000,
  };

  /*
    I can be placed before V (5) and X (10) to make 4 and 9.
    X can be placed before L (50) and C (100) to make 40 and 90.
    C can be placed before D (500) and M (1000) to make 400 and 900.
  */
  let attemp = 0;
  
  for(i=0;i<roman.length;i++){
    if(roman[i] === 'I' && roman[i + 1] === 'V'){
      attemp += 4;
      i++
    } else if (roman[i] === 'I' && roman[i + 1] === 'X'){
      attemp += 9;
      i++
    } else if (roman[i] === 'X' && roman[i + 1] === 'L'){
      attemp += 40;
      i++
    } else if (roman[i] === 'X' && roman[i + 1] === 'C'){
      attemp += 90;
      i++
    } else if (roman[i] === 'C' && roman[i + 1] === 'D'){
      attemp += 400;
      i++
    } else if (roman[i] === 'C' && roman[i + 1] === 'M'){
      attemp += 900;
      i++
    } else {
      attemp += romanHash[roman[i]]
    }
  }
  
  return attemp;
}