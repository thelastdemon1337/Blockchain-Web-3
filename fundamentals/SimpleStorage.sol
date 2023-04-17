// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

contract SimpleStorage {

    uint256 public favouriteNumber;
    
    mapping(string=>uint256) public testmping;
    struct People {
        uint256 favouriteNumber;
        string name;
    } 

    People[] public people;

    function store(uint256 _favouriteNumber) public {
        favouriteNumber = _favouriteNumber;
    }

    function addPerson(string memory _name, uint256 _favouriteNumber) public {
        people.push(People(_favouriteNumber, _name));
        testmping[_name] = _favouriteNumber;
    }
}