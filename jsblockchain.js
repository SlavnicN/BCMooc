const SHA256 = require("crypto-js/sha256");

class Transaction{
	constructor(fromAddress,toAddress, amount){
		this.fromAddress = fromAddress;
		this.toAddress = toAddress;
		this.amount = amount;
	}
}
class Block{
	constructor(timestamp, transaction, previousHash = ''){
     		this.timestamp = timestamp;
     		this.transaction = transaction;
     		this.previousHash = previousHash;
     		this.hash = this.calculateHash();
		this.nonce = 0;
   	}

   	calculateHash(){
	     	//we will be using SHA256 fo generate the hash of this block
     		return SHA256(this.timestamp+this.previousHash+JSON.stringify(this.transaction)+this.nonce).toString();
   	}

	mineNewBlock(difficulty){
		//while the n°difficulty first char are != to 0 search for a nonce
		while(this.hash.substring(0,difficulty) !== Array(difficulty + 1).join("0")){
			this.nonce ++;
			this.hash = this.calculateHash();
		}
		console.log("A new block was mined with hash : "+ this.hash);
	}
}

class BlockChain{
	constructor(){
		//the first variable of the array will be the genesis block created 
		this.chain = [this.createGenesisBlock()];
		this.difficulty = 2;
		this.pendingTransaction = [];
		this.miningReward = 10;
	}

	createGenesisBlock(){
		return new Block("01/01/2018","This is the genesis block","0");
	}
	
	getLatestBlock(){
		return this.chain[this.chain.length -1];
	}
	// TODO manage amount of tx not sufficient
	minePendingTransactions(miningRewardAddress){
		let block = new Block(Date.now(), this.pendingTransaction, this.getLatestBlock().hash);
		console.log(block);
		block.mineNewBlock(this.difficulty);
		console.log("Block mined successfully");

		this.chain.push(block);
		//fromAddress = null for demo purpose, the fromAddress shoudl pay the "gas" or "miners fee"
		this.pendingTransaction = [
			new Transaction(null,miningRewardAddress,this.miningReward)
		];
	}
	
	createTransaction(transaction){
		this.pendingTransaction.push(transaction);
	}

	getBalanceOfAddress(address){
		let balance = 0;

		for(const block of this.chain){
			for(const trans of block.transaction){
				if(trans.fromAddress === address){
					balance=balance-trans.amount;
				}

				if(trans.toAddress === address){
					balance=balance+trans.amount;
				}
			}
		}
		return balance;
	}

	checkBlockChainValid(){
		for(let i=1; i< this.chain.length; i++){
			const currentBlock = this.chain[i];
			const previousBlock = this.chain[i-1];

			if(currentBlock.hash != currentBlock.calculateHash()){
				return false;
			}
			if(currentBlock.previousHash != previousBlock.hash){
				return false;
			}
		}
		return true;
	}

}

let bittyCoin = new BlockChain();
transaction1 = new Transaction("tom", "jerry", 100);
bittyCoin.createTransaction(transaction1);

transaction2 = new Transaction("jerry", "tom", 30);
bittyCoin.createTransaction(transaction2);


console.log("Started mining by the miner...");
bittyCoin.minePendingTransactions("donald");

console.log("balance for tom is:" + bittyCoin.getBalanceOfAddress("tom"));
console.log("balance for jerry is:" + bittyCoin.getBalanceOfAddress("jerry"));
console.log("balance for donald is:" + bittyCoin.getBalanceOfAddress("donald"));
bittyCoin.minePendingTransactions("donald");
console.log("balance for donald is:" + bittyCoin.getBalanceOfAddress("donald"));
