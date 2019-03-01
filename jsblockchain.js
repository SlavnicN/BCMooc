const SHA256 = require("crypto-js/sha256");

class Block{
	constructor(index, timestamp, data, previousHash = ''){
		this.index = index;
     		this.timestamp = timestamp;
     		this.data = data;
     		this.previousHash = previousHash;
     		this.hash = this.calculateHash();
   	}

   	calculateHash(){
     	//we will be using SHA256 fo generate the hash of this block
     		return SHA256(this.index+this.timestamp+this.previousHash+JSON.stringify(this.data)).toString();
   	}
}

class BlockChain{
	constructor(){
		//the first variable of the array will be the genesis block created manually
		this.chain = [this.createGenesisBlock()];
	}

	createGenesisBlock(){
		return new Block(0,"01/01/2018","This is the genesis block","0");
	}
	
	//to calculate the hash
	getLatestBlock(){
		return this.chain[this.chain.length -1];
	}

	addBlock(newBlock){
		newBlock.previousHash = this.getLatestBlock().hash;
		newBlock.hash = newBlock.calculateHash();
		this.chain.push(newBlock);
	}

}


//creating new block
let block1 = new Block(1,"02/01/2018",{mybalance : 100});
let block2 = new Block(2,"03/01/2018",{mybalance : 50});

//create a new blockchain
let myBlockChain = new BlockChain();

// add to our blockchain
myBlockChain.addBlock(block1);
myBlockChain.addBlock(block2);

console.log(JSON.stringify(myBlockChain,null,4));
