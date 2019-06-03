pragma solidity 0.5.8;

//creating the contract 
contract Contest{

	// creating strucre to model the contestant
	struct Contestant {
		uint id; 
		string name; 
		uint voteCount; 		
	}

	// use mapping to get or fetch the contestant details
	mapping(uint => contestant) public contestants;

	// add a public state variable to keep track of contestant Count 
	uint public contestantsCount; 

	// add a function to add contestant
	function addContestant(string _name) private {
		contestantsCount ++; 
		contestants[contestantsCount] = Contestant(contestantsCount, _name, 0);		
	}
}