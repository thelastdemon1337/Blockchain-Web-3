// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "https://github.com/smartcontractkit/chainlink/blob/develop/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";
// @chainlink/contracts


library PriceConverter {
    function getPrice() view internal returns(uint256) {
        AggregatorV3Interface priceFeed = AggregatorV3Interface(0xD4a33860578De61DBAbDc8BFdb98FD742fA7028e);
        (,int price, , ,) = priceFeed.latestRoundData();
        return uint256(price * 1e10);
    }

    function getConversionRate(uint256 ethAmount) view internal returns(uint256) {
        uint256 price = getPrice();
        uint256 ethInUsd = (ethAmount * price) / 1e18;
        return ethInUsd;
    }
}