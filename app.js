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

/**
 * This function sort the chromosomes by cost (fitness)
 * The first chromo will have the highest fitness
 */
Population.prototype.sort = function () {
    this.members.sort(function (a, b) {
      return a.cost - b.cost;
    })
}
 
/**
 * This function is the main GA, it uses the methods 
 * that we declared above to get the best solution
 * @returns 
 */
 Population.prototype.generation = function () {
    for (let i = 0; i < this.members.length; i++) {
      this.members[i].calcCost(this.goal);
    }
    this.sort();

    let j = 0; 
    var childrens = this.members[0].mate(this.members
    [1]);

    for (let i = 0; i < 2; i++) {
        childrens[i].calcCost(this.goal);
        this.members[this.members.length - 1 - i] = childrens[i];
    }

    for (let i = 0; i < this.members.length; i++) {
        this.members[i].mutate(0.5);
        this.members[i].calcCost(this.goal);
        if (this.goal == this.members[i].code) {
            this.sort();
            this.display();
            clearTimeout(timeoutID);
            return true;
        }
    }

    this.sort();
    this.generationNumber++;
    this.display();
    var scope = this;
    var timeoutID = setTimeout(function () {
        scope.generation();
    }, 5);
  
}

/**
 * This method used for displaying all chromosomes of
 * each generation 
 */
 Population.prototype.display = function () {
    document.body.innerHTML = '';
    document.body.innerHTML += ("<h2>Generation: " + this.generationNumber + "</h2>");
    document.body.innerHTML += ("<ul>");
    for (var i = 0; i < this.members.length; i++) {
      
      if(this.members[i].cost == 0 && i == 0) {
        document.body.innerHTML += ("<li class='colored'>" + this.members[i].code + " (" + this.members[i].cost + ")");
      }else {
        document.body.innerHTML += ("<li class=''>" + this.members[i].code + " (" + this.members[i].cost + ")");
      }
    }
    document.body.innerHTML += ("</ul>");
};

  

let chr = new Chromosome(5);
console.log(chr.value);

