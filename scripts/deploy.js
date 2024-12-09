const hre = require("hardhat");

async function main() {
    const [deployer] = await hre.ethers.getSigners(); //abstraction to sign messages and transactions

    // Replace with your metadata URI and desired owner address
    const baseTokenURI = "https://example.com/metadata/";
    const initialOwner = deployer.address; //address of the deployer to provide basic access control (ownable)

    const MyNFT = await hre.ethers.getContractFactory("MyNFT"); //send a special type of transaction. an initcode transaction (bytecode)
    const myNFT = await MyNFT.deploy(initialOwner, baseTokenURI); //method to deploy the smart contract
    // Wait for the deployment transaction to be mined
    await myNFT.waitForDeployment();

    // Get the contract address
    const contractAddress = await myNFT.getAddress();
    
    console.log("MyNFT deployed to:", contractAddress);
    console.log("Contract ownership assigned to:", initialOwner);
}

main().catch((error) => { //catch error and exit in case anything fails
    console.error(error);
    process.exit(1);
});
