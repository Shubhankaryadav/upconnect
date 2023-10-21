//connect wallet
const { ethers } = require("ethers");
const { Web3Provider } = require("@ethersproject/providers");
const { getAddress } = require("ethers");

/*
const connectWallet = async () => {
    
  const { ethereum } = window;
  if (!ethereum) {
    console.log("wallet not connected");
    alert("Metamask Not Found ! Get MetaMask and Try Again.");
    return;
  }
  else{
    console.log("hi");
    
    const accounts = await ethereum.request({
      method: "eth_requestAccounts",
    });
    console.log(accounts);
  }


 
}
connectWallet();
*/
