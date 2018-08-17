pragma solidity ^0.4.24;

contract Election {
    
    //constructor store/read candidate
    struct Candidate {
        uint id;
        string name;
        uint voteCount;
    }
    //STORE accounts that have voted
    mapping(address => bool) public voters;

    mapping(uint => Candidate) public candidates;

    uint public candidatesCount;

    function Election () public {
        addCandidate("Candidate 1");
        addCandidate("Candidate 2");
    }

    function addCandidate(string _name) private {
        candidatesCount ++;
        candidates[candidatesCount] = Candidate(candidatesCount, _name, 0);
    }

    function vote(uint _candidateId) public {
        //require voter hasn't voted before
        require(!voters[msg.sender], "User already voted");

        //check voting for valid candidate
        require(_candidateId > 0 && _candidateId <= candidatesCount, "Invalid Candidate");
        
        //record that voter has voted
        voters[msg.sender] = true; 
       
        //update candidate vote count
        candidates[_candidateId].voteCount ++;


    }

}