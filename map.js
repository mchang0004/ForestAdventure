class mapObject{
  constructor (mP){
    this.mP = mP; 
  }
  
  findIndex(value){
    for (let i = 0; i < this.mP.length; i++) {
      for (let j = 0; j < this.mP[i].length; j++) {
        if (this.mP[i][j] === value) {
          return [j, i];
        }
      }
    }
    return null; // value not found in array
  }
    
}