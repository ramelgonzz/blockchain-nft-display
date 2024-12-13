import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { contractABI } from "./contractABI";
import './App.css';

const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"; // Replace with your deployed contract address

function App() {
  const [currentAccount, setCurrentAccount] = useState(null);
  const [nfts, setNFTs] = useState([]);
  const [mintAddress, setMintAddress] = useState("");
  const [isOwner, setIsOwner] = useState(false);

  const connectWallet = async () => {
    if (!window.ethereum) {
      alert("MetaMask is required!");
      return;
    }
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const accounts = await provider.send("eth_requestAccounts", []);
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.error("Error connecting wallet:", error);
    }
  };

  const checkOwner = async () => {
    if (!currentAccount) return;
    const provider = new ethers.BrowserProvider(window.ethereum);
    const contract = new ethers.Contract(contractAddress, contractABI, provider);
    const owner = await contract.owner();
    setIsOwner(owner.toLowerCase() === currentAccount.toLowerCase());
  };

  const loadNFTs = async () => {
    /*
    if (!window.ethereum) return;

    const provider = new ethers.BrowserProvider(window.ethereum);
    const contract = new ethers.Contract(contractAddress, contractABI, provider);
    const baseURI = await contract.baseTokenURI();
    const nextTokenId = await contract.nextTokenId();

    const nftList = [];
    for (let i = 0; i < nextTokenId; i++) {
      nftList.push(`${baseURI}${i}.json`);
    }
      setNFTs(nftList);
    */
     // Mock data for testing the UI
    const mockNFTs = [
    "https://via.placeholder.com/300x300?text=NFT+1",
    "https://via.placeholder.com/300x300?text=NFT+2",
    "https://via.placeholder.com/300x300?text=NFT+3",
    "https://via.placeholder.com/300x300?text=NFT+4",
    "https://via.placeholder.com/300x300?text=NFT+5",
    "https://via.placeholder.com/300x300?text=NFT+6",
    "https://via.placeholder.com/300x300?text=NFT+7",
    "https://via.placeholder.com/300x300?text=NFT+8",
    ];
    setNFTs(mockNFTs);
  };

  const mintNFT = async () => {
    if (!mintAddress || !isOwner) {
      alert("You must be the contract owner to mint NFTs.");
      return;
    }

    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(contractAddress, contractABI, signer);

    try {
      const tx = await contract.mint(mintAddress);
      await tx.wait();
      alert("NFT minted successfully!");
      loadNFTs(); // Reload NFTs after minting
    } catch (error) {
      console.error("Error minting NFT:", error);
    }
  };

  useEffect(() => {
    if (currentAccount) {
      checkOwner();
      loadNFTs();
    }
  }, [currentAccount]);

  return (
    <div className="container">
      <div className="header">
        <h1>NFT Gallery</h1>
        {!currentAccount ? (
          <button onClick={connectWallet}>Connect Wallet</button>
        ) : (
          <>
            <div className="wallet-info">
              <span>Connected: {currentAccount.slice(0, 6)}...{currentAccount.slice(-4)}</span>
              <button onClick={loadNFTs}>Refresh Gallery</button>
            </div>

            {isOwner && (
              <div className="mint-section">
                <h2>Mint New NFT</h2>
                <div>
                  <input
                    type="text"
                    placeholder="Enter recipient address"
                    value={mintAddress}
                    onChange={(e) => setMintAddress(e.target.value)}
                  />
                  <button onClick={mintNFT}>Mint NFT</button>
                </div>
              </div>
            )}

            <div className="nft-grid">
              {nfts.map((nft, index) => (
                <div key={index} className="nft-card">
                  <img src={nft} alt={`NFT ${index}`} />
                  <div className="nft-info">
                    <h3>NFT #{index + 1}</h3>
                    <p>Token ID: {index}</p>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
