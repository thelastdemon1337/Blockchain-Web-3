import { ethers } from "./ethers-5.6.esm.min.js"
import { contractAddress, abi } from "./constants.js"


const connectButton = document.getElementById("connectButton")
const fundButton = document.getElementById("fundButton")
const balanceButton = document.getElementById("balanceButton")
const withdrawButton = document.getElementById("withdrawButton")
// console.log(ethers)

const connect = async () => {
    if (typeof window.ethereum !== "undefined") {
        try {
            await window.ethereum.request({ method: "eth_requestAccounts" })
        } catch (error) {
            console.error(error)
        }
        console.log("Connected!")

        connectButton.innerHTML = "Connected!"

        const accounts = await ethereum.request({ method: "eth_accounts" })
        console.log(accounts)
    } else {
        console.log("No Metamask!")
        connectButton.innerHTML = "Please Install Metamask"
    }
}

const getBalance = async () => {
    if(typeof window.ethereum !== 'undefined') {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const balance = await provider.getBalance(contractAddress)
        console.log(ethers.utils.formatEther(balance))
    } 
}


// fund()
const fund = async (ethAmount) => {
    ethAmount = document.getElementById('ethAmount').value
    console.log(`Funding with ${ethAmount}...`)
    // To able to make a transaction, the things we absolutely need are:
    // provider/ RPC url
    // Signer / Wallet
    // Contract : {abi , address}
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    console.log(signer)
    const fundMe = new ethers.Contract(contractAddress, abi, signer)
    try {
        const transactionResponse = await fundMe.fund({value : ethers.utils.parseEther(ethAmount)})

        await listenForTransactionMine(transactionResponse, provider)
        console.log("Done!")
    } catch (error) {
        console.log(error)
    }
}

const listenForTransactionMine = (transactionResponse, provider) => {
    console.log(`Mining ${transactionResponse.hash}`)
    return new Promise((resolve, reject) => {
        try{
            provider.once(transactionResponse.hash, (transactionReciept) => {
                console.log(`Completed with ${transactionReciept.confirmations} confirmations`)
            })
            resolve()
        } catch(error) {
            reject(error)
        }
        
    })
}
// withdraw()

const withdraw = async () => {
    if( typeof window.ethereum !== 'undefined') {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = await provider.getSigner()
        const fundMe = new ethers.Contract(contractAddress, abi, signer)
        const transactionResponse = await fundMe.withdraw()
        await listenForTransactionMine(transactionResponse, provider)
    }
}



connectButton.onclick = connect
fundButton.onclick = fund
balanceButton.onclick = getBalance
withdrawButton.onclick = withdraw