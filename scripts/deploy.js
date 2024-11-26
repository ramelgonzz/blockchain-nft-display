const hre = require("hardhat");

async function main() {
    const [deployer] = await hre.ethers.getSigners();

    // Replace with your metadata URI and desired owner address
    const baseTokenURI = "https://example.com/metadata/";
    const initialOwner = deployer.address;

    const MyNFT = await hre.ethers.getContractFactory("MyNFT");
    const myNFT = await MyNFT.deploy(initialOwner, baseTokenURI);

    await myNFT.deployed();
    console.log("MyNFT deployed to:", myNFT.address);
    console.log("Contract ownership assigned to:", initialOwner);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
