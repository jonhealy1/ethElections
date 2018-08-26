
pragma solidity ^0.4.24;

contract Election {
    
    //constructor store/read candidate
    struct Candidate {
        uint id;
        string name;
        uint voteCount;
    }

    /* we store the accounts that have voted with this mapping 
    from a Voter's address to a boolean indicating true if a Voter has voted
    - each account can vote 3 times: a first place vote counts for 5 votes, 
    a second place vote: 3, and a third place vote: 1. */
    mapping(address => bool) public voters;
    mapping(address => bool) public voters2;
    mapping(address => bool) public voters3;

    //map Candidate struct to a uint for storage
    mapping(uint => Candidate) public candidates;

    //uint for keeping track of the number of candidates
    uint public candidatesCount;

    //voted event emitted after an account makes one of their 3 choices
    event votedEvent (
        uint indexed _candidateId
    );

    /* 3 candidates are initialized when the contract is created. 
    I do not personally know any of these people. */
    constructor () public {
        addCandidate("Arsenio Hall");
        addCandidate("Johnny Carson");
        addCandidate("Geraldo");
    }

    /* the addCandidate function takes in the name of our candidate
    and then increase the candidatesCount variable. It then creates
    a new Candidate struct initialized with 0 votes and adds it to
    the candidates mapping */
    function addCandidate(string _name) public {
        candidatesCount ++;
        candidates[candidatesCount] = Candidate(candidatesCount, _name, 0);
    }

    /* the vote function handles a Voter's first choice which
    is worth a total of five votes */
    function vote(uint _candidateId) public {
        //require that a voter hasn't voted before
        require(!voters[msg.sender], "User already voted");

        //ensure that we are voting for a valid candidate
        require(_candidateId > 0 && _candidateId <= candidatesCount, "Invalid Candidate");
        
        //record that voter has voted
        voters[msg.sender] = true; 
       
        //update candidate vote count by five votes
        candidates[_candidateId].voteCount += 5;

        //trigger voted event
        emit votedEvent(_candidateId); 
    }

    /* the vote2 function handles a Voter's second choice which
    is worth a total of three votes */
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
    
    /* the vote function handles a Voter's third choice which
    is worth a total of one vote */
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

