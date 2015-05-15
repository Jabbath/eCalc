var math = require('mathjs');
var fs = require('fs');
var time1 = new Date();

//We will have to use bignumbers here
math.config({ 
	'number': 'bignumber'
});

function giveStep(num){//returns the nth part of the series
	return math.divide(math.bignumber(1),math.factorial(math.bignumber(num))); 
}

function compute(digits){
	math.config({ 
		'number': 'bignumber',
		'precision': digits + 2 //we should at least be precise to how many digits we want plus the last digit and the 2, which will be rounded and inaccurate
	});
	
	var sum = math.bignumber(2);
	var currentStep = 2; //No need to do 1/0! or 1/1!
	var stepCalc = giveStep(currentStep);
	var prevE = 0;
	
	while(Math.abs(stepCalc.e) - 1 < digits){
		sum = math.add(sum,stepCalc);
		currentStep += 1;
		stepCalc = giveStep(currentStep);
		
		if(stepCalc.e !== prevE){
			console.log(prevE/digits,'% done');
			prevE = stepCalc.e;
		}
	}
	
	return math.format(sum);
}

var result = compute(10000);

fs.writeFile('digits.txt',result,function(err){
	if(err) throw err;
	console.log('done');
	
	var time2 = new Date();
	console.log('took %d ms',time2-time1);
});