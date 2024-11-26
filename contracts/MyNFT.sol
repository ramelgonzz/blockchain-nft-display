// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MyNFT is ERC721, Ownable {
    uint256 public nextTokenId;
    string public baseTokenURI;

    // Pass `initialOwner` to the `Ownable` constructor
    constructor(address initialOwner, string memory _baseTokenURI)
        ERC721("MyNFT", "MNFT")
        Ownable(initialOwner) // Explicitly call Ownable's constructor
    {
        baseTokenURI = _baseTokenURI;
    }

    function mint(address to) public onlyOwner {
        _safeMint(to, nextTokenId);
        nextTokenId++;
    }

    function _baseURI() internal view override returns (string memory) {
        return baseTokenURI;
    }

    function setBaseTokenURI(string memory _baseTokenURI) external onlyOwner {
        baseTokenURI = _baseTokenURI;
    }
}
