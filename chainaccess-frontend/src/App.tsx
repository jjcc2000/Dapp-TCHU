import { useState } from "react";
import "./App.css";
import { ethers } from "ethers";
import abi from "./abi/AccessPass.json";

const contractAddress = "0x5fbdb2315678afecb367f032d93f642f64180aa3";

declare global {
  interface Window {
    ethereum?: any;
  }
}

function App() {
  const [account, setAccount] = useState<string | null>(null);
  const [contract, setContract] = useState<any>(null);
  const [hasAccess, setHasAccess] = useState<boolean | null>(null);

  const connectWallet = async () => {
    if (!window.ethereum) {
      alert("MetaMask not found");
      return;
    }

    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    setAccount(accounts[0]);

    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contractInstance = new ethers.Contract(
      contractAddress,
      abi.abi,
      signer
    );

    setContract(contractInstance);
  };

  const checkAccess = async () => {
    if (contract && account) {
      const result = await contract.checkAccess(account);
      setHasAccess(result);
    }
  };

  const claimAccess = async () => {
    if (contract) {
      const tx = await contract.claimAccess();
      await tx.wait(); // wait for confirmation
      checkAccess(); // refresh status
    }
  };

  return (
    <>
      <div className="card">
        {!account ? (
          <button onClick={connectWallet}>Connect Wallet</button>
        ) : (
          <>
            <p>Connected as: {account}</p>
            <button onClick={checkAccess} className="btn">
              Check Access
            </button>
            <button onClick={claimAccess} className="btn">
              Claim Access
            </button>
            {hasAccess !== null && (
              <p>
                Access status: {hasAccess ? "✅ Granted" : "❌ Not Granted"}
              </p>
            )}
          </>
        )}
      </div>
    </>
  );
}

export default App;
