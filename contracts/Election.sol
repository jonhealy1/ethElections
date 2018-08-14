pragma solidity ^0.4.24;

contract Election {
    //constructor stor/read candidate
    string public candidate;

    function Election () public {
        candidate = "Candidate 1";
    }
}