

var timeoutID;
var startBtn = document.getElementById('start');
var stopBtn = document.getElementById('stop');
stopBtn.disabled = true;


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
    this.length = length;
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
var Population = function (goal, size, mutrate) {
    this.members = [];
    this.goal = goal;
    this.mutRate = mutrate;
    this.generationNumber = 0;
    scope = this;
    while (size--) {
  
      var chromo = new Chromosome(this.goal.length);
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
        this.members[i].mutate(this.mutRate);
        this.members[i].calcCost(this.goal);
        if (this.goal == this.members[i].code) {
            this.best = this.members[i].code;
            this.sort();
            this.display();
            stop();
            pop = new Population('Generate Me!', 150, 0.1);
            return true;
        }
    }

    this.sort();
    this.generationNumber++;
    this.best = this.members[0].code;
    this.display();
    var scope = this;
    timeoutID = setTimeout(function () {
        scope.generation();
    }, 5);
  
}

/**
 * This method used for displaying all chromosomes of
 * each generation 
 */
 Population.prototype.display = function () {
    
    document.getElementById('best').innerHTML = this.best;
    document.getElementById('generationNbr').innerHTML = this.generationNumber;

    var li = "";
    for (var i = 0; i < this.members.length; i++) {
      li += "<li>" + this.members[i].code + "</li>" ;
    }
    document.getElementById('generatedSolutions').innerHTML = "<ul style='columns : 6'>" + li + "</ul>";
};

let pop = new Population('Generate Me!', 150, 0.1);

function init() {
  document.getElementById('goal').innerHTML = pop.goal;
  document.getElementById('popSize').innerHTML = pop.members.length;
  document.getElementById('chromoLength').innerHTML = pop.members[0].length;
  document.getElementById('mutRate').innerHTML = pop.mutRate;
  document.getElementById('generationNbr').innerHTML = pop.generationNumber;
}

function start() {
  startBtn.disabled = true;
  stopBtn.disabled = false;
  pop.generation();
}  

function stop() {
  startBtn.disabled = false;
  stopBtn.disabled = true;
  clearTimeout(timeoutID);
}


init();



