// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "./SimpleStorage.sol";


contract StorageFactory {
    SimpleStorage[] public simpleStorage;
    

    function createSimpleStorage() public {
        simpleStorage.push(new SimpleStorage());

    }

    function sfStore(uint256 _index,uint256 _number) public {
        simpleStorage[_index].store(_number);
    }


    function peek(uint256 _index) view public returns(uint256) {
        return simpleStorage[_index].favouriteNumber();
    }
}