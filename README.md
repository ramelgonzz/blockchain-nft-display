# blockchain-nft-display

This application connects to an Ethereum network (use Metamask to test) and displays the wallet string with available (mock) NFTs as a gallery, locally.

## Dependencies

```
npm install --save-dev hardhat
npm install ethers
npm install @openzeppelin/contracts
```

## To run:

Start node:
```
npx hardhat node
```

Deploy contract:
```
npx hardhat run scripts/deploy.js --network localhost
```

Copy smart contract address to App.js

cd to blockchain-nft-display-app

Install React app dependencies
```
npm install
```
Start the React app
```
npm start
```

Connect with Metamask using:
- Network Name: Hardhat Local
- New RPC URL: http://127.0.0.1:8545
- Chain ID: 31337
- Currency Symbol: ETH

Import an account with hardhat using one of the keys from the test node. 

## TODO

- Write a Solity contract ✅
- Deploy contract ✅
- Build frontend ✅
- Run project locally ✅