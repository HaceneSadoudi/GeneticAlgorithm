/**
 * Gene Constructor function
 */

var Gene = function() {
    
}

Gene.prototype.random = function() {
    let rndInt = Math.floor(Math.random() * 96 + 32);
    return String.fromCharCode(rndInt);
}

/**
 * Chromosome constructor function
 */

var Chromosome = function(length) {
    
}

let chr = new Chromosome(5);
console.log(chr.value);

