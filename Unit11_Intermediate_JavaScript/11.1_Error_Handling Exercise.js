function mysteryOperation ()
{
	const outcome = Math.random(); // Generates a random number between 0 and 1.

	if (outcome < 0.5)
	{
		console.log("The operation is completed successfully!");
	}
	else
	{
		throw new Error("The operation is failed mysteriously!");
	}
}

const mission = 20; // total mission days
let receivedDays = 0;

for(let i=0; i < mission; i++) {
	try {
		mysteryOperation(); // try mission
		receivedDays += 13; // success days
	}
	catch(error) {
		receivedDays += 1 // failure day
	}
	finally {
		receivedDays += 3 // attend days
	}
}

console.log(` Total vacation days : ${receivedDays}` );

