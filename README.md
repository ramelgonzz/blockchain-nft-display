# blockchain-nft-display

## Dependencies

- npm install --save-dev hardhat
- npm install ethers
- npm install @openzeppelin/contracts

## To run:

Deploy contract:
- npx hardhat run scripts/deploy.js --network localhost

Start node:
- npx hardhat node

Connect with Metamask using:
- Network Name: Hardhat Local
- New RPC URL: http://127.0.0.1:8545
- Chain ID: 31337
- Currency Symbol: ETH

Import an account with hardhat using one of the keys from the test node. 

## TODO

- Write a Solity contract
- Deploy contract
- Build frontend
- Run project locally