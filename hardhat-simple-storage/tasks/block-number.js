const { task } = require("hardhat/config")

task("block-number", "Prints current block number").setAction(
    async (taskAgrs, hre) => {
        const blockNumber = await hre.ethers.provider.getBlockNumber()
        console.log(`Current block number: ${blockNumber}`)
    }
)

module.exports = {}