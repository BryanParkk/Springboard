const accounts = [
	{id: 1, owner: "Alice", balance: 500},
	{id: 2, owner: "Bob", balance: 300}
];

function getAccountById (id)
{
	for (const account of accounts)
	{
		if (account.id === id) // == > ===
		{
			return account;
		}
	}
}

function createAccount (newAccountId, newAccountOwner)
{
	const account = getAccountById(newAccountId); // account const add

	if (!Number.isFinite(newAccountId) || newAccountId <= 0){ // account id check
		throw new Error("The Account is must be positive number");
	}
	if (typeof newAccountOwner !== "string" || newAccountOwner.trim() === ''){ // String check
		throw new Error('The Account is must be string and not empty'); 
	}
	if(account){ // account exist check
		throw new Error('The Account already exsist');
	} else { // success message
		console.log('Success!!');
	}
	accounts.push(
		{
			id: newAccountId,
			owner: newAccountOwner,
			balance: 0
		}
	);
}

function depositMoney (accountId, amount)
{
	const account = getAccountById(accountId);

	if (!account){ // account check
		throw new Error("Account not found");
	}
	if (!Number.isFinite(amount) || amount <= 0) { // balance check
		throw new Error("Invalid value for withdrawal amount: The amount must be a finite number.");
	}
	account.balance += amount;
}

function withdrawMoney (accountId, amount)
{
	const account = getAccountById(accountId);

	if (!account){
		throw new Error("Account not found.");
	}

	if (!Number.isFinite(amount) || amount <= 0){ // amount check
		throw new Error("Invalid value for withdrawal amount: The amount must be a finite number.");
	}
	if (account.balance < amount) { // balance check
		throw new Error("There's not enough money in your account.");
	} else { // success message
		console.log('Success!!');
	}

	account.balance -= amount;
}

function transferMoney (fromAccountId, toAccountId, amount)
{
	const fromAccount = getAccountById(fromAccountId);
	const toAccount = getAccountById(toAccountId);

	if (!fromAccount) {
		throw new Error("Source account not found.");
	}
	if (!toAccount){ // destination account check
		throw new Error("Destination account not found.");
	}
	if (fromAccount.balance < amount) { // balance check
		throw new Error("There's not enough money in your account.");
	}	
	if (!Number.isFinite(amount) || amount < 0) { // transfer check
		throw new Error("Invalid value for transfer amount: The amount must be a positive finite number.");
	}
	else { // success message
		console.log('Success!!');
	}
	toAccount.balance += amount; // amount add
	fromAccount.balance -= amount; // amount remove
}

/*
Hints:

getAccountById("1");

createAccount(1, "Alice");
createAccount("3", "Charlie");
createAccount(-3, "Charlie");
createAccount(3, ["Charlie"]);
createAccount(3, "");
createAccount(3, "  ");

depositMoney(1, "300")
depositMoney(1, -300)
depositMoney(1, 0)
depositMoney(1, Infinity)
depositMoney(4, 100)

withdrawMoney(1, -100)
withdrawMoney(1, 0)
withdrawMoney(1, 501)

transferMoney(1, 4, 100)
transferMoney(1, 2, 501);
transferMoney(1, 2, 100);
*/
