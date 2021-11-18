/**
 * Gene Constructor function
 */

var Gene = function() {}

Gene.prototype.random = function() {
    let rndInt = Math.floor(Math.random() * 96 + 32);
    return String.fromCharCode(rndInt);
}

/**
 * Chromosome constructor function
 */

var Chromosome = function(length, code) {
    if(code) {
        this.code = code;
        this.cost = 99999;
    }else {
        this.code = '';
        for(let i=0;i<length;i++) {
            let gene = new Gene();
            this.code += gene.random();
        }
    }
}

/**
 * Fitness function - measure the quality of each solution
 * @param {*} compareTo
 */
Chromosome.prototype.calcCost = function (compareTo) {
    let total = 0;
    for (let i = 0; i < this.code.length; i++) {
        total += Math.pow(this.code.charCodeAt(i) - compareTo.charCodeAt(i), 2);
      }
    this.cost = total;
}

/**
 * Reproduction function - crossover
 * @param {*} chance 
 * @returns 
 */
Chromosome.prototype.mate = function (chromosome) {
    let pivot = Math.round(this.code.length / 2);

    var child1 = this.code.substr(0, pivot) + chromosome.code.substr(pivot);

    var child2 = chromosome.code.substr(0, pivot) + this.code.substr(pivot);
    return [new Chromosome(this.code.length, child1), new Chromosome(this.code.length, child2)];
}


/**
 * Mutation 
 * @param {*} chance 
 * @returns 
 */
Chromosome.prototype.mutate = function (chance) {
    if (Math.random() > chance) return;
    var index = Math.floor(Math.random() * this.code.length);
    var upOrDown = Math.random() <= 0.5 ? -1 : 1;
    var newChar = String.fromCharCode(this.code.charCodeAt(index) + upOrDown);
    var newString = '';
    for (i = 0; i < this.code.length; i++) {
      if (i == index) newString += newChar;
      else newString += this.code[i];
    }
  
    this.code = newString;
}

/**
 * Population constructor function
 * @param {*} goal 
 * @param {*} size 
 */
var Population = function (goal, size) {
    this.members = [];
    this.goal = goal;
    this.generationNumber = 0;
    scope = this;
    while (size--) {
  
      var chromo = new Chromosome(this.goal.length);
      //chromo.random(this.goal.length);
      this.members.push(chromo);
    }
}
  

let chr = new Chromosome(5);
console.log(chr.value);

