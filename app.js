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

let chr = new Chromosome(5);
console.log(chr.value);

