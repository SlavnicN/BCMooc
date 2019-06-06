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
	mapping(uint => Contestant) public contestants;
	// to save the liste of users/accounts who already casted vote
	mapping(address => bool) public voters;
	// add a public state variable to keep track of contestant Count 
	uint public contestantsCount; 

	constructor() public {
		addContestant("Tom");
		addContestant("Jerry");

	}
	// add a function to add contestant
	function addContestant(string memory _name) private {
		contestantsCount ++; 
		contestants[contestantsCount] = Contestant(contestantsCount, _name, 0);		
	}


	function vote(uint _contestantID) public {
		//restricting the person who already casted the vote
		require(!voters[msg.sender]);
		//require that the vote is casted to valid contestant
		require(_contestantID > 0 && _contestantID <= contestantsCount);

		//increase the contestant vote count 
		contestants[_contestantID].voteCount ++;
		//set the voter(s voted status to true
		voters[msg.sender] = true;
		
	}


}