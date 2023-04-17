// SPDX-License-Identifier: MIT 
pragma solidity ^0.8.7;

// Fundable contract : checks for min. amount
// convert the eth to usd : provided eth * price of 1 eth in usd / 1e18 : since both have 18 decimals, it's going to give 36 decimals
// & check >= 50 usd
// Only owner can withdraw

import "./PriceConverter.sol";

contract FundMe { 
    using PriceConverter for uint256;
    uint256 public minimumUsd = 50 * 1e18;
    mapping(address => uint256) public fundersToAmountFunded;

    address[] public funders;


    function fund() public payable {
        require(msg.value.getConversionRate() > minimumUsd, "Didn't fund enough");
        funders.push(msg.sender);
        fundersToAmountFunded[msg.sender] = msg.value;
    }

    function withdraw() public {
        for(uint256 i = 0; i < funders.length; i++) {
            fundersToAmountFunded[funders[i]] = 0;
        }
        // Resetting Array:
        funders = new address[](0);

        
        // transfer
            payable(msg.sender).transfer(address(this).balance);
        
        // Send
            bool sendStatus = payable(msg.sender).send(address(this).balance);
            require(sendStatus, "Withdraw Failed");
        
        // Call
            (bool callStatus, ) = payable(msg.sender).call{value: address(this).balance}("");
            require(callStatus, "Withdraw Failed");
    }
}