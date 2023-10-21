import logo from './logo.svg';
import './App.css';
import { ethers } from "ethers";
import { Web3Provider } from "@ethersproject/providers";
import { getAddress } from "ethers";


function App() {
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
  
const ContractAddress="0xfa2a2aA6AA5769E159a6Fdb3bca60690E5FC58f5";
const ContractAbi=[
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "ownmap",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "rut",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "update",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
];

 
  const num = async()=>{
    const { ethereum } = window;
const provider = new Web3Provider(ethereum);
        const signer = provider.getSigner();
        const MyContract = new ethers.Contract(ContractAddress, ContractAbi, signer);
                let _number = await MyContract.rut();
                console.log("hi");
                console.log(_number);

    
  }
  

  const snum = async()=>{
    const { ethereum } = window;
const provider = new Web3Provider(ethereum);
        const signer = provider.getSigner();
        const MyContract = new ethers.Contract(ContractAddress, ContractAbi, signer);
        console.log(MyContract);
                 await MyContract.update().then(
              response => {
                console.log('Response : ', response);
                num();})

    
  }
  snum();
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
