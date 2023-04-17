const { ethers, run, network } = require("hardhat")



async function main() {
  const simpleStorageFactory = await ethers.getContractFactory("SimpleStorage")
  console.log("Deploying Contract...")
  const simpleStorage = await simpleStorageFactory.deploy()
  await simpleStorage.deployed() // Equivalent to contract.wait()
  console.log(`Deployed contract to ${simpleStorage.address}`)

  // Checking for network before verifying smart contract
  if (network.config.chainId === 5 && process.env.ETHERSCAN_API_KEY) {
    console.log("Waiting for block txes...")
    await simpleStorage.deployTransaction.wait(6)
    await verify(simpleStorage.address, []);
  }

  // Read from contract
  const currentValue = await simpleStorage.favouriteNumber()
  console.log(`Current Value is: ${currentValue}`)

  // Write to contract
  const transactionResponse = await simpleStorage.store(21)
  await transactionResponse.wait(1)
  console.log(`Updated value is : ${await simpleStorage.favouriteNumber()}`)


}

async function verify(contractAddress, args) {
  console.log("Verifying Contract...")
  try {
    await run("verify:verify", {
      address: contractAddress,
      constructorArguments: args,
    })
  } catch (e) {
    if (e.message.toLowerCase().includes("already verified")) {
      console.log("Already Verified!")
    } else console.log(e)
  }
}

main().then(() => process.exit(0)).catch((error) => {
  console.error(error)
  process.exit(1);
})