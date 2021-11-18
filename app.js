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
 * 
 * @param {*} compareTo
 * Fitness function - measure the quality of each solution
 */
Chromosome.prototype.calcCost = function (compareTo) {
    let total = 0;
    for (let i = 0; i < this.code.length; i++) {
        total += Math.pow(this.code.charCodeAt(i) - compareTo.charCodeAt(i), 2);
      }
    this.cost = total;
}


let chr = new Chromosome(5);
console.log(chr.value);

