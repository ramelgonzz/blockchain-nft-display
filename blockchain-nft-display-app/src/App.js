import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { contractABI } from "./contractABI";

const contractAddress = "YOUR_CONTRACT_ADDRESS"; // Replace with your deployed contract address
const contractABI = [
  // Replace this with the ABI from artifacts/contracts/MyNFT.json
];

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
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.error("Error connecting wallet:", error);
    }
  };

  const checkOwner = async () => {
    if (!currentAccount) return;
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contract = new ethers.Contract(contractAddress, contractABI, provider);
    const owner = await contract.owner();
    setIsOwner(owner.toLowerCase() === currentAccount.toLowerCase());
  };

  const loadNFTs = async () => {
    if (!window.ethereum) return;

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contract = new ethers.Contract(contractAddress, contractABI, provider);
    const baseURI = await contract.baseTokenURI();
    const nextTokenId = await contract.nextTokenId();

    const nftList = [];
    for (let i = 0; i < nextTokenId; i++) {
      nftList.push(`${baseURI}${i}.json`);
    }
    setNFTs(nftList);
  };

  const mintNFT = async () => {
    if (!mintAddress || !isOwner) {
      alert("You must be the contract owner to mint NFTs.");
      return;
    }

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
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
    <div>
      <h1>My NFT Gallery</h1>
      {!currentAccount ? (
        <button onClick={connectWallet}>Connect Wallet</button>
      ) : (
        <div>
          <p>Connected Account: {currentAccount}</p>
          <button onClick={loadNFTs}>Refresh NFTs</button>
          {isOwner && (
            <div>
              <h2>Mint a New NFT</h2>
              <input
                type="text"
                placeholder="Recipient Address"
                value={mintAddress}
                onChange={(e) => setMintAddress(e.target.value)}
              />
              <button onClick={mintNFT}>Mint NFT</button>
            </div>
          )}
          <h2>Your NFTs</h2>
          <div>
            {nfts.map((nft, index) => (
              <img key={index} src={nft} alt={`NFT ${index}`} style={{ width: "200px", margin: "10px" }} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
