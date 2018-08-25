
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
    mapping(address => bool) public voters2;
    mapping(address => bool) public voters3;

    mapping(uint => Candidate) public candidates;

    uint public candidatesCount;

    //address public owner;
    //address public vote;
    //voted event
    event votedEvent (
        uint indexed _candidateId
    );

    constructor () public {
        addCandidate("Arsenio Hall");
        addCandidate("Johnny Carson");
        addCandidate("Geraldo");
    }

    function addCandidate(string _name) public {
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
        candidates[_candidateId].voteCount += 5;

        //trigger voted event
        emit votedEvent(_candidateId); 

    }

    function vote2(uint _candidateId) public {
        //require voter hasn't voted before
        require(!voters2[msg.sender], "User already voted");

        //check voting for valid candidate
        require(_candidateId > 0 && _candidateId <= candidatesCount, "Invalid Candidate");
        
        //record that voter has voted
        voters2[msg.sender] = true; 
       
        //update candidate vote count
        candidates[_candidateId].voteCount += 3;

        //trigger voted event
        emit votedEvent(_candidateId); 
    }

    function vote3(uint _candidateId) public {
        //require voter hasn't voted before
        require(!voters3[msg.sender], "User already voted");

        //check voting for valid candidate
        require(_candidateId > 0 && _candidateId <= candidatesCount, "Invalid Candidate");
        
        //record that voter has voted
        voters3[msg.sender] = true; 
       
        //update candidate vote count
        candidates[_candidateId].voteCount += 1;

        //trigger voted event
        emit votedEvent(_candidateId); 
    }
    

}

