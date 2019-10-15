const winningConditions = (boardMap) => {
    let matchRows;

    //diagonal
    if(boardMap[0][0] && boardMap[0][0] === boardMap[1][1] && boardMap[0][0] === boardMap[2][2]) {
      return true;
    }
  
    //reverse Diagonal
    if(boardMap[2][0] && boardMap[2][0] === boardMap[1][1] && boardMap[2][0] === boardMap[0][2]) {
      return true;
    }
  
    //rows
    for (let row = 0; row < 3 ; row++) {  
      if(boardMap[row][0] && boardMap[row].every(item => item === boardMap[row][0])) {
        return true;
      }
    }
  
    //columns
    for (let col= 0; col < 3 ; col++) {
      if(boardMap[0][col] && boardMap[0][col] === boardMap[1][col] && boardMap[0][col] === boardMap[2][col]){
        return true;
      }
    }
    
    return false;
  }
const boardMap = () => {
  return [
    [false, false, false],
    [false, false, false],
    [false, false, false],
  ]
}

export {
  winningConditions,
  boardMap
}