const { assert } = require("chai")
const { getNamedAccounts, deployments, ethers, network } = require("hardhat")
const { developmentChains } = require("../../helper-hardhat-config")

developmentChains.includes(network.name)
    ? describe.skip
    : describe("FundMe", async () => {
          let fundMe
          let deployer
          let sendValue = await ethers.utils.parseEther("0.1")
          beforeEach(async () => {
              deployer = (await getNamedAccounts()).deployer
              fundMe = await ethers.getContract("FundMe", deployer)
          })

          it("Funds the contract and withdraws", async () => {
              await fundMe.fund({ value: sendValue })
              await fundMe.withdraw()

              const finalBalance = await fundMe.provider.getBalance(
                  fundMe.address
              )
              assert.equal(finalBalance.toString(), "0")
          })
      })
